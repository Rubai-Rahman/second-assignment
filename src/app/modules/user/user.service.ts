import { TOrders, TUser } from './user.interface';
import { User } from './user.model';
//createUser service
//create user
const createUserIntoDB = async (userData: TUser) => {
  //create an custom instance
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  //custom instance to check email and username
  const existingUser = await user.isEmailUserNameExists(
    userData.username,
    userData.email,
  );
  if (existingUser) {
    if (existingUser.username === userData.username) {
      throw new Error('Username already exists');
    }
    if (existingUser.email === userData.email) {
      throw new Error('Email already exists');
    }
  }
  const result = await user.save();
  return {
    userId: result.userId,
    username: result.username,

    fullName: user.fullName,
    age: result.age,
    email: result.email,
    isActive: result.isActive,
    hobbies: result.hobbies,
    address: result.address,
  };
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
  const result = await User.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ]);
  return result;
};
// update user
const updateSingleUserInDB = async (userId: number, updatedData: TUser) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User does not exist');
  }

  const result = await User.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $set: updatedData,
    },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ]);

  if (result.length === 0) {
    throw new Error('User not found');
  }

  return result[0];
};

//delete user
const deleteSingleUserInDB = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  await User.findOneAndUpdate({ userId }, { $set: { isDeleted: true } });

  return null;
};
//get Single user Orders
const getSingleUserOrdersFromDb = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $project: {
        _id: 0,
        orders: 1,
      },
    },
  ]);
  return result;
};
//set Single user Orders
const setSingleUserOrdersFromDb = async (
  userId: number,
  productData: TOrders,
) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  await User.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: {
          productName: productData.productName,
          price: productData.price,
          quantity: productData.quantity,
        },
      },
    },
    { upsert: true, new: false },
  );
  return null;
};
//calculateTotalPrice
const calculateTotalPriceForUser = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$userId',
        totalPrice: {
          $sum: {
            $multiply: [{ $toDouble: '$orders.price' }, '$orders.quantity'],
          },
        },
      },
    },
    { $project: { _id: 0, userId: '$_id', totalPrice: 1 } },
  ]);

  return result;
};
export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserInDB,
  deleteSingleUserInDB,
  getSingleUserOrdersFromDb,
  setSingleUserOrdersFromDb,
  calculateTotalPriceForUser,
};
