import { useQuery } from '@tanstack/react-query';
import { getCategories } from './services';

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    refetchOnMount: true,
  });
}
