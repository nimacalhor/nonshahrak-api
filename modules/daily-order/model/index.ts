import { DailyOrderDoc, DailyOrderModel } from "./types";

import dailyOrderSchema from "./schema";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

dailyOrderSchema.plugin(mongoosePaginate as any);

export default mongoose.model<DailyOrderDoc, DailyOrderModel>(
  "DailyOrder",
  dailyOrderSchema,
  "DailyOrder"
);
