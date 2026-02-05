'use client';

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
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Logo } from '@/shared/ui/atoms/Logo';
import { ROUTES } from '@/shared/config';
import { useWeddingStore } from '@/entities/wedding';
import { useAuthStore } from '@/entities/user';

const navItems = [
  { href: ROUTES.dashboard, icon: LayoutDashboard, labelKey: 'overview' },
  { href: ROUTES.siteEditor, icon: Globe, labelKey: 'siteEditor' },
  { href: ROUTES.giftList, icon: Gift, labelKey: 'giftList' },
  { href: ROUTES.guests, icon: Users, labelKey: 'guests' },
  { href: ROUTES.settings, icon: Settings, labelKey: 'settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const t = useTranslations('dashboard.nav');
  const { onboarding } = useWeddingStore();
  const { logout } = useAuthStore();

  const weddingSlug = onboarding.partner1Name && onboarding.partner2Name
    ? `${onboarding.partner1Name.toLowerCase().replace(/\s/g, '')}and${onboarding.partner2Name.toLowerCase().replace(/\s/g, '')}`
    : null;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Logo size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== ROUTES.dashboard && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
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

      {/* Quick Actions */}
      <div className="p-4 border-t border-border/50 space-y-2">
        {weddingSlug && (
          <>
            <Link
              href={ROUTES.weddingSite(weddingSlug)}
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-quaternary transition-all duration-200"
            >
              <ExternalLink className="h-5 w-5" />
              {t('viewSite')}
            </Link>
            <Link
              href={ROUTES.onboarding.qrCode}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-quaternary transition-all duration-200"
            >
              <QrCode className="h-5 w-5" />
              {t('shareQR')}
            </Link>
          </>
        )}
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-secondary hover:bg-secondary/10 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          {t('logout')}
        </button>
      </div>
    </aside>
  );
}
