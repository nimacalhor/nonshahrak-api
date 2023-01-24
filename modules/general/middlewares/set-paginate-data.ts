import { NextFunction, Request, RequestHandler, Response } from "express";

import { PaginateOptions } from "mongoose";

const queryPaths = Object.freeze([
  "day",
  "month",
  "year",
  "amount",
  "price",
  "paid",
  "userId",
  "breadType",
  "user",
  "refId",
  "name",
  "userId",
  "phone",
  "block",
  "entrance",
  "floor",
  "unit",
  "username",
]);

const paginateOptionTitles: (keyof PaginateOptions)[] = [
  "sort",
  "page",
  "limit",
  "offset",
  "populate",
  "select",
];

function isKeyQuery(key: string) {
  return queryPaths.includes(key);
}

function isKeyPaginateOption(key: string) {
  return paginateOptionTitles.includes(key as keyof PaginateOptions);
}

function middleware(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const paginateQuery: any = {};
  const paginateOptions: any = {};
  Object.entries(body).forEach(([key, value]) => {
    if (isKeyQuery(key)) paginateQuery[key] = value;
    if (isKeyPaginateOption(key)) paginateOptions[key] = value;
  });
  req.paginateQuery = paginateQuery;
  req.paginateOptions = paginateOptions;
  next();
}

const setPaginateData: RequestHandler = middleware;

export default setPaginateData;
