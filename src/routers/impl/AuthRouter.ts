import { UserController } from "../../controllers/UserController";
import { UserRepository } from "../../repositories/UserRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export const AuthRouter = (): RouterAssembler => {
  const userController = UserController(getCustomRepository(UserRepository));
  const router = Router();
  router.route("/auth/signup").post(userController.signUp);
  router.route("/auth/login").post(userController.getToken);
  return { getAssembledRouter: () => router };
};
