import { z } from 'zod';

export const UserSchema = z.object({
  userId: z.number(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(15),
  fullName: z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().min(5).max(50),
    city: z.string().min(3).max(20),
    country: z.string().min(2).max(20),
  }),
  orders: z.array(
    z.object({
      productName: z.string().min(3).max(50),
      price: z.number().min(0),
      quantity: z.number().min(1),
    }),
  ),
});
