'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ChevronLeft,
  Wallet,
  DollarSign,
  Gift,
  CheckCircle2,
  ArrowUpRight,
  Calendar,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { ROUTES } from '@/shared/config';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';

interface ReceivedGift {
  id: string;
  giftName: string;
  giftedBy: string;
  amount: number;
  date: string;
  message?: string;
  claimed: boolean;
}

const MOCK_RECEIVED: ReceivedGift[] = [
  {
    id: '1',
    giftName: 'Cafeteira Expresso',
    giftedBy: 'Maria Silva',
    amount: 800,
    date: '2024-02-15',
    message: 'Felicidades ao casal!',
    claimed: false,
  },
  {
    id: '2',
    giftName: 'Jogo de Cama',
    giftedBy: 'João Santos',
    amount: 450,
    date: '2024-02-10',
    message: 'Muita felicidade!',
    claimed: true,
  },
  {
    id: '3',
    giftName: 'Fundo Lua de Mel',
    giftedBy: 'Ana Costa',
    amount: 500,
    date: '2024-02-08',
    claimed: false,
  },
];

export default function WalletPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [received] = useState<ReceivedGift[]>(MOCK_RECEIVED);

  const totalValue = received.reduce((sum, g) => sum + g.amount, 0);
  const totalClaimed = received.filter((g) => g.claimed).reduce((sum, g) => sum + g.amount, 0);
  const totalPending = totalValue - totalClaimed;

  const handleClaim = () => {
    toast.success('Solicitação de resgate enviada! O valor será transferido em até 2 dias úteis.');
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-heading-2 mb-1">Minha Carteira</h1>
          <p className="text-subtitle text-sm">Gerencie os presentes recebidos</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Gift className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
            <span className="text-xs md:text-sm text-subtitle">Total de Presentes</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{received.length}</p>
        </div>
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-tertiary" />
            <span className="text-xs md:text-sm text-subtitle">Valor Total Recebido</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">R$ {totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50">
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Wallet className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
            <span className="text-xs md:text-sm text-subtitle">Disponível para Resgate</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-secondary">R$ {totalPending.toLocaleString()}</p>
        </div>
      </div>

      {/* Claim Button */}
      {totalPending > 0 && (
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-secondary/30 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Resgatar presentes</h3>
              <p className="text-sm text-subtitle">
                Você tem R$ {totalPending.toLocaleString()} disponíveis para transferência.
              </p>
            </div>
            <Button
              onClick={handleClaim}
              className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Resgatar R$ {totalPending.toLocaleString()}
            </Button>
          </div>
        </div>
      )}

      {/* Received Gifts List */}
      <h2 className="text-lg font-semibold text-foreground mb-4">Presentes Recebidos</h2>
      <div className="space-y-3">
        {received.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-xl border border-border/50 p-4 md:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{item.giftName}</h3>
                  {item.claimed && (
                    <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                      Resgatado
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-subtitle">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {item.giftedBy}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                {item.message && (
                  <p className="text-sm text-foreground/80 mt-2 italic">&quot;{item.message}&quot;</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-secondary">R$ {item.amount.toLocaleString()}</p>
                {!item.claimed && (
                  <span className="text-xs text-yellow-500">Pendente</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {received.length === 0 && (
        <div className="bg-card rounded-xl border border-border/50 p-8 md:p-12 text-center">
          <Gift className="h-12 w-12 text-subtitle mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Nenhum presente recebido ainda</p>
          <p className="text-subtitle text-sm">Quando seus convidados enviarem presentes, eles aparecerão aqui.</p>
        </div>
      )}
    </div>
  );
}
