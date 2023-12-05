import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userValidationSchema } from './user.validation';

//create User
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const zodparseData = userValidationSchema.parse(user);
    const result = await UserService.createUserIntoDB(zodparseData);
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
//Get All User
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
//Get User by id
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
//update User by id
const updateSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { updatedData } = req.body;
  try {
    const result = await UserService.updateSingleUserInDB(userId, updatedData);
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
  updateSingleUser,
};
