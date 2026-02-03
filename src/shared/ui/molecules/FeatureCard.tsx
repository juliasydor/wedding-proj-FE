'use client';

import { Globe, Users, Gift, QrCode, type LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type IconName = 'globe' | 'users' | 'gift' | 'qrCode';

const iconMap: Record<IconName, LucideIcon> = {
  globe: Globe,
  users: Users,
  gift: Gift,
  qrCode: QrCode,
};

interface FeatureCardProps {
  iconName: IconName;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ iconName, title, description, className }: FeatureCardProps) {
  const Icon = iconMap[iconName];

  return (
    <div
      className={cn(
        'group relative p-6 rounded-2xl',
        // Background with subtle gradient
        'bg-gradient-to-br from-card via-card to-quaternary/30',
        // Border
        'border border-border/50',
        // Shadow
        'shadow-lg shadow-black/10',
        // Hover effects
        'transition-all duration-300 ease-out',
        'hover:shadow-xl hover:shadow-secondary/10',
        'hover:border-secondary/30',
        'hover:-translate-y-1',
        'hover:bg-gradient-to-br hover:from-card hover:via-card hover:to-secondary/5',
        // Overflow for pseudo-elements
        'overflow-hidden',
        className
      )}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-tertiary/5" />
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        <div className="absolute -inset-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine" />
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-secondary/10 to-transparent rounded-bl-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon container */}
        <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-secondary/10 p-4 ring-1 ring-secondary/20 transition-all duration-300 group-hover:bg-secondary/20 group-hover:ring-secondary/40 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-secondary/20">
          <Icon className="h-7 w-7 text-secondary transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-secondary">
          {title}
        </h3>

        {/* Description */}
        <p className="text-subtitle text-sm leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
          {description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-secondary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
}
