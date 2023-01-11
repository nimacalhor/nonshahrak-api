import { ErrorRequestHandler, Response } from "express";

import AppError from "@src/error/AppError";

const handleAppError = function (err: AppError, res: Response) {
  const { message, name, statusCode, stack } = err;
  res.jsend.fail({ message, name }, statusCode);
  console.log({ stack });
};

const handleGeneralError = function (err: Error, res: Response) {
  const { message } = err;
  res.jsend.fail({ message }, 400);
};

const globalErrorMw: ErrorRequestHandler = function (err, req, res, next) {
  if (err instanceof AppError) return handleAppError(err, res);
  return handleGeneralError(err, res);
};

export default globalErrorMw;
