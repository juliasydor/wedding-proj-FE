'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, MapPin } from 'lucide-react';
import { OnboardingLayout } from '@/shared/ui/organisms/OnboardingLayout';
import { FormField } from '@/shared/ui/molecules/FormField';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';

export default function OnboardingLocationPage() {
  const t = useTranslations('onboarding.location');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const handleContinue = () => {
    if (onboarding.location) {
      nextStep();
      router.push(ROUTES.onboarding.dressCode);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.date);
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      title={t('title')}
      highlightedWord="scene"
      subtitle={t('subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
    >
      <div className="space-y-6">
        <FormField
          name="location"
          placeholder={t('searchPlaceholder')}
          value={onboarding.location}
          onChange={(e) => updateOnboarding({ location: e.target.value })}
          leftIcon={<Search className="h-4 w-4" />}
        />

        {onboarding.location && (
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs font-medium uppercase tracking-wider text-tertiary mb-2">
              {t('selectedLocation')}
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-secondary" />
              <span className="text-foreground">{onboarding.location}</span>
            </div>
          </div>
        )}

        {/* Map placeholder */}
        <div className="aspect-video bg-card rounded-xl border border-border overflow-hidden">
          <div className="h-full w-full bg-gradient-to-br from-quaternary to-primary flex items-center justify-center">
            <MapPin className="h-12 w-12 text-secondary" />
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
