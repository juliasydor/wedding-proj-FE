'use client';

import { Heart, Calendar, MapPin, Sparkles, Sun, Moon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';

interface BohemianDreamTemplateProps {
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  heroImage?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  isPreview?: boolean;
}

export function BohemianDreamTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#d4a574',
  secondaryColor = '#c4956a',
  isPreview = false,
}: BohemianDreamTemplateProps) {
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#fef9f3] text-[#5c4a3d] overflow-hidden',
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
                background: `linear-gradient(180deg, #fef9f3 0%, ${primaryColor}30 50%, ${secondaryColor}40 100%)`,
              }}
            />
          )}
        </div>

        {/* Decorative Sun/Moon */}
        <div className="absolute top-8 left-8">
          <Sun className="h-12 w-12 opacity-30" style={{ color: primaryColor }} />
        </div>
        <div className="absolute top-8 right-8">
          <Moon className="h-10 w-10 opacity-30" style={{ color: primaryColor }} />
        </div>

        {/* Macrame-style top decoration */}
        <div className="absolute top-0 left-0 right-0 h-20 flex justify-center">
          <div className="flex gap-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-b rounded-full"
                style={{
                  height: `${40 + Math.sin(i * 0.5) * 20}px`,
                  backgroundColor: `${primaryColor}${40 + i * 2}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-24">
          {/* Sparkle decoration */}
          <div className="flex items-center gap-4 mb-6">
            <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
            <p className="text-sm uppercase tracking-[0.4em]" style={{ color: primaryColor }}>
              Wild Souls in Love
            </p>
            <Sparkles className="h-5 w-5" style={{ color: primaryColor }} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl mb-0 italic">
            {partner1Name || 'Partner 1'}
          </h1>

          <div className="flex items-center justify-center my-6">
            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              ))}
              <Heart
                className="h-8 w-8 mx-4"
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

          <h1 className="font-serif text-5xl md:text-7xl italic">
            {partner2Name || 'Partner 2'}
          </h1>

          {weddingDate && (
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.3em] mb-2 opacity-70">
                Celebrate With Us
              </p>
              <p
                className="text-2xl font-serif"
                style={{ color: primaryColor }}
              >
                {weddingDate.toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2 mt-4">
              <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm opacity-80">{location}</span>
            </div>
          )}
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
      {weddingDate && (
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
            Until Our Adventure Begins
          </h2>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' }}
          />
        </section>
      )}

      {/* Details Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}30` }}
              >
                <Calendar className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-lg mb-1">When</h3>
              <p className="text-sm opacity-70">Saturday, 4 PM</p>
            </div>

            <div className="p-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}30` }}
              >
                <MapPin className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-lg mb-1">Where</h3>
              <p className="text-sm opacity-70">{location || 'TBD'}</p>
            </div>

            <div className="p-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}30` }}
              >
                <Heart className="h-8 w-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="font-serif text-lg mb-1">Dress Code</h3>
              <p className="text-sm opacity-70">Bohemian Chic</p>
            </div>
          </div>
        </div>
      </section>

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
        <p className="font-serif text-lg italic">
          {partner1Name} & {partner2Name}
        </p>
        <p className="text-sm opacity-50 mt-1">Two Wild Hearts, One Adventure</p>
      </footer>
    </div>
  );
}
