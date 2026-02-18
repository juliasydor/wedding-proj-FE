'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Gift, Users, Calendar, MapPin, Eye, ArrowRight, Heart } from 'lucide-react';
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

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-heading-2 mb-1 md:mb-2">
          {t('welcome', { name: onboarding.partner1Name || 'Casal' })}
        </h1>
        <p className="text-subtitle text-sm md:text-lg">
          {daysUntilWedding !== null && daysUntilWedding > 0
            ? `Faltam ${daysUntilWedding} dias para o grande dia!`
            : 'Seu casamento está chegando!'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        {/* Days Until Wedding */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <Calendar className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
            <span className="text-[10px] md:text-xs text-subtitle uppercase tracking-wider">Data</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            {daysUntilWedding !== null ? daysUntilWedding : '--'}
          </p>
          <p className="text-xs md:text-sm text-subtitle">dias restantes</p>
        </div>

        {/* Confirmed Guests */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-tertiary" />
            <span className="text-[10px] md:text-xs text-subtitle uppercase tracking-wider">Convidados</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">48</p>
          <p className="text-xs md:text-sm text-subtitle">confirmados</p>
        </div>

        {/* Gifts Received */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <Gift className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
            <span className="text-[10px] md:text-xs text-subtitle uppercase tracking-wider">Presentes</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">12</p>
          <p className="text-xs md:text-sm text-subtitle">recebidos</p>
        </div>

        {/* Site Views */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <Eye className="h-6 w-6 md:h-8 md:w-8 text-tertiary" />
            <span className="text-[10px] md:text-xs text-subtitle uppercase tracking-wider">Visualizações</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">234</p>
          <p className="text-xs md:text-sm text-subtitle">no site</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Wedding Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-secondary/20 to-tertiary/10 rounded-2xl md:rounded-3xl p-4 md:p-6 relative overflow-hidden h-full">
            <div className="absolute top-4 right-4 opacity-20">
              <Heart className="w-32 h-32 md:w-40 md:h-40 text-secondary fill-secondary" />
            </div>

            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Seu Casamento</h3>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="h-4 w-4 md:h-5 md:w-5 text-secondary fill-secondary shrink-0" />
                <div>
                  <p className="text-xs md:text-sm text-subtitle">Casal</p>
                  <p className="font-medium text-foreground text-sm md:text-base">
                    {onboarding.partner1Name || '--'} & {onboarding.partner2Name || '--'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-secondary shrink-0" />
                <div>
                  <p className="text-xs md:text-sm text-subtitle">Data</p>
                  <p className="font-medium text-foreground text-sm md:text-base">
                    {weddingDate ? format(weddingDate, 'dd/MM/yyyy') : '--'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-secondary shrink-0" />
                <div>
                  <p className="text-xs md:text-sm text-subtitle">Local</p>
                  <p className="font-medium text-foreground text-sm md:text-base truncate">
                    {onboarding.location || '--'}
                  </p>
                </div>
              </div>
            </div>

            <Link href={ROUTES.siteEditor}>
              <Button className="w-full mt-4 md:mt-6 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm">
                Editar Informações
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Gift Progress */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 border border-border/50 h-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-foreground">{t('giftsReceived.title')}</h3>
              <Link href={ROUTES.giftList} className="text-xs md:text-sm text-secondary hover:text-tertiary">
                Ver todos
              </Link>
            </div>

            {/* Progress */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-[10px] md:text-xs text-subtitle uppercase tracking-wider mb-1">
                    {t('giftsReceived.totalReceived')}
                  </p>
                  <p className="text-2xl md:text-4xl font-bold text-foreground">
                    R$ {totalReceived.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs md:text-sm text-secondary">
                  {t('giftsReceived.ofGoal', { percent: progressPercent })}
                </p>
              </div>
              <Progress value={progressPercent} className="h-2 md:h-3 bg-quaternary" />
            </div>

            {/* Recent Contributions */}
            <div className="space-y-3 md:space-y-4">
              <p className="text-xs md:text-sm text-subtitle">Contribuições recentes</p>
              {MOCK_CONTRIBUTIONS.map((contribution) => (
                <div
                  key={contribution.id}
                  className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 bg-quaternary/50 rounded-lg md:rounded-xl"
                >
                  <Avatar className="h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src={contribution.guestAvatar} />
                    <AvatarFallback className="bg-secondary/20 text-secondary text-xs md:text-sm">
                      {contribution.guestName.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-xs md:text-sm truncate">
                      {contribution.guestName}
                    </p>
                    <p className="text-[10px] md:text-xs text-subtitle truncate">{contribution.giftName}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-semibold text-secondary text-sm md:text-base">R$ {contribution.amount}</p>
                    <p className="text-[10px] md:text-xs text-subtitle">{contribution.timeAgo}</p>
                  </div>

                  {!contribution.thanked && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-secondary hover:text-tertiary hover:bg-secondary/10 hidden sm:flex"
                    >
                      <Heart className="h-5 w-5 fill-current" />
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
