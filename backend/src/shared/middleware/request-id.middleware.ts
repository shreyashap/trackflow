import { Request,Response,NextFunction } from "express";
import { randomUUID } from "crypto";

export const requestIdMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    req.id = randomUUID();
    next();
}