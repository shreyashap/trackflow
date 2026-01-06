import { Request, Response, NextFunction } from "express";


// Define what a "Controller" looks like
type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;

export const asyncHandler =
(fn: AsyncController) =>
(req: Request, res: Response, next: NextFunction) => {
Promise.resolve(fn(req, res, next)).catch(next);
};  