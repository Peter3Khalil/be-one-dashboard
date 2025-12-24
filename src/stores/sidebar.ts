import { create } from 'zustand';
import type { NavItemType } from '@/types';
import { NAV_ITEMS } from '@/constants';

type SidebarItemsState = {
  items: Array<NavItemType>;
  setActiveItem: (id: ReturnType<typeof NAV_ITEMS>[number]['id']) => void;
  setItems: (items: Array<NavItemType>) => void;
};

export const useSidebarItems = create<SidebarItemsState>((set) => ({
  items: NAV_ITEMS(),
  setActiveItem(id) {
    set((state) => ({
      items: state.items.map((item) => ({
        ...item,
        isActive: item.id === id,
      })),
    }));
  },
  setItems(items) {
    set({ items });
  },
}));
