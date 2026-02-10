'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Globe,
  Gift,
  Users,
  Settings,
  LogOut,
  QrCode,
  ExternalLink,
  Menu,
  X,
  Wallet,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Logo } from '@/shared/ui/atoms/Logo';
import { ROUTES } from '@/shared/config';
import { useWeddingStore } from '@/entities/wedding';
import { useAuthStore } from '@/entities/user';
import { ThemeToggle } from '@/shared/ui/molecules/ThemeToggle';

const navItems = [
  { href: ROUTES.dashboard, icon: LayoutDashboard, labelKey: 'overview' },
  { href: ROUTES.siteEditor, icon: Globe, labelKey: 'siteEditor' },
  { href: ROUTES.giftList, icon: Gift, labelKey: 'giftList' },
  { href: ROUTES.wallet, icon: Wallet, labelKey: 'wallet' },
  { href: ROUTES.guests, icon: Users, labelKey: 'guests' },
  { href: ROUTES.settings, icon: Settings, labelKey: 'settings' },
];

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('dashboard.nav');
  const { onboarding } = useWeddingStore();
  const { logout } = useAuthStore();

  const weddingSlug = onboarding.partner1Name && onboarding.partner2Name
    ? `${onboarding.partner1Name.toLowerCase().replace(/\s/g, '')}and${onboarding.partner2Name.toLowerCase().replace(/\s/g, '')}`
    : null;

  const closeSidebar = () => setIsOpen(false);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 md:p-6 border-b border-border/50 flex items-center justify-between">
        <Logo size="md" href={ROUTES.dashboard} />
        <button
          onClick={closeSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-quaternary"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 md:p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== ROUTES.dashboard && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                'flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20'
                  : 'text-foreground/70 hover:text-foreground hover:bg-quaternary'
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-3 md:p-4 border-t border-border/50">
        <div className="flex items-center justify-between px-3 md:px-4 py-2">
          <span className="text-sm font-medium text-foreground/70">Tema</span>
          <ThemeToggle size="sm" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 md:p-4 border-t border-border/50 space-y-1 md:space-y-2">
        {weddingSlug && (
          <>
            <Link
              href={ROUTES.weddingSite(weddingSlug)}
              target="_blank"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-quaternary transition-all duration-200"
            >
              <ExternalLink className="h-5 w-5" />
              {t('viewSite')}
            </Link>
            <Link
              href={ROUTES.onboarding.qrCode}
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-quaternary transition-all duration-200"
            >
              <QrCode className="h-5 w-5" />
              {t('shareQR')}
            </Link>
          </>
        )}
        <button
          onClick={() => {
            logout();
            closeSidebar();
          }}
          className="w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-secondary hover:bg-secondary/10 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          {t('logout')}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <Logo size="sm" href={ROUTES.dashboard} />
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-quaternary"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'md:hidden fixed top-0 left-0 bottom-0 w-72 bg-card z-50 flex flex-col transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 flex-col z-40">
        <SidebarContent />
      </aside>
    </>
  );
}
