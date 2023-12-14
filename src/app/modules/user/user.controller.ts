import { Request, Response } from 'express';
import { UserService } from './user.service';
import {
  ordersValidationSchema,
  userValidationSchema,
} from './user.validation';

//create User
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodparseData = userValidationSchema.parse(user);
    const result = await UserService.createUserIntoDB(zodparseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message || 'Somthing went wrong',
      error: err,
    });
  }
};
//Get All User
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Somthing went wrong',
      error: err,
    });
  }
};
//Get User by id
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await UserService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
//update User by id
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const updatedData = req.body;
    const zodparseData = userValidationSchema.parse(updatedData);

    const result = await UserService.updateSingleUserInDB(userId, zodparseData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
//deleteUser
const deleteSingleUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const result = await UserService.deleteSingleUserInDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
//get Single User Orders
const getSingleUserOrders = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const result = await UserService.getSingleUserOrdersFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
//setSingleUserOrders
const setSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const productData = req.body;
    const zodparseData = ordersValidationSchema.parse(productData);
    const result = await UserService.setSingleUserOrdersFromDb(
      userId,
      zodparseData,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
//calculateTotal
const calculateTotalPriceForUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const result = await UserService.calculateTotalPriceForUser(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getSingleUserOrders,
  setSingleUserOrders,
  calculateTotalPriceForUser,
};
