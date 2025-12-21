import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";


export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info({
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            duration,
        });
    });
    next();
};