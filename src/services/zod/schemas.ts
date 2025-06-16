import { z } from "zod/v4";

const StoreSchema = z.object({
  name: z.string().min(1, "Name is required"),
  maxProducts: z.number().min(50).optional().default(50),
});

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  details: z.string().min(5, "Details must have at least 5 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock can not be negative"),
  statusVisible: z.boolean().optional().default(true)
});

const SignupSchema = z.object({
  name: z.string().min(3, 'Name must have at least 3 characters').max(40, 'Name can not have more than 40 characters'),
  lastname : z.string().min(3, 'Lastname must have at least 3 characters').max(40, 'Name can not have more than 40 characters'),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format invalid'),
  password: z.string().min(8, 'Password must have at least 8 characters').max(50, 'Password can not have more than 50 characters')
});

const LoginSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format invalid'),
  password: z.string().min(8, 'Password must have at least 8 characters').max(50, 'Password can not have more than 50 characters')
})

export const Schemas = {
  addProduct: ProductSchema,
  createStore: StoreSchema,
  signup: SignupSchema,
  login: LoginSchema
};
