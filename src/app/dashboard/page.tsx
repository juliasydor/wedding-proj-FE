'use client';

import { useTranslations } from 'next-intl';
import { Heart, Gift, Home, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/entities/user';

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
    guestName: 'Aunt Marie',
    amount: 200,
    giftName: 'Kitchen Mixer Fund',
    message: "So happy for you two! Can't wait to taste the cookies you make with this.",
    timeAgo: '2 hours ago',
    thanked: false,
  },
  {
    id: '2',
    guestName: 'The Johnsons',
    amount: 150,
    giftName: 'Honeymoon Fund',
    message: 'Have a blast in Bali! Love you guys.',
    timeAgo: 'Yesterday',
    thanked: true,
  },
  {
    id: '3',
    guestName: 'Cousin Vinny',
    amount: 75,
    giftName: 'Date Night Fund',
    message: 'Enjoy your new life together!',
    timeAgo: '2 days ago',
    thanked: true,
  },
];

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { user } = useAuthStore();

  const totalReceived = 4250;
  const goalAmount = 6500;
  const progressPercent = Math.round((totalReceived / goalAmount) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-heading-3 mb-8">{t('giftsReceived.title')}</h1>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-secondary/20 to-tertiary/10 rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-20">
          <Heart className="h-24 w-24 text-secondary fill-secondary" />
        </div>

        <p className="text-sm text-subtitle mb-1">{t('giftsReceived.newToday', { count: 3 })}</p>
        <p className="text-xs uppercase tracking-wider text-tertiary mb-2">
          {t('giftsReceived.totalReceived')}
        </p>
        <h2 className="text-5xl font-bold text-foreground mb-4">
          ${totalReceived.toLocaleString()}
        </h2>

        <div className="space-y-2">
          <Progress value={progressPercent} className="h-2 bg-card" />
          <p className="text-sm text-secondary">
            {t('giftsReceived.ofGoal', { percent: progressPercent })}
          </p>
        </div>
      </div>

      {/* Contributions List */}
      <div className="space-y-4">
        {MOCK_CONTRIBUTIONS.map((contribution) => (
          <div
            key={contribution.id}
            className="bg-card rounded-2xl p-4 border border-border"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={contribution.guestAvatar} />
                <AvatarFallback className="bg-quaternary text-foreground">
                  {contribution.guestName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {contribution.guestName}
                  </h3>
                  <span className="text-secondary font-semibold">
                    ${contribution.amount}
                  </span>
                </div>

                <p className="text-xs text-subtitle">{contribution.timeAgo}</p>

                <p className="text-xs uppercase tracking-wider text-tertiary mt-2">
                  🎁 {contribution.giftName}
                </p>

                <p className="text-sm text-subtitle mt-2 italic">
                  "{contribution.message}"
                </p>

                {!contribution.thanked ? (
                  <Button
                    size="sm"
                    className="mt-3 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {t('sendThanks')}
                  </Button>
                ) : (
                  <div className="mt-3 flex items-center gap-1 text-sm text-subtitle">
                    <span className="text-secondary">✓</span> Sent
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-subtitle">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-subtitle">
            <Gift className="h-5 w-5" />
            <span className="text-xs">Registry</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-secondary">
            <div className="bg-secondary rounded-full p-2 -mt-4">
              <Gift className="h-5 w-5 text-secondary-foreground" />
            </div>
            <span className="text-xs">Gifts</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-subtitle">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
