import { createFileRoute } from '@tanstack/react-router';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { pageTitle } from '@/lib/utils';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/customers'
)({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Customers', href: '/customers', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('customers');
  },
  head() {
    return { meta: [{ title: pageTitle('Customers') }] };
  },
});

function RouteComponent() {
  return <div>Customers</div>;
}
