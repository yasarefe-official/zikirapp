const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDb } = require('./db');

// Route imports
const userRoutes = require('./routes/users');
const zikirRoutes = require('./routes/zikir');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Statik Client Dosyalarını Sunma
app.use(express.static(path.join(__dirname, '..', 'client')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/zikir', zikirRoutes);


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
