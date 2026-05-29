const mysql = require('mysql2/promise');
const { DB_HOST = 'localhost', DB_PORT = 3306, DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'htttql' } = process.env;
(async () => {
  try {
    const pool = mysql.createPool({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASSWORD, database: DB_NAME });
    const [rows] = await pool.query('SELECT 1 FROM tai_khoan WHERE ten_dang_nhap = ? LIMIT 1', ['admin']);
    if (rows.length === 0) {
      await pool.query("INSERT INTO tai_khoan (ten_dang_nhap, mat_khau, ho_ten, vai_tro, trang_thai) VALUES (?, ?, ?, ?, 1)", ['admin', 'admin123', 'Quản trị viên', 'Quản trị viên']);
      console.log('Inserted admin / admin123');
    } else {
      console.log('Admin already exists');
    }
    await pool.end();
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
