'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OnboardingLayout } from '@/shared/ui/organisms/OnboardingLayout';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';

const COLORS = [
  { name: 'Navy', value: '#1e3a5f' },
  { name: 'Gold', value: '#d4af37' },
  { name: 'Blush', value: '#f4c2c2' },
  { name: 'Sage', value: '#9caf88' },
  { name: 'Merlot', value: '#722f37' },
];

const DRESS_LENGTHS = ['short', 'midi', 'long'] as const;

export default function OnboardingDressCodePage() {
  const t = useTranslations('onboarding.dressCode');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [selectedLength, setSelectedLength] = useState<(typeof DRESS_LENGTHS)[number]>('midi');
  const [activeTab, setActiveTab] = useState('guests');

  const handleContinue = () => {
    updateOnboarding({
      dressCode: {
        guests: {
          palette: [selectedColor],
          length: selectedLength,
        },
      },
    });
    nextStep();
    router.push(ROUTES.onboarding.banking);
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.location);
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={4}
      title={t('title')}
      subtitle={t('subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
      showSkip
      onSkip={() => router.push(ROUTES.onboarding.banking)}
    >
      <div className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="guests">{t('tabs.guests')}</TabsTrigger>
            <TabsTrigger value="bridesmaids">{t('tabs.bridesmaids')}</TabsTrigger>
            <TabsTrigger value="groomsmen">{t('tabs.groomsmen')}</TabsTrigger>
          </TabsList>

          <TabsContent value="guests" className="space-y-6 mt-6">
            {/* Color Palette */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">{t('colorPalette')}</h3>
                <button className="text-sm text-tertiary hover:text-secondary">EDIT</button>
              </div>
              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={cn(
                      'relative w-12 h-12 rounded-full transition-all',
                      selectedColor === color.value && 'ring-2 ring-secondary ring-offset-2 ring-offset-background'
                    )}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  >
                    {selectedColor === color.value && (
                      <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />
                    )}
                  </button>
                ))}
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center text-subtitle hover:border-secondary hover:text-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Dress Length */}
            <div>
              <h3 className="font-medium text-foreground mb-4">{t('dressLength')}</h3>
              <div className="grid grid-cols-3 gap-4">
                {DRESS_LENGTHS.map((length) => (
                  <button
                    key={length}
                    type="button"
                    onClick={() => setSelectedLength(length)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                      selectedLength === length
                        ? 'border-secondary bg-secondary/10'
                        : 'border-border bg-card hover:border-secondary/50'
                    )}
                  >
                    <div className="h-16 w-8 flex items-end justify-center">
                      <div
                        className="w-6 bg-tertiary rounded-t"
                        style={{
                          height: length === 'short' ? '40%' : length === 'midi' ? '60%' : '90%',
                        }}
                      />
                    </div>
                    <span className="text-sm capitalize">{t(`lengths.${length}`)}</span>
                    {selectedLength === length && (
                      <Check className="h-4 w-4 text-secondary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-medium uppercase tracking-wider text-tertiary mb-2">
                {t('preview')}
              </p>
              <h4 className="text-lg font-semibold text-foreground">{t('yourStyle')}</h4>
              <p className="text-subtitle">
                {COLORS.find((c) => c.value === selectedColor)?.name} & {selectedLength.charAt(0).toUpperCase() + selectedLength.slice(1)} Length
              </p>
            </div>
          </TabsContent>

          <TabsContent value="bridesmaids">
            <div className="text-center py-8 text-subtitle">
              Bridesmaids settings coming soon...
            </div>
          </TabsContent>

          <TabsContent value="groomsmen">
            <div className="text-center py-8 text-subtitle">
              Groomsmen settings coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </OnboardingLayout>
  );
}
