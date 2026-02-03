'use client';

import { useCountdown } from '@/shared/hooks';
import { CountdownUnit } from '../atoms/CountdownUnit';
import { cn } from '@/shared/lib/utils';

interface CountdownProps {
  targetDate: Date | string;
  labels?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  className?: string;
}

const defaultLabels = {
  days: 'DAYS',
  hours: 'HOURS',
  minutes: 'MINS',
  seconds: 'SECS',
};

export function Countdown({ targetDate, labels = defaultLabels, className }: CountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className={cn('flex items-center gap-2 md:gap-4', className)}>
      <CountdownUnit value={days} label={labels.days} />
      <CountdownUnit value={hours} label={labels.hours} />
      <CountdownUnit value={minutes} label={labels.minutes} />
      <CountdownUnit value={seconds} label={labels.seconds} highlight />
    </div>
  );
}
