import { CategoriesRepository } from "../repositories/categories.repository";

export class CategoriesService {
  constructor(private readonly repo: CategoriesRepository) {}

  listCategories() {
    return this.repo.findAll();
  }
}
