'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, Plus, Check, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GiftCard } from '@/shared/ui/molecules/GiftCard';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { useGiftStore } from '@/entities/gift';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import { toast } from 'sonner';

const CATEGORIES = ['all', 'honeymoon', 'kitchen', 'dining', 'bedroom'] as const;

const POPULAR_GIFTS = [
  {
    id: '1',
    name: 'Honeymoon Fund',
    price: 500,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
    category: 'honeymoon' as const,
  },
  {
    id: '2',
    name: 'KitchenAid Mixer',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&h=400&fit=crop',
    category: 'kitchen' as const,
  },
  {
    id: '3',
    name: 'Crystal Stemware',
    price: 80,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop',
    category: 'dining' as const,
  },
  {
    id: '4',
    name: 'Smart Vacuum',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop',
    category: 'kitchen' as const,
  },
  {
    id: '5',
    name: 'Gold Cutlery Set',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&h=400&fit=crop',
    category: 'dining' as const,
  },
  {
    id: '6',
    name: 'Ceramic Dinner Set',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1603199506016-b9a694f3c8d9?w=400&h=400&fit=crop',
    category: 'dining' as const,
  },
  {
    id: '7',
    name: 'Luxury Bedding Set',
    price: 250,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop',
    category: 'bedroom' as const,
  },
  {
    id: '8',
    name: 'Spa Day Experience',
    price: 300,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop',
    category: 'honeymoon' as const,
  },
];

export default function OnboardingGiftListPage() {
  const t = useTranslations('onboarding.giftList');
  const router = useRouter();
  const { selectedGifts, toggleGiftSelection } = useGiftStore();

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

  const handleDone = () => {
    toast.success('Gift list saved!');
    router.push(ROUTES.dashboard);
  };

  const handleBack = () => {
    router.push(ROUTES.onboarding.qrCode);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8 border-b border-border">
        <div className="flex items-center gap-3">
          <IconButton variant="ghost" onClick={handleBack} aria-label="Go back">
            <ChevronLeft className="h-5 w-5" />
          </IconButton>
          <h1 className="text-xl font-semibold text-foreground">{t('title')}</h1>
        </div>
        <Button
          variant="ghost"
          className="text-secondary font-medium"
          onClick={handleDone}
        >
          Done
        </Button>
      </header>

      {/* Search */}
      <div className="px-4 py-4 md:px-8">
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
      <main className="flex-1 px-4 pb-6 md:px-8 overflow-y-auto">
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
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
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
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Check className="h-4 w-4 text-secondary-foreground" />
              </div>
              <span className="text-foreground font-medium">
                {selectedGifts.length} {selectedGifts.length === 1 ? 'gift' : 'gifts'} selected
              </span>
            </div>
            <Button
              onClick={handleDone}
              className="bg-secondary hover:bg-secondary/90 rounded-full"
            >
              Save & Continue →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
