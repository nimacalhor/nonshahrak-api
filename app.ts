import express from "express";
import sanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import adminRouter from "@modules/admin/router";
import { protect } from "@modules/auth/controller/auth-controller";
import authRouter from "@modules/auth/router";
import dailyOrderRouter from "@modules/daily-order/router/daily-order-router";
import globalErrorMw from "@modules/error/controller/error-controller";
import limiter from "@modules/general/middlewares/limiter";
import { getEndPoint, isEnv } from "@modules/general/util/general-utils";
import setJsend from "@modules/general/util/jsend";
import orderRouter from "@modules/order/router";
import userRouter from "@modules/user/router/user-router";

const xss = require("xss-clean");

function createServer() {
  const app = express();

  if (isEnv("development")) app.use(morgan("dev"));
  app.use(helmet());
  app.use(express.json({ limit: "10kb" }));
  app.use(limiter);
  app.use(sanitize());
  app.use(xss());
  app.use(hpp());
  app.use(setJsend);

  app.use(getEndPoint("orders"), protect, orderRouter);
  app.use(getEndPoint("daily-orders"), protect, dailyOrderRouter);
  app.use(getEndPoint("users"), protect, userRouter);
  app.use(getEndPoint("admins"), protect, adminRouter);
  app.use(getEndPoint("auth"), authRouter);
  app.use(globalErrorMw);
  return app;
}

export default createServer;
