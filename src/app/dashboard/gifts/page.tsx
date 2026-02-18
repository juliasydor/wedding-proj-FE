'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Plus, Search, Gift, Trash2, Edit2, ChevronDown, Wallet, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/config';
import { toast } from 'sonner';
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
    contributedAmount: 0,
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
    isGifted: true,
    giftedBy: 'Maria Silva',
    giftedAt: '2024-02-15',
    contributedAmount: 800,
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
    isGifted: true,
    giftedBy: 'João Santos',
    giftedAt: '2024-02-10',
    contributedAmount: 450,
    contributors: [],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'honeymoon', label: 'Lua de Mel' },
  { id: 'kitchen', label: 'Cozinha' },
  { id: 'bedroom', label: 'Quarto' },
  { id: 'dining', label: 'Jantar' },
];

export default function GiftsPage() {
  const t = useTranslations('dashboard');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [gifts, setGifts] = useState<GiftType[]>(MOCK_GIFTS);
  const [showCategories, setShowCategories] = useState(false);

  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch = gift.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || gift.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteGift = (giftId: string) => {
    setGifts(gifts.filter((g) => g.id !== giftId));
    toast.success('Presente removido com sucesso!');
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-heading-2 mb-1 md:mb-2">Lista de Presentes</h1>
          <p className="text-subtitle text-sm md:text-base">Gerencie os presentes que você deseja receber</p>
        </div>
        <Button asChild className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm" size="sm">
          <Link href={ROUTES.addGift}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Adicionar Presente</span>
            <span className="sm:hidden">Adicionar</span>
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Gift className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
            <span className="text-xs md:text-sm text-subtitle">Total de Presentes</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{gifts.length}</p>
        </div>
        <Link href="/dashboard/gifts/wallet">
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50 hover:border-secondary/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <Wallet className="h-4 w-4 md:h-5 md:w-5 text-tertiary" />
              <span className="text-xs md:text-sm text-subtitle">Minha Carteira</span>
            </div>
            <p className="text-sm md:text-base font-medium text-secondary">Ver recebidos →</p>
          </div>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-4 md:mb-6">
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
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-quaternary text-foreground/70 hover:bg-quaternary/80'
              )}
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
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-quaternary text-foreground/70'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredGifts.map((gift) => (
          <div
            key={gift.id}
            className={cn(
              'bg-card rounded-xl md:rounded-2xl border overflow-hidden transition-all',
              gift.isGifted ? 'border-secondary/50' : 'border-border/50'
            )}
          >
            <div className="relative h-32 md:h-40">
              <img
                src={gift.imageUrl}
                alt={gift.name}
                className="w-full h-full object-cover"
              />
              {gift.isGifted && (
                <div className="absolute inset-0 bg-secondary/80 flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-white mb-1" />
                  <span className="text-white font-semibold text-sm md:text-base">Já presenteado</span>
                  {gift.giftedBy && (
                    <span className="text-white/80 text-xs mt-0.5">por {gift.giftedBy}</span>
                  )}
                </div>
              )}
            </div>
            <div className="p-3 md:p-4">
              <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">{gift.name}</h3>
              <p className="text-xs md:text-sm text-subtitle mb-2 md:mb-3 line-clamp-2">{gift.description}</p>

              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-base md:text-lg font-bold text-secondary">
                  R$ {gift.price.toLocaleString()}
                </span>
                {gift.isGifted ? (
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                    Recebido
                  </span>
                ) : (
                  <span className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                    Disponível
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex-1 rounded-full border-border text-xs md:text-sm"
                >
                  <Link href={`/dashboard/gifts/edit/${gift.id}`}>
                    <Edit2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Editar
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  onClick={() => handleDeleteGift(gift.id)}
                >
                  <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGifts.length === 0 && (
        <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-8 md:p-12 text-center">
          <Gift className="h-10 w-10 md:h-12 md:w-12 text-subtitle mx-auto mb-3 md:mb-4" />
          <p className="text-foreground font-medium mb-1 md:mb-2 text-sm md:text-base">Nenhum presente encontrado</p>
          <p className="text-subtitle text-xs md:text-sm">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
}
