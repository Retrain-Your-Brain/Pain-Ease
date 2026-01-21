import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const headerObj = req.headers;
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authorized, no token provided" });
      return;
    }

    const token = headerObj?.authorization?.split(" ")[1];
    if (!token) { 
      res.status(401).json({ message: "Not authorized, token missing" });
      return;
    }

    const decoded = jwt.verify(token, "navu") as unknown as JwtPayload;

    req.user = { id: decoded.id, username: decoded.username }; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export default isAuthenticated;
