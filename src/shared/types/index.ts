export interface User {
  id: string;
  email: string;
  partnerNames: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Wedding {
  id: string;
  userId: string;
  partner1Name: string;
  partner2Name: string;
  date: Date;
  location: string;
  venue?: string;
  dressCode: DressCode;
  theme: WeddingTheme;
  templateId: string;
  slug: string;
  bannerImageUrl?: string;
  isPublished: boolean;
  bankingInfo?: BankingInfo;
  createdAt: Date;
  updatedAt: Date;
}

export type DressLength = 'short' | 'midi' | 'long';
export type GroomsmenStyle = 'suit' | 'tuxedo' | 'casual' | 'semi-formal';

export interface DressCodeGroup {
  palette: string[];
  lengths?: DressLength[];
  style?: GroomsmenStyle;
  enabled: boolean;
}

export interface DressCode {
  guests?: DressCodeGroup;
  bridesmaids?: DressCodeGroup;
  groomsmen?: DressCodeGroup;
}

export interface WeddingPartyMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  description?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  description?: string;
  icon?: string;
}

export interface TravelTip {
  id: string;
  title: string;
  content: string;
  links?: { label: string; url: string }[];
}

export interface Accommodation {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  priceRange?: string;
  bookingUrl?: string;
  distance?: string;
}

export interface WeddingTheme {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'rustic' | 'boho' | 'minimalist';
}

export interface BankingInfo {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
}

export interface Gift {
  id: string;
  weddingId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: GiftCategory;
  isSelected: boolean;
  contributedAmount: number;
  contributors: GiftContributor[];
}

export type GiftCategory =
  | 'honeymoon'
  | 'kitchen'
  | 'dining'
  | 'bedroom'
  | 'bathroom'
  | 'living'
  | 'outdoor'
  | 'experiences'
  | 'cash';

export interface GiftContributor {
  id: string;
  guestName: string;
  amount: number;
  message?: string;
  createdAt: Date;
}

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  message?: string;
  notes?: string;
  confirmedAt?: Date;
  source: 'manual' | 'rsvp-form';
}

export interface Template {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'rustic' | 'boho' | 'minimalist';
  previewImageUrl: string;
  isNew?: boolean;
}

export interface PaymentIntent {
  id: string;
  giftId: string;
  amount: number;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  guestName: string;
  guestEmail: string;
  message?: string;
}

export type Locale = 'pt' | 'en';
