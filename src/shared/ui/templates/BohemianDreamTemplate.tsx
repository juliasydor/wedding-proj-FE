'use client';

import Link from 'next/link';
import { Heart, MapPin, Sparkles, Sun, Moon, Gift, Mail, Hotel, Camera, Clock, Users, ChevronDown, ExternalLink, Plane } from 'lucide-react';
import { useState } from 'react';
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

const defaultContent: SiteContent = {
  heroTitle: 'Wild Souls in Love',
  heroSubtitle: 'Celebrate With Us',
  storyTitle: 'Our Story',
  storyContent: 'Two free spirits who found each other...',
  storyImage: null,
  showStorySection: true,
  weddingPartyTitle: 'The Tribe',
  weddingParty: [],
  showWeddingPartySection: false,
  timelineTitle: 'The Adventure',
  timelineSubtitle: 'A celebration under the stars',
  timelineEvents: [
    { id: '1', title: 'Welcome Gathering', time: '4:00 PM', description: 'Meet at sunset point' },
    { id: '2', title: 'Ceremony', time: '5:30 PM', description: 'Exchange of vows' },
    { id: '3', title: 'Celebration', time: '7:00 PM', description: 'Feast and dancing' },
  ],
  showTimelineSection: true,
  ceremonyTitle: 'Ceremony',
  ceremonyTime: '5:30 PM',
  ceremonyDescription: 'Under the open sky',
  receptionTitle: 'Celebration',
  receptionTime: '7:00 PM',
  receptionDescription: 'Festival of love',
  countdownTitle: 'Until Our Adventure Begins',
  showCountdown: true,
  rsvpTitle: 'Join Our Journey',
  rsvpDescription: 'Come be part of this adventure.',
  showRsvpSection: true,
  travelTipsTitle: 'Travel Guide',
  travelTips: [],
  showTravelTipsSection: false,
  accommodationsTitle: 'Where to Rest',
  accommodationsContent: 'Unique places to stay near the venue.',
  accommodations: [],
  showAccommodationsSection: false,
  giftTitle: 'Gift Registry',
  giftDescription: 'Your presence is the greatest gift!',
  registryLinks: [],
  showGiftSection: true,
  galleryTitle: 'Captured Moments',
  galleryImages: [],
  showGallerySection: false,
  weddingHashtag: '',
  showHashtagSection: false,
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
  const [openTravelTip, setOpenTravelTip] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'bg-[#fef9f3] text-[#5c4a3d] overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section - Full Width Desert Style */}
      <section className="relative h-screen min-h-[700px]">
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
                background: `linear-gradient(180deg, #fef9f3 0%, ${primaryColor}40 50%, ${secondaryColor}60 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fef9f3] via-transparent to-transparent" />
        </div>

        {/* Decorative Sun/Moon */}
        <div className="absolute top-12 left-12">
          <Sun className="h-16 w-16 opacity-20" style={{ color: primaryColor }} />
        </div>
        <div className="absolute top-12 right-12">
          <Moon className="h-12 w-12 opacity-20" style={{ color: primaryColor }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Sparkle decoration */}
          <div className="flex items-center gap-4 mb-8">
            <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
            <p className="text-sm uppercase tracking-[0.4em]" style={{ color: primaryColor }}>
              {content.heroTitle}
            </p>
            <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-0 italic">
            {partner1Name || 'Partner 1'}
          </h1>

          <div className="flex items-center justify-center my-6">
            <div className="flex items-center gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              ))}
              <Heart
                className="h-10 w-10 mx-6"
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

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl italic">
            {partner2Name || 'Partner 2'}
          </h1>

          {weddingDate && (
            <div className="mt-12">
              <p
                className="text-xl md:text-2xl font-serif"
                style={{ color: primaryColor }}
              >
                {weddingDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2 mt-4">
              <MapPin className="h-5 w-5" style={{ color: primaryColor }} />
              <span className="text-lg opacity-80">{location}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            {weddingSlug && (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="px-8 py-4 rounded-full font-medium text-white transition-all hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                RSVP Now
              </Link>
            )}
            <button
              className="px-8 py-4 rounded-full font-medium bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
              style={{ color: primaryColor }}
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Get Directions
              </span>
            </button>
          </div>
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
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div>
                {content.storyImage ? (
                  <img
                    src={content.storyImage}
                    alt="Our Story"
                    className="w-full h-96 object-cover rounded-3xl shadow-lg"
                  />
                ) : (
                  <div
                    className="w-full h-96 rounded-3xl flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Heart className="h-20 w-20" style={{ color: `${primaryColor}50` }} />
                  </div>
                )}
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
                  <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                    {content.storyTitle}
                  </h2>
                  <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
                </div>
                <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
                  {content.storyContent}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {content.showTimelineSection && content.timelineEvents && content.timelineEvents.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Moon className="h-5 w-5" style={{ color: primaryColor }} />
                <Sun className="h-6 w-6" style={{ color: primaryColor }} />
                <Moon className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <h2 className="font-serif text-3xl italic mb-2" style={{ color: primaryColor }}>
                {content.timelineTitle}
              </h2>
              {content.timelineSubtitle && (
                <p className="text-gray-600">{content.timelineSubtitle}</p>
              )}
            </div>

            {/* Bohemian Timeline - Horizontal on desktop */}
            <div className="relative">
              {/* Horizontal line */}
              <div
                className="hidden md:block absolute top-16 left-0 right-0 h-0.5"
                style={{ backgroundColor: `${primaryColor}40` }}
              />

              <div className="grid md:grid-cols-3 gap-8">
                {content.timelineEvents.map((event, index) => (
                  <div key={event.id} className="text-center">
                    {/* Circle marker */}
                    <div className="relative">
                      <div
                        className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-4 bg-white relative z-10"
                        style={{ borderColor: primaryColor }}
                      >
                        <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
                      </div>
                    </div>

                    {/* Time badge */}
                    <div
                      className="inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {event.time}
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <h3 className="font-serif text-xl mb-1">{event.title}</h3>
                      {event.description && (
                        <p className="text-sm text-gray-600">{event.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
                <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
                <Users className="h-6 w-6" style={{ color: primaryColor }} />
                <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.weddingPartyTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.weddingParty.map((member) => (
                <div key={member.id} className="text-center">
                  <div
                    className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 shadow-lg"
                    style={{ borderColor: `${primaryColor}60` }}
                  >
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-3xl font-serif text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg">{member.name}</h3>
                  <p className="text-sm opacity-70 italic">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Travel Tips Section */}
      {content.showTravelTipsSection && content.travelTips && content.travelTips.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Plane className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic mb-2" style={{ color: primaryColor }}>
                {content.travelTipsTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {content.travelTips.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenTravelTip(openTravelTip === tip.id ? null : tip.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Sun className="h-5 w-5" style={{ color: primaryColor }} />
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
                    <div className="px-6 py-4 border-t border-gray-100">
                      <p className="text-gray-700">{tip.content}</p>
                      {tip.links && tip.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {tip.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:opacity-80"
                              style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
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
                    className="bg-[#fef9f3] rounded-3xl overflow-hidden shadow-sm"
                  >
                    {hotel.imageUrl && (
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-full h-44 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="font-serif text-lg mb-1">{hotel.name}</h3>
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
                  <div key={i} className="bg-[#fef9f3] rounded-3xl p-8 text-center">
                    <Hotel className="h-8 w-8 mx-auto mb-3" style={{ color: `${primaryColor}50` }} />
                    <p className="text-sm text-gray-500">Accommodation {i}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content.showGallerySection && content.galleryImages && content.galleryImages.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Camera className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl italic" style={{ color: primaryColor }}>
                {content.galleryTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-3xl hover:scale-105 transition-transform shadow-md"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section className="py-20 px-4 text-center bg-[#fef9f3]">
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic">{content.rsvpTitle}</h2>
            <p className="mb-8 opacity-80">{content.rsvpDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block px-10 py-4 rounded-full font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                RSVP Now
              </Link>
            ) : (
              <button
                className="px-10 py-4 rounded-full font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                RSVP Now
              </button>
            )}
          </div>
        </section>
      )}

      {/* Gift Section */}
      {content.showGiftSection && (
        <section className="py-20 px-4 text-center" style={{ backgroundColor: `${primaryColor}15` }}>
          <div className="max-w-xl mx-auto">
            <Gift className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl mb-4 italic" style={{ color: primaryColor }}>
              {content.giftTitle}
            </h2>
            <p className="mb-8 opacity-80">{content.giftDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/gifts`}
                className="inline-block px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                View Registry
              </Link>
            ) : (
              <button
                className="px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 border-2"
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
        <section className="py-12 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <Sparkles className="h-4 w-4" style={{ color: primaryColor }} />
              <Camera className="h-5 w-5" style={{ color: primaryColor }} />
              <Sparkles className="h-4 w-4" style={{ color: primaryColor }} />
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
