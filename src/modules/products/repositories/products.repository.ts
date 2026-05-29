import { db } from "../../../shared/database/db";
import { Product } from "../models/product.model";

export class ProductsRepository {
  async findAll(): Promise<Product[]> {
    const pool = db.getPool();
    const sql = `
      SELECT sp.id,
             sp.ma_sku AS sku,
             sp.ma_vach AS barcode,
             sp.ten_san_pham AS name,
             sp.don_vi_tinh AS unit,
             sp.gia_ban AS price,
             sp.gia_nhap AS cost,
             dm.ten_danh_muc AS category,
             COALESCE(SUM(tk.so_luong), 0) AS stock
      FROM san_pham sp
      LEFT JOIN danh_muc dm ON sp.id_danh_muc = dm.id
      LEFT JOIN ton_kho tk ON tk.id_san_pham = sp.id
      GROUP BY sp.id, sp.ma_sku, sp.ma_vach, sp.ten_san_pham, sp.don_vi_tinh, sp.gia_ban, sp.gia_nhap, dm.ten_danh_muc
      ORDER BY sp.ten_san_pham ASC
    `;

    const [rows] = await pool.query<any[]>(sql);
    return rows.map((r: any) => ({
      id: Number(r.id),
      sku: r.sku,
      barcode: r.barcode,
      name: r.name,
      unit: r.unit,
      price: Number(r.price),
      cost: Number(r.cost),
      category: r.category,
      stock: Number(r.stock)
    }));
  }

  async findById(id: number): Promise<Product | null> {
    const pool = db.getPool();
    const sql = `
      SELECT sp.id,
             sp.ma_sku AS sku,
             sp.ma_vach AS barcode,
             sp.ten_san_pham AS name,
             sp.don_vi_tinh AS unit,
             sp.gia_ban AS price,
             sp.gia_nhap AS cost,
             dm.ten_danh_muc AS category,
             COALESCE(SUM(tk.so_luong), 0) AS stock
      FROM san_pham sp
      LEFT JOIN danh_muc dm ON sp.id_danh_muc = dm.id
      LEFT JOIN ton_kho tk ON tk.id_san_pham = sp.id
      WHERE sp.id = ?
      GROUP BY sp.id, sp.ma_sku, sp.ma_vach, sp.ten_san_pham, sp.don_vi_tinh, sp.gia_ban, sp.gia_nhap, dm.ten_danh_muc
      LIMIT 1
    `;

    const [rows] = await pool.query<any[]>(sql, [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    return {
      id: Number(r.id),
      sku: r.sku,
      barcode: r.barcode,
      name: r.name,
      unit: r.unit,
      price: Number(r.price),
      cost: Number(r.cost),
      category: r.category,
      stock: Number(r.stock)
    };
  }

  async findByBarcode(barcode: string): Promise<Product | null> {
    const pool = db.getPool();
    const sql = `
      SELECT sp.id,
             sp.ma_sku AS sku,
             sp.ma_vach AS barcode,
             sp.ten_san_pham AS name,
             sp.don_vi_tinh AS unit,
             sp.gia_ban AS price,
             sp.gia_nhap AS cost,
             dm.ten_danh_muc AS category,
             COALESCE(SUM(tk.so_luong), 0) AS stock
      FROM san_pham sp
      LEFT JOIN danh_muc dm ON sp.id_danh_muc = dm.id
      LEFT JOIN ton_kho tk ON tk.id_san_pham = sp.id
      WHERE sp.ma_vach = ? OR sp.ma_sku = ?
      GROUP BY sp.id, sp.ma_sku, sp.ma_vach, sp.ten_san_pham, sp.don_vi_tinh, sp.gia_ban, sp.gia_nhap, dm.ten_danh_muc
      LIMIT 1
    `;

    const [rows] = await pool.query<any[]>(sql, [barcode, barcode]);
    if (!rows[0]) return null;
    const r = rows[0];
    return {
      id: Number(r.id),
      sku: r.sku,
      barcode: r.barcode,
      name: r.name,
      unit: r.unit,
      price: Number(r.price),
      cost: Number(r.cost),
      category: r.category,
      stock: Number(r.stock)
    };
  }
}
