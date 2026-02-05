import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Wedding, DressCode, WeddingTheme, BankingInfo } from '@/shared/types';

// Custom section types for user-created content blocks
export type CustomSectionType = 'text' | 'image' | 'quote' | 'video' | 'map' | 'timeline';

export interface CustomSection {
  id: string;
  type: CustomSectionType;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  order: number;
  isVisible: boolean;
}

// Customizable content for different sections
export interface SiteContent {
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  // Our Story section
  storyTitle: string;
  storyContent: string;
  storyImage: string | null;
  showStorySection: boolean;
  // Ceremony & Reception section
  ceremonyTitle: string;
  ceremonyTime: string;
  ceremonyDescription: string;
  receptionTitle: string;
  receptionTime: string;
  receptionDescription: string;
  // Countdown section
  countdownTitle: string;
  showCountdown: boolean;
  // RSVP section
  rsvpTitle: string;
  rsvpDescription: string;
  showRsvpSection: boolean;
  // Accommodations section
  accommodationsTitle: string;
  accommodationsContent: string;
  showAccommodationsSection: boolean;
  // Gift section
  giftTitle: string;
  giftDescription: string;
  showGiftSection: boolean;
  // Gallery section
  galleryTitle: string;
  galleryImages: string[];
  showGallerySection: boolean;
  // Footer
  footerMessage: string;
}

interface OnboardingData {
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  venue: string;
  dressCode: DressCode | null;
  theme: WeddingTheme | null;
  templateId: string | null;
  bankingInfo: BankingInfo | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  heroImage: string | null;
  siteContent: SiteContent;
  customSections: CustomSection[];
}

interface WeddingState {
  wedding: Wedding | null;
  onboarding: OnboardingData;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
}

interface WeddingActions {
  setWedding: (wedding: Wedding | null) => void;
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetOnboarding: () => void;
  reset: () => void;
}

const initialSiteContent: SiteContent = {
  heroTitle: 'We\'re Getting Married',
  heroSubtitle: 'Join us to celebrate our love',
  storyTitle: 'Nossa História',
  storyContent: 'Uma história de amor que começou...',
  storyImage: null,
  showStorySection: true,
  ceremonyTitle: 'Cerimônia',
  ceremonyTime: '17:00',
  ceremonyDescription: 'A cerimônia será realizada ao ar livre',
  receptionTitle: 'Recepção',
  receptionTime: '19:00',
  receptionDescription: 'Celebre conosco com música e boa comida',
  countdownTitle: 'Contagem Regressiva',
  showCountdown: true,
  rsvpTitle: 'Confirme sua Presença',
  rsvpDescription: 'Por favor, confirme sua presença até 30 dias antes do evento',
  showRsvpSection: true,
  accommodationsTitle: 'Hospedagem',
  accommodationsContent: 'Sugerimos os seguintes hotéis próximos ao local do evento...',
  showAccommodationsSection: false,
  giftTitle: 'Lista de Presentes',
  giftDescription: 'Sua presença é o nosso maior presente, mas se desejar nos presentear...',
  showGiftSection: true,
  galleryTitle: 'Nossa Galeria',
  galleryImages: [],
  showGallerySection: false,
  footerMessage: 'Mal podemos esperar para celebrar com você!',
};

const initialOnboarding: OnboardingData = {
  partner1Name: '',
  partner2Name: '',
  date: null,
  location: '',
  venue: '',
  dressCode: null,
  theme: null,
  templateId: null,
  bankingInfo: null,
  primaryColor: null,
  secondaryColor: null,
  heroImage: null,
  siteContent: initialSiteContent,
  customSections: [],
};

const initialState: WeddingState = {
  wedding: null,
  onboarding: initialOnboarding,
  currentStep: 1,
  isLoading: false,
  error: null,
};

export const useWeddingStore = create<WeddingState & WeddingActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setWedding: (wedding) => set({ wedding }),

      updateOnboarding: (data) =>
        set((state) => ({
          onboarding: { ...state.onboarding, ...data },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 10),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      resetOnboarding: () =>
        set({
          onboarding: initialOnboarding,
          currentStep: 1,
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'wedding-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wedding: state.wedding,
        onboarding: state.onboarding,
        currentStep: state.currentStep,
      }),
    }
  )
);
