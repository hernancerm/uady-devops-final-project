import { Request, Response } from "express";
import { User } from "../entities/User";
const jwt = require('jsonwebtoken'); //import feo porque no hay type data https://github.com/Microsoft/TypeScript/issues/247
const accessTokenSecret = 'youraccesstokensecret';

export const AuthHelper = () => {
    const getToken = (username: string): string => {
        return jwt.sign({ username: username}, accessTokenSecret)
    };
    return {getToken};
}

export const AuthMiddleware = () => {
    const authenticateJWT = async (req: Request, res: Response, next: () => void) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, accessTokenSecret, function(err: any, user: User) {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };
    return {authenticateJWT};
};
  