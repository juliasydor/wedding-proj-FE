'use client';

import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { Countdown } from '../molecules/Countdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface WeddingHeroProps {
  partner1Name: string;
  partner2Name: string;
  date: Date | string;
  location: string;
  bannerImageUrl?: string;
  isPreview?: boolean;
  onPublish?: () => void;
  onViewRegistry?: () => void;
  countdownLabels?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  countdownTitle?: string;
  className?: string;
}

export function WeddingHero({
  partner1Name,
  partner2Name,
  date,
  location,
  bannerImageUrl,
  isPreview = false,
  onPublish,
  onViewRegistry,
  countdownLabels,
  countdownTitle = 'COUNTDOWN TO FOREVER',
  className,
}: WeddingHeroProps) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={cn('relative', className)}>
      {/* Banner Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        {bannerImageUrl ? (
          <Image
            src={bannerImageUrl}
            alt={`${partner1Name} & ${partner2Name}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary via-quaternary to-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {isPreview && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <span className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-foreground">
              SITE PREVIEW
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative -mt-32 px-4 text-center">
        <h1 className="text-heading-1 mb-4">
          {partner1Name} <span className="text-secondary">&</span> {partner2Name}
        </h1>

        <div className="flex items-center justify-center gap-4 text-subtitle mb-8">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="space-y-4 mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-subtitle">
            {countdownTitle}
          </p>
          <Countdown targetDate={date} labels={countdownLabels} className="justify-center" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {onViewRegistry && (
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-full border-border hover:bg-card"
              onClick={onViewRegistry}
            >
              <span className="mr-2">🎁</span>
              View Gift Registry
            </Button>
          )}

          {isPreview && onPublish && (
            <Button
              className="w-full sm:w-auto rounded-full bg-secondary hover:bg-secondary/90"
              onClick={onPublish}
            >
              Publish Site →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
