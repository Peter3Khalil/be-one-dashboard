import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';
import i18next from 'i18next';
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
      id: 'customers',
      title: i18next.t('Sidebar.customers'),
      url: '/customers',
      icon: Users,
    },
  ] as const satisfies Array<NavItemType>;

export const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
