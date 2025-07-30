import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {id:string,username:string};  // you can type it better, e.g. { id: string }
    }
  }
}
interface JwtPayload {
  id: string;
  username:string;
  iat: number;
  exp: number;
}

const jwt = require("jsonwebtoken");
const isAuthenticated = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
  try{
  const headerObj = req.headers;
  if (!req.headers.authorization || !req.headers.authorization .startsWith("Bearer ")) {
     res.status(401).json({ message: "Not authorized, no token provided" });
     return 
  }

  const token = headerObj?.authorization?.split(" ")[1];
  console.log(token);
  const decoded = jwt.verify(token, "navu") as JwtPayload;

  req.user = { id: decoded.id, username: decoded.username }; // Attach user info to request

  next();
  }
  catch(err){
    console.error(" Token verification failed:", err);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }


}
export default isAuthenticated
