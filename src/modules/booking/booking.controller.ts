import { Request, Response } from 'express';
import {
  responseBookingCreated,
  responseBookingRetrieved,
  responseBookingRetrievedCustomer,
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
    const { result, vehicleData, updateVehicleStatus } =
      await bookingServices.createBooking(bookingData);
    res
      .status(201)
      .json(responseBookingCreated(result!.rows[0], vehicleData!.rows[0]));
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
const getBookings = async (req: Request, res: Response) => {
  try {
    const email = req.user!.email;
    const role = req.user!.role;

    const result = await bookingServices.getBookings(email);

    const bookings = result.result.rows;
    const customer_id = result.singleUser.rows[0].id;
    const vehicles = result.vehicles.rows;
    const users = result.users.rows;
    const vehicleData: any = {};
    const userData: any = {};
    vehicles.forEach((vehicle) => {
      vehicleData[vehicle.id] = vehicle;
    });
    users.forEach((user) => {
      userData[user.id] = user;
    });
    // const singleBooking = await pool.query(
    //   `SELECT id,vehicle_id,rent_start_date,rent_end_date,total_price,status FROM bookings WHERE customer_id=$1`,
    //   [customer_id]
    // );
    console.log(customer_id);
    if (role === 'admin') {
      const bookingData = bookings.map((booking) => {
        const vehicle = vehicleData[booking.vehicle_id];
        const customer = userData[booking.customer_id];
        return {
          ...booking,
          customer: {
            name: customer.name,
            email: customer.email,
          },
          vehicle: {
            vehicle_name: vehicle.vehicle_name,
            registration_number: vehicle.registration_number,
          },
        };
      });

      res.status(200).json(responseBookingRetrieved(bookingData));
    } else if (role === 'customer') {
      const singleBooking = await bookingServices.getSingleBooking(customer_id);
      const vehicle = vehicleData[singleBooking.rows[0].vehicle_id];
      const customerBookingData = {
        ...singleBooking.rows[0],
        vehicle: {
          vehicle_name: vehicle.vehicle_name,
          registration_number: vehicle.registration_number,
          type: vehicle.type,
        },
      };
      res
        .status(200)
        .json(responseBookingRetrievedCustomer(customerBookingData));
    }
  } catch (error: any) {
    res.status(500).json(responseError(error));
  }
};
// const getSingleVehicle = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const result = await bookingServices.getSingleVehicle(id!);
//     if (result.rows.length === 0) {
//       res.status(200).json(responseVehicleEmpty([]));
//     } else {
//       res.status(200).json(responseVehicleRetrieved(result.rows[0]));
//     }
//   } catch (error) {
//     res.status(500).json(responseError(error));
//   }
// };
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
  getBookings,
  updateVehicle,
  deleteVehicle,
};
