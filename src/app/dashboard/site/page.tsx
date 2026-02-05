'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Palette,
  Layout,
  Info,
  ImageIcon,
  Save,
  Eye,
  Upload,
  Check,
  Calendar,
  MapPin,
  Shirt,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { useWeddingStore } from '@/entities/wedding';
import { toast } from 'sonner';
import {
  ModernEleganceTemplate,
  ClassicRomanceTemplate,
  RusticGardenTemplate,
  BohemianDreamTemplate,
  TEMPLATE_CONFIG,
  type TemplateId,
} from '@/shared/ui/templates';

type TabId = 'template' | 'colors' | 'info' | 'images';

const COLOR_PALETTES = [
  { id: 'rose', name: 'Rosa', primary: '#ea2e5b', secondary: '#F1557C' },
  { id: 'gold', name: 'Dourado', primary: '#c9a959', secondary: '#8b6914' },
  { id: 'sage', name: 'Verde Sálvia', primary: '#5d7052', secondary: '#8fa67a' },
  { id: 'terracotta', name: 'Terracota', primary: '#d4a574', secondary: '#c4956a' },
  { id: 'navy', name: 'Azul Marinho', primary: '#2c3e50', secondary: '#34495e' },
  { id: 'burgundy', name: 'Vinho', primary: '#722f37', secondary: '#8b3a42' },
];

const TEMPLATES = [
  {
    id: 'modern-elegance' as TemplateId,
    name: 'Modern Elegance',
    category: 'modern',
    preview: TEMPLATE_CONFIG['modern-elegance'].preview,
  },
  {
    id: 'classic-romance' as TemplateId,
    name: 'Classic Romance',
    category: 'classic',
    preview: TEMPLATE_CONFIG['classic-romance'].preview,
  },
  {
    id: 'rustic-garden' as TemplateId,
    name: 'Rustic Garden',
    category: 'rustic',
    preview: TEMPLATE_CONFIG['rustic-garden'].preview,
  },
  {
    id: 'bohemian-dream' as TemplateId,
    name: 'Bohemian Dream',
    category: 'boho',
    preview: TEMPLATE_CONFIG['bohemian-dream'].preview,
  },
];

function getTemplateComponent(templateId: TemplateId) {
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

export default function SiteEditorPage() {
  const t = useTranslations('dashboard.siteEditor');
  const { onboarding, updateOnboarding } = useWeddingStore();

  const [activeTab, setActiveTab] = useState<TabId>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(
    (onboarding.templateId as TemplateId) || 'modern-elegance'
  );
  const [selectedPalette, setSelectedPalette] = useState(
    COLOR_PALETTES.find((p) => p.primary === onboarding.primaryColor)?.id || 'rose'
  );
  const [heroImage, setHeroImage] = useState<string | null>(onboarding.heroImage || null);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const [formData, setFormData] = useState({
    partner1Name: onboarding.partner1Name || '',
    partner2Name: onboarding.partner2Name || '',
    date: onboarding.date || '',
    location: onboarding.location || '',
    venue: onboarding.venue || '',
  });

  const currentPalette = COLOR_PALETTES.find((p) => p.id === selectedPalette) || COLOR_PALETTES[0];

  const tabs = [
    { id: 'template' as TabId, icon: Layout, label: t('sections.template') },
    { id: 'colors' as TabId, icon: Palette, label: t('sections.colors') },
    { id: 'info' as TabId, icon: Info, label: t('sections.info') },
    { id: 'images' as TabId, icon: ImageIcon, label: t('sections.images') },
  ];

  const handleSave = () => {
    updateOnboarding({
      ...formData,
      templateId: selectedTemplate,
      primaryColor: currentPalette.primary,
      secondaryColor: currentPalette.secondary,
      heroImage,
    });
    toast.success('Alterações salvas com sucesso!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImage(reader.result as string);
        toast.success('Imagem enviada com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  const TemplateComponent = getTemplateComponent(selectedTemplate);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-2 mb-2">{t('title')}</h1>
          <p className="text-subtitle">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full border-border"
            onClick={() => setShowFullPreview(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {t('preview')}
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <Save className="mr-2 h-4 w-4" />
            {t('saveChanges')}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Editor */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border/50 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all',
                  activeTab === tab.id
                    ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20'
                    : 'text-foreground/70 hover:text-foreground hover:bg-quaternary'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-card rounded-3xl border border-border/50 p-8">
            {/* Template Selection */}
            {activeTab === 'template' && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">{t('changeTemplate')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={cn(
                        'relative rounded-2xl overflow-hidden border-2 transition-all duration-300',
                        selectedTemplate === template.id
                          ? 'border-secondary ring-4 ring-secondary/20'
                          : 'border-border/50 hover:border-secondary/50'
                      )}
                    >
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white font-semibold text-sm">{template.name}</p>
                        <p className="text-white/70 text-xs capitalize">{template.category}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Palette */}
            {activeTab === 'colors' && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">{t('colorPalette')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => setSelectedPalette(palette.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                        selectedPalette === palette.id
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border/50 hover:border-secondary/50'
                      )}
                    >
                      <div className="flex gap-2 mb-3">
                        <div
                          className="w-8 h-8 rounded-full border border-white/20"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div
                          className="w-8 h-8 rounded-full border border-white/20"
                          style={{ backgroundColor: palette.secondary }}
                        />
                      </div>
                      <p className="font-medium text-foreground text-sm">{palette.name}</p>
                      {selectedPalette === palette.id && (
                        <div className="flex items-center gap-1 mt-1 text-secondary text-xs">
                          <Check className="h-3 w-3" />
                          Selecionado
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Information */}
            {activeTab === 'info' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-6">Informações do Casamento</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partner1">{t('coupleNames')} - Parceiro 1</Label>
                      <Input
                        id="partner1"
                        value={formData.partner1Name}
                        onChange={(e) => setFormData({ ...formData, partner1Name: e.target.value })}
                        placeholder="Seu nome"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner2">{t('coupleNames')} - Parceiro 2</Label>
                      <Input
                        id="partner2"
                        value={formData.partner2Name}
                        onChange={(e) => setFormData({ ...formData, partner2Name: e.target.value })}
                        placeholder="Nome do parceiro"
                        className="bg-input-bg border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      {t('weddingDate')}
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-input-bg border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-secondary" />
                      {t('location')}
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Cidade, Estado"
                      className="bg-input-bg border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-tertiary" />
                      Local da Cerimônia
                    </Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Nome do local ou endereço"
                      className="bg-input-bg border-border"
                    />
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <Label className="flex items-center gap-2 mb-3">
                      <Shirt className="h-4 w-4 text-secondary" />
                      {t('dressCode')}
                    </Label>
                    <p className="text-sm text-subtitle mb-3">
                      {onboarding.dressCode
                        ? `Paleta: ${onboarding.dressCode.guests?.palette?.join(', ') || 'Não definida'}`
                        : 'Não definido'}
                    </p>
                    <Button variant="outline" className="rounded-full border-border">
                      Editar Dress Code
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Images */}
            {activeTab === 'images' && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">{t('heroImage')}</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Area */}
                  <div>
                    <label
                      htmlFor="hero-upload"
                      className={cn(
                        'flex flex-col items-center justify-center',
                        'w-full h-48 rounded-2xl border-2 border-dashed cursor-pointer',
                        'transition-all duration-300',
                        heroImage
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border/50 hover:border-secondary/50 bg-quaternary/30'
                      )}
                    >
                      {heroImage ? (
                        <img
                          src={heroImage}
                          alt="Hero preview"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="h-10 w-10 text-subtitle mx-auto mb-3" />
                          <p className="text-foreground font-medium mb-1 text-sm">{t('uploadImage')}</p>
                          <p className="text-xs text-subtitle">PNG, JPG até 5MB</p>
                        </div>
                      )}
                      <input
                        id="hero-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {heroImage && (
                      <Button
                        variant="outline"
                        onClick={() => setHeroImage(null)}
                        className="mt-3 rounded-full border-border text-sm"
                        size="sm"
                      >
                        Remover Imagem
                      </Button>
                    )}
                  </div>

                  {/* Tips */}
                  <div className="bg-quaternary/30 rounded-2xl p-5">
                    <h4 className="font-semibold text-foreground mb-3 text-sm">Dicas para a imagem perfeita</h4>
                    <ul className="space-y-2 text-xs text-subtitle">
                      <li className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-secondary mt-0.5" />
                        Use uma foto de alta qualidade (mínimo 1920x1080)
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-secondary mt-0.5" />
                        Fotos do casal funcionam melhor
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-secondary mt-0.5" />
                        Evite fotos muito escuras
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Live Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium">Preview ao Vivo</span>
                <span className="text-xs text-subtitle">
                  {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
                </span>
              </div>
              <div className="aspect-[9/16] max-h-[500px] overflow-y-auto">
                <TemplateComponent
                  partner1Name={formData.partner1Name || 'Parceiro 1'}
                  partner2Name={formData.partner2Name || 'Parceiro 2'}
                  date={formData.date || null}
                  location={formData.location || 'Local do Casamento'}
                  heroImage={heroImage}
                  primaryColor={currentPalette.primary}
                  secondaryColor={currentPalette.secondary}
                  isPreview
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/90" onClick={() => setShowFullPreview(false)} />
          <div className="absolute inset-4 md:inset-8 bg-card rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <span className="font-medium">Preview Completo</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullPreview(false)}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TemplateComponent
                partner1Name={formData.partner1Name || 'Parceiro 1'}
                partner2Name={formData.partner2Name || 'Parceiro 2'}
                date={formData.date || null}
                location={formData.location || 'Local do Casamento'}
                heroImage={heroImage}
                primaryColor={currentPalette.primary}
                secondaryColor={currentPalette.secondary}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
