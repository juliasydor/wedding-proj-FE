'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Check, Home } from 'lucide-react';
import { useThemeIcon } from '@/shared/hooks/useThemeIcon';
import { Button } from '@/components/ui/button';
import { SparkleText } from '@/shared/animations/SparkleText';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const IconImage = useThemeIcon();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      {/* Success Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Check className="h-8 w-8 text-secondary-foreground" />
          </div>
        </div>
        <Image src={IconImage} alt="Véu & Gravata" width={140} height={93} className="absolute -top-6 -right-6 w-auto h-auto object-contain animate-bounce" />
      </div>

      {/* Message */}
      <h1 className="text-heading-2 mb-4">
        <SparkleText>Thank You!</SparkleText>
      </h1>
      <p className="text-subtitle text-lg max-w-sm mb-8">
        Your gift has been sent successfully. Sarah & Tom will be so happy to receive your
        contribution!
      </p>

      {/* Details */}
      <div className="bg-card rounded-xl p-6 border border-border w-full max-w-sm mb-8">
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-subtitle">Gift</span>
            <span className="text-foreground font-medium">Honey Fund - Trip to Bali</span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtitle">Amount</span>
            <span className="text-secondary font-bold">$154.50</span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtitle">Status</span>
            <span className="text-green-500 font-medium flex items-center gap-1">
              <Check className="h-4 w-4" />
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 w-full max-w-sm">
        <Button
          onClick={() => router.push('/')}
          className="w-full h-12 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-full h-12 rounded-full border-border"
        >
          Send Another Gift
        </Button>
      </div>
    </div>
  );
}
