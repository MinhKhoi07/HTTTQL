import { SaleOrder, SaleItem } from "../models/sale-order.model";
import { db } from "../../../shared/database/db";

export class SalesRepository {
  async save(order: SaleOrder): Promise<SaleOrder> {
    const pool = db.getPool();
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const total = order.items.reduce((s, it) => s + Number(it.quantity) * Number(it.unitPrice), 0);
      const ma = `SO-${Date.now()}`;

      const [res]: any = await conn.query(
        `INSERT INTO hoa_don_ban_hang (ma_hoa_don, id_nguoi_ban, ngay_ban, tong_tien) VALUES (?, ?, NOW(), ?)`,
        [ma, 1, total]
      );

      const hoaDonId = res.insertId;

      for (const item of order.items) {
        const lineTotal = Number(item.quantity) * Number(item.unitPrice);
        await conn.query(
          `INSERT INTO hoa_don_ban_hang_chi_tiet (id_hoa_don, id_san_pham, so_luong, don_gia, thanh_tien) VALUES (?, ?, ?, ?, ?)`,
          [hoaDonId, item.productId, item.quantity, item.unitPrice, lineTotal]
        );

        // decrement ton_kho (assume default warehouse id = 1)
        const warehouseId = 1;
        const [existing] = await conn.query<any[]>(`SELECT id, so_luong FROM ton_kho WHERE id_san_pham = ? AND id_kho_hang = ? LIMIT 1`, [item.productId, warehouseId]);
        if (existing && existing.length > 0) {
          await conn.query(`UPDATE ton_kho SET so_luong = GREATEST(0, so_luong - ?), ngay_cap_nhat = NOW() WHERE id = ?`, [item.quantity, existing[0].id]);
        } else {
          // if no record, insert negative stock
          await conn.query(`INSERT INTO ton_kho (id_san_pham, id_kho_hang, so_luong) VALUES (?, ?, ?)`, [item.productId, warehouseId, -item.quantity]);
        }
      }

      await conn.commit();

      return {
        id: `SO-${hoaDonId}`,
        createdAt: new Date().toISOString(),
        items: order.items,
        totalAmount: total
      } as SaleOrder;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async findAll(): Promise<SaleOrder[]> {
    const pool = db.getPool();
    const sql = `SELECT h.id, h.ma_hoa_don AS code, h.ngay_ban AS createdAt, h.tong_tien AS total FROM hoa_don_ban_hang h ORDER BY h.ngay_ban DESC`;
    const [rows] = await pool.query<any[]>(sql);
    return rows.map((r) => ({ id: `SO-${r.id}`, createdAt: r.createdAt, items: [], totalAmount: r.total }));
  }
}
