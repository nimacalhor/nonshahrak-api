import express from "express";
import orderControllers from "@controller/order-controllers";

const router = express.Router();

router.route("/").get(orderControllers.getOrders);

export default router;
