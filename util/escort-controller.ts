import { RequestHandler } from "express";

const escortC = function <TResBody = any, TReqBody = any, TReqQuery = any>(
  c: RequestHandler<any, TResBody, TReqBody, TReqQuery>
): RequestHandler<any, TResBody, TReqBody, TReqQuery> {
  return (req, res, next) =>
    (c(req, res, next) as any).catch((err: any) => next(err));
};

export default escortC;
