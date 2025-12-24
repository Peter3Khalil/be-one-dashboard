import { createFileRoute } from '@tanstack/react-router';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { pageTitle } from '@/lib/utils';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/orders'
)({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Orders', href: '/orders', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('orders');
  },
  head() {
    return { meta: [{ title: pageTitle('Orders') }] };
  },
});

function RouteComponent() {
  return <div>Orders</div>;
}
