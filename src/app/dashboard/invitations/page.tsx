'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Mail,
  Send,
  Users,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  ChevronDown,
  ChevronLeft,
  AlertCircle,
  Sparkles,
  Calendar,
  MapPin,
  ExternalLink,
  RefreshCw,
  Filter,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/shared/lib/utils';
import { toast } from 'sonner';
import { useWeddingStore } from '@/entities/wedding';

// Email Status Types
type EmailStatus = 'not_sent' | 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';

interface GuestInvitation {
  id: string;
  name: string;
  email: string;
  emailStatus: EmailStatus;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
}

// Mock data - will be replaced with API calls
const MOCK_GUESTS: GuestInvitation[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.com', emailStatus: 'opened', sentAt: '2024-01-15T10:30:00', deliveredAt: '2024-01-15T10:30:05', openedAt: '2024-01-15T14:20:00', rsvpStatus: 'confirmed' },
  { id: '2', name: 'João Santos', email: 'joao@email.com', emailStatus: 'delivered', sentAt: '2024-01-15T10:30:00', deliveredAt: '2024-01-15T10:30:10', rsvpStatus: 'pending' },
  { id: '3', name: 'Ana Costa', email: 'ana@email.com', emailStatus: 'sent', sentAt: '2024-01-16T09:00:00', rsvpStatus: 'pending' },
  { id: '4', name: 'Pedro Oliveira', email: 'pedro@email.com', emailStatus: 'bounced', sentAt: '2024-01-16T09:00:00', rsvpStatus: 'pending' },
  { id: '5', name: 'Carla Mendes', email: 'carla@email.com', emailStatus: 'not_sent', rsvpStatus: 'pending' },
  { id: '6', name: 'Lucas Ferreira', email: 'lucas@email.com', emailStatus: 'not_sent', rsvpStatus: 'pending' },
  { id: '7', name: 'Fernanda Lima', email: 'fernanda@email.com', emailStatus: 'clicked', sentAt: '2024-01-14T11:00:00', deliveredAt: '2024-01-14T11:00:05', openedAt: '2024-01-14T15:30:00', clickedAt: '2024-01-14T15:31:00', rsvpStatus: 'confirmed' },
  { id: '8', name: 'Ricardo Alves', email: 'ricardo@email.com', emailStatus: 'failed', sentAt: '2024-01-17T08:00:00', rsvpStatus: 'pending' },
];

const EMAIL_STATUS_CONFIG: Record<EmailStatus, { label: string; color: string; icon: typeof Mail }> = {
  not_sent: { label: 'Não enviado', color: 'bg-gray-500/20 text-gray-400', icon: Mail },
  pending: { label: 'Enviando...', color: 'bg-yellow-500/20 text-yellow-500', icon: Clock },
  sent: { label: 'Enviado', color: 'bg-blue-500/20 text-blue-500', icon: Send },
  delivered: { label: 'Entregue', color: 'bg-cyan-500/20 text-cyan-500', icon: CheckCircle2 },
  opened: { label: 'Aberto', color: 'bg-green-500/20 text-green-500', icon: Eye },
  clicked: { label: 'Clicado', color: 'bg-purple-500/20 text-purple-500', icon: ExternalLink },
  bounced: { label: 'Rejeitado', color: 'bg-orange-500/20 text-orange-500', icon: AlertCircle },
  failed: { label: 'Falhou', color: 'bg-red-500/20 text-red-500', icon: XCircle },
};

type FilterType = 'all' | 'not_sent' | 'sent' | 'delivered' | 'opened' | 'failed';

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'not_sent', label: 'Não enviados' },
  { id: 'sent', label: 'Enviados' },
  { id: 'delivered', label: 'Entregues' },
  { id: 'opened', label: 'Abertos' },
  { id: 'failed', label: 'Com falha' },
];

