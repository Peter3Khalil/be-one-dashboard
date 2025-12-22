import { z } from 'zod';

const sizeSchema = z.object({
  value: z
    .string({ required_error: 'Required' })
    .min(1, 'Size cannot be empty'),
  stock: z.coerce
    .number({
      required_error: 'Required',
      invalid_type_error: 'Must be a number',
    })
    .min(1, {
      message: 'Stock must be at least 1',
    }),
});

const variantsSchema = z.object({
  color: z
    .string({
      required_error: 'Required',
    })
    .min(1, {
      message: 'Required',
    }),
  images: z.array(z.any()).min(1, {
    message: 'At least one image is required',
  }),
  sizes: z.array(sizeSchema).min(1, {
    message: 'At least one size is required',
  }),
});

export const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce
    .number({
      invalid_type_error: 'Required',
    })
    .min(1, {
      message: 'Price must be at least 1',
    }),
  categories: z.array(z.string().min(1)).min(1, {
    message: 'Select at least one category',
  }),
  description: z
    .string({
      required_error: 'Required',
    })
    .min(1, {
      message: 'Required',
    }),
  variants: z.array(variantsSchema).min(1, {
    message: 'At least one variant is required',
  }),
});
