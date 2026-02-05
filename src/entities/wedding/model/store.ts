import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Wedding, DressCode, WeddingTheme, BankingInfo } from '@/shared/types';

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
