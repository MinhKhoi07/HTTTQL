import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import { AccountsRepository } from "../../accounts/repositories/accounts.repository";
import { ok } from "../../../shared/utils/api-response";

const accountsRepo = new AccountsRepository();

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body as { username?: string; password?: string };
    if (!username || !password) {
      res.status(400).json({ message: 'Missing credentials' });
      return;
    }

    const user = await accountsRepo.findByUsername(username);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // NOTE: passwords are compared as plain text here. If your DB stores hashed passwords,
    // replace this comparison with bcrypt.compare.
    if (user.mat_khau && user.mat_khau !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const payload = { id: user.id, username: user.ten_dang_nhap, role: user.vai_tro };
    const token = jwt.sign(payload as any, env.jwtSecret as any, { expiresIn: env.jwtExpiresIn } as any);

    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 8, path: '/' });
    res.json(ok('Logged in', { user: { id: user.id, username: user.ten_dang_nhap, fullName: user.ho_ten } }));
  }

  static logout(_req: Request, res: Response): void {
    res.clearCookie('token', { path: '/' });
    res.json(ok('Logged out', null));
  }
}
