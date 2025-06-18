import { z } from "zod/v4";

const StoreSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  maxProducts: z.number().min(50).optional().default(50),
});

const ProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  details: z.string().min(5, "Detalles debe contener al menos 5 caracteres"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo"),
  statusVisible: z.boolean().optional().default(true)
});

const SignupSchema = z.object({
  name: z.string().regex(/^[\p{L}]{3,30}$/u, 'El nombre debe contener entre 3 y 30 letras'),
  lastname : z.string().regex(/^[\p{L}]{3,30}$/u, 'El apellido debe contener entre 3 y 30 letras'),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format invalid'),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/, 'La contraseña debe contener al menos 12 caracteres, incluyendo mayúscula, minúscula y al menos un número')
});

const LoginSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format invalid'),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/, 'La contraseña debe contener al menos 12 caracteres, incluyendo mayúscula, minúscula y al menos un número')
})

export const Schemas = {
  addProduct: ProductSchema,
  createStore: StoreSchema,
  signup: SignupSchema,
  login: LoginSchema
};
