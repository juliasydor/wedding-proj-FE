'use client';

import { Heart, Calendar, MapPin, Clock, Gift, Mail, Hotel, Camera } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent } from '@/entities/wedding/model/store';

interface ClassicRomanceTemplateProps {
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  heroImage?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  isPreview?: boolean;
  siteContent?: Partial<SiteContent>;
}

const defaultContent: SiteContent = {
  heroTitle: 'Together with their families',
  heroSubtitle: 'Request the pleasure of your company',
  storyTitle: 'Nossa História',
  storyContent: 'Uma história de amor que começou quando menos esperávamos...',
  storyImage: null,
  showStorySection: true,
  ceremonyTitle: 'Cerimônia',
  ceremonyTime: '17:00',
  ceremonyDescription: 'Igreja Matriz',
  receptionTitle: 'Recepção',
  receptionTime: '19:00',
  receptionDescription: 'Salão de Festas',
  countdownTitle: 'Counting Down to Our Special Day',
  showCountdown: true,
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Por favor, confirme sua presença até 30 dias antes do evento.',
  showRsvpSection: true,
  accommodationsTitle: 'Hospedagem',
  accommodationsContent: 'Sugerimos os seguintes hotéis...',
  showAccommodationsSection: false,
  giftTitle: 'Lista de Presentes',
  giftDescription: 'Sua presença é nosso maior presente!',
  showGiftSection: true,
  galleryTitle: 'Nossa Galeria',
  galleryImages: [],
  showGallerySection: false,
  footerMessage: 'Esperamos você!',
};

export function ClassicRomanceTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#c9a959',
  secondaryColor = '#8b6914',
  isPreview = false,
  siteContent,
}: ClassicRomanceTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#faf8f5] text-[#2c2c2c] overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section with Elegant Frame */}
      <section className="relative py-20 px-4">
        {/* Decorative Border */}
        <div className="absolute inset-8 border-2 pointer-events-none" style={{ borderColor: primaryColor }} />
        <div className="absolute inset-10 border pointer-events-none" style={{ borderColor: `${primaryColor}50` }} />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Ornament Top */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
            <Heart className="h-6 w-6" style={{ color: primaryColor }} />
            <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
          </div>

          <p className="text-sm uppercase tracking-[0.4em] mb-4" style={{ color: primaryColor }}>
            {content.heroTitle}
          </p>

          <h1 className="font-serif text-5xl md:text-6xl mb-2 italic" style={{ color: '#2c2c2c' }}>
            {partner1Name || 'Partner 1'}
          </h1>

          <p className="text-3xl font-serif my-4" style={{ color: primaryColor }}>&</p>

          <h1 className="font-serif text-5xl md:text-6xl italic" style={{ color: '#2c2c2c' }}>
            {partner2Name || 'Partner 2'}
          </h1>

          <p className="text-sm uppercase tracking-[0.3em] mt-8 mb-4" style={{ color: primaryColor }}>
            {content.heroSubtitle}
          </p>

          {weddingDate && (
            <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
              <p className="font-serif text-2xl" style={{ color: '#2c2c2c' }}>
                {weddingDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {location && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{location}</span>
            </div>
          )}

          {/* Ornament Bottom */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="h-px w-24" style={{ backgroundColor: primaryColor }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
            <div className="h-px w-24" style={{ backgroundColor: primaryColor }} />
          </div>
        </div>
      </section>

      {/* Photo Section */}
      {heroImage && (
        <section className="px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-4" style={{ backgroundColor: `${primaryColor}10` }}>
              <img
                src={heroImage}
                alt="Wedding"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-2 border-2 pointer-events-none" style={{ borderColor: primaryColor }} />
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {content.showCountdown && weddingDate && (
        <section className="py-16 px-4 text-center" style={{ backgroundColor: `${primaryColor}08` }}>
          <h2 className="font-serif text-2xl mb-8 italic" style={{ color: '#2c2c2c' }}>
            {content.countdownTitle}
          </h2>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Dias', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-16 px-4" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              <Heart className="h-5 w-5" style={{ color: primaryColor }} />
              <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
            </div>
            <h2 className="font-serif text-3xl mb-6 italic" style={{ color: primaryColor }}>
              {content.storyTitle}
            </h2>
            {content.storyImage && (
              <div className="mb-6 relative p-3 mx-auto max-w-md" style={{ backgroundColor: `${primaryColor}10` }}>
                <img
                  src={content.storyImage}
                  alt="Nossa história"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-1 border pointer-events-none" style={{ borderColor: primaryColor }} />
              </div>
            )}
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {content.storyContent}
            </p>
          </div>
        </section>
      )}

      {/* Ceremony & Reception Section */}
      <section className="py-16 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="text-center p-8 bg-white rounded-lg border" style={{ borderColor: `${primaryColor}30` }}>
            <Clock className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h3 className="font-serif text-2xl mb-2 italic">{content.ceremonyTitle}</h3>
            <p className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>{content.ceremonyTime}</p>
            <p className="opacity-70">{content.ceremonyDescription}</p>
          </div>
          <div className="text-center p-8 bg-white rounded-lg border" style={{ borderColor: `${primaryColor}30` }}>
            <Heart className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h3 className="font-serif text-2xl mb-2 italic">{content.receptionTitle}</h3>
            <p className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>{content.receptionTime}</p>
            <p className="opacity-70">{content.receptionDescription}</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section className="py-16 px-4 text-center bg-white">
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.rsvpTitle}</h2>
            <p className="mb-6 opacity-80">{content.rsvpDescription}</p>
            <button
              className="px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Confirmar Presença
            </button>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {content.showGiftSection && (
        <section className="py-16 px-4 text-center" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-xl mx-auto">
            <Gift className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.giftTitle}</h2>
            <p className="mb-6 opacity-80">{content.giftDescription}</p>
            <button
              className="px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90 border-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Ver Lista de Presentes
            </button>
          </div>
        </section>
      )}

      {/* Accommodations Section */}
      {content.showAccommodationsSection && (
        <section className="py-16 px-4 text-center bg-white">
          <div className="max-w-xl mx-auto">
            <Hotel className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.accommodationsTitle}</h2>
            <p className="opacity-80 whitespace-pre-line">{content.accommodationsContent}</p>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content.showGallerySection && content.galleryImages.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Camera className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic">{content.galleryTitle}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <div key={index} className="relative p-2" style={{ backgroundColor: `${primaryColor}10` }}>
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0.5 border pointer-events-none" style={{ borderColor: primaryColor }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center" style={{ backgroundColor: '#2c2c2c', color: '#faf8f5' }}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
          <Heart className="h-5 w-5" style={{ color: primaryColor }} />
          <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
        </div>
        <p className="mb-2 opacity-90">{content.footerMessage}</p>
        <p className="font-serif italic opacity-80">
          {partner1Name} & {partner2Name}
        </p>
      </footer>
    </div>
  );
}
