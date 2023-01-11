import { ObjectId } from "mongoose";
import { OrderDoc } from "@src/types/order";

export interface ReqBody {
  userId?: string;
  paid?: boolean;
  day?: string;
  month?: string;
  year?: string;
  breadType?: string;
  user?: ObjectId;
  refId?: string;
  page?: string;
  limit?: string;
  sort?: string;
  paths?: string;
}

export type ResponseType = OrderDoc[];
