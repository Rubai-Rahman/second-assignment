import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
//will control function
router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUser);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);

export const UserRoutes = router;
