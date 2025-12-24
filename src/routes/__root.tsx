import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { NAV_ITEMS } from '@/constants';
import { useSidebarItems } from '@/stores/sidebar';

export const Route = createRootRoute({
  component: () => (
    <div className="bg-background text-foreground">
      <HeadContent />
      <Outlet />
    </div>
  ),
  onEnter() {
    useSidebarItems.getState().setItems(NAV_ITEMS());
  },
});
