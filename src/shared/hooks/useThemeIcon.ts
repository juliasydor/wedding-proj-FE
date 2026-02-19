import { useState, useEffect } from 'react';
import { useThemeStore } from '@/shared/store/themeStore';
import IconVeu from '@/app/assets/icon.svg';
import IconGravata from '@/app/assets/icon-blue.svg';

export function useThemeIcon() {
  const { mode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial hydration, always return default icon
  // to prevent hydration mismatch (localStorage not available on server)
  if (!mounted) return IconGravata;

  return mode === 'gravata' ? IconGravata : IconVeu;
}
