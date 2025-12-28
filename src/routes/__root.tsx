import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

export const Route = createRootRoute({
  component: () => (
    <NuqsAdapter>
      <div className="bg-background text-foreground">
        <HeadContent />
        <Outlet />
      </div>
    </NuqsAdapter>
  ),
});
