import type { Link, LinkComponentProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

export type NavItemType = {
  id: string;
  title: string;
  url: RouteType;
  icon?: LucideIcon;
  isActive?: boolean;
};

export type BreadcrumbItemType = {
  label: string;
  href?: RouteType;
  isCurrent?: boolean;
};

export type RouteType = LinkComponentProps<typeof Link>['to'];

export type SizeStock = {
  value: string;
  stock: number;
};

export type ColorVariant = {
  color: string;
  sizes: Array<SizeStock>;
};

export type ProductFormData = {
  name: string;
  price: string;
  description: string;
  variants: Array<ColorVariant>;
};
