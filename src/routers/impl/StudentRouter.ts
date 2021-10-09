import { StudentController } from "../../controllers/StudentController";
import { StudentRepository } from "../../repositories/StudentRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export const StudentRouter = (): RouterAssembler => {
  const studentController = StudentController(
    getCustomRepository(StudentRepository)
  );

  // TODO: don't repeat /students
  const router = Router();
  router.route("/students").get(studentController.getAll);
  router.route("/students/:studentId").get(studentController.getById);
  router.route("/students").post(studentController.create);
  router.route("/students/:studentId").put(studentController.update);
  router.route("/students/:studentId").delete(studentController.deleteById);

  return { getAssembledRouter: () => router };
};
