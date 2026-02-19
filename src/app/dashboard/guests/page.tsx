'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  UserPlus,
  Phone,
  User,
  AtSign,
  Calendar,
  Edit2,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/config';
import { toast } from 'sonner';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  plusOneName?: string;
  plusOneAge?: number;
  dietaryRestrictions?: string;
  invitedAt: string;
}

const MOCK_GUESTS: Guest[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.com', phone: '(11) 99999-1111', rsvpStatus: 'confirmed', plusOne: true, plusOneName: 'Carlos Silva', plusOneAge: 35, invitedAt: '2024-01-15' },
  { id: '2', name: 'João Santos', email: 'joao@email.com', rsvpStatus: 'confirmed', plusOne: false, invitedAt: '2024-01-15' },
  { id: '3', name: 'Ana Costa', email: 'ana@email.com', phone: '(11) 99999-3333', rsvpStatus: 'pending', plusOne: true, plusOneName: 'Roberto Costa', plusOneAge: 42, invitedAt: '2024-01-16' },
  { id: '4', name: 'Pedro Oliveira', email: 'pedro@email.com', rsvpStatus: 'declined', plusOne: false, invitedAt: '2024-01-16' },
  { id: '5', name: 'Carla Mendes', email: 'carla@email.com', rsvpStatus: 'confirmed', plusOne: true, plusOneName: 'Felipe Mendes', plusOneAge: 28, invitedAt: '2024-01-17' },
  { id: '6', name: 'Lucas Ferreira', email: 'lucas@email.com', phone: '(11) 99999-6666', rsvpStatus: 'pending', plusOne: false, invitedAt: '2024-01-18' },
  { id: '7', name: 'Fernanda Lima', email: 'fernanda@email.com', rsvpStatus: 'confirmed', plusOne: false, invitedAt: '2024-01-18' },
  { id: '8', name: 'Ricardo Alves', email: 'ricardo@email.com', rsvpStatus: 'pending', plusOne: true, plusOneName: 'Juliana Alves', plusOneAge: 31, invitedAt: '2024-01-19' },
];

const FILTERS = [
  { id: 'all', label: 'Todos', icon: Users },
  { id: 'confirmed', label: 'Confirmados', icon: UserCheck },
  { id: 'pending', label: 'Pendentes', icon: Clock },
  { id: 'declined', label: 'Recusados', icon: UserX },
];

interface NewGuestForm {
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'declined';
  hasPlusOne: boolean;
  plusOneName: string;
  plusOneAge: string;
  dietaryRestrictions: string;
}

const initialFormState: NewGuestForm = {
  name: '',
  email: '',
  phone: '',
  status: 'pending',
  hasPlusOne: false,
  plusOneName: '',
  plusOneAge: '',
  dietaryRestrictions: '',
};

