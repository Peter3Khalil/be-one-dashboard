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

export type CreateProductBody = Pick<
  ProductType,
  'name' | 'description' | 'price'
> & {
  is_active?: boolean;
  categories: Array<number>;
  variants: Array<Omit<Variant, 'id'>>;
};

export interface CreateProductResponse {
  success: boolean;
  data: ProductType;
}

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
  categories: Array<Category>;
  variants: Array<Variant>;
  images: Record<
    string,
    Array<{
      id: string;
      urls: Record<'original' | 'large' | 'medium' | 'thumbnail', string>;
    }>
  >;
};

export type Category = {
  id: string;
  name: string;
};

export type Variant = {
  id: string;
  size: string;
  color: string;
  stock: number;
};

export type UploadImagesBody = {
  images: Array<File>;
  productId: string;
  color: string;
  altText?: string;
};

export type UploadImageResponse = {
  success: boolean;
  message: string;
  data: {
    uploaded_images: Array<UploadedImage>;
    total_uploaded: number;
    total_attempted: number;
  };
};

type UploadedImage = {
  image_id: number;
  filename: string;
  original_name: string;
  size: number;
  urls: Urls;
  processed_sizes: Array<ProcessedSize>;
};

type Urls = {
  original: string;
  large: string;
  medium: string;
  thumbnail: string;
};

export type ProcessedSize = {
  size: string;
  width: number;
  height: number;
  file_size: number;
};

export type ProductParams = Partial<{
  product_name: string;
  offset: string;
  category_name: string;
}>;

export type GetProductsResponse = {
  success: boolean;
  data: Array<ProductType>;
  pagination: Pagination;
};

type Pagination = {
  page: number;
  limit: number;
  total_pages: number;
  total_items: number;
};
