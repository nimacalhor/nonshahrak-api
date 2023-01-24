import { HydratedDocument, Model, PaginateModel } from "mongoose";

export interface Admin {
  username: string;
  email: string;
  password: string;
  changedPasswordAt?: Date;
  active: boolean;
  role: string;
}

export type AdminMethods = {
  validatePasswords: (password: string) => Promise<boolean>;
  getToken: () => string;
};

export type AdminDoc = HydratedDocument<Admin, AdminMethods>;


export type AdminModel = Model<Admin, {}, AdminMethods> &
  PaginateModel<Admin, {}, AdminMethods>;
