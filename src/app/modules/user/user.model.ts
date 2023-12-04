// mongoose-schema.ts
import { Schema, model } from 'mongoose';
import { TUserName, TAddress, TUser } from './user.interface';

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

// const ordersSchema = new Schema<TOrders>({
//   productName: {
//     type: String,
//     required: [true, 'productName is required'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'price is required'],
//   },
//   quantity: {
//     type: Number,
//     required: [true, 'quantity is required'],
//   },
// });

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'street is required'],
  },
  username: {
    type: String,
    required: [true, 'street is required'],
  },
  password: {
    type: String,
    required: [true, 'street is required'],
  },
  fullName: userNameSchema,
  age: {
    type: Number,
    required: [true, 'street is required'],
  },
  email: {
    type: String,
    required: [true, 'street is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'street is required'],
  },
  hobbies: [{ type: String, required: 'hobbies is required' }],
  address: addressSchema,
});

export const UserModel = model<TUser>('User', userSchema);
