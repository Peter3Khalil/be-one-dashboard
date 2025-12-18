import type { NavItemType } from './types';

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/',
    isActive: true,
  },
  {
    id: 'products',
    title: 'Products',
    url: '/products',
  },
  {
    id: 'orders',
    title: 'Orders',
    url: '/',
  },
  {
    id: 'customers',
    title: 'Customers',
    url: '/',
  },
] as const satisfies Array<NavItemType>;
