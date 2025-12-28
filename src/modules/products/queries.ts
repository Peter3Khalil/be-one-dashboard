import { useQuery } from '@tanstack/react-query';
import { getCategories, getProductById, getProducts } from './services';
import type { ProductParams } from './types';

export function useProductsQuery(params?: Partial<ProductParams>) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
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
