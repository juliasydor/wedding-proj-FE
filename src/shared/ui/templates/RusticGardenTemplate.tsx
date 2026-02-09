'use client';

import Link from 'next/link';
import { Heart, Calendar, MapPin, Leaf, Gift, Mail, Hotel, Camera, Clock, Users, ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';
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
  weddingSlug?: string;
}

const defaultContent: SiteContent = {
  heroTitle: 'Save the Date',
  heroSubtitle: 'Join us in the garden',
  storyTitle: 'Our Story',
  storyContent: 'A love story that blossomed in the most beautiful way...',
  storyImage: null,
  showStorySection: true,
  weddingPartyTitle: 'The Wedding Party',
  weddingParty: [],
  showWeddingPartySection: false,
  timelineTitle: 'The Day\'s Events',
  timelineSubtitle: 'A day filled with love and celebration',
  timelineEvents: [
    { id: '1', title: 'Garden Ceremony', time: '4:00 PM', description: 'Under the oak tree' },
    { id: '2', title: 'Cocktails', time: '5:00 PM', description: 'On the terrace' },
    { id: '3', title: 'Dinner & Dancing', time: '6:00 PM', description: 'In the barn' },
  ],
  showTimelineSection: true,
  ceremonyTitle: 'Ceremony',
  ceremonyTime: '4:00 PM',
  ceremonyDescription: 'Garden Chapel',
  receptionTitle: 'Reception',
  receptionTime: '6:00 PM',
  receptionDescription: 'The Garden Pavilion',
  countdownTitle: 'Days Until We Say I Do',
  showCountdown: true,
  rsvpTitle: 'RSVP',
  rsvpDescription: 'Please respond by the date below.',
  showRsvpSection: true,
  travelTipsTitle: 'Getting There',
  travelTips: [],
  showTravelTipsSection: false,
  accommodationsTitle: 'Where to Stay',
  accommodationsContent: 'Charming accommodations near the venue.',
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
  weddingSlug,
}: RusticGardenTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;
  const [openTravelTip, setOpenTravelTip] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'bg-[#f5f2eb] text-[#3d3d3d] overflow-hidden',
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
                background: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}30 50%, #f5f2eb 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f2eb] via-transparent to-transparent" />
        </div>

        {/* Decorative leaves */}
        <div className="absolute top-4 left-4 opacity-20">
          <Leaf className="h-24 w-24 -rotate-45" style={{ color: primaryColor }} />
        </div>
        <div className="absolute top-4 right-4 opacity-20">
          <Leaf className="h-24 w-24 rotate-45" style={{ color: primaryColor }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Wreath container */}
          <div className="relative">
            {/* Wreath circle */}
            <div
              className="w-80 h-80 md:w-96 md:h-96 rounded-full border-4 flex items-center justify-center bg-white/80 backdrop-blur-sm"
              style={{ borderColor: primaryColor }}
            >
              <div className="text-center px-8">
                <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: primaryColor }}>
                  {content.heroTitle}
                </p>

                <h1 className="font-serif text-3xl md:text-4xl mb-1">
                  {partner1Name || 'Partner 1'}
                </h1>

                <div className="flex items-center justify-center gap-3 my-3">
                  <Leaf className="h-4 w-4 -rotate-45" style={{ color: primaryColor }} />
                  <span className="text-2xl font-serif" style={{ color: primaryColor }}>&</span>
                  <Leaf className="h-4 w-4 rotate-45" style={{ color: primaryColor }} />
                </div>

                <h1 className="font-serif text-3xl md:text-4xl">
                  {partner2Name || 'Partner 2'}
                </h1>

                {weddingDate && (
                  <p className="mt-6 font-serif text-lg" style={{ color: primaryColor }}>
                    {weddingDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                )}

                {location && (
                  <div className="flex items-center justify-center gap-2 mt-2 opacity-80">
                    <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                    <span className="text-sm">{location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Leaf decorations around wreath */}
            <Leaf
              className="absolute -top-3 left-1/2 -translate-x-1/2 h-8 w-8"
              style={{ color: primaryColor }}
            />
            <Leaf
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-8 w-8 rotate-180"
              style={{ color: primaryColor }}
            />
          </div>

          {/* RSVP Button below wreath */}
          {weddingSlug && (
            <Link
              href={`/wedding/${weddingSlug}/rsvp`}
              className="mt-8 px-8 py-3 rounded-full font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              RSVP Now
            </Link>
          )}
        </div>
      </section>

      {/* Countdown Section */}
      {content.showCountdown && weddingDate && (
        <section className="py-16 px-4 text-center bg-white">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Leaf className="h-5 w-5 -rotate-45" style={{ color: primaryColor }} />
            <h2 className="font-serif text-2xl">{content.countdownTitle}</h2>
            <Leaf className="h-5 w-5 rotate-45" style={{ color: primaryColor }} />
          </div>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec' }}
          />
        </section>
      )}

      {/* Our Story Section */}
      {content.showStorySection && (
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <Leaf className="h-5 w-5 -rotate-45" style={{ color: primaryColor }} />
                  <h2 className="font-serif text-3xl" style={{ color: primaryColor }}>
                    {content.storyTitle}
                  </h2>
                  <Leaf className="h-5 w-5 rotate-45" style={{ color: primaryColor }} />
                </div>
                <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
                  {content.storyContent}
                </p>
              </div>

              {/* Image */}
              <div className="order-1 md:order-2">
                {content.storyImage ? (
                  <img
                    src={content.storyImage}
                    alt="Our Story"
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                ) : (
                  <div
                    className="w-full h-80 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Heart className="h-16 w-16" style={{ color: `${primaryColor}50` }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {content.showTimelineSection && content.timelineEvents && content.timelineEvents.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Leaf className="h-5 w-5 -rotate-45" style={{ color: primaryColor }} />
                <Clock className="h-6 w-6" style={{ color: primaryColor }} />
                <Leaf className="h-5 w-5 rotate-45" style={{ color: primaryColor }} />
              </div>
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                {content.timelineTitle}
              </h2>
              {content.timelineSubtitle && (
                <p className="text-gray-600">{content.timelineSubtitle}</p>
              )}
            </div>

            {/* Rustic Timeline */}
            <div className="relative">
              {/* Vine/branch line */}
              <div
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2"
                style={{ backgroundColor: `${primaryColor}40` }}
              />

              <div className="space-y-8">
                {content.timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={cn(
                      'relative flex items-center gap-6',
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    )}
                  >
                    {/* Leaf marker */}
                    <div
                      className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 z-10"
                      style={{ borderColor: primaryColor }}
                    >
                      <Leaf className="h-3 w-3" style={{ color: primaryColor }} />
                    </div>

                    {/* Card */}
                    <div
                      className={cn(
                        'ml-16 md:ml-0 md:w-[calc(50%-2rem)] p-6 bg-white rounded-2xl shadow-sm border',
                        index % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                      )}
                      style={{ borderColor: `${primaryColor}30` }}
                    >
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-2"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {event.time}
                      </span>
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
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Leaf className="h-5 w-5 -rotate-45" style={{ color: primaryColor }} />
                <Users className="h-6 w-6" style={{ color: primaryColor }} />
                <Leaf className="h-5 w-5 rotate-45" style={{ color: primaryColor }} />
              </div>
              <h2 className="font-serif text-3xl" style={{ color: primaryColor }}>
                {content.weddingPartyTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.weddingParty.map((member) => (
                <div key={member.id} className="text-center">
                  <div
                    className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 shadow-md"
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

      {/* Travel Tips Accordion */}
      {content.showTravelTipsSection && content.travelTips && content.travelTips.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                {content.travelTipsTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {content.travelTips.map((tip) => (
                <div
                  key={tip.id}
                  className="border-2 rounded-2xl overflow-hidden"
                  style={{ borderColor: `${primaryColor}30` }}
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenTravelTip(openTravelTip === tip.id ? null : tip.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Leaf className="h-4 w-4" style={{ color: primaryColor }} />
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
                      style={{ backgroundColor: `${primaryColor}05`, borderColor: `${primaryColor}20` }}
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
        <section className="py-20 px-4" style={{ backgroundColor: `${primaryColor}10` }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Hotel className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                {content.accommodationsTitle}
              </h2>
              <p className="text-gray-600">{content.accommodationsContent}</p>
            </div>

            {content.accommodations && content.accommodations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {content.accommodations.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border"
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
                  <div key={i} className="bg-white rounded-2xl p-8 text-center">
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
              <h2 className="font-serif text-3xl" style={{ color: primaryColor }}>
                {content.galleryTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-2xl hover:scale-105 transition-transform shadow-sm"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section
          className="py-20 px-4 text-center text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="max-w-xl mx-auto">
            <Mail className="h-10 w-10 mx-auto mb-4 opacity-80" />
            <h2 className="font-serif text-3xl mb-4">{content.rsvpTitle}</h2>
            <p className="mb-8 opacity-80">{content.rsvpDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block px-10 py-4 rounded-full font-semibold bg-white transition-all hover:opacity-90"
                style={{ color: primaryColor }}
              >
                RSVP Now
              </Link>
            ) : (
              <button
                className="px-10 py-4 rounded-full font-semibold bg-white transition-all hover:opacity-90"
                style={{ color: primaryColor }}
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
            <h2 className="font-serif text-3xl mb-4" style={{ color: primaryColor }}>
              {content.giftTitle}
            </h2>
            <p className="mb-8 opacity-80">{content.giftDescription}</p>
            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/gifts`}
                className="inline-block px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90 border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                View Registry
              </Link>
            ) : (
              <button
                className="px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90 border-2"
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
            <div className="flex items-center justify-center gap-4 mb-2">
              <Leaf className="h-4 w-4 -rotate-45" style={{ color: primaryColor }} />
              <Camera className="h-5 w-5" style={{ color: primaryColor }} />
              <Leaf className="h-4 w-4 rotate-45" style={{ color: primaryColor }} />
            </div>
            <p className="text-sm text-gray-600 mb-2">Share your photos with</p>
            <p className="font-serif text-2xl" style={{ color: primaryColor }}>
              #{content.weddingHashtag}
            </p>
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
