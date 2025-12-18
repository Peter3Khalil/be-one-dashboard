import { createFileRoute } from '@tanstack/react-router';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';

export const Route = createFileRoute('/_auth/_layout/products')({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Products', href: '/products', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('products');
  },
});

function RouteComponent() {
  return <div>Hello "/_auth/_layout/products"!</div>;
}
