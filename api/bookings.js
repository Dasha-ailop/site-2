// /api/bookings.js
export default async function handler(req, res) {
    // CORS заголовки
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    
    // Обработка предварительных запросов CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        // POST запрос - создание новой записи
        if (req.method === 'POST') {
            const bookingData = req.body;
            
            // Валидация данных
            if (!bookingData.teacher || !bookingData.date || !bookingData.selectedTime) {
                return res.status(400).json({ error: 'Неполные данные' });
            }
            
            // В реальном приложении здесь была бы база данных
            // Для теста просто возвращаем успешный ответ
            
            return res.status(201).json({ 
                success: true, 
                id: Date.now(),
                message: 'Запись создана успешно' 
            });
        }
        
        // GET запрос для получения занятых слотов
        if (req.method === 'GET' && req.query.teacher && req.query.date) {
            // Для теста возвращаем пустой массив
            // В реальном приложении здесь была бы проверка базы данных
            
            return res.status(200).json({ occupiedSlots: [] });
        }
        
        // GET запрос для получения всех записей (для админки)
        if (req.method === 'GET') {
            // Для теста возвращаем пустой массив
            // В реальном приложении здесь была бы выборка из базы
            
            // Проверка авторизации (простая проверка заголовка)
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Требуется авторизация' });
            }
            
            return res.status(200).json([]);
        }
        
        // PUT запрос для обновления статуса
        if (req.method === 'PUT' && req.url.includes('/')) {
            const bookingId = req.url.split('/').pop();
            
            // Проверка авторизации
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Требуется авторизация' });
            }
            
            const { status } = req.body;
            
            // В реальном приложении здесь было бы обновление в базе данных
            
            return res.status(200).json({ success: true });
        }
        
        // DELETE запрос
        if (req.method === 'DELETE' && req.url.includes('/')) {
            const bookingId = req.url.split('/').pop();
            
            // Проверка авторизации
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Требуется авторизация' });
            }
            
            // В реальном приложении здесь было бы удаление из базы данных
            
            return res.status(200).json({ success: true });
        }
        
        return res.status(405).json({ error: 'Метод не разрешен' });
        
    } catch (error) {
        console.error('Ошибка API bookings:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}