import { AccountsRepository } from "../repositories/accounts.repository";

export class AccountsService {
  constructor(private readonly repo: AccountsRepository) {}

  listAccounts() {
    return this.repo.findAll();
  }
}
