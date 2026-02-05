'use client';

import { Heart, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';

interface ClassicRomanceTemplateProps {
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  heroImage?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  isPreview?: boolean;
}

export function ClassicRomanceTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#c9a959',
  secondaryColor = '#8b6914',
  isPreview = false,
}: ClassicRomanceTemplateProps) {
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#faf8f5] text-[#2c2c2c] overflow-hidden',
        isPreview ? 'rounded-xl' : 'min-h-screen'
      )}
    >
      {/* Hero Section with Elegant Frame */}
      <section className="relative py-20 px-4">
        {/* Decorative Border */}
        <div className="absolute inset-8 border-2 pointer-events-none" style={{ borderColor: primaryColor }} />
        <div className="absolute inset-10 border pointer-events-none" style={{ borderColor: `${primaryColor}50` }} />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Ornament Top */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
            <Heart className="h-6 w-6" style={{ color: primaryColor }} />
            <div className="h-px w-16" style={{ backgroundColor: primaryColor }} />
          </div>

          <p className="text-sm uppercase tracking-[0.4em] mb-4" style={{ color: primaryColor }}>
            Together with their families
          </p>

          <h1 className="font-serif text-5xl md:text-6xl mb-2 italic" style={{ color: '#2c2c2c' }}>
            {partner1Name || 'Partner 1'}
          </h1>

          <p className="text-3xl font-serif my-4" style={{ color: primaryColor }}>&</p>

          <h1 className="font-serif text-5xl md:text-6xl italic" style={{ color: '#2c2c2c' }}>
            {partner2Name || 'Partner 2'}
          </h1>

          <p className="text-sm uppercase tracking-[0.3em] mt-8 mb-4" style={{ color: primaryColor }}>
            Request the pleasure of your company
          </p>

          {weddingDate && (
            <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
              <p className="font-serif text-2xl" style={{ color: '#2c2c2c' }}>
                {weddingDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {location && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{location}</span>
            </div>
          )}

          {/* Ornament Bottom */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="h-px w-24" style={{ backgroundColor: primaryColor }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
            <div className="h-px w-24" style={{ backgroundColor: primaryColor }} />
          </div>
        </div>
      </section>

      {/* Photo Section */}
      {heroImage && (
        <section className="px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-4" style={{ backgroundColor: `${primaryColor}10` }}>
              <img
                src={heroImage}
                alt="Wedding"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-2 border-2 pointer-events-none" style={{ borderColor: primaryColor }} />
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {weddingDate && (
        <section className="py-16 px-4 text-center" style={{ backgroundColor: `${primaryColor}08` }}>
          <h2 className="font-serif text-2xl mb-8 italic" style={{ color: '#2c2c2c' }}>
            Counting Down to Our Special Day
          </h2>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' }}
          />
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center" style={{ backgroundColor: '#2c2c2c', color: '#faf8f5' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
          <Heart className="h-5 w-5" style={{ color: primaryColor }} />
          <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
        </div>
        <p className="font-serif italic opacity-80">
          {partner1Name} & {partner2Name}
        </p>
      </footer>
    </div>
  );
}
