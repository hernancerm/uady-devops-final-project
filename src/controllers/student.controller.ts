import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Student } from "../entities/Student";

export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const students = await getRepository(Student).find();
  return res.status(200).json(students);
};
