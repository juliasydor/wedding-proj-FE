import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Gift, GiftCategory } from '@/shared/types';

interface GiftState {
  gifts: Gift[];
  selectedGifts: Gift[];
  selectedCategory: GiftCategory | 'all';
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

interface GiftActions {
  setGifts: (gifts: Gift[]) => void;
  addGift: (gift: Gift) => void;
  removeGift: (giftId: string) => void;
  toggleGiftSelection: (gift: Gift) => void;
  setSelectedCategory: (category: GiftCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearSelectedGifts: () => void;
  reset: () => void;
}

const initialState: GiftState = {
  gifts: [],
  selectedGifts: [],
  selectedCategory: 'all',
  searchQuery: '',
  isLoading: false,
  error: null,
};

export const useGiftStore = create<GiftState & GiftActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGifts: (gifts) => set({ gifts }),

      addGift: (gift) =>
        set((state) => ({
          gifts: [...state.gifts, gift],
        })),

      removeGift: (giftId) =>
        set((state) => ({
          gifts: state.gifts.filter((g) => g.id !== giftId),
          selectedGifts: state.selectedGifts.filter((g) => g.id !== giftId),
        })),

      toggleGiftSelection: (gift) =>
        set((state) => {
          const isSelected = state.selectedGifts.some((g) => g.id === gift.id);
          return {
            selectedGifts: isSelected
              ? state.selectedGifts.filter((g) => g.id !== gift.id)
              : [...state.selectedGifts, gift],
          };
        }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearSelectedGifts: () => set({ selectedGifts: [] }),

      reset: () => set(initialState),
    }),
    {
      name: 'gift-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedGifts: state.selectedGifts,
      }),
    }
  )
);

// Selectors
export const useFilteredGifts = () => {
  const { gifts, selectedCategory, searchQuery } = useGiftStore();

  return gifts.filter((gift) => {
    const matchesCategory = selectedCategory === 'all' || gift.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
};
