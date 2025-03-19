import { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';
const jwtPass = process.env.JWT_PWD;

export const userMiddleware = (req: Request,res: Response, next: NextFunction)=>{
    const header = req.header("authorization");
    const decoded = jwt.verify(header as string, jwtPass);
    if (decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            msg:"You're not logged in"
        })
    }
}