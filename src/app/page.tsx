import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/widgets/navbar';
import { Footer } from '@/widgets/footer';
import { StatCard } from '@/shared/ui/atoms/StatCard';
import { FeatureCard } from '@/shared/ui/molecules/FeatureCard';
import { HeartAnimation } from '@/shared/animations/HeartAnimation';
import { ROUTES } from '@/shared/config';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const features = [
    {
      iconName: 'globe' as const,
      title: t('features.websites.title'),
      description: t('features.websites.description'),
    },
    {
      iconName: 'users' as const,
      title: t('features.guests.title'),
      description: t('features.guests.description'),
    },
    {
      iconName: 'gift' as const,
      title: t('features.gifts.title'),
      description: t('features.gifts.description'),
    },
    {
      iconName: 'qrCode' as const,
      title: t('features.share.title'),
      description: t('features.share.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeartAnimation count={10} />
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Hero Image Background */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
            <Image
              src="/hero-couple.jpg"
              alt="Happy wedding couple"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-tertiary text-sm font-medium uppercase tracking-wider mb-4">
                THE MODERN WEDDING PLATFORM
              </p>
              <h1 className="text-heading-1 text-white max-w-3xl mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-white/80 max-w-xl mb-8">
                {t('hero.subtitle')}
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-14 px-8 text-lg glow-secondary"
              >
                <Link href={ROUTES.signup}>
                  {t('hero.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 py-8 border-b border-border/50">
            <StatCard value="15k+" label={t('stats.couples')} />
            <StatCard value="100%" label={t('stats.customizable')} />
            <StatCard value="4.9" label={t('stats.rating')} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">{t('features.title')}</h2>
            <p className="text-subtitle text-lg">{t('features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                iconName={feature.iconName}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-heading-2 mb-4">{t('cta.title')}</h2>
          <p className="text-subtitle text-lg mb-8">{t('cta.subtitle')}</p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-14 px-8 text-lg"
          >
            <Link href={ROUTES.signup}>{t('cta.button')}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
