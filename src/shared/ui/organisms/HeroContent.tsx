'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/shared/store/themeStore';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/config';

interface HeroContentProps {
  tagline: string;
  title: string;
  subtitle: string;
  ctaText: string;
}

export function HeroContent({ tagline, title, subtitle, ctaText }: HeroContentProps) {
  const { mode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default 'veu' styling until mounted to avoid hydration mismatch
  const currentMode = mounted ? mode : 'veu';

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <p
        className={cn(
          'text-sm font-medium uppercase tracking-wider mb-4 transition-colors duration-500',
          currentMode === 'veu' ? 'text-tertiary' : 'text-[#0133E6]'
        )}
      >
        {tagline}
      </p>
      <h1
        className={cn(
          'text-heading-1 max-w-3xl mb-6 transition-colors duration-500',
          currentMode === 'veu' ? 'text-white' : 'text-[#0A0524]'
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          'text-lg max-w-xl mb-8 transition-colors duration-500',
          currentMode === 'veu' ? 'text-white/80' : 'text-[#0A0524]/70'
        )}
      >
        {subtitle}
      </p>
      <Button
        asChild
        size="lg"
        className={cn(
          'rounded-full text-secondary-foreground h-14 px-8 text-lg transition-all duration-500',
          currentMode === 'veu'
            ? 'bg-secondary hover:bg-secondary/90 glow-secondary'
            : 'bg-[#0133E6] hover:bg-[#0133E6]/90 shadow-lg shadow-[#0133E6]/25'
        )}
      >
        <Link href={ROUTES.signup}>
          {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
