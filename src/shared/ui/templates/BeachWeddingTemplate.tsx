'use client';

import { Heart, Calendar, MapPin, Anchor, Shell, Waves, Gift, Mail, Hotel, Camera, Clock, Sun } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent } from '@/entities/wedding/model/store';
import type { CustomSection } from '@/entities/wedding/model/store';

interface BeachWeddingTemplateProps {
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  heroImage?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  isPreview?: boolean;
  siteContent?: Partial<SiteContent>;
  customSections?: CustomSection[];
}

const defaultContent: SiteContent = {
  heroTitle: 'Toes in the Sand',
  heroSubtitle: 'Love in Our Hearts',
  storyTitle: 'Nossa História',
  storyContent: 'Como ondas do mar, nosso amor chegou suavemente...',
  storyImage: null,
  showStorySection: true,
  ceremonyTitle: 'Cerimônia',
  ceremonyTime: '17:00',
  ceremonyDescription: 'Na praia ao pôr do sol',
  receptionTitle: 'Recepção',
  receptionTime: '19:00',
  receptionDescription: 'Festa na areia',
  countdownTitle: 'Until We Say I Do by the Sea',
  showCountdown: true,
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Venha celebrar conosco à beira-mar.',
  showRsvpSection: true,
  accommodationsTitle: 'Hospedagem',
  accommodationsContent: 'Resorts e pousadas próximas...',
  showAccommodationsSection: false,
  giftTitle: 'Lista de Presentes',
  giftDescription: 'Sua presença é o maior presente!',
  showGiftSection: true,
  galleryTitle: 'Nossa Galeria',
  galleryImages: [],
  showGallerySection: false,
  footerMessage: 'Love as Deep as the Ocean',
};

// Custom Section Renderer
function renderCustomSection(section: CustomSection, primaryColor: string) {
  switch (section.type) {
    case 'text':
      return (
        <section key={section.id} className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shell className="h-5 w-5" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl" style={{ color: primaryColor }}>
                {section.title}
              </h2>
              <Shell className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {section.content}
            </p>
          </div>
        </section>
      );
    case 'image':
      return (
        <section key={section.id} className="py-16 px-4" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-4xl mx-auto text-center">
            {section.title && (
              <h2 className="font-serif text-3xl mb-6" style={{ color: primaryColor }}>
                {section.title}
              </h2>
            )}
            {section.imageUrl && (
              <img
                src={section.imageUrl}
                alt={section.title || 'Custom image'}
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
              />
            )}
            {section.content && (
              <p className="mt-4 text-lg opacity-80">{section.content}</p>
            )}
          </div>
        </section>
      );
    case 'quote':
      return (
        <section key={section.id} className="py-16 px-4" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-2xl mx-auto text-center">
            <Waves className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
            <blockquote className="text-2xl font-serif italic" style={{ color: primaryColor }}>
              "{section.content}"
            </blockquote>
            {section.title && (
              <p className="mt-4 text-sm opacity-70">— {section.title}</p>
            )}
          </div>
        </section>
      );
    default:
      return null;
  }
}

