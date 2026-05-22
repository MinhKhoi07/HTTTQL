import { Router } from "express";

import { WarehouseController } from "./controllers/warehouse.controller";

export const warehouseRouter = Router();

warehouseRouter.post("/goods-receipts", WarehouseController.createGoodsReceipt);
warehouseRouter.get("/goods-receipts", WarehouseController.listGoodsReceipts);
