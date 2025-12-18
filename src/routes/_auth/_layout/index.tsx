import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { useSidebarItems } from '@/stores/sidebar';

export const Route = createFileRoute('/_auth/_layout/')({
  component: App,
  onEnter() {
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
