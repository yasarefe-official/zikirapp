const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/koyebdb`,
  ssl: {
    rejectUnauthorized: false
  }
});

const initDb = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      total_zikir INT DEFAULT 0,
      preferences JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS zikirler (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS user_zikir_history (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      zikir_id INT REFERENCES zikirler(id),
      count INT NOT NULL,
      date DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `INSERT INTO zikirler (name, description) VALUES
      ('Sübhanallah', 'Allah eksik sıfatlardan uzaktır.'),
      ('Elhamdülillah', 'Hamd, Allah''adır.'),
      ('Allahu Ekber', 'Allah en büyüktür.')
     ON CONFLICT (name) DO NOTHING;`
  ];

  for (const query of queries) {
    try {
      await pool.query(query);
    } catch (err) {
      console.error('Error executing query:', err);
      // Decide if you want to stop on error
    }
  }
  console.log('Database schema initialized.');
};

module.exports = {
  pool,
  initDb
};
