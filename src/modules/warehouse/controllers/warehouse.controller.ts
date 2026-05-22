import { Request, Response } from "express";

import { ok } from "../../../shared/utils/api-response";
import { CreateGoodsReceiptDto } from "../dto/create-goods-receipt.dto";
import { WarehouseRepository } from "../repositories/warehouse.repository";
import { WarehouseService } from "../services/warehouse.service";

const warehouseService = new WarehouseService(new WarehouseRepository());

export class WarehouseController {
  static createGoodsReceipt(req: Request, res: Response): void {
    const input = req.body as CreateGoodsReceiptDto;
    const receipt = warehouseService.createGoodsReceipt(input);
    res.status(201).json(ok("Goods receipt created", receipt));
  }

  static listGoodsReceipts(_req: Request, res: Response): void {
    const receipts = warehouseService.listGoodsReceipts();
    res.json(ok("Goods receipts fetched", receipts));
  }
}
