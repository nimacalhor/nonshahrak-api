import { Order } from "./types";
import { getPersianDate } from "@src/util/date-utils";

export const dateString = {
  get: function (this: Order) {
    const { day, month, weekday } = getPersianDate(this.date);
    return `${weekday}، ${day.replace(/^0/, "")}ام ${month}`;
  },
};
