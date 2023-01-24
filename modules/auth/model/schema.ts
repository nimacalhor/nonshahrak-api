import * as crypto from "crypto";

import { Token, TokenModel } from "./types";

import { TOKEN_MODEL_EXPIRER_DATE } from "../constants";
import bcrypt from "bcrypt";
import { getEnvVar } from "@src/modules/general/util/general-utils";
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema<Token, TokenModel>({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: TOKEN_MODEL_EXPIRER_DATE,
  },
});

tokenSchema.static("getPasswordToken", getPasswordToken);
tokenSchema.static("hashPasswordToken", hashPasswordToken);

export default tokenSchema;

function getPasswordToken() {
  return crypto.randomBytes(32).toString("hex");
}
async function hashPasswordToken(resetToken: string) {
  return await bcrypt.hash(resetToken, Number(getEnvVar("BCRYPT_SALT")));
}
