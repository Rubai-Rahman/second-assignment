import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
