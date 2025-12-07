import { NextFunction, Request, Response } from 'express';
import {
  responseCustom,
  responseError,
  successHandler,
} from '../helpers/handler';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { pool } from '../config/db';

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    next();
  };
};

export default auth;
