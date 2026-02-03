'use client';

import { type ReactNode } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '../atoms/StepIndicator';
import { IconButton } from '../atoms/IconButton';
import { cn } from '@/shared/lib/utils';

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  highlightedWord?: string;
  children: ReactNode;
  onBack?: () => void;
  onSkip?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  showSkip?: boolean;
  skipLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function OnboardingLayout({
  currentStep,
  totalSteps,
  title,
  subtitle,
  highlightedWord,
  children,
  onBack,
  onSkip,
  onContinue,
  continueLabel = 'Continue',
  showSkip = false,
  skipLabel = 'Skip',
  isLoading = false,
  className,
}: OnboardingLayoutProps) {
  // Split title if there's a highlighted word
  const renderTitle = () => {
    if (!highlightedWord) {
      return <span>{title}</span>;
    }

    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-secondary">{highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn('min-h-screen bg-background flex flex-col', className)}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8">
        {onBack ? (
          <IconButton variant="ghost" onClick={onBack} aria-label="Go back">
            <ChevronLeft className="h-5 w-5" />
          </IconButton>
        ) : (
          <div className="w-10" />
        )}

        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-subtitle">
            STEP {currentStep} OF {totalSteps}
          </span>
        </div>

        {showSkip && onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="text-sm font-medium text-secondary hover:underline"
          >
            {skipLabel}
          </button>
        ) : (
          <div className="w-10" />
        )}
      </header>

      {/* Progress bar */}
      <div className="px-4 md:px-8">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12 max-w-2xl mx-auto w-full">
        <div className="space-y-2 mb-8">
          <h1 className="text-heading-2">{renderTitle()}</h1>
          {subtitle && <p className="text-subtitle">{subtitle}</p>}
        </div>

        <div className="space-y-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-background border-t border-border px-4 py-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={onContinue}
            disabled={isLoading}
            className="w-full h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium text-lg flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Loading...' : continueLabel}</span>
            <ChevronLeft className="h-5 w-5 rotate-180" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
