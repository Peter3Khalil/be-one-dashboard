import axiosClient from '@/lib/axios-client';
import type { GetOrdersResponse, Order, OrderParams } from './types';
import { createQueryString } from '@/lib/utils';

export function getOrders(params?: Partial<OrderParams>) {
  return axiosClient.get<GetOrdersResponse>(
    `/orders?${createQueryString(params || {})}`
  );
}

export function getOrderById(orderId: number | string) {
  return axiosClient.get<{
    success: boolean;
    data: Order;
  }>(`/orders/${orderId}`);
}

export function updateOrderStatus({
  orderId,
  status,
}: {
  orderId: number | string;
  status: Order['order_status'];
}) {
  return axiosClient.patch<{
    success: boolean;
    data: Order;
  }>(`/orders/${orderId}/status`, { status });
}
