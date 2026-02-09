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
  Monitor,
  Smartphone,
  Type,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/shared/lib/utils';
import { useWeddingStore, type SiteContent, type CustomSection } from '@/entities/wedding';
import { toast } from 'sonner';
import {
  ModernEleganceTemplate,
  ClassicRomanceTemplate,
  RusticGardenTemplate,
  BohemianDreamTemplate,
  BeachWeddingTemplate,
  ChurchWeddingTemplate,
  TEMPLATE_CONFIG,
  type TemplateId,
} from '@/shared/ui/templates';
import { SectionBlockEditor } from '@/shared/ui/molecules/SectionBlockEditor';

import type { DressCode, DressLength, GroomsmenStyle } from '@/shared/types';

type TabId = 'template' | 'colors' | 'content' | 'info' | 'images';
type PreviewMode = 'desktop' | 'mobile';

// Dress Code Color Families
const DRESS_CODE_COLOR_FAMILIES = [
  {
    name: 'Neutrals',
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Ivory', value: '#FFFFF0' },
      { name: 'Cream', value: '#FFFDD0' },
      { name: 'Eggshell', value: '#F0EAD6' },
      { name: 'Beige', value: '#F5F5DC' },
      { name: 'Champagne', value: '#F7E7CE' },
      { name: 'Sand', value: '#C2B280' },
      { name: 'Tan', value: '#D2B48C' },
      { name: 'Taupe', value: '#B38B6D' },
      { name: 'Mushroom', value: '#BAA38E' },
      { name: 'Greige', value: '#C5B9A8' },
      { name: 'Light Gray', value: '#D3D3D3' },
      { name: 'Silver', value: '#C0C0C0' },
      { name: 'Gray', value: '#808080' },
      { name: 'Slate', value: '#708090' },
      { name: 'Pewter', value: '#8E8E8E' },
      { name: 'Charcoal', value: '#36454F' },
      { name: 'Graphite', value: '#474A51' },
      { name: 'Black', value: '#000000' },
    ],
  },
  {
    name: 'Pinks',
    colors: [
      { name: 'Pale Pink', value: '#FADADD' },
      { name: 'Ballet Pink', value: '#F4C2C2' },
      { name: 'Blush', value: '#FFB6C1' },
      { name: 'Rose Quartz', value: '#F7CAC9' },
      { name: 'Dusty Pink', value: '#D4A5A5' },
      { name: 'Dusty Rose', value: '#DCAE96' },
      { name: 'Mauve', value: '#E0B0FF' },
      { name: 'Rose', value: '#FF007F' },
      { name: 'Hot Pink', value: '#FF69B4' },
      { name: 'Fuchsia', value: '#FF00FF' },
      { name: 'Magenta', value: '#FF0090' },
      { name: 'Raspberry', value: '#E30B5C' },
    ],
  },
  {
    name: 'Reds',
    colors: [
      { name: 'Coral', value: '#FF7F50' },
      { name: 'Salmon', value: '#FA8072' },
      { name: 'Terracotta', value: '#E2725B' },
      { name: 'Brick Red', value: '#CB4154' },
      { name: 'Red', value: '#FF0000' },
      { name: 'Cherry', value: '#DE3163' },
      { name: 'Crimson', value: '#DC143C' },
      { name: 'Scarlet', value: '#FF2400' },
      { name: 'Burgundy', value: '#800020' },
      { name: 'Merlot', value: '#722F37' },
      { name: 'Wine', value: '#722F37' },
      { name: 'Maroon', value: '#800000' },
    ],
  },
  {
    name: 'Blues',
    colors: [
      { name: 'Ice Blue', value: '#D6ECEF' },
      { name: 'Baby Blue', value: '#89CFF0' },
      { name: 'Powder Blue', value: '#B0E0E6' },
      { name: 'Sky Blue', value: '#87CEEB' },
      { name: 'Periwinkle', value: '#CCCCFF' },
      { name: 'Cornflower', value: '#6495ED' },
      { name: 'Dusty Blue', value: '#6699CC' },
      { name: 'Steel Blue', value: '#4682B4' },
      { name: 'Ocean Blue', value: '#4F84C4' },
      { name: 'Royal Blue', value: '#4169E1' },
      { name: 'Cobalt', value: '#0047AB' },
      { name: 'Navy', value: '#000080' },
      { name: 'Midnight', value: '#191970' },
    ],
  },
  {
    name: 'Purples',
    colors: [
      { name: 'Lavender', value: '#E6E6FA' },
      { name: 'Wisteria', value: '#C9A0DC' },
      { name: 'Lilac', value: '#C8A2C8' },
      { name: 'Orchid', value: '#DA70D6' },
      { name: 'Violet', value: '#EE82EE' },
      { name: 'Amethyst', value: '#9966CC' },
      { name: 'Grape', value: '#6F2DA8' },
      { name: 'Plum', value: '#8E4585' },
      { name: 'Purple', value: '#800080' },
      { name: 'Eggplant', value: '#614051' },
      { name: 'Aubergine', value: '#3D0C02' },
    ],
  },
  {
    name: 'Greens',
    colors: [
      { name: 'Mint', value: '#98FB98' },
      { name: 'Seafoam', value: '#93E9BE' },
      { name: 'Pistachio', value: '#93C572' },
      { name: 'Celadon', value: '#ACE1AF' },
      { name: 'Sage', value: '#9CAF88' },
      { name: 'Moss', value: '#8A9A5B' },
      { name: 'Eucalyptus', value: '#5F8575' },
      { name: 'Fern', value: '#4F7942' },
      { name: 'Olive', value: '#808000' },
      { name: 'Kelly Green', value: '#4CBB17' },
      { name: 'Emerald', value: '#50C878' },
      { name: 'Forest', value: '#228B22' },
      { name: 'Hunter', value: '#355E3B' },
      { name: 'Teal', value: '#008080' },
      { name: 'Dark Green', value: '#013220' },
    ],
  },
  {
    name: 'Earth Tones',
    colors: [
      { name: 'Camel', value: '#C19A6B' },
      { name: 'Caramel', value: '#FFD59A' },
      { name: 'Cognac', value: '#9F381D' },
      { name: 'Cinnamon', value: '#D2691E' },
      { name: 'Mocha', value: '#967969' },
      { name: 'Coffee', value: '#6F4E37' },
      { name: 'Chocolate', value: '#7B3F00' },
      { name: 'Espresso', value: '#3C2415' },
      { name: 'Sienna', value: '#A0522D' },
      { name: 'Umber', value: '#635147' },
      { name: 'Walnut', value: '#5D432C' },
      { name: 'Chestnut', value: '#954535' },
    ],
  },
  {
    name: 'Warm Tones',
    colors: [
      { name: 'Cream Yellow', value: '#FFFACD' },
      { name: 'Buttercup', value: '#F9E915' },
      { name: 'Yellow', value: '#FFFF00' },
      { name: 'Sunflower', value: '#FFDA03' },
      { name: 'Mustard', value: '#FFDB58' },
      { name: 'Marigold', value: '#EAA221' },
      { name: 'Peach', value: '#FFCBA4' },
      { name: 'Apricot', value: '#FBCEB1' },
      { name: 'Tangerine', value: '#FF9966' },
      { name: 'Orange', value: '#FFA500' },
      { name: 'Burnt Orange', value: '#CC5500' },
      { name: 'Rust', value: '#B7410E' },
      { name: 'Pumpkin', value: '#FF7518' },
    ],
  },
  {
    name: 'Jewel Tones',
    colors: [
      { name: 'Ruby', value: '#E0115F' },
      { name: 'Garnet', value: '#733635' },
      { name: 'Sapphire', value: '#0F52BA' },
      { name: 'Topaz', value: '#FFC87C' },
      { name: 'Citrine', value: '#E4D00A' },
      { name: 'Jade', value: '#00A86B' },
      { name: 'Tourmaline', value: '#86A1A9' },
      { name: 'Opal', value: '#A8C3BC' },
      { name: 'Aquamarine', value: '#7FFFD4' },
      { name: 'Turquoise', value: '#40E0D0' },
      { name: 'Peacock', value: '#005F69' },
    ],
  },
  {
    name: 'Pastels',
    colors: [
      { name: 'Pastel Pink', value: '#FFD1DC' },
      { name: 'Pastel Peach', value: '#FFDAB9' },
      { name: 'Pastel Yellow', value: '#FDFD96' },
      { name: 'Pastel Green', value: '#77DD77' },
      { name: 'Pastel Blue', value: '#AEC6CF' },
      { name: 'Pastel Purple', value: '#B39EB5' },
      { name: 'Pastel Lavender', value: '#DCD0FF' },
      { name: 'Pastel Coral', value: '#FFB7C5' },
      { name: 'Pastel Mint', value: '#AAF0D1' },
      { name: 'Pastel Lilac', value: '#E6A8D7' },
    ],
  },
  {
    name: 'Metallics',
    colors: [
      { name: 'Platinum', value: '#E5E4E2' },
      { name: 'Silver', value: '#C0C0C0' },
      { name: 'Pewter', value: '#8E8E8E' },
      { name: 'Light Gold', value: '#F5E6C4' },
      { name: 'Gold', value: '#FFD700' },
      { name: 'Champagne Gold', value: '#D4AF37' },
      { name: 'Antique Gold', value: '#C9AE5D' },
      { name: 'Bronze', value: '#CD7F32' },
      { name: 'Copper', value: '#B87333' },
      { name: 'Rose Gold', value: '#B76E79' },
      { name: 'Brass', value: '#B5A642' },
    ],
  },
];

