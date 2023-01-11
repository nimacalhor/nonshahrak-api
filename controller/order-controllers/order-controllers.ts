import { ReqBody, ResponseType } from "./types";

import Order from "@src/model/order";
import { RequestHandler } from "express";
import escortC from "../../util/escort-controller";

export const getOrders: RequestHandler<any, any, ReqBody> = escortC<
  ResponseType,
  ReqBody
>(async function (req, res, next) {
  const { docs, ...result } = await Order.paginate(req.body, {});
  res.jsend.success({ orders: docs }, 200, { ...result });
});
