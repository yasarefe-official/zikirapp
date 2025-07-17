const postgres = require('postgres');
require('dotenv').config();

let sql;

try {
  sql = postgres({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: 'require',
    transform: {
      // Sütun adlarını snake_case'den camelCase'e çevir
      column: {
        from: postgres.fromSnake,
        to: postgres.toSnake
      },
    },
  });
  console.log('PostgreSQL connected successfully.');
} catch (error) {
  console.error('PostgreSQL connection error:', error);
  process.exit(1);
}

module.exports = sql;
