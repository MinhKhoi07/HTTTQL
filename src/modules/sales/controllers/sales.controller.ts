import { Request, Response } from "express";

import { ok } from "../../../shared/utils/api-response";
import { SalesRepository } from "../repositories/sales.repository";
import { SalesService } from "../services/sales.service";
import { CreateSaleOrderDto } from "../dto/create-sale-order.dto";

const salesService = new SalesService(new SalesRepository());

export class SalesController {
  static async createOrder(req: Request, res: Response): Promise<void> {
    const input = req.body as CreateSaleOrderDto;
    const order = await salesService.createOrder(input);
    res.status(201).json(ok("Sale order created", order));
  }

  static async listOrders(_req: Request, res: Response): Promise<void> {
    const orders = await salesService.listOrders();
    res.json(ok("Sale orders fetched", orders));
  }
}
