import {
  createGetManyFromOneController,
  createGetOneController,
} from "../../general/factories/factory";

import DailyOrder from "@src/modules/daily-order/model";
import Order from "../model";
import User from "@src/modules/user/model";

export const getUser = createGetOneController(User);

export const getUsersOrders = createGetManyFromOneController("user", Order);

export const getUsersDailyOrders = createGetManyFromOneController(
  "user",
  DailyOrder
);
