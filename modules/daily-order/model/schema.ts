import { DailyOrder, DailyOrderModel, DailyOrderQueryHelpers } from "./types";
import { byUserId, inDay } from "./query-helpers";
import mongoose, { Types } from "mongoose";

import { getDates } from "./methods";

const dailyOrderSchema = new mongoose.Schema<
  DailyOrder,
  DailyOrderModel,
  {},
  DailyOrderQueryHelpers
>(
  {
    days: { type: [Number], default: [] },
    amount: { type: Number },
    breadType: { type: String },
    time: { type: String },
    user: {
      ref: "User",
      type: Types.ObjectId,
    },
    userId: { type: Number },
    duplicated: { type: Boolean, default: false },
  },
  {
    query: { byUserId, inDay },
    methods: { getDates },
  }
);

export default dailyOrderSchema;
