import { Request, Response } from 'express';
import createUserIntoDB from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    console.log(user);
    const result = await createUserIntoDB(user);
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

export const UserController = {
  createUser,
};
