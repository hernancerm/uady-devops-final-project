import { NextFunction, Request, Response } from "express";
import { createLogger } from "../loggers/logger";

const LOGGER = createLogger(__filename);

const LoggingMiddleware = (req: Request, res: Response, next: any) => {
  // LOGGING API CALL

  LOGGER.info(
    `API CALL: ${req.originalUrl} - params: ${JSON.stringify(
      req.params
    )} - headers: ${JSON.stringify({
      ...req.headers,
      authorization: undefined,
    })}`
  );

  LOGGER.debug(
    `API CALL: ${req.originalUrl} - body ${JSON.stringify({
      ...req.body,
      password: undefined,
    })}}`
  );

  next();
};

export default LoggingMiddleware;
