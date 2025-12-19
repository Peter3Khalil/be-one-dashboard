import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';
import type { NavItemType } from './types';

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/',
    isActive: true,
    icon: LayoutDashboard,
  },
  {
    id: 'products',
    title: 'Products',
    url: '/products',
    icon: Package,
  },
  {
    id: 'orders',
    title: 'Orders',
    url: '/orders',
    icon: ShoppingCart,
  },
  {
    id: 'customers',
    title: 'Customers',
    url: '/customers',
    icon: Users,
  },
] as const satisfies Array<NavItemType>;
