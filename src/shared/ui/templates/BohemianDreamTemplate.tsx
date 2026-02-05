'use client';

import Link from 'next/link';
import { Heart, Calendar, MapPin, Sparkles, Sun, Moon, Gift, Mail, Hotel, Camera, Clock, Quote } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent, CustomSection } from '@/entities/wedding/model/store';

interface BohemianDreamTemplateProps {
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
  weddingSlug?: string;
}

// Custom Section Renderer
function renderCustomSection(section: CustomSection, primaryColor: string) {
  switch (section.type) {
    case 'text':
      return (
        <section key={section.id} className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {section.title}
              </h2>
              <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {section.content}
            </p>
          </div>
        </section>
      );
    case 'image':
      return (
        <section key={section.id} className="py-16 px-4" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-4xl mx-auto text-center">
            {section.title && (
              <h2 className="font-serif text-3xl mb-6 italic" style={{ color: primaryColor }}>
                {section.title}
              </h2>
            )}
            {section.imageUrl && (
              <img
                src={section.imageUrl}
                alt={section.title || 'Custom image'}
                className="w-full max-w-2xl mx-auto rounded-2xl"
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
        <section key={section.id} className="py-16 px-4 bg-[#fef9f3]">
          <div className="max-w-2xl mx-auto text-center">
            <Sun className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
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

const defaultContent: SiteContent = {
  heroTitle: 'Wild Souls in Love',
  heroSubtitle: 'Celebrate With Us',
  storyTitle: 'Nossa História',
  storyContent: 'Duas almas livres que se encontraram...',
  storyImage: null,
  showStorySection: true,
  ceremonyTitle: 'Cerimônia',
  ceremonyTime: '16:00',
  ceremonyDescription: 'Ao ar livre',
  receptionTitle: 'Recepção',
  receptionTime: '18:00',
  receptionDescription: 'Festival de amor',
  countdownTitle: 'Until Our Adventure Begins',
  showCountdown: true,
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Venha fazer parte desta aventura.',
  showRsvpSection: true,
  accommodationsTitle: 'Hospedagem',
  accommodationsContent: 'Opções de hospedagem...',
  showAccommodationsSection: false,
  giftTitle: 'Lista de Presentes',
  giftDescription: 'Sua presença é o maior presente!',
  showGiftSection: true,
  galleryTitle: 'Nossa Galeria',
  galleryImages: [],
  showGallerySection: false,
  footerMessage: 'Two Wild Hearts, One Adventure',
};

export function BohemianDreamTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#d4a574',
  secondaryColor = '#c4956a',
  isPreview = false,
  siteContent,
  customSections = [],
  weddingSlug,
}: BohemianDreamTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#fef9f3] text-[#5c4a3d] overflow-hidden',
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
                background: `linear-gradient(180deg, #fef9f3 0%, ${primaryColor}30 50%, ${secondaryColor}40 100%)`,
              }}
            />
          )}
        </div>

        {/* Decorative Sun/Moon */}
        <div className="absolute top-8 left-8">
          <Sun className="h-12 w-12 opacity-30" style={{ color: primaryColor }} />
        </div>
        <div className="absolute top-8 right-8">
          <Moon className="h-10 w-10 opacity-30" style={{ color: primaryColor }} />
        </div>

        {/* Macrame-style top decoration */}
        <div className="absolute top-0 left-0 right-0 h-20 flex justify-center">
          <div className="flex gap-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-b rounded-full"
                style={{
                  height: `${40 + Math.sin(i * 0.5) * 20}px`,
                  backgroundColor: `${primaryColor}${40 + i * 2}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-24">
          {/* Sparkle decoration */}
          <div className="flex items-center gap-4 mb-6">
            <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
            <p className="text-sm uppercase tracking-[0.4em]" style={{ color: primaryColor }}>
              {content.heroTitle}
            </p>
            <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl mb-0 italic">
            {partner1Name || 'Partner 1'}
          </h1>

          <div className="flex items-center justify-center my-6">
            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              ))}
              <Heart
                className="h-8 w-8 mx-4"
                style={{ color: primaryColor, fill: `${primaryColor}50` }}
              />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              ))}
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl italic">
            {partner2Name || 'Partner 2'}
          </h1>

          {weddingDate && (
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.3em] mb-2 opacity-70">
                {content.heroSubtitle}
              </p>
              <p
                className="text-2xl font-serif"
                style={{ color: primaryColor }}
              >
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
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
              fill="#fef9f3"
            />
          </svg>
        </div>
      </section>

      {/* Countdown Section */}
      {content.showCountdown && weddingDate && (
        <section className="py-16 px-4 text-center bg-[#fef9f3]">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
            />
            <Sun className="h-6 w-6" style={{ color: primaryColor }} />
            <div
              className="h-px w-16"
              style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
            />
          </div>
          <h2 className="font-serif text-2xl mb-8 italic opacity-80">
            {content.countdownTitle}
          </h2>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Dias', hours: 'Horas', minutes: 'Min', seconds: 'Seg' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.storyTitle}
              </h2>
              <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
            {content.storyImage && (
              <img
                src={content.storyImage}
                alt="Nossa história"
                className="w-full max-w-md mx-auto h-48 object-cover rounded-2xl mb-6"
              />
            )}
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {content.storyContent}
            </p>
          </div>
        </section>
      )}

      {/* Details Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="p-8 bg-white rounded-2xl">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}30` }}
              >
                <Clock className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-xl mb-2">{content.ceremonyTitle}</h3>
              <p className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>{content.ceremonyTime}</p>
              <p className="text-sm opacity-70">{content.ceremonyDescription}</p>
            </div>

            <div className="p-8 bg-white rounded-2xl">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}30` }}
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
        <section className="py-16 px-4 text-center bg-[#fef9f3]">
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.rsvpTitle}</h2>
            <p className="mb-6 opacity-80">{content.rsvpDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Confirmar Presença
              </Link>
            ) : (
              <button
                className="px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Confirmar Presença
              </button>
            )}
          </div>
        </section>
      )}

      {/* Gift Section */}
      {content.showGiftSection && (
        <section className="py-16 px-4 text-center" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-xl mx-auto">
            <Gift className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.giftTitle}</h2>
            <p className="mb-6 opacity-80">{content.giftDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/gifts`}
                className="inline-block px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90 border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Ver Lista de Presentes
              </Link>
            ) : (
              <button
                className="px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90 border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Ver Lista de Presentes
              </button>
            )}
          </div>
        </section>
      )}

      {/* Accommodations Section */}
      {content.showAccommodationsSection && (
        <section className="py-16 px-4 text-center bg-[#fef9f3]">
          <div className="max-w-xl mx-auto">
            <Hotel className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.accommodationsTitle}</h2>
            <p className="opacity-80 whitespace-pre-line">{content.accommodationsContent}</p>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content.showGallerySection && content.galleryImages.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Camera className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic">{content.galleryTitle}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-2xl hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="py-12 text-center text-white"
        style={{ backgroundColor: '#5c4a3d' }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
          <Heart className="h-6 w-6" style={{ color: primaryColor }} />
          <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
        </div>
        <p className="mb-2">{content.footerMessage}</p>
        <p className="font-serif text-lg italic">
          {partner1Name} & {partner2Name}
        </p>
      </footer>
    </div>
  );
}
