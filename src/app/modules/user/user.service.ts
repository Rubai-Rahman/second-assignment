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
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
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
        usernam: 1,
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
  const result = await User.updateOne({ userId }, { isDeleted: true });

  return result;
};
//get Single user Orders
const getSingleUserOrdersFromDb = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.find({ userId });

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
  const result = await User.findOneAndUpdate(
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
    { upsert: true, new: true },
  );

  return result;
};
//calculateTotalPrice
const calculateTotalPriceForUser = async (userId: number) => {
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error('User Does not exists');
  }
  const result = await User.aggregate([
    { $match: { userId } },
    {
      $project: {
        _id: 0,
        userId: 1,
        totalPrice: {
          $sum: {
            $map: {
              input: '$orders',
              as: 'order',
              in: { $multiply: ['$$order.price', '$$order.quantity'] },
            },
          },
        },
      },
    },
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
