import { OrderDoc, OrderQueryHelpers } from "./types";
import { Query, QueryWithHelpers } from "mongoose";

import { getTomorrowsDate } from "@src/util/date-utils";

type ThisType = Query<OrderDoc[], OrderDoc, OrderQueryHelpers>;
type ReturnType = QueryWithHelpers<OrderDoc[], OrderDoc, OrderQueryHelpers>;

export const tomorrows = function (this: ThisType): ReturnType {
  const tomorrowsDate = getTomorrowsDate();
  const tomorrowsDay = tomorrowsDate.getDate();
  const month = tomorrowsDate.getMonth();
  const query = this.find({
    day: tomorrowsDay,
    month,
  });
  return query;
};

export const byUserId = function (
  this: ThisType,
  userId: number | undefined
): ReturnType {
  const query = this.find({ userId });
  return query;
};
