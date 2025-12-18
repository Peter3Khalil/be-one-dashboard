import * as React from 'react';

import { Link } from '@tanstack/react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@ui/sidebar';
import NavMain from './nav-main';
import NavUser from './nav-user';
import type { NavItemType } from '@/types';

type Props = React.ComponentProps<typeof Sidebar> & {
  items?: Array<NavItemType>;
  user: {
    name: string;
    email: string;
  };
};

export default function AppSidebar({ items = [], user, ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2 py-2 font-bold">
            <span className="hidden text-xl group-data-[state=collapsed]:mx-auto group-data-[state=collapsed]:block">
              B1
            </span>
            <span className="text-2xl group-data-[state=collapsed]:hidden">
              Be One.
            </span>
          </Link>
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
