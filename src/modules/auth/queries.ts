import { useQuery } from '@tanstack/react-query';
import { getMe } from './services';

export function useGetMe() {
  return useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
  });
}
