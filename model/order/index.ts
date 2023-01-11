import { OrderDoc, OrderModel } from "./types";

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import orderSchema from "./schema";

orderSchema.plugin(mongoosePaginate as any);

export default mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
