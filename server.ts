import app from "./app";

const port = process.env.PORT as string;
const server = app.listen(port, () =>
  console.log(`server is running [${port}]`)
);

export default server;
