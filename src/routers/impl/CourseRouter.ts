import { CourseController } from "../../controllers/CourseController";
import { CourseRepository } from "../../repositories/CourseRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export const CourseRouter = (): RouterAssembler => {
  const courseController = CourseController(
    getCustomRepository(CourseRepository)
  );

  const BASE_PATH = "/courses";

  const router = Router();
  router
    .route(BASE_PATH)
    .get(courseController.getAll)
    .post(courseController.create);
  router
    .route(`${BASE_PATH}/:courseId`)
    .get(courseController.getById)
    .put(courseController.update)
    .delete(courseController.deleteById);

  return { getAssembledRouter: () => router };
};
