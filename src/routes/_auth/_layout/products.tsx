import { createFileRoute } from '@tanstack/react-router';
import { useSidebarItems } from '@/stores/sidebar';

export const Route = createFileRoute('/_auth/_layout/products')({
  component: RouteComponent,
  onEnter() {
    useSidebarItems.getState().setActiveItem('products');
  },
});

function RouteComponent() {
  return <div>Hello "/_auth/_layout/products"!</div>;
}
