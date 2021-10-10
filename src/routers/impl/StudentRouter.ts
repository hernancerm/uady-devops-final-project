import { StudentController } from "../../controllers/StudentController";
import { StudentRepository } from "../../repositories/StudentRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

export const StudentRouter = (): RouterAssembler => {
  const studentController = StudentController(
    getCustomRepository(StudentRepository)
  );

  const BASE_PATH = "/students";

  const router = Router();
  const authenticateJWT = AuthMiddleware().authenticateJWT;
  router.use(authenticateJWT);

  router
    .route(BASE_PATH)
    .get(studentController.getAll)
    .post(studentController.create);
  router
    .route(`${BASE_PATH}/:studentId`)
    .get(studentController.getById)
    .put(studentController.update)
    .delete(studentController.deleteById);

  return { getAssembledRouter: () => router };
};
