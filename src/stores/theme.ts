import { useEffect } from 'react';
import { create } from 'zustand';

export type Theme = 'dark' | 'light' | 'system';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  getSystemTheme: () => Theme;
};

const STORAGE_KEY = 'theme';

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme:
    (typeof window !== 'undefined' &&
      (localStorage.getItem(STORAGE_KEY) as Theme)) ||
    'system',

  setTheme: (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
  toggleTheme: () => {
    const currentTheme = get().theme;
    currentTheme === 'system'
      ? get().setTheme(get().getSystemTheme() === 'dark' ? 'light' : 'dark')
      : get().setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  },
  getSystemTheme: () => {
    const isSystemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return isSystemDark ? 'dark' : 'light';
  },
}));

export default function ThemeEffect() {
  const { theme, setTheme } = useThemeStore();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      setTheme(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return null;
}
