import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string().trim(),
  brand: z.string().trim(),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    message: `{VALUES} should be Mountain, Road, Hybrid, Electric`,
  }),
  description: z.string().trim(),
  quantity: z.number(),
  inStock: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export default productValidationSchema;
