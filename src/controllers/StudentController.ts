import { Student } from "../entities/Student";

import { Request, Response } from "express";
import { Repository } from "typeorm";

// TODO: Add try / catch
export const StudentController = (studentRepository: Repository<Student>) => {
  const getAll = async (req: Request, res: Response): Promise<Response> => {
    const students = await studentRepository.find();
    return res.status(200).json(students);
  };

  const getById = async (req: Request, res: Response): Promise<Response> => {
    const student = await studentRepository.findOne(req.params.studentId);
    return res.status(200).json(student);
  };

  const create = async (req: Request, res: Response): Promise<Response> => {
    const providedStudent = req.body;

    try {
      const savedStudent = await studentRepository.save(providedStudent);
      return res.status(200).json(savedStudent);
    } catch (error) {
      const errorMessage = `Unexpected DB error creating student with data: ${providedStudent}`;
      console.error(errorMessage, error);
      return res.status(500).json({ message: errorMessage });
    }
  };

  const update = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;
    const providedStudent = req.body;

    try {
      const student = await studentRepository.findOne(studentId);

      if (student) {
        studentRepository.merge(student, providedStudent);
        const savedStudent = await studentRepository.save(student);
        return res.status(200).json(savedStudent);
      }
      return res.status(404).json({ message: "Student not found" });
    } catch (error) {
      const errorMessage = `Unexpected DB error updating student with id ${studentId} with data: ${providedStudent}`;
      console.error(errorMessage, error);
      return res.status(500).json({ message: errorMessage });
    }
  };

  // TODO: Fix why it hangs
  const deleteById = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;

    try {
      await studentRepository.delete(studentId);
      return res.status(204);
    } catch (error) {
      const errorMessage = `Unexpected DB error deleting student with id: ${studentId}`;
      console.error(errorMessage, error);
      return res.status(500).json({ message: errorMessage });
    }
  };

  return { getAll, getById, create, update, deleteById };
};
