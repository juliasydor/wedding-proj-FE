'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, X, Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { StepIndicator } from '@/shared/ui/atoms/StepIndicator';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import {
  ModernEleganceTemplate,
  ClassicRomanceTemplate,
  RusticGardenTemplate,
  BohemianDreamTemplate,
  TEMPLATE_CONFIG,
  type TemplateId,
} from '@/shared/ui/templates';

const CATEGORIES = ['all', 'modern', 'classic', 'rustic', 'boho'] as const;

const TEMPLATES = [
  {
    id: 'modern-elegance' as TemplateId,
    name: 'Modern Elegance',
    category: 'modern',
    preview: TEMPLATE_CONFIG['modern-elegance'].preview,
    isNew: true,
  },
  {
    id: 'classic-romance' as TemplateId,
    name: 'Classic Romance',
    category: 'classic',
    preview: TEMPLATE_CONFIG['classic-romance'].preview,
  },
  {
    id: 'rustic-garden' as TemplateId,
    name: 'Rustic Garden',
    category: 'rustic',
    preview: TEMPLATE_CONFIG['rustic-garden'].preview,
  },
  {
    id: 'bohemian-dream' as TemplateId,
    name: 'Bohemian Dream',
    category: 'boho',
    preview: TEMPLATE_CONFIG['bohemian-dream'].preview,
  },
];

const COLOR_PALETTES = [
  {
    id: 'rose',
    name: 'Rose',
    primary: '#ea2e5b',
    secondary: '#F1557C',
  },
  {
    id: 'gold',
    name: 'Gold',
    primary: '#c9a959',
    secondary: '#8b6914',
  },
  {
    id: 'sage',
    name: 'Sage',
    primary: '#5d7052',
    secondary: '#8fa67a',
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    primary: '#d4a574',
    secondary: '#c4956a',
  },
  {
    id: 'navy',
    name: 'Navy',
    primary: '#2c3e50',
    secondary: '#34495e',
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    primary: '#722f37',
    secondary: '#8b3a42',
  },
];

