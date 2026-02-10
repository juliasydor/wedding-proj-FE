'use client';

import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import IconImage from '@/app/assets/Icon.png';

interface HeartIconProps {
  className?: string;
  size?: number;
  filled?: boolean;
  animate?: boolean;
}

export function HeartIcon({ className, size = 140, animate = false }: HeartIconProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-secondary/20 p-3',
        animate && 'animate-pulse-heart',
        className
      )}
    >
      <Image
        src={IconImage}
        alt="Véu & Gravata"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}
