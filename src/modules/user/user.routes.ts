import express, { Response, Request } from 'express';

import auth from '../../middleware/auth';
import logger from '../../middleware/logger';
import { userControllers } from './user.controller';
const router = express.Router();

router.get('/', userControllers.getUser);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);
export const userRoutes = router;
