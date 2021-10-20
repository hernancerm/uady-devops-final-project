import { StudentController } from "../../controllers/StudentController";
import { StudentRepository } from "../../repositories/StudentRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import LoggingMiddleware from "../../middlewares/LoggingMiddleware";

export const StudentRouter = (): RouterAssembler => {
  const studentController = StudentController(
    getCustomRepository(StudentRepository)
  );

  const BASE_PATH = "/students";
  const router = Router();

  router
    .route(BASE_PATH)
    .get(LoggingMiddleware, studentController.getAll)
    .post(LoggingMiddleware, studentController.create);
  router
    .route(`${BASE_PATH}/:studentId`)
    .get(LoggingMiddleware, LoggingMiddleware, studentController.getById)
    .put(LoggingMiddleware, studentController.update)
    .delete(LoggingMiddleware, studentController.deleteById);

  return { getAssembledRouter: () => router };
};
