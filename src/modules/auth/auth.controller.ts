import { Request, response, Response } from 'express';
import { authServices } from './auth.service';
import {
  responseBadRequest,
  responseServerError,
  responseUserCreated,
  responseLoginSuccess,
} from '../../helpers/response';

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  const userData = {
    name: name,
    email: email.toLowerCase(),
    password: password,
    phone: phone,
    role: role,
  };

  try {
    if (password.length >= 6) {
      const result = await authServices.createUser(userData);
      responseUserCreated(res, result.rows[0]);
    } else {
      responseBadRequest(res, 'Password must be at least 6 characters long');
    }
  } catch (error: any) {
    responseServerError(res, error.message);
  }
};
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);
    if (!result) {
      responseBadRequest(res, 'Invalid email or password');
    } else {
      responseLoginSuccess(res, result);
    }
  } catch (error: any) {
    responseServerError(res, error.message);
  }
};
export const authController = {
  createUser,
  loginUser,
};
