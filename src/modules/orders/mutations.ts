import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from './services';
import type { Order } from './types';

export function useUpdateOrderStatus(orderId: number | string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-order-status', orderId],
    mutationFn: (status: Order['order_status']) =>
      updateOrderStatus({ orderId, status }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({
        queryKey: ['orders', orderId],
      });
    },
  });
}
