const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/koyebdb`,
  ssl: {
    rejectUnauthorized: false
  }
});

const initDb = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      total_zikir INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createUsersTable);
    console.log('Users table created or already exists.');
  } catch (err) {
    console.error('Error creating users table:', err);
  }
};

module.exports = {
  pool,
  initDb
};
