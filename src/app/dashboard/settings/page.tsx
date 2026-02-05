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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-2 mb-2">{t('title')}</h1>
        <p className="text-subtitle">{t('subtitle')}</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
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
        <div className="flex-1 bg-card rounded-3xl border border-border/50 p-8">
          {/* Account */}
          {activeSection === 'account' && (
            <div className="max-w-lg">
              <h3 className="text-lg font-semibold text-foreground mb-6">Informações da Conta</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || 'casal@email.com'}
                    className="bg-input-bg border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partners">Nomes do Casal</Label>
                  <Input
                    id="partners"
                    defaultValue={`${onboarding.partner1Name || ''} & ${onboarding.partner2Name || ''}`}
                    className="bg-input-bg border-border"
                  />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-medium text-foreground mb-4">Alterar Senha</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="bg-input-bg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
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
                  className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
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
              <h3 className="text-lg font-semibold text-foreground mb-2">Dados Bancários</h3>
              <p className="text-subtitle text-sm mb-6">
                Configure sua conta para receber os presentes em dinheiro
              </p>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-500">Dados Protegidos</p>
                    <p className="text-sm text-green-500/80">
                      Suas informações são criptografadas e seguras
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bank">Banco</Label>
                  <Input
                    id="bank"
                    placeholder="Nome do banco"
                    defaultValue={onboarding.bankingInfo?.bankName || ''}
                    className="bg-input-bg border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency">Agência</Label>
                    <Input
                      id="agency"
                      placeholder="0000"
                      defaultValue={onboarding.bankingInfo?.routingNumber || ''}
                      className="bg-input-bg border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account">Conta</Label>
                    <Input
                      id="account"
                      placeholder="00000-0"
                      defaultValue={onboarding.bankingInfo?.accountNumber || ''}
                      className="bg-input-bg border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pix">Chave PIX</Label>
                  <Input
                    id="pix"
                    placeholder="CPF, email ou telefone"
                    className="bg-input-bg border-border"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
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
              <h3 className="text-lg font-semibold text-foreground mb-6">Preferências de Notificação</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-quaternary/30 rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">Notificações por Email</p>
                    <p className="text-sm text-subtitle">Receba atualizações no seu email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-quaternary/30 rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">Notificações Push</p>
                    <p className="text-sm text-subtitle">Receba alertas no navegador</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, push: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-quaternary/30 rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">Novos Presentes</p>
                    <p className="text-sm text-subtitle">Seja avisado quando receber um presente</p>
                  </div>
                  <Switch
                    checked={notifications.gifts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, gifts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-quaternary/30 rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">Confirmações de Presença</p>
                    <p className="text-sm text-subtitle">Atualizações de RSVP dos convidados</p>
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
                  className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
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
              <h3 className="text-lg font-semibold text-foreground mb-6">Idioma do Site</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setLanguage('pt')}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                    language === 'pt'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border/50 hover:border-secondary/50'
                  )}
                >
                  <span className="text-2xl">🇧🇷</span>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Português (Brasil)</p>
                    <p className="text-sm text-subtitle">Idioma padrão</p>
                  </div>
                  {language === 'pt' && (
                    <div className="ml-auto w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                    language === 'en'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border/50 hover:border-secondary/50'
                  )}
                >
                  <span className="text-2xl">🇺🇸</span>
                  <div className="text-left">
                    <p className="font-medium text-foreground">English (US)</p>
                    <p className="text-sm text-subtitle">English language</p>
                  </div>
                  {language === 'en' && (
                    <div className="ml-auto w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </button>

                <Button
                  onClick={handleSave}
                  className="mt-4 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Idioma
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
