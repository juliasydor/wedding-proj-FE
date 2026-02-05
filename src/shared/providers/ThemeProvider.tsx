'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/shared/store/themeStore';
import { HeartCursorTrail } from '@/shared/animations/HeartCursorTrail';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;

    // Remove both theme classes first
    html.classList.remove('veu', 'gravata');

    // Add the current theme class
    html.classList.add(mode);
  }, [mode]);

  return (
    <>
      {/* Only show heart cursor trail in véu mode */}
      {mode === 'veu' && <HeartCursorTrail />}
      {children}
    </>
  );
}
