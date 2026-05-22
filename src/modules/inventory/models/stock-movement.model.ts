export type MovementType = "IN" | "OUT" | "ADJUSTMENT";

export type StockMovement = {
  id: string;
  productId: string;
  warehouseId: string;
  type: MovementType;
  quantity: number;
  note?: string;
  createdAt: string;
};
