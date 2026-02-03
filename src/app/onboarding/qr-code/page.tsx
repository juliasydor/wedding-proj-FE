'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { X, Link2, MessageCircle, Instagram, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { SparkleText } from '@/shared/animations/SparkleText';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';

export default function OnboardingQRCodePage() {
  const t = useTranslations('onboarding.qrCode');
  const router = useRouter();
  const { onboarding, resetOnboarding } = useWeddingStore();

  const weddingUrl = `https://veugravata.com/${onboarding.partner1Name?.toLowerCase()}and${onboarding.partner2Name?.toLowerCase()}/2024`;
  const displayUrl = `${onboarding.partner1Name?.toLowerCase()}and${onboarding.partner2Name?.toLowerCase()}.wedding/2024`;

  const handleDone = () => {
    router.push(ROUTES.dashboard);
  };

  const handleClose = () => {
    router.push(ROUTES.dashboard);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(weddingUrl);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-2xl animate-bounce">💍</div>
      <div className="absolute top-32 right-16 text-xl animate-pulse">✨</div>
      <div className="absolute bottom-40 left-16 text-2xl animate-bounce delay-100">🎉</div>
      <div className="absolute top-40 right-10 text-xl">💜</div>
      <div className="absolute bottom-32 right-20 text-2xl animate-pulse">🥂</div>

      {/* Close button */}
      <IconButton
        variant="ghost"
        onClick={handleClose}
        className="absolute top-4 right-4"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </IconButton>

      {/* Content */}
      <div className="max-w-md w-full text-center space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-heading-2">
            <SparkleText>{t('title')}</SparkleText> 🎉
          </h1>
          <p className="text-subtitle">{t('subtitle')}</p>
        </div>

        {/* QR Code Card */}
        <div className="bg-card rounded-3xl p-6 border border-border">
          <div className="bg-white rounded-2xl p-4 mb-4 inline-block">
            <QRCodeSVG
              value={weddingUrl}
              size={160}
              level="H"
              includeMargin
              fgColor="#261516"
            />
          </div>

          <p className="text-xs font-medium uppercase tracking-wider text-tertiary mb-1">
            {t('scanToPreview')}
          </p>
          <p className="text-foreground font-medium">{displayUrl}</p>

          {/* Created By */}
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                {onboarding.partner1Name?.[0]}{onboarding.partner2Name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-xs text-subtitle">{t('createdBy')}</p>
              <p className="text-sm font-medium text-foreground">
                {onboarding.partner1Name} & {onboarding.partner2Name}
              </p>
            </div>
          </div>
        </div>

        {/* Copy Link Button */}
        <Button
          onClick={copyLink}
          className="w-full h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium text-lg"
        >
          <Link2 className="mr-2 h-5 w-5" />
          {t('copyLink')}
        </Button>

        {/* Share Options */}
        <div className="space-y-4">
          <p className="text-sm text-subtitle">{t('shareVia')}</p>
          <div className="flex justify-center gap-6">
            <button
              type="button"
              className="flex flex-col items-center gap-2 group"
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(weddingUrl)}`, '_blank')}
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-subtitle">{t('whatsapp')}</span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-subtitle">{t('instagram')}</span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center gap-2 group"
              onClick={() => window.open(`mailto:?subject=Our Wedding Website&body=${encodeURIComponent(weddingUrl)}`, '_blank')}
            >
              <div className="w-12 h-12 rounded-full bg-[#4A90D9] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-subtitle">{t('email')}</span>
            </button>
          </div>
        </div>

        {/* Done Button */}
        <Button
          variant="ghost"
          onClick={handleDone}
          className="text-subtitle hover:text-foreground"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
