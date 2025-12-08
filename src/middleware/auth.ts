import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { pool } from '../config/db';
import {
  responseForbidden,
  responseNotFound,
  responseUnauthorized,
} from '../helpers/response';

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers.authorization;
    const token = headerToken?.split(' ')[1];
    if (!token) {
      responseUnauthorized(res);
      return;
    }
    const decoded = jwt.verify(token, config.jwtSecret!) as JwtPayload;
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      decoded.email,
    ]);
    if (user.rows[0].length === 0) {
      responseNotFound(res);
    }
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) {
      responseForbidden(res);
      return;
    }
    next();
  };
};

export default auth;
