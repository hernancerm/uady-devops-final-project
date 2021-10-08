import { Router } from "express";

export interface RouterAssembler {
  getAssembledRouter: () => Router;
}
