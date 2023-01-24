import { Query } from "mongoose";

export function getUserByIdQHelper<TDoc extends {}>() {
  return function (
    this: Query<TDoc[] | TDoc, TDoc>,
    userId: number | undefined
  ): Query<TDoc | null, TDoc> {
    const query = this.findOne({ userId });
    return query;
  };
}
