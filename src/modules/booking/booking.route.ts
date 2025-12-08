import { Router } from 'express';

import { bookingController } from './booking.controller';
import auth from '../../middleware/auth';
const router = Router();
router.post('/', auth('admin', 'customer'), bookingController.createBooking);
router.get('/', auth('admin', 'customer'), bookingController.getBookings);
router.put('/:id', auth('admin', 'customer'), bookingController.updateBooking);

export const bookingRoutes = router;
