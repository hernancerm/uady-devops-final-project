import { StudentController } from "../../controllers/StudentController";
import { StudentRepository } from "../../repositories/StudentRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export const StudentRouter = (): RouterAssembler => {
  const studentRepository = getCustomRepository(StudentRepository);
  const studentController = StudentController(studentRepository);

  const router = Router();
  router.route("/students").get(studentController.getAll);

  const getAssembledRouter = () => router;

  return { getAssembledRouter };
};
