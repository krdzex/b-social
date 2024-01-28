import express, { NextFunction, Request, Response } from "express";

const jsonSuccess = (res: Response) => {
  return function ({
    msg = "Success",
    data = null,
    status = 200,
  }: { msg?: string; data?: any; status?: number } = {}): Response {
    res.status(status);
    return res.json({
      error: false,
      data,
      msg,
    });
  };
};

const jsonError = (res: Response) => {
  return function ({
    msg = "Something went wrong",
    status = 400,
    data = null,
  }: { msg?: string; status?: number; data?: any } = {}): Response {
    res.status(status);
    return res.json({
      error: true,
      data,
      msg,
    });
  };
};

const jsonResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.jsonSuccess = jsonSuccess(res);
  res.jsonError = jsonError(res);

  next();
};

export default jsonResponseMiddleware;
