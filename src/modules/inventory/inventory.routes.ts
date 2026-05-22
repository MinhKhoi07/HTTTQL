import { Router } from "express";

import { InventoryController } from "./controllers/inventory.controller";

export const inventoryRouter = Router();

inventoryRouter.post("/stock-movements", InventoryController.createMovement);
inventoryRouter.get("/stock-movements", InventoryController.listMovements);
