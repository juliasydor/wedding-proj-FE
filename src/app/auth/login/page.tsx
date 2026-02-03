'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthForm } from '@/shared/ui/organisms/AuthForm';
import { FormField } from '@/shared/ui/molecules/FormField';
import { useAuthStore } from '@/entities/user';
import { ROUTES } from '@/shared/config';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock user login
    login({
      id: '1',
      email: formData.email,
      partnerNames: 'Sarah & Tom',
      createdAt: new Date(),
    });

    router.push(ROUTES.dashboard);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthForm
        title={t('title')}
        subtitle={t('subtitle')}
        submitLabel={t('submit')}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        footerText={t('noAccount')}
        footerLinkText={t('signupLink')}
        footerLinkHref={ROUTES.signup}
      >
        <FormField
          label={t('email')}
          name="email"
          type="email"
          placeholder="hello@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />
        <FormField
          label={t('password')}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          required
        />
      </AuthForm>
    </div>
  );
}
