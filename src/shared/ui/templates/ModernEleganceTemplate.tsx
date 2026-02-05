'use client';

import { Heart, Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Countdown } from '@/shared/ui/molecules/Countdown';

interface ModernEleganceTemplateProps {
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  heroImage?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  isPreview?: boolean;
}

export function ModernEleganceTemplate({
  partner1Name,
  partner2Name,
  date,
  location,
  heroImage,
  primaryColor = '#ea2e5b',
  secondaryColor = '#F1557C',
  isPreview = false,
}: ModernEleganceTemplateProps) {
  const weddingDate = date ? new Date(date) : null;

  return (
    <div
      className={cn(
        'bg-[#1a1a2e] text-white overflow-hidden',
        isPreview ? 'rounded-xl scale-100' : 'min-h-screen'
      )}
      style={{ '--primary': primaryColor, '--secondary': secondaryColor } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        {/* Background */}
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Wedding"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-6 opacity-80">We're Getting Married</p>

          <h1 className="font-serif text-5xl md:text-7xl mb-4">
            {partner1Name || 'Partner 1'}
            <span className="mx-4" style={{ color: primaryColor }}>&</span>
            {partner2Name || 'Partner 2'}
          </h1>

          {weddingDate && (
            <div className="flex items-center gap-3 mt-6 text-lg opacity-90">
              <Calendar className="h-5 w-5" style={{ color: primaryColor }} />
              <span>
                {weddingDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-3 mt-3 opacity-80">
              <MapPin className="h-5 w-5" style={{ color: primaryColor }} />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a2e] to-transparent"
        />
      </section>

      {/* Countdown Section */}
      {weddingDate && (
        <section className="py-16 px-4 text-center bg-[#1a1a2e]">
          <h2 className="text-2xl font-serif mb-8 opacity-80">Countdown to Forever</h2>
          <Countdown
            targetDate={weddingDate}
            labels={{ days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' }}
          />
        </section>
      )}

      {/* Details Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30` }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Clock className="h-8 w-8" style={{ color: primaryColor }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ceremony</h3>
            <p className="opacity-70">5:00 PM</p>
          </div>

          <div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}20` }}
            >
              <Heart className="h-8 w-8" style={{ color: primaryColor }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reception</h3>
            <p className="opacity-70">7:00 PM</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-[#0f3460]">
        <Heart className="h-6 w-6 mx-auto mb-2" style={{ color: primaryColor }} />
        <p className="opacity-60 text-sm">
          {partner1Name} & {partner2Name}
        </p>
      </footer>
    </div>
  );
}
