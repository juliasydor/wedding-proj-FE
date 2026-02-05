'use client';

import { Heart, Calendar, MapPin, Leaf, Gift, Mail, Hotel, Camera, Clock, Quote } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent, CustomSection } from '@/entities/wedding/model/store';

interface RusticGardenTemplateProps {
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

// Custom Section Renderer
function renderCustomSection(section: CustomSection, primaryColor: string) {
  switch (section.type) {
    case 'text':
      return (
        <section key={section.id} className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Leaf className="h-5 w-5 -rotate-45" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl" style={{ color: primaryColor }}>
                {section.title}
              </h2>
              <Leaf className="h-5 w-5 rotate-45" style={{ color: primaryColor }} />
            </div>
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {section.content}
            </p>
          </div>
        </section>
      );
    case 'image':
      return (
        <section key={section.id} className="py-16 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
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
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-md"
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
        <section key={section.id} className="py-16 px-4" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-2xl mx-auto text-center">
            <Leaf className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
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
  heroTitle: 'Save the Date',
  heroSubtitle: 'Join us in the garden',
  storyTitle: 'Nossa História',
  storyContent: 'Uma história de amor que floresceu...',
  storyImage: null,
  showStorySection: true,
  ceremonyTitle: 'Cerimônia',
  ceremonyTime: '16:00',
  ceremonyDescription: 'Garden Chapel',
  receptionTitle: 'Recepção',
  receptionTime: '18:00',
  receptionDescription: 'The Garden Pavilion',
  countdownTitle: 'Days Until We Say I Do',
  showCountdown: true,
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Por favor, confirme sua presença.',
  showRsvpSection: true,
  accommodationsTitle: 'Hospedagem',
  accommodationsContent: 'Hotéis próximos...',
  showAccommodationsSection: false,
  giftTitle: 'Lista de Presentes',
  giftDescription: 'Sua presença é o maior presente!',
  showGiftSection: true,
  galleryTitle: 'Nossa Galeria',
  galleryImages: [],
  showGallerySection: false,
  footerMessage: 'Forever & Always',
};

export function RusticGardenTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#5d7052',
  secondaryColor = '#8fa67a',
  isPreview = false,
  siteContent,
  customSections = [],
}: RusticGardenTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#f5f2eb] text-[#3d3d3d] overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh]">
        {/* Background with overlay */}
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
                background: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}30 50%, #f5f2eb 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-white/60" />
        </div>

        {/* Decorative leaves */}
        <div className="absolute top-0 left-0 opacity-20">
          <Leaf className="h-32 w-32 -rotate-45" style={{ color: primaryColor }} />
        </div>
        <div className="absolute top-0 right-0 opacity-20">
          <Leaf className="h-32 w-32 rotate-45" style={{ color: primaryColor }} />
        </div>
        <div className="absolute bottom-0 left-0 opacity-20">
          <Leaf className="h-24 w-24 rotate-180" style={{ color: primaryColor }} />
        </div>
        <div className="absolute bottom-0 right-0 opacity-20">
          <Leaf className="h-24 w-24 -rotate-180" style={{ color: primaryColor }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-20">
          {/* Wreath decoration */}
          <div
            className="w-48 h-48 rounded-full border-4 flex items-center justify-center mb-8"
            style={{ borderColor: primaryColor }}
          >
            <div className="text-center">
              <Leaf className="h-8 w-8 mx-auto mb-2" style={{ color: primaryColor }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: primaryColor }}>
                {content.heroTitle}
              </p>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl mb-2">
            {partner1Name || 'Partner 1'}
          </h1>

          <div className="flex items-center gap-4 my-4">
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
            <Heart className="h-6 w-6" style={{ color: primaryColor, fill: primaryColor }} />
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
          </div>

          <h1 className="font-serif text-4xl md:text-6xl">
            {partner2Name || 'Partner 2'}
          </h1>

          {weddingDate && (
            <div
              className="mt-10 px-8 py-4 rounded-full"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <p className="font-serif text-xl">
                {weddingDate.toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2 mt-4 opacity-80">
              <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{location}</span>
            </div>
          )}
        </div>
      </section>

      {/* Countdown Section */}
      {content.showCountdown && weddingDate && (
        <section
          className="py-16 px-4 text-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Leaf className="h-6 w-6 -rotate-45" style={{ color: primaryColor }} />
            <h2 className="font-serif text-2xl">{content.countdownTitle}</h2>
            <Leaf className="h-6 w-6 rotate-45" style={{ color: primaryColor }} />
          </div>
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
              <Leaf className="h-5 w-5 -rotate-45" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl" style={{ color: primaryColor }}>
                {content.storyTitle}
              </h2>
              <Leaf className="h-5 w-5 rotate-45" style={{ color: primaryColor }} />
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

      {/* Details Cards */}
      <section className="py-16 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div
            className="p-8 rounded-2xl text-center border-2 bg-white"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <Clock className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h3 className="font-serif text-xl mb-2">{content.ceremonyTitle}</h3>
            <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>{content.ceremonyTime}</p>
            <p className="opacity-70">{content.ceremonyDescription}</p>
          </div>

          <div
            className="p-8 rounded-2xl text-center border-2 bg-white"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <Heart className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h3 className="font-serif text-xl mb-2">{content.receptionTitle}</h3>
            <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>{content.receptionTime}</p>
            <p className="opacity-70">{content.receptionDescription}</p>
          </div>
        </div>
      </section>

      {/* Custom Sections */}
      {customSections.map((section) => renderCustomSection(section, primaryColor))}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section className="py-16 px-4 text-center bg-white">
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
        <section className="py-16 px-4 text-center" style={{ backgroundColor: `${primaryColor}10` }}>
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
        <section className="py-16 px-4 text-center bg-white">
          <div className="max-w-xl mx-auto">
            <Hotel className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4">{content.accommodationsTitle}</h2>
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
              <h2 className="font-serif text-3xl">{content.galleryTitle}</h2>
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
        style={{ backgroundColor: primaryColor }}
      >
        <Leaf className="h-8 w-8 mx-auto mb-3 opacity-60" />
        <p className="mb-2">{content.footerMessage}</p>
        <p className="font-serif text-lg">
          {partner1Name} & {partner2Name}
        </p>
      </footer>
    </div>
  );
}
