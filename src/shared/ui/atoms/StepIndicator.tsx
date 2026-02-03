'use client';

import { cn } from '@/shared/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepIndicator({ currentStep, totalSteps, className }: StepIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={cn(
            'h-1 flex-1 rounded-full transition-all duration-300',
            index < currentStep ? 'bg-secondary' : 'bg-muted'
          )}
        />
      ))}
    </div>
  );
}
