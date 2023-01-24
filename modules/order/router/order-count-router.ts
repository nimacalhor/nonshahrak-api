import {
  breadTypeCount,
  daysOrderCount,
  monthOrderCount,
} from "../controller/order-controller";

import express from "express";

const router = express.Router({
  mergeParams: true,
});

router.route("/month").get(monthOrderCount);

router.route("/bread-type").get(breadTypeCount);

router.route("/days").get(daysOrderCount);

export default router;
