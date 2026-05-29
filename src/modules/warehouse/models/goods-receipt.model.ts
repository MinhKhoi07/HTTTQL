export type GoodsReceiptItem = {
  productId: string;
  quantity: number;
  unitCost: number;
};

export type GoodsReceipt = {
  id: string;
  supplierId?: string | null;
  warehouseId?: string | null;
  items: GoodsReceiptItem[];
  createdAt: string;
};
