'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Calendar } from '@/components/ui/calendar';
import { OnboardingLayout } from '@/shared/ui/organisms/OnboardingLayout';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';

export default function OnboardingDatePage() {
  const t = useTranslations('onboarding.date');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const selectedDate = onboarding.date ? new Date(onboarding.date) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      updateOnboarding({ date: date.toISOString() });
    }
  };

  const handleContinue = () => {
    if (onboarding.date) {
      nextStep();
      router.push(ROUTES.onboarding.location);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.names);
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      title={t('title')}
      highlightedWord="celebrate"
      subtitle={t('subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
    >
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) => date < new Date()}
          className="rounded-xl border border-border bg-card p-4"
          classNames={{
            day_selected: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
            day_today: 'bg-accent text-accent-foreground',
          }}
        />
      </div>
    </OnboardingLayout>
  );
}
