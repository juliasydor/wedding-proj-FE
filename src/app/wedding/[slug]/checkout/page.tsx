'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Gift,
  CreditCard,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Heart,
  User,
  Mail,
  Phone,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { useWeddingStore } from '@/entities/wedding';
import type { Gift as GiftType } from '@/shared/types';

// Mock gift data - in production, fetch from API
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
  {
    id: '5',
    weddingId: '1',
    name: 'Aspirador Robô',
    description: 'Para facilitar a limpeza do nosso lar',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    category: 'living',
    isSelected: true,
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
    contributedAmount: 200,
    contributors: [],
  },
];

type PaymentMethod = 'pix' | 'credit_card';
type CheckoutStep = 'details' | 'payment' | 'processing' | 'success' | 'error';

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params?.slug as string || '';
  const giftId = searchParams?.get('gift') || null;

  const { onboarding } = useWeddingStore();

  // Use store colors or defaults
  const primaryColor = onboarding.primaryColor || '#ea2e5b';

  // Find the selected gift
  const selectedGift = useMemo(() => {
    return MOCK_GIFTS.find(g => g.id === giftId) || MOCK_GIFTS[0];
  }, [giftId]);

  const remaining = selectedGift.price - (selectedGift.contributedAmount || 0);

  const [step, setStep] = useState<CheckoutStep>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [amount, setAmount] = useState(remaining.toString());
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleContinueToPayment = () => {
    if (!guestInfo.name || !guestInfo.email) {
      return;
    }
    setStep('payment');
  };

  const handleProcessPayment = () => {
    setStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      // 90% success rate for demo
      if (Math.random() > 0.1) {
        setStep('success');
      } else {
        setStep('error');
      }
    }, 3000);
  };

  const handleRetry = () => {
    setStep('payment');
  };

  const handleBackToGifts = () => {
    router.push(`/wedding/${slug}/gifts`);
  };

  // Processing state
  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <Loader2 className="h-10 w-10 animate-spin" style={{ color: primaryColor }} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Processando pagamento...
          </h1>
          <p className="text-subtitle text-sm md:text-base">
            Por favor, aguarde enquanto processamos seu pagamento.
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: '#22c55e20' }}
          >
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Pagamento realizado!
          </h1>
          <p className="text-subtitle text-sm md:text-base mb-6">
            Seu presente foi enviado com sucesso para {onboarding.partner1Name || 'o casal'} & {onboarding.partner2Name || ''}.
            Muito obrigado pela sua contribuição!
          </p>

          {/* Gift Summary */}
          <div className="bg-card rounded-xl border border-border/50 p-4 mb-6 text-left">
            <div className="flex gap-4">
              <img
                src={selectedGift.imageUrl}
                alt={selectedGift.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">{selectedGift.name}</h3>
                <p className="text-sm text-subtitle">Contribuição: R$ {parseInt(amount).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleBackToGifts}
              className="w-full rounded-full text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <Gift className="mr-2 h-4 w-4" />
              Ver mais presentes
            </Button>
            <Link href={`/wedding/${slug}`}>
              <Button variant="outline" className="w-full rounded-full border-border">
                Voltar ao site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (step === 'error') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-red-500/20">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Ops! Algo deu errado
          </h1>
          <p className="text-subtitle text-sm md:text-base mb-6">
            Não foi possível processar seu pagamento. Por favor, tente novamente ou escolha outro método de pagamento.
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              className="w-full rounded-full text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Tentar novamente
            </Button>
            <Button
              onClick={handleBackToGifts}
              variant="outline"
              className="w-full rounded-full border-border"
            >
              Escolher outro presente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-14 md:top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => step === 'payment' ? setStep('details') : handleBackToGifts()}
              className="p-2 rounded-full hover:bg-quaternary transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div>
              <h1 className="font-semibold text-foreground">
                {step === 'details' ? 'Finalizar Presente' : 'Pagamento'}
              </h1>
              <p className="text-xs text-subtitle">
                {step === 'details' ? 'Passo 1 de 2' : 'Passo 2 de 2'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-[1fr,380px] gap-6 md:gap-8">
          {/* Main Content */}
          <div className="order-2 md:order-1">
            {step === 'details' && (
              <div className="space-y-6">
                {/* Amount Selection */}
                <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-4 md:p-6">
                  <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" style={{ color: primaryColor }} />
                    Valor da Contribuição
                  </h2>

                  <div className="space-y-4">
                    {/* Preset amounts */}
                    <div className="grid grid-cols-3 gap-2">
                      {[50, 100, remaining].filter((v, i, a) => a.indexOf(v) === i).map((value) => (
                        <button
                          key={value}
                          onClick={() => setAmount(value.toString())}
                          className={cn(
                            'py-3 rounded-xl text-sm font-medium transition-all border',
                            parseInt(amount) === value
                              ? 'text-white border-transparent'
                              : 'bg-quaternary text-foreground/70 border-transparent hover:border-border'
                          )}
                          style={parseInt(amount) === value ? { backgroundColor: primaryColor } : {}}
                        >
                          {value === remaining ? 'Valor total' : `R$ ${value}`}
                        </button>
                      ))}
                    </div>

                    {/* Custom amount */}
                    <div className="space-y-2">
                      <Label className="text-sm text-subtitle">Ou digite outro valor:</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-subtitle">R$</span>
                        <Input
                          type="number"
                          min="1"
                          max={remaining}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-12 bg-input-bg border-border rounded-xl"
                        />
                      </div>
                      <p className="text-xs text-subtitle">
                        Valor restante para completar: R$ {remaining.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guest Info */}
                <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-4 md:p-6">
                  <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" style={{ color: primaryColor }} />
                    Suas Informações
                  </h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm flex items-center gap-2">
                        <User className="h-4 w-4 text-subtitle" />
                        Nome completo *
                      </Label>
                      <Input
                        id="name"
                        value={guestInfo.name}
                        onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                        placeholder="Seu nome"
                        className="bg-input-bg border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm flex items-center gap-2">
                        <Mail className="h-4 w-4 text-subtitle" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="bg-input-bg border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm flex items-center gap-2">
                        <Phone className="h-4 w-4 text-subtitle" />
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        className="bg-input-bg border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm">
                        Mensagem para o casal (opcional)
                      </Label>
                      <textarea
                        id="message"
                        value={guestInfo.message}
                        onChange={(e) => setGuestInfo({ ...guestInfo, message: e.target.value })}
                        placeholder="Escreva uma mensagem carinhosa..."
                        rows={3}
                        className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleContinueToPayment}
                  disabled={!guestInfo.name || !guestInfo.email || !amount || parseInt(amount) <= 0}
                  className="w-full rounded-full text-white py-6"
                  style={{ backgroundColor: primaryColor }}
                >
                  Continuar para pagamento
                </Button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                {/* Payment Method */}
                <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-4 md:p-6">
                  <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" style={{ color: primaryColor }} />
                    Forma de Pagamento
                  </h2>

                  <div className="space-y-3">
                    <button
                      onClick={() => setPaymentMethod('pix')}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                        paymentMethod === 'pix'
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border/50 hover:border-secondary/50'
                      )}
                      style={paymentMethod === 'pix' ? { borderColor: primaryColor, backgroundColor: `${primaryColor}10` } : {}}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <QrCode className="h-6 w-6" style={{ color: primaryColor }} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium text-foreground">PIX</p>
                        <p className="text-sm text-subtitle">Pagamento instantâneo</p>
                      </div>
                      {paymentMethod === 'pix' && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('credit_card')}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                        paymentMethod === 'credit_card'
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border/50 hover:border-secondary/50'
                      )}
                      style={paymentMethod === 'credit_card' ? { borderColor: primaryColor, backgroundColor: `${primaryColor}10` } : {}}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <CreditCard className="h-6 w-6" style={{ color: primaryColor }} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium text-foreground">Cartão de Crédito</p>
                        <p className="text-sm text-subtitle">Parcele em até 12x</p>
                      </div>
                      {paymentMethod === 'credit_card' && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* PIX Payment */}
                {paymentMethod === 'pix' && (
                  <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-4 md:p-6 text-center">
                    <div
                      className="w-48 h-48 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}10` }}
                    >
                      <QrCode className="h-32 w-32" style={{ color: primaryColor }} />
                    </div>
                    <p className="text-sm text-subtitle mb-4">
                      Escaneie o QR Code acima ou copie o código PIX
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full border-border"
                    >
                      Copiar código PIX
                    </Button>
                  </div>
                )}

                {/* Credit Card Payment */}
                {paymentMethod === 'credit_card' && (
                  <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-4 md:p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Número do Cartão</Label>
                        <Input
                          placeholder="0000 0000 0000 0000"
                          className="bg-input-bg border-border"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm">Validade</Label>
                          <Input
                            placeholder="MM/AA"
                            className="bg-input-bg border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">CVV</Label>
                          <Input
                            placeholder="123"
                            className="bg-input-bg border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Nome no Cartão</Label>
                        <Input
                          placeholder="Como escrito no cartão"
                          className="bg-input-bg border-border"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleProcessPayment}
                  className="w-full rounded-full text-white py-6"
                  style={{ backgroundColor: primaryColor }}
                >
                  {paymentMethod === 'pix' ? 'Já fiz o pagamento' : 'Pagar agora'}
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-1 md:order-2">
            <div className="bg-card rounded-xl md:rounded-2xl border border-border/50 p-4 md:p-6 md:sticky md:top-32">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Gift className="h-5 w-5" style={{ color: primaryColor }} />
                Resumo do Presente
              </h2>

              {/* Gift Info */}
              <div className="flex gap-4 pb-4 border-b border-border/50">
                <img
                  src={selectedGift.imageUrl}
                  alt={selectedGift.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-medium text-foreground">{selectedGift.name}</h3>
                  <p className="text-sm text-subtitle line-clamp-2">{selectedGift.description}</p>
                </div>
              </div>

              {/* Price Details */}
              <div className="py-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-subtitle">Valor do presente</span>
                  <span className="text-foreground">R$ {selectedGift.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-subtitle">Já contribuído</span>
                  <span className="text-foreground">R$ {(selectedGift.contributedAmount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-subtitle">Sua contribuição</span>
                  <span className="font-semibold" style={{ color: primaryColor }}>
                    R$ {parseInt(amount || '0').toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Couple Info */}
              <div
                className="pt-4 border-t border-border/50 flex items-center gap-3 rounded-xl p-3 mt-2"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <Heart className="h-5 w-5" style={{ color: primaryColor }} />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Para {onboarding.partner1Name || 'Noivo'} & {onboarding.partner2Name || 'Noiva'}
                  </p>
                  <p className="text-xs text-subtitle">Seu presente será muito especial!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
