'use client';

import { useParams } from 'next/navigation';
import { useWeddingStore } from '@/entities/wedding';
import {
  ModernEleganceTemplate,
  ClassicRomanceTemplate,
  RusticGardenTemplate,
  BohemianDreamTemplate,
  TEMPLATE_CONFIG,
  type TemplateId,
} from '@/shared/ui/templates';

function getTemplateComponent(templateId: TemplateId | string | null) {
  switch (templateId) {
    case 'modern-elegance':
      return ModernEleganceTemplate;
    case 'classic-romance':
      return ClassicRomanceTemplate;
    case 'rustic-garden':
      return RusticGardenTemplate;
    case 'bohemian-dream':
      return BohemianDreamTemplate;
    default:
      return ModernEleganceTemplate;
  }
}

// Mock function - in production this would fetch from API
function getWeddingBySlug(slug: string) {
  // This would be replaced with actual API call
  return null;
}

export default function WeddingPage() {
  const params = useParams();
  const slug = params?.slug as string || '';
  const { onboarding } = useWeddingStore();

  // In production, fetch wedding data from API using slug
  // For now, we use the onboarding store data for demo
  const weddingData = getWeddingBySlug(slug);

  // Use store data if no API data (demo mode)
  const templateId = (weddingData as any)?.templateId || onboarding.templateId as TemplateId || 'modern-elegance';
  const templateConfig = TEMPLATE_CONFIG[templateId as TemplateId];

  const primaryColor = (weddingData as any)?.primaryColor || onboarding.primaryColor || templateConfig?.defaultColors.primary || '#ea2e5b';
  const secondaryColor = (weddingData as any)?.secondaryColor || onboarding.secondaryColor || templateConfig?.defaultColors.secondary || '#F1557C';

  const TemplateComponent = getTemplateComponent(templateId);

  return (
    <TemplateComponent
      partner1Name={(weddingData as any)?.partner1Name || onboarding.partner1Name || 'Partner 1'}
      partner2Name={(weddingData as any)?.partner2Name || onboarding.partner2Name || 'Partner 2'}
      date={(weddingData as any)?.date || onboarding.date}
      location={(weddingData as any)?.location || onboarding.location || 'Wedding Venue'}
      heroImage={(weddingData as any)?.heroImageUrl || onboarding.heroImage}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );
}
