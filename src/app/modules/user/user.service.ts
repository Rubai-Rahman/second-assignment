import { TUser } from './user.interface';
import { User } from './user.model';

//createUser service
const createUserIntoDB = async (userData: TUser) => {
  //create an custom instance
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  // const result = await User.create(userData);//built in static method
  const result = await user.save();
  return result;
};
//Get all user service
const getAllUserFromDB = async () => {
  const result = await User.find()
    .select('username fullName age email address -_id')
    .exec();
  return result;
};

//Get single user
const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};
// update user
const updateSingleUserInDB = async (userId: string, updatedData: TUser) => {
  const result = await User.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });

  return result;
};
const deleteSingleUserInDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });

  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
  deleteSingleUserInDB,
};
