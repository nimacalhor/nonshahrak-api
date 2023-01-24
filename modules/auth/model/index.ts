import { Token, TokenModel } from "./types";

import mongoose from "mongoose";
import tokenSchema from "./schema";

export default mongoose.model<Token, TokenModel>(
  "PasswordToken",
  tokenSchema,
  "PasswordToken"
);
