import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';

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
  return (
    <div className="h-screen">
      <Button>Click here</Button>
    </div>
  );
}
