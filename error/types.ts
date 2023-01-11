import { Error, MongooseError } from "mongoose";

import AppError from "./AppError";

export type ExpectedMongooseError =
  | Error.CastError
  | Error.ValidationError
  | Error.ValidatorError
  | MongooseError;

export type ExpectedAppError = ExpectedMongooseError | AppError;
