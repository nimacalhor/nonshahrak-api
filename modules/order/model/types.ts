import mongoose, {
  HydratedDocument,
  Model,
  ObjectId,
  Query,
  QueryWithHelpers,
} from "mongoose";

export interface Order {
  breadType: string;
  amount: number;
  time: string;
  user: ObjectId;
  userId: number;
  price: number;
  date: Date;
  day: number;
  month: number;
  year: number;
  paid: boolean;
  authority: string;
  refId: string | number;
  duplicated: boolean;
}

export interface OrderVirtuals {
  dateString: {
    get: () => string;
  };
}
export interface OrderMethods {
  existsInDate: (date: Date) => boolean;
}

export type OrderDoc = HydratedDocument<Order, OrderMethods, OrderVirtuals>;

export interface OrderQueryHelpers {
  byUserId(
    userId: number | undefined
  ): QueryWithHelpers<OrderDoc[], OrderDoc, OrderQueryHelpers>;
  tomorrows(): Query<OrderDoc[], OrderDoc>;
}

export type OrderModel = Model<
  OrderDoc,
  OrderQueryHelpers,
  OrderMethods,
  OrderVirtuals
> &
  mongoose.PaginateModel<OrderDoc, OrderQueryHelpers, OrderMethods>;
