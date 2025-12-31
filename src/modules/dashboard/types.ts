export type StatisticsResponse = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueOverview: Array<{ month: number; revenue: number }>; // month: 1-12, 1 = January
  ordersOverview: Array<{
    month: number;
    delivered: number;
    pending: number;
    cancelled: number;
    refunded: number;
  }>;
};
