import { Request, Response } from 'express';
import {
  responseUserCreated,
  responseError,
  successHandler,
  responseVehicleEmpty,
  responseUserEmpty,
  responseVehicleUpdated,
  responseUserUpdated,
  responseCustom,
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

const updateUser = async (req: Request, res: Response) => {
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
    res.status(500).json(responseError(error));
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
    res.status(500).json(responseError(error));
  }
};
export const userControllers = {
  getUser,
  updateUser,
  deleteUser,
};
