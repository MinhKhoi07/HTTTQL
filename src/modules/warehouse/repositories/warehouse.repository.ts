import { GoodsReceipt } from "../models/goods-receipt.model";
import { db } from "../../../shared/database/db";

export class WarehouseRepository {
  async save(receipt: GoodsReceipt): Promise<GoodsReceipt> {
    const pool = db.getPool();
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const total = receipt.items.reduce((s, it) => s + Number(it.quantity) * Number(it.unitCost), 0);
      const ma = `PN-${Date.now()}`;

      const [res]: any = await conn.query(
        `INSERT INTO phieu_nhap (ma_phieu_nhap, id_nha_cung_cap, id_nguoi_lap, ngay_nhap, tong_tien, ghi_chu) VALUES (?, ?, ?, NOW(), ?, ?)`,
        [ma, receipt.supplierId || null, 1, total, receipt.warehouseId ? `warehouse:${receipt.warehouseId}` : receipt.supplierId || null]
      );

      const phieuNhapId = res.insertId;

      for (const item of receipt.items) {
        const lineTotal = Number(item.quantity) * Number(item.unitCost);
        await conn.query(
          `INSERT INTO phieu_nhap_chi_tiet (id_phieu_nhap, id_san_pham, so_luong, don_gia, thanh_tien) VALUES (?, ?, ?, ?, ?)`,
          [phieuNhapId, item.productId, item.quantity, item.unitCost, lineTotal]
        );

        // Update ton_kho for the product and warehouse
        const warehouseId = receipt.warehouseId || 1;
        const [existing] = await conn.query<any[]>(`SELECT id, so_luong FROM ton_kho WHERE id_san_pham = ? AND id_kho_hang = ? LIMIT 1`, [item.productId, warehouseId]);
        if (existing && existing.length > 0) {
          await conn.query(`UPDATE ton_kho SET so_luong = so_luong + ?, ngay_cap_nhat = NOW() WHERE id = ?`, [item.quantity, existing[0].id]);
        } else {
          await conn.query(`INSERT INTO ton_kho (id_san_pham, id_kho_hang, so_luong) VALUES (?, ?, ?)`, [item.productId, warehouseId, item.quantity]);
        }
      }

      await conn.commit();

      return {
        id: `GR-${phieuNhapId}`,
        supplierId: receipt.supplierId,
        warehouseId: receipt.warehouseId,
        items: receipt.items,
        createdAt: new Date().toISOString()
      } as GoodsReceipt;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async findAll(): Promise<GoodsReceipt[]> {
    const pool = db.getPool();
    const sql = `SELECT p.id, p.ma_phieu_nhap AS code, p.id_nha_cung_cap AS supplierId, p.ngay_nhap AS createdAt, p.tong_tien AS total
      FROM phieu_nhap p ORDER BY p.ngay_nhap DESC`;
    const [rows] = await pool.query<any[]>(sql);
    return rows.map((r) => ({ id: `GR-${r.id}`, supplierId: r.supplierId, warehouseId: null, items: [], createdAt: r.createdAt }));
  }
}
