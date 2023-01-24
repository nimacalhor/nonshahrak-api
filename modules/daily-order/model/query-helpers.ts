import { DailyOrderDoc } from "./types";
import { Query } from "mongoose";
import { getUserByIdQHelper } from "../../general/factories/query-helper-factory";

export const byUserId = getUserByIdQHelper<DailyOrderDoc>();

export const inDay = function (
  this: Query<DailyOrderDoc[], DailyOrderDoc>,
  day: number
) {
  return this.findOne({ days: day });
};
