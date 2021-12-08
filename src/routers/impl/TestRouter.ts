import { TestController } from "../../controllers/TestController";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";

export const TestRouter = (): RouterAssembler => {
  const BASE_PATH = "/health";

  const router = Router();
  router
    .route(BASE_PATH)
    .get(TestController().get)   

  return { getAssembledRouter: () => router };
};
