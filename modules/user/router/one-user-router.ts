import {
  getUser,
  getUsersDailyOrders,
  getUsersOrders,
} from "@src/modules/user/controller/one-user-controller";

import express from "express";

const router = express.Router({ mergeParams: true });

router.route("/").get(getUser);
router.route("/orders").get(getUsersOrders);
router.route("/dailyOrders").get(getUsersDailyOrders);

export default router;
