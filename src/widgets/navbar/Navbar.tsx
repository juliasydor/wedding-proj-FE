'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Logo } from '@/shared/ui/atoms/Logo';
import { ROUTES } from '@/shared/config';
import { ThemeToggleCompact } from '@/shared/ui/molecules/ThemeToggle';

interface NavbarProps {
  variant?: 'landing' | 'auth' | 'dashboard';
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const t = useTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Logo size="md" />

        {variant === 'landing' && (
          <div className="flex items-center gap-3">
            <ThemeToggleCompact />
            <Link
              href={ROUTES.login}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              {t('login')}
            </Link>
            <Button
              asChild
              className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Link href={ROUTES.signup}>{t('signup')}</Link>
            </Button>
          </div>
        )}

        {variant === 'dashboard' && (
          <div className="flex items-center gap-3">
            <ThemeToggleCompact />
            <Link
              href={ROUTES.giftList}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              {t('giftList')}
            </Link>
            <Link
              href={ROUTES.guests}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              {t('guests')}
            </Link>
            <Link
              href={ROUTES.settings}
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              {t('settings')}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
