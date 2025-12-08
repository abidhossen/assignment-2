import { Router } from 'express';

import { bookingController } from './booking.controller';
import auth from '../../middleware/auth';
const router = Router();
router.post('/', bookingController.createBooking);
router.get('/', auth('admin', 'customer'), bookingController.getBookings);
// router.get('/:id', bookingController.getSingleVehicle);
router.put('/:id', bookingController.updateVehicle);
router.delete('/:id', bookingController.deleteVehicle);

export const bookingRoutes = router;
