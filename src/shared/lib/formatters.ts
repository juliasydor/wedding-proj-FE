import { format, formatDistanceToNow, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

type Locale = 'pt' | 'en';

const localeMap = {
  pt: ptBR,
  en: enUS,
};

export function formatDate(date: Date | string, locale: Locale = 'pt', pattern = 'PPP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, pattern, { locale: localeMap[locale] });
}

export function formatCurrency(amount: number, locale: Locale = 'pt'): string {
  const currency = locale === 'pt' ? 'BRL' : 'USD';
  const localeString = locale === 'pt' ? 'pt-BR' : 'en-US';

  return new Intl.NumberFormat(localeString, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatCountdown(targetDate: Date | string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();

  if (target <= now) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = differenceInDays(target, now);
  const hours = differenceInHours(target, now) % 24;
  const minutes = differenceInMinutes(target, now) % 60;
  const seconds = differenceInSeconds(target, now) % 60;

  return { days, hours, minutes, seconds };
}

export function formatRelativeTime(date: Date | string, locale: Locale = 'pt'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: localeMap[locale] });
}
