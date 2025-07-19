const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Zikir sayısını güncelle
router.post('/', async (req, res) => {
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
        console.error('Error in POST /api/zikir:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Liderlik tablosunu getir
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await pool.query('SELECT username, total_zikir FROM users ORDER BY total_zikir DESC LIMIT 10');
        res.status(200).json(leaderboard.rows);
    } catch (err) {
        console.error('Error in GET /api/leaderboard:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Tüm zikirleri listele
router.get('/list', async (req, res) => {
    try {
        const zikirler = await pool.query('SELECT * FROM zikirler');
        res.status(200).json(zikirler.rows);
    } catch (err) {
        console.error('Error in GET /api/zikir/list:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Zikir geçmişini kaydet
router.post('/history', async (req, res) => {
    const { userId, zikirId, count } = req.body;
    if (!userId || !zikirId || !count) {
        return res.status(400).json({ error: 'User ID, Zikir ID, and count are required' });
    }
    try {
        await pool.query(
            'INSERT INTO user_zikir_history (user_id, zikir_id, count) VALUES ($1, $2, $3)',
            [userId, zikirId, count]
        );
        // Ayrıca genel toplamı da güncelleyelim
        await pool.query('UPDATE users SET total_zikir = total_zikir + $1 WHERE id = $2', [count, userId]);
        res.status(201).json({ message: 'History saved successfully' });
    } catch (err) {
        console.error('Error in POST /api/zikir/history:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
