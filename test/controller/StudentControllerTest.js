import StudentController from "../../src/controller/StudentController";
import MockStudentService from "../mock/MockStudentService";

import { getMockReq, getMockRes } from "@jest-mock/express";
import "regenerator-runtime/runtime";

let studentController = undefined; // SUT

let mockStudentService = undefined;

beforeEach(() => {
  mockStudentService = MockStudentService();
  studentController = StudentController(mockStudentService);
});

afterEach(() => {
  mockStudentService.findAll.mockReset();
});

test("mocks sanity check", () => {
  expect(mockStudentService).not.toBe(undefined);
});

test("getAll should be successful", async () => {
  // setup - data
  const students = [
    {
      fullName: "Hernán Cervera",
      enrollmentId: "12218890",
    },
    {
      fullName: "Juan Sauri",
      enrollmentId: "92465587",
    },
  ];

  // setup - mocks
  mockStudentService.findAll.mockReturnValueOnce(students);

  const mockReq = getMockReq();
  const { res: mockRes } = getMockRes();

  // exercise
  await studentController.getAll(mockReq, mockRes);

  // verify - mocks
  expect(mockStudentService.findAll).toHaveBeenCalledTimes(1);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith(students);
});
