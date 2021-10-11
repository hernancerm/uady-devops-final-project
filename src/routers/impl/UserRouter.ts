import { UserController } from "../../controllers/UserController";
import { UserRepository } from "../../repositories/UserRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

export const UserRouter = (): RouterAssembler => {
  const userController = UserController(getCustomRepository(UserRepository));
  const authenticateJWT = AuthMiddleware().authenticateJWT;
  const router = Router();
  router.route("/auth/signup").post(userController.post);
  router.route("/auth/login").post(userController.getToken);
  router.route("/users").get(authenticateJWT, userController.getAll);
  return { getAssembledRouter: () => router };
};
