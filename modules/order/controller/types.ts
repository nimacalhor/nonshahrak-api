import { Request } from "express";

export type DaysCountCriteria =
  | (string | number)[]
  | string
  | number
  | undefined;

export type DaysCountRequest = Request<
  any,
  any,
  {
    [key: string]: any;
    days: DaysCountCriteria;
  }
>;
