import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export type AuthPayload = { id: number; username: string; role?: string };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.slice(7) : null);
    if (!token) {
      res.redirect('/login');
      return;
    }

    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    (req as any).user = payload;
    next();
  } catch (err) {
    res.clearCookie('token');
    res.redirect('/login');
  }
}

export function apiRequireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.slice(7) : null);
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    (req as any).user = payload;
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({ message: 'Unauthorized' });
  }
}
