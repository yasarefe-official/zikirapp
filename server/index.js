const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Statik Client Dosyalarını Sunma
app.use(express.static(path.join(__dirname, '..', 'client')));

// API Routes
// Kullanıcı oluştur veya getir
app.post('/api/users', async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    try {
        let user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            user = await pool.query('INSERT INTO users (username, total_zikir) VALUES ($1, 0) RETURNING *', [username]);
            console.log('New user created:', user.rows[0]);
        }
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error('Error in /api/users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Zikir sayısını güncelle
app.post('/api/zikir', async (req, res) => {
    const { userId, count } = req.body;
    if (!userId || count === undefined) {
        return res.status(400).json({ error: 'User ID and count are required' });
    }
    try {
        const result = await pool.query('UPDATE users SET total_zikir = total_zikir + $1 WHERE id = $2 RETURNING total_zikir', [count, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ total_zikir: result.rows[0].total_zikir });
    } catch (err) {
        console.error('Error in /api/zikir:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Liderlik tablosunu getir
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await pool.query('SELECT username, total_zikir FROM users ORDER BY total_zikir DESC LIMIT 10');
        res.status(200).json(leaderboard.rows);
    } catch (err) {
        console.error('Error in /api/leaderboard:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Diğer tüm istekleri client'a yönlendir
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});


// Sunucuyu ve DB'yi başlat
const startServer = async () => {
    await initDb();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
