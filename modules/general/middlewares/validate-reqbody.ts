import { NextFunction, Request, Response } from "express";
import { ValidateFn } from "mongoose";

import { throwAppError } from "@src/modules/error/error-utils";

import { RequireAtLeastOne } from "../types";

type ValidateDataTypeFlags = "string" | "number" | "Object";
type ValidateFnType = (value: any) => string | null;

type ValidateDataValidateType = RequireAtLeastOne<{
  validate?: ValidateFnType;
  type?: ValidateDataTypeFlags;
}>;

export type ValidateData = {
  path: string;
} & ValidateDataValidateType;

function validateReqBodyFor(...validatesData: ValidateData[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      validatesData.forEach((data) => validateReqBodyPath(req, data));
    } catch (error) {
      return next(error);
    }
    next();
  };
}

export default validateReqBodyFor;

function validateReqBodyPath(req: Request, data: ValidateData) {
  const { path, validate, type } = data;
  const value = req.body[path];
  if (type) return validateType(path, value, type);
  if (!!validate) return validateByValidateFn(path, value, validate);
}

function validateType(path: string, value: any, type: ValidateDataTypeFlags) {
  if (typeof value !== type)
    return throwAppError(
      `req.body.${path} must be of type ${type} received ${value}`,
      400
    );
}

function validateByValidateFn(
  path: string,
  value: any,
  validate: ValidateFnType
) {
  const validateResult = validate(value);
  if (typeof validateResult === "string")
    return throwAppError(
      `req.body.${path} is not valid: ${validateResult}`,
      400
    );
}
