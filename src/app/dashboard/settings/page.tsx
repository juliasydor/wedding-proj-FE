'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  User,
  CreditCard,
  Bell,
  Globe,
  Shield,
  Trash2,
  Save,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/entities/user';
import { useWeddingStore } from '@/entities/wedding';
import { toast } from 'sonner';

type SettingsSection = 'account' | 'banking' | 'notifications' | 'language';

export default function SettingsPage() {
  const t = useTranslations('dashboard.settings');
  const { user } = useAuthStore();
  const { onboarding } = useWeddingStore();

  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    gifts: true,
    rsvp: true,
  });
  const [language, setLanguage] = useState('pt');

  const sections = [
    { id: 'account' as SettingsSection, icon: User, label: t('account') },
    { id: 'banking' as SettingsSection, icon: CreditCard, label: t('banking') },
    { id: 'notifications' as SettingsSection, icon: Bell, label: t('notifications') },
    { id: 'language' as SettingsSection, icon: Globe, label: t('language') },
  ];

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-heading-2 mb-1 md:mb-2">{t('title')}</h1>
        <p className="text-subtitle text-sm md:text-base">{t('subtitle')}</p>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
              activeSection === section.id
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-quaternary text-foreground/70'
            )}
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  activeSection === section.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-quaternary'
                )}
              >
                <section.icon className="h-5 w-5" />
                {section.label}
                <ChevronRight className="h-4 w-4 ml-auto" />
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border/50">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all">
              <Trash2 className="h-5 w-5" />
              Excluir Conta
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-card rounded-2xl md:rounded-3xl border border-border/50 p-4 md:p-8">
          {/* Account */}
          {activeSection === 'account' && (
            <div className="max-w-lg">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Informações da Conta</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || 'casal@email.com'}
                    className="bg-input-bg border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partners" className="text-sm">Nomes do Casal</Label>
                  <Input
                    id="partners"
                    defaultValue={`${onboarding.partner1Name || ''} & ${onboarding.partner2Name || ''}`}
                    className="bg-input-bg border-border"
                  />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-medium text-foreground mb-3 md:mb-4 text-sm">Alterar Senha</h4>
                  <div className="space-y-3 md:space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-sm">Senha Atual</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-sm">Nova Senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm">Confirmar Nova Senha</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="bg-input-bg border-border"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}

          {/* Banking */}
          {activeSection === 'banking' && (
            <div className="max-w-lg">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">Dados Bancários</h3>
              <p className="text-subtitle text-xs md:text-sm mb-4 md:mb-6">
                Configure sua conta para receber os presentes em dinheiro
              </p>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-500 shrink-0" />
                  <div>
                    <p className="font-medium text-green-500 text-sm">Dados Protegidos</p>
                    <p className="text-xs md:text-sm text-green-500/80">
                      Suas informações são criptografadas e seguras
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bank" className="text-sm">Banco</Label>
                  <Input
                    id="bank"
                    placeholder="Nome do banco"
                    defaultValue={onboarding.bankingInfo?.bankName || ''}
                    className="bg-input-bg border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency" className="text-sm">Agência</Label>
                    <Input
                      id="agency"
                      placeholder="0000"
                      defaultValue={onboarding.bankingInfo?.routingNumber || ''}
                      className="bg-input-bg border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account" className="text-sm">Conta</Label>
                    <Input
                      id="account"
                      placeholder="00000-0"
                      defaultValue={onboarding.bankingInfo?.accountNumber || ''}
                      className="bg-input-bg border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pix" className="text-sm">Chave PIX</Label>
                  <Input
                    id="pix"
                    placeholder="CPF, email ou telefone"
                    className="bg-input-bg border-border"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Dados Bancários
                </Button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="max-w-lg">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Preferências de Notificação</h3>
              <div className="space-y-3 md:space-y-6">
                <div className="flex items-center justify-between p-3 md:p-4 bg-quaternary/30 rounded-xl gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm">Notificações por Email</p>
                    <p className="text-xs md:text-sm text-subtitle">Receba atualizações no seu email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 bg-quaternary/30 rounded-xl gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm">Notificações Push</p>
                    <p className="text-xs md:text-sm text-subtitle">Receba alertas no navegador</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, push: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 bg-quaternary/30 rounded-xl gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm">Novos Presentes</p>
                    <p className="text-xs md:text-sm text-subtitle">Seja avisado quando receber um presente</p>
                  </div>
                  <Switch
                    checked={notifications.gifts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, gifts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 bg-quaternary/30 rounded-xl gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm">Confirmações de Presença</p>
                    <p className="text-xs md:text-sm text-subtitle">Atualizações de RSVP dos convidados</p>
                  </div>
                  <Switch
                    checked={notifications.rsvp}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, rsvp: checked })
                    }
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Preferências
                </Button>
              </div>
            </div>
          )}

          {/* Language */}
          {activeSection === 'language' && (
            <div className="max-w-lg">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Idioma do Site</h3>
              <div className="space-y-3 md:space-y-4">
                <button
                  onClick={() => setLanguage('pt')}
                  className={cn(
                    'w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 transition-all',
                    language === 'pt'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border/50 hover:border-secondary/50'
                  )}
                >
                  <span className="text-xl md:text-2xl">🇧🇷</span>
                  <div className="text-left">
                    <p className="font-medium text-foreground text-sm">Português (Brasil)</p>
                    <p className="text-xs md:text-sm text-subtitle">Idioma padrão</p>
                  </div>
                  {language === 'pt' && (
                    <div className="ml-auto w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-white text-xs md:text-sm">✓</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 transition-all',
                    language === 'en'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border/50 hover:border-secondary/50'
                  )}
                >
                  <span className="text-xl md:text-2xl">🇺🇸</span>
                  <div className="text-left">
                    <p className="font-medium text-foreground text-sm">English (US)</p>
                    <p className="text-xs md:text-sm text-subtitle">English language</p>
                  </div>
                  {language === 'en' && (
                    <div className="ml-auto w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-white text-xs md:text-sm">✓</span>
                    </div>
                  )}
                </button>

                <Button
                  onClick={handleSave}
                  className="mt-2 md:mt-4 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Idioma
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Delete Account */}
      <div className="md:hidden mt-6 pt-6 border-t border-border/50">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all">
          <Trash2 className="h-4 w-4" />
          Excluir Conta
        </button>
      </div>
    </div>
  );
}
