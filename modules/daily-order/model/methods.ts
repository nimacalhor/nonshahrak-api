import { DailyOrderDoc } from "./types";
import { getNextDate } from "@src/modules/general/util/date-utils";

export const getDates = function (this: DailyOrderDoc) {
  const dates = [...this.days].map((d) => getNextDate(d));
  return dates;
};
