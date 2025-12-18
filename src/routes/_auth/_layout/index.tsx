import { createFileRoute } from '@tanstack/react-router';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';

export const Route = createFileRoute('/_auth/_layout/')({
  component: App,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Dashboard', href: '/', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('dashboard');
  },
});

function App() {
  return <div>Dashboard</div>;
}
