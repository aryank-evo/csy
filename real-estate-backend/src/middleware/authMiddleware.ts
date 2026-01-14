import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from '../models/User';

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string; isAdmin?: boolean };
    
    // Fetch user from database to attach full user info
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Middleware specifically for admin authentication
export const authenticateAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string; isAdmin: boolean };
    
    // Fetch user from database to verify admin status
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    
    if (!user.isAdmin) {
      res.status(403).json({ error: "Access denied. Admin privileges required." });
      return;
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
