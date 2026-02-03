'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GiftCard } from '@/shared/ui/molecules/GiftCard';
import { useGiftStore } from '@/entities/gift';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';

const CATEGORIES = ['all', 'honeymoon', 'kitchen', 'dining', 'bedroom'] as const;

const POPULAR_GIFTS = [
  {
    id: '1',
    name: 'Honeymoon Fund',
    price: 500,
    imageUrl: '/gifts/honeymoon.jpg',
    category: 'honeymoon' as const,
  },
  {
    id: '2',
    name: 'KitchenAid Mixer',
    price: 350,
    imageUrl: '/gifts/mixer.jpg',
    category: 'kitchen' as const,
  },
  {
    id: '3',
    name: 'Crystal Stemware',
    price: 80,
    imageUrl: '/gifts/stemware.jpg',
    category: 'dining' as const,
  },
  {
    id: '4',
    name: 'Smart Vacuum',
    price: 200,
    imageUrl: '/gifts/vacuum.jpg',
    category: 'kitchen' as const,
  },
  {
    id: '5',
    name: 'Gold Cutlery Set',
    price: 120,
    imageUrl: '/gifts/cutlery.jpg',
    category: 'dining' as const,
  },
  {
    id: '6',
    name: 'Ceramic Dinner Set',
    price: 180,
    imageUrl: '/gifts/dinner-set.jpg',
    category: 'dining' as const,
  },
];

export default function OnboardingGiftListPage() {
  const t = useTranslations('onboarding.giftList');
  const router = useRouter();
  const { nextStep, prevStep } = useWeddingStore();
  const { selectedGifts, toggleGiftSelection, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useGiftStore();

  const [localCategory, setLocalCategory] = useState<(typeof CATEGORIES)[number]>('all');
  const [localSearch, setLocalSearch] = useState('');

  const filteredGifts = POPULAR_GIFTS.filter((gift) => {
    const matchesCategory = localCategory === 'all' || gift.category === localCategory;
    const matchesSearch = !localSearch || gift.name.toLowerCase().includes(localSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isGiftSelected = (giftId: string) => selectedGifts.some((g) => g.id === giftId);

  const handleToggleGift = (gift: typeof POPULAR_GIFTS[0]) => {
    toggleGiftSelection({
      ...gift,
      weddingId: '',
      isSelected: true,
      contributedAmount: 0,
      contributors: [],
    });
  };

  const handleContinue = () => {
    nextStep();
    router.push(ROUTES.onboarding.preview);
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.template);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8">
        <h1 className="text-xl font-semibold text-foreground">{t('title')}</h1>
        <Button
          variant="ghost"
          className="text-secondary"
          onClick={handleContinue}
        >
          Done
        </Button>
      </header>

      {/* Search */}
      <div className="px-4 md:px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtitle" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10 bg-card border-0"
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-6 md:px-8 overflow-y-auto">
        {/* Create Custom Gift */}
        <div className="bg-gradient-to-r from-quaternary to-primary rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{t('createCustom.title')}</h3>
            <p className="text-sm text-subtitle">{t('createCustom.subtitle')}</p>
          </div>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90 rounded-full">
            <Plus className="h-4 w-4 mr-1" />
            {t('createCustom.button')}
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="font-semibold text-foreground mb-4">{t('popular')}</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={localCategory === category ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'rounded-full capitalize whitespace-nowrap',
                  localCategory === category
                    ? 'bg-secondary text-secondary-foreground'
                    : 'border-border hover:bg-card'
                )}
                onClick={() => setLocalCategory(category)}
              >
                {t(`categories.${category}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Gift Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              name={gift.name}
              price={gift.price}
              imageUrl={gift.imageUrl}
              isSelected={isGiftSelected(gift.id)}
              onToggle={() => handleToggleGift(gift)}
            />
          ))}
        </div>
      </main>

      {/* Selected Count */}
      {selectedGifts.length > 0 && (
        <div className="sticky bottom-0 bg-card border-t border-border px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <span className="text-foreground">
              {selectedGifts.length} gifts selected
            </span>
            <Button
              onClick={handleContinue}
              className="bg-secondary hover:bg-secondary/90 rounded-full"
            >
              Continue →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
