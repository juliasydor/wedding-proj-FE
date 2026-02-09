'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Check, ChevronLeft, ChevronRight, Plus, X, Users, Sparkles, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { StepIndicator } from '@/shared/ui/atoms/StepIndicator';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import type { DressCode, DressLength, GroomsmenStyle, DressCodeGroup } from '@/shared/types';

// Color families with subtones
const COLOR_FAMILIES = [
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

const DRESS_LENGTHS: { id: DressLength; label: string; height: string }[] = [
  { id: 'short', label: 'Short', height: '35%' },
  { id: 'midi', label: 'Midi', height: '60%' },
  { id: 'long', label: 'Long', height: '90%' },
];

const GROOMSMEN_STYLES: { id: GroomsmenStyle; label: string; description: string }[] = [
  { id: 'tuxedo', label: 'Tuxedo', description: 'Black tie formal' },
  { id: 'suit', label: 'Suit', description: 'Classic formal' },
  { id: 'semi-formal', label: 'Semi-Formal', description: 'Suit without tie' },
  { id: 'casual', label: 'Casual', description: 'Smart casual' },
];

type SubStep = 'guests' | 'bridesmaids' | 'groomsmen';

const SUBSTEPS: { id: SubStep; icon: typeof Users; title: string; subtitle: string }[] = [
  { id: 'guests', icon: Users, title: 'Guest Dress Code', subtitle: 'Set the dress code for your guests' },
  { id: 'bridesmaids', icon: Sparkles, title: 'Bridesmaids', subtitle: 'Colors and styles for bridesmaids' },
  { id: 'groomsmen', icon: UserCheck, title: 'Groomsmen', subtitle: 'Style guide for groomsmen' },
];

export default function OnboardingDressCodePage() {
  const t = useTranslations('onboarding.dressCode');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const [currentSubStep, setCurrentSubStep] = useState<number>(0);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorFamily, setSelectedColorFamily] = useState<string>(COLOR_FAMILIES[0].name);

  // State for each group's dress code
  const [dressCode, setDressCode] = useState<DressCode>({
    guests: {
      palette: [],
      lengths: [],
      enabled: false,
    },
    bridesmaids: {
      palette: [],
      lengths: [],
      enabled: false,
    },
    groomsmen: {
      palette: [],
      style: undefined,
      enabled: false,
    },
  });

  const currentStep = SUBSTEPS[currentSubStep];
  const currentGroup = currentStep.id;
  const currentDressCode = dressCode[currentGroup] || { palette: [], lengths: [], enabled: false };

  const handleAddColor = (color: string) => {
    const current = dressCode[currentGroup] || { palette: [], lengths: [], enabled: false };
    if (!current.palette.includes(color)) {
      setDressCode({
        ...dressCode,
        [currentGroup]: {
          ...current,
          palette: [...current.palette, color],
          enabled: true,
        },
      });
    }
  };

  const handleRemoveColor = (color: string) => {
    const current = dressCode[currentGroup] || { palette: [], lengths: [], enabled: false };
    setDressCode({
      ...dressCode,
      [currentGroup]: {
        ...current,
        palette: current.palette.filter((c) => c !== color),
      },
    });
  };

  const handleToggleLength = (length: DressLength) => {
    const current = dressCode[currentGroup] || { palette: [], lengths: [], enabled: false };
    const lengths = current.lengths || [];
    const newLengths = lengths.includes(length)
      ? lengths.filter((l) => l !== length)
      : [...lengths, length];
    setDressCode({
      ...dressCode,
      [currentGroup]: {
        ...current,
        lengths: newLengths,
        enabled: true,
      },
    });
  };

  const handleSetStyle = (style: GroomsmenStyle) => {
    const current = dressCode[currentGroup] || { palette: [], enabled: false };
    setDressCode({
      ...dressCode,
      [currentGroup]: {
        ...current,
        style,
        enabled: true,
      },
    });
  };

  const handleSkipSubStep = () => {
    // Mark as disabled and move to next
    setDressCode({
      ...dressCode,
      [currentGroup]: {
        ...currentDressCode,
        enabled: false,
      },
    });

    if (currentSubStep < SUBSTEPS.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleNextSubStep = () => {
    // Mark current as enabled if has selections
    const hasSelections = currentDressCode.palette.length > 0 ||
      (currentDressCode.lengths && currentDressCode.lengths.length > 0) ||
      currentDressCode.style;

    setDressCode({
      ...dressCode,
      [currentGroup]: {
        ...currentDressCode,
        enabled: hasSelections,
      },
    });

    if (currentSubStep < SUBSTEPS.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevSubStep = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else {
      handleBack();
    }
  };

  const handleFinish = () => {
    // Only save enabled dress codes
    const finalDressCode: DressCode = {};
    if (dressCode.guests?.enabled) finalDressCode.guests = dressCode.guests;
    if (dressCode.bridesmaids?.enabled) finalDressCode.bridesmaids = dressCode.bridesmaids;
    if (dressCode.groomsmen?.enabled) finalDressCode.groomsmen = dressCode.groomsmen;

    updateOnboarding({ dressCode: Object.keys(finalDressCode).length > 0 ? finalDressCode : null });
    nextStep();
    router.push(ROUTES.onboarding.banking);
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.location);
  };

  const isGroomsmen = currentGroup === 'groomsmen';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8">
        <IconButton variant="ghost" onClick={handlePrevSubStep} aria-label="Go back">
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-subtitle">
            STEP 4 OF 8
          </span>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress */}
      <div className="px-4 md:px-8">
        <StepIndicator currentStep={4} totalSteps={8} />
      </div>

      {/* Sub-step indicator */}
      <div className="px-4 md:px-8 mt-4">
        <div className="flex items-center justify-center gap-2">
          {SUBSTEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  index === currentSubStep
                    ? 'bg-secondary text-white'
                    : index < currentSubStep
                    ? 'bg-secondary/20 text-secondary'
                    : 'bg-card text-subtitle'
                )}
              >
                {index < currentSubStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              {index < SUBSTEPS.length - 1 && (
                <div
                  className={cn(
                    'w-8 h-0.5 mx-1',
                    index < currentSubStep ? 'bg-secondary' : 'bg-border'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-subtitle mt-2">
          {currentStep.title}
        </p>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: 'var(--secondary)', opacity: 0.1 }}
          >
            <currentStep.icon className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="text-heading-2 mb-2">{currentStep.title}</h1>
          <p className="text-subtitle">{currentStep.subtitle}</p>
        </div>

        <div className="space-y-8">
          {/* Selected Colors */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">{t('colorPalette')}</h3>
              <span className="text-xs text-subtitle">
                {currentDressCode.palette.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              {currentDressCode.palette.map((color) => (
                <div
                  key={color}
                  className="relative group"
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: color }}
                  />
                  <button
                    onClick={() => handleRemoveColor(color)}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Add Color Button */}
              <button
                type="button"
                onClick={() => setShowColorPicker(true)}
                className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center text-subtitle hover:border-secondary hover:text-secondary transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {currentDressCode.palette.length === 0 && (
              <p className="text-sm text-subtitle">
                Click + to add colors to the palette
              </p>
            )}
          </div>

          {/* Color Picker Modal */}
          {showColorPicker && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowColorPicker(false)}
              />
              <div className="relative bg-card rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Select Colors</h3>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowColorPicker(false)}
                  >
                    <X className="h-5 w-5" />
                  </IconButton>
                </div>

                {/* Color Family Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {COLOR_FAMILIES.map((family) => (
                    <button
                      key={family.name}
                      onClick={() => setSelectedColorFamily(family.name)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all',
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
                <div className="grid grid-cols-3 gap-3">
                  {COLOR_FAMILIES.find((f) => f.name === selectedColorFamily)?.colors.map(
                    (color) => {
                      const isSelected = currentDressCode.palette.includes(color.value);
                      return (
                        <button
                          key={color.value}
                          onClick={() => {
                            if (isSelected) {
                              handleRemoveColor(color.value);
                            } else {
                              handleAddColor(color.value);
                            }
                          }}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-xl border transition-all',
                            isSelected
                              ? 'border-secondary bg-secondary/10'
                              : 'border-border hover:border-secondary/50'
                          )}
                        >
                          <div
                            className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0"
                            style={{ backgroundColor: color.value }}
                          />
                          <span className="text-sm truncate">{color.name}</span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-secondary ml-auto flex-shrink-0" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setShowColorPicker(false)}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    Done ({currentDressCode.palette.length} colors)
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Dress Length (for guests and bridesmaids) */}
          {!isGroomsmen && (
            <div>
              <h3 className="font-medium text-foreground mb-4">{t('dressLength')}</h3>
              <p className="text-sm text-subtitle mb-4">Select all acceptable lengths</p>
              <div className="grid grid-cols-3 gap-4">
                {DRESS_LENGTHS.map((length) => {
                  const isSelected = currentDressCode.lengths?.includes(length.id);
                  return (
                    <button
                      key={length.id}
                      type="button"
                      onClick={() => handleToggleLength(length.id)}
                      className={cn(
                        'flex flex-col items-center gap-3 p-4 rounded-xl border transition-all',
                        isSelected
                          ? 'border-secondary bg-secondary/10'
                          : 'border-border bg-card hover:border-secondary/50'
                      )}
                    >
                      <div className="h-20 w-10 flex items-end justify-center">
                        <div
                          className={cn(
                            'w-8 rounded-t transition-colors',
                            isSelected ? 'bg-secondary' : 'bg-tertiary'
                          )}
                          style={{ height: length.height }}
                        />
                      </div>
                      <span className="text-sm font-medium">{length.label}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-secondary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Groomsmen Style */}
          {isGroomsmen && (
            <div>
              <h3 className="font-medium text-foreground mb-4">Style</h3>
              <div className="grid grid-cols-2 gap-4">
                {GROOMSMEN_STYLES.map((style) => {
                  const isSelected = currentDressCode.style === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => handleSetStyle(style.id)}
                      className={cn(
                        'flex flex-col items-start p-4 rounded-xl border transition-all text-left',
                        isSelected
                          ? 'border-secondary bg-secondary/10'
                          : 'border-border bg-card hover:border-secondary/50'
                      )}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="font-medium">{style.label}</span>
                        {isSelected && <Check className="h-4 w-4 text-secondary" />}
                      </div>
                      <span className="text-sm text-subtitle">{style.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Preview */}
          {(currentDressCode.palette.length > 0 || currentDressCode.lengths?.length || currentDressCode.style) && (
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-xs font-medium uppercase tracking-wider text-tertiary mb-2">
                {t('preview')}
              </p>
              <div className="flex items-center gap-3">
                {currentDressCode.palette.slice(0, 5).map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {currentDressCode.palette.length > 5 && (
                  <span className="text-sm text-subtitle">
                    +{currentDressCode.palette.length - 5} more
                  </span>
                )}
              </div>
              {!isGroomsmen && currentDressCode.lengths && currentDressCode.lengths.length > 0 && (
                <p className="text-sm text-subtitle mt-2">
                  Lengths: {currentDressCode.lengths.map((l) => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}
                </p>
              )}
              {isGroomsmen && currentDressCode.style && (
                <p className="text-sm text-subtitle mt-2">
                  Style: {GROOMSMEN_STYLES.find((s) => s.id === currentDressCode.style)?.label}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-background border-t border-border px-4 py-4 md:px-8">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkipSubStep}
            className="flex-1 h-12 rounded-full border-border"
          >
            Skip {currentStep.title}
          </Button>
          <Button
            onClick={handleNextSubStep}
            className="flex-1 h-12 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium"
          >
            {currentSubStep < SUBSTEPS.length - 1 ? (
              <>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              'Finish'
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
