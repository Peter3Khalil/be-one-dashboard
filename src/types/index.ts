import type { Link, LinkComponentProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

export type NavItemType = {
  title: string;
  url: RouteType;
  icon?: LucideIcon;
  isActive?: boolean;
};

export type RouteType = LinkComponentProps<typeof Link>['to'];