export function BeachWeddingTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#0891b2',
  secondaryColor = '#06b6d4',
  isPreview = false,
  siteContent,
  customSections = [],
}: BeachWeddingTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-gradient-to-b from-sky-50 to-cyan-50 text-gray-800 overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section */}
      <section className="relative min-h-[70vh]">
        {/* Background */}
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Wedding"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(180deg, #e0f2fe 0%, ${primaryColor}30 50%, ${secondaryColor}40 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />
        </div>

        {/* Decorative Sun */}
        <div className="absolute top-8 right-8">
          <Sun className="h-16 w-16 opacity-30" style={{ color: '#fbbf24' }} />
        </div>

        {/* Wave decoration at top */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full rotate-180">
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              fill={`${primaryColor}20`}
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-24">
          {/* Anchor decoration */}
          <div className="flex items-center gap-4 mb-6">
            <Anchor className="h-6 w-6" style={{ color: primaryColor }} />
            <p className="text-sm uppercase tracking-[0.4em]" style={{ color: primaryColor }}>
              {content.heroTitle}
            </p>
            <Anchor className="h-6 w-6" style={{ color: primaryColor }} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl mb-2 text-gray-800">
            {partner1Name || 'Partner 1'}
          </h1>

          <div className="flex items-center justify-center my-6">
            <div className="flex items-center gap-4">
              <Waves className="h-6 w-6" style={{ color: primaryColor }} />
              <Heart
                className="h-10 w-10"
                style={{ color: primaryColor, fill: `${primaryColor}50` }}
              />
              <Waves className="h-6 w-6" style={{ color: primaryColor }} />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-gray-800">
            {partner2Name || 'Partner 2'}
          </h1>

          <p className="mt-6 text-lg italic opacity-70">{content.heroSubtitle}</p>

          {weddingDate && (
            <div
              className="mt-10 px-8 py-4 rounded-full border-2"
              style={{ borderColor: primaryColor, backgroundColor: 'white' }}
            >
              <p className="font-serif text-xl" style={{ color: primaryColor }}>
                {weddingDate.toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2 mt-4">
              <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm opacity-80">{location}</span>
            </div>
          )}
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
            <path
              d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,80 L1440,120 L0,120 Z"
              fill={`${primaryColor}15`}
            />
          </svg>
        </div>
      </section>

      {/* Countdown Section */}
      {content.showCountdown && weddingDate && (
        <section className="py-16 px-4 text-center bg-white">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shell className="h-6 w-6" style={{ color: primaryColor }} />
            <h2 className="font-serif text-2xl">{content.countdownTitle}</h2>
            <Shell className="h-6 w-6" style={{ color: primaryColor }} />
          </div>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Dias', hours: 'Horas', minutes: 'Min', seconds: 'Seg' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-16 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Waves className="h-5 w-5" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl" style={{ color: primaryColor }}>
                {content.storyTitle}
              </h2>
              <Waves className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            {content.storyImage && (
              <img
                src={content.storyImage}
                alt="Nossa história"
                className="w-full max-w-md mx-auto h-48 object-cover rounded-2xl mb-6 shadow-lg"
              />
            )}
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {content.storyContent}
            </p>
          </div>
        </section>
      )}

      {/* Details Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div
              className="p-8 rounded-2xl border-2"
              style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}05` }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Clock className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-xl mb-2">{content.ceremonyTitle}</h3>
              <p className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>{content.ceremonyTime}</p>
              <p className="text-sm opacity-70">{content.ceremonyDescription}</p>
            </div>

            <div
              className="p-8 rounded-2xl border-2"
              style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}05` }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Heart className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-xl mb-2">{content.receptionTitle}</h3>
              <p className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>{content.receptionTime}</p>
              <p className="text-sm opacity-70">{content.receptionDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Sections */}
      {customSections.map((section) => renderCustomSection(section, primaryColor))}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section className="py-16 px-4 text-center" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4">{content.rsvpTitle}</h2>
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
        <section className="py-16 px-4 text-center bg-white">
          <div className="max-w-xl mx-auto">
            <Gift className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4">{content.giftTitle}</h2>
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
        <section className="py-16 px-4 text-center" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-xl mx-auto">
            <Hotel className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4">{content.accommodationsTitle}</h2>
            <p className="opacity-80 whitespace-pre-line">{content.accommodationsContent}</p>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content.showGallerySection && content.galleryImages.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Camera className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl">{content.galleryTitle}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-2xl hover:scale-105 transition-transform shadow-md"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="py-12 text-center text-white relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Wave decoration */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path
              d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,25 1440,20 L1440,0 L0,0 Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="relative z-10 pt-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shell className="h-5 w-5 opacity-70" />
            <Heart className="h-6 w-6" />
            <Shell className="h-5 w-5 opacity-70" />
          </div>
          <p className="mb-2 opacity-90">{content.footerMessage}</p>
          <p className="font-serif text-lg">
            {partner1Name} & {partner2Name}
          </p>
        </div>
      </footer>
    </div>
  );
}
