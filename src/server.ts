import { StudentRouter } from "./routers/impl/StudentRouter";

import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { UserRouter } from "./routers/impl/UserRouter";

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
app.use(express.json());

createConnection().then(() => {
  app.use("/api", StudentRouter().getAssembledRouter());
  app.use("/api", UserRouter().getAssembledRouter());
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
