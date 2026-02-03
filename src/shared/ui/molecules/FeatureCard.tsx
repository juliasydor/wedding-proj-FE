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
    <div className={cn('group', className)}>
      <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary/10 p-3 ring-1 ring-secondary/20 transition-all group-hover:bg-secondary/20 group-hover:ring-secondary/40">
        <Icon className="h-6 w-6 text-secondary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-subtitle text-sm leading-relaxed">{description}</p>
    </div>
  );
}
