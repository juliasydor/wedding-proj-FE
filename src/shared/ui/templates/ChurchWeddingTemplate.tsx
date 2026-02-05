'use client';

import { Heart, Calendar, MapPin, Cross, Church, Gift, Mail, Hotel, Camera, Clock, BookOpen } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent } from '@/entities/wedding/model/store';
import type { CustomSection } from '@/entities/wedding/model/store';

interface ChurchWeddingTemplateProps {
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
  heroTitle: 'United in Faith & Love',
  heroSubtitle: 'Before God and Our Loved Ones',
  storyTitle: 'Nossa História',
  storyContent: 'Uma bênção que Deus colocou em nossos caminhos...',
  storyImage: null,
  showStorySection: true,
  ceremonyTitle: 'Cerimônia Religiosa',
  ceremonyTime: '15:00',
  ceremonyDescription: 'Igreja Matriz',
  receptionTitle: 'Recepção',
  receptionTime: '18:00',
  receptionDescription: 'Salão de Festas',
  countdownTitle: 'Até o Nosso Grande Dia',
  showCountdown: true,
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Será uma honra ter você conosco neste momento sagrado.',
  showRsvpSection: true,
  accommodationsTitle: 'Hospedagem',
  accommodationsContent: 'Hotéis próximos à igreja...',
  showAccommodationsSection: false,
  giftTitle: 'Lista de Presentes',
  giftDescription: 'Sua presença é o maior presente!',
  showGiftSection: true,
  galleryTitle: 'Nossa Galeria',
  galleryImages: [],
  showGallerySection: false,
  footerMessage: 'O que Deus uniu, o homem não separe',
};

// Custom Section Renderer
function renderCustomSection(section: CustomSection, primaryColor: string) {
  switch (section.type) {
    case 'text':
      return (
        <section key={section.id} className="py-16 px-4 bg-[#faf9f7]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              <Cross className="h-5 w-5" style={{ color: primaryColor }} />
              <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
            </div>
            <h2 className="font-serif text-3xl mb-4" style={{ color: primaryColor }}>
              {section.title}
            </h2>
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {section.content}
            </p>
          </div>
        </section>
      );
    case 'image':
      return (
        <section key={section.id} className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            {section.title && (
              <h2 className="font-serif text-3xl mb-6" style={{ color: primaryColor }}>
                {section.title}
              </h2>
            )}
            {section.imageUrl && (
              <div className="relative">
                <div
                  className="absolute inset-0 border-8 rounded-lg"
                  style={{ borderColor: `${primaryColor}20` }}
                />
                <img
                  src={section.imageUrl}
                  alt={section.title || 'Custom image'}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-xl"
                />
              </div>
            )}
            {section.content && (
              <p className="mt-4 text-lg opacity-80">{section.content}</p>
            )}
          </div>
        </section>
      );
    case 'quote':
      return (
        <section key={section.id} className="py-16 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
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

export function ChurchWeddingTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#722f37',
  secondaryColor = '#8b3a42',
  isPreview = false,
  siteContent,
  customSections = [],
}: ChurchWeddingTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#faf9f7] text-gray-800 overflow-hidden',
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
                background: `linear-gradient(180deg, #faf9f7 0%, ${primaryColor}15 50%, ${primaryColor}25 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
        </div>

        {/* Decorative arch pattern at top */}
        <div className="absolute top-0 left-0 right-0 h-8 flex justify-center">
          <div className="flex">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 border-t-2 border-l-2 border-r-2 rounded-t-full"
                style={{ borderColor: `${primaryColor}30` }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-24">
          {/* Cross decoration */}
          <div className="mb-8">
            <div
              className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: primaryColor, backgroundColor: 'white' }}
            >
              <Cross className="h-10 w-10" style={{ color: primaryColor }} />
            </div>
          </div>

          <p className="text-sm uppercase tracking-[0.4em] mb-4" style={{ color: primaryColor }}>
            {content.heroTitle}
          </p>

          <h1 className="font-serif text-5xl md:text-7xl mb-2 italic">
            {partner1Name || 'Partner 1'}
          </h1>

          <div className="flex items-center justify-center my-6">
            <div className="flex items-center gap-6">
              <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
              <Heart
                className="h-8 w-8"
                style={{ color: primaryColor, fill: primaryColor }}
              />
              <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl italic">
            {partner2Name || 'Partner 2'}
          </h1>

          <p className="mt-6 text-lg italic opacity-70">{content.heroSubtitle}</p>

          {weddingDate && (
            <div className="mt-10">
              <div
                className="px-10 py-5 bg-white shadow-lg"
                style={{
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                }}
              >
                <p className="font-serif text-xl" style={{ color: primaryColor }}>
                  {weddingDate.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2 mt-6">
              <Church className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm opacity-80">{location}</span>
            </div>
          )}
        </div>

        {/* Gothic arch decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path
              d="M0,80 L0,40 Q180,0 360,40 Q540,80 720,40 Q900,0 1080,40 Q1260,80 1440,40 L1440,80 Z"
              fill="#faf9f7"
            />
          </svg>
        </div>
      </section>

      {/* Countdown Section */}
      {content.showCountdown && weddingDate && (
        <section className="py-16 px-4 text-center bg-[#faf9f7]">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
            <Cross className="h-5 w-5" style={{ color: primaryColor }} />
            <h2 className="font-serif text-2xl">{content.countdownTitle}</h2>
            <Cross className="h-5 w-5" style={{ color: primaryColor }} />
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
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
              <BookOpen className="h-6 w-6" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.storyTitle}
              </h2>
              <BookOpen className="h-6 w-6" style={{ color: primaryColor }} />
            </div>
            {content.storyImage && (
              <div className="relative w-full max-w-md mx-auto mb-6">
                <div
                  className="absolute -inset-2 border-2 rounded-lg"
                  style={{ borderColor: `${primaryColor}30` }}
                />
                <img
                  src={content.storyImage}
                  alt="Nossa história"
                  className="w-full h-48 object-cover rounded-lg relative z-10"
                />
              </div>
            )}
            <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
              {content.storyContent}
            </p>
          </div>
        </section>
      )}

      {/* Details Section */}
      <section className="py-16 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
                style={{ borderColor: primaryColor }}
              >
                <Church className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-xl mb-2 italic">{content.ceremonyTitle}</h3>
              <p className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>{content.ceremonyTime}</p>
              <p className="text-sm opacity-70">{content.ceremonyDescription}</p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
                style={{ borderColor: primaryColor }}
              >
                <Heart className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-xl mb-2 italic">{content.receptionTitle}</h3>
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
        <section className="py-16 px-4 text-center bg-white">
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.rsvpTitle}</h2>
            <p className="mb-6 opacity-80">{content.rsvpDescription}</p>
            <button
              className="px-8 py-3 rounded-sm font-semibold text-white transition-all hover:opacity-90"
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
              className="px-8 py-3 rounded-sm font-semibold transition-all hover:opacity-90 border-2"
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
                <div key={index} className="relative">
                  <div
                    className="absolute -inset-1 border rounded"
                    style={{ borderColor: `${primaryColor}20` }}
                  />
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full aspect-square object-cover rounded relative z-10 hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="py-12 text-center text-white relative"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: secondaryColor }} />

        <div className="pt-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-white/50" />
            <Cross className="h-6 w-6 opacity-80" />
            <div className="h-px w-12 bg-white/50" />
          </div>
          <p className="mb-2 opacity-90 font-serif italic">{content.footerMessage}</p>
          <p className="font-serif text-lg">
            {partner1Name} & {partner2Name}
          </p>
        </div>
      </footer>
    </div>
  );
}
