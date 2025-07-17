const express = require('express');
const router = express.Router();
const sql = require('../config/db');

// @route   POST api/zikir/sync
// @desc    Sync offline zikir count with the server
// @access  Private (şimdilik Public, kimlik doğrulama gerektirir)
router.post('/sync', async (req, res) => {
  const { userId, count } = req.body;

  if (!userId || count === undefined) {
    return res.status(400).json({ msg: 'Kullanıcı ID ve sayaç gereklidir.' });
  }

  const zikirCount = parseInt(count, 10);
  if (isNaN(zikirCount)) {
    return res.status(400).json({ msg: 'Geçersiz sayaç değeri.' });
  }

  try {
    const updatedUser = await sql`
      UPDATE users
      SET total_zikir = total_zikir + ${zikirCount}
      WHERE id = ${userId}
      RETURNING total_zikir
    `;

    if (updatedUser.length === 0) {
      return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });
    }

    res.json({
      msg: 'Zikirler başarıyla senkronize edildi.',
      totalZikir: updatedUser[0].total_zikir,
    });

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).send('Sunucu Hatası');
  }
});

// @route   GET api/zikir/leaderboard
// @desc    Get the top users leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await sql`
            SELECT username, total_zikir
            FROM users
            ORDER BY total_zikir DESC
            LIMIT 100
        `;
        res.json(leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).send('Sunucu Hatası');
    }
});

module.exports = router;
