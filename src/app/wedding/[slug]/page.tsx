import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Gift, Heart, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeddingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock data - in production this would come from an API
async function getWeddingBySlug(slug: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock wedding data
  return {
    id: '1',
    partner1Name: 'Sarah',
    partner2Name: 'James',
    date: new Date('2024-10-24'),
    location: 'Napa Valley, CA',
    venue: 'Vineyard Estate',
    bannerImageUrl: '/wedding-banner.jpg',
    dressCode: {
      guests: {
        palette: ['Navy Blue'],
        length: 'midi' as const,
      },
    },
    story:
      "We met at a coffee shop in San Francisco in 2019. What started as a chance encounter turned into the love of a lifetime. After 5 years of adventures together, we're ready to begin our forever.",
    schedule: [
      { time: '4:00 PM', event: 'Guest Arrival' },
      { time: '4:30 PM', event: 'Ceremony' },
      { time: '5:30 PM', event: 'Cocktail Hour' },
      { time: '7:00 PM', event: 'Reception & Dinner' },
      { time: '10:00 PM', event: 'Dancing' },
    ],
  };
}

export default async function WeddingPage({ params }: WeddingPageProps) {
  const { slug } = await params;
  const wedding = await getWeddingBySlug(slug);
  const t = await getTranslations('countdown');

  if (!wedding) {
    notFound();
  }

  const formattedDate = wedding.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-quaternary to-primary">
          {wedding.bannerImageUrl && (
            <Image
              src={wedding.bannerImageUrl}
              alt={`${wedding.partner1Name} & ${wedding.partner2Name}`}
              fill
              className="object-cover opacity-80"
              priority
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="relative z-10 w-full px-4 pb-12 text-center">
          <p className="text-tertiary text-sm uppercase tracking-wider mb-4">
            We're getting married!
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
            {wedding.partner1Name} <span className="text-secondary">&</span>{' '}
            {wedding.partner2Name}
          </h1>
          <div className="flex items-center justify-center gap-4 text-subtitle">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{wedding.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <Heart className="h-8 w-8 text-secondary mx-auto mb-6" />
        <h2 className="text-heading-3 mb-6">Our Story</h2>
        <p className="text-subtitle text-lg leading-relaxed">{wedding.story}</p>
      </section>

      {/* Details Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading-3 text-center mb-12">Wedding Details</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* When */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">When</h3>
              <p className="text-subtitle">{formattedDate}</p>
              <p className="text-subtitle">4:00 PM</p>
            </div>

            {/* Where */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Where</h3>
              <p className="text-subtitle">{wedding.venue}</p>
              <p className="text-subtitle">{wedding.location}</p>
            </div>

            {/* Dress Code */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Dress Code</h3>
              <p className="text-subtitle">
                {wedding.dressCode.guests.palette[0]}
              </p>
              <p className="text-subtitle capitalize">
                {wedding.dressCode.guests.length} Length
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-heading-3 text-center mb-12">Schedule</h2>

          <div className="space-y-6">
            {wedding.schedule.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-tertiary">{item.time}</p>
                  <p className="font-medium text-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Registry CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-secondary/10 to-tertiary/10">
        <div className="max-w-md mx-auto text-center">
          <Gift className="h-12 w-12 text-secondary mx-auto mb-6" />
          <h2 className="text-heading-3 mb-4">Gift Registry</h2>
          <p className="text-subtitle mb-8">
            Your presence is the greatest gift, but if you wish to honor us with a
            gift, we've created a registry.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <Link href="/checkout">
              <Gift className="mr-2 h-5 w-5" />
              View Gift Registry
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border">
        <p className="text-subtitle">
          Made with <Heart className="inline h-4 w-4 text-secondary fill-secondary" /> using
          Véu & Gravata
        </p>
      </footer>
    </div>
  );
}
