export { ModernEleganceTemplate } from './ModernEleganceTemplate';
export { ClassicRomanceTemplate } from './ClassicRomanceTemplate';
export { RusticGardenTemplate } from './RusticGardenTemplate';
export { BohemianDreamTemplate } from './BohemianDreamTemplate';

export const TEMPLATE_CONFIG = {
  'modern-elegance': {
    id: 'modern-elegance',
    name: 'Modern Elegance',
    category: 'modern',
    defaultColors: { primary: '#ea2e5b', secondary: '#F1557C' },
    preview: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
  },
  'classic-romance': {
    id: 'classic-romance',
    name: 'Classic Romance',
    category: 'classic',
    defaultColors: { primary: '#c9a959', secondary: '#8b6914' },
    preview: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop',
  },
  'rustic-garden': {
    id: 'rustic-garden',
    name: 'Rustic Garden',
    category: 'rustic',
    defaultColors: { primary: '#5d7052', secondary: '#8fa67a' },
    preview: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
  },
  'bohemian-dream': {
    id: 'bohemian-dream',
    name: 'Bohemian Dream',
    category: 'boho',
    defaultColors: { primary: '#d4a574', secondary: '#c4956a' },
    preview: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
  },
} as const;

export type TemplateId = keyof typeof TEMPLATE_CONFIG;
