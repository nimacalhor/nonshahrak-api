import express from "express";
import { getAllDailyOrders } from "@src/modules/daily-order/controller/daily-order-controller";
import reqBodyQueryFixer from "@src/modules/general/middlewares/query-fixer";
import setPaginateData from "@src/modules/general/middlewares/set-paginate-data";

const router = express.Router();

router.route("/").get(reqBodyQueryFixer, setPaginateData, getAllDailyOrders);

export default router;
