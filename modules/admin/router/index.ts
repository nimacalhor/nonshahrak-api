import { protect, restrictTo } from "../../auth/controller/auth-controller";

import express from "express";
import { getAllAdmins } from "../controller/admin-controller";
import meRouter from "./me-router";
import oneAdminRouter from "./one-admin-router";

const router = express.Router();

router.route("/").get(protect, getAllAdmins);
router.use("/me", protect, meRouter);
router.use("/:id", protect, restrictTo("MANAGER"), oneAdminRouter);

export default router;
