import { db } from "../../../shared/database/db";

export class AccountsRepository {
  async findAll() {
    const pool = db.getPool();
    const sql = `SELECT id, ten_dang_nhap AS username, ho_ten AS fullName, vai_tro AS role, trang_thai AS status FROM tai_khoan ORDER BY ho_ten`;
    const [rows] = await pool.query<any[]>(sql);
    return rows.map((r: any) => ({ id: Number(r.id), username: r.username, fullName: r.fullName, role: r.role, status: Number(r.status) }));
  }

  async findByUsername(username: string) {
    const pool = db.getPool();
    const sql = `SELECT * FROM tai_khoan WHERE ten_dang_nhap = ? LIMIT 1`;
    const [rows] = await pool.query<any[]>(sql, [username]);
    if (!rows[0]) return null;
    return rows[0];
  }
}
