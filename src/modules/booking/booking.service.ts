import { pool } from '../../config/db';
import {
  priceCalculator,
  responseError,
  timeCalculator,
} from '../../helpers/handler';

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const vehicleData = await pool.query(
    `SELECT vehicle_name,daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );
  if (vehicleData.rows.length === 0) {
    throw new Error('Vehicle not found');
  }
  const dailyPrice = Number(vehicleData.rows[0].daily_rent_price);
  const time = timeCalculator(
    rent_start_date as string,
    rent_end_date as string
  );
  const total_price = priceCalculator(time, dailyPrice);

  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );


  return result;
};
const getVehicles = async () => {
  const result = await pool.query(
    `SELECT id,vehicle_name,type,registration_number,daily_rent_price,availability_status FROM vehicles`
  );
  console.log('result');
  return result;
};
const getSingleVehicle = async (id: string) => {
  const result = await pool.query(
    `SELECT id,vehicle_name,type,registration_number,daily_rent_price,availability_status FROM vehicles WHERE id = $1`,
    [id]
  );
  return result;
};
const updateVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
    id,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2,registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  return result;
};
const deleteVehicle = async (id: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
  return result;
};
export const bookingServices = {
  createBooking,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
