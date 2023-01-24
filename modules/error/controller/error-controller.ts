import { NextFunction, Request, Response } from "express";

import AppError from "@src/modules/error/AppError";
import mongoose from "mongoose";

function globalErrorMw(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log({ err });
  if (typeof err === "string") return handleStringError(err, res);
  if (err instanceof AppError) return handleAppError(err, res);
  if (isMongooseError(err)) return handleMongooseError(err, res);
  return handleGeneralError(err, res);
}

export default globalErrorMw;

function isMongooseError(err: any) {
  if (mongoose.MongooseError) return err instanceof mongoose.MongooseError;
  if (err.name && err.name !== "") return true;
}

function handleStringError(err: any, res: Response) {
  res.jsend.error(err, 500);
}

function handleAppError(err: AppError, res: Response) {
  const { message, name, statusCode, stack } = err;
  res.jsend.fail({ message, name }, statusCode);
  console.log({ stack });
}

function handleMongooseError(err: mongoose.MongooseError, res: Response) {
  const { message, name } = err;
  res.jsend.fail({ message, name }, 400);
}

function handleGeneralError(err: Error, res: Response) {
  const { message } = err;
  res.jsend.fail({ message }, 400);
}
