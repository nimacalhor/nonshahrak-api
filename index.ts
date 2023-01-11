require("dotenv").config({
  path: `./config.env`,
});

import { getDbConnectionUri } from "./util/general-utils";
import { logError } from "./error/error-utils";
import mongoose from "mongoose";
import server from "./server";

process.on("uncaughtException", (err) => {
  logError(err);
  process.exit(1);
});

const connectionUri = getDbConnectionUri();
mongoose.connect(connectionUri, (err) => {
  if (err) return logError(err, `mongoose connection error`, { connectionUri });
  console.log("db connected");
});

["unhandledRejection", "SIGTERM"].forEach((e) =>
  process.on(e, (err: any) => {
    logError(err, `*** ${e} ***`);
    server.close(() => process.exit(1));
    process.exit(1);
  })
);
