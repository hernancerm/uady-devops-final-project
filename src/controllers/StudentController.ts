import { Student } from "../entities/Student";

import { Request, Response } from "express";
import { Repository } from "typeorm";

export const StudentController = (studentRepository: Repository<Student>) => {
  const getAll = async (req: Request, res: Response): Promise<Response> => {
    const students = await studentRepository.find();
    return res.status(200).json(students);
  };

  return { getAll };
};
