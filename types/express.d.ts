import { Jsend } from "@src/modules/general/util/jsend";
import { Admin } from "../modules/admin/model/types";

export {};

declare global {
  namespace Express {
    export interface Response {
      jsend: Jsend;
    }

    export interface Request {
      paginateQuery: { [key: string]: any };
      paginateOptions: { [key: string]: any };
      admin: AdminDoc | undefined;
    }
  }
}
