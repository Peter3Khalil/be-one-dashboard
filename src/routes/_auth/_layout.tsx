import AppSidebar from '@components/app-sidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb';
import { Separator } from '@ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@ui/sidebar';
import { useSidebarItems } from '@/stores/sidebar';

export const Route = createFileRoute('/_auth/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const { items } = useSidebarItems();
  return (
    <SidebarProvider>
      <AppSidebar
        items={items}
        user={{ name: 'Peter', email: 'peter@example.com' }}
      />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="px-4 py-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
