'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

// Mock data - will be replaced with API call
const MOCK_GIFTS: Record<string, { name: string; description: string; price: number; category: string; imageUrl?: string }> = {
  '1': { name: 'Fundo Lua de Mel', description: 'Ajude-nos a ter uma lua de mel inesquecível!', price: 500, category: 'honeymoon', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop' },
  '2': { name: 'Cafeteira Expresso', description: 'Para começar nossas manhãs juntos', price: 800, category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop' },
  '3': { name: 'Jogo de Panelas', description: 'Para cozinhar receitas de família', price: 600, category: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop' },
  '4': { name: 'Jogo de Cama', description: 'Lençóis de algodão egípcio', price: 450, category: 'bedroom', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop' },
};

export default function EditGiftPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const params = useParams();
  const giftId = params.id as string;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'other',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching gift data
    const gift = MOCK_GIFTS[giftId];
    if (gift) {
      setFormData({
        name: gift.name,
        description: gift.description,
        price: String(gift.price),
        category: gift.category,
      });
      if (gift.imageUrl) {
        setImagePreview(gift.imageUrl);
      }
    }
    setIsLoading(false);
  }, [giftId]);

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
      // TODO: Implement API call to update gift
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Presente atualizado com sucesso!');
      router.push(ROUTES.giftList);
    } catch {
      toast.error('Erro ao atualizar presente. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push(ROUTES.giftList);
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    return numericValue;
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center min-h-[50vh]">
        <p className="text-subtitle">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <IconButton variant="ghost" onClick={handleBack} aria-label="Voltar">
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div>
          <h1 className="text-xl md:text-heading-2 mb-1">Editar Presente</h1>
          <p className="text-subtitle text-sm">Atualize as informações do presente</p>
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
              'Salvar Alterações'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
