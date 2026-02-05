'use client';

import { Heart, Calendar, MapPin, Clock, Gift, Users, Hotel, Camera, Mail, Type, Quote } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent, CustomSection } from '@/entities/wedding/model/store';

interface ModernEleganceTemplateProps {
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
        <section key={section.id} className="py-16 px-4 bg-[#16213e]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6" style={{ color: primaryColor }}>
              {section.title}
            </h2>
            <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line">
              {section.content}
            </p>
          </div>
        </section>
      );
    case 'image':
      return (
        <section key={section.id} className="py-16 px-4 bg-[#1a1a2e]">
          <div className="max-w-4xl mx-auto text-center">
            {section.title && (
              <h2 className="text-3xl font-serif mb-6" style={{ color: primaryColor }}>
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
        <section key={section.id} className="py-16 px-4 bg-[#0f3460]">
          <div className="max-w-2xl mx-auto text-center">
            <Quote className="h-8 w-8 mx-auto mb-4 opacity-50" style={{ color: primaryColor }} />
            <blockquote className="text-2xl font-serif italic opacity-90">
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
  heroTitle: 'We\'re Getting Married',
  heroSubtitle: 'Join us to celebrate our love',
  storyTitle: 'Nossa História',
  storyContent: 'Uma história de amor que começou quando menos esperávamos. Desde o primeiro momento, soubemos que era especial. Cada dia juntos é uma nova aventura, e mal podemos esperar para começar o próximo capítulo de nossas vidas.',
  storyImage: null,
  showStorySection: true,
  ceremonyTitle: 'Cerimônia',
  ceremonyTime: '17:00',
  ceremonyDescription: 'A cerimônia será realizada ao ar livre, em um cenário romântico cercado pela natureza.',
  receptionTitle: 'Recepção',
  receptionTime: '19:00',
  receptionDescription: 'Celebre conosco com música, dança e boa comida.',
  countdownTitle: 'Contagem Regressiva',
  showCountdown: true,
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Por favor, confirme sua presença até 30 dias antes do evento para nos ajudar com os preparativos.',
  showRsvpSection: true,
  accommodationsTitle: 'Hospedagem',
  accommodationsContent: 'Sugerimos os seguintes hotéis próximos ao local do evento para sua comodidade. Entre em contato conosco caso precise de ajuda com reservas.',
  showAccommodationsSection: false,
  giftTitle: 'Lista de Presentes',
  giftDescription: 'Sua presença é o nosso maior presente! Mas se desejar nos presentear, preparamos uma lista especial com itens para nosso novo lar.',
  showGiftSection: true,
  galleryTitle: 'Nossa Galeria',
  galleryImages: [],
  showGallerySection: false,
  footerMessage: 'Mal podemos esperar para celebrar com você!',
};

export function ModernEleganceTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#ea2e5b',
  secondaryColor = '#F1557C',
  isPreview = false,
  siteContent,
  customSections = [],
}: ModernEleganceTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#1a1a2e] text-white overflow-hidden',
        isPreview ? 'rounded-xl scale-100' : 'min-h-screen'
      )}
      style={{ '--primary': primaryColor, '--secondary': secondaryColor } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        {/* Background */}
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Wedding"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-6 opacity-80">{content.heroTitle}</p>

          <h1 className="font-serif text-5xl md:text-7xl mb-4">
            {partner1Name || 'Partner 1'}
            <span className="mx-4" style={{ color: primaryColor }}>&</span>
            {partner2Name || 'Partner 2'}
          </h1>

          <p className="text-lg opacity-80 mb-6">{content.heroSubtitle}</p>

          {weddingDate && (
            <div className="flex items-center gap-3 mt-2 text-lg opacity-90">
              <Calendar className="h-5 w-5" style={{ color: primaryColor }} />
              <span>
                {weddingDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-3 mt-3 opacity-80">
              <MapPin className="h-5 w-5" style={{ color: primaryColor }} />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a2e] to-transparent"
        />
      </section>

      {/* Countdown Section */}
      {content.showCountdown && weddingDate && (
        <section className="py-16 px-4 text-center bg-[#1a1a2e]">
          <h2 className="text-2xl font-serif mb-8 opacity-80">{content.countdownTitle}</h2>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Dias', hours: 'Horas', minutes: 'Min', seconds: 'Seg' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-16 px-4 bg-[#16213e]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-8" style={{ color: primaryColor }}>
              {content.storyTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {content.storyImage && (
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={content.storyImage}
                    alt="Nossa história"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              <div className={content.storyImage ? '' : 'md:col-span-2 text-center'}>
                <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line">
                  {content.storyContent}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ceremony & Reception Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30` }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Clock className="h-8 w-8" style={{ color: primaryColor }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{content.ceremonyTitle}</h3>
            <p className="text-2xl font-bold mb-3" style={{ color: primaryColor }}>
              {content.ceremonyTime}
            </p>
            <p className="opacity-70 text-sm">{content.ceremonyDescription}</p>
          </div>

          <div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Heart className="h-8 w-8" style={{ color: primaryColor }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{content.receptionTitle}</h3>
            <p className="text-2xl font-bold mb-3" style={{ color: primaryColor }}>
              {content.receptionTime}
            </p>
            <p className="opacity-70 text-sm">{content.receptionDescription}</p>
          </div>
        </div>
      </section>

      {/* Custom Sections */}
      {customSections.map((section) => renderCustomSection(section, primaryColor))}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section className="py-16 px-4 bg-[#0f3460]">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Mail className="h-8 w-8" style={{ color: primaryColor }} />
            </div>
            <h2 className="text-3xl font-serif mb-4">{content.rsvpTitle}</h2>
            <p className="text-lg opacity-80 mb-8">{content.rsvpDescription}</p>
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
        <section className="py-16 px-4 bg-[#1a1a2e]">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Gift className="h-8 w-8" style={{ color: primaryColor }} />
            </div>
            <h2 className="text-3xl font-serif mb-4">{content.giftTitle}</h2>
            <p className="text-lg opacity-80 mb-8">{content.giftDescription}</p>
            <button
              className="px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Ver Lista de Presentes
            </button>
          </div>
        </section>
      )}

      {/* Accommodations Section */}
      {content.showAccommodationsSection && (
        <section className="py-16 px-4 bg-[#16213e]">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Hotel className="h-8 w-8" style={{ color: primaryColor }} />
            </div>
            <h2 className="text-3xl font-serif mb-4">{content.accommodationsTitle}</h2>
            <p className="text-lg opacity-80 whitespace-pre-line">{content.accommodationsContent}</p>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content.showGallerySection && content.galleryImages.length > 0 && (
        <section className="py-16 px-4 bg-[#1a1a2e]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Camera className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-3xl font-serif">{content.galleryTitle}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden aspect-square">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center bg-[#0f3460]">
        <Heart className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
        <p className="text-lg opacity-90 mb-2">{content.footerMessage}</p>
        <p className="opacity-60 text-sm">
          {partner1Name} & {partner2Name}
        </p>
      </footer>
    </div>
  );
}
