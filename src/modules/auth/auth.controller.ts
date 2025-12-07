import { Request, Response } from 'express';
import { authServices } from './auth.service';
import {
  passwordError,
  responseUserCreated,
  responseError,
  responseLoginFailed,
  responseLoginSuccess,
} from '../../helpers/handler';

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
      res.status(201).json(responseUserCreated(result.rows[0]));
    } else {
      res.status(500).json(passwordError());
    }
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);
    if (!result) {
      res.status(200).json(responseLoginFailed());
    } else {
      res.status(200).json(responseLoginSuccess(result));
    }
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
export const authController = {
  createUser,
  loginUser,
};
