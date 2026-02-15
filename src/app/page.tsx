import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Navbar } from '@/widgets/navbar';
import { Footer } from '@/widgets/footer';
import { StatCard } from '@/shared/ui/atoms/StatCard';
import { FeatureCard } from '@/shared/ui/molecules/FeatureCard';
import { BenefitCard } from '@/shared/ui/molecules/BenefitCard';
import { HeartAnimation } from '@/shared/animations/HeartAnimation';
import { HeroOverlay } from '@/shared/ui/atoms/HeroOverlay';
import { ROUTES } from '@/shared/config';

export default async function HomePage() {
  const t = await getTranslations('landing');

  const benefits = [
    {
      iconName: 'timer' as const,
      title: t('benefits.transparency.title'),
      description: t('benefits.transparency.description'),
    },
    {
      iconName: 'heartHandshake' as const,
      title: t('benefits.track.title'),
      description: t('benefits.track.description'),
    },
    {
      iconName: 'piggyBank' as const,
      title: t('benefits.fee.title'),
      description: t('benefits.fee.description'),
    },
    {
      iconName: 'clipboardList' as const,
      title: t('benefits.practicality.title'),
      description: t('benefits.practicality.description'),
    },
    {
      iconName: 'wallet' as const,
      title: t('benefits.pix.title'),
      description: t('benefits.pix.description'),
    },
    {
      iconName: 'creditCard' as const,
      title: t('benefits.guests.title'),
      description: t('benefits.guests.description'),
    },
  ];

  const features = [
    {
      iconName: 'palette' as const,
      title: t('features.themes.title'),
      description: t('features.themes.description'),
    },
    {
      iconName: 'globe' as const,
      title: t('features.edits.title'),
      description: t('features.edits.description'),
    },
    {
      iconName: 'mapPin' as const,
      title: t('features.location.title'),
      description: t('features.location.description'),
    },
    {
      iconName: 'clipboardCheck' as const,
      title: t('features.rsvp.title'),
      description: t('features.rsvp.description'),
    },
    {
      iconName: 'messageHeart' as const,
      title: t('features.messages.title'),
      description: t('features.messages.description'),
    },
    {
      iconName: 'mail' as const,
      title: t('features.stationery.title'),
      description: t('features.stationery.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeartAnimation count={10} />
      <Navbar variant="landing" heroImageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-0 md:px-8">
          {/* Hero Image Background */}
          <div className="relative h-[400px] md:h-[500px] rounded-none md:rounded-3xl overflow-hidden mb-8">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
              alt="Happy wedding couple"
              fill
              className="object-cover object-[center_25%]"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              unoptimized
            />
            <HeroOverlay />

            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-quaternary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Title */}
            <div>
              <h2 className="text-heading-2 mb-4">{t('faq.title')}</h2>
              <p className="text-subtitle text-lg mb-6">
                {t('faq.subtitle')}
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-secondary hover:text-tertiary transition-colors font-medium"
              >
                {t('faq.seeMore')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Right side - Accordion */}
            <div>
              <Accordion type="single">
                <AccordionItem value="free">
                  <AccordionTrigger>{t('faq.questions.free.question')}</AccordionTrigger>
                  <AccordionContent>{t('faq.questions.free.answer')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="plans">
                  <AccordionTrigger>{t('faq.questions.plans.question')}</AccordionTrigger>
                  <AccordionContent>{t('faq.questions.plans.answer')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="duration">
                  <AccordionTrigger>{t('faq.questions.duration.question')}</AccordionTrigger>
                  <AccordionContent>{t('faq.questions.duration.answer')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="howTo">
                  <AccordionTrigger>{t('faq.questions.howTo.question')}</AccordionTrigger>
                  <AccordionContent>{t('faq.questions.howTo.answer')}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">{t('benefits.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                iconName={benefit.iconName}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-quaternary/30">
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
