import { CreateStockMovementDto } from "../dto/create-stock-movement.dto";
import { StockMovement } from "../models/stock-movement.model";
import { InventoryRepository } from "../repositories/inventory.repository";

export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  createMovement(input: CreateStockMovementDto): StockMovement {
    const movement: StockMovement = {
      id: `SM-${Date.now()}`,
      productId: input.productId,
      warehouseId: input.warehouseId,
      type: input.type,
      quantity: input.quantity,
      note: input.note,
      createdAt: new Date().toISOString()
    };

    return this.repository.save(movement);
  }

  listMovements(): StockMovement[] {
    return this.repository.findAll();
  }
}
