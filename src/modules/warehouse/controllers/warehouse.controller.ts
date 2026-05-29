import { Request, Response } from "express";

import { ok } from "../../../shared/utils/api-response";
import { CreateGoodsReceiptDto } from "../dto/create-goods-receipt.dto";
import { WarehouseRepository } from "../repositories/warehouse.repository";
import { WarehouseService } from "../services/warehouse.service";

const warehouseService = new WarehouseService(new WarehouseRepository());

export class WarehouseController {
  static async createGoodsReceipt(req: Request, res: Response): Promise<void> {
    const input = req.body as CreateGoodsReceiptDto;
    const receipt = await warehouseService.createGoodsReceipt(input);
    res.status(201).json(ok("Goods receipt created", receipt));
  }

  static async listGoodsReceipts(_req: Request, res: Response): Promise<void> {
    const receipts = await warehouseService.listGoodsReceipts();
    res.json(ok("Goods receipts fetched", receipts));
  }
}
