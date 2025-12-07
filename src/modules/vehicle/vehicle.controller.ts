import { Request, Response } from 'express';
import {
  responseError,
  responseVehicleCreated,
  responseVehicleEmpty,
  responseVehicleRetrieved,
} from '../../helpers/handler';
import { vehicleServices } from './vehicl.service';
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
    res.status(500).json(responseError(error));
  }
};
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(200).json(responseVehicleRetrieved(result.rows));
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await vehicleServices.getSingleVehicle(id!);
    if (result.rows.length === 0) {
      res.status(200).json(responseVehicleEmpty(result.rows[0]));
    } else {
      res.status(200).json(responseVehicleRetrieved(result.rows[0]));
    }
  } catch (error) {
    res.status(500).json(responseError(error));
  }
};
export const vehicleController = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
};
