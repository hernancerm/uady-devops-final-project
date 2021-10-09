import { StudentRouter } from "./routers/impl/StudentRouter";

import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
app.use(express.json());

createConnection().then(() => {
  app.use("/api", StudentRouter().getAssembledRouter());
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
