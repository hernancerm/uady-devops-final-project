import { Request, Response } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import { createLogger } from "../loggers/logger";
const accessTokenSecret = "youraccesstokensecret";

const LOGGER = createLogger(__filename);

export const AuthHelper = () => {
  const getToken = (username: string): string => {
    LOGGER.debug(
      `Method getToken called  - params: ${JSON.stringify({ username })}`
    );

    return jwt.sign({ username: username }, accessTokenSecret);
  };
  return { getToken };
};

export const AuthMiddleware = () => {
  const authenticateJWT = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, accessTokenSecret, (err) => {
        if (err) {
          LOGGER.warn("Unauthorized call");
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      LOGGER.warn("Unauthorized call");
      res.sendStatus(401);
    }
  };
  return { authenticateJWT };
};
