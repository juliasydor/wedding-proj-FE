'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { StepIndicator } from '@/shared/ui/atoms/StepIndicator';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';

const CATEGORIES = ['all', 'modern', 'classic', 'rustic', 'boho'] as const;

const TEMPLATES = [
  {
    id: 'timeless-classic',
    name: 'Timeless Classic',
    category: 'classic',
    imageUrl: '/templates/classic.jpg',
  },
  {
    id: 'boho-garden',
    name: 'The Boho Garden',
    category: 'boho',
    imageUrl: '/templates/boho.jpg',
    isNew: true,
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'modern',
    imageUrl: '/templates/modern.jpg',
  },
  {
    id: 'rustic-charm',
    name: 'Rustic Charm',
    category: 'rustic',
    imageUrl: '/templates/rustic.jpg',
  },
];

export default function OnboardingTemplatePage() {
  const t = useTranslations('onboarding.template');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
    onboarding.templateId
  );

  const filteredTemplates =
    selectedCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleContinue = () => {
    if (selectedTemplate) {
      updateOnboarding({ templateId: selectedTemplate });
      nextStep();
      router.push(ROUTES.onboarding.preview);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.banking);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8">
        <IconButton variant="ghost" onClick={handleBack} aria-label="Go back">
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-subtitle">
            STEP 1 OF 3
          </span>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress */}
      <div className="px-4 md:px-8">
        <StepIndicator currentStep={1} totalSteps={3} />
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto w-full">
        <div className="space-y-2 mb-8">
          <h1 className="text-heading-2">{t('title')}</h1>
          <p className="text-subtitle">{t('subtitle')}</p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                'group relative aspect-[3/4] rounded-3xl overflow-hidden bg-card transition-all text-left',
                selectedTemplate === template.id
                  ? 'ring-2 ring-secondary scale-[1.02]'
                  : 'hover:scale-[1.01]'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-quaternary to-primary" />
              {template.isNew && (
                <Badge className="absolute right-3 top-3 bg-secondary text-secondary-foreground z-10">
                  NEW AI
                </Badge>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="font-semibold text-white text-lg">{template.name}</h3>
                <p className="text-white/70 text-sm capitalize">{template.category}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-background border-t border-border px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="w-full h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium text-lg"
          >
            {t('selectTemplate')} →
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 rounded-full border-border"
            disabled={!selectedTemplate}
          >
            <Eye className="mr-2 h-4 w-4" />
            {t('previewDesign')}
          </Button>
        </div>
      </footer>
    </div>
  );
}
