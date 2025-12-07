import { Router } from 'express';

import { vehicleController } from './vehicle.controller';
import auth from '../../middleware/auth';
const router = Router();
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:id', vehicleController.getSingleVehicle);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

export const vehicleRoutes = router;
