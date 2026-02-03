'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { OnboardingLayout } from '@/shared/ui/organisms/OnboardingLayout';
import { FormField } from '@/shared/ui/molecules/FormField';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';

export default function OnboardingNamesPage() {
  const t = useTranslations('onboarding.names');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep } = useWeddingStore();

  const handleContinue = () => {
    if (onboarding.partner1Name && onboarding.partner2Name) {
      nextStep();
      router.push(ROUTES.onboarding.date);
    }
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={4}
      title={t('title')}
      subtitle={t('subtitle')}
      onContinue={handleContinue}
    >
      <div className="space-y-6">
        <FormField
          label={t('partner1')}
          name="partner1"
          placeholder={t('partner1Placeholder')}
          value={onboarding.partner1Name}
          onChange={(e) => updateOnboarding({ partner1Name: e.target.value })}
        />

        <div className="text-center text-2xl text-subtitle">&</div>

        <FormField
          label={t('partner2')}
          name="partner2"
          placeholder={t('partner2Placeholder')}
          value={onboarding.partner2Name}
          onChange={(e) => updateOnboarding({ partner2Name: e.target.value })}
        />
      </div>
    </OnboardingLayout>
  );
}
