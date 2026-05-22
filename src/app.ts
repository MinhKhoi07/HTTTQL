import path from "path";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { salesRouter } from "./modules/sales/sales.routes";
import { inventoryRouter } from "./modules/inventory/inventory.routes";
import { warehouseRouter } from "./modules/warehouse/warehouse.routes";
import { errorHandler } from "./shared/middleware/error-handler";

export const app = express();
const publicDir = path.resolve(process.cwd(), "public");

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(publicDir));

app.get("/api/health", (_req, res) => {
  res.json({ message: "OK", timestamp: new Date().toISOString() });
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/sales", (_req, res) => {
  res.sendFile(path.join(publicDir, "sales.html"));
});

app.get("/inventory", (_req, res) => {
  res.sendFile(path.join(publicDir, "inventory.html"));
});

app.get("/warehouse", (_req, res) => {
  res.sendFile(path.join(publicDir, "warehouse.html"));
});

app.use("/api/sales", salesRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/warehouse", warehouseRouter);

app.use(errorHandler);
