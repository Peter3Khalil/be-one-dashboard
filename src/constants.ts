import i18next from 'i18next';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import type { NavItemType } from './types';

export const NAV_ITEMS = () =>
  [
    {
      id: 'dashboard',
      title: i18next.t('Sidebar.dashboard'),
      url: '/',
      isActive: true,
      icon: LayoutDashboard,
    },
    {
      id: 'products',
      title: i18next.t('Sidebar.products'),
      url: '/products',
      icon: Package,
    },
    {
      id: 'orders',
      title: i18next.t('Sidebar.orders'),
      url: '/orders',
      icon: ShoppingCart,
    },
    {
      id: 'categories',
      title: i18next.t('Sidebar.categories'),
      url: '/categories',
      icon: Package,
    },
  ] as const satisfies Array<NavItemType>;

export const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
export const MONTH_NAMES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const;
