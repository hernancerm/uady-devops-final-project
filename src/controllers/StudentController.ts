import { Student } from "../entities/Student";

import { Request, Response } from "express";
import { Repository } from "typeorm";
import { validate } from "class-validator";

export const StudentController = (studentRepository: Repository<Student>) => {
  const getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const students = await studentRepository.find();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const getById = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;

    try {
      const student = await studentRepository.findOne(studentId);

      if (student) {
        return res.status(200).json(student);
      }
      return res.status(404).json({ error: "Student not found" });
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const create = async (req: Request, res: Response): Promise<Response> => {
    const providedStudent = req.body;
    const [createdStudent] = studentRepository.create([providedStudent]);

    const errors = await validate(createdStudent);

    if (errors.length > 0) {
      return res.status(400).json({ error: "Invalid student", errors });
    }

    try {
      const { enrollmentId: savedStudentId } = await studentRepository.save(
        createdStudent
      );
      const savedStudent = await studentRepository.findOne(savedStudentId);
      return res.status(200).json(savedStudent);
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const update = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;
    const providedStudent = req.body;

    try {
      const student = await studentRepository.findOne(studentId);

      if (student) {
        studentRepository.merge(student, providedStudent);

        const errors = await validate(student);

        if (errors.length > 0) {
          return res.status(400).json({ error: "Invalid student", errors });
        }

        const { enrollmentId: savedStudentId } = await studentRepository.save(
          student
        );
        const savedStudent = await studentRepository.findOne(savedStudentId);
        return res.status(200).json(savedStudent);
      }
      return res.status(404).json({ error: "Student not found" });
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const deleteById = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;

    try {
      const fetchedStudent = await studentRepository.findOne(studentId);

      if (fetchedStudent) {
        await studentRepository.delete(studentId);
        return res.status(204).json();
      }
      return res.status(404).json({ error: "Student not found" });
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  return { getAll, getById, create, update, deleteById };
};
