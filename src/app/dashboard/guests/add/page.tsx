'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ChevronLeft,
  Plus,
  UserPlus,
  Phone,
  User,
  AtSign,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { ROUTES } from '@/shared/config';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';

const STATUS_OPTIONS = [
  { id: 'pending' as const, label: 'Pendente', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' },
  { id: 'confirmed' as const, label: 'Confirmado', color: 'bg-green-500/20 text-green-500 border-green-500/30' },
  { id: 'declined' as const, label: 'Recusado', color: 'bg-red-500/20 text-red-500 border-red-500/30' },
];

export default function AddGuestPage() {
  const t = useTranslations('dashboard.guests');
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'pending' as 'pending' | 'confirmed' | 'declined',
    hasPlusOne: false,
    plusOneName: '',
    dietaryRestrictions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Por favor, preencha nome e email do convidado.');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to save guest
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Convidado adicionado com sucesso!');
      router.push(ROUTES.guests);
    } catch {
      toast.error('Erro ao adicionar convidado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push(ROUTES.guests);
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <IconButton variant="ghost" onClick={handleBack} aria-label="Voltar">
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div>
          <h1 className="text-xl md:text-heading-2 mb-1">Adicionar Convidado</h1>
          <p className="text-subtitle text-sm">Preencha as informações do convidado</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Guest Information */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="h-5 w-5 text-secondary" />
            <h2 className="font-semibold text-foreground">Dados do Convidado</h2>
          </div>

          <div className="space-y-4">
            {/* Guest Name */}
            <div className="space-y-2">
              <Label htmlFor="guest-name" className="text-sm flex items-center gap-2">
                <User className="h-4 w-4 text-secondary" />
                Nome completo *
              </Label>
              <Input
                id="guest-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Maria da Silva"
                className="bg-input-bg border-border"
                required
              />
            </div>

            {/* Guest Email */}
            <div className="space-y-2">
              <Label htmlFor="guest-email" className="text-sm flex items-center gap-2">
                <AtSign className="h-4 w-4 text-secondary" />
                Email *
              </Label>
              <Input
                id="guest-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ex: maria@email.com"
                className="bg-input-bg border-border"
                required
              />
            </div>

            {/* Guest Phone */}
            <div className="space-y-2">
              <Label htmlFor="guest-phone" className="text-sm flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                Telefone
              </Label>
              <Input
                id="guest-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ex: (11) 99999-9999"
                className="bg-input-bg border-border"
              />
            </div>
          </div>
        </div>

        {/* Status Selection */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="h-5 w-5 text-secondary" />
            <h2 className="font-semibold text-foreground">Status de Confirmação</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFormData({ ...formData, status: option.id })}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                  formData.status === option.id
                    ? option.color
                    : 'bg-quaternary text-foreground/70 border-transparent hover:border-border'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6">
          <div className="space-y-2">
            <Label htmlFor="dietary" className="text-sm text-foreground">
              Restrições Alimentares
            </Label>
            <Input
              id="dietary"
              value={formData.dietaryRestrictions}
              onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
              placeholder="Ex: Vegetariano, sem glúten..."
              className="bg-input-bg border-border"
            />
          </div>
        </div>

        {/* Plus One */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Checkbox
              id="has-plus-one"
              checked={formData.hasPlusOne}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, hasPlusOne: checked as boolean })
              }
              className="border-border data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <Label
              htmlFor="has-plus-one"
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              Possui acompanhante
            </Label>
          </div>

          {formData.hasPlusOne && (
            <div className="space-y-4 p-4 bg-tertiary/10 rounded-xl border border-tertiary/20">
              <div className="flex items-center gap-2 text-tertiary text-sm font-medium">
                <UserPlus className="h-4 w-4" />
                Dados do Acompanhante
              </div>

              <div className="space-y-2">
                <Label htmlFor="plus-one-name" className="text-sm">
                  Nome do acompanhante
                </Label>
                <Input
                  id="plus-one-name"
                  value={formData.plusOneName}
                  onChange={(e) => setFormData({ ...formData, plusOneName: e.target.value })}
                  placeholder="Ex: Carlos da Silva"
                  className="bg-input-bg border-border"
                />
              </div>

            </div>
          )}
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
              <>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Convidado
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
