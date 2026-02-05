'use client';

import { useState } from 'react';
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Type,
  Image,
  Quote,
  Video,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  Edit2,
  X,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/shared/lib/utils';
import type { CustomSection, CustomSectionType } from '@/entities/wedding';

interface SectionBlockEditorProps {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
  primaryColor?: string;
}

const SECTION_TYPES: { type: CustomSectionType; label: string; icon: React.ReactNode; description: string }[] = [
  { type: 'text', label: 'Texto', icon: <Type className="h-5 w-5" />, description: 'Bloco de texto com título' },
  { type: 'image', label: 'Imagem', icon: <Image className="h-5 w-5" />, description: 'Imagem com legenda' },
  { type: 'quote', label: 'Citação', icon: <Quote className="h-5 w-5" />, description: 'Citação ou frase especial' },
  { type: 'video', label: 'Vídeo', icon: <Video className="h-5 w-5" />, description: 'Vídeo do YouTube ou Vimeo' },
  { type: 'map', label: 'Mapa', icon: <MapPin className="h-5 w-5" />, description: 'Localização no mapa' },
  { type: 'timeline', label: 'Cronograma', icon: <Clock className="h-5 w-5" />, description: 'Timeline de eventos' },
];

function generateId(): string {
  return `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function SectionBlockEditor({ sections, onChange, primaryColor = '#ea2e5b' }: SectionBlockEditorProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addSection = (type: CustomSectionType) => {
    const newSection: CustomSection = {
      id: generateId(),
      type,
      title: '',
      content: '',
      order: sections.length,
      isVisible: true,
    };
    onChange([...sections, newSection]);
    setEditingId(newSection.id);
    setShowAddMenu(false);
  };

  const updateSection = (id: string, updates: Partial<CustomSection>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSection = (id: string) => {
    onChange(sections.filter((s) => s.id !== id).map((s, index) => ({ ...s, order: index })));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex((s) => s.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[swapIndex]] = [newSections[swapIndex], newSections[index]];

    onChange(newSections.map((s, i) => ({ ...s, order: i })));
  };

  const toggleVisibility = (id: string) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s)));
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateSection(id, { imageUrl: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const getSectionIcon = (type: CustomSectionType) => {
    const sectionType = SECTION_TYPES.find((t) => t.type === type);
    return sectionType?.icon || <Type className="h-5 w-5" />;
  };

  const getSectionLabel = (type: CustomSectionType) => {
    const sectionType = SECTION_TYPES.find((t) => t.type === type);
    return sectionType?.label || 'Seção';
  };

  return (
    <div className="space-y-4">
      {/* Section List */}
      <div className="space-y-3">
        {sections.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-border rounded-xl">
            <Type className="h-8 w-8 mx-auto mb-2 text-subtitle" />
            <p className="text-sm text-subtitle mb-1">Nenhuma seção personalizada</p>
            <p className="text-xs text-subtitle/70">Clique em "Adicionar Seção" para começar</p>
          </div>
        ) : (
          sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <div
                key={section.id}
                className={cn(
                  'border rounded-xl overflow-hidden transition-all',
                  editingId === section.id ? 'border-secondary' : 'border-border/50',
                  !section.isVisible && 'opacity-60'
                )}
              >
                {/* Section Header */}
                <div className="flex items-center gap-2 p-3 bg-quaternary/30">
                  <GripVertical className="h-4 w-4 text-subtitle cursor-grab" />
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <span style={{ color: primaryColor }}>{getSectionIcon(section.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {section.title || `${getSectionLabel(section.type)} sem título`}
                    </p>
                    <p className="text-xs text-subtitle">{getSectionLabel(section.type)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveSection(section.id, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded hover:bg-quaternary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp className="h-4 w-4 text-subtitle" />
                    </button>
                    <button
                      onClick={() => moveSection(section.id, 'down')}
                      disabled={index === sections.length - 1}
                      className="p-1.5 rounded hover:bg-quaternary disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown className="h-4 w-4 text-subtitle" />
                    </button>
                    <button
                      onClick={() => toggleVisibility(section.id)}
                      className="p-1.5 rounded hover:bg-quaternary"
                    >
                      {section.isVisible ? (
                        <Eye className="h-4 w-4 text-subtitle" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-subtitle" />
                      )}
                    </button>
                    <button
                      onClick={() => setEditingId(editingId === section.id ? null : section.id)}
                      className="p-1.5 rounded hover:bg-quaternary"
                    >
                      {editingId === section.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Edit2 className="h-4 w-4 text-subtitle" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-1.5 rounded hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Section Edit Form */}
                {editingId === section.id && (
                  <div className="p-4 space-y-4 border-t border-border/50">
                    <div className="space-y-2">
                      <Label className="text-sm">Título</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        placeholder={`Título da ${getSectionLabel(section.type).toLowerCase()}`}
                        className="bg-input-bg border-border"
                      />
                    </div>

                    {(section.type === 'text' || section.type === 'quote' || section.type === 'timeline') && (
                      <div className="space-y-2">
                        <Label className="text-sm">
                          {section.type === 'quote' ? 'Citação' : 'Conteúdo'}
                        </Label>
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, { content: e.target.value })}
                          rows={4}
                          placeholder={
                            section.type === 'quote'
                              ? 'Digite a citação ou frase especial...'
                              : 'Digite o conteúdo da seção...'
                          }
                          className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        />
                      </div>
                    )}

                    {section.type === 'image' && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm">Imagem</Label>
                          <label
                            className={cn(
                              'flex flex-col items-center justify-center',
                              'w-full h-32 rounded-xl border-2 border-dashed cursor-pointer',
                              'transition-all duration-300',
                              section.imageUrl
                                ? 'border-secondary bg-secondary/5'
                                : 'border-border/50 hover:border-secondary/50 bg-quaternary/30'
                            )}
                          >
                            {section.imageUrl ? (
                              <img
                                src={section.imageUrl}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <div className="text-center">
                                <Image className="h-8 w-8 text-subtitle mx-auto mb-2" />
                                <p className="text-sm text-subtitle">Clique para upload</p>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(section.id, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Legenda (opcional)</Label>
                          <Input
                            value={section.content}
                            onChange={(e) => updateSection(section.id, { content: e.target.value })}
                            placeholder="Descrição da imagem..."
                            className="bg-input-bg border-border"
                          />
                        </div>
                      </>
                    )}

                    {section.type === 'video' && (
                      <div className="space-y-2">
                        <Label className="text-sm">URL do Vídeo</Label>
                        <Input
                          value={section.videoUrl || ''}
                          onChange={(e) => updateSection(section.id, { videoUrl: e.target.value })}
                          placeholder="https://youtube.com/watch?v=..."
                          className="bg-input-bg border-border"
                        />
                        <p className="text-xs text-subtitle">
                          Cole o link do YouTube ou Vimeo
                        </p>
                      </div>
                    )}

                    {section.type === 'map' && (
                      <div className="space-y-2">
                        <Label className="text-sm">Endereço ou Coordenadas</Label>
                        <Input
                          value={section.content}
                          onChange={(e) => updateSection(section.id, { content: e.target.value })}
                          placeholder="Rua, Número, Cidade - Estado"
                          className="bg-input-bg border-border"
                        />
                        <p className="text-xs text-subtitle">
                          Digite o endereço completo do local
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {/* Add Section Button */}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full rounded-xl border-dashed border-2 py-6 hover:border-secondary hover:bg-secondary/5"
        >
          <Plus className="h-5 w-5 mr-2" />
          Adicionar Seção
        </Button>

        {/* Add Section Menu */}
        {showAddMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowAddMenu(false)}
            />
            <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-card border border-border rounded-xl shadow-lg z-50">
              <div className="grid grid-cols-2 gap-2">
                {SECTION_TYPES.map((sectionType) => (
                  <button
                    key={sectionType.type}
                    onClick={() => addSection(sectionType.type)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-quaternary transition-colors text-left"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <span style={{ color: primaryColor }}>{sectionType.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{sectionType.label}</p>
                      <p className="text-xs text-subtitle">{sectionType.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
