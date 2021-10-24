import { StudentRouter } from "./routers/impl/StudentRouter";
import { UserRouter } from "./routers/impl/UserRouter";
import { AuthRouter } from "./routers/impl/AuthRouter";
import { CourseRouter } from "./routers/impl/CourseRouter";
import { AuthJwtMiddleware } from "./middlewares/AuthJwtMiddleware";
import { LoggingMiddleware } from "./middlewares/LoggingMiddleware";
import { createLogger } from "./loggers/logger";

import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

const LOGGER = createLogger(__filename);

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
app.use(express.json());

createConnection().then(() => {
  // Middlewares
  app.use("/api/auth", LoggingMiddleware);
  // Within the non-capturing group (?:auth) add any other non-protected routes.
  // For instance, (?:auth) -> (?:auth|foo) to NOT protect /api/auth/** AND /api/foo/**.
  app.use(/\/api(?!\/(?:auth))/, LoggingMiddleware, AuthJwtMiddleware);

  // Routers
  app.use("/api/auth", AuthRouter().getAssembledRouter());
  app.use("/api/students", StudentRouter().getAssembledRouter());
  app.use("/api/users", UserRouter().getAssembledRouter());
  app.use("/api/courses", CourseRouter().getAssembledRouter());
});

app.listen(PORT, HOST);

LOGGER.info(`Running on http://${HOST}:${PORT}`);
