import { CourseController } from "../../controllers/CourseController";
import { CourseRepository } from "../../repositories/CourseRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export const CourseRouter = (): RouterAssembler => {
  const studentController = CourseController(
    getCustomRepository(CourseRepository)
  );

  const router = Router();
  router.route("/courses").get(studentController.getAll);

  return { getAssembledRouter: () => router };
};
