import express, { Response, Request } from 'express';

import auth from '../../middleware/auth';
import logger from '../../middleware/logger';
const router = express.Router();

// router.post('/', userControllers.createUser);
// router.get('/', logger, auth(), userControllers.getUser);
// router.get('/:id', userControllers.getSingleUser);
// router.put('/:id', userControllers.updateUser);
// router.delete('/:id', userControllers.deleteUser);
export const userRoutes = router;
