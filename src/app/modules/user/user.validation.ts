import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name must not be empty' }),
  lastName: z.string().min(1, { message: 'Last name must not be empty' }),
});

const addressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street must not be empty' }),
  city: z.string().min(1, { message: 'City must not be empty' }),
  country: z.string().min(1, { message: 'Country must not be empty' }),
});

const ordersValidationSchema = z.object({
  productName: z.string().min(1, { message: 'Product name must not be empty' }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' }),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1, { message: 'Username must not be empty' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  fullName: userNameValidationSchema,
  age: z.number().min(1, { message: 'Age must be at least 1' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, { message: 'Hobby must not be empty' })),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema),
});
