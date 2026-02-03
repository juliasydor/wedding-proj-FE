'use client';

import { cn } from '@/shared/lib/utils';

interface CountdownUnitProps {
  value: number;
  label: string;
  highlight?: boolean;
  className?: string;
}

export function CountdownUnit({ value, label, highlight = false, className }: CountdownUnitProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg p-3 min-w-[60px]',
        highlight ? 'bg-secondary text-secondary-foreground' : 'bg-card text-card-foreground',
        className
      )}
    >
      <span className="text-2xl md:text-3xl font-bold tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs uppercase tracking-wider text-subtitle">
        {label}
      </span>
    </div>
  );
}
