import { Request, Response } from "express";
import {
  createGetAllController,
  getDateSetter,
  getGroupCounter,
} from "../../general/factories/factory";
import {
  getGroupByOrOperator,
  getGroupValues,
} from "@src/modules/general/util/general-utils";

import Order from "../model";
import escortC from "@src/modules/general/util/escort-controller";
import { getTomorrowsDate } from "@src/modules/general/util/date-utils";

export const getAllOrders = createGetAllController(Order);

export const setDayTomorrow = getDateSetter(getTomorrowsDate());

export const setDayToday = getDateSetter(new Date());

export const monthOrderCount = getGroupCounter("month", "month", Order);

export const breadTypeCount = getGroupCounter(null, "breadType", Order);

export const daysOrderCount = getGroupCounter("days", "day", Order);

export const averagePricePerMonth = escortC(averagePricePerMonthController);

async function averagePricePerMonthController(req: Request, res: Response) {
  const month = getGroupValues(req, "month");
  const monthData = await Order.aggregate()
    .match(getGroupByOrOperator(month, "month"))
    .group({
      _id: "$month",
      average: {
        $avg: {
          $convert: { input: "$price", to: "int" },
        },
      },
    });
  res.jsend.success({ monthData }, 200, { month });
}
