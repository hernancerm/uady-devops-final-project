import { Student } from "../../entities/Student";
import { StudentController } from "../../controllers/StudentController";

import { getMockReq, getMockRes } from "@jest-mock/express";
import "regenerator-runtime/runtime";
import { Repository } from "typeorm";
import { mock, MockProxy, mockReset } from "jest-mock-extended";

let mockStudentRepository: MockProxy<Repository<Student>>;

let studentController: any; // SUT

beforeEach(() => {
  mockStudentRepository = mock<Repository<Student>>();
  studentController = StudentController(mockStudentRepository);
});

afterEach(() => {
  mockReset(mockStudentRepository);
});

test("getAll should be successful", async () => {
  // setup - data
  const students: MockProxy<Student[]> = [
    Object.assign(mock<Student>(), {
      enrollment_id: 1,
      first_names: "Hernán",
      last_names: "Cervera",
    }),
    Object.assign(mock<Student>(), {
      enrollment_id: 2,
      first_names: "Juan",
      last_names: "Molina",
    }),
  ];

  // setup - mocks
  mockStudentRepository.find.mockReturnValueOnce(Promise.resolve(students));

  const mockReq = getMockReq();
  const { res: mockRes } = getMockRes();

  // exercise
  await studentController.getAll(mockReq, mockRes);

  // verify - mocks
  expect(mockStudentRepository.find).toHaveBeenCalledTimes(1);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith(students);
});
