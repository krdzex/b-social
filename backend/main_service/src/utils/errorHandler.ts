import { Request, Response, NextFunction } from "express";
import HttpError from "./HttpError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof HttpError) {
    res.jsonError({
      status: err.status,
      msg: err.message,
      data: err.data,
    });
  } else {
    res.jsonError({
      status: 500,
      msg: err.message,
      data: null,
    });
  }
};

export default errorHandler;
