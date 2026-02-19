'use client';

import { type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useThemeIcon } from '@/shared/hooks/useThemeIcon';
import { SocialButton } from '../molecules/SocialButton';
import { cn } from '@/shared/lib/utils';

interface AuthFormProps {
  title: string;
  subtitle?: string;
  submitLabel: string;
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
  showSocialAuth?: boolean;
  socialAuthLabel?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  isLoading?: boolean;
  className?: string;
}

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  onSubmit,
  children,
  showSocialAuth = true,
  socialAuthLabel = 'or continue with',
  footerText,
  footerLinkText,
  footerLinkHref,
  isLoading = false,
  className,
}: AuthFormProps) {
  const IconImage = useThemeIcon();

  return (
    <div className={cn('w-full max-w-md mx-auto space-y-8', className)}>
      <div className="text-center space-y-4">
        <Image src={IconImage} alt="Véu & Gravata" width={300} height={200} className="mx-auto w-auto h-auto max-h-20 object-contain" />
        <h1 className="text-heading-2">{title}</h1>
        {subtitle && <p className="text-subtitle">{subtitle}</p>}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">{children}</div>

        <Button
          type="submit"
          className="w-full h-12 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : submitLabel}
        </Button>

        {showSocialAuth && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-4 text-subtitle">{socialAuthLabel}</span>
              </div>
            </div>

            <div className="space-y-3">
              <SocialButton provider="apple" />
              <SocialButton provider="google" />
            </div>
          </>
        )}

        {footerText && footerLinkText && footerLinkHref && (
          <p className="text-center text-sm text-subtitle">
            {footerText}{' '}
            <a href={footerLinkHref} className="text-secondary hover:underline">
              {footerLinkText}
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
