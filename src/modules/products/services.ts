import { toFormData } from 'axios';
import type {
  Category,
  CreateProductBody,
  CreateProductResponse,
  FiltersResponse,
  GetProductsResponse,
  ProductParams,
  ProductType,
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

export function getProductById(productId: string) {
  return axiosClient.get<{
    success: boolean;
    data: ProductType;
  }>(`/products/${productId}`);
}

export function deleteImage(imageId: string) {
  return axiosClient.delete<{ success: boolean; message: string }>(
    `/images/${imageId}`
  );
}
export function updateProductDetails({
  productId,
  data,
}: {
  productId: string;
  data: Partial<
    Pick<ProductType, 'name' | 'description' | 'is_active' | 'price'> & {
      categories: Array<string | number>;
    }
  >;
}) {
  return axiosClient.put<{
    success: boolean;
    message: string;
    data: Pick<
      ProductType,
      'id' | 'name' | 'description' | 'is_active' | 'price'
    > & {
      created_at: string;
      updated_at: string;
    };
  }>(`/products/${productId}`, data);
}

export function deleteProduct(productId: string) {
  return axiosClient.delete<{ success: boolean; message: string }>(
    `/products/${productId}`
  );
}

export function getAvailableFilters() {
  return axiosClient.get<FiltersResponse>('/products/filters');
}
