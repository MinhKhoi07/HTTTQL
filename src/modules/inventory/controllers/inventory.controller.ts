import { Request, Response } from "express";

import { ok } from "../../../shared/utils/api-response";
import { CreateStockMovementDto } from "../dto/create-stock-movement.dto";
import { InventoryRepository } from "../repositories/inventory.repository";
import { InventoryService } from "../services/inventory.service";

const inventoryService = new InventoryService(new InventoryRepository());

export class InventoryController {
  static createMovement(req: Request, res: Response): void {
    const input = req.body as CreateStockMovementDto;
    const movement = inventoryService.createMovement(input);
    res.status(201).json(ok("Stock movement created", movement));
  }

  static listMovements(_req: Request, res: Response): void {
    const movements = inventoryService.listMovements();
    res.json(ok("Stock movements fetched", movements));
  }
}
