import { Router } from 'express';

import { vehicleController } from './vehicle.controller';
import auth from '../../middleware/auth';
const router = Router();
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:id', vehicleController.getSingleVehicle);

export const vehicleRoutes = router;
