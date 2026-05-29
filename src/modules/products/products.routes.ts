import { Router } from "express";
import { ProductsController } from "./controllers/products.controller";

export const productsRouter = Router();

productsRouter.get("/", ProductsController.listProducts);
productsRouter.get("/search", ProductsController.findByBarcode);
productsRouter.get("/:id", ProductsController.getProduct);
