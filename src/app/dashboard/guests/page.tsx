'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  Mail,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/shared/lib/utils';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  dietaryRestrictions?: string;
  invitedAt: string;
}

const MOCK_GUESTS: Guest[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.com', rsvpStatus: 'confirmed', plusOne: true, invitedAt: '2024-01-15' },
  { id: '2', name: 'João Santos', email: 'joao@email.com', rsvpStatus: 'confirmed', plusOne: false, invitedAt: '2024-01-15' },
  { id: '3', name: 'Ana Costa', email: 'ana@email.com', rsvpStatus: 'pending', plusOne: true, invitedAt: '2024-01-16' },
  { id: '4', name: 'Pedro Oliveira', email: 'pedro@email.com', rsvpStatus: 'declined', plusOne: false, invitedAt: '2024-01-16' },
  { id: '5', name: 'Carla Mendes', email: 'carla@email.com', rsvpStatus: 'confirmed', plusOne: true, invitedAt: '2024-01-17' },
  { id: '6', name: 'Lucas Ferreira', email: 'lucas@email.com', rsvpStatus: 'pending', plusOne: false, invitedAt: '2024-01-18' },
  { id: '7', name: 'Fernanda Lima', email: 'fernanda@email.com', rsvpStatus: 'confirmed', plusOne: false, invitedAt: '2024-01-18' },
  { id: '8', name: 'Ricardo Alves', email: 'ricardo@email.com', rsvpStatus: 'pending', plusOne: true, invitedAt: '2024-01-19' },
];

const FILTERS = [
  { id: 'all', label: 'Todos', icon: Users },
  { id: 'confirmed', label: 'Confirmados', icon: UserCheck },
  { id: 'pending', label: 'Pendentes', icon: Clock },
  { id: 'declined', label: 'Recusados', icon: UserX },
];

export default function GuestsPage() {
  const t = useTranslations('dashboard.guests');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredGuests = MOCK_GUESTS.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || guest.rsvpStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: MOCK_GUESTS.length,
    confirmed: MOCK_GUESTS.filter((g) => g.rsvpStatus === 'confirmed').length,
    pending: MOCK_GUESTS.filter((g) => g.rsvpStatus === 'pending').length,
    declined: MOCK_GUESTS.filter((g) => g.rsvpStatus === 'declined').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'declined':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'declined':
        return 'Recusado';
      default:
        return status;
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-heading-2 mb-1 md:mb-2">{t('title')}</h1>
          <p className="text-subtitle text-sm md:text-base">{t('subtitle')}</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button variant="outline" className="rounded-full border-border text-sm" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Enviar Convites</span>
            <span className="sm:hidden">Convites</span>
          </Button>
          <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{t('addGuest')}</span>
            <span className="sm:hidden">Adicionar</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-5 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Users className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
            <span className="text-xs md:text-sm text-subtitle">{t('total')}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-5 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <UserCheck className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
            <span className="text-xs md:text-sm text-subtitle">{t('confirmed')}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-green-500">{stats.confirmed}</p>
        </div>
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-5 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
            <span className="text-xs md:text-sm text-subtitle">{t('pending')}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-5 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <UserX className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
            <span className="text-xs md:text-sm text-subtitle">{t('declined')}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-red-500">{stats.declined}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-4 md:mb-6">
        <div className="flex gap-2 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-subtitle" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar convidados..."
              className="pl-9 md:pl-10 bg-input-bg border-border rounded-full text-sm"
            />
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-1 px-3 py-2 rounded-full bg-quaternary text-foreground/70 text-sm"
          >
            Filtrar
            <ChevronDown className={cn('h-4 w-4 transition-transform', showFilters && 'rotate-180')} />
          </button>
        </div>

        {/* Desktop filters */}
        <div className="hidden md:flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                filter === f.id
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-quaternary text-foreground/70 hover:bg-quaternary/80'
              )}
            >
              <f.icon className="h-4 w-4" />
              {f.label}
            </button>
          ))}
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="md:hidden flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  setShowFilters(false);
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  filter === f.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-quaternary text-foreground/70'
                )}
              >
                <f.icon className="h-3.5 w-3.5" />
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-card rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 text-sm font-medium text-subtitle">Nome</th>
              <th className="text-left p-4 text-sm font-medium text-subtitle">Email</th>
              <th className="text-left p-4 text-sm font-medium text-subtitle">Status</th>
              <th className="text-left p-4 text-sm font-medium text-subtitle">Acompanhante</th>
              <th className="text-right p-4 text-sm font-medium text-subtitle">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.map((guest) => (
              <tr key={guest.id} className="border-b border-border/30 hover:bg-quaternary/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                        {guest.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{guest.name}</span>
                  </div>
                </td>
                <td className="p-4 text-subtitle">{guest.email}</td>
                <td className="p-4">
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getStatusColor(guest.rsvpStatus)
                    )}
                  >
                    {getStatusLabel(guest.rsvpStatus)}
                  </span>
                </td>
                <td className="p-4 text-subtitle">
                  {guest.plusOne ? 'Sim (+1)' : 'Não'}
                </td>
                <td className="p-4 text-right">
                  <Button size="sm" variant="ghost" className="text-subtitle">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredGuests.length === 0 && (
          <div className="p-12 text-center">
            <Users className="h-12 w-12 text-subtitle mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">Nenhum convidado encontrado</p>
            <p className="text-subtitle text-sm">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredGuests.map((guest) => (
          <div
            key={guest.id}
            className="bg-card rounded-xl border border-border/50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                    {guest.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{guest.name}</p>
                  <p className="text-xs text-subtitle">{guest.email}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-subtitle -mr-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              <span
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  getStatusColor(guest.rsvpStatus)
                )}
              >
                {getStatusLabel(guest.rsvpStatus)}
              </span>
              <span className="text-xs text-subtitle">
                {guest.plusOne ? 'Com acompanhante (+1)' : 'Sem acompanhante'}
              </span>
            </div>
          </div>
        ))}

        {filteredGuests.length === 0 && (
          <div className="bg-card rounded-xl border border-border/50 p-8 text-center">
            <Users className="h-10 w-10 text-subtitle mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1 text-sm">Nenhum convidado encontrado</p>
            <p className="text-subtitle text-xs">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>
    </div>
  );
}
