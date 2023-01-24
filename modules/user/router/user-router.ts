import express from "express";
import { getAllUsers } from "../controller/user-controllers";
import oneUserRouter from "@src/modules/user/router/one-user-router";
import reqBodyQueryFixer from "@src/modules/general/middlewares/query-fixer";
import setPaginateData from "@src/modules/general/middlewares/set-paginate-data";

const router = express.Router();

router.route("/").get(reqBodyQueryFixer, setPaginateData, getAllUsers);
router.use("/:id", oneUserRouter);

export default router;
