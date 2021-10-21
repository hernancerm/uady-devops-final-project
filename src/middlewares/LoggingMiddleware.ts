import { createLogger } from "../loggers/logger";

import { Request, Response } from "express";

const LOGGER = createLogger(__filename);

const LoggingMiddleware = (req: Request, res: Response, next: any) => {
  LOGGER.info(
    `Http request: ${req.method} ${req.originalUrl} - params: ${JSON.stringify(
      req.params
    )} - headers: ${JSON.stringify({
      ...req.headers,
      authorization: undefined,
    })}`
  );

  LOGGER.debug(
    `Http request: ${req.method} ${req.originalUrl} - body ${JSON.stringify({
      ...req.body,
      password: undefined,
    })}`
  );

  next();
};

export default LoggingMiddleware;
