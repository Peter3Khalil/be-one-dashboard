import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb';
import { Separator } from '@ui/separator';
import { SidebarTrigger } from '@ui/sidebar';
import React from 'react';
import { Button } from '@ui/button';
import { Moon, Sun } from 'lucide-react';
import type { BreadcrumbItemType } from '@/types';
import { useThemeStore } from '@/stores/theme';

type Props = {
  items?: Array<BreadcrumbItemType>;
};
const Header = ({ items = [] }: Props) => {
  const { toggleTheme, theme } = useThemeStore();
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <CustomBreadcrumb items={items} />
        <Button
          variant="outline"
          size="sm"
          className="ms-auto"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  );
};

type CustomBreadcrumbProps = {
  items: Array<BreadcrumbItemType>;
};
const CustomBreadcrumb = ({ items }: CustomBreadcrumbProps) => {
  const withoutCurrent = items.filter((item) => !item.isCurrent);
  const currentItem = items.find((item) => item.isCurrent);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {withoutCurrent.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink to={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </React.Fragment>
        ))}
        {currentItem && (
          <BreadcrumbItem>
            <BreadcrumbPage>{currentItem.label}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Header;
