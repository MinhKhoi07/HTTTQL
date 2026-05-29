import { Router } from "express";
import { AccountsController } from "./controllers/accounts.controller";

export const accountsRouter = Router();

accountsRouter.get("/", AccountsController.listAccounts);
