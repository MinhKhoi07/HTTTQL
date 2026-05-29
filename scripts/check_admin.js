const mysql = require('mysql2/promise');
const { DB_HOST = 'localhost', DB_PORT = 3306, DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'htttql' } = process.env;
(async () => {
  try {
    const pool = mysql.createPool({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASSWORD, database: DB_NAME });
    const [rows] = await pool.query('SELECT id, ten_dang_nhap, mat_khau, ho_ten, vai_tro FROM tai_khoan WHERE ten_dang_nhap = ?', ['admin']);
    console.log('Found:', rows.length);
    if (rows.length > 0) console.log(rows[0]);
    await pool.end();
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
