import { NextFunction, Request, RequestHandler, Response } from "express";

import AppError from "@src/modules/error/AppError";

const pathsToFix = Object.freeze(["day", "month", "year", "amount", "price"]);

type ReqBody = { [key: string]: string | number };

function shouldFixPath(path: string) {
  return pathsToFix.includes(path);
}

function addDollarSign(string: string) {
  return string.replace(/\b(gt|gte|lt|lte)\b/gm, (match) => `$${match}`);
}

function createRawOperator(query: string) {
  const keyValues = query
    .split(",")
    .map((keyvalue) => `"${keyvalue.split(" ")[0]}":${keyvalue.split(" ")[1]}`);
  return `{${keyValues.join(",")}}`;
}

function isSecondPartsNumber(keyValues: string[]) {
  const booleanResultArr = keyValues.map(
    (keyvalue) => !/\D/.test(keyvalue.split(" ")[1])
  );
  if (booleanResultArr.some((bln) => !bln)) return false;
  return true;
}

function isOperatorsValid(kayValues: string[]) {
  const operators = kayValues.map((keyvalue) => keyvalue.split(" ")[0]);
  const booleanResultArr = operators.map((opr) =>
    /\b(gt|gte|lt|lte)\b/gm.test(opr)
  );
  if (booleanResultArr.some((bln) => bln === false)) return false;
  return true;
}

function validateValue(path: string, value: string) {
  const keyValues = value.split(",");
  if (isOperatorsValid(keyValues) && isSecondPartsNumber(keyValues)) return;
  throw new AppError(
    `req body property value is invalid [${path}] [${value}]`,
    400
  );
}

function fixQuery(path: string, query: string | number) {
  if (!/\D/.test(query + "")) return query;
  if (!shouldFixPath(path)) return query;
  validateValue(path, query + "");
  const newQuery = addDollarSign(query + "");
  const stringQuery = createRawOperator(newQuery);
  return JSON.parse(stringQuery);
}

function middleware(
  req: Request<any, any, ReqBody>,
  res: Response,
  next: NextFunction
) {
  Object.entries(req.body).forEach(
    ([key, value]) => (req.body[key] = fixQuery(key, value))
  );
  next();
}
const reqBodyQueryFixer: RequestHandler<any, any, ReqBody> = middleware;

export { fixQuery };
export default reqBodyQueryFixer;
