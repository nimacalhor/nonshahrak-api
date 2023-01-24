import express from "express";

import checkReqBodyFor from "@modules/general/middlewares/check-reqbody";

import {
  disableAdmin,
  getAdmin,
  updateAdmin,
} from "../controller/one-admin-controller";

const router = express.Router({ mergeParams: true });

const checkReqBody = checkReqBodyFor({ optionalPaths: ["email", "username"] });

router
  .route("/")
  .get(getAdmin)
  .delete(disableAdmin)
  .patch(checkReqBody, updateAdmin);

export default router;
