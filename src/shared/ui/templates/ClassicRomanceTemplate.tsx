'use client';

import Link from 'next/link';
import { Heart, Calendar, MapPin, Clock, Gift, Mail, Hotel, Camera, Quote, ChevronDown, Users, ExternalLink, Shirt } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent, CustomSection } from '@/entities/wedding/model/store';
import type { DressCode, SectionColors } from '@/shared/types';

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
  customSections?: CustomSection[];
  weddingSlug?: string;
  dressCode?: DressCode | null;
  sectionColors?: SectionColors | null;
}

const defaultContent: SiteContent = {
  heroTitle: 'Together with their families',
  heroSubtitle: 'Request the pleasure of your company',
  storyTitle: 'Nossa História',
  storyContent: 'Uma história de amor que começou quando menos esperávamos...',
  storyImage: null,
  showStorySection: true,
  weddingPartyTitle: 'The Wedding Party',
  weddingParty: [],
  showWeddingPartySection: false,
  timelineTitle: 'Schedule of Events',
  timelineSubtitle: 'Join us throughout the celebration',
  timelineEvents: [
    { id: '1', title: 'Ceremony', time: '5:00 PM', description: 'Exchange of vows' },
    { id: '2', title: 'Cocktail Hour', time: '6:00 PM', description: 'Drinks and appetizers' },
    { id: '3', title: 'Reception', time: '7:00 PM', description: 'Dinner and dancing' },
  ],
  showTimelineSection: true,
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
  travelTipsTitle: 'Travel Information',
  travelTips: [],
  showTravelTipsSection: false,
  accommodationsTitle: 'Where to Stay',
  accommodationsContent: 'We have reserved room blocks at these nearby hotels.',
  accommodations: [],
  showAccommodationsSection: false,
  giftTitle: 'Registry',
  giftDescription: 'Your presence is the greatest gift of all.',
  registryLinks: [],
  showGiftSection: true,
  galleryTitle: 'Our Moments',
  galleryImages: [],
  showGallerySection: false,
  weddingHashtag: '',
  showHashtagSection: false,
  dressCodeTitle: 'Dress Code',
  showDressCodeSection: true,
  footerMessage: 'We can\'t wait to celebrate with you!',
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
  customSections = [],
  weddingSlug,
  dressCode,
  sectionColors,
}: ClassicRomanceTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;
  const [openTravelTip, setOpenTravelTip] = useState<string | null>(null);

  // Helper to get section color with fallback to default
  const getColor = (section: keyof SectionColors, key: string, fallback: string) => {
    if (sectionColors && sectionColors[section]) {
      const sectionConfig = sectionColors[section] as Record<string, string | number>;
      if (sectionConfig[key]) {
        return sectionConfig[key] as string;
      }
    }
    return fallback;
  };

  return (
    <div
      className={cn(
        'bg-[#faf8f5] text-[#2c2c2c] overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section with Full Image */}
      <section className="relative h-[80vh] min-h-[600px]">
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
                background: `linear-gradient(180deg, #faf8f5 0%, ${primaryColor}20 50%, ${primaryColor}40 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Decorative Frame */}
          <div className="bg-white/90 backdrop-blur-sm p-10 md:p-16 rounded-sm shadow-xl max-w-xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16" style={{ backgroundColor: getColor('hero', 'accentColor', primaryColor) }} />
              <Heart className="h-5 w-5" style={{ color: getColor('hero', 'accentColor', primaryColor) }} />
              <div className="h-px w-16" style={{ backgroundColor: getColor('hero', 'accentColor', primaryColor) }} />
            </div>

            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: getColor('hero', 'subtitleColor', primaryColor) }}>
              {content.heroTitle}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl mb-2 italic" style={{ color: getColor('hero', 'titleColor', '#2c2c2c') }}>
              {partner1Name || 'Partner 1'}
            </h1>

            <p className="text-2xl font-serif my-3" style={{ color: getColor('hero', 'accentColor', primaryColor) }}>&</p>

            <h1 className="font-serif text-4xl md:text-5xl italic" style={{ color: getColor('hero', 'titleColor', '#2c2c2c') }}>
              {partner2Name || 'Partner 2'}
            </h1>

            {weddingDate && (
              <div className="mt-8 pt-6 border-t" style={{ borderColor: `${primaryColor}30` }}>
                <p className="font-serif text-xl" style={{ color: '#2c2c2c' }}>
                  {weddingDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {location && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                    <span className="text-sm">{location}</span>
                  </div>
                )}
              </div>
            )}

            {/* RSVP Button */}
            {weddingSlug && (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block mt-8 px-8 py-3 font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                RSVP
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Countdown */}
      {content.showCountdown && weddingDate && (
        <section className="py-16 px-4 text-center bg-white">
          <h2 className="font-serif text-2xl mb-8 italic" style={{ color: '#2c2c2c' }}>
            {content.countdownTitle}
          </h2>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-20 px-4" style={{ backgroundColor: getColor('story', 'backgroundColor', `${primaryColor}08`) }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                {content.storyImage ? (
                  <div className="relative">
                    <div
                      className="absolute -inset-4 border-2"
                      style={{ borderColor: getColor('story', 'accentColor', primaryColor) }}
                    />
                    <img
                      src={content.storyImage}
                      alt="Our Story"
                      className="w-full h-80 object-cover relative z-10"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-80 flex items-center justify-center"
                    style={{ backgroundColor: `${getColor('story', 'accentColor', primaryColor)}15` }}
                  >
                    <Heart className="h-16 w-16" style={{ color: `${getColor('story', 'accentColor', primaryColor)}40` }} />
                  </div>
                )}
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12" style={{ backgroundColor: getColor('story', 'accentColor', primaryColor) }} />
                  <Heart className="h-4 w-4" style={{ color: getColor('story', 'accentColor', primaryColor) }} />
                </div>
                <h2 className="font-serif text-3xl mb-6 italic" style={{ color: getColor('story', 'titleColor', primaryColor) }}>
                  {content.storyTitle}
                </h2>
                <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: getColor('story', 'textColor', '#2c2c2c'), opacity: 0.8 }}>
                  {content.storyContent}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {content.showTimelineSection && content.timelineEvents && content.timelineEvents.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: getColor('timeline', 'backgroundColor', '#FFFFFF') }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl italic mb-2" style={{ color: getColor('timeline', 'titleColor', primaryColor) }}>
                {content.timelineTitle}
              </h2>
              {content.timelineSubtitle && (
                <p style={{ color: getColor('timeline', 'textColor', '#4b5563') }}>{content.timelineSubtitle}</p>
              )}
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Center Line */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
                style={{ backgroundColor: `${getColor('timeline', 'accentColor', primaryColor)}30` }}
              />

              <div className="space-y-8">
                {content.timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={cn(
                      'relative grid md:grid-cols-2 gap-8 items-center',
                      index % 2 === 0 ? '' : 'md:direction-rtl'
                    )}
                  >
                    {/* Content */}
                    <div className={cn('text-center md:text-right', index % 2 === 1 && 'md:text-left md:order-2')}>
                      <h3 className="font-serif text-xl mb-1" style={{ color: getColor('timeline', 'titleColor', '#1a1a2e') }}>{event.title}</h3>
                      <p className="text-sm" style={{ color: getColor('timeline', 'textColor', '#4b5563') }}>{event.description}</p>
                    </div>

                    {/* Time Badge - Center */}
                    <div className={cn('flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2', index % 2 === 1 && 'md:order-1')}>
                      <div
                        className="px-4 py-2 rounded-full text-white font-medium text-sm"
                        style={{ backgroundColor: getColor('timeline', 'accentColor', primaryColor) }}
                      >
                        {event.time}
                      </div>
                    </div>

                    {/* Empty space for other side */}
                    <div className={cn('hidden md:block', index % 2 === 1 && 'md:order-3')} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dress Code Section */}
      {content.showDressCodeSection && dressCode && (dressCode.guests?.enabled || dressCode.bridesmaids?.enabled || dressCode.groomsmen?.enabled) && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Shirt className="h-6 w-6" style={{ color: primaryColor }} />
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              </div>
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.dressCodeTitle || 'Dress Code'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {dressCode.guests?.enabled && (
                <div className="p-6 text-center border" style={{ borderColor: `${primaryColor}30` }}>
                  <h3 className="font-serif text-lg mb-4" style={{ color: primaryColor }}>Guests</h3>
                  {dressCode.guests.palette && dressCode.guests.palette.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Colors</p>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {dressCode.guests.palette.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {dressCode.guests.lengths && dressCode.guests.lengths.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Dress Length</p>
                      <p className="text-sm text-gray-700">
                        {dressCode.guests.lengths.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {dressCode.bridesmaids?.enabled && (
                <div className="p-6 text-center border" style={{ borderColor: `${primaryColor}30` }}>
                  <h3 className="font-serif text-lg mb-4" style={{ color: primaryColor }}>Bridesmaids</h3>
                  {dressCode.bridesmaids.palette && dressCode.bridesmaids.palette.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Colors</p>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {dressCode.bridesmaids.palette.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {dressCode.bridesmaids.lengths && dressCode.bridesmaids.lengths.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Dress Length</p>
                      <p className="text-sm text-gray-700">
                        {dressCode.bridesmaids.lengths.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {dressCode.groomsmen?.enabled && (
                <div className="p-6 text-center border" style={{ borderColor: `${primaryColor}30` }}>
                  <h3 className="font-serif text-lg mb-4" style={{ color: primaryColor }}>Groomsmen</h3>
                  {dressCode.groomsmen.palette && dressCode.groomsmen.palette.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Colors</p>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {dressCode.groomsmen.palette.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {dressCode.groomsmen.style && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Style</p>
                      <p className="text-sm text-gray-700">
                        {dressCode.groomsmen.style.charAt(0).toUpperCase() + dressCode.groomsmen.style.slice(1).replace('-', ' ')}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Wedding Party Section */}
      {content.showWeddingPartySection && content.weddingParty && content.weddingParty.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Users className="h-5 w-5" style={{ color: primaryColor }} />
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              </div>
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.weddingPartyTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.weddingParty.map((member) => (
                <div key={member.id} className="text-center">
                  <div
                    className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4"
                    style={{ borderColor: primaryColor }}
                  >
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-2xl font-serif text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg">{member.name}</h3>
                  <p className="text-sm opacity-70">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Travel Tips Section with Accordion */}
      {content.showTravelTipsSection && content.travelTips && content.travelTips.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl italic mb-2" style={{ color: primaryColor }}>
                {content.travelTipsTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {content.travelTips.map((tip) => (
                <div
                  key={tip.id}
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: `${primaryColor}30` }}
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenTravelTip(openTravelTip === tip.id ? null : tip.id)}
                  >
                    <span className="font-medium">{tip.title}</span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 transition-transform',
                        openTravelTip === tip.id && 'rotate-180'
                      )}
                      style={{ color: primaryColor }}
                    />
                  </button>
                  {openTravelTip === tip.id && (
                    <div className="px-6 py-4 bg-gray-50 border-t" style={{ borderColor: `${primaryColor}20` }}>
                      <p className="text-gray-700">{tip.content}</p>
                      {tip.links && tip.links.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tip.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm hover:underline"
                              style={{ color: primaryColor }}
                            >
                              {link.label}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Accommodations Section */}
      {content.showAccommodationsSection && (
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Hotel className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic mb-2" style={{ color: primaryColor }}>
                {content.accommodationsTitle}
              </h2>
              <p className="text-gray-600">{content.accommodationsContent}</p>
            </div>

            {content.accommodations && content.accommodations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {content.accommodations.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border"
                    style={{ borderColor: `${primaryColor}20` }}
                  >
                    {hotel.imageUrl && (
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="font-serif text-lg mb-1">{hotel.name}</h3>
                      {hotel.distance && (
                        <p className="text-xs text-gray-500 mb-2">{hotel.distance}</p>
                      )}
                      {hotel.description && (
                        <p className="text-sm text-gray-600 mb-3">{hotel.description}</p>
                      )}
                      {hotel.priceRange && (
                        <p className="text-sm font-medium" style={{ color: primaryColor }}>
                          {hotel.priceRange}
                        </p>
                      )}
                      {hotel.bookingUrl && (
                        <a
                          href={hotel.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 text-sm hover:underline"
                          style={{ color: primaryColor }}
                        >
                          Book Now <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-8 text-center border"
                    style={{ borderColor: `${primaryColor}20` }}
                  >
                    <Hotel className="h-8 w-8 mx-auto mb-3" style={{ color: `${primaryColor}40` }} />
                    <p className="text-sm text-gray-500">Hotel {i}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content.showGallerySection && content.galleryImages && content.galleryImages.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Camera className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.galleryTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <div key={index} className="relative group overflow-hidden">
                  <div
                    className="absolute inset-2 border-2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: primaryColor }}
                  />
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section
          className="py-20 px-4 text-center"
          style={{ backgroundColor: getColor('rsvp', 'backgroundColor', '#2c2c2c') }}
        >
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4" style={{ color: getColor('rsvp', 'accentColor', primaryColor) }} />
            <h2 className="font-serif text-3xl mb-4 italic" style={{ color: getColor('rsvp', 'titleColor', '#FFFFFF') }}>{content.rsvpTitle}</h2>
            <p className="mb-8 opacity-80" style={{ color: getColor('rsvp', 'textColor', '#FFFFFF') }}>{content.rsvpDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block px-10 py-4 font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: getColor('rsvp', 'buttonColor', primaryColor),
                  color: getColor('rsvp', 'buttonTextColor', '#2c2c2c')
                }}
              >
                RSVP Now
              </Link>
            ) : (
              <button
                className="px-10 py-4 font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: getColor('rsvp', 'buttonColor', primaryColor),
                  color: getColor('rsvp', 'buttonTextColor', '#2c2c2c')
                }}
              >
                RSVP Now
              </button>
            )}
          </div>
        </section>
      )}

      {/* Gift Section */}
      {content.showGiftSection && (
        <section className="py-20 px-4 text-center bg-white">
          <div className="max-w-xl mx-auto">
            <Gift className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic" style={{ color: primaryColor }}>
              {content.giftTitle}
            </h2>
            <p className="mb-8 opacity-80">{content.giftDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/gifts`}
                className="inline-block px-8 py-3 font-semibold transition-all hover:opacity-90 border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                View Registry
              </Link>
            ) : (
              <button
                className="px-8 py-3 font-semibold transition-all hover:opacity-90 border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                View Registry
              </button>
            )}
          </div>
        </section>
      )}

      {/* Hashtag Section */}
      {content.showHashtagSection && content.weddingHashtag && (
        <section className="py-12 px-4" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-gray-600 mb-2">Share your photos with</p>
            <p
              className="font-serif text-2xl"
              style={{ color: primaryColor }}
            >
              #{content.weddingHashtag}
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center" style={{ backgroundColor: getColor('footer', 'backgroundColor', '#2c2c2c') }}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-8" style={{ backgroundColor: getColor('footer', 'accentColor', primaryColor) }} />
          <Heart className="h-5 w-5" style={{ color: getColor('footer', 'accentColor', primaryColor) }} />
          <div className="h-px w-8" style={{ backgroundColor: getColor('footer', 'accentColor', primaryColor) }} />
        </div>
        <p className="mb-2 opacity-90" style={{ color: getColor('footer', 'textColor', '#faf8f5') }}>{content.footerMessage}</p>
        <p className="font-serif italic opacity-80" style={{ color: getColor('footer', 'textColor', '#faf8f5') }}>
          {partner1Name} & {partner2Name}
        </p>
      </footer>
    </div>
  );
}
