import { z } from 'zod';

const sizeSchema = z.object({
  value: z.string().min(1),
  stock: z.coerce.number().min(1),
});

const variantsSchema = z.object({
  color: z.string().min(1),
  images: z.array(z.string().min(1)).min(1),
  sizes: z.array(sizeSchema),
});

export const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  variants: z.array(variantsSchema),
});
