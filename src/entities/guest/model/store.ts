import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Guest } from '@/shared/types';

type RSVPFilter = 'all' | 'pending' | 'confirmed' | 'declined';

export interface RSVPFormData {
  weddingId: string;
  name: string;
  email: string;
  phone?: string;
  attending: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  message?: string;
}

interface GuestState {
  guests: Guest[];
  rsvpFilter: RSVPFilter;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

interface GuestActions {
  setGuests: (guests: Guest[]) => void;
  addGuest: (guest: Guest) => void;
  updateGuest: (guestId: string, data: Partial<Guest>) => void;
  removeGuest: (guestId: string) => void;
  confirmRSVP: (data: RSVPFormData) => Guest;
  setRsvpFilter: (filter: RSVPFilter) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  getGuestsByWedding: (weddingId: string) => Guest[];
  reset: () => void;
}

const initialState: GuestState = {
  guests: [],
  rsvpFilter: 'all',
  searchQuery: '',
  isLoading: false,
  error: null,
};

export const useGuestStore = create<GuestState & GuestActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGuests: (guests) => set({ guests }),

      addGuest: (guest) =>
        set((state) => ({
          guests: [...state.guests, guest],
        })),

      updateGuest: (guestId, data) =>
        set((state) => ({
          guests: state.guests.map((g) => (g.id === guestId ? { ...g, ...data } : g)),
        })),

      removeGuest: (guestId) =>
        set((state) => ({
          guests: state.guests.filter((g) => g.id !== guestId),
        })),

      confirmRSVP: (data: RSVPFormData) => {
        const newGuest: Guest = {
          id: `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          weddingId: data.weddingId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          rsvpStatus: data.attending ? 'confirmed' : 'declined',
          plusOne: data.numberOfGuests > 1,
          numberOfGuests: data.numberOfGuests,
          dietaryRestrictions: data.dietaryRestrictions,
          message: data.message,
          confirmedAt: new Date(),
          source: 'rsvp-form',
        };

        set((state) => ({
          guests: [...state.guests, newGuest],
        }));

        return newGuest;
      },

      setRsvpFilter: (filter) => set({ rsvpFilter: filter }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      getGuestsByWedding: (weddingId: string) => {
        return get().guests.filter((g) => g.weddingId === weddingId);
      },

      reset: () => set(initialState),
    }),
    {
      name: 'guest-storage',
      partialize: (state) => ({ guests: state.guests }),
    }
  )
);

// Selectors
export const useFilteredGuests = () => {
  const { guests, rsvpFilter, searchQuery } = useGuestStore();

  return guests.filter((guest) => {
    const matchesFilter = rsvpFilter === 'all' || guest.rsvpStatus === rsvpFilter;
    const matchesSearch =
      !searchQuery ||
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });
};

export const useGuestStats = () => {
  const { guests } = useGuestStore();

  const confirmedGuests = guests.filter((g) => g.rsvpStatus === 'confirmed');
  const totalAttendees = confirmedGuests.reduce((sum, g) => sum + (g.numberOfGuests || 1), 0);

  return {
    total: guests.length,
    confirmed: confirmedGuests.length,
    totalAttendees,
    pending: guests.filter((g) => g.rsvpStatus === 'pending').length,
    declined: guests.filter((g) => g.rsvpStatus === 'declined').length,
  };
};
