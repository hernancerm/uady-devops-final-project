import { Course } from "../entities/Course";

import { Request, Response } from "express";
import { Repository } from "typeorm";

export const CourseController = (courseRepository: Repository<Course>) => {
  const getAll = async (req: Request, res: Response): Promise<Response> => {
    const courses = await courseRepository.find();
    return res.status(200).json(courses);
  };

  return { getAll };
};
