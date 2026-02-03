import { create } from 'zustand';
import type { Guest } from '@/shared/types';

type RSVPFilter = 'all' | 'pending' | 'confirmed' | 'declined';

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
  setRsvpFilter: (filter: RSVPFilter) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: GuestState = {
  guests: [],
  rsvpFilter: 'all',
  searchQuery: '',
  isLoading: false,
  error: null,
};

export const useGuestStore = create<GuestState & GuestActions>()((set) => ({
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

  setRsvpFilter: (filter) => set({ rsvpFilter: filter }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));

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

  return {
    total: guests.length,
    confirmed: guests.filter((g) => g.rsvpStatus === 'confirmed').length,
    pending: guests.filter((g) => g.rsvpStatus === 'pending').length,
    declined: guests.filter((g) => g.rsvpStatus === 'declined').length,
  };
};
