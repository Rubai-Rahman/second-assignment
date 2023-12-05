import { TUser } from './user.interface';
import { UserModel } from './user.model';

//createUser service
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
//Get all user service
const getAllUserFromDB = async () => {
  const result = await UserModel.find()
    .select('username fullName age email address -_id')
    .exec();
  return result;
};

//Get single user
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};
// update user
const updateSingleUserInDB = async (userId: string, updatedData) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    updatedData,
    { new: true },
  );

  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
};
