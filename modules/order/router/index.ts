import {
  averagePricePerMonth,
  breadTypeCount,
  daysOrderCount,
  getAllOrders,
  monthOrderCount,
  setDayTomorrow,
} from "../controller/order-controller";

import express from "express";
import orderCountRouter from "./order-count-router";
import reqBodyQueryFixer from "@src/modules/general/middlewares/query-fixer";
import { setDayToday } from "./../controller/order-controller";
import setPaginateData from "@src/modules/general/middlewares/set-paginate-data";

const router = express.Router();

const paginateMiddlewares = [reqBodyQueryFixer, setPaginateData];

router.route("/").get(...paginateMiddlewares, getAllOrders);
router
  .route("/tomorrows")
  .get(setDayTomorrow, ...paginateMiddlewares, getAllOrders);

router.route("/todays").get(setDayToday, ...paginateMiddlewares, getAllOrders);

router.use("/count", orderCountRouter);

router.route("/average-price").get(averagePricePerMonth);

export default router;
