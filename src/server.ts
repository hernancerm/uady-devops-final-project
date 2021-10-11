import { StudentRouter } from "./routers/impl/StudentRouter";
<<<<<<< HEAD
import { CourseRouter } from "./routers/impl/CourseRouter";

=======
>>>>>>> 39b3902a347331c3219bc190fc27d1ec1fa86e76
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { UserRouter } from "./routers/impl/UserRouter";
import { AuthRouter } from "./routers/impl/AuthRouter";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();
app.use(express.json());
const authenticateJWT = AuthMiddleware().authenticateJWT;

createConnection().then(() => {
  app.use("/api", AuthRouter().getAssembledRouter());
  app.use("/api", authenticateJWT, StudentRouter().getAssembledRouter());
  app.use("/api", authenticateJWT, UserRouter().getAssembledRouter());
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
