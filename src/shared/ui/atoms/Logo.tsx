'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { useThemeIcon } from '@/shared/hooks/useThemeIcon';

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
  md: 160,
  lg: 200,
};

export function Logo({ className, size = 'md', showText = true, href }: LogoProps) {
  const { isAuthenticated } = useAuthStore();
  const IconImage = useThemeIcon();

  // If href is explicitly provided, use it. Otherwise, auto-detect based on auth state.
  const resolvedHref = href ?? (isAuthenticated ? ROUTES.dashboard : '/');

  const content = (
    <div className={cn('flex items-center', className)}>
      <Image
        src={IconImage}
        alt="Véu & Gravata"
        width={iconSizeMap[size]}
        height={Math.round(iconSizeMap[size] * 2 / 3)}
        className="object-contain h-auto max-h-14"
      />
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
