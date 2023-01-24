import express from "express";

import checkReqBodyFor from "@src/modules/general/middlewares/check-reqbody";
import validateReqBodyFor from "@src/modules/general/middlewares/validate-reqbody";

import { disableMe, getMe, updateMe } from "../controller/me-controller";

const router = express.Router({ mergeParams: true });

const checkReqBody = checkReqBodyFor({ optionalPaths: ["email", "username"] });

router.route("/").get(getMe).patch(checkReqBody, updateMe).delete(disableMe);

export default router;