function getTemplateComponent(templateId: TemplateId) {
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

export default function OnboardingTemplatePage() {
  const t = useTranslations('onboarding.template');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(
    (onboarding.templateId as TemplateId) || null
  );
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState<string>(
    COLOR_PALETTES.find(
      (p) => p.primary === onboarding.primaryColor
    )?.id || 'rose'
  );

  const currentPalette = COLOR_PALETTES.find((p) => p.id === selectedPalette) || COLOR_PALETTES[0];

  const filteredTemplates =
    selectedCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleSelectTemplate = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
    // Set default colors from template config
    const templateConfig = TEMPLATE_CONFIG[templateId];
    const matchingPalette = COLOR_PALETTES.find(
      (p) => p.primary === templateConfig.defaultColors.primary
    );
    if (matchingPalette) {
      setSelectedPalette(matchingPalette.id);
    }
    setShowPreview(true);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      updateOnboarding({
        templateId: selectedTemplate,
        primaryColor: currentPalette.primary,
        secondaryColor: currentPalette.secondary,
      });
      nextStep();
      router.push(ROUTES.onboarding.preview);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.banking);
  };

  const TemplateComponent = selectedTemplate ? getTemplateComponent(selectedTemplate) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8">
        <IconButton variant="ghost" onClick={handleBack} aria-label="Go back">
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-subtitle">
            STEP 5 OF 8
          </span>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress */}
      <div className="px-4 md:px-8">
        <StepIndicator currentStep={5} totalSteps={8} />
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12 max-w-6xl mx-auto w-full">
        <div className="space-y-2 mb-8">
          <h1 className="text-heading-2">{t('title')}</h1>
          <p className="text-subtitle">{t('subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Template Selection */}
          <div>
            {/* Category Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    'rounded-full capitalize',
                    selectedCategory === category
                      ? 'bg-secondary text-secondary-foreground'
                      : 'border-border hover:bg-card'
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {t(`categories.${category}`)}
                </Button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template.id)}
                  className={cn(
                    'group relative aspect-[3/4] rounded-2xl overflow-hidden bg-card transition-all text-left',
                    selectedTemplate === template.id
                      ? 'ring-2 ring-secondary scale-[1.02]'
                      : 'hover:scale-[1.01]'
                  )}
                >
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {template.isNew && (
                    <Badge className="absolute right-2 top-2 bg-secondary text-secondary-foreground z-10 text-xs">
                      NEW
                    </Badge>
                  )}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-secondary flex items-center justify-center z-10">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <h3 className="font-semibold text-white text-sm">{template.name}</h3>
                    <p className="text-white/70 text-xs capitalize">{template.category}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Color Palette Selection */}
            {selectedTemplate && (
              <div className="bg-card rounded-2xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-secondary" />
                  <h3 className="font-medium">{t('colorPalette')}</h3>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => setSelectedPalette(palette.id)}
                      className={cn(
                        'relative aspect-square rounded-xl overflow-hidden transition-all',
                        selectedPalette === palette.id
                          ? 'ring-2 ring-secondary scale-105'
                          : 'hover:scale-105'
                      )}
                      title={palette.name}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${palette.primary} 50%, ${palette.secondary} 50%)`,
                        }}
                      />
                      {selectedPalette === palette.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Live Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-medium">{t('livePreview')}</span>
                  {selectedTemplate && (
                    <span className="text-xs text-subtitle">
                      {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
                    </span>
                  )}
                </div>
                <div className="aspect-[9/16] max-h-[600px] overflow-y-auto">
                  {selectedTemplate && TemplateComponent ? (
                    <TemplateComponent
                      partner1Name={onboarding.partner1Name || 'Partner 1'}
                      partner2Name={onboarding.partner2Name || 'Partner 2'}
                      date={onboarding.date}
                      location={onboarding.location || 'Wedding Venue'}
                      heroImage={onboarding.heroImage}
                      primaryColor={currentPalette.primary}
                      secondaryColor={currentPalette.secondary}
                      isPreview
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-subtitle">
                      <p className="text-center px-8">
                        {t('selectTemplatePreview')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Preview Modal */}
      {showPreview && selectedTemplate && TemplateComponent && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowPreview(false)} />
          <div className="absolute inset-4 bg-card rounded-2xl overflow-hidden flex flex-col">
            <div className="p-3 border-b border-border flex items-center justify-between shrink-0">
              <span className="text-sm font-medium">{t('livePreview')}</span>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TemplateComponent
                partner1Name={onboarding.partner1Name || 'Partner 1'}
                partner2Name={onboarding.partner2Name || 'Partner 2'}
                date={onboarding.date}
                location={onboarding.location || 'Wedding Venue'}
                heroImage={onboarding.heroImage}
                primaryColor={currentPalette.primary}
                secondaryColor={currentPalette.secondary}
                isPreview
              />
            </div>
            {/* Color Palette in Modal */}
            <div className="p-3 border-t border-border shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-4 w-4 text-secondary" />
                <span className="text-xs font-medium">{t('colorPalette')}</span>
              </div>
              <div className="flex gap-2">
                {COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => setSelectedPalette(palette.id)}
                    className={cn(
                      'relative w-8 h-8 rounded-lg overflow-hidden transition-all',
                      selectedPalette === palette.id
                        ? 'ring-2 ring-secondary scale-110'
                        : ''
                    )}
                    title={palette.name}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${palette.primary} 50%, ${palette.secondary} 50%)`,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="sticky bottom-0 bg-background border-t border-border px-4 py-4 md:px-8">
        <div className="max-w-6xl mx-auto flex gap-3">
          <Button
            variant="outline"
            className="lg:hidden h-14 rounded-full border-border px-6"
            disabled={!selectedTemplate}
            onClick={() => setShowPreview(true)}
          >
            {t('previewDesign')}
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="flex-1 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium text-lg"
          >
            {t('selectTemplate')} →
          </Button>
        </div>
      </footer>
    </div>
  );
}
