import { useQuery } from '@tanstack/react-query';
import {
  getAvailableFilters,
  getCategories,
  getProductById,
  getProducts,
} from './services';
import type { ProductParams } from './types';

export function useProductsQuery(params?: Partial<ProductParams>) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    refetchOnMount: true,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
}

export function useProductByIdQuery(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });
}

export function useFiltersQuery() {
  return useQuery({
    queryKey: ['product-filters'],
    queryFn: getAvailableFilters,
  });
}
