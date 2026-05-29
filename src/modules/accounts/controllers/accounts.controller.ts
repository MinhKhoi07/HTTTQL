import { Request, Response } from "express";
import { AccountsService } from "../services/accounts.service";
import { AccountsRepository } from "../repositories/accounts.repository";
import { ok } from "../../../shared/utils/api-response";

const service = new AccountsService(new AccountsRepository());

export class AccountsController {
  static async listAccounts(_req: Request, res: Response): Promise<void> {
    const accounts = await service.listAccounts();
    res.json(ok("Accounts fetched", accounts));
  }
}
