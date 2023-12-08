import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
//will control function
router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUser);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteSingleUser);
router.get('/:userId/orders', UserController.getSingleUserOrders);
router.put('/:userId/orders', UserController.setSingleUserOrders);


export const UserRoutes = router;
