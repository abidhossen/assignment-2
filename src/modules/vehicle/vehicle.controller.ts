import { Request, Response } from 'express';
import {
  responseCustom,
  responseVehicleCreated,
  responseVehicleEmpty,
  responseVehicleRetrieved,
  responseVehicleUpdated,
} from '../../helpers/handler';
import { vehicleServices } from './vehicle.service';
import { responseServerError } from '../../helpers/response';
const createVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  const vehicleData = {
    vehicle_name: vehicle_name,
    type: type,
    registration_number: registration_number,
    daily_rent_price: daily_rent_price,
    availability_status: availability_status,
  };

  try {
    const result = await vehicleServices.createVehicle(vehicleData);
    res.status(201).json(responseVehicleCreated(result.rows[0]));
  } catch (error: any) {
    responseServerError(res, error.message);
  }
};
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(200).json(responseVehicleRetrieved(result.rows));
  } catch (error: any) {
    responseServerError(res, error.message);
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await vehicleServices.getSingleVehicle(id!);
    if (result.rows.length === 0) {
      res.status(200).json(responseVehicleEmpty([]));
    } else {
      res.status(200).json(responseVehicleRetrieved(result.rows[0]));
      return result.rows[0];
    }
  } catch (error) {
    responseServerError(res, (error as Error).message);
  }
};
const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const id = req.params.id;
    const vehicleData = {
      vehicle_name: vehicle_name,
      type: type,
      registration_number: registration_number,
      daily_rent_price: daily_rent_price,
      availability_status: availability_status,
      id: id,
    };
    const result = await vehicleServices.updateVehicle(vehicleData);
    if (result.rows.length === 0) {
      res.status(200).json(responseVehicleEmpty([]));
    } else {
      res.status(200).json(responseVehicleUpdated(result.rows[0]));
    }
  } catch (error) {
    responseServerError(res, (error as Error).message);
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await vehicleServices.deleteVehicle(id!);
    if (result.rowCount === 0) {
      res.status(404).json(responseVehicleEmpty([]));
    } else {
      res
        .status(200)
        .json(responseCustom(true, 'Vehicle deleted successfully'));
    }
  } catch (error) {
    responseServerError(res, (error as Error).message);
  }
};
export const vehicleController = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
