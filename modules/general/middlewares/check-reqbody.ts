import { NextFunction, Request, Response } from "express";

import AppError from "@src/modules/error/AppError";

type CheckData = {
  optionalPaths?: string[];
  requiredPaths?: string[];
};

function checkReqBodyFor(data: CheckData) {
  const { optionalPaths, requiredPaths } = data;
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      if (requiredPaths) return checkRequiredPaths(req, requiredPaths);
      if (optionalPaths) return checkOptionalPaths(req, optionalPaths);
    } catch (error) {
      return next(error);
    }
    next();
  };
}

export default checkReqBodyFor;

function checkRequiredPaths(req: Request, paths: string[]) {
  paths.forEach((path) => {
    if (!req.body[path]) throw new AppError(`no ${path} in req body`, 400);
  });
}

function checkOptionalPaths(req: Request, paths: string[]) {
  if (!paths.some((path) => !!req.body[path]))
    throw new AppError(
      `req body must at least contain one property from properties : [${paths.join(
        ", "
      )}]`,
      400
    );
}
