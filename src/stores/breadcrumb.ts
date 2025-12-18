import { create } from 'zustand';
import type { BreadcrumbItemType } from '@/types';

type BreadcrumbItemsState = {
  items: Array<BreadcrumbItemType>;
  setItems: (items: Array<BreadcrumbItemType>) => void;
};

export const useBreadcrumbItems = create<BreadcrumbItemsState>((set) => ({
  items: [],
  setItems(items) {
    set(() => ({
      items,
    }));
  },
}));
