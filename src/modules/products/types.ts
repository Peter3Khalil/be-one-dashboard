import type { z } from 'zod';
import type { formSchema } from './form-schema';

export type SizeStock = {
  value: string;
  stock: number;
};

export type ColorVariant = {
  color: string;
  images: Array<string>;
  sizes: Array<SizeStock>;
};

export type ProductFormData = {
  name: string;
  price: string;
  description: string;
  variants: Array<ColorVariant>;
};

export type ProductFormSchema = z.infer<typeof formSchema>;
