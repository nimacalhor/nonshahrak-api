import { OrderDoc, OrderQueryHelpers } from "./types";
import { Query, QueryWithHelpers } from "mongoose";

import { getTomorrowsDate } from "@src/modules/general/util/date-utils";

type ThisType = Query<OrderDoc[], OrderDoc, OrderQueryHelpers>;
type ReturnType = QueryWithHelpers<OrderDoc[], OrderDoc, OrderQueryHelpers>;

export function tomorrows(this: ThisType): ReturnType {
  const tomorrowsDate = getTomorrowsDate();
  const tomorrowsDay = tomorrowsDate.getDate();
  const month = tomorrowsDate.getMonth();
  const query = this.find({
    day: tomorrowsDay,
    month,
  });
  return query;
}

export function byUserId(
  this: ThisType,
  userId: number | undefined
): ReturnType {
  const query = this.find({ userId });
  return query;
}
