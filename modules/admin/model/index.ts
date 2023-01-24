import { Admin, AdminModel } from "./types";

import adminSchema from "./schema";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

adminSchema.plugin(mongoosePaginate as any);

export default mongoose.model<Admin, AdminModel>("Admin", adminSchema, "Admin");
