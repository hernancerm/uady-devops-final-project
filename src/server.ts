import { StudentRouter } from "./routers/impl/StudentRouter";
import { UserRouter } from "./routers/impl/UserRouter";
import { AuthRouter } from "./routers/impl/AuthRouter";
import { CourseRouter } from "./routers/impl/CourseRouter";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { LoggingMiddleware } from "./middlewares/LoggingMiddleware";
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

createConnection().then(() => {
  // Middlewares
  app.use("/api/auth", LoggingMiddleware);
  // Within the non-capturing group (?:auth) add any other non-protected routes.
  // For instance, (?:auth) -> (?:auth|foo) to NOT protect /api/auth/** AND /api/foo/**.
  app.use(/\/api(?!\/(?:auth))/, LoggingMiddleware, AuthMiddleware);

  // Routers
  app.use("/api/auth", AuthRouter().getAssembledRouter());
  app.use("/api/students", StudentRouter().getAssembledRouter());
  app.use("/api/users", UserRouter().getAssembledRouter());
  app.use("/api/courses", CourseRouter().getAssembledRouter());
  app.use("/api/health", TestRouter().getAssembledRouter());
});

app.listen(PORT, HOST);

LOGGER.info(`Running on http://${HOST}:${PORT}`);
