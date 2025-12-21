import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";
import { logger } from "../logger/logger";


export const errorMiddleware = (
err: Error,
_req: Request,
res: Response,
_next: NextFunction
) => {
    let error = err as AppError;


    if (!error.statusCode) {
    error = new AppError("Internal Server Error", 500);
    }


    logger.error({ err }, error.message);


    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};