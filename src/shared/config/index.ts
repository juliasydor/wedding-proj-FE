export const APP_CONFIG = {
  name: 'Véu & Gravata',
  description: 'Create your personalized wedding website',
  defaultLocale: 'pt' as const,
  locales: ['pt', 'en'] as const,
} as const;

export const ROUTES = {
  home: '/',
  login: '/auth/login',
  signup: '/auth/signup',
  onboarding: {
    names: '/onboarding/names',
    date: '/onboarding/date',
    location: '/onboarding/location',
    dressCode: '/onboarding/dress-code',
    theme: '/onboarding/theme',
    banking: '/onboarding/banking',
    template: '/onboarding/template',
    giftList: '/onboarding/gift-list',
    preview: '/onboarding/preview',
    qrCode: '/onboarding/qr-code',
  },
  dashboard: '/dashboard',
  siteEditor: '/dashboard/site',
  giftList: '/dashboard/gifts',
  addGift: '/dashboard/gifts/add',
  guests: '/dashboard/guests',
  invitations: '/dashboard/invitations',
  settings: '/dashboard/settings',
  weddingSite: (slug: string) => `/wedding/${slug}`,
  checkout: '/checkout',
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
  },
  wedding: {
    create: '/api/wedding',
    get: (id: string) => `/api/wedding/${id}`,
    update: (id: string) => `/api/wedding/${id}`,
    getBySlug: (slug: string) => `/api/wedding/slug/${slug}`,
  },
  gifts: {
    list: '/api/gifts',
    create: '/api/gifts',
    update: (id: string) => `/api/gifts/${id}`,
    delete: (id: string) => `/api/gifts/${id}`,
    popular: '/api/gifts/popular',
  },
  guests: {
    list: '/api/guests',
    create: '/api/guests',
    update: (id: string) => `/api/guests/${id}`,
    delete: (id: string) => `/api/guests/${id}`,
    rsvp: '/api/guests/rsvp',
    import: '/api/guests/import',
  },
  invitations: {
    send: '/api/invitations/send',
    sendBulk: '/api/invitations/send-bulk',
    resend: (guestId: string) => `/api/invitations/resend/${guestId}`,
    status: (guestId: string) => `/api/invitations/status/${guestId}`,
    stats: '/api/invitations/stats',
    webhook: '/api/invitations/webhook',
  },
  payments: {
    checkout: '/api/payments/checkout',
    webhook: '/api/payments/webhook',
  },
} as const;
