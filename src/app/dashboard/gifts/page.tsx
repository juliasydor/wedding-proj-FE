'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Search, Gift, Trash2, Edit2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';
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
  const [gifts] = useState<GiftType[]>(MOCK_GIFTS);

  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch = gift.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || gift.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalValue = gifts.reduce((sum, gift) => sum + gift.price, 0);
  const totalContributed = gifts.reduce((sum, gift) => sum + (gift.contributedAmount || 0), 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-2 mb-2">Lista de Presentes</h1>
          <p className="text-subtitle">Gerencie os presentes que você deseja receber</p>
        </div>
        <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Presente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="h-5 w-5 text-secondary" />
            <span className="text-sm text-subtitle">Total de Presentes</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{gifts.length}</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-tertiary" />
            <span className="text-sm text-subtitle">Valor Total</span>
          </div>
          <p className="text-3xl font-bold text-foreground">R$ {totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-secondary" />
            <span className="text-sm text-subtitle">Arrecadado</span>
          </div>
          <p className="text-3xl font-bold text-secondary">R$ {totalContributed.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-subtitle" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar presentes..."
            className="pl-10 bg-input-bg border-border rounded-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
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
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGifts.map((gift) => {
          const progress = gift.contributedAmount
            ? Math.round((gift.contributedAmount / gift.price) * 100)
            : 0;
          const isComplete = progress >= 100;

          return (
            <div
              key={gift.id}
              className={cn(
                'bg-card rounded-2xl border overflow-hidden transition-all',
                isComplete ? 'border-secondary/50' : 'border-border/50'
              )}
            >
              <div className="relative h-40">
                <img
                  src={gift.imageUrl}
                  alt={gift.name}
                  className="w-full h-full object-cover"
                />
                {isComplete && (
                  <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
                    <span className="text-white font-semibold">Completo!</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{gift.name}</h3>
                <p className="text-sm text-subtitle mb-3 line-clamp-2">{gift.description}</p>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-secondary">
                    R$ {gift.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-subtitle">{progress}%</span>
                </div>

                <div className="h-2 bg-quaternary rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-secondary rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-full border-border"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
