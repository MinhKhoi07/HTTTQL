import { StockMovement } from "../models/stock-movement.model";

export class InventoryRepository {
  private readonly movements: StockMovement[] = [];

  save(movement: StockMovement): StockMovement {
    this.movements.push(movement);
    return movement;
  }

  findAll(): StockMovement[] {
    return this.movements;
  }
}
