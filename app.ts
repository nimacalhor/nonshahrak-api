import { getEndPoint, isEnv } from "./util/general-utils";

import agent from "superagent";
import express from "express";
import morgan from "morgan";
import orderRouter from "@routes/order-router";
import setJsend from "./util/jsend";

const app = express();

if (isEnv("development")) app.use(morgan("dev"));
app.use(setJsend);

app.use(getEndPoint("orders"), orderRouter);

export default app;

// const test = async () => {
//   const res = await agent.get("http://localhost:3000/api/v1/orders").send({});
//   console.log({ res });
// };
// test();
