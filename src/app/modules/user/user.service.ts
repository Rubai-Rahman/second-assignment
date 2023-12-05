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
const getSingleUserFromDB = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.findOne({ userId });
  return result;
};
// update user
const updateSingleUserInDB = async (userId: number, updatedData: TUser) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.updateOne({ userId }, updatedData);

  return result;
};
//delete user
const deleteSingleUserInDB = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.updateOne({ userId }, { isDeleted: true });

  return result;
};
const getSingleUserOrdersFromDb = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.find({ userId });

  return result;
};
export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
  deleteSingleUserInDB,
  getSingleUserOrdersFromDb,
};
