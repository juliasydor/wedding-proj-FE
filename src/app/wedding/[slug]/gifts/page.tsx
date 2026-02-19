'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Gift, Search, ChevronDown, DollarSign } from 'lucide-react';
import { useThemeIcon } from '@/shared/hooks/useThemeIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { useWeddingStore } from '@/entities/wedding';
import type { Gift as GiftType } from '@/shared/types';

const MOCK_GIFTS: GiftType[] = [
  {
    id: '1',
    weddingId: '1',
    name: 'Fundo Lua de Mel',
    description: 'Ajude-nos a ter uma lua de mel inesquecível!',
    price: 500,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
    category: 'honeymoon',
    isSelected: true,
    isGifted: false,
    contributedAmount: 250,
    contributors: [],
  },
  {
    id: '2',
    weddingId: '1',
    name: 'Cafeteira Expresso',
    description: 'Para começar nossas manhãs juntos',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop',
    category: 'kitchen',
    isSelected: true,
    isGifted: false,
    contributedAmount: 400,
    contributors: [],
  },
  {
    id: '3',
    weddingId: '1',
    name: 'Jogo de Panelas',
    description: 'Para cozinhar receitas de família',
    price: 600,
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
    category: 'kitchen',
    isSelected: true,
    isGifted: false,
    contributedAmount: 0,
    contributors: [],
  },
  {
    id: '4',
    weddingId: '1',
    name: 'Jogo de Cama',
    description: 'Lençóis de algodão egípcio',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop',
    category: 'bedroom',
    isSelected: true,
    isGifted: false,
    contributedAmount: 450,
    contributors: [],
  },
  {
    id: '5',
    weddingId: '1',
    name: 'Aspirador Robô',
    description: 'Para facilitar a limpeza do nosso lar',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    category: 'living',
    isSelected: true,
    isGifted: false,
    contributedAmount: 600,
    contributors: [],
  },
  {
    id: '6',
    weddingId: '1',
    name: 'Jogo de Toalhas',
    description: 'Toalhas macias de algodão',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=300&h=200&fit=crop',
    category: 'bathroom',
    isSelected: true,
    isGifted: false,
    contributedAmount: 200,
    contributors: [],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'honeymoon', label: 'Lua de Mel' },
  { id: 'kitchen', label: 'Cozinha' },
  { id: 'bedroom', label: 'Quarto' },
  { id: 'bathroom', label: 'Banheiro' },
  { id: 'living', label: 'Sala' },
];

