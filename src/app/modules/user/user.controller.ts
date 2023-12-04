import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: 'User created Successfully',
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
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Data retrive sucessfully',
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
const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const result = await UserService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Data retrive sucessfully',
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

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
};
