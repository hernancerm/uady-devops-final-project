import { Student } from "../../entities/Student";
import bcrypt from "bcrypt";

import { getMockReq, getMockRes } from "@jest-mock/express";
import "regenerator-runtime/runtime";
import { Repository } from "typeorm";
import { mock, MockProxy, mockReset } from "jest-mock-extended";
import { Builder } from "builder-pattern";
import { User } from "../../entities/User";
import { UserController } from "../../controllers/UserController";

let mockUserRepository: MockProxy<Repository<User>>;
let userController: any; // SUT

beforeAll(() => {
  mockUserRepository = mock<Repository<User>>();
  userController = UserController(mockUserRepository);
});

afterEach(() => {
  mockReset(mockUserRepository);
});

test("getAll - 200", async () => {
  // setup - data
  const users = [
    Builder(User)
      .id(1)
      .username("maddozs")
      .password(bcrypt.hashSync("helloWorld", bcrypt.genSaltSync(10)))
      .build(),
    Builder(User)
      .id(2)
      .username("hachiko")
      .password(bcrypt.hashSync("otherPassword", bcrypt.genSaltSync(10)))
      .build(),
  ];

  // setup - mocks
  mockUserRepository.find.mockReturnValueOnce(Promise.resolve(users));

  const mockReq = getMockReq();
  const { res: mockRes } = getMockRes();

  // exercise
  await userController.getAll(mockReq, mockRes);

  // verify - mocks
  expect(mockUserRepository.find).toHaveBeenCalledTimes(1);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith(users);
});

test("sign up - 201", async () => {
  // setup - data
  const requestBody = {
    username: "maddozs",
    password: "PruebaContraseña",
  };

  const providedUser: User = Object.assign(new User(), requestBody);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(providedUser.password, salt);

  const savedUser: User = Object.assign(new User(), {
    id: 1,
    username: providedUser.username,
    password: hashedPassword,
  });

  // setup - mocks
  mockUserRepository.save.mockReturnValueOnce(Promise.resolve(savedUser));

  const mockReq = getMockReq();
  const { res: mockRes } = getMockRes();
  mockReq.body = requestBody;

  // exercise
  await userController.signUp(mockReq, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(201);
  expect(mockRes.json).toHaveBeenCalledWith({ userId: 1 });
});
