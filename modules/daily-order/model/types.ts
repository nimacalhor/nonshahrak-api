import mongoose, {
  HydratedDocument,
  Model,
  ObjectId,
  Query,
  QueryWithHelpers,
} from "mongoose";

export interface DailyOrder {
  days: number[];
  breadType: string;
  amount: number;
  time: string;
  user: ObjectId;
  userId: number;
  price: number;
  duplicated: boolean;
}

export interface DailyOrderQueryHelpers {
  byUserId(
    this: Query<any, DailyOrderDoc>,
    userId: number | undefined
  ): Query<DailyOrderDoc | null, DailyOrderDoc>;
  inDay(day: number): Query<DailyOrderDoc | null, DailyOrderDoc>;
}

export interface DailyOrderVirtuals {
  dateString: {
    get: () => string;
  };
}

export interface DailyOrderInstanceMethods {
  getDates: () => Date[];
}

export type DailyOrderDoc = HydratedDocument<
  DailyOrder,
  DailyOrderInstanceMethods,
  DailyOrderVirtuals
>;

export type DailyOrderModel = Model<
  DailyOrderDoc,
  DailyOrderQueryHelpers,
  DailyOrderInstanceMethods,
  DailyOrderVirtuals
> &
  mongoose.PaginateModel<
    DailyOrderDoc,
    DailyOrderQueryHelpers,
    DailyOrderInstanceMethods
  >;
