// /api/auth.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
export default async function handler(req, res) {
    // CORS заголовки
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    console.log('Auth API called:', req.method, req.url);
    
    // Логин
    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const { username, password } = body;
            
            console.log('Login attempt:', username, password ? '***' : 'empty');
            
            // УКАЖИТЕ ЗДЕСЬ ВАШ ЛОГИН И ПАРОЛЬ
            const adminUsername = 'admin';
            const adminPassword = 'password'; // измените на ваш пароль
            
            if (username === adminUsername && password === adminPassword) {
                // Генерируем токен
                const token = 'admin-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                
                console.log('Login successful, token generated');
                
                return res.status(200).json({ 
                    success: true, 
                    token: token
                });
            }
            
            console.log('Invalid credentials');
            return res.status(401).json({ 
                error: 'Неверные учетные данные. Используйте: admin / school123'
            });
            
        } catch (error) {
            console.error('Login error:', error);
            return res.status(400).json({ error: 'Неверный формат данных' });
        }
    }
    
    // Проверка токена - исправлен URL check
    if (req.method === 'GET') {
        // Проверяем, что запрос идет на /api/auth или /api/auth/verify
        const isVerifyRequest = req.url === '/'  req.url === ''  req.url.includes('verify');
        
        if (isVerifyRequest) {
            const authHeader = req.headers.authorization;
            
            console.log('Verify token request, header:', authHeader);
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Токен не предоставлен' });
            }
            
            const token = authHeader.split(' ')[1];
            
            // Принимаем любые токены, начинающиеся с admin-token- или test-token-
            if (token && (token.startsWith('admin-token-') || token.startsWith('test-token-'))) {
                console.log('Token is valid');
                return res.status(200).json({ valid: true });
            }
            
            console.log('Invalid token format:', token);
            return res.status(401).json({ error: 'Недействительный токен' });
        }
    }
    
    return res.status(404).json({ error: 'Эндпоинт не найден' });
}