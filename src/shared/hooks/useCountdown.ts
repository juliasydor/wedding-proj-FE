'use client';

import { useState, useEffect } from 'react';
import { formatCountdown } from '@/shared/lib/formatters';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(targetDate: Date | string): CountdownResult {
  const [countdown, setCountdown] = useState(() => formatCountdown(targetDate));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const result = formatCountdown(targetDate);
      setCountdown(result);

      if (result.days === 0 && result.hours === 0 && result.minutes === 0 && result.seconds === 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return { ...countdown, isExpired };
}
