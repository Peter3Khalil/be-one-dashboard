import { useQuery } from '@tanstack/react-query';
import { getOrderById, getOrders } from './services';
import type { OrderParams } from './types';

export function useOrdersQuery(params?: Partial<OrderParams>) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getOrders(params),
    refetchOnMount: true,
  });
}

export function useOrderByIdQuery(orderId: number | string) {
  return useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => getOrderById(orderId),
  });
}
