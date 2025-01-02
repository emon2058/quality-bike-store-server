import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email().trim(),
  product: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export default orderValidationSchema;
