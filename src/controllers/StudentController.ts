import { Student } from "../entities/Student";
import { TController } from "./types";
import { createLogger } from "../loggers/logger";

import { Request, Response } from "express";
import { validate } from "class-validator";

const LOGGER = createLogger(__filename);

export const StudentController: TController<Student> = (studentRepository) => {
  const getAll = async (req: Request, res: Response) => {
    LOGGER.debug("Function call: getAll");

    try {
      LOGGER.debug("Repository call: find - params: {}");
      const fetchedStudents = await studentRepository.find();
      return res.status(200).json(fetchedStudents);
    } catch (error: any) {
      LOGGER.error(`Message: ${error.message} - Stack trace: ${error.stack}`);
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const getById = async (req: Request, res: Response) => {
    LOGGER.debug("Function call: getById");

    const studentId = req.params.studentId;

    try {
      LOGGER.debug(
        `Repository call: findOne - params: ${JSON.stringify({ studentId })}`
      );
      const fetchedStudent = await studentRepository.findOne(studentId);

      if (!fetchedStudent) {
        LOGGER.warn(`Student not found`);
        return res.status(404).json({ error: "Student not found" });
      }
      return res.status(200).json(fetchedStudent);
    } catch (error: any) {
      LOGGER.error(`Message: ${error.message} - Stack trace: ${error.stack}`);
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const create = async (req: Request, res: Response) => {
    LOGGER.debug("Function call: create");

    const providedStudent = Object.assign(new Student(), req.body);

    const errors = await validate(providedStudent);

    if (errors.length > 0) {
      LOGGER.warn(`${errors.join().trimEnd()}`);
      return res.status(400).json({ error: "Invalid student", errors });
    }

    try {
      const { enrollmentId: savedStudentId } = await studentRepository.save(
        providedStudent
      );
      LOGGER.debug(
        `Repository call: findOne - params: ${JSON.stringify({
          savedStudentId,
        })}`
      );
      const savedStudent = await studentRepository.findOne(savedStudentId);
      return res.status(201).json(savedStudent);
    } catch (error: any) {
      LOGGER.error(`Message: ${error.message} - Stack trace: ${error.stack}`);
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const update = async (req: Request, res: Response) => {
    LOGGER.debug("Function call: update");

    const studentId = req.params.studentId;
    const providedStudent = req.body;

    try {
      LOGGER.debug(
        `Repository call: findOne - params: ${JSON.stringify({
          studentId,
        })}`
      );
      const fetchedStudent = await studentRepository.findOne(studentId);

      if (!fetchedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      Object.assign(fetchedStudent, providedStudent);

      const errors = await validate(fetchedStudent);

      if (errors.length > 0) {
        LOGGER.warn(`${errors.join().trimEnd()}`);
        return res.status(400).json({ error: "Invalid student", errors });
      }

      const { enrollmentId: savedStudentId } = await studentRepository.save(
        fetchedStudent
      );
      LOGGER.debug(
        `Repository call: findOne - params: ${JSON.stringify({
          savedStudentId,
        })}`
      );
      const savedStudent = await studentRepository.findOne(savedStudentId);
      return res.status(200).json(savedStudent);
    } catch (error: any) {
      LOGGER.error(`Message: ${error.message} - Stack trace: ${error.stack}`);
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  const deleteById = async (req: Request, res: Response) => {
    LOGGER.debug("Function call: deleteById");

    const studentId = req.params.studentId;

    try {
      const fetchedStudent = await studentRepository.findOne(studentId);

      if (!fetchedStudent) {
        LOGGER.warn(`Student not found`);
        return res.status(404).json({ error: "Student not found" });
      }
      LOGGER.debug(
        `Repository call: delete - params: ${JSON.stringify({
          studentId,
        })}`
      );
      await studentRepository.delete(studentId);
      return res.status(204).json(fetchedStudent);
    } catch (error: any) {
      LOGGER.error(`Message: ${error.message} - Stack trace: ${error.stack}`);
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  return { getAll, getById, create, update, deleteById };
};