const DRESS_LENGTHS: { id: DressLength; label: string }[] = [
  { id: 'short', label: 'Curto' },
  { id: 'midi', label: 'Midi' },
  { id: 'long', label: 'Longo' },
];

const GROOMSMEN_STYLES: { id: GroomsmenStyle; label: string }[] = [
  { id: 'tuxedo', label: 'Smoking' },
  { id: 'suit', label: 'Terno' },
  { id: 'semi-formal', label: 'Semi-formal' },
  { id: 'casual', label: 'Casual' },
];

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
  {
    id: 'beach-wedding' as TemplateId,
    name: 'Beach Wedding',
    category: 'beach',
    preview: TEMPLATE_CONFIG['beach-wedding'].preview,
  },
  {
    id: 'church-wedding' as TemplateId,
    name: 'Church Wedding',
    category: 'traditional',
    preview: TEMPLATE_CONFIG['church-wedding'].preview,
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
    case 'beach-wedding':
      return BeachWeddingTemplate;
    case 'church-wedding':
      return ChurchWeddingTemplate;
    default:
      return ModernEleganceTemplate;
  }
}

// Collapsible Section Component
function CollapsibleSection({
  title,
  children,
  isOpen,
  onToggle,
  showToggle,
  enabled,
  onEnabledChange,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  showToggle?: boolean;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
}) {
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <div
        className="flex items-center justify-between p-4 bg-quaternary/30 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <h4 className="font-medium text-foreground">{title}</h4>
          {showToggle && enabled !== undefined && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2"
            >
              <Switch
                checked={enabled}
                onCheckedChange={onEnabledChange}
                className="data-[state=checked]:bg-secondary"
              />
              <span className="text-xs text-subtitle">
                {enabled ? 'Visível' : 'Oculto'}
              </span>
            </div>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-subtitle" />
        ) : (
          <ChevronDown className="h-4 w-4 text-subtitle" />
        )}
      </div>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
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
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const [formData, setFormData] = useState({
    partner1Name: onboarding.partner1Name || '',
    partner2Name: onboarding.partner2Name || '',
    date: onboarding.date || '',
    location: onboarding.location || '',
    venue: onboarding.venue || '',
  });

  // Content state
  const [siteContent, setSiteContent] = useState<SiteContent>(
    onboarding.siteContent || {
      heroTitle: 'We\'re Getting Married',
      heroSubtitle: 'Join us to celebrate our love',
      storyTitle: 'Nossa História',
      storyContent: 'Uma história de amor que começou...',
      storyImage: null,
      showStorySection: true,
      ceremonyTitle: 'Cerimônia',
      ceremonyTime: '17:00',
      ceremonyDescription: 'A cerimônia será realizada ao ar livre',
      receptionTitle: 'Recepção',
      receptionTime: '19:00',
      receptionDescription: 'Celebre conosco com música e boa comida',
      countdownTitle: 'Contagem Regressiva',
      showCountdown: true,
      rsvpTitle: 'Confirme sua Presença',
      rsvpDescription: 'Por favor, confirme sua presença até 30 dias antes do evento',
      showRsvpSection: true,
      accommodationsTitle: 'Hospedagem',
      accommodationsContent: 'Sugerimos os seguintes hotéis próximos ao local do evento...',
      showAccommodationsSection: false,
      giftTitle: 'Lista de Presentes',
      giftDescription: 'Sua presença é o nosso maior presente, mas se desejar nos presentear...',
      showGiftSection: true,
      galleryTitle: 'Nossa Galeria',
      galleryImages: [],
      showGallerySection: false,
      footerMessage: 'Mal podemos esperar para celebrar com você!',
    }
  );

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    hero: true,
    countdown: false,
    story: false,
    ceremony: false,
    rsvp: false,
    gifts: false,
    accommodations: false,
    gallery: false,
    footer: false,
    custom: false,
  });

  // Custom sections state
  const [customSections, setCustomSections] = useState<CustomSection[]>(
    onboarding.customSections || []
  );

  // Dress code state
  const [showDressCodeEditor, setShowDressCodeEditor] = useState(false);
  const [dressCode, setDressCode] = useState<DressCode>(
    onboarding.dressCode || {
      guests: { palette: [], lengths: [], enabled: false },
      bridesmaids: { palette: [], lengths: [], enabled: false },
      groomsmen: { palette: [], style: undefined, enabled: false },
    }
  );
  const [dressCodeEditGroup, setDressCodeEditGroup] = useState<'guests' | 'bridesmaids' | 'groomsmen'>('guests');
  const [selectedColorFamily, setSelectedColorFamily] = useState(DRESS_CODE_COLOR_FAMILIES[0].name);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const currentPalette = COLOR_PALETTES.find((p) => p.id === selectedPalette) || COLOR_PALETTES[0];

  const tabs = [
    { id: 'template' as TabId, icon: Layout, label: t('sections.template') },
    { id: 'colors' as TabId, icon: Palette, label: t('sections.colors') },
    { id: 'content' as TabId, icon: Type, label: 'Conteúdo' },
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
      siteContent,
      customSections,
      dressCode: (dressCode.guests?.enabled || dressCode.bridesmaids?.enabled || dressCode.groomsmen?.enabled) ? dressCode : null,
    });
    toast.success('Alterações salvas com sucesso!');
  };

  // Dress code handlers
  const handleAddDressCodeColor = (color: string) => {
    const current = dressCode[dressCodeEditGroup] || { palette: [], lengths: [], enabled: false };
    if (!current.palette.includes(color)) {
      setDressCode({
        ...dressCode,
        [dressCodeEditGroup]: {
          ...current,
          palette: [...current.palette, color],
          enabled: true,
        },
      });
    }
  };

  const handleRemoveDressCodeColor = (color: string) => {
    const current = dressCode[dressCodeEditGroup] || { palette: [], lengths: [], enabled: false };
    setDressCode({
      ...dressCode,
      [dressCodeEditGroup]: {
        ...current,
        palette: current.palette.filter((c) => c !== color),
      },
    });
  };

  const handleToggleDressLength = (length: DressLength) => {
    const current = dressCode[dressCodeEditGroup] || { palette: [], lengths: [], enabled: false };
    const lengths = current.lengths || [];
    const newLengths = lengths.includes(length)
      ? lengths.filter((l) => l !== length)
      : [...lengths, length];
    setDressCode({
      ...dressCode,
      [dressCodeEditGroup]: {
        ...current,
        lengths: newLengths,
        enabled: true,
      },
    });
  };

  const handleSetGroomsmenStyle = (style: GroomsmenStyle) => {
    const current = dressCode.groomsmen || { palette: [], enabled: false };
    setDressCode({
      ...dressCode,
      groomsmen: {
        ...current,
        style,
        enabled: true,
      },
    });
  };

  const handleToggleDressCodeGroup = (group: 'guests' | 'bridesmaids' | 'groomsmen', enabled: boolean) => {
    const current = dressCode[group] || { palette: [], lengths: [], enabled: false };
    setDressCode({
      ...dressCode,
      [group]: {
        ...current,
        enabled,
      },
    });
  };

  const currentDressCodeGroup = dressCode[dressCodeEditGroup] || { palette: [], lengths: [], enabled: false };

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

  const handleStoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteContent({ ...siteContent, storyImage: reader.result as string });
        toast.success('Imagem da história enviada!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSiteContent((prev) => ({
            ...prev,
            galleryImages: [...prev.galleryImages, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
      toast.success('Imagens adicionadas à galeria!');
    }
  };

  const removeGalleryImage = (index: number) => {
    setSiteContent((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const TemplateComponent = getTemplateComponent(selectedTemplate);

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl md:text-heading-2 mb-2">{t('title')}</h1>
          <p className="text-subtitle text-sm md:text-base">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full border-border"
            onClick={() => setShowFullPreview(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{t('preview')}</span>
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <Save className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{t('saveChanges')}</span>
            <span className="sm:hidden">Salvar</span>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Editor */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border/50 pb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20'
                    : 'text-foreground/70 hover:text-foreground hover:bg-quaternary'
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-card rounded-2xl md:rounded-3xl border border-border/50 p-4 md:p-8">
            {/* Template Selection */}
            {activeTab === 'template' && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">{t('changeTemplate')}</h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={cn(
                        'relative rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300',
                        selectedTemplate === template.id
                          ? 'border-secondary ring-4 ring-secondary/20'
                          : 'border-border/50 hover:border-secondary/50'
                      )}
                    >
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-28 md:h-36 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                        <p className="text-white font-semibold text-xs md:text-sm">{template.name}</p>
                        <p className="text-white/70 text-[10px] md:text-xs capitalize">{template.category}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-secondary rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => setSelectedPalette(palette.id)}
                      className={cn(
                        'p-3 md:p-4 rounded-xl border-2 transition-all duration-300 text-left',
                        selectedPalette === palette.id
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border/50 hover:border-secondary/50'
                      )}
                    >
                      <div className="flex gap-2 mb-3">
                        <div
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20"
                          style={{ backgroundColor: palette.secondary }}
                        />
                      </div>
                      <p className="font-medium text-foreground text-xs md:text-sm">{palette.name}</p>
                      {selectedPalette === palette.id && (
                        <div className="flex items-center gap-1 mt-1 text-secondary text-[10px] md:text-xs">
                          <Check className="h-3 w-3" />
                          Selecionado
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content Editing */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">Editar Textos e Seções</h3>

                {/* Hero Section */}
                <CollapsibleSection
                  title="Seção Principal (Hero)"
                  isOpen={openSections.hero}
                  onToggle={() => toggleSection('hero')}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Título Principal</Label>
                      <Input
                        value={siteContent.heroTitle}
                        onChange={(e) => setSiteContent({ ...siteContent, heroTitle: e.target.value })}
                        placeholder="Ex: We're Getting Married"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Subtítulo</Label>
                      <Input
                        value={siteContent.heroSubtitle}
                        onChange={(e) => setSiteContent({ ...siteContent, heroSubtitle: e.target.value })}
                        placeholder="Ex: Join us to celebrate our love"
                        className="bg-input-bg border-border"
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Countdown Section */}
                <CollapsibleSection
                  title="Contagem Regressiva"
                  isOpen={openSections.countdown}
                  onToggle={() => toggleSection('countdown')}
                  showToggle
                  enabled={siteContent.showCountdown}
                  onEnabledChange={(enabled) => setSiteContent({ ...siteContent, showCountdown: enabled })}
                >
                  <div className="space-y-2">
                    <Label className="text-sm">Título da Seção</Label>
                    <Input
                      value={siteContent.countdownTitle}
                      onChange={(e) => setSiteContent({ ...siteContent, countdownTitle: e.target.value })}
                      placeholder="Ex: Contagem Regressiva"
                      className="bg-input-bg border-border"
                    />
                  </div>
                </CollapsibleSection>

                {/* Our Story Section */}
                <CollapsibleSection
                  title="Nossa História"
                  isOpen={openSections.story}
                  onToggle={() => toggleSection('story')}
                  showToggle
                  enabled={siteContent.showStorySection}
                  onEnabledChange={(enabled) => setSiteContent({ ...siteContent, showStorySection: enabled })}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Título</Label>
                      <Input
                        value={siteContent.storyTitle}
                        onChange={(e) => setSiteContent({ ...siteContent, storyTitle: e.target.value })}
                        placeholder="Ex: Nossa História"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Conteúdo</Label>
                      <textarea
                        value={siteContent.storyContent}
                        onChange={(e) => setSiteContent({ ...siteContent, storyContent: e.target.value })}
                        placeholder="Conte sua história de amor..."
                        rows={4}
                        className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Imagem da História</Label>
                      <div className="flex gap-3">
                        <label className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl border border-dashed border-border cursor-pointer hover:border-secondary/50 transition-colors">
                          <Upload className="h-4 w-4 mr-2 text-subtitle" />
                          <span className="text-sm text-subtitle">
                            {siteContent.storyImage ? 'Trocar imagem' : 'Adicionar imagem'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleStoryImageUpload}
                            className="hidden"
                          />
                        </label>
                        {siteContent.storyImage && (
                          <button
                            onClick={() => setSiteContent({ ...siteContent, storyImage: null })}
                            className="px-3 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      {siteContent.storyImage && (
                        <img
                          src={siteContent.storyImage}
                          alt="Story preview"
                          className="w-32 h-20 object-cover rounded-lg mt-2"
                        />
                      )}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Ceremony & Reception Section */}
                <CollapsibleSection
                  title="Cerimônia e Recepção"
                  isOpen={openSections.ceremony}
                  onToggle={() => toggleSection('ceremony')}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Título Cerimônia</Label>
                        <Input
                          value={siteContent.ceremonyTitle}
                          onChange={(e) => setSiteContent({ ...siteContent, ceremonyTitle: e.target.value })}
                          className="bg-input-bg border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Horário</Label>
                        <Input
                          value={siteContent.ceremonyTime}
                          onChange={(e) => setSiteContent({ ...siteContent, ceremonyTime: e.target.value })}
                          placeholder="Ex: 17:00"
                          className="bg-input-bg border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Descrição da Cerimônia</Label>
                      <Input
                        value={siteContent.ceremonyDescription}
                        onChange={(e) => setSiteContent({ ...siteContent, ceremonyDescription: e.target.value })}
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Título Recepção</Label>
                        <Input
                          value={siteContent.receptionTitle}
                          onChange={(e) => setSiteContent({ ...siteContent, receptionTitle: e.target.value })}
                          className="bg-input-bg border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Horário</Label>
                        <Input
                          value={siteContent.receptionTime}
                          onChange={(e) => setSiteContent({ ...siteContent, receptionTime: e.target.value })}
                          placeholder="Ex: 19:00"
                          className="bg-input-bg border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Descrição da Recepção</Label>
                      <Input
                        value={siteContent.receptionDescription}
                        onChange={(e) => setSiteContent({ ...siteContent, receptionDescription: e.target.value })}
                        className="bg-input-bg border-border"
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* RSVP Section */}
                <CollapsibleSection
                  title="Confirmação de Presença (RSVP)"
                  isOpen={openSections.rsvp}
                  onToggle={() => toggleSection('rsvp')}
                  showToggle
                  enabled={siteContent.showRsvpSection}
                  onEnabledChange={(enabled) => setSiteContent({ ...siteContent, showRsvpSection: enabled })}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Título</Label>
                      <Input
                        value={siteContent.rsvpTitle}
                        onChange={(e) => setSiteContent({ ...siteContent, rsvpTitle: e.target.value })}
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Descrição</Label>
                      <textarea
                        value={siteContent.rsvpDescription}
                        onChange={(e) => setSiteContent({ ...siteContent, rsvpDescription: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Gift Section */}
                <CollapsibleSection
                  title="Lista de Presentes"
                  isOpen={openSections.gifts}
                  onToggle={() => toggleSection('gifts')}
                  showToggle
                  enabled={siteContent.showGiftSection}
                  onEnabledChange={(enabled) => setSiteContent({ ...siteContent, showGiftSection: enabled })}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Título</Label>
                      <Input
                        value={siteContent.giftTitle}
                        onChange={(e) => setSiteContent({ ...siteContent, giftTitle: e.target.value })}
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Descrição</Label>
                      <textarea
                        value={siteContent.giftDescription}
                        onChange={(e) => setSiteContent({ ...siteContent, giftDescription: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Accommodations Section */}
                <CollapsibleSection
                  title="Hospedagem"
                  isOpen={openSections.accommodations}
                  onToggle={() => toggleSection('accommodations')}
                  showToggle
                  enabled={siteContent.showAccommodationsSection}
                  onEnabledChange={(enabled) => setSiteContent({ ...siteContent, showAccommodationsSection: enabled })}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Título</Label>
                      <Input
                        value={siteContent.accommodationsTitle}
                        onChange={(e) => setSiteContent({ ...siteContent, accommodationsTitle: e.target.value })}
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Conteúdo</Label>
                      <textarea
                        value={siteContent.accommodationsContent}
                        onChange={(e) => setSiteContent({ ...siteContent, accommodationsContent: e.target.value })}
                        rows={3}
                        placeholder="Adicione informações sobre hotéis, pousadas..."
                        className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Gallery Section */}
                <CollapsibleSection
                  title="Galeria de Fotos"
                  isOpen={openSections.gallery}
                  onToggle={() => toggleSection('gallery')}
                  showToggle
                  enabled={siteContent.showGallerySection}
                  onEnabledChange={(enabled) => setSiteContent({ ...siteContent, showGallerySection: enabled })}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Título</Label>
                      <Input
                        value={siteContent.galleryTitle}
                        onChange={(e) => setSiteContent({ ...siteContent, galleryTitle: e.target.value })}
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Imagens da Galeria</Label>
                      <label className="flex items-center justify-center px-4 py-6 rounded-xl border border-dashed border-border cursor-pointer hover:border-secondary/50 transition-colors">
                        <Plus className="h-5 w-5 mr-2 text-subtitle" />
                        <span className="text-sm text-subtitle">Adicionar imagens</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryImageUpload}
                          className="hidden"
                        />
                      </label>
                      {siteContent.galleryImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mt-3">
                          {siteContent.galleryImages.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-16 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removeGalleryImage(index)}
                                className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
                              >
                                <Trash2 className="h-4 w-4 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Footer Section */}
                <CollapsibleSection
                  title="Rodapé"
                  isOpen={openSections.footer}
                  onToggle={() => toggleSection('footer')}
                >
                  <div className="space-y-2">
                    <Label className="text-sm">Mensagem do Rodapé</Label>
                    <Input
                      value={siteContent.footerMessage}
                      onChange={(e) => setSiteContent({ ...siteContent, footerMessage: e.target.value })}
                      placeholder="Ex: Mal podemos esperar para celebrar com você!"
                      className="bg-input-bg border-border"
                    />
                  </div>
                </CollapsibleSection>

                {/* Custom Sections */}
                <CollapsibleSection
                  title="Seções Personalizadas"
                  isOpen={openSections.custom}
                  onToggle={() => toggleSection('custom')}
                >
                  <div className="space-y-4">
                    <p className="text-sm text-subtitle">
                      Adicione seções personalizadas ao seu site. Você pode adicionar textos, imagens, citações e mais.
                    </p>
                    <SectionBlockEditor
                      sections={customSections}
                      onChange={setCustomSections}
                      primaryColor={currentPalette.primary}
                    />
                  </div>
                </CollapsibleSection>
              </div>
            )}

            {/* Information */}
            {activeTab === 'info' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-6">Informações do Casamento</h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partner1" className="text-sm">{t('coupleNames')} - Parceiro 1</Label>
                      <Input
                        id="partner1"
                        value={formData.partner1Name}
                        onChange={(e) => setFormData({ ...formData, partner1Name: e.target.value })}
                        placeholder="Seu nome"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner2" className="text-sm">{t('coupleNames')} - Parceiro 2</Label>
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
                    <Label htmlFor="date" className="flex items-center gap-2 text-sm">
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
                    <Label htmlFor="location" className="flex items-center gap-2 text-sm">
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
                    <Label htmlFor="venue" className="flex items-center gap-2 text-sm">
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
                    <Label className="flex items-center gap-2 mb-3 text-sm">
                      <Shirt className="h-4 w-4 text-secondary" />
                      {t('dressCode')}
                    </Label>
                    <div className="text-xs md:text-sm text-subtitle mb-3 space-y-1">
                      {dressCode.guests?.enabled && (
                        <div className="flex items-center gap-2">
                          <span>Convidados:</span>
                          <div className="flex gap-1">
                            {dressCode.guests.palette.slice(0, 4).map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                            {dressCode.guests.palette.length > 4 && (
                              <span className="text-xs">+{dressCode.guests.palette.length - 4}</span>
                            )}
                          </div>
                        </div>
                      )}
                      {dressCode.bridesmaids?.enabled && (
                        <div className="flex items-center gap-2">
                          <span>Madrinhas:</span>
                          <div className="flex gap-1">
                            {dressCode.bridesmaids.palette.slice(0, 4).map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {dressCode.groomsmen?.enabled && (
                        <div className="flex items-center gap-2">
                          <span>Padrinhos:</span>
                          <div className="flex gap-1">
                            {dressCode.groomsmen.palette.slice(0, 4).map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          {dressCode.groomsmen.style && (
                            <span className="text-xs">({GROOMSMEN_STYLES.find(s => s.id === dressCode.groomsmen?.style)?.label})</span>
                          )}
                        </div>
                      )}
                      {!dressCode.guests?.enabled && !dressCode.bridesmaids?.enabled && !dressCode.groomsmen?.enabled && (
                        <span>Não definido</span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full border-border text-sm"
                      onClick={() => setShowDressCodeEditor(true)}
                    >
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Upload Area */}
                  <div>
                    <label
                      htmlFor="hero-upload"
                      className={cn(
                        'flex flex-col items-center justify-center',
                        'w-full h-40 md:h-48 rounded-xl md:rounded-2xl border-2 border-dashed cursor-pointer',
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
                          className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="h-8 w-8 md:h-10 md:w-10 text-subtitle mx-auto mb-3" />
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
                  <div className="bg-quaternary/30 rounded-xl md:rounded-2xl p-4 md:p-5">
                    <h4 className="font-semibold text-foreground mb-3 text-sm">Dicas para a imagem perfeita</h4>
                    <ul className="space-y-2 text-xs text-subtitle">
                      <li className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-secondary mt-0.5 shrink-0" />
                        Use uma foto de alta qualidade (mínimo 1920x1080)
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-secondary mt-0.5 shrink-0" />
                        Fotos do casal funcionam melhor
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-secondary mt-0.5 shrink-0" />
                        Evite fotos muito escuras
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Live Preview (Desktop Only) */}
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Preview Header with Toggle */}
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium">Preview ao Vivo</span>
                <div className="flex items-center gap-1 bg-quaternary rounded-lg p-1">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all',
                      previewMode === 'desktop'
                        ? 'bg-secondary text-white'
                        : 'text-subtitle hover:text-foreground'
                    )}
                  >
                    <Monitor className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all',
                      previewMode === 'mobile'
                        ? 'bg-secondary text-white'
                        : 'text-subtitle hover:text-foreground'
                    )}
                  >
                    <Smartphone className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="bg-quaternary/50 p-3 flex items-start justify-center min-h-[500px]">
                {previewMode === 'desktop' ? (
                  <div
                    className="w-full max-w-[340px] h-[500px] rounded-lg border border-border/50 bg-white"
                    style={{
                      overflow: 'scroll',
                    }}
                  >
                    <div
                      style={{
                        width: '1280px',
                        transformOrigin: 'top left',
                        transform: 'scale(0.265)',
                        marginBottom: '-75%', // Compensate for the scaled height
                      }}
                    >
                      <TemplateComponent
                        partner1Name={formData.partner1Name || 'Parceiro 1'}
                        partner2Name={formData.partner2Name || 'Parceiro 2'}
                        date={formData.date || null}
                        location={formData.location || 'Local do Casamento'}
                        heroImage={heroImage}
                        primaryColor={currentPalette.primary}
                        secondaryColor={currentPalette.secondary}
                        siteContent={siteContent}
                        customSections={customSections.filter(s => s.isVisible)}
                        dressCode={dressCode}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-[200px] h-[420px] bg-gray-900 rounded-[2rem] p-1.5 shadow-xl">
                      <div
                        className="w-full h-full bg-white rounded-[1.5rem] relative"
                        style={{
                          overflow: 'scroll',
                        }}
                      >
                        <div className="sticky top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-xl z-20 mx-auto" />
                        <div
                          style={{
                            width: '390px',
                            transformOrigin: 'top left',
                            transform: 'scale(0.48)',
                            marginBottom: '-52%', // Compensate for the scaled height
                            marginTop: '-8px',
                          }}
                        >
                          <TemplateComponent
                            partner1Name={formData.partner1Name || 'Parceiro 1'}
                            partner2Name={formData.partner2Name || 'Parceiro 2'}
                            date={formData.date || null}
                            location={formData.location || 'Local do Casamento'}
                            heroImage={heroImage}
                            primaryColor={currentPalette.primary}
                            secondaryColor={currentPalette.secondary}
                            isPreview
                            siteContent={siteContent}
                            customSections={customSections.filter(s => s.isVisible)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dress Code Editor Modal */}
      {showDressCodeEditor && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowDressCodeEditor(false)} />
          <div className="absolute inset-4 md:inset-8 lg:inset-16 bg-card rounded-2xl overflow-hidden flex flex-col max-w-4xl mx-auto">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Shirt className="h-5 w-5 text-secondary" />
                <span className="font-semibold">Editar Dress Code</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowDressCodeEditor(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Group Tabs */}
            <div className="p-4 border-b border-border flex gap-2">
              {(['guests', 'bridesmaids', 'groomsmen'] as const).map((group) => (
                <button
                  key={group}
                  onClick={() => setDressCodeEditGroup(group)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    dressCodeEditGroup === group
                      ? 'bg-secondary text-white'
                      : 'bg-quaternary text-subtitle hover:text-foreground'
                  )}
                >
                  {group === 'guests' ? 'Convidados' : group === 'bridesmaids' ? 'Madrinhas' : 'Padrinhos'}
                  {dressCode[group]?.enabled && (
                    <Check className="h-3 w-3 ml-1 inline" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-4 bg-quaternary/30 rounded-xl">
                <div>
                  <p className="font-medium">
                    {dressCodeEditGroup === 'guests' ? 'Dress Code para Convidados' :
                     dressCodeEditGroup === 'bridesmaids' ? 'Dress Code para Madrinhas' : 'Dress Code para Padrinhos'}
                  </p>
                  <p className="text-sm text-subtitle">Ative para definir cores e estilos</p>
                </div>
                <Switch
                  checked={currentDressCodeGroup.enabled}
                  onCheckedChange={(enabled) => handleToggleDressCodeGroup(dressCodeEditGroup, enabled)}
                  className="data-[state=checked]:bg-secondary"
                />
              </div>

              {/* Color Palette */}
              <div>
                <h4 className="font-medium mb-4">Paleta de Cores</h4>

                {/* Selected Colors */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {currentDressCodeGroup.palette.map((color) => (
                    <div key={color} className="relative group">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                      <button
                        onClick={() => handleRemoveDressCodeColor(color)}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {currentDressCodeGroup.palette.length === 0 && (
                    <p className="text-sm text-subtitle">Nenhuma cor selecionada</p>
                  )}
                </div>

                {/* Color Family Tabs */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {DRESS_CODE_COLOR_FAMILIES.map((family) => (
                    <button
                      key={family.name}
                      onClick={() => setSelectedColorFamily(family.name)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all',
                        selectedColorFamily === family.name
                          ? 'bg-secondary text-white'
                          : 'bg-quaternary text-subtitle hover:text-foreground'
                      )}
                    >
                      {family.name}
                    </button>
                  ))}
                </div>

                {/* Color Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                  {DRESS_CODE_COLOR_FAMILIES.find((f) => f.name === selectedColorFamily)?.colors.map((color) => {
                    const isSelected = currentDressCodeGroup.palette.includes(color.value);
                    return (
                      <button
                        key={color.value}
                        onClick={() => {
                          if (isSelected) {
                            handleRemoveDressCodeColor(color.value);
                          } else {
                            handleAddDressCodeColor(color.value);
                          }
                        }}
                        className={cn(
                          'flex items-center gap-2 p-2 rounded-lg border transition-all text-left',
                          isSelected
                            ? 'border-secondary bg-secondary/10'
                            : 'border-border hover:border-secondary/50'
                        )}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs truncate">{color.name}</span>
                        {isSelected && (
                          <Check className="h-3 w-3 text-secondary ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dress Length (for guests and bridesmaids) */}
              {dressCodeEditGroup !== 'groomsmen' && (
                <div>
                  <h4 className="font-medium mb-4">Comprimento do Vestido</h4>
                  <div className="flex gap-3">
                    {DRESS_LENGTHS.map((length) => {
                      const isSelected = currentDressCodeGroup.lengths?.includes(length.id);
                      return (
                        <button
                          key={length.id}
                          onClick={() => handleToggleDressLength(length.id)}
                          className={cn(
                            'px-4 py-2 rounded-xl border transition-all',
                            isSelected
                              ? 'border-secondary bg-secondary/10 text-secondary'
                              : 'border-border hover:border-secondary/50'
                          )}
                        >
                          {length.label}
                          {isSelected && <Check className="h-3 w-3 ml-2 inline" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Groomsmen Style */}
              {dressCodeEditGroup === 'groomsmen' && (
                <div>
                  <h4 className="font-medium mb-4">Estilo</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {GROOMSMEN_STYLES.map((style) => {
                      const isSelected = dressCode.groomsmen?.style === style.id;
                      return (
                        <button
                          key={style.id}
                          onClick={() => handleSetGroomsmenStyle(style.id)}
                          className={cn(
                            'px-4 py-3 rounded-xl border transition-all text-left',
                            isSelected
                              ? 'border-secondary bg-secondary/10'
                              : 'border-border hover:border-secondary/50'
                          )}
                        >
                          <span className="font-medium">{style.label}</span>
                          {isSelected && <Check className="h-4 w-4 ml-2 inline text-secondary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDressCodeEditor(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setShowDressCodeEditor(false);
                  toast.success('Dress code atualizado! Clique em Salvar para aplicar.');
                }}
                className="bg-secondary hover:bg-secondary/90"
              >
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/90" onClick={() => setShowFullPreview(false)} />
          <div className="absolute inset-2 md:inset-4 lg:inset-8 bg-card rounded-2xl overflow-hidden flex flex-col">
            <div className="p-3 md:p-4 border-b border-border flex items-center justify-between shrink-0">
              <span className="font-medium text-sm md:text-base">Preview Completo</span>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center gap-1 bg-quaternary rounded-lg p-1">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={cn(
                      'flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded text-xs font-medium transition-all',
                      previewMode === 'desktop'
                        ? 'bg-secondary text-white'
                        : 'text-subtitle hover:text-foreground'
                    )}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={cn(
                      'flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded text-xs font-medium transition-all',
                      previewMode === 'mobile'
                        ? 'bg-secondary text-white'
                        : 'text-subtitle hover:text-foreground'
                    )}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Mobile</span>
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullPreview(false)}
                  className="rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden bg-quaternary/50 flex items-center justify-center p-4">
              {previewMode === 'desktop' ? (
                <div className="w-full max-w-6xl h-full overflow-auto rounded-lg border border-border/50 bg-white">
                  <div style={{ minWidth: '1024px' }}>
                    <TemplateComponent
                      partner1Name={formData.partner1Name || 'Parceiro 1'}
                      partner2Name={formData.partner2Name || 'Parceiro 2'}
                      date={formData.date || null}
                      location={formData.location || 'Local do Casamento'}
                      heroImage={heroImage}
                      primaryColor={currentPalette.primary}
                      secondaryColor={currentPalette.secondary}
                      siteContent={siteContent}
                      customSections={customSections.filter(s => s.isVisible)}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative h-full flex items-center justify-center">
                  <div className="bg-gray-900 rounded-[3rem] p-2 shadow-2xl flex flex-col" style={{ width: '390px', height: 'min(95%, 844px)' }}>
                    <div className="w-full flex-1 bg-white rounded-[2.5rem] overflow-hidden relative flex flex-col">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-10" />
                      <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        <div style={{ width: '100%' }}>
                          <TemplateComponent
                            partner1Name={formData.partner1Name || 'Parceiro 1'}
                            partner2Name={formData.partner2Name || 'Parceiro 2'}
                            date={formData.date || null}
                            location={formData.location || 'Local do Casamento'}
                            heroImage={heroImage}
                            primaryColor={currentPalette.primary}
                            secondaryColor={currentPalette.secondary}
                            isPreview
                            siteContent={siteContent}
                            customSections={customSections.filter(s => s.isVisible)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
