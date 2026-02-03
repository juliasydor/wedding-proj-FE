'use client';

import { cn } from '@/shared/lib/utils';

interface HeartIconProps {
  className?: string;
  size?: number;
  filled?: boolean;
  animate?: boolean;
}

export function HeartIcon({ className, size = 24, filled = true, animate = false }: HeartIconProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-secondary/20 p-3',
        animate && 'animate-pulse-heart',
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={cn('text-secondary', filled && 'fill-secondary')}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 2}
        fill={filled ? 'currentColor' : 'none'}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}
