import { Request, response, Response } from 'express';
import {
  responseBookingCancelled,
  responseBookingCreated,
  responseBookingRetrieved,
  responseBookingRetrievedCustomer,
  responseBookingReturned,
  responseEmptyBooking,
} from '../../helpers/handler';
import { bookingServices } from './booking.service';
import { responseServerError } from '../../helpers/response';
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
    responseServerError(res, error.message);
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
    responseServerError(res, error.message);
  }
};
const updateBooking = async (req: Request, res: Response) => {
  const { status } = req.body;
  const role = req.user!.role;
  try {
    const id = req.params.id;
    const singleBooking = await bookingServices.getSingleBookingById(id!);
    const bookingData = {
      status: status,
      id: id,
      vehicle_id: singleBooking.rows[0].vehicle_id,
    };

    const result = await bookingServices.updateBooking(bookingData);
    if (result.result.rows.length === 0) {
      res.status(200).json(responseEmptyBooking([]));
    } else {
      if (role === 'customer') {
        res.status(200).json(responseBookingCancelled(result.result.rows[0]));
      } else {
        res.status(200).json(responseBookingReturned(result.result.rows[0]));
      }
    }
  } catch (error) {
    responseServerError(res, (error as Error).message);
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};
