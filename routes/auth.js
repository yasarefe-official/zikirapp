const express = require('express');
const router = express.Router();
const sql = require('../config/db');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ msg: 'Lütfen bir kullanıcı adı girin.' });
  }
  // Basit regex ile kullanıcı adını doğrula
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ msg: 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir.' });
  }

  try {
    const newUser = await sql`
      INSERT INTO users (username)
      VALUES (${username})
      RETURNING id, username, total_zikir
    `;

    res.status(201).json({
      msg: 'Kullanıcı başarıyla oluşturuldu.',
      user: newUser[0]
    });

  } catch (error) {
    // PostgreSQL'de unique constraint hatası kodu '23505'
    if (error.code === '23505') {
      return res.status(400).json({ msg: 'Bu kullanıcı adı zaten alınmış.' });
    }
    console.error('Register error:', error);
    res.status(500).send('Sunucu Hatası');
  }
});

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ msg: 'Lütfen bir kullanıcı adı girin.' });
    }

    try {
        // Giriş yaparken son giriş zamanını güncelle
        const users = await sql`
            UPDATE users
            SET last_login = CURRENT_TIMESTAMP
            WHERE username = ${username}
            RETURNING id, username, total_zikir
        `;

        if (users.length === 0) {
            return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });
        }

        res.json({
            msg: 'Giriş başarılı.',
            user: users[0]
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Sunucu Hatası');
    }
});

module.exports = router;
