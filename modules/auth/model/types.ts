import { HydratedDocument, Model, ObjectId } from "mongoose";

export interface Token {
  adminId: ObjectId;
  token: string;
  createdAt: Date;
}

export type TokenDoc = HydratedDocument<Token>;

export interface TokenModel extends Model<Token> {
  getPasswordToken: () => string;
  hashPasswordToken: (password: string) => Promise<string>;
}
