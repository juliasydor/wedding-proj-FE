'use client';

import {
  Timer,
  HeartHandshake,
  PiggyBank,
  ClipboardList,
  Wallet,
  CreditCard,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type IconName = 'timer' | 'heartHandshake' | 'piggyBank' | 'clipboardList' | 'wallet' | 'creditCard';

const iconMap: Record<IconName, LucideIcon> = {
  timer: Timer,
  heartHandshake: HeartHandshake,
  piggyBank: PiggyBank,
  clipboardList: ClipboardList,
  wallet: Wallet,
  creditCard: CreditCard,
};

interface BenefitCardProps {
  iconName: IconName;
  title: string;
  description: string;
  className?: string;
}

export function BenefitCard({ iconName, title, description, className }: BenefitCardProps) {
  const Icon = iconMap[iconName];

  return (
    <div
      className={cn(
        'group flex items-start gap-5 p-6 rounded-2xl',
        'bg-card/50 border border-border/30',
        'transition-all duration-300 ease-out',
        'hover:bg-card hover:border-secondary/20',
        'hover:shadow-lg hover:shadow-secondary/5',
        className
      )}
    >
      {/* Icon container */}
      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-quaternary border border-border/50 flex items-center justify-center transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/10">
        <Icon className="h-6 w-6 text-secondary/70 transition-colors duration-300 group-hover:text-secondary" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-foreground mb-1.5 transition-colors duration-300 group-hover:text-secondary">
          {title}
        </h3>
        <p className="text-subtitle text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
