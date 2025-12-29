export interface GetOrdersResponse {
  success: boolean;
  data: Array<Order>;
}

export type Order = {
  order_id: number;
  user_id?: string;
  order_status: 'pending' | 'delivered' | 'cancelled' | 'refunded';
  total_amount: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  items: Array<OrderItem>;
};

export type OrderItem = {
  size: string;
  color: string;
  item_id: number;
  quantity: number;
  item_image: string;
  line_total: number;
  unit_price: number;
  product_name: string;
};

export type OrderParams = Partial<{
  customer_name: string;
  order_status: Array<Order['order_status']>;
  offset: string;
}>;
