require("dotenv").config({
  path: `./config.env`,
});

import { Server } from "http";
import mongoose from "mongoose";
import createServer from "./app";
import { logError } from "./modules/error/error-utils";
import { getDbConnectionUri } from "./modules/general/util/general-utils";

process.on("uncaughtException", (err) => {
  logError(err);
  process.exit(1);
});

const connectionUri = getDbConnectionUri();
let server: Server;
console.log({ connectionUri });
mongoose.connect(connectionUri, (err) => {
  if (err) return logError(err, `mongoose connection error`, { connectionUri });
  console.log("db connected");

  server = createServer().listen(process.env.PORT, () =>
    console.log("listening...")
  );
});

["unhandledRejection", "SIGTERM"].forEach((e) =>
  process.on(e, (err: any) => {
    logError(err, `*** ${e} ***`);
    server.close(() => process.exit(1));
    process.exit(1);
  })
);
