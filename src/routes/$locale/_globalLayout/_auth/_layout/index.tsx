import { createFileRoute } from '@tanstack/react-router';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
import { pageTitle } from '@/lib/utils';

export const Route = createFileRoute('/$locale/_globalLayout/_auth/_layout/')({
  component: App,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Dashboard', href: '/', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('dashboard');
  },
  head() {
    return { meta: [{ title: pageTitle('Dashboard') }] };
  },
});

function App() {
  return <div>Dashboard</div>;
}
