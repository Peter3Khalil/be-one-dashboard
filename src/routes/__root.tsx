import useLocale from '@/hooks/use-locale';
import { cn } from '@/lib/utils';
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const locale = useLocale();
  return (
    <NuqsAdapter>
      <div
        className={cn('bg-background text-foreground', {
          arabic: locale === 'ar',
          english: locale === 'en',
        })}
      >
        <HeadContent />
        <Outlet />
      </div>
    </NuqsAdapter>
  );
}
