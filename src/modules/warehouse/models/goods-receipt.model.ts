export type GoodsReceiptItem = {
  productId: string;
  quantity: number;
  unitCost: number;
};

export type GoodsReceipt = {
  id: string;
  supplierId: string;
  warehouseId: string;
  items: GoodsReceiptItem[];
  createdAt: string;
};