export default function GuestGiftsPage() {
  const params = useParams();
  const router = useRouter();
  const IconImage = useThemeIcon();
  const slug = params?.slug as string || '';
  const { onboarding } = useWeddingStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);
  const [gifts] = useState<GiftType[]>(MOCK_GIFTS);

  // Use store colors or defaults
  const primaryColor = onboarding.primaryColor || '#ea2e5b';
  const secondaryColor = onboarding.secondaryColor || '#F1557C';

  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch = gift.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || gift.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSelectGift = (giftId: string) => {
    router.push(`/wedding/${slug}/checkout?gift=${giftId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative py-12 md:py-20 px-4"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-4">
            <Gift className="h-4 w-4" style={{ color: primaryColor }} />
            <span className="text-sm font-medium" style={{ color: primaryColor }}>
              Lista de Presentes
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            Presentes para {onboarding.partner1Name || 'Noivo'} & {onboarding.partner2Name || 'Noiva'}
          </h1>
          <p className="text-subtitle text-sm md:text-base max-w-2xl mx-auto">
            Escolha um presente especial para nos ajudar a começar nossa nova vida juntos.
            Cada contribuição é muito bem-vinda e apreciada!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Search and Filters */}
        <div className="flex flex-col gap-3 mb-6 md:mb-8">
          <div className="flex gap-2 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-subtitle" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar presentes..."
                className="pl-9 md:pl-10 bg-input-bg border-border rounded-full text-sm"
              />
            </div>
            {/* Mobile category toggle */}
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="md:hidden flex items-center gap-1 px-3 py-2 rounded-full bg-quaternary text-foreground/70 text-sm whitespace-nowrap"
            >
              Categorias
              <ChevronDown className={cn('h-4 w-4 transition-transform', showCategories && 'rotate-180')} />
            </button>
          </div>

          {/* Desktop categories */}
          <div className="hidden md:flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  category === cat.id
                    ? 'text-white'
                    : 'bg-quaternary text-foreground/70 hover:bg-quaternary/80'
                )}
                style={category === cat.id ? { backgroundColor: primaryColor } : {}}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile categories */}
          {showCategories && (
            <div className="md:hidden flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    setShowCategories(false);
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                    category === cat.id
                      ? 'text-white'
                      : 'bg-quaternary text-foreground/70'
                  )}
                  style={category === cat.id ? { backgroundColor: primaryColor } : {}}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredGifts.map((gift) => {
            const progress = gift.contributedAmount
              ? Math.round((gift.contributedAmount / gift.price) * 100)
              : 0;
            const isComplete = progress >= 100;
            const remaining = gift.price - (gift.contributedAmount || 0);

            return (
              <div
                key={gift.id}
                className={cn(
                  'bg-card rounded-xl md:rounded-2xl border overflow-hidden transition-all hover:shadow-lg',
                  isComplete ? 'opacity-75' : 'border-border/50'
                )}
                style={isComplete ? { borderColor: `${primaryColor}50` } : {}}
              >
                <div className="relative h-40 md:h-48">
                  <img
                    src={gift.imageUrl}
                    alt={gift.name}
                    className="w-full h-full object-cover"
                  />
                  {isComplete && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}CC` }}
                    >
                      <div className="text-center text-white">
                        <Image src={IconImage} alt="Véu & Gravata" width={140} height={93} className="mx-auto mb-2 w-auto h-auto object-contain" />
                        <span className="font-semibold text-sm md:text-base">Presente Completo!</span>
                      </div>
                    </div>
                  )}
                  {!isComplete && progress > 0 && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-xs">
                      {progress}% contribuído
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-semibold text-foreground mb-1 text-base md:text-lg">{gift.name}</h3>
                  <p className="text-xs md:text-sm text-subtitle mb-3 line-clamp-2">{gift.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg md:text-xl font-bold" style={{ color: primaryColor }}>
                      R$ {gift.price.toLocaleString()}
                    </span>
                    {!isComplete && remaining > 0 && remaining < gift.price && (
                      <span className="text-xs text-subtitle">
                        Falta R$ {remaining.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-quaternary rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: primaryColor
                      }}
                    />
                  </div>

                  <Button
                    onClick={() => handleSelectGift(gift.id)}
                    disabled={isComplete}
                    className="w-full rounded-full text-white text-sm"
                    style={{
                      backgroundColor: isComplete ? '#888' : primaryColor,
                    }}
                  >
                    {isComplete ? (
                      'Presente Completo'
                    ) : (
                      <>
                        <Gift className="mr-2 h-4 w-4" />
                        Presentear
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGifts.length === 0 && (
          <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-8 md:p-12 text-center">
            <Gift className="h-10 w-10 md:h-12 md:w-12 text-subtitle mx-auto mb-3 md:mb-4" />
            <p className="text-foreground font-medium mb-1 md:mb-2 text-sm md:text-base">
              Nenhum presente encontrado
            </p>
            <p className="text-subtitle text-xs md:text-sm">Tente ajustar os filtros de busca</p>
          </div>
        )}

        {/* Contribution Info */}
        <div
          className="mt-8 md:mt-12 rounded-2xl p-6 md:p-8 text-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <DollarSign className="h-8 w-8 mx-auto mb-3" style={{ color: primaryColor }} />
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Como funciona?
          </h3>
          <p className="text-subtitle text-sm md:text-base max-w-2xl mx-auto">
            Você pode contribuir com o valor total do presente ou uma parte dele.
            Todos os valores são direcionados diretamente para o casal,
            de forma segura e transparente.
          </p>
        </div>
      </div>
    </div>
  );
}
