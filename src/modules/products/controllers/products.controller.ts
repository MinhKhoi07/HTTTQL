import { Request, Response } from "express";
import { ProductsService } from "../services/products.service";
import { ProductsRepository } from "../repositories/products.repository";
import { ok } from "../../../shared/utils/api-response";

const service = new ProductsService(new ProductsRepository());

export class ProductsController {
  static async listProducts(_req: Request, res: Response): Promise<void> {
    const products = await service.listProducts();
    res.json(ok("Products fetched", products));
  }

  static async getProduct(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const product = await service.getById(id);
    if (!product) {
      res.status(404).json(ok("Product not found", null));
      return;
    }
    res.json(ok("Product fetched", product));
  }

  static async findByBarcode(req: Request, res: Response): Promise<void> {
    const { barcode } = req.query as { barcode?: string };
    if (!barcode) {
      res.status(400).json(ok("Missing barcode", null));
      return;
    }
    const product = await service.findByBarcode(barcode);
    if (!product) {
      res.status(404).json(ok("Product not found", null));
      return;
    }
    res.json(ok("Product fetched", product));
  }
}
