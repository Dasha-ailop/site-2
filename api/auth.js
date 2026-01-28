// /api/auth.js
export default async function handler(req, res) {
    // CORS заголовки
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Логин
    if (req.method === 'POST') {
        const { username, password } = req.body;
        
        // Простая проверка для теста
        // В реальном приложении здесь была бы проверка в базе данных
        if (username === 'admin' && password === 'admin123') {
            // Генерируем простой токен
            const token = 'test-token-' + Date.now() + '-' + Math.random().toString(36).substr(2);
            
            return res.status(200).json({ 
                success: true, 
                token: token
            });
        }
        
        return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    
    // Проверка токена
    if (req.method === 'GET' && req.url.includes('/verify')) {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Токен не предоставлен' });
        }
        
        // Простая проверка токена
        // В реальном приложении здесь была бы проверка JWT токена
        const token = authHeader.split(' ')[1];
        
        if (token && token.startsWith('test-token-')) {
            return res.status(200).json({ valid: true });
        }
        
        return res.status(401).json({ error: 'Недействительный токен' });
    }
    
    return res.status(405).json({ error: 'Метод не разрешен' });
}