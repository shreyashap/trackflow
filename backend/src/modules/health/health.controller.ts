import { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error";


export const healthCheck = (_req: Request, res: Response) => {
    res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
};