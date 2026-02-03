'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Share2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { WeddingHero } from '@/shared/ui/organisms/WeddingHero';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';

export default function OnboardingPreviewPage() {
  const t = useTranslations('onboarding.preview');
  const tCountdown = useTranslations('countdown');
  const router = useRouter();
  const { onboarding, nextStep, prevStep } = useWeddingStore();

  const handlePublish = () => {
    nextStep();
    router.push(ROUTES.onboarding.qrCode);
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.giftList);
  };

  const weddingDate = onboarding.date ? new Date(onboarding.date) : new Date();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-8 bg-transparent">
        <IconButton
          variant="ghost"
          onClick={handleBack}
          className="bg-card/50 backdrop-blur-sm"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <span className="text-sm font-medium text-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full">
          {t('title')}
        </span>
        <IconButton
          variant="ghost"
          className="bg-card/50 backdrop-blur-sm"
          aria-label="Share"
        >
          <Share2 className="h-5 w-5" />
        </IconButton>
      </header>

      {/* Wedding Preview */}
      <WeddingHero
        partner1Name={onboarding.partner1Name || 'Sarah'}
        partner2Name={onboarding.partner2Name || 'James'}
        date={weddingDate}
        location={onboarding.location || 'Napa Valley, CA'}
        isPreview
        countdownTitle={t('countdownTitle')}
        countdownLabels={{
          days: tCountdown('days'),
          hours: tCountdown('hours'),
          minutes: tCountdown('minutes'),
          seconds: tCountdown('seconds'),
        }}
        onViewRegistry={() => {}}
        onPublish={handlePublish}
      />

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent px-4 py-8 md:px-8">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <span className="text-subtitle">{t('readyToGoLive')}</span>
          <Button
            onClick={handlePublish}
            className="flex-1 h-12 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            {t('publishSite')} →
          </Button>
        </div>
      </div>
    </div>
  );
}
