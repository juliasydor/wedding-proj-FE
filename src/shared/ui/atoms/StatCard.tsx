'use client';

import { cn } from '@/shared/lib/utils';

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="text-3xl md:text-4xl font-bold text-foreground">{value}</div>
      <div className="text-xs md:text-sm uppercase tracking-wider text-subtitle mt-1">
        {label}
      </div>
    </div>
  );
}
