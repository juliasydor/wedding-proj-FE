'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, Upload, Gift, DollarSign, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { ROUTES } from '@/shared/config';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';

const CATEGORIES = [
  { id: 'honeymoon', label: 'Lua de Mel', icon: '✈️' },
  { id: 'kitchen', label: 'Cozinha', icon: '🍳' },
  { id: 'bedroom', label: 'Quarto', icon: '🛏️' },
  { id: 'dining', label: 'Jantar', icon: '🍽️' },
  { id: 'living', label: 'Sala', icon: '🛋️' },
  { id: 'bathroom', label: 'Banheiro', icon: '🚿' },
  { id: 'garden', label: 'Jardim', icon: '🌿' },
  { id: 'other', label: 'Outro', icon: '🎁' },
];

export default function AddGiftPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'other',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Por favor, insira o nome do presente');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to save gift
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Presente adicionado com sucesso!');
      router.push(ROUTES.giftList);
    } catch {
      toast.error('Erro ao adicionar presente. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push(ROUTES.giftList);
  };

  const formatPrice = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    return numericValue;
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <IconButton variant="ghost" onClick={handleBack} aria-label="Voltar">
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div>
          <h1 className="text-xl md:text-heading-2 mb-1">Adicionar Presente</h1>
          <p className="text-subtitle text-sm">Preencha as informações do presente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="h-5 w-5 text-secondary" />
            <h2 className="font-semibold text-foreground">Foto do Presente</h2>
          </div>

          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview do presente"
                className="w-full h-48 md:h-64 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 md:h-64 rounded-xl border-2 border-dashed border-border/50 bg-quaternary/30 cursor-pointer hover:border-secondary/50 transition-colors">
              <Upload className="h-10 w-10 text-subtitle mb-3" />
              <p className="text-foreground font-medium mb-1">Clique para enviar</p>
              <p className="text-xs text-subtitle">PNG, JPG até 5MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Gift Details */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-5 w-5 text-secondary" />
            <h2 className="font-semibold text-foreground">Detalhes do Presente</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">
                Nome do Presente *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Cafeteira Expresso"
                className="bg-input-bg border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm">
                Descrição
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o presente..."
                rows={3}
                className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-secondary" />
                Valor (R$) *
              </Label>
              <Input
                id="price"
                type="text"
                inputMode="decimal"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: formatPrice(e.target.value) })}
                placeholder="0.00"
                className="bg-input-bg border-border"
                required
              />
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📂</span>
            <h2 className="font-semibold text-foreground">Categoria</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFormData({ ...formData, category: category.id })}
                className={cn(
                  'flex flex-col items-center gap-1 p-3 rounded-xl transition-all',
                  formData.category === category.id
                    ? 'bg-secondary/10 border-2 border-secondary text-foreground'
                    : 'bg-quaternary/50 border-2 border-transparent text-foreground/70 hover:bg-quaternary'
                )}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-xs font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 h-12 rounded-full border-border"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-12 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Salvando...
              </span>
            ) : (
              'Adicionar Presente'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
