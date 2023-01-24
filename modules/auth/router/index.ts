import express from "express";

import checkReqBodyFor from "@modules/general/middlewares/check-reqbody";
import validateReqBodyFor from "@modules/general/middlewares/validate-reqbody";
import { isEnv } from "@src/modules/general/util/general-utils";

import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
} from "../../auth/controller/auth-controller";

const router = express.Router();

const checkReqBodyForAuth = checkReqBodyFor({
  optionalPaths: ["email", "username"],
  requiredPaths: ["password"],
});

const validateReqBodyForAuth = validateReqBodyFor(
  {
    path: "email",
    type: "string",
  },
  {
    path: "password",
    type: "string",
  },
  {
    path: "username",
    type: "string",
  }
);

router.route("/signup").post(...getSignupMiddlewares());
router.route("/login").post(checkReqBodyForAuth, validateReqBodyForAuth, login);

router
  .route("/forgot-password")
  .post(checkReqBodyFor({ requiredPaths: ["email"] }), forgotPassword);

router
  .route("/reset-password")
  .post(
    checkReqBodyFor({ requiredPaths: ["token", "id", "newPassword"] }),
    resetPassword
  );

router
  .route("/update-password")
  .post(
    protect,
    checkReqBodyFor({ requiredPaths: ["password", "newPassword"] }),
    updatePassword
  );

export default router;

function getSignupMiddlewares() {
  if (isEnv("development"))
    return [checkReqBodyForAuth, validateReqBodyForAuth, signup];
  return [
    protect,
    restrictTo("MANAGER"),
    checkReqBodyForAuth,
    validateReqBodyForAuth,
    signup,
  ];
}
