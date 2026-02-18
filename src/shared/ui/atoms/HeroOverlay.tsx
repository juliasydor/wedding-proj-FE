'use client';

import { useState, useEffect } from 'react';
import { useThemeStore } from '@/shared/store/themeStore';
import { cn } from '@/shared/lib/utils';

interface HeroOverlayProps {
  className?: string;
}

export function HeroOverlay({ className }: HeroOverlayProps) {
  const { mode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default 'veu' styling until mounted to avoid hydration mismatch
  const currentMode = mounted ? mode : 'veu';

  return (
    <div
      className={cn(
        'absolute inset-0 transition-all duration-500',
        currentMode === 'veu'
          ? 'bg-gradient-to-t from-background via-background/60 to-transparent'
          : 'bg-gradient-to-t from-white/30 via-transparent to-transparent',
        className
      )}
    />
  );
}
