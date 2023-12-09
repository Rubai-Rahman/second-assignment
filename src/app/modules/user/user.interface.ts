import { Model } from 'mongoose';
export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password?: string | undefined;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrders[];
  isDeleted: boolean;
};

//custom instance
export type UserMethods = {
  isUserExists(userId: number): Promise<TUser | null>;
  isEmailUserNameExists(username: string, email: string): Promise<TUser | null>;
};

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
