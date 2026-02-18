<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
>>>>>>> 6162faa33c23cf696e92eefc9eec9063b1f09a2f
import { useThemeStore } from '@/shared/store/themeStore';
import IconVeu from '@/app/assets/icon.svg';
import IconGravata from '@/app/assets/icon-blue.svg';

export function useThemeIcon() {
  const { mode } = useThemeStore();
<<<<<<< HEAD
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial hydration, always return default icon
  // to prevent hydration mismatch (localStorage not available on server)
  if (!mounted) return IconVeu;

=======
>>>>>>> 6162faa33c23cf696e92eefc9eec9063b1f09a2f
  return mode === 'gravata' ? IconGravata : IconVeu;
}
