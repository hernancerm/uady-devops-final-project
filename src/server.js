import studentRouter from "./router/studentRouter";

import express from "express";

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.use("/api", studentRouter);

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
