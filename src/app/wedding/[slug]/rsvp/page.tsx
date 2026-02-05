'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Check, Users, Mail, Phone, MessageCircle, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconButton } from '@/shared/ui/atoms/IconButton';
import { useWeddingStore } from '@/entities/wedding';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';

type RsvpStatus = 'attending' | 'not-attending' | null;

export default function RsvpPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string || '';
  const { onboarding } = useWeddingStore();

  const primaryColor = onboarding.primaryColor || '#ea2e5b';

  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    dietaryRestrictions: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBack = () => {
    router.push(`/wedding/${slug}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rsvpStatus) {
      toast.error('Por favor, confirme se irá comparecer');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Por favor, informe seu nome');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Por favor, informe seu email');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call to save RSVP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      toast.success(
        rsvpStatus === 'attending'
          ? 'Presença confirmada! Nos vemos lá!'
          : 'Agradecemos por nos informar.'
      );
    } catch {
      toast.error('Erro ao confirmar presença. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            {rsvpStatus === 'attending' ? (
              <Heart className="h-10 w-10" style={{ color: primaryColor }} />
            ) : (
              <Check className="h-10 w-10" style={{ color: primaryColor }} />
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {rsvpStatus === 'attending' ? 'Presença Confirmada!' : 'Resposta Enviada'}
          </h1>
          <p className="text-subtitle mb-8">
            {rsvpStatus === 'attending'
              ? `Obrigado ${formData.name}! Mal podemos esperar para celebrar com você!`
              : `Obrigado ${formData.name} por nos informar. Sentiremos sua falta!`}
          </p>
          <Button
            onClick={handleBack}
            className="rounded-full text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Voltar ao Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="relative py-12 md:py-16 px-4"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <div className="max-w-2xl mx-auto">
          <IconButton
            variant="ghost"
            onClick={handleBack}
            className="absolute left-4 top-4"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" />
          </IconButton>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-4">
              <Mail className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm font-medium" style={{ color: primaryColor }}>
                RSVP
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              Confirme sua Presença
            </h1>
            <p className="text-subtitle text-sm md:text-base">
              {onboarding.partner1Name || 'Noivo'} & {onboarding.partner2Name || 'Noiva'} ficarão muito felizes em saber se você poderá comparecer!
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Attendance Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Você irá comparecer? *</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRsvpStatus('attending')}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl border-2 transition-all',
                  rsvpStatus === 'attending'
                    ? 'border-green-500 bg-green-50'
                    : 'border-border/50 hover:border-green-500/50'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  rsvpStatus === 'attending' ? 'bg-green-500' : 'bg-quaternary'
                )}>
                  <Check className={cn(
                    'h-6 w-6',
                    rsvpStatus === 'attending' ? 'text-white' : 'text-foreground/50'
                  )} />
                </div>
                <span className={cn(
                  'font-medium',
                  rsvpStatus === 'attending' ? 'text-green-700' : 'text-foreground'
                )}>
                  Sim, estarei lá!
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRsvpStatus('not-attending')}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl border-2 transition-all',
                  rsvpStatus === 'not-attending'
                    ? 'border-red-400 bg-red-50'
                    : 'border-border/50 hover:border-red-400/50'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  rsvpStatus === 'not-attending' ? 'bg-red-400' : 'bg-quaternary'
                )}>
                  <X className={cn(
                    'h-6 w-6',
                    rsvpStatus === 'not-attending' ? 'text-white' : 'text-foreground/50'
                  )} />
                </div>
                <span className={cn(
                  'font-medium',
                  rsvpStatus === 'not-attending' ? 'text-red-600' : 'text-foreground'
                )}>
                  Não poderei ir
                </span>
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6 space-y-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: primaryColor }} />
              Suas Informações
            </h2>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">
                Nome Completo *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome"
                className="bg-input-bg border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm flex items-center gap-1">
                <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
                className="bg-input-bg border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm flex items-center gap-1">
                <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(00) 00000-0000"
                className="bg-input-bg border-border"
              />
            </div>
          </div>

          {/* Additional Details (only if attending) */}
          {rsvpStatus === 'attending' && (
            <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6 space-y-4">
              <h2 className="font-semibold text-foreground">Detalhes Adicionais</h2>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-sm">
                  Número de convidados (incluindo você)
                </Label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                >
                  <option value="1">1 pessoa</option>
                  <option value="2">2 pessoas</option>
                  <option value="3">3 pessoas</option>
                  <option value="4">4 pessoas</option>
                  <option value="5">5 pessoas</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-sm">
                  Restrições alimentares
                </Label>
                <Input
                  id="dietary"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                  placeholder="Ex: vegetariano, sem glúten, alergia a frutos do mar"
                  className="bg-input-bg border-border"
                />
              </div>
            </div>
          )}

          {/* Message */}
          <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6 space-y-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <MessageCircle className="h-5 w-5" style={{ color: primaryColor }} />
              Deixe uma Mensagem
            </h2>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Escreva uma mensagem especial para os noivos..."
              rows={4}
              className="w-full px-4 py-3 bg-input-bg border border-border rounded-xl text-foreground placeholder:text-subtitle resize-none focus:outline-none focus:ring-2 focus:ring-secondary/50"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !rsvpStatus}
            className="w-full h-14 rounded-full text-white text-lg font-medium"
            style={{ backgroundColor: isSubmitting ? '#888' : primaryColor }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">...</span>
                Enviando...
              </span>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Confirmar Resposta
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
