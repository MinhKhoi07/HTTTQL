import { GoodsReceiptItem } from "../models/goods-receipt.model";

export type CreateGoodsReceiptDto = {
  supplierId: string;
  warehouseId: string;
  items: GoodsReceiptItem[];
};
