import { Request, Response } from 'express';
import {
  responseBookingCreated,
  responseCustom,
  responseError,
  responseVehicleCreated,
  responseVehicleEmpty,
  responseVehicleRetrieved,
  responseVehicleUpdated,
  timeCalculator,
} from '../../helpers/handler';
import { bookingServices } from './booking.service';
import { vehicleServices } from '../vehicle/vehicle.service';
import { vehicleController } from '../vehicle/vehicle.controller';
import { pool } from '../../config/db';

const createBooking = async (req: Request, res: Response) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  const bookingData = {
    customer_id: customer_id,
    vehicle_id: vehicle_id,
    rent_start_date: rent_start_date,
    rent_end_date: rent_end_date,
  };
  try {
    const result = await bookingServices.createBooking(bookingData);
    res.status(201).json(responseBookingCreated(result.rows[0]));
    console.log('Booking response: ', result.rows[0]);
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getVehicles();
    res.status(200).json(responseVehicleRetrieved(result.rows));
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await bookingServices.getSingleVehicle(id!);
    if (result.rows.length === 0) {
      res.status(200).json(responseVehicleEmpty([]));
    } else {
      res.status(200).json(responseVehicleRetrieved(result.rows[0]));
    }
  } catch (error) {
    res.status(500).json(responseError(error));
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
    const result = await bookingServices.updateVehicle(vehicleData);
    if (result.rows.length === 0) {
      res.status(200).json(responseVehicleEmpty([]));
    } else {
      res.status(200).json(responseVehicleUpdated(result.rows[0]));
    }
  } catch (error) {
    res.status(500).json(responseError(error));
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await bookingServices.deleteVehicle(id!);
    if (result.rowCount === 0) {
      res.status(404).json(responseVehicleEmpty([]));
    } else {
      res
        .status(200)
        .json(responseCustom(true, 'Vehicle deleted successfully'));
    }
  } catch (error) {
    res.status(500).json(responseError(error));
  }
};
export const bookingController = {
  createBooking,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
