'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChevronLeft, Lock, CreditCard, QrCode, Edit2 } from 'lucide-react';
import { useThemeIcon } from '@/shared/hooks/useThemeIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { FormField } from '@/shared/ui/molecules/FormField';
import { cn } from '@/shared/lib/utils';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const router = useRouter();
  const IconImage = useThemeIcon();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
    note: '',
  });

  // Mock gift data
  const gift = {
    name: 'Honey Fund - Trip to Bali',
    price: 150,
    imageUrl: '/gifts/honeymoon.jpg',
    coupleName: 'Sarah & Tom',
  };

  const transactionFee = gift.price * 0.03;
  const total = gift.price + transactionFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to success page
    router.push('/checkout/success');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <IconButton variant="ghost" onClick={handleBack} aria-label="Go back">
            <ChevronLeft className="h-5 w-5" />
          </IconButton>
          <h1 className="font-semibold text-foreground">{t('title')}</h1>
          <Lock className="h-5 w-5 text-secondary" />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Selected Gift */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-tertiary mb-1">
                {t('selectedGift')}
              </p>
              <h2 className="font-semibold text-foreground">{gift.name}</h2>
              <p className="text-secondary font-bold text-lg">${gift.price.toFixed(2)}</p>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-subtitle mt-2 hover:text-foreground"
              >
                <Edit2 className="h-3 w-3" />
                Edit
              </button>
            </div>
            <div className="w-20 h-20 rounded-lg bg-quaternary overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-3xl">🏝️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note for couple */}
        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            {t('leaveNote', { names: gift.coupleName })}
          </label>
          <Input
            placeholder={t('notePlaceholder')}
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="bg-input-bg border-0"
          />
          <div className="flex justify-end mt-1">
            <Image src={IconImage} alt="Véu & Gravata" width={96} height={64} className="w-auto h-auto object-contain" />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">{t('paymentMethod')}</h3>
          <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'pix')}>
            <TabsList className="grid w-full grid-cols-2 bg-card">
              <TabsTrigger
                value="card"
                className={cn(
                  'data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground'
                )}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {t('creditCard')}
              </TabsTrigger>
              <TabsTrigger value="pix">
                <QrCode className="h-4 w-4 mr-2" />
                {t('pix')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4 mt-4">
              <FormField
                name="cardNumber"
                placeholder={t('cardNumber')}
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                leftIcon={<CreditCard className="h-4 w-4" />}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="expiry"
                  placeholder={t('expiry')}
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                />
                <FormField
                  name="cvv"
                  placeholder={t('cvv')}
                  type="password"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  leftIcon={<Lock className="h-4 w-4" />}
                />
              </div>

              <FormField
                name="cardholderName"
                placeholder={t('cardholderName')}
                value={formData.cardholderName}
                onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
              />
            </TabsContent>

            <TabsContent value="pix" className="mt-4">
              <div className="bg-card rounded-xl p-6 text-center border border-border">
                <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-20 w-20 text-primary" />
                </div>
                <p className="text-sm text-subtitle">
                  Scan the QR code with your banking app to complete the payment
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Order Summary */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-subtitle">{t('subtotal')}</span>
            <span className="text-foreground">${gift.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-subtitle">{t('transactionFee', { percent: '3' })}</span>
            <span className="text-foreground">${transactionFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-border">
            <span className="text-foreground">{t('total')}</span>
            <span className="text-secondary">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium text-lg relative overflow-hidden"
          >
            {isLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                {t('sendGift')} • ${total.toFixed(2)}
              </>
            )}
          </Button>
          <p className="text-center text-xs text-subtitle mt-3 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            {t('securePayment')}
          </p>
        </div>
      </form>
    </div>
  );
}
