const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Kullanıcı adı zorunludur.'],
    unique: true,
    trim: true,
    // Sadece harf, sayı ve alt çizgiye izin ver, özel karakterlere izin verme
    match: [/^[a-zA-Z0-9_]+$/, 'Kullanıcı adı özel karakter içeremez.']
  },
  totalZikir: {
    type: Number,
    default: 0
  },
  // Gelecekteki istatistikler için alanlar
  dailyAverage: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // createdAt ve updatedAt alanlarını otomatik ekler
});

module.exports = mongoose.model('User', UserSchema);
