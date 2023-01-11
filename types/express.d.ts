import { Jsend } from "@util/jsend";

export {};

declare global {
  namespace Express {
    export interface Response {
      jsend: Jsend;
    }
  }
}
