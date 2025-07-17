const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to Database
connectDB();

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
  res.json({ message: 'Selam! Backend çalışıyor!' });
});

// Serve Frontend
// React uygulamasının build klasörünün yolunu belirliyoruz.
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// Diğer tüm GET istekleri için React uygulamasını gönder.
// Bu, React Router'ın client-side yönlendirmeyi devralmasını sağlar.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
