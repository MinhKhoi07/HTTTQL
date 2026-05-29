import path from "path";

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import { salesRouter } from "./modules/sales/sales.routes";
import { inventoryRouter } from "./modules/inventory/inventory.routes";
import { warehouseRouter } from "./modules/warehouse/warehouse.routes";
import { productsRouter } from "./modules/products/products.routes";
import { categoriesRouter } from "./modules/categories/categories.routes";
import { accountsRouter } from "./modules/accounts/accounts.routes";
import { errorHandler } from "./shared/middleware/error-handler";

export const app = express();
const publicDir = path.resolve(process.cwd(), "public");

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(publicDir));

app.get("/api/health", (_req, res) => {
  res.json({ message: "OK", timestamp: new Date().toISOString() });
});

app.get("/login", (_req, res) => {
  res.sendFile(path.join(publicDir, "login.html"));
});

import { requireAuth, apiRequireAuth } from "./shared/middleware/auth";

app.get("/", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/sales", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "sales.html"));
});

app.get("/products", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "products.html"));
});

app.get("/categories", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "categories.html"));
});

app.get("/inventory", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "inventory.html"));
});

app.get("/imports", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "imports.html"));
});

app.get("/accounts", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "accounts.html"));
});

app.get("/warehouse", requireAuth, (_req, res) => {
  res.sendFile(path.join(publicDir, "warehouse.html"));
});

app.use("/api/sales", salesRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/warehouse", warehouseRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/accounts", accountsRouter);
import { authRouter } from "./modules/auth/auth.routes";
app.use('/api/auth', authRouter);

app.use(errorHandler);
