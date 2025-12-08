import { pool } from '../../config/db';
import { priceCalculator, timeCalculator } from '../../helpers/handler';

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const vehicleData = await pool.query(
    `SELECT vehicle_name,daily_rent_price,availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleData.rows.length === 0) {
    throw new Error('Vehicle not found');
  }
  if (vehicleData.rows[0].availability_status !== 'available') {
    throw new Error('Vehicle is booked');
  }
  const dailyPrice = Number(vehicleData.rows[0].daily_rent_price);
  const time = timeCalculator(
    rent_start_date as string,
    rent_end_date as string
  );
  const total_price = priceCalculator(time, dailyPrice);
  const status = 'active';

  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );
  const availability_status = 'booked';
  const updateVehicleStatus = await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
    [availability_status, vehicle_id]
  );
  return { result, vehicleData, updateVehicleStatus };
};
const getBookings = async (email: string) => {
  const singleUser = await pool.query(
    `SELECT id,name,email FROM users WHERE email = $1`,
    [email]
  );
  const result = await pool.query(
    `SELECT id,customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status FROM bookings`
  );
  const vehicles = await pool.query(
    `SELECT id,vehicle_name,type,registration_number FROM vehicles`
  );
  const users = await pool.query(`SELECT id,name,email FROM users`);
  return { result, vehicles, users, singleUser };
};

const getSingleBooking = async (id: string) => {
  const result = await pool.query(
    `SELECT id,vehicle_id,rent_start_date,rent_end_date,total_price,status FROM bookings WHERE customer_id=$1`,
    [id]
  );
  return result;
};
const getSingleBookingById = async (id: string) => {
  const singleBooking = await pool.query(
    `SELECT id,vehicle_id,rent_start_date,rent_end_date,total_price,status FROM bookings WHERE id=$1`,
    [id]
  );
  return singleBooking;
};

const updateBooking = async (payload: Record<string, unknown>) => {
  const { status, id, vehicle_id } = payload;
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );
  const availability_status = 'available';
  const updateVehicleStatus = await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
    [availability_status, vehicle_id]
  );

  return { result, updateVehicleStatus };
};

export const bookingServices = {
  createBooking,
  getBookings,
  getSingleBooking,
  getSingleBookingById,
  updateBooking,
};
