import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction} from "express";
import { pool } from "../config/db";

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; username: string; email: string };
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ message: "Not Authorized, No Token" });
        }
        const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
        const decoded = jwt.verify(token, jwtSecret) as { id: number };
        const user = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [decoded.id]);
        if(user.rows.length === 0){
            return res.status(401).json({ message: "Not Authorized, User Not Found" });
        }
        req.user = user.rows[0];
        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({ message: "Not Authorized, Token Failed" });
    }
}