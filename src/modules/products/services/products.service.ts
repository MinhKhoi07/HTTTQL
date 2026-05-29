import { ProductsRepository } from "../repositories/products.repository";
import { Product } from "../models/product.model";

export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  listProducts(): Promise<Product[]> {
    return this.repo.findAll();
  }

  getById(id: number): Promise<Product | null> {
    return this.repo.findById(id);
  }

  findByBarcode(barcode: string): Promise<Product | null> {
    return this.repo.findByBarcode(barcode);
  }
}
