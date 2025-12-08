import { Request, Response } from 'express';
import {
  responseUserEmpty,
  responseUserUpdated,
  responseCustom,
} from '../../helpers/handler';
import { userServices } from './user.service';
import { responseServerError, responseSuccess } from '../../helpers/response';
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

    responseSuccess(res, 'Users Retrived Successfully', result.rows);
  } catch (error: any) {
    responseServerError(res, error.message);
  }
};
const updateUser = async (req: Request, res: Response) => {
  const authRole = req.user!.role;
  const { name, email, phone, role } = req.body;
  try {
    const id = req.params.id;
    const userData = {
      name: name,
      email: email,
      phone: phone,
      role: role,
      id,
    };
    const result = await userServices.updateUser(userData);
    if (result.rows.length === 0) {
      res.status(200).json(responseUserEmpty([]));
    } else {
      res.status(200).json(responseUserUpdated(result.rows[0]));
    }
  } catch (error) {
    responseServerError(res, (error as Error).message);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userServices.deleteUser(id!);
    if (result.rowCount === 0) {
      res.status(200).json(responseUserEmpty([]));
    } else {
      const nullData = null;
      res.status(200).json(responseCustom(true, 'User deleted successfully'));
    }
  } catch (error) {
    responseServerError(res, (error as Error).message);
  }
};
export const userControllers = {
  getUser,
  updateUser,
  deleteUser,
};
