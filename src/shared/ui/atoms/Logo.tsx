'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import IconImage from '@/app/assets/Icon.png';

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
  sm: 120,
  md: 150,
  lg: 180,
};

export function Logo({ className, size = 'md', showText = true, href }: LogoProps) {
  const { isAuthenticated } = useAuthStore();

  // If href is explicitly provided, use it. Otherwise, auto-detect based on auth state.
  const resolvedHref = href ?? (isAuthenticated ? ROUTES.dashboard : '/');

  const content = (
    <div className={cn('flex items-center gap-0', className)}>
      <Image
        src={IconImage}
        alt="Véu & Gravata"
        width={iconSizeMap[size]}
        height={iconSizeMap[size]}
        className="object-contain -mr-2 h-auto"
      />
      {showText && (
        <span className={cn('font-bold text-foreground', sizeMap[size])}>
          Véu & Gravata
        </span>
      )}
    </div>
  );

  if (resolvedHref) {
    return (
      <Link href={resolvedHref} className="transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
