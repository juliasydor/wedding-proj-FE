import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ThemeMode = 'veu' | 'gravata';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'veu', // Default to véu (bride theme)

      setMode: (mode) => set({ mode }),

      toggle: () =>
        set((state) => ({
          mode: state.mode === 'veu' ? 'gravata' : 'veu',
        })),
    }),
    {
      name: 'wedding-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
