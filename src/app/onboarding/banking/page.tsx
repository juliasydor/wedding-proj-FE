'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Building2, Shield, Hash, Lock, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingLayout } from '@/shared/ui/organisms/OnboardingLayout';
import { FormField } from '@/shared/ui/molecules/FormField';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';

export default function OnboardingBankingPage() {
  const t = useTranslations('onboarding.banking');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    routingNumber: '',
    accountNumber: '',
  });

  const handleContinue = () => {
    if (bankInfo.bankName && bankInfo.routingNumber && bankInfo.accountNumber) {
      updateOnboarding({
        bankingInfo: {
          bankName: bankInfo.bankName,
          routingNumber: bankInfo.routingNumber,
          accountNumber: bankInfo.accountNumber,
          accountHolderName: `${onboarding.partner1Name} & ${onboarding.partner2Name}`,
        },
      });
    }
    nextStep();
    router.push(ROUTES.onboarding.template);
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.dressCode);
  };

  const handleSkip = () => {
    nextStep();
    router.push(ROUTES.onboarding.template);
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={4}
      title={t('title')}
      subtitle={t('subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
      continueLabel={t('submit')}
      showSkip
      skipLabel={t('skipForNow')}
      onSkip={handleSkip}
    >
      <div className="space-y-6">
        {/* Security Badge */}
        <div className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-secondary" />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{t('securePayouts')}</h3>
            <p className="text-sm text-subtitle mt-1">{t('securityNote')}</p>
          </div>
        </div>

        {/* Bank Form */}
        <div className="space-y-4">
          <FormField
            label={t('bankName')}
            name="bankName"
            placeholder={t('bankNamePlaceholder')}
            value={bankInfo.bankName}
            onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
            leftIcon={<Building2 className="h-4 w-4" />}
          />

          <FormField
            label={t('routingNumber')}
            name="routingNumber"
            placeholder="0000000000"
            value={bankInfo.routingNumber}
            onChange={(e) => setBankInfo({ ...bankInfo, routingNumber: e.target.value })}
            leftIcon={<Hash className="h-4 w-4" />}
          />

          <FormField
            label={t('accountNumber')}
            name="accountNumber"
            type="password"
            placeholder="••••••••••••"
            value={bankInfo.accountNumber}
            onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
            leftIcon={<Lock className="h-4 w-4" />}
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}
