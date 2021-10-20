import { CourseController } from "../../controllers/CourseController";
import { CourseRepository } from "../../repositories/CourseRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";
import LoggingMiddleware from "../../middlewares/LoggingMiddleware";

export const CourseRouter = (): RouterAssembler => {
  const courseController = CourseController(
    getCustomRepository(CourseRepository)
  );

  const BASE_PATH = "/courses";

  const router = Router();
  router
    .route(BASE_PATH)
    .get(LoggingMiddleware, courseController.getAll)
    .post(LoggingMiddleware, courseController.create);
  router
    .route(`${BASE_PATH}/:courseId`)
    .get(LoggingMiddleware, courseController.getById)
    .put(LoggingMiddleware, courseController.update)
    .delete(LoggingMiddleware, courseController.deleteById);

  return { getAssembledRouter: () => router };
};
