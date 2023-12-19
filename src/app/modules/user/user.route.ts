import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
//will control function
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUser);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteSingleUser);
router.get('/:userId/orders', UserController.getSingleUserOrders);
router.put('/:userId/orders', UserController.setSingleUserOrders);
router.get(
  '/:userId/orders/total-price',
  UserController.calculateTotalPriceForUser,
);

export const UserRoutes = router;
