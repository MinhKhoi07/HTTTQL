import { db } from "../../../shared/database/db";

export class CategoriesRepository {
  async findAll() {
    const pool = db.getPool();
    const sql = `SELECT id, ma_danh_muc AS code, ten_danh_muc AS name, trang_thai AS status FROM danh_muc ORDER BY ten_danh_muc`;
    const [rows] = await pool.query<any[]>(sql);
    return rows.map((r: any) => ({ id: Number(r.id), code: r.code, name: r.name, status: Number(r.status) }));
  }
}
