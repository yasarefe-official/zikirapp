const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const sql = require('./config/db'); // db.js artık doğrudan sql nesnesini export ediyor
const initializeDatabase = require('./config/init');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/zikir', require('./routes/zikir'));

// API Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Selam! Backend (PostgreSQL) çalışıyor!' });
});

// Serve Frontend
// Projenin kök dizinindeki statik dosyaları sun (örn: index.html)
app.use(express.static(path.join(__dirname, '..')));

// API rotaları dışındaki tüm istekler için index.html dosyasını gönder.
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const startServer = async () => {
  try {
    // Veritabanı bağlantısını ve tabloyu hazırla
    await initializeDatabase();

    // Sunucuyu başlat
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
