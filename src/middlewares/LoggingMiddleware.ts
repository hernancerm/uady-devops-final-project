import { createLogger } from "../loggers/logger";

import { Request, Response } from "express";

const LOGGER = createLogger(__filename);

const obfuscate = (sensitiveObject: object): object => {
  const sensitiveAttributes = {
    password: undefined,
    authorization: undefined,
  };
  const output = Object.assign({}, sensitiveObject);
  return Object.assign(output, sensitiveAttributes);
};

const LoggingMiddleware = (req: Request, res: Response, next: any) => {
  LOGGER.info(
    `Http request: ${req.method} ${req.originalUrl} - params: ${JSON.stringify(
      req.params
    )} - headers: ${JSON.stringify(obfuscate(req.headers))}`
  );

  LOGGER.debug(
    `Http request: ${req.method} ${req.originalUrl} - body ${JSON.stringify(
      obfuscate(req.body)
    )}`
  );

  next();
};

export default LoggingMiddleware;
