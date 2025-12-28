import { toFormData } from 'axios';
import type {
  Category,
  CreateProductBody,
  CreateProductResponse,
  GetProductsResponse,
  ProductParams,
  UploadImageResponse,
  UploadImagesBody,
} from './types';
import axiosClient from '@/lib/axios-client';
import { createQueryString } from '@/lib/utils';

export function getProducts(params?: Partial<ProductParams>) {
  return axiosClient.get<GetProductsResponse>(
    `/products?${createQueryString(params || {})}`
  );
}

export function createProduct(data: CreateProductBody) {
  return axiosClient.post<CreateProductResponse>('/products', data);
}

export function uploadImages({ productId, images, ...data }: UploadImagesBody) {
  const formData = toFormData({ ...data, product_id: productId });
  images.forEach((image) => {
    formData.append('images', image);
  });
  return axiosClient.post<UploadImageResponse>(
    '/images/upload/multiple',
    formData
  );
}

export function getCategories() {
  return axiosClient.get<{
    success: boolean;
    data: Array<Category>;
  }>('/categories');
}
