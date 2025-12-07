import { pool } from '../../config/db';
import bcrypt from 'bcryptjs';

const getUser = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);
  return result;
};

const updateUser = async (payload: Record<string, unknown>) => {
  const { name, email, phone, role, id } = payload;

  const result = await pool.query(
    `UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, id]
  );
  return result;
};
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};
export const userServices = {
  getUser,
  updateUser,
  deleteUser,
};
