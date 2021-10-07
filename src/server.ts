import studentRouter from "./routers/student.router";

import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
createConnection();

app.use("/api", studentRouter);

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
