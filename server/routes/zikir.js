const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Bu rotanın ileride korunması gerekecek (örneğin JWT ile)
// Şimdilik, kullanıcı kimliğini (ID) istek gövdesinden alıyoruz.

// @route   POST api/zikir/sync
// @desc    Sync offline zikir count with the server
// @access  Private (şimdilik Public)
router.post('/sync', async (req, res) => {
  const { userId, count } = req.body;

  if (!userId || count === undefined) {
    return res.status(400).json({ msg: 'Kullanıcı ID ve sayaç gereklidir.' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });
    }

    // Gelen sayacı kullanıcının toplam zikrine ekle
    user.totalZikir += parseInt(count, 10);
    await user.save();

    res.json({
      msg: 'Zikirler başarıyla senkronize edildi.',
      totalZikir: user.totalZikir
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu Hatası');
  }
});

// @route   GET api/zikir/leaderboard
// @desc    Get the top users leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find()
            .sort({ totalZikir: -1 }) // En yüksekten düşüğe sırala
            .limit(100) // İlk 100 kullanıcıyı al
            .select('username totalZikir'); // Sadece bu alanları gönder

        res.json(leaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});


module.exports = router;
