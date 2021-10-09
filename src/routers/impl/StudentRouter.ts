import { StudentController } from "../../controllers/StudentController";
import { StudentRepository } from "../../repositories/StudentRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export const StudentRouter = (): RouterAssembler => {
  const studentController = StudentController(
    getCustomRepository(StudentRepository)
  );

  const router = Router();
  router
    .route("/students")
    .get(studentController.getAll)
    .post(studentController.create);

  router
    .route("/students/:studentId")
    .get(studentController.getById)
    .put(studentController.update)
    .delete(studentController.deleteById);

  return { getAssembledRouter: () => router };
};
