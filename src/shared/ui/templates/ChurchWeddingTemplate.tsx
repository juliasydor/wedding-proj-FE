'use client';

import Link from 'next/link';
import { Heart, MapPin, Cross, Church, Gift, Mail, Hotel, Camera, Clock, BookOpen, Users, ChevronDown, ExternalLink, Shirt } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent } from '@/entities/wedding/model/store';
import type { CustomSection } from '@/entities/wedding/model/store';
import type { DressCode, SectionColors } from '@/shared/types';

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
  weddingSlug?: string;
  dressCode?: DressCode | null;
  sectionColors?: SectionColors | null;
}

const defaultContent: SiteContent = {
  heroTitle: 'United in Faith & Love',
  heroSubtitle: 'Before God and Our Loved Ones',
  storyTitle: 'Our Story',
  storyContent: 'A blessing that God placed in our paths...',
  storyImage: null,
  showStorySection: true,
  weddingPartyTitle: 'Wedding Party',
  weddingParty: [],
  showWeddingPartySection: false,
  timelineTitle: 'Order of Events',
  timelineSubtitle: 'A sacred celebration',
  timelineEvents: [
    { id: '1', title: 'Church Ceremony', time: '3:00 PM', description: 'Holy Matrimony' },
    { id: '2', title: 'Photo Session', time: '4:30 PM', description: 'At the church gardens' },
    { id: '3', title: 'Reception', time: '6:00 PM', description: 'Dinner and celebration' },
  ],
  showTimelineSection: true,
  ceremonyTitle: 'Religious Ceremony',
  ceremonyTime: '3:00 PM',
  ceremonyDescription: 'At the Cathedral',
  receptionTitle: 'Reception',
  receptionTime: '6:00 PM',
  receptionDescription: 'Ballroom',
  countdownTitle: 'Until Our Sacred Day',
  showCountdown: true,
  rsvpTitle: 'RSVP',
  rsvpDescription: 'It will be an honor to have you with us in this sacred moment.',
  showRsvpSection: true,
  travelTipsTitle: 'Travel Information',
  travelTips: [],
  showTravelTipsSection: false,
  accommodationsTitle: 'Accommodations',
  accommodationsContent: 'Hotels near the church.',
  accommodations: [],
  showAccommodationsSection: false,
  giftTitle: 'Gift Registry',
  giftDescription: 'Your presence is the greatest gift!',
  registryLinks: [],
  showGiftSection: true,
  galleryTitle: 'Our Gallery',
  galleryImages: [],
  showGallerySection: false,
  weddingHashtag: '',
  showHashtagSection: false,
  dressCodeTitle: 'Dress Code',
  showDressCodeSection: true,
  footerMessage: 'What God has joined, let no one separate',
};

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
  weddingSlug,
  dressCode,
  sectionColors,
}: ChurchWeddingTemplateProps) {
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
        'bg-[#faf9f7] text-gray-800 overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7] via-transparent to-transparent" />
        </div>

        {/* Decorative arch pattern at top */}
        <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden">
          <div className="flex justify-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 border-t-2 border-l-2 border-r-2 rounded-t-full flex-shrink-0"
                style={{ borderColor: `${primaryColor}20` }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Cross decoration */}
          <div className="mb-8">
            <div
              className="w-24 h-24 rounded-full border-3 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-lg"
              style={{ borderColor: primaryColor }}
            >
              <Cross className="h-12 w-12" style={{ color: primaryColor }} />
            </div>
          </div>

          <p className="text-sm uppercase tracking-[0.4em] mb-6" style={{ color: getColor('hero', 'subtitleColor', primaryColor) }}>
            {content.heroTitle}
          </p>

          <h1 className="font-serif text-5xl md:text-7xl mb-2 italic" style={{ color: getColor('hero', 'titleColor', '#1a1a2e') }}>
            {partner1Name || 'Partner 1'}
          </h1>

          <div className="flex items-center justify-center my-6">
            <div className="flex items-center gap-6">
              <div className="h-px w-20" style={{ backgroundColor: getColor('hero', 'accentColor', primaryColor) }} />
              <Heart
                className="h-8 w-8"
                style={{ color: getColor('hero', 'accentColor', primaryColor), fill: getColor('hero', 'accentColor', primaryColor) }}
              />
              <div className="h-px w-20" style={{ backgroundColor: getColor('hero', 'accentColor', primaryColor) }} />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl italic" style={{ color: getColor('hero', 'titleColor', '#1a1a2e') }}>
            {partner2Name || 'Partner 2'}
          </h1>

          <p className="mt-6 text-lg italic opacity-70" style={{ color: getColor('hero', 'subtitleColor', '#1a1a2e') }}>{content.heroSubtitle}</p>

          {weddingDate && (
            <div className="mt-10">
              <div
                className="px-12 py-6 bg-white/90 backdrop-blur-sm shadow-lg rounded-sm"
              >
                <p className="font-serif text-xl" style={{ color: primaryColor }}>
                  {weddingDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                {location && (
                  <div className="flex items-center justify-center gap-2 mt-3 opacity-80">
                    <Church className="h-4 w-4" style={{ color: primaryColor }} />
                    <span className="text-sm">{location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RSVP Button */}
          {weddingSlug && (
            <Link
              href={`/wedding/${weddingSlug}/rsvp`}
              className="mt-8 px-10 py-4 font-medium text-white transition-all hover:opacity-90 shadow-md"
              style={{ backgroundColor: primaryColor }}
            >
              RSVP
            </Link>
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
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-20 px-4" style={{ backgroundColor: getColor('story', 'backgroundColor', '#FFFFFF') }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 md:order-1">
                {content.storyImage ? (
                  <div className="relative">
                    <div
                      className="absolute -inset-3 border-2"
                      style={{ borderColor: `${getColor('story', 'accentColor', primaryColor)}30` }}
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
                    style={{ backgroundColor: `${getColor('story', 'accentColor', primaryColor)}10` }}
                  >
                    <Cross className="h-16 w-16" style={{ color: `${getColor('story', 'accentColor', primaryColor)}30` }} />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <BookOpen className="h-6 w-6" style={{ color: getColor('story', 'accentColor', primaryColor) }} />
                  <h2 className="font-serif text-3xl italic" style={{ color: getColor('story', 'titleColor', primaryColor) }}>
                    {content.storyTitle}
                  </h2>
                </div>
                <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: getColor('story', 'textColor', '#1a1a2e'), opacity: 0.8 }}>
                  {content.storyContent}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {content.showTimelineSection && content.timelineEvents && content.timelineEvents.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: getColor('timeline', 'backgroundColor', `${primaryColor}08`) }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12" style={{ backgroundColor: getColor('timeline', 'accentColor', primaryColor) }} />
                <Cross className="h-5 w-5" style={{ color: getColor('timeline', 'accentColor', primaryColor) }} />
                <div className="h-px w-12" style={{ backgroundColor: getColor('timeline', 'accentColor', primaryColor) }} />
              </div>
              <h2 className="font-serif text-3xl italic mb-2" style={{ color: getColor('timeline', 'titleColor', primaryColor) }}>
                {content.timelineTitle}
              </h2>
              {content.timelineSubtitle && (
                <p style={{ color: getColor('timeline', 'textColor', '#4b5563') }}>{content.timelineSubtitle}</p>
              )}
            </div>

            {/* Timeline with Cards */}
            <div className="relative">
              {/* Center line */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
                style={{ backgroundColor: `${getColor('timeline', 'accentColor', primaryColor)}30` }}
              />

              <div className="space-y-8">
                {content.timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={cn(
                      'relative flex items-center gap-8',
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    )}
                  >
                    {/* Dot marker */}
                    <div
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center bg-white border-2 z-10"
                      style={{ borderColor: getColor('timeline', 'accentColor', primaryColor) }}
                    >
                      <Cross className="h-4 w-4" style={{ color: getColor('timeline', 'accentColor', primaryColor) }} />
                    </div>

                    {/* Card */}
                    <div
                      className={cn(
                        'w-full md:w-[calc(50%-2rem)] p-6 bg-white rounded-lg shadow-md',
                        index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="px-3 py-1 rounded text-sm font-medium text-white"
                          style={{ backgroundColor: getColor('timeline', 'accentColor', primaryColor) }}
                        >
                          {event.time}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl mb-1 italic" style={{ color: getColor('timeline', 'titleColor', '#1a1a2e') }}>{event.title}</h3>
                      {event.description && (
                        <p className="text-sm" style={{ color: getColor('timeline', 'textColor', '#4b5563') }}>{event.description}</p>
                      )}
                    </div>
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
                <div className="bg-[#faf9f7] rounded-lg p-6 text-center shadow-sm border" style={{ borderColor: `${primaryColor}20` }}>
                  <h3 className="font-serif text-lg mb-4 italic" style={{ color: primaryColor }}>Guests</h3>
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
                <div className="bg-[#faf9f7] rounded-lg p-6 text-center shadow-sm border" style={{ borderColor: `${primaryColor}20` }}>
                  <h3 className="font-serif text-lg mb-4 italic" style={{ color: primaryColor }}>Bridesmaids</h3>
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
                <div className="bg-[#faf9f7] rounded-lg p-6 text-center shadow-sm border" style={{ borderColor: `${primaryColor}20` }}>
                  <h3 className="font-serif text-lg mb-4 italic" style={{ color: primaryColor }}>Groomsmen</h3>
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
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Users className="h-6 w-6" style={{ color: primaryColor }} />
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
                    className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-3 shadow-md"
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
                  <h3 className="font-serif text-lg italic">{member.name}</h3>
                  <p className="text-sm opacity-70">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Travel Tips Section */}
      {content.showTravelTipsSection && content.travelTips && content.travelTips.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
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
                  className="bg-white rounded-lg overflow-hidden shadow-sm border"
                  style={{ borderColor: `${primaryColor}20` }}
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenTravelTip(openTravelTip === tip.id ? null : tip.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Cross className="h-4 w-4" style={{ color: primaryColor }} />
                      <span className="font-medium">{tip.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 transition-transform',
                        openTravelTip === tip.id && 'rotate-180'
                      )}
                      style={{ color: primaryColor }}
                    />
                  </button>
                  {openTravelTip === tip.id && (
                    <div
                      className="px-6 py-4 border-t"
                      style={{ borderColor: `${primaryColor}15` }}
                    >
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
        <section className="py-20 px-4 bg-white">
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
                    className="bg-[#faf9f7] rounded-lg overflow-hidden shadow-sm border"
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
                      <h3 className="font-serif text-lg mb-1 italic">{hotel.name}</h3>
                      {hotel.distance && (
                        <p className="text-xs text-gray-500 mb-2">{hotel.distance}</p>
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
                    className="bg-[#faf9f7] rounded-lg p-8 text-center border"
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
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Camera className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.galleryTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <div key={index} className="relative group">
                  <div
                    className="absolute -inset-1 border rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: `${primaryColor}30` }}
                  />
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full aspect-square object-cover rounded hover:scale-105 transition-transform"
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
          style={{ backgroundColor: getColor('rsvp', 'backgroundColor', primaryColor) }}
        >
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4 opacity-80" style={{ color: getColor('rsvp', 'titleColor', '#FFFFFF') }} />
            <h2 className="font-serif text-3xl mb-4 italic" style={{ color: getColor('rsvp', 'titleColor', '#FFFFFF') }}>{content.rsvpTitle}</h2>
            <p className="mb-8 opacity-80" style={{ color: getColor('rsvp', 'textColor', '#FFFFFF') }}>{content.rsvpDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block px-10 py-4 font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: getColor('rsvp', 'buttonColor', '#FFFFFF'),
                  color: getColor('rsvp', 'buttonTextColor', primaryColor)
                }}
              >
                RSVP Now
              </Link>
            ) : (
              <button
                className="px-10 py-4 font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: getColor('rsvp', 'buttonColor', '#FFFFFF'),
                  color: getColor('rsvp', 'buttonTextColor', primaryColor)
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
        <section className="py-12 px-4" style={{ backgroundColor: `${primaryColor}08` }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
              <Camera className="h-5 w-5" style={{ color: primaryColor }} />
              <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
            </div>
            <p className="text-sm text-gray-600 mb-2">Share your photos with</p>
            <p className="font-serif text-2xl italic" style={{ color: primaryColor }}>
              #{content.weddingHashtag}
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="py-12 text-center relative"
        style={{ backgroundColor: getColor('footer', 'backgroundColor', primaryColor) }}
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: getColor('footer', 'accentColor', secondaryColor) }} />

        <div className="pt-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12" style={{ backgroundColor: `${getColor('footer', 'textColor', '#FFFFFF')}50` }} />
            <Cross className="h-6 w-6 opacity-80" style={{ color: getColor('footer', 'textColor', '#FFFFFF') }} />
            <div className="h-px w-12" style={{ backgroundColor: `${getColor('footer', 'textColor', '#FFFFFF')}50` }} />
          </div>
          <p className="mb-2 opacity-90 font-serif italic" style={{ color: getColor('footer', 'textColor', '#FFFFFF') }}>{content.footerMessage}</p>
          <p className="font-serif text-lg" style={{ color: getColor('footer', 'textColor', '#FFFFFF') }}>
            {partner1Name} & {partner2Name}
          </p>
        </div>
      </footer>
    </div>
  );
}
