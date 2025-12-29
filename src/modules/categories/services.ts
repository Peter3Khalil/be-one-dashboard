import axiosClient from '@/lib/axios-client';
import type { Category, GetCategoriesResponse } from './types';

export function getCategories() {
  return axiosClient.get<GetCategoriesResponse>('/categories');
}

export function deleteCategory(categoryId: number | string) {
  return axiosClient.delete(`/categories`, {
    data: { id: categoryId },
  });
}

export function createCategory(name: string) {
  return axiosClient.post<{
    success: boolean;
    data: Category;
  }>('/categories', { name });
}

export function updateCategory(categoryId: number, name: string) {
  return axiosClient.put<{
    success: boolean;
  }>(`/categories`, { name, id: categoryId });
}
