import { createLogger } from "../loggers/logger";

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = "youraccesstokensecret";

const LOGGER = createLogger(__filename);

export const AuthHelper = () => {
  const getToken = (username: string): string => {
    LOGGER.debug(
      `Function call: getToken - params: ${JSON.stringify({ username })}`
    );

    return jwt.sign({ username: username }, accessTokenSecret);
  };
  return { getToken };
};

export const AuthJwtMiddleware = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err) => {
      if (err) {
        LOGGER.warn("Unauthorized Http request");
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    LOGGER.warn("Unauthorized Http request");
    res.sendStatus(401);
  }
};
