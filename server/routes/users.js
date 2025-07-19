const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Kullanıcı oluştur veya getir
router.post('/', async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    try {
        let user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            user = await pool.query('INSERT INTO users (username, total_zikir) VALUES ($1, 0) RETURNING *', [username]);
        }
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error('Error in POST /api/users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
