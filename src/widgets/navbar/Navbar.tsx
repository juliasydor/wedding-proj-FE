'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/shared/ui/atoms/Logo';
import { ROUTES } from '@/shared/config';
import { ThemeToggleCompact } from '@/shared/ui/molecules/ThemeToggle';
import { cn } from '@/shared/lib/utils';

interface NavbarProps {
  variant?: 'landing' | 'auth' | 'dashboard';
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Logo size="md" />

        {variant === 'landing' && (
          <>
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-3">
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

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-quaternary"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}

        {variant === 'dashboard' && (
          <div className="hidden md:flex items-center gap-3">
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

      {/* Mobile dropdown menu */}
      {variant === 'landing' && mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-subtitle">Tema</span>
            <ThemeToggleCompact />
          </div>
          <div className="border-t border-border/30 pt-4 space-y-3">
            <Link
              href={ROUTES.login}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              {t('login')}
            </Link>
            <Button
              asChild
              className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Link href={ROUTES.signup} onClick={() => setMobileMenuOpen(false)}>
                {t('signup')}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
