import { Router } from "express";

import { SalesController } from "./controllers/sales.controller";

export const salesRouter = Router();

salesRouter.post("/orders", SalesController.createOrder);
salesRouter.get("/orders", SalesController.listOrders);
