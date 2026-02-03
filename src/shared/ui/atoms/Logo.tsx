'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

const sizeMap = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function Logo({ className, size = 'md', showText = true, href = '/' }: LogoProps) {
  const content = (
    <div className={cn('flex items-center gap-2', className)}>
      <Heart
        className="text-secondary fill-secondary animate-pulse-heart"
        size={iconSizeMap[size]}
      />
      {showText && (
        <span className={cn('font-bold text-foreground', sizeMap[size])}>
          Véu & Gravata
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
