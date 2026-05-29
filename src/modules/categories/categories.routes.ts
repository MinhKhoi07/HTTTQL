import { Router } from "express";
import { CategoriesController } from "./controllers/categories.controller";

export const categoriesRouter = Router();

categoriesRouter.get("/", CategoriesController.listCategories);
