import { MovementType } from "../models/stock-movement.model";

export type CreateStockMovementDto = {
  productId: string;
  warehouseId: string;
  type: MovementType;
  quantity: number;
  note?: string;
};
