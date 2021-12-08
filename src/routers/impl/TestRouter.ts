import { TestController } from "../../controllers/TestController";
import { RouterAssembler } from "../RouterAssembler";

import { Router } from "express";

export const TestRouter = (): RouterAssembler => {  

  const router = Router();
  router
    .route('/')
    .get(TestController().get)   

  return { getAssembledRouter: () => router };
};
