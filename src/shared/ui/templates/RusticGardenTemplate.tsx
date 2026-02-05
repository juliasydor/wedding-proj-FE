'use client';

import { Heart, Calendar, MapPin, Leaf } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';

interface RusticGardenTemplateProps {
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  heroImage?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  isPreview?: boolean;
}

export function RusticGardenTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#5d7052',
  secondaryColor = '#8fa67a',
  isPreview = false,
}: RusticGardenTemplateProps) {
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
                Save the Date
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
      {weddingDate && (
        <section
          className="py-16 px-4 text-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Leaf className="h-6 w-6 -rotate-45" style={{ color: primaryColor }} />
            <h2 className="font-serif text-2xl">Days Until We Say I Do</h2>
            <Leaf className="h-6 w-6 rotate-45" style={{ color: primaryColor }} />
          </div>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' }}
          />
        </section>
      )}

      {/* Details Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div
            className="p-8 rounded-2xl text-center border-2"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <Calendar className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h3 className="font-serif text-xl mb-2">Ceremony</h3>
            <p className="opacity-70">Saturday at 4:00 PM</p>
            <p className="text-sm opacity-50 mt-2">Garden Chapel</p>
          </div>

          <div
            className="p-8 rounded-2xl text-center border-2"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <Heart className="h-10 w-10 mx-auto mb-4" style={{ color: primaryColor }} />
            <h3 className="font-serif text-xl mb-2">Reception</h3>
            <p className="opacity-70">Dinner & Dancing at 6:00 PM</p>
            <p className="text-sm opacity-50 mt-2">The Garden Pavilion</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 text-center text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <Leaf className="h-8 w-8 mx-auto mb-3 opacity-60" />
        <p className="font-serif text-lg">
          {partner1Name} & {partner2Name}
        </p>
        <p className="text-sm opacity-60 mt-1">Forever & Always</p>
      </footer>
    </div>
  );
}
