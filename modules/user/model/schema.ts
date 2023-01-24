import { User, UserModel, UserQueryHelpers } from "./types";

import { byUserId } from "./query-helpers";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<User, UserModel, {}, UserQueryHelpers>(
  {
    name: { type: String },
    phone: { type: String },
    userId: { type: Number, index: true },
    block: { type: Number },
    entrance: { type: mongoose.Schema.Types.Mixed, default: "loneEntrance" },
    floor: { type: Number },
    unit: { type: Number },
    username: { type: String },
  },
  {
    query: { byUserId },
  }
);

export default userSchema;
