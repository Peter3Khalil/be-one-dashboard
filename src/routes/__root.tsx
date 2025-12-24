import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="bg-background text-foreground">
      <HeadContent />
      <Outlet />
    </div>
  ),
});
