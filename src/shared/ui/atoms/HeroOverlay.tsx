'use client';

import { useThemeStore } from '@/shared/store/themeStore';
import { cn } from '@/shared/lib/utils';

interface HeroOverlayProps {
  className?: string;
}

export function HeroOverlay({ className }: HeroOverlayProps) {
  const { mode } = useThemeStore();

  return (
    <div
      className={cn(
        'absolute inset-0 transition-all duration-500',
        mode === 'veu'
          ? 'bg-gradient-to-t from-background via-background/60 to-transparent'
          : 'bg-gradient-to-t from-white/30 via-transparent to-transparent',
        className
      )}
    />
  );
}