export default function InvitationsPage() {
  const t = useTranslations('dashboard');
  const { onboarding } = useWeddingStore();

  const [guests, setGuests] = useState<GuestInvitation[]>(MOCK_GUESTS);
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Filter guests
  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase());

    let matchesFilter = true;
    if (filter === 'not_sent') {
      matchesFilter = guest.emailStatus === 'not_sent';
    } else if (filter === 'sent') {
      matchesFilter = ['sent', 'delivered', 'opened', 'clicked'].includes(guest.emailStatus);
    } else if (filter === 'delivered') {
      matchesFilter = ['delivered', 'opened', 'clicked'].includes(guest.emailStatus);
    } else if (filter === 'opened') {
      matchesFilter = ['opened', 'clicked'].includes(guest.emailStatus);
    } else if (filter === 'failed') {
      matchesFilter = ['bounced', 'failed'].includes(guest.emailStatus);
    }

    return matchesSearch && matchesFilter;
  });

  // Statistics
  const stats = {
    total: guests.length,
    notSent: guests.filter(g => g.emailStatus === 'not_sent').length,
    sent: guests.filter(g => ['sent', 'delivered', 'opened', 'clicked'].includes(g.emailStatus)).length,
    opened: guests.filter(g => ['opened', 'clicked'].includes(g.emailStatus)).length,
    failed: guests.filter(g => ['bounced', 'failed'].includes(g.emailStatus)).length,
  };

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedGuests.size === filteredGuests.length) {
      setSelectedGuests(new Set());
    } else {
      setSelectedGuests(new Set(filteredGuests.map(g => g.id)));
    }
  };

  const handleSelectGuest = (guestId: string) => {
    const newSelected = new Set(selectedGuests);
    if (newSelected.has(guestId)) {
      newSelected.delete(guestId);
    } else {
      newSelected.add(guestId);
    }
    setSelectedGuests(newSelected);
  };

  const handleSelectNotSent = () => {
    const notSentIds = guests.filter(g => g.emailStatus === 'not_sent').map(g => g.id);
    setSelectedGuests(new Set(notSentIds));
    toast.success(`${notSentIds.length} convidados selecionados`);
  };

  // Send invitations
  const handleSendInvitations = async () => {
    if (selectedGuests.size === 0) {
      toast.error('Selecione pelo menos um convidado');
      return;
    }

    setIsSending(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update guest statuses
    setGuests(prev => prev.map(guest => {
      if (selectedGuests.has(guest.id)) {
        return {
          ...guest,
          emailStatus: 'sent' as EmailStatus,
          sentAt: new Date().toISOString(),
        };
      }
      return guest;
    }));

    setSelectedGuests(new Set());
    setIsSending(false);
    toast.success(`${selectedGuests.size} convites enviados com sucesso!`);
  };

  // Resend to failed
  const handleResendFailed = async () => {
    const failedGuests = guests.filter(g => ['bounced', 'failed'].includes(g.emailStatus));
    if (failedGuests.length === 0) {
      toast.info('Não há convites com falha para reenviar');
      return;
    }

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setGuests(prev => prev.map(guest => {
      if (['bounced', 'failed'].includes(guest.emailStatus)) {
        return {
          ...guest,
          emailStatus: 'pending' as EmailStatus,
          sentAt: new Date().toISOString(),
        };
      }
      return guest;
    }));

    setIsSending(false);
    toast.success(`${failedGuests.length} convites reenviados!`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/guests" className="text-subtitle hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl md:text-heading-2 mb-1">Enviar Convites</h1>
            <p className="text-subtitle text-sm md:text-base">
              Envie convites por email para seus convidados
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview do Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border"
            onClick={handleSelectNotSent}
          >
            <Users className="mr-2 h-4 w-4" />
            Selecionar Não Enviados
          </Button>
          {stats.failed > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-orange-500/50 text-orange-500 hover:bg-orange-500/10"
              onClick={handleResendFailed}
              disabled={isSending}
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", isSending && "animate-spin")} />
              Reenviar Falhos ({stats.failed})
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-secondary" />
            <span className="text-xs text-subtitle">Total</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-subtitle">Não enviados</span>
          </div>
          <p className="text-2xl font-bold text-gray-400">{stats.notSent}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Send className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-subtitle">Enviados</span>
          </div>
          <p className="text-2xl font-bold text-blue-500">{stats.sent}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="h-4 w-4 text-green-500" />
            <span className="text-xs text-subtitle">Abertos</span>
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.opened}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-xs text-subtitle">Falhos</span>
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.failed}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtitle" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar convidados..."
              className="pl-10 bg-input-bg border-border rounded-full text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-1 px-3 py-2 rounded-full bg-quaternary text-foreground/70 text-sm"
          >
            <Filter className="h-4 w-4" />
            <ChevronDown className={cn('h-4 w-4 transition-transform', showFilters && 'rotate-180')} />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                filter === f.id
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-quaternary text-foreground/70 hover:bg-quaternary/80'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Mobile Filters */}
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
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  filter === f.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-quaternary text-foreground/70'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selection Header */}
      {selectedGuests.size > 0 && (
        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedGuests.size} convidados selecionados</p>
              <p className="text-sm text-subtitle">Prontos para receber o convite</p>
            </div>
          </div>
          <Button
            onClick={handleSendInvitations}
            disabled={isSending}
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto"
          >
            {isSending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Convites
              </>
            )}
          </Button>
        </div>
      )}

      {/* Guest List */}
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-quaternary/30">
          <div className="col-span-1 flex items-center">
            <Checkbox
              checked={selectedGuests.size === filteredGuests.length && filteredGuests.length > 0}
              onCheckedChange={handleSelectAll}
              className="border-border data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
          </div>
          <div className="col-span-3 text-sm font-medium text-subtitle">Convidado</div>
          <div className="col-span-3 text-sm font-medium text-subtitle">Email</div>
          <div className="col-span-2 text-sm font-medium text-subtitle">Status do Email</div>
          <div className="col-span-2 text-sm font-medium text-subtitle">Enviado em</div>
          <div className="col-span-1 text-sm font-medium text-subtitle">RSVP</div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          {filteredGuests.map((guest) => {
            const statusConfig = EMAIL_STATUS_CONFIG[guest.emailStatus];
            const StatusIcon = statusConfig.icon;
            return (
              <div
                key={guest.id}
                className={cn(
                  'grid grid-cols-12 gap-4 p-4 border-b border-border/30 hover:bg-quaternary/30 transition-colors',
                  selectedGuests.has(guest.id) && 'bg-secondary/5'
                )}
              >
                <div className="col-span-1 flex items-center">
                  <Checkbox
                    checked={selectedGuests.has(guest.id)}
                    onCheckedChange={() => handleSelectGuest(guest.id)}
                    className="border-border data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                      {guest.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground truncate">{guest.name}</span>
                </div>
                <div className="col-span-3 flex items-center text-subtitle text-sm truncate">
                  {guest.email}
                </div>
                <div className="col-span-2 flex items-center">
                  <span className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', statusConfig.color)}>
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </span>
                </div>
                <div className="col-span-2 flex items-center text-sm text-subtitle">
                  {formatDate(guest.sentAt)}
                </div>
                <div className="col-span-1 flex items-center">
                  {guest.rsvpStatus === 'confirmed' && (
                    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-500" />
                    </span>
                  )}
                  {guest.rsvpStatus === 'declined' && (
                    <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      <XCircle className="h-3 w-3 text-red-500" />
                    </span>
                  )}
                  {guest.rsvpStatus === 'pending' && (
                    <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Clock className="h-3 w-3 text-yellow-500" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-border/30">
          {filteredGuests.map((guest) => {
            const statusConfig = EMAIL_STATUS_CONFIG[guest.emailStatus];
            const StatusIcon = statusConfig.icon;
            return (
              <div
                key={guest.id}
                className={cn(
                  'p-4',
                  selectedGuests.has(guest.id) && 'bg-secondary/5'
                )}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedGuests.has(guest.id)}
                    onCheckedChange={() => handleSelectGuest(guest.id)}
                    className="mt-1 border-border data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary/20 text-secondary text-xs">
                          {guest.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{guest.name}</p>
                        <p className="text-xs text-subtitle truncate">{guest.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusConfig.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </span>
                      {guest.sentAt && (
                        <span className="text-xs text-subtitle">{formatDate(guest.sentAt)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGuests.length === 0 && (
          <div className="p-12 text-center">
            <Mail className="h-12 w-12 text-subtitle mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">Nenhum convidado encontrado</p>
            <p className="text-subtitle text-sm">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>

      {/* Email Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowPreview(false)} />
          <div className="absolute inset-4 md:inset-8 lg:inset-16 bg-card rounded-2xl overflow-hidden flex flex-col max-w-3xl mx-auto">
            {/* Modal Header */}
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="font-semibold">Preview do Convite</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>

            {/* Email Preview Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg mx-auto">
                {/* Email Header */}
                <div
                  className="p-8 text-center text-white"
                  style={{ backgroundColor: onboarding.primaryColor || '#ea2e5b' }}
                >
                  <Sparkles className="h-8 w-8 mx-auto mb-4 opacity-80" />
                  <h2 className="text-2xl font-serif mb-2">Você está convidado!</h2>
                  <p className="text-sm opacity-90">Para o casamento de</p>
                </div>

                {/* Email Body */}
                <div className="p-8 text-center text-gray-800">
                  <h1 className="text-3xl font-serif mb-2">
                    {onboarding.partner1Name || 'Noivo'} & {onboarding.partner2Name || 'Noiva'}
                  </h1>

                  <div className="flex items-center justify-center gap-4 my-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {onboarding.date
                          ? new Date(onboarding.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
                          : 'Data a definir'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-8">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{onboarding.location || 'Local a definir'}</span>
                  </div>

                  <p className="text-gray-600 mb-8">
                    Gostaríamos muito de compartilhar este momento especial com você.
                    Por favor, confirme sua presença clicando no botão abaixo.
                  </p>

                  <button
                    className="px-8 py-3 rounded-full text-white font-medium"
                    style={{ backgroundColor: onboarding.primaryColor || '#ea2e5b' }}
                  >
                    Confirmar Presença
                  </button>

                  <p className="text-xs text-gray-400 mt-8">
                    Se você não conseguir clicar no botão, acesse: veugravata.com/wedding/{
                      onboarding.partner1Name && onboarding.partner2Name
                        ? `${onboarding.partner1Name.toLowerCase().replace(/\s+/g, '-')}-e-${onboarding.partner2Name.toLowerCase().replace(/\s+/g, '-')}`
                        : 'seu-casamento'
                    }
                  </p>
                </div>

                {/* Email Footer */}
                <div className="p-4 bg-gray-50 text-center">
                  <p className="text-xs text-gray-500">
                    Este email foi enviado através do Véu & Gravata
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Fechar
              </Button>
              <Link href="/dashboard/site">
                <Button className="bg-secondary hover:bg-secondary/90">
                  Personalizar Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
