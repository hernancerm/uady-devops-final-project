import { StudentRouter } from "./routers/impl/StudentRouter";
import { UserRouter } from "./routers/impl/UserRouter";
import { AuthRouter } from "./routers/impl/AuthRouter";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { CourseRouter } from "./routers/impl/CourseRouter";
import { createLogger } from "./loggers/logger";

import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { TestRouter } from './routers/impl/TestRouter'

const LOGGER = createLogger(__filename);

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
app.use(express.json());
app.use(cors());

const authenticateJWT = AuthMiddleware().authenticateJWT;

createConnection().then(() => {
  app.use("/api", AuthRouter().getAssembledRouter());
  app.use("/api", authenticateJWT, StudentRouter().getAssembledRouter());
  app.use("/api", authenticateJWT, UserRouter().getAssembledRouter());
  app.use("/api", authenticateJWT, CourseRouter().getAssembledRouter());
  app.use("/api", TestRouter().getAssembledRouter())
});

app.listen(PORT, HOST);

LOGGER.info(`Running on http://${HOST}:${PORT}`);
