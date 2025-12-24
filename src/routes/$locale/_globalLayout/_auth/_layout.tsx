import AppSidebar from '@components/app-sidebar';
import Header from '@components/header';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider } from '@ui/sidebar';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';

export const Route = createFileRoute('/$locale/_globalLayout/_auth/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const { items } = useSidebarItems();
  const { items: breadcrumbItems } = useBreadcrumbItems();
  return (
    <SidebarProvider>
      <AppSidebar
        items={items}
        user={{ name: 'Peter', email: 'peter@example.com' }}
      />
      <SidebarInset>
        <Header items={breadcrumbItems} />
        <div className="size-full px-4 py-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
