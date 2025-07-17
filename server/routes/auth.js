const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { username } = req.body;

  // Basit doğrulama
  if (!username) {
    return res.status(400).json({ msg: 'Lütfen bir kullanıcı adı girin.' });
  }

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'Bu kullanıcı adı zaten alınmış.' });
    }

    user = new User({
      username
    });

    await user.save();

    res.status(201).json({
      msg: 'Kullanıcı başarıyla oluşturuldu.',
      user: {
        id: user.id,
        username: user.username,
        totalZikir: user.totalZikir
      }
    });

  } catch (err) {
    // Schema validation hatasını yakala
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ msg: messages.join(' ') });
    }
    console.error(err.message);
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
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });
        }

        // Kullanıcıyı bulduktan sonra son giriş tarihini güncelle
        user.lastLogin = Date.now();
        await user.save();

        res.json({
            msg: 'Giriş başarılı.',
            user: {
                id: user.id,
                username: user.username,
                totalZikir: user.totalZikir
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

module.exports = router;