const STATUS_OPTIONS = [
  { id: 'pending' as const, label: 'Pendente', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' },
  { id: 'confirmed' as const, label: 'Confirmado', color: 'bg-green-500/20 text-green-500 border-green-500/30' },
  { id: 'declined' as const, label: 'Recusado', color: 'bg-red-500/20 text-red-500 border-red-500/30' },
];

export default function GuestsPage() {
  const t = useTranslations('dashboard.guests');
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [guests, setGuests] = useState<Guest[]>(MOCK_GUESTS);
  const [formData, setFormData] = useState<NewGuestForm>(initialFormState);
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase()) ||
      (guest.plusOneName && guest.plusOneName.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || guest.rsvpStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: guests.length,
    confirmed: guests.filter((g) => g.rsvpStatus === 'confirmed').length,
    pending: guests.filter((g) => g.rsvpStatus === 'pending').length,
    declined: guests.filter((g) => g.rsvpStatus === 'declined').length,
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

  const handleAddGuest = () => {
    if (!formData.name || !formData.email) {
      toast.error('Por favor, preencha nome e email do convidado.');
      return;
    }

    const newGuest: Guest = {
      id: `guest-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      rsvpStatus: formData.status,
      plusOne: formData.hasPlusOne,
      plusOneName: formData.hasPlusOne && formData.plusOneName ? formData.plusOneName : undefined,
      plusOneAge: formData.hasPlusOne && formData.plusOneAge ? parseInt(formData.plusOneAge) : undefined,
      dietaryRestrictions: formData.dietaryRestrictions || undefined,
      invitedAt: new Date().toISOString().split('T')[0],
    };

    setGuests([newGuest, ...guests]);
    setFormData(initialFormState);
    setShowAddModal(false);
    toast.success('Convidado adicionado com sucesso!');
  };

  const handleCloseModal = () => {
    setFormData(initialFormState);
    setEditingGuestId(null);
    setShowAddModal(false);
  };

  const handleEditGuest = (guest: Guest) => {
    setEditingGuestId(guest.id);
    setFormData({
      name: guest.name,
      email: guest.email,
      phone: guest.phone || '',
      status: guest.rsvpStatus,
      hasPlusOne: guest.plusOne,
      plusOneName: guest.plusOneName || '',
      plusOneAge: guest.plusOneAge ? String(guest.plusOneAge) : '',
      dietaryRestrictions: guest.dietaryRestrictions || '',
    });
    setShowAddModal(true);
  };

  const handleEditGuestMobile = (guest: Guest) => {
    sessionStorage.setItem(`edit-guest-${guest.id}`, JSON.stringify(guest));
    router.push(ROUTES.editGuest(guest.id));
  };

  const handleSaveGuest = () => {
    if (!formData.name || !formData.email) {
      toast.error('Por favor, preencha nome e email do convidado.');
      return;
    }

    if (editingGuestId) {
      setGuests(guests.map((g) =>
        g.id === editingGuestId
          ? {
              ...g,
              name: formData.name,
              email: formData.email,
              phone: formData.phone || undefined,
              rsvpStatus: formData.status,
              plusOne: formData.hasPlusOne,
              plusOneName: formData.hasPlusOne && formData.plusOneName ? formData.plusOneName : undefined,
              plusOneAge: formData.hasPlusOne && formData.plusOneAge ? parseInt(formData.plusOneAge) : undefined,
              dietaryRestrictions: formData.dietaryRestrictions || undefined,
            }
          : g
      ));
      toast.success('Convidado atualizado com sucesso!');
    } else {
      handleAddGuest();
      return;
    }

    setFormData(initialFormState);
    setEditingGuestId(null);
    setShowAddModal(false);
  };

  const handleDeleteGuest = (guestId: string) => {
    setGuests(guests.filter((g) => g.id !== guestId));
    toast.success('Convidado removido com sucesso!');
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
          <Link href="/dashboard/invitations">
            <Button variant="outline" className="rounded-full border-border text-sm" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Enviar Convites</span>
              <span className="sm:hidden">Convites</span>
            </Button>
          </Link>
          {/* Desktop: open modal */}
          <Button
            onClick={() => setShowAddModal(true)}
            className="hidden md:flex rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('addGuest')}
          </Button>
          {/* Mobile: navigate to add page */}
          <Button
            onClick={() => router.push(ROUTES.addGuest)}
            className="md:hidden rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
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
              placeholder="Buscar convidados ou acompanhantes..."
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
                <td className="p-4">
                  {guest.plusOne && guest.plusOneName ? (
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4 text-tertiary" />
                      <div>
                        <p className="text-foreground text-sm">{guest.plusOneName}</p>
                        {guest.plusOneAge && (
                          <p className="text-subtitle text-xs">{guest.plusOneAge} anos</p>
                        )}
                      </div>
                    </div>
                  ) : guest.plusOne ? (
                    <span className="text-yellow-500 text-sm">Aguardando dados</span>
                  ) : (
                    <span className="text-subtitle text-sm">Sem acompanhante</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-subtitle">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem onClick={() => handleEditGuest(guest)} className="cursor-pointer">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Editar convidado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="cursor-pointer text-red-500 focus:text-red-500"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover convidado
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-subtitle -mr-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem onClick={() => handleEditGuestMobile(guest)} className="cursor-pointer">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar convidado
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover convidado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Companion Info */}
            {guest.plusOne && (
              <div className="mt-3 pt-3 border-t border-border/30">
                {guest.plusOneName ? (
                  <div className="flex items-center gap-2 bg-tertiary/10 rounded-lg p-2">
                    <UserPlus className="h-4 w-4 text-tertiary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-foreground text-sm font-medium truncate">{guest.plusOneName}</p>
                      {guest.plusOneAge && (
                        <p className="text-subtitle text-xs">{guest.plusOneAge} anos</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-500 text-xs">
                    <UserPlus className="h-4 w-4" />
                    <span>Acompanhante - Aguardando dados</span>
                  </div>
                )}
              </div>
            )}

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
                {guest.plusOne ? 'Com acompanhante' : 'Sem acompanhante'}
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

      {/* Add Guest Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-secondary" />
              {editingGuestId ? 'Editar Convidado' : 'Adicionar Convidado'}
            </DialogTitle>
            <DialogDescription className="text-subtitle">
              {editingGuestId
                ? 'Atualize as informações do convidado.'
                : 'Preencha as informações do convidado abaixo.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Guest Name */}
            <div className="space-y-2">
              <Label htmlFor="guest-name" className="text-sm flex items-center gap-2">
                <User className="h-4 w-4 text-secondary" />
                Nome completo *
              </Label>
              <Input
                id="guest-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Maria da Silva"
                className="bg-input-bg border-border"
              />
            </div>

            {/* Guest Email */}
            <div className="space-y-2">
              <Label htmlFor="guest-email" className="text-sm flex items-center gap-2">
                <AtSign className="h-4 w-4 text-secondary" />
                Email *
              </Label>
              <Input
                id="guest-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ex: maria@email.com"
                className="bg-input-bg border-border"
              />
            </div>

            {/* Guest Phone */}
            <div className="space-y-2">
              <Label htmlFor="guest-phone" className="text-sm flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                Telefone
              </Label>
              <Input
                id="guest-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ex: (11) 99999-9999"
                className="bg-input-bg border-border"
              />
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-secondary" />
                Status de Confirmação
              </Label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: option.id })}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                      formData.status === option.id
                        ? option.color
                        : 'bg-quaternary text-foreground/70 border-transparent hover:border-border'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div className="space-y-2">
              <Label htmlFor="dietary" className="text-sm text-foreground">
                Restrições Alimentares
              </Label>
              <Input
                id="dietary"
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                placeholder="Ex: Vegetariano, sem glúten..."
                className="bg-input-bg border-border"
              />
            </div>

            {/* Plus One Checkbox */}
            <div className="flex items-center space-x-3 pt-2">
              <Checkbox
                id="has-plus-one"
                checked={formData.hasPlusOne}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasPlusOne: checked as boolean })
                }
                className="border-border data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
              />
              <Label
                htmlFor="has-plus-one"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Possui acompanhante
              </Label>
            </div>

            {/* Plus One Fields */}
            {formData.hasPlusOne && (
              <div className="space-y-4 p-4 bg-tertiary/10 rounded-xl border border-tertiary/20">
                <div className="flex items-center gap-2 text-tertiary text-sm font-medium">
                  <UserPlus className="h-4 w-4" />
                  Dados do Acompanhante
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plus-one-name" className="text-sm">
                    Nome do acompanhante
                  </Label>
                  <Input
                    id="plus-one-name"
                    value={formData.plusOneName}
                    onChange={(e) => setFormData({ ...formData, plusOneName: e.target.value })}
                    placeholder="Ex: Carlos da Silva"
                    className="bg-input-bg border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plus-one-age" className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-tertiary" />
                    Idade do acompanhante
                  </Label>
                  <Input
                    id="plus-one-age"
                    type="number"
                    min="0"
                    max="120"
                    value={formData.plusOneAge}
                    onChange={(e) => setFormData({ ...formData, plusOneAge: e.target.value })}
                    placeholder="Ex: 35"
                    className="bg-input-bg border-border"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="rounded-full border-border"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveGuest}
              className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              {editingGuestId ? (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Convidado
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
