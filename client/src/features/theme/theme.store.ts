import { create } from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark',
  isDark: true,
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      return {
        theme: nextTheme,
        isDark: nextTheme === 'dark',
      };
    }),
  setTheme: (theme) =>
    set({
      theme,
      isDark: theme === 'dark',
    }),
}));