import { nextTick } from "process";

import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { DocumentOrQueryMiddleware, ValidatorProps } from "mongoose";

import { getEnvVar } from "@src/modules/general/util/general-utils";

import { AdminRoles, AdminRolesArr } from "./../constants";
import { USERNAME_MAX_LENGTH } from "../constants";
import { hashPassword } from "../util";
import { Admin, AdminDoc, AdminModel } from "./types";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "./validators";

const adminSchema = new mongoose.Schema<Admin, AdminModel>({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validateEmail,
      message: (props: ValidatorProps) => `invalid email [${props.value}]`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: validatePassword,
      message: (props: ValidatorProps) => `invalid password [${props.value}]`,
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: USERNAME_MAX_LENGTH,
    validate: {
      validator: validateUsername,
      message: (props: ValidatorProps) => `invalid username [${props.value}]`,
    },
  },
  changedPasswordAt: {
    type: Date,
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  role: {
    type: String,
    default: AdminRoles.admin as string,
  },
});

adminSchema.pre("save", hashPasswordBeforeSave);
adminSchema.pre("save", setChangedPasswordAt);

adminSchema.method("getToken", getToken);
adminSchema.method("validatePasswords", validatePasswords);

export default adminSchema;

async function hashPasswordBeforeSave(this: AdminDoc, next: () => void) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
}

function setChangedPasswordAt(this: AdminDoc, next: () => void) {
  if (this.isNew) return next();
  if (!this.isModified("password")) return next();
  this.changedPasswordAt = new Date(Date.now() - 5000);
  next();
}

function getToken(this: AdminDoc) {
  return jwt.sign({ id: this._id }, getEnvVar("JWT_SECRET"), {
    expiresIn: getEnvVar("JWT_EXPIRES_IN_DAYS") + "d",
  });
}

async function validatePasswords(this: AdminDoc, password: string) {
  return compare(password, this.password);
}
