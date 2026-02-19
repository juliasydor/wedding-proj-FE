'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import Image from 'next/image';
import { Gift, Menu, X, Home } from 'lucide-react';
import { useThemeIcon } from '@/shared/hooks/useThemeIcon';
import { cn } from '@/shared/lib/utils';

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const IconImage = useThemeIcon();
  const params = useParams();
  const slug = params?.slug as string || '';

  const navItems = [
    { href: `/wedding/${slug}`, label: 'Início', icon: Home },
    { href: `/wedding/${slug}/gifts`, label: 'Lista de Presentes', icon: Gift },
  ];

  const isActive = (href: string) => {
    if (href === `/wedding/${slug}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href={`/wedding/${slug}`} className="flex items-center gap-2">
              <Image src={IconImage} alt="Véu & Gravata" width={140} height={93} className="w-auto h-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                    isActive(item.href)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-quaternary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-quaternary"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive(item.href)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-quaternary'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-14 md:pt-16">
        {children}
      </main>
    </div>
  );
}
