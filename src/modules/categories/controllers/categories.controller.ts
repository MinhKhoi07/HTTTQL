import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";
import { CategoriesRepository } from "../repositories/categories.repository";
import { ok } from "../../../shared/utils/api-response";

const service = new CategoriesService(new CategoriesRepository());

export class CategoriesController {
  static async listCategories(_req: Request, res: Response): Promise<void> {
    const categories = await service.listCategories();
    res.json(ok("Categories fetched", categories));
  }
}
