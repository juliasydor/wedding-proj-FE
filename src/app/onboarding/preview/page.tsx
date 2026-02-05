'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import {
  ModernEleganceTemplate,
  ClassicRomanceTemplate,
  RusticGardenTemplate,
  BohemianDreamTemplate,
  TEMPLATE_CONFIG,
  type TemplateId,
} from '@/shared/ui/templates';

function getTemplateComponent(templateId: TemplateId | string | null) {
  switch (templateId) {
    case 'modern-elegance':
      return ModernEleganceTemplate;
    case 'classic-romance':
      return ClassicRomanceTemplate;
    case 'rustic-garden':
      return RusticGardenTemplate;
    case 'bohemian-dream':
      return BohemianDreamTemplate;
    default:
      return ModernEleganceTemplate;
  }
}

export default function OnboardingPreviewPage() {
  const t = useTranslations('onboarding.preview');
  const router = useRouter();
  const { onboarding, nextStep, prevStep } = useWeddingStore();

  const handlePublish = () => {
    nextStep();
    router.push(ROUTES.onboarding.qrCode);
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.template);
  };

  const templateId = onboarding.templateId as TemplateId | null;
  const templateConfig = templateId ? TEMPLATE_CONFIG[templateId] : null;

  // Use onboarding colors if set, otherwise fall back to template defaults
  const primaryColor = onboarding.primaryColor || templateConfig?.defaultColors.primary || '#ea2e5b';
  const secondaryColor = onboarding.secondaryColor || templateConfig?.defaultColors.secondary || '#F1557C';

  const TemplateComponent = getTemplateComponent(templateId);

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

      {/* Template Preview */}
      <div className="min-h-screen">
        <TemplateComponent
          partner1Name={onboarding.partner1Name || 'Partner 1'}
          partner2Name={onboarding.partner2Name || 'Partner 2'}
          date={onboarding.date}
          location={onboarding.location || 'Wedding Venue'}
          heroImage={onboarding.heroImage}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>

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
