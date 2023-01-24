import { Order, OrderModel, OrderQueryHelpers } from "./types";
import { byUserId, tomorrows } from "./query-helpers";

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema<
  Order,
  OrderModel,
  {},
  OrderQueryHelpers
>(
  {
    breadType: {
      type: String,
    },
    amount: { type: Number },
    time: {
      type: String,
    },
    userId: { type: Number, index: true },
    user: {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
    price: {
      type: Number,
    },
    date: {
      type: Date,
    },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    paid: { type: Boolean, default: false },
    refId: { type: Number, select: false },
  },
  {
    query: {
      byUserId: byUserId as unknown as OrderQueryHelpers["byUserId"],
      tomorrows,
    },
  }
);

console.log("session schema", "read end");

export default orderSchema;
