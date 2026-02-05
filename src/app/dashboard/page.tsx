'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Heart, Gift, Users, Calendar, MapPin, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import { format, differenceInDays } from 'date-fns';

interface GiftContribution {
  id: string;
  guestName: string;
  guestAvatar?: string;
  amount: number;
  giftName: string;
  message: string;
  timeAgo: string;
  thanked: boolean;
}

const MOCK_CONTRIBUTIONS: GiftContribution[] = [
  {
    id: '1',
    guestName: 'Tia Maria',
    amount: 200,
    giftName: 'Fundo para Lua de Mel',
    message: 'Muito feliz por vocês! Aproveitem!',
    timeAgo: '2 horas atrás',
    thanked: false,
  },
  {
    id: '2',
    guestName: 'Família Silva',
    amount: 150,
    giftName: 'Fundo para Casa Nova',
    message: 'Muitas felicidades no novo lar!',
    timeAgo: 'Ontem',
    thanked: true,
  },
];

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { onboarding } = useWeddingStore();

  const totalReceived = 4250;
  const goalAmount = 6500;
  const progressPercent = Math.round((totalReceived / goalAmount) * 100);

  const weddingDate = onboarding.date ? new Date(onboarding.date) : null;
  const daysUntilWedding = weddingDate ? differenceInDays(weddingDate, new Date()) : null;

  const weddingSlug = onboarding.partner1Name && onboarding.partner2Name
    ? `${onboarding.partner1Name.toLowerCase().replace(/\s/g, '')}and${onboarding.partner2Name.toLowerCase().replace(/\s/g, '')}`
    : null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-2 mb-2">
          {t('welcome', { name: onboarding.partner1Name || 'Casal' })}
        </h1>
        <p className="text-subtitle text-lg">
          {daysUntilWedding !== null && daysUntilWedding > 0
            ? `Faltam ${daysUntilWedding} dias para o grande dia!`
            : 'Seu casamento está chegando!'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Days Until Wedding */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-secondary" />
            <span className="text-xs text-subtitle uppercase tracking-wider">Data</span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {daysUntilWedding !== null ? daysUntilWedding : '--'}
          </p>
          <p className="text-sm text-subtitle">dias restantes</p>
        </div>

        {/* Confirmed Guests */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-tertiary" />
            <span className="text-xs text-subtitle uppercase tracking-wider">Convidados</span>
          </div>
          <p className="text-3xl font-bold text-foreground">48</p>
          <p className="text-sm text-subtitle">confirmados</p>
        </div>

        {/* Gifts Received */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Gift className="h-8 w-8 text-secondary" />
            <span className="text-xs text-subtitle uppercase tracking-wider">Presentes</span>
          </div>
          <p className="text-3xl font-bold text-foreground">12</p>
          <p className="text-sm text-subtitle">recebidos</p>
        </div>

        {/* Site Views */}
        <div className="bg-card rounded-2xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Eye className="h-8 w-8 text-tertiary" />
            <span className="text-xs text-subtitle uppercase tracking-wider">Visualizações</span>
          </div>
          <p className="text-3xl font-bold text-foreground">234</p>
          <p className="text-sm text-subtitle">no site</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wedding Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-secondary/20 to-tertiary/10 rounded-3xl p-6 relative overflow-hidden h-full">
            <div className="absolute top-4 right-4 opacity-20">
              <Heart className="h-20 w-20 text-secondary fill-secondary" />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-4">Seu Casamento</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-subtitle">Casal</p>
                  <p className="font-medium text-foreground">
                    {onboarding.partner1Name || '--'} & {onboarding.partner2Name || '--'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-subtitle">Data</p>
                  <p className="font-medium text-foreground">
                    {weddingDate ? format(weddingDate, 'dd/MM/yyyy') : '--'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-subtitle">Local</p>
                  <p className="font-medium text-foreground">
                    {onboarding.location || '--'}
                  </p>
                </div>
              </div>
            </div>

            <Link href={ROUTES.siteEditor}>
              <Button className="w-full mt-6 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Editar Informações
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Gift Progress */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-3xl p-6 border border-border/50 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">{t('giftsReceived.title')}</h3>
              <Link href={ROUTES.giftList} className="text-sm text-secondary hover:text-tertiary">
                Ver todos
              </Link>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-xs text-subtitle uppercase tracking-wider mb-1">
                    {t('giftsReceived.totalReceived')}
                  </p>
                  <p className="text-4xl font-bold text-foreground">
                    R$ {totalReceived.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-secondary">
                  {t('giftsReceived.ofGoal', { percent: progressPercent })}
                </p>
              </div>
              <Progress value={progressPercent} className="h-3 bg-quaternary" />
            </div>

            {/* Recent Contributions */}
            <div className="space-y-4">
              <p className="text-sm text-subtitle">Contribuições recentes</p>
              {MOCK_CONTRIBUTIONS.map((contribution) => (
                <div
                  key={contribution.id}
                  className="flex items-center gap-4 p-3 bg-quaternary/50 rounded-xl"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contribution.guestAvatar} />
                    <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                      {contribution.guestName.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {contribution.guestName}
                    </p>
                    <p className="text-xs text-subtitle">{contribution.giftName}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-secondary">R$ {contribution.amount}</p>
                    <p className="text-xs text-subtitle">{contribution.timeAgo}</p>
                  </div>

                  {!contribution.thanked && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-secondary hover:text-tertiary hover:bg-secondary/10"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
