import { CourseController } from "../../controllers/CourseController";
import { CourseRepository } from "../../repositories/CourseRepository";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";
import { getCustomRepository } from "typeorm";

export const CourseRouter = (): RouterAssembler => {
  const courseController = CourseController(
    getCustomRepository(CourseRepository)
  );

  const router = Router();

  router.route("/").get(courseController.getAll).post(courseController.create);
  router
    .route("/:courseId")
    .get(courseController.getById)
    .put(courseController.update)
    .delete(courseController.deleteById);

  return { getAssembledRouter: () => router };
};
