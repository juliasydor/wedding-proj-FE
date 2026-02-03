'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('landing.footer');
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 text-center text-sm text-subtitle border-t border-border/50">
      <p>{t('copyright', { year })}</p>
    </footer>
  );
}
