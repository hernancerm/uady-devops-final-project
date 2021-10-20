import { UserController } from "../../controllers/UserController";
import { UserRepository } from "../../repositories/UserRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import LoggingMiddleware from "../../middlewares/LoggingMiddleware";

export const AuthRouter = (): RouterAssembler => {
  const userController = UserController(getCustomRepository(UserRepository));
  const router = Router();
  router.route("/auth/signup").post(LoggingMiddleware, userController.signUp);
  router.route("/auth/login").post(LoggingMiddleware, userController.getToken);
  return { getAssembledRouter: () => router };
};
