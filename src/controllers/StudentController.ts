import { Student } from "../entities/Student";

import { Request, Response } from "express";
import { Repository } from "typeorm";
import { validate } from "class-validator";

export const StudentController = (studentRepository: Repository<Student>) => {
  const getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const fetchedStudents = await studentRepository.find();
      return res.status(200).json(fetchedStudents);
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const getById = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;

    try {
      const fetchedStudent = await studentRepository.findOne(studentId);

      if (!fetchedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      return res.status(200).json(fetchedStudent);
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const create = async (req: Request, res: Response): Promise<Response> => {
    const providedStudent = Object.assign(new Student(), req.body);

    const errors = await validate(providedStudent);

    if (errors.length > 0) {
      return res.status(400).json({ error: "Invalid student", errors });
    }

    try {
      const { enrollmentId: savedStudentId } = await studentRepository.save(
        providedStudent
      );
      const savedStudent = await studentRepository.findOne(savedStudentId);
      return res.status(201).json(savedStudent);
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const update = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;
    const providedStudent = req.body;

    try {
      const fetchedStudent = await studentRepository.findOne(studentId);

      if (!fetchedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      Object.assign(fetchedStudent, providedStudent);

      const errors = await validate(fetchedStudent);

      if (errors.length > 0) {
        return res.status(400).json({ error: "Invalid student", errors });
      }

      const { enrollmentId: savedStudentId } = await studentRepository.save(
        fetchedStudent
      );
      const savedStudent = await studentRepository.findOne(savedStudentId);
      return res.status(200).json(savedStudent);
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const deleteById = async (req: Request, res: Response): Promise<Response> => {
    const studentId = req.params.studentId;

    try {
      const fetchedStudent = await studentRepository.findOne(studentId);

      if (!fetchedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      await studentRepository.delete(studentId);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  return { getAll, getById, create, update, deleteById };
};
