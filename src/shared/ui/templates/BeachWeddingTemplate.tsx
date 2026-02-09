'use client';

import Link from 'next/link';
import { Heart, Calendar, MapPin, Anchor, Shell, Plane, Hotel, Gift, Mail, Camera, Clock, ChevronDown, ExternalLink, Utensils } from 'lucide-react';
import { useState } from 'react';
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
  weddingSlug?: string;
}

const defaultContent: SiteContent = {
  heroTitle: 'Join us in',
  heroSubtitle: 'Pack your bags!',
  storyTitle: 'Pack your bags!',
  storyContent: 'We can\'t wait to celebrate with you. We\'re turning everything you need to know about the event into a comprehensive guide that covers all the details. Come join us!',
  storyImage: null,
  showStorySection: true,
  weddingPartyTitle: 'The Wedding Party',
  weddingParty: [],
  showWeddingPartySection: false,
  timelineTitle: 'The Journey',
  timelineSubtitle: '',
  timelineEvents: [
    { id: '1', title: 'Welcome Drinks at Sunset', time: '6:00 PM', description: 'Join us for welcome drinks with stunning views' },
    { id: '2', title: 'The Ceremony', time: '5:00 PM', description: 'Watch us tie the knot' },
    { id: '3', title: 'Reception Dinner', time: '7:00 PM', description: 'Dinner, dancing, and celebration' },
    { id: '4', title: 'Farewell Brunch', time: '10:00 AM', description: 'One last goodbye before we part' },
  ],
  showTimelineSection: true,
  ceremonyTitle: 'The Ceremony',
  ceremonyTime: '5:00 PM',
  ceremonyDescription: 'Beachfront ceremony',
  receptionTitle: 'Reception',
  receptionTime: '7:00 PM',
  receptionDescription: 'Dinner & Dancing',
  countdownTitle: 'Days Until Paradise',
  showCountdown: true,
  rsvpTitle: 'See you at the altar!',
  rsvpDescription: 'Your response means everything to us. Please let us know if you can make it.',
  showRsvpSection: true,
  travelTipsTitle: 'Getting There',
  travelTips: [],
  showTravelTipsSection: true,
  accommodationsTitle: 'Where to Stay',
  accommodationsContent: 'We\'ve secured special rates at these beautiful hotels near the venue.',
  accommodations: [],
  showAccommodationsSection: true,
  giftTitle: 'Registry',
  giftDescription: 'Your presence is the greatest gift of all.',
  registryLinks: [],
  showGiftSection: true,
  galleryTitle: 'Local Gems',
  galleryImages: [],
  showGallerySection: true,
  weddingHashtag: 'WEREGOINGTOGREECE24',
  showHashtagSection: true,
  footerMessage: 'See you at the altar!',
};

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
  weddingSlug,
}: BeachWeddingTemplateProps) {
  const content = { ...defaultContent, ...siteContent };
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-white text-gray-800 overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section - Destination Style */}
      <section className="relative h-[70vh] min-h-[500px]">
        {/* Background */}
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Destination"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(180deg, #e0f2fe 0%, ${primaryColor}40 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/90 mb-2">
            {content.heroTitle}
          </p>
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg mb-4"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
          >
            {location || 'Paradise'}
          </h1>

          {weddingDate && (
            <div
              className="mt-4 px-6 py-2 rounded-full text-sm"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="text-white font-medium">
                {weddingDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            {weddingSlug && (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="px-6 py-3 rounded-full font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Your Reply
                </span>
              </Link>
            )}
            <button
              className="px-6 py-3 rounded-full font-medium bg-white text-gray-800 transition-all hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Directions
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      {content.showStorySection && (
        <section className="py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Shell className="h-8 w-8 mx-auto mb-4" style={{ color: primaryColor }} />
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-gray-900">
              {content.storyTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {content.storyContent}
            </p>
          </div>
        </section>
      )}

      {/* Timeline/Journey Section */}
      {content.showTimelineSection && content.timelineEvents && content.timelineEvents.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div
                className="inline-block px-6 py-2 rounded-full text-sm font-medium mb-6"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                {content.timelineTitle}
              </div>
            </div>

            {/* Timeline with pins */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: `${primaryColor}30` }}
              />

              <div className="space-y-6">
                {content.timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative flex gap-6">
                    {/* Pin/Dot */}
                    <div
                      className="relative z-10 w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Heart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                        >
                          {event.time}
                        </span>
                      </div>
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

      {/* Where to Stay Section */}
      {content.showAccommodationsSection && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900">
                {content.accommodationsTitle}
              </h2>
              <a
                href="#"
                className="text-sm flex items-center gap-1"
                style={{ color: primaryColor }}
              >
                View Full Map <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <p className="text-gray-600 mb-8">{content.accommodationsContent}</p>

            {/* Hotel Cards Grid */}
            {content.accommodations && content.accommodations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {content.accommodations.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    {hotel.imageUrl && (
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                      {hotel.distance && (
                        <p className="text-xs text-gray-500 mb-2">{hotel.distance}</p>
                      )}
                      {hotel.priceRange && (
                        <p className="text-sm" style={{ color: primaryColor }}>{hotel.priceRange}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Placeholder cards */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl p-6 text-center">
                    <Hotel className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500">Hotel {i}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Map placeholder */}
            <div className="mt-8 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Getting There Section */}
      {content.showTravelTipsSection && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Plane className="h-6 w-6" style={{ color: primaryColor }} />
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900">
                {content.travelTipsTitle}
              </h2>
            </div>

            {content.travelTips && content.travelTips.length > 0 ? (
              <div className="space-y-4">
                {content.travelTips.map((tip) => (
                  <div key={tip.id} className="bg-white rounded-xl p-5 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6">
                <p className="text-gray-600">Travel information will be added soon.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Local Gems / Gallery Section */}
      {content.showGallerySection && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-8">
              {content.galleryTitle}
            </h2>

            {content.galleryImages && content.galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {content.galleryImages.map((img, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden group">
                    <img
                      src={img}
                      alt={`Local spot ${index + 1}`}
                      className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-32 md:h-40 flex items-center justify-center">
                    <Utensils className="h-6 w-6 text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {content.showRsvpSection && (
        <section
          className="py-20 px-4 text-white"
          style={{ backgroundColor: '#0c4a6e' }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">{content.rsvpTitle}</h2>
            <p className="text-white/80 mb-8">{content.rsvpDescription}</p>

            {weddingSlug ? (
              <Link
                href={`/wedding/${weddingSlug}/rsvp`}
                className="inline-block px-8 py-3 rounded-full font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                RSVP Now
              </Link>
            ) : (
              <button
                className="px-8 py-3 rounded-full font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                RSVP Now
              </button>
            )}
          </div>
        </section>
      )}

      {/* Hashtag Section */}
      {content.showHashtagSection && content.weddingHashtag && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">TikTok</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Registry</a>
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              #{content.weddingHashtag}
            </span>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="py-12 text-center text-white"
        style={{ backgroundColor: '#0c4a6e' }}
      >
        <Anchor className="h-8 w-8 mx-auto mb-4 opacity-50" />
        <p className="font-serif text-xl mb-2">
          {partner1Name} & {partner2Name}
        </p>
        <p className="text-sm opacity-70">{content.footerMessage}</p>
      </footer>
    </div>
  );
}
