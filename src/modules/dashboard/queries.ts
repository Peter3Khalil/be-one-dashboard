import { useQuery } from '@tanstack/react-query';
import { getStats } from './services';

export function useStatsQuery() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  });
}
