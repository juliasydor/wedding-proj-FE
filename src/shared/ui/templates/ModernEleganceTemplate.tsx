'use client';

import Link from 'next/link';
import { Heart, Calendar, MapPin, Clock, Gift, Mail, Hotel, Camera, ChevronDown, ChevronUp, ExternalLink, Shirt } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';
import type { SiteContent, CustomSection } from '@/entities/wedding/model/store';
import type { DressCode, SectionColors } from '@/shared/types';

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
  weddingSlug?: string;
  dressCode?: DressCode | null;
  sectionColors?: SectionColors | null;
}

// Accordion component for Travel Tips
function TravelAccordion({
  title,
  content,
  primaryColor,
  isOpen,
  onToggle
}: {
  title: string;
  content: string;
  primaryColor: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-gray-800">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 text-sm leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}

const defaultContent: SiteContent = {
  heroTitle: 'Save the Date',
  heroSubtitle: 'Join us to celebrate our love',
  storyTitle: 'A Romance Written in the Stars',
  storyContent: 'We met at a coffee shop in 2018 and have been inseparable ever since. Join us as we celebrate our love with good food, great music, and our favorite people.',
  storyImage: null,
  showStorySection: true,
  weddingPartyTitle: 'The Wedding Party',
  weddingParty: [],
  showWeddingPartySection: false,
  timelineTitle: 'Our Celebration',
  timelineSubtitle: 'Here\'s everything we have planned for the day',
  timelineEvents: [
    { id: '1', title: 'The Ceremony', time: '4:00 PM', description: 'Join us as we say "I do"' },
    { id: '2', title: 'Cocktail Hour', time: '5:00 PM', description: 'Drinks and appetizers' },
    { id: '3', title: 'Dinner & Dancing', time: '6:00 PM', description: 'Dinner followed by dancing' },
    { id: '4', title: 'After Party', time: '10:00 PM', description: 'Keep the celebration going' },
  ],
  showTimelineSection: true,
  ceremonyTitle: 'The Ceremony',
  ceremonyTime: '4:00 PM',
  ceremonyDescription: 'Join us as we say "I do"',
  receptionTitle: 'Reception',
  receptionTime: '6:00 PM',
  receptionDescription: 'Dinner & Dancing',
  countdownTitle: 'Days Until We Say I Do',
  showCountdown: true,
  rsvpTitle: 'Can you make it?',
  rsvpDescription: 'We hope to see you there! Kindly respond by September 1st so we can save you a seat.',
  showRsvpSection: true,
  travelTipsTitle: 'Travel Tips',
  travelTips: [
    { id: '1', title: 'Where to Stay', content: 'We have arranged special rates at nearby hotels.' },
    { id: '2', title: 'Getting Around', content: 'Uber and Lyft are available in the area.' },
    { id: '3', title: 'Local Spots', content: 'Check out these great restaurants and attractions.' },
  ],
  showTravelTipsSection: false,
  accommodationsTitle: 'Travel & Stay',
  accommodationsContent: 'We have room blocks at these nearby hotels.',
  accommodations: [],
  showAccommodationsSection: true,
  giftTitle: 'Gift Registry',
  giftDescription: 'Your presence is the greatest gift. However, if you wish to honor us with a gift, we\'ve registered at a few places.',
  registryLinks: [],
  showGiftSection: true,
  galleryTitle: 'Moments Captured',
  galleryImages: [],
  showGallerySection: true,
  weddingHashtag: '',
  showHashtagSection: false,
  dressCodeTitle: 'Dress Code',
  showDressCodeSection: true,
  footerMessage: 'We can\'t wait to celebrate with you!',
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
  weddingSlug,
  dressCode,
  sectionColors,
}: ModernEleganceTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;
  const [openTip, setOpenTip] = useState<string | null>(null);

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
        'bg-white text-gray-800 overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section - Full width with overlay */}
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
              style={{ background: `linear-gradient(135deg, #1a1a2e 0%, ${primaryColor}30 100%)` }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: getColor('hero', 'overlayColor', '#000000'),
              opacity: (sectionColors?.hero?.overlayOpacity ?? 30) / 100
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p
            className="text-sm uppercase tracking-[0.4em] mb-8 opacity-80"
            style={{ color: getColor('hero', 'subtitleColor', '#FFFFFF') }}
          >
            {content.heroTitle}
          </p>

          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4"
            style={{ color: getColor('hero', 'titleColor', '#FFFFFF') }}
          >
            {partner1Name || 'Sophia'}
          </h1>

          <div
            className="text-4xl md:text-5xl font-serif italic opacity-70 my-2"
            style={{ color: getColor('hero', 'titleColor', '#FFFFFF') }}
          >
            &
          </div>

          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8"
            style={{ color: getColor('hero', 'titleColor', '#FFFFFF') }}
          >
            {partner2Name || 'Alexander'}
          </h1>

          {/* CTA Button */}
          {weddingSlug && (
            <Link
              href={`/wedding/${weddingSlug}/rsvp`}
              className="mt-4 px-8 py-3 rounded-full font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              RSVP Now
            </Link>
          )}

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="h-6 w-6 animate-bounce opacity-70" />
          </div>
        </div>
      </section>

      {/* Date & Location Bar */}
      {(weddingDate || location) && (
        <div
          className="py-6 px-4 border-y border-gray-100"
          style={{ backgroundColor: getColor('dateBar', 'backgroundColor', '#f9fafb') }}
        >
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm">
            {weddingDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" style={{ color: getColor('dateBar', 'accentColor', primaryColor) }} />
                <span style={{ color: getColor('dateBar', 'titleColor', '#1a1a2e') }}>
                  {weddingDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: getColor('dateBar', 'accentColor', primaryColor) }} />
                <span style={{ color: getColor('dateBar', 'titleColor', '#1a1a2e') }}>{location}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section
          className="py-20 px-4"
          style={{ backgroundColor: getColor('story', 'backgroundColor', '#FFFFFF') }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                {content.storyImage ? (
                  <img
                    src={content.storyImage}
                    alt="Our Story"
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div
                    className="w-full h-[400px] rounded-lg"
                    style={{ backgroundColor: `${getColor('story', 'accentColor', primaryColor)}15` }}
                  />
                )}
              </div>

              {/* Text */}
              <div>
                <p
                  className="text-sm uppercase tracking-[0.2em] mb-2"
                  style={{ color: getColor('story', 'accentColor', primaryColor) }}
                >
                  Our Story
                </p>
                <h2
                  className="font-serif text-3xl md:text-4xl mb-6"
                  style={{ color: getColor('story', 'titleColor', '#111827') }}
                >
                  {content.storyTitle}
                </h2>
                <p
                  className="leading-relaxed whitespace-pre-line"
                  style={{ color: getColor('story', 'textColor', '#4b5563') }}
                >
                  {content.storyContent}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {content.showTimelineSection && content.timelineEvents && content.timelineEvents.length > 0 && (
        <section
          className="py-20 px-4"
          style={{ backgroundColor: getColor('timeline', 'backgroundColor', '#f9fafb') }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-sm uppercase tracking-[0.2em] mb-2"
                style={{ color: getColor('timeline', 'accentColor', primaryColor) }}
              >
                The Schedule
              </p>
              <h2
                className="font-serif text-3xl md:text-4xl"
                style={{ color: getColor('timeline', 'titleColor', '#111827') }}
              >
                {content.timelineTitle}
              </h2>
              {content.timelineSubtitle && (
                <p className="mt-3" style={{ color: getColor('timeline', 'textColor', '#4b5563') }}>
                  {content.timelineSubtitle}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
                style={{ backgroundColor: `${getColor('timeline', 'accentColor', primaryColor)}30` }}
              />

              <div className="space-y-8">
                {content.timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={cn(
                      "relative flex items-start gap-8",
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2"
                      style={{ backgroundColor: getColor('timeline', 'accentColor', primaryColor) }}
                    />

                    {/* Content */}
                    <div className={cn(
                      "ml-12 md:ml-0 md:w-1/2 bg-white p-6 rounded-xl shadow-sm",
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    )}>
                      <div
                        className="text-sm font-medium mb-1"
                        style={{ color: getColor('timeline', 'accentColor', primaryColor) }}
                      >
                        {event.time}
                      </div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: getColor('timeline', 'titleColor', '#111827') }}
                      >
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm" style={{ color: getColor('timeline', 'textColor', '#4b5563') }}>
                          {event.description}
                        </p>
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
        <section
          className="py-20 px-4"
          style={{ backgroundColor: getColor('dressCode', 'backgroundColor', '#FFFFFF') }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shirt
                className="h-8 w-8 mx-auto mb-4"
                style={{ color: getColor('dressCode', 'accentColor', primaryColor) }}
              />
              <h2
                className="font-serif text-3xl md:text-4xl"
                style={{ color: getColor('dressCode', 'titleColor', '#111827') }}
              >
                {content.dressCodeTitle || 'Dress Code'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Guests */}
              {dressCode.guests?.enabled && (
                <div
                  className="rounded-xl p-6 text-center"
                  style={{ backgroundColor: getColor('dressCode', 'accentColor', '#f9fafb') }}
                >
                  <h3
                    className="font-semibold mb-4"
                    style={{ color: getColor('dressCode', 'titleColor', '#111827') }}
                  >
                    Guests
                  </h3>
                  {dressCode.guests.palette && dressCode.guests.palette.length > 0 && (
                    <div className="mb-4">
                      <p
                        className="text-xs uppercase tracking-wider mb-2"
                        style={{ color: getColor('dressCode', 'textColor', '#6b7280') }}
                      >
                        Colors
                      </p>
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
                      <p
                        className="text-xs uppercase tracking-wider mb-2"
                        style={{ color: getColor('dressCode', 'textColor', '#6b7280') }}
                      >
                        Dress Length
                      </p>
                      <p className="text-sm" style={{ color: getColor('dressCode', 'textColor', '#4b5563') }}>
                        {dressCode.guests.lengths.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bridesmaids */}
              {dressCode.bridesmaids?.enabled && (
                <div
                  className="rounded-xl p-6 text-center"
                  style={{ backgroundColor: getColor('dressCode', 'accentColor', '#f9fafb') }}
                >
                  <h3
                    className="font-semibold mb-4"
                    style={{ color: getColor('dressCode', 'titleColor', '#111827') }}
                  >
                    Bridesmaids
                  </h3>
                  {dressCode.bridesmaids.palette && dressCode.bridesmaids.palette.length > 0 && (
                    <div className="mb-4">
                      <p
                        className="text-xs uppercase tracking-wider mb-2"
                        style={{ color: getColor('dressCode', 'textColor', '#6b7280') }}
                      >
                        Colors
                      </p>
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
                      <p
                        className="text-xs uppercase tracking-wider mb-2"
                        style={{ color: getColor('dressCode', 'textColor', '#6b7280') }}
                      >
                        Dress Length
                      </p>
                      <p className="text-sm" style={{ color: getColor('dressCode', 'textColor', '#4b5563') }}>
                        {dressCode.bridesmaids.lengths.map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Groomsmen */}
              {dressCode.groomsmen?.enabled && (
                <div
                  className="rounded-xl p-6 text-center"
                  style={{ backgroundColor: getColor('dressCode', 'accentColor', '#f9fafb') }}
                >
                  <h3
                    className="font-semibold mb-4"
                    style={{ color: getColor('dressCode', 'titleColor', '#111827') }}
                  >
                    Groomsmen
                  </h3>
                  {dressCode.groomsmen.palette && dressCode.groomsmen.palette.length > 0 && (
                    <div className="mb-4">
                      <p
                        className="text-xs uppercase tracking-wider mb-2"
                        style={{ color: getColor('dressCode', 'textColor', '#6b7280') }}
                      >
                        Colors
                      </p>
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
                      <p
                        className="text-xs uppercase tracking-wider mb-2"
                        style={{ color: getColor('dressCode', 'textColor', '#6b7280') }}
                      >
                        Style
                      </p>
                      <p className="text-sm" style={{ color: getColor('dressCode', 'textColor', '#4b5563') }}>
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
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
                {content.weddingPartyTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.weddingParty.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      />
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content.showGallerySection && content.galleryImages && content.galleryImages.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
                {content.galleryTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.slice(0, 6).map((img, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-lg",
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  )}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className={cn(
                      "w-full object-cover transition-transform duration-500 hover:scale-110",
                      index === 0 ? "h-64 md:h-full" : "h-48 md:h-64"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Travel & Accommodations Section */}
      {content.showAccommodationsSection && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Travel & Stay Card */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <Hotel className="h-8 w-8 mb-4" style={{ color: primaryColor }} />
                <h3 className="font-serif text-2xl mb-4 text-gray-900">
                  {content.accommodationsTitle}
                </h3>
                <p className="text-gray-600 mb-6">
                  {content.accommodationsContent}
                </p>
                {content.accommodations && content.accommodations.length > 0 && (
                  <div className="space-y-4">
                    {content.accommodations.map((hotel) => (
                      <div key={hotel.id} className="flex gap-4 items-start">
                        {hotel.imageUrl && (
                          <img
                            src={hotel.imageUrl}
                            alt={hotel.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{hotel.name}</h4>
                          {hotel.distance && (
                            <p className="text-xs text-gray-500">{hotel.distance}</p>
                          )}
                          {hotel.bookingUrl && (
                            <a
                              href={hotel.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm inline-flex items-center gap-1 mt-1"
                              style={{ color: primaryColor }}
                            >
                              Book Now <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gift Registry Card */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <Gift className="h-8 w-8 mb-4" style={{ color: primaryColor }} />
                <h3 className="font-serif text-2xl mb-4 text-gray-900">
                  {content.giftTitle}
                </h3>
                <p className="text-gray-600 mb-6">
                  {content.giftDescription}
                </p>
                {weddingSlug && (
                  <Link
                    href={`/wedding/${weddingSlug}/gifts`}
                    className="inline-block px-6 py-2 rounded-full text-sm font-medium transition-all"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor
                    }}
                  >
                    View Registry
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Travel Tips Accordion Section */}
      {content.showTravelTipsSection && content.travelTips && content.travelTips.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-gray-900">
              {content.travelTipsTitle}
            </h2>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {content.travelTips.map((tip) => (
                <TravelAccordion
                  key={tip.id}
                  title={tip.title}
                  content={tip.content}
                  primaryColor={primaryColor}
                  isOpen={openTip === tip.id}
                  onToggle={() => setOpenTip(openTip === tip.id ? null : tip.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section
          className="py-20 px-4"
          style={{ backgroundColor: getColor('rsvp', 'backgroundColor', '#1a1a2e') }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-serif text-3xl md:text-4xl mb-4"
              style={{ color: getColor('rsvp', 'titleColor', '#FFFFFF') }}
            >
              {content.rsvpTitle}
            </h2>
            <p
              className="mb-8 opacity-80"
              style={{ color: getColor('rsvp', 'textColor', '#FFFFFF') }}
            >
              {content.rsvpDescription}
            </p>

            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block px-8 py-3 rounded-full font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: getColor('rsvp', 'buttonColor', primaryColor),
                  color: getColor('rsvp', 'buttonTextColor', '#FFFFFF')
                }}
              >
                RSVP Now
              </Link>
            ) : (
              <button
                className="px-8 py-3 rounded-full font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: getColor('rsvp', 'buttonColor', primaryColor),
                  color: getColor('rsvp', 'buttonTextColor', '#FFFFFF')
                }}
              >
                RSVP Now
              </button>
            )}
          </div>
        </section>
      )}

      {/* Hashtag Section */}
      {content.showHashtagSection && content.weddingHashtag && (
        <section
          className="py-12 px-4"
          style={{ backgroundColor: getColor('hashtag', 'backgroundColor', '#f9fafb') }}
        >
          <div className="text-center">
            <p
              className="text-sm mb-2"
              style={{ color: getColor('hashtag', 'titleColor', '#6b7280') }}
            >
              Share your photos with
            </p>
            <p
              className="text-2xl font-medium"
              style={{ color: getColor('hashtag', 'accentColor', primaryColor) }}
            >
              #{content.weddingHashtag}
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="py-12 text-center"
        style={{ backgroundColor: getColor('footer', 'backgroundColor', '#1a1a2e') }}
      >
        <div
          className="font-serif text-3xl mb-3"
          style={{ color: getColor('footer', 'textColor', '#FFFFFF') }}
        >
          {partner1Name?.charAt(0) || 'S'} & {partner2Name?.charAt(0) || 'A'}
        </div>
        <p
          className="opacity-70 text-sm mb-4"
          style={{ color: getColor('footer', 'textColor', '#FFFFFF') }}
        >
          {content.footerMessage}
        </p>
        <Heart
          className="h-5 w-5 mx-auto opacity-50"
          style={{ color: getColor('footer', 'accentColor', primaryColor) }}
        />
      </footer>
    </div>
  );
}
