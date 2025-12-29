import { createFileRoute, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

import OrderView, {
  OrderNotFound,
  OrderViewSkeleton,
} from '@modules/orders/components/order-view';
import { useOrderByIdQuery } from '@modules/orders/queries';
import { useTranslation } from 'react-i18next';
import { pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/orders_/$id/view'
)({
  component: RouteComponent,
  onEnter() {
    useSidebarItems.getState().setActiveItem('orders');
  },
  head() {
    return { meta: [{ title: pageTitle('Order Details') }] };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const { id } = useParams({ from: Route.id });
  const { data, isLoading } = useOrderByIdQuery(id);
  const order = data?.data.data;
  const { setItems } = useBreadcrumbItems();

  useEffect(() => {
    setItems([
      { label: t('Sidebar.orders'), href: '/orders' },
      {
        label: t('OrderDetailsPage.title'),
        isCurrent: true,
      },
    ]);
  }, [t, setItems]);

  if (isLoading) return <OrderViewSkeleton />;
  if (!order) return <OrderNotFound />;
  return <OrderView order={order} key={order.order_id} />;
}
