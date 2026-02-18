'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useThemeStore } from '@/shared/store/themeStore';

interface Heart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

interface HeartAnimationProps {
  count?: number;
  className?: string;
}

export function HeartAnimation({ count = 15, className }: HeartAnimationProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const { mode } = useThemeStore();

  useEffect(() => {
    const generatedHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 6 + Math.random() * 10,
    }));
    setHearts(generatedHearts);
  }, [count]);

  // Don't render hearts in Gravata (light) mode
  if (mode === 'gravata') {
    return null;
  }

  return (
    <div className={cn('pointer-events-none fixed inset-0 overflow-hidden', className)}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart text-secondary"
          style={{
            left: `${heart.x}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="animate-pulse-heart"
            style={{
              width: '1em',
              height: '1em',
              animationDelay: `${heart.delay}s`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
