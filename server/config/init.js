const sql = require('./db');

const initializeDatabase = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        total_zikir BIGINT DEFAULT 0,
        last_login TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Database table "users" is ready.');
  } catch (error) {
    console.error('Error initializing database table:', error);
    process.exit(1);
  }
};

module.exports = initializeDatabase;
