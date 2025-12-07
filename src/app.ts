import express, { Request, Response } from 'express';
import initDB from './config/db';
import logger from './middleware/logger';

import { authRoutes } from './modules/auth/auth.route';
import config from './config';
import { vehicleRoutes } from './modules/vehicle/vehicle.route';

const app = express();
app.use(express.json());
console.log(config.route);
initDB();
app.get(`${config.route}`, logger, (req: Request, res: Response) => {
  res.send('Welcome to Intrinsic Vehicle Renting Service');
});
app.use(`${config.route}/auth`, authRoutes);
app.use(`${config.route}/vehicles`, vehicleRoutes);
export default app;
