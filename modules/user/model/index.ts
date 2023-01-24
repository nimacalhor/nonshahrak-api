import { UserDoc, UserModel } from "./types";

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import userSchema from "./schema";

userSchema.plugin(mongoosePaginate as any);

export default mongoose.model<UserDoc, UserModel>("User", userSchema, "User");
