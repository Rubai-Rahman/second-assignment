import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name must  be more than 3 characters' })
    .max(15, { message: 'Name Must be 15 or fewer characters long' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name must be more thatn 3 chracters' })
    .max(15, { message: 'Name Must be 15 or fewer characters long' }),
});

const addressValidationSchema = z.object({
  street: z
    .string()
    .min(1, { message: 'Street must not be empty' })
    .max(35, { message: 'Street Must be 35 or fewer characters long' }),
  city: z
    .string()
    .min(1, { message: 'City must not be empty' })
    .max(25, { message: 'City Must be 25 or fewer characters long' }),
  country: z
    .string()
    .min(1, { message: 'Country must not be empty' })
    .max(60, { message: 'Country  Must be 60 or fewer characters long' }),
});

export const ordersValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: 'Product name must not be empty' })
    .max(15, { message: 'Product Name Must be 15 or fewer characters long' }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' }),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1, { message: 'Username must not be empty' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password Must be 15 or fewer characters long' }),
  fullName: userNameValidationSchema,
  age: z.number().min(1, { message: 'Age must be at least 1' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, { message: 'Hobby must not be empty' })),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema),
  isDeleted: z.boolean(),
});
