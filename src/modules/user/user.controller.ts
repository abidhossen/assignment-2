import { Request, Response } from 'express';
import {
  responseUserCreated,
  responseError,
  successHandler,
} from '../../helpers/handler';
import { userServices } from './user.service';

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res
      .status(200)
      .json(successHandler(true, 'Users Retrived Successfully', result.rows));
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userServices.getSingleUser(id!);
    if (result.rows.length === 0) {
      res
        .status(404)
        .json(successHandler(false, 'User data not found', result.rows[0]));
    } else {
      res
        .status(200)
        .json(successHandler(true, 'User data fetched', result.rows[0]));
    }
  } catch (error) {
    res.status(500).json(responseError(error));
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const id = req.params.id;
    const result = await userServices.updateUser(name, email, id!);
    if (result.rows.length === 0) {
      res
        .status(404)
        .json(successHandler(false, 'User data not found', result.rows[0]));
    } else {
      res
        .status(200)
        .json(successHandler(true, 'User updated', result.rows[0]));
    }
  } catch (error) {
    res.status(500).json(responseError(error));
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userServices.deleteUser(id!);
    if (result.rowCount === 0) {
      res
        .status(404)
        .json(successHandler(false, 'User data not found', result.rows[0]));
    } else {
      const nullData = null;
      res.status(200).json(successHandler(true, 'User deleted', nullData));
    }
  } catch (error) {
    res.status(500).json(responseError(error));
  }
};
export const userControllers = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
