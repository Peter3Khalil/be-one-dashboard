import type { Link, LinkComponentProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { Link as LocalizedLink } from '@/i18n/routing';

export type NavItemType = {
  id: string;
  title: string;
  url: LocalizedRouteType;
  icon?: LucideIcon;
  isActive?: boolean;
};

export type BreadcrumbItemType = {
  label: string;
  href?: LocalizedRouteType;
  isCurrent?: boolean;
};

export type RouteType = LinkComponentProps<typeof Link>['to'];
export type LocalizedRouteType = ComponentProps<typeof LocalizedLink>['to'];

export type RouteWithoutLocale<T extends string | undefined> =
  T extends `/$locale${infer Rest}` ? Rest : T;
