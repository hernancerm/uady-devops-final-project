import { Course } from "../../entities/Course";
import { CourseController } from "../../controllers/CourseController";

import { getMockReq, getMockRes } from "@jest-mock/express";
import "regenerator-runtime/runtime";
import { Repository } from "typeorm";
import { mock, MockProxy, mockReset } from "jest-mock-extended";
import { Builder } from "builder-pattern";
import { TController } from "../../controllers/types";

let mockCourseRepository: MockProxy<Repository<Course>>;

let courseController: ReturnType<TController<Course>>; // SUT

beforeAll(() => {
  mockCourseRepository = mock<Repository<Course>>();
  courseController = CourseController(mockCourseRepository);
});

afterEach(() => {
  mockReset(mockCourseRepository);
});

test("getAll - 200", async () => {
  // setup - data
  const courses = [
    Builder(Course)
      .id(1)
      .courseName("Física")
      .courseTagId("F1")
      .professorName("Fernando Físico")
      .build(),
    Builder(Course)
      .id(2)
      .courseName("Biología")
      .courseTagId("B1")
      .professorName("Luis Botánico")
      .build(),
  ];

  // setup - mocks
  mockCourseRepository.find.mockReturnValueOnce(Promise.resolve(courses));

  const mockReq = getMockReq();
  const { res: mockRes } = getMockRes();

  // exercise
  await courseController.getAll(mockReq, mockRes);

  // verify - mocks
  expect(mockCourseRepository.find).toHaveBeenCalledTimes(1);

  expect(mockRes.status).toHaveBeenCalledWith(201);
  expect(mockRes.json).toHaveBeenCalledWith(courses);
});

test("getById - 200", async () => {
  // setup - data
  const course = Builder(Course)
    .id(1)
    .courseName("Física")
    .courseTagId("F1")
    .professorName("Fernando Físico")
    .build();

  // setup - mocks
  mockCourseRepository.findOne.mockReturnValueOnce(Promise.resolve(course));

  const mockReq = getMockReq();
  mockReq.params.courseId = "1";
  const { res: mockRes } = getMockRes();

  // exercise
  await courseController.getById(mockReq, mockRes);

  // verify - mocks
  expect(mockCourseRepository.findOne).toHaveBeenCalledWith("1");

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith(course);
});

test("create - 201", async () => {
  // setup - data
  const requestBody = {
    courseName: "Botánica",
    courseTagId: "BT1",
    professorName: "José Eduardo Planta Flores",
    classRoomCode: "CC1",
    hasProjector: true,
  };
  const providedCourse: Course = Object.assign(new Course(), requestBody);
  const savedCourse: Course = Object.assign(new Course(), {
    ...providedCourse,
    id: 1,
  });

  // setup - mocks
  mockCourseRepository.save.mockReturnValueOnce(Promise.resolve(savedCourse));
  // On actual execution, findOne returns the entity also with parsed dates.
  mockCourseRepository.findOne.mockReturnValueOnce(
    Promise.resolve(savedCourse)
  );

  const mockReq = getMockReq();
  const { res: mockRes } = getMockRes();
  mockReq.body = requestBody;

  // exercise
  await courseController.create(mockReq, mockRes);

  // verify - mocks
  expect(mockCourseRepository.save).toHaveBeenCalledWith(providedCourse);
  expect(mockCourseRepository.findOne).toHaveBeenCalledWith(1);

  expect(mockRes.status).toHaveBeenCalledWith(201);
  expect(mockRes.json).toHaveBeenCalledWith(savedCourse);
});

test("update - 200", async () => {
  // setup - data
  const requestBody = {
    professorName: "José Eduardo Planta Rosas",
  };
  const fetchedCourse = Builder(Course)
    .courseName("Botánica")
    .courseTagId("BT1")
    .professorName("José Eduardo Planta Flores")
    .classRoomCode("CC1")
    .hasProjector(true)
    .build();
  const mergedReqBodyFetchedCourse = Builder(Course)
    .courseName("Botánica")
    .courseTagId("BT1")
    .professorName("José Eduardo Planta Rosas")
    .classRoomCode("CC1")
    .hasProjector(true)
    .build();
  const savedCourse = Builder(Course)
    .id(1)
    .courseName("Botánica")
    .courseTagId("BT1")
    .professorName("José Eduardo Planta Rosas")
    .classRoomCode("CC1")
    .hasProjector(true)
    .build();
  const fetchedSavedCourse = Builder(Course)
    .id(1)
    .courseName("Botánica")
    .courseTagId("BT1")
    .professorName("José Eduardo Planta Rosas")
    .classRoomCode("CC1")
    .hasProjector(true)
    .build();

  // setup - mocks
  mockCourseRepository.findOne.mockReturnValueOnce(
    Promise.resolve(fetchedCourse)
  );
  mockCourseRepository.save.mockReturnValueOnce(Promise.resolve(savedCourse));
  // On actual execution, findOne returns the entity also with parsed dates.
  mockCourseRepository.findOne.mockReturnValueOnce(
    Promise.resolve(fetchedSavedCourse)
  );

  const mockReq = getMockReq();
  const { res: mockRes } = getMockRes();
  mockReq.body = requestBody;
  mockReq.params.courseId = "1";

  // exercise
  await courseController.update(mockReq, mockRes);

  // verify - mocks
  expect(mockCourseRepository.findOne).toHaveBeenCalledWith("1");
  expect(mockCourseRepository.save).toHaveBeenCalledWith(
    mergedReqBodyFetchedCourse
  );
  expect(mockCourseRepository.findOne).toHaveBeenCalledWith("1");

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith(fetchedSavedCourse);
});

test("deleteById - 204", async () => {
  // setup - data
  const course = Builder(Course)
    .id(1)
    .courseName("Botánica")
    .courseTagId("BT1")
    .professorName("José Eduardo Planta Rosas")
    .build();

  // setup - mocks
  mockCourseRepository.findOne.mockReturnValueOnce(Promise.resolve(course));

  const mockReq = getMockReq();
  mockReq.params.courseId = "1";
  const { res: mockRes } = getMockRes();

  // exercise
  await courseController.deleteById(mockReq, mockRes);

  // verify - mocks
  expect(mockCourseRepository.findOne).toHaveBeenCalledWith("1");
  expect(mockCourseRepository.delete).toHaveBeenCalledTimes(1);

  expect(mockRes.status).toHaveBeenCalledWith(204);
  expect(mockRes.json).toHaveBeenCalledTimes(1);
});
