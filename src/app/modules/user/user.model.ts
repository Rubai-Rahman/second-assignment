// mongoose-schema.ts
import { Schema, model } from 'mongoose';
import {
  TUserName,
  TAddress,
  TUser,
  TOrders,
  UserModel,
  UserMethods,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'street is required'],
  },
  city: {
    type: String,
    required: [true, 'city is required'],
  },
  country: {
    type: String,
    required: [true, 'coun is required'],
  },
});

const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'productName is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: [true, 'street is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'street is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'street is required'],
    default: undefined,
  },
  fullName: userNameSchema,
  age: {
    type: Number,
    required: [true, 'street is required'],
  },
  email: {
    type: String,
    required: [true, 'street is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, 'street is required'],
  },
  hobbies: [{ type: String, required: 'hobbies is required' }],
  address: addressSchema,
  orders: { type: [orderSchema], required: true },
  isDeleted: { type: 'boolean', default: false },
});

//middleware
//pre hook
userSchema.pre('save', async function (next) {
  //hassing passworld and save in to db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user: TUser = this;
  user.password = (await bcrypt.hash(
    user.password as string,
    Number(config.bycrpt_salt_round),
  )) as string;

  next();
}
);
//post hook
userSchema.post('save', function (doc, next) {
  doc.password = undefined;
  next();
});
//aggregate
userSchema.post('aggregate', function (docs, next) {
  docs.forEach((doc) => {
    if (doc) {
      doc.password = undefined;
    }
  });

  next();
});
//find
userSchema.post('find', function (docs, next) {
  if (Array.isArray(docs)) {
    // Iterate through the found documents and set password to undefined
    docs.forEach((doc) => {
      if (doc) {
        doc.password = undefined;
      }
    });
  }

  next();
});
//pree hook
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
//custom instance
userSchema.methods.isUserExists = async function (userId) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};
export const User = model<TUser, UserModel>('User', userSchema);
