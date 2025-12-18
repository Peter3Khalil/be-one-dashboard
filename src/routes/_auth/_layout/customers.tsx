import { createFileRoute } from '@tanstack/react-router';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';

export const Route = createFileRoute('/_auth/_layout/customers')({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Customers', href: '/customers', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('customers');
  },
});

function RouteComponent() {
  return <div>Customers</div>;
}
