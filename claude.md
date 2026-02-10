## During creation

We will develop a **wedding website** project where the couple can create a **customizable** site with information such as:

* Event location
* Dress code
* Gift list
* Guest list

The product will have distinct user journeys:

* **Guests**
* **Couple (sign-up + onboarding)**
* **Couple (login + editing the already-created site)**

---

## Journey — Couple (new user)

1. **Home**
2. **Registration (sign-up)**
3. **Onboarding (mandatory, cannot be skipped)**
   3.1. Couple’s names
   3.2. Wedding date
   3.3. Wedding location
   3.4. Dress code
   3.5. Wedding theme
4. **Banking information** *(optional — can be skipped)*

   * Even though it’s optional, the site must display **persistent alerts** encouraging the user to add a bank account, enabling **financial routing** for purchases made through the gift list.
5. **Choose the site template**
6. **Configure/edit the gift list**
7. **Site preview** with the selected template and provided data
8. **Generate the QR Code** and the site **URL**
9. **Site page (couple edit mode)**
10. **Full navbar** (contextual for couples and guests)

---

## Journey — Guest (accessing the site)

1. **Login / Sign-up** (first access)
2. **View the couple’s site**
3. When clicking **“Give a Gift”**:

   * **Payment checkout**
4. **Post-payment**

   * **Success** page
   * **Error** page
   * **Progress/processing** page (when applicable)

---

## UI and Frontend Architecture Requirements

* Use the **templates provided in the images** as a reference for **all** pages.
* Build a **reusable, componentized** frontend.
* Create a **global.css** and **always reuse** the colors and fonts defined there (no “loose” colors in the code).
* Use:

  * **TailwindCSS**
  * **Zustand**
  * **i18n (PT and EN)** — the entire site must be available in **Portuguese and English**
  * **Shadcn**
  * **TanStack Table**
  * **Composition pattern**
  * **Feature-Sliced Design**
  * **Clear separation between UI and logic using custom hooks**
  * **Full use of Next.js**
  * **SSR**
  * **Next.js cache**
  * **Server Actions**
  * **Atomic Design**

### Color palette (mandatory tokens)

**Véu Theme (Default - Bride):**
* Secondary color (e.g., buttons): **#ea2e5b**
* Primary color (e.g., background): **#261516**
* Tertiary color: **#F1557C**
* Quaternary color: **#221015**
* Subtitle text: **#8D968F**
* Primary font color: **#FFFFFF**
* Inputs: **#271C1E**

**Gravata Theme (Groom - Light mode with Blue accents):**
* Secondary color (e.g., buttons): **#0133E6**
* Primary color (e.g., background): **#FFFFFF** (white)
* Tertiary color: **#3B5EF0**
* Quaternary color: **#F0F4FF** (light blue tint)
* Subtitle text: **#64748b**
* Primary font color: **#0A0524** (dark blue)
* Inputs: **#F8FAFC**

### Theme System (Véu & Gravata)

The application supports two themes representing the couple:

1. **Véu (Veil)** - Default theme for the bride
   - Dark mode with pink/rose accents
   - Heart cursor trail animation enabled
   - Romantic, warm aesthetic

2. **Gravata (Tie)** - Alternative theme for the groom
   - Light mode (white background) with blue accents
   - Heart cursor trail disabled
   - Clean, elegant aesthetic

**Implementation:**
- Theme store: `src/shared/store/themeStore.ts`
- Theme provider: `src/shared/providers/ThemeProvider.tsx`
- Toggle component: `src/shared/ui/molecules/ThemeToggle.tsx`

**Usage:**
```typescript
import { useThemeStore } from '@/shared/store/themeStore';

const { mode, toggle } = useThemeStore();
// mode: 'veu' | 'gravata'
```

The theme toggle appears in:
- Main navbar (landing page)
- Dashboard sidebar
- Mobile header

---

## Backend Integration Requirements

### Authentication Endpoints
| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `/api/auth/register` | POST | Register new couple account | `src/features/auth/api/register.ts` |
| `/api/auth/login` | POST | Login with email/password | `src/features/auth/api/login.ts` |
| `/api/auth/logout` | POST | Logout and invalidate session | `src/features/auth/api/logout.ts` |
| `/api/auth/me` | GET | Get current user data | `src/entities/user/api/getUser.ts` |
| `/api/auth/guest/register` | POST | Register guest account | `src/features/auth/api/guestRegister.ts` |

### Wedding Site Endpoints
| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `/api/wedding` | POST | Create wedding site | `src/entities/wedding/api/createWedding.ts` |
| `/api/wedding/:id` | GET | Get wedding data | `src/entities/wedding/api/getWedding.ts` |
| `/api/wedding/:id` | PUT | Update wedding info | `src/entities/wedding/api/updateWedding.ts` |
| `/api/wedding/by-slug/:slug` | GET | Get wedding by public URL slug | `src/entities/wedding/api/getBySlug.ts` |

### Template & Customization Endpoints
| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `/api/wedding/:id/template` | PUT | Update selected template | `src/features/site-editor/api/updateTemplate.ts` |
| `/api/wedding/:id/colors` | PUT | Update color palette (primaryColor, secondaryColor) | `src/features/site-editor/api/updateColors.ts` |
| `/api/wedding/:id/hero-image` | POST | Upload hero image (multipart/form-data) | `src/features/site-editor/api/uploadHeroImage.ts` |
| `/api/wedding/:id/hero-image` | DELETE | Remove hero image | `src/features/site-editor/api/deleteHeroImage.ts` |

### Gift List Endpoints
| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `/api/wedding/:id/gifts` | GET | Get all gifts for wedding | `src/entities/gift/api/getGifts.ts` |
| `/api/wedding/:id/gifts` | POST | Add gift to list | `src/entities/gift/api/addGift.ts` |
| `/api/wedding/:id/gifts/:giftId` | PUT | Update gift | `src/entities/gift/api/updateGift.ts` |
| `/api/wedding/:id/gifts/:giftId` | DELETE | Remove gift | `src/entities/gift/api/deleteGift.ts` |
| `/api/gifts/catalog` | GET | Get gift catalog/suggestions | `src/entities/gift/api/getCatalog.ts` |

### Guest Management Endpoints
| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `/api/wedding/:id/guests` | GET | Get guest list | `src/entities/guest/api/getGuests.ts` |
| `/api/wedding/:id/guests` | POST | Add guest manually | `src/entities/guest/api/addGuest.ts` |
| `/api/wedding/:id/guests/:guestId` | PUT | Update guest info/status | `src/entities/guest/api/updateGuest.ts` |
| `/api/wedding/:id/guests/:guestId` | DELETE | Remove guest | `src/entities/guest/api/deleteGuest.ts` |
| `/api/wedding/:id/rsvp` | POST | Guest RSVP response | `src/features/rsvp/api/submitRsvp.ts` |

### Payment & Banking Endpoints
| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `/api/wedding/:id/banking` | POST | Save banking info | `src/features/banking/api/saveBanking.ts` |
| `/api/wedding/:id/banking` | GET | Get banking info | `src/features/banking/api/getBanking.ts` |
| `/api/payments/checkout` | POST | Process gift payment | `src/features/checkout/api/processPayment.ts` |
| `/api/payments/:paymentId/status` | GET | Check payment status | `src/features/checkout/api/getPaymentStatus.ts` |
| `/api/wedding/:id/contributions` | GET | Get all gift contributions | `src/entities/contribution/api/getContributions.ts` |

### Wallet & Claims Endpoints
| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `/api/wedding/:id/wallet` | GET | Get wallet summary (received gifts, total value, claimable amount) | `src/app/dashboard/gifts/wallet/page.tsx` |
| `/api/wedding/:id/wallet/claim` | POST | Request payout/claim of received gift funds | `src/app/dashboard/gifts/wallet/page.tsx` |
| `/api/wedding/:id/gifts/received` | GET | Get list of received (gifted) gifts with gifter details | `src/app/dashboard/gifts/wallet/page.tsx` |

### Data Models

```typescript
// Wedding
interface Wedding {
  id: string;
  slug: string;
  partner1Name: string;
  partner2Name: string;
  date: string | null;
  location: string;
  venue: string;
  templateId: 'modern-elegance' | 'classic-romance' | 'rustic-garden' | 'bohemian-dream' | 'beach-wedding' | 'church-wedding';
  primaryColor: string;
  secondaryColor: string;
  heroImageUrl: string | null;
  dressCode: DressCode | null;
  siteContent: SiteContent;       // Customizable section content
  customSections: CustomSection[]; // User-created custom sections
  createdAt: string;
  updatedAt: string;
}

// Custom Section (user-created content blocks)
interface CustomSection {
  id: string;
  type: 'text' | 'image' | 'quote' | 'video' | 'map' | 'timeline';
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  order: number;
  isVisible: boolean;
}

// Guest
interface Guest {
  id: string;
  weddingId: string;
  name: string;
  email: string;
  phone?: string;
  status: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  plusOneName?: string;           // Companion's full name
  plusOneAge?: number;            // Companion's age
  dietaryRestrictions?: string;
  createdAt: string;
}

// Gift
interface Gift {
  id: string;
  weddingId: string;
  name: string;
  description?: string;
  price: number;                    // Full price (no partial gifting)
  imageUrl?: string;
  category: 'honeymoon' | 'kitchen' | 'bedroom' | 'dining' | 'other';
  isActive: boolean;
  isGifted: boolean;                // Whether someone already purchased this gift
  giftedBy?: string;               // Name of the guest who gifted
  giftedAt?: string;               // ISO timestamp of when it was gifted
}

// Contribution (full-price only — no partial gifting)
interface Contribution {
  id: string;
  giftId: string;
  guestId: string;
  guestName: string;
  amount: number;                    // Always equals gift.price (full price)
  message?: string;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  status: 'pending' | 'completed' | 'failed';
  claimed: boolean;                  // Whether the couple has claimed/withdrawn this amount
  claimedAt?: string;               // ISO timestamp of claim
  createdAt: string;
}
```

---

## Wedding Template System Architecture

### Overview

The template system allows couples to choose from 6 pre-designed wedding website themes and customize them with their own colors, hero image, and custom content sections. The templates are **rendered entirely on the frontend** using React components, with the backend only storing the configuration data.

### Frontend Template Implementation

#### File Structure
```
src/shared/ui/templates/
├── index.ts                      # Exports all templates + TEMPLATE_CONFIG
├── ModernEleganceTemplate.tsx    # Dark elegant theme (navy/deep blue)
├── ClassicRomanceTemplate.tsx    # Classic cream/gold theme
├── RusticGardenTemplate.tsx      # Natural green garden theme
├── BohemianDreamTemplate.tsx     # Warm boho/terracotta theme
├── BeachWeddingTemplate.tsx      # Tropical beach theme (teal/cyan)
└── ChurchWeddingTemplate.tsx     # Traditional church theme (burgundy/elegant)
```

#### Template Component Interface
Each template component receives the same props interface:

```typescript
interface TemplateProps {
  partner1Name: string;              // First partner's name
  partner2Name: string;              // Second partner's name
  date: string | null;               // Wedding date (ISO string)
  location: string;                  // Wedding location/city
  heroImage?: string | null;         // URL or base64 of hero image
  primaryColor?: string;             // Main accent color (hex)
  secondaryColor?: string;           // Secondary accent color (hex)
  isPreview?: boolean;               // If true, renders in compact preview mode
  siteContent?: Partial<SiteContent>;// Customizable section content
  customSections?: CustomSection[];  // User-created custom sections
}
```

#### Template Configuration
The `TEMPLATE_CONFIG` object defines metadata for each template:

```typescript
export const TEMPLATE_CONFIG = {
  'modern-elegance': {
    id: 'modern-elegance',
    name: 'Modern Elegance',
    category: 'modern',
    defaultColors: { primary: '#ea2e5b', secondary: '#F1557C' },
    preview: 'https://images.unsplash.com/...', // Preview thumbnail
  },
  'classic-romance': {
    id: 'classic-romance',
    name: 'Classic Romance',
    category: 'classic',
    defaultColors: { primary: '#c9a959', secondary: '#8b6914' },
    preview: '...',
  },
  'rustic-garden': {
    id: 'rustic-garden',
    name: 'Rustic Garden',
    category: 'rustic',
    defaultColors: { primary: '#5d7052', secondary: '#8fa67a' },
    preview: '...',
  },
  'bohemian-dream': {
    id: 'bohemian-dream',
    name: 'Bohemian Dream',
    category: 'boho',
    defaultColors: { primary: '#d4a574', secondary: '#c4956a' },
    preview: '...',
  },
  'beach-wedding': {
    id: 'beach-wedding',
    name: 'Beach Wedding',
    category: 'beach',
    defaultColors: { primary: '#0891b2', secondary: '#06b6d4' },
    preview: '...',
  },
  'church-wedding': {
    id: 'church-wedding',
    name: 'Church Wedding',
    category: 'traditional',
    defaultColors: { primary: '#722f37', secondary: '#8b3a42' },
    preview: '...',
  },
};

export type TemplateId = keyof typeof TEMPLATE_CONFIG;
```

#### How Templates Use Colors
Templates dynamically apply colors using inline styles:

```tsx
// Example from ModernEleganceTemplate.tsx
<Calendar className="h-5 w-5" style={{ color: primaryColor }} />

<div style={{ backgroundColor: `${primaryColor}15` }}> // 15 = 15% opacity
  ...
</div>
```

Each template has its own fixed background colors and layout, but accent elements (icons, buttons, decorations, highlights) use the `primaryColor` and `secondaryColor` props.

#### Template Selection Flow
1. User selects template in `/onboarding/template`
2. Frontend shows live preview with user's data
3. User can change color palette (6 predefined palettes)
4. On "Continue", data is saved to Zustand store:
   ```typescript
   updateOnboarding({
     templateId: 'modern-elegance',
     primaryColor: '#ea2e5b',
     secondaryColor: '#F1557C',
   });
   ```
5. Preview page (`/onboarding/preview`) renders the full template
6. Public wedding site (`/wedding/[slug]`) fetches data from backend and renders template

### Backend Requirements for Templates

#### What the Backend Needs to Store

The backend only needs to store the **configuration**, not the template HTML/CSS:

```typescript
// Wedding table/document should include:
{
  id: string,
  slug: string,                    // URL-friendly identifier
  partner1Name: string,
  partner2Name: string,
  date: string | null,
  location: string,
  venue: string,

  // Template configuration (THIS IS WHAT MATTERS)
  templateId: string,              // 'modern-elegance' | 'classic-romance' | etc.
  primaryColor: string,            // Hex color, e.g., '#ea2e5b'
  secondaryColor: string,          // Hex color, e.g., '#F1557C'
  heroImageUrl: string | null,     // URL to uploaded image in storage

  // Other fields...
  dressCode: object | null,
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

#### Template-Related Endpoints

| Endpoint | Method | Request Body | Response | Description |
|----------|--------|--------------|----------|-------------|
| `PUT /api/wedding/:id/template` | PUT | `{ templateId: string }` | `{ success: true }` | Update selected template |
| `PUT /api/wedding/:id/colors` | PUT | `{ primaryColor: string, secondaryColor: string }` | `{ success: true }` | Update color palette |
| `POST /api/wedding/:id/hero-image` | POST | `multipart/form-data` with `image` field | `{ imageUrl: string }` | Upload hero image |
| `DELETE /api/wedding/:id/hero-image` | DELETE | - | `{ success: true }` | Remove hero image |

#### Hero Image Upload Flow

1. Frontend sends image as `multipart/form-data`
2. Backend should:
   - Validate file type (jpg, png, webp)
   - Validate file size (max 5MB recommended)
   - Resize/optimize image (recommended: max 1920px width)
   - Upload to cloud storage (S3, Cloudinary, etc.)
   - Return the public URL
3. Frontend stores URL in wedding data and passes to template

#### Validation Rules

```typescript
// templateId must be one of:
const VALID_TEMPLATES = [
  'modern-elegance',
  'classic-romance',
  'rustic-garden',
  'bohemian-dream',
  'beach-wedding',
  'church-wedding'
];

// Colors must be valid hex codes:
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

// Custom section types:
const VALID_SECTION_TYPES = ['text', 'image', 'quote', 'video', 'map', 'timeline'];

// Example validation:
if (!VALID_TEMPLATES.includes(templateId)) {
  throw new Error('Invalid template ID');
}
if (!HEX_COLOR_REGEX.test(primaryColor)) {
  throw new Error('Invalid primary color format');
}
```

#### Public Wedding Site Rendering

When a guest visits `/wedding/[slug]`:

1. Frontend calls `GET /api/wedding/by-slug/:slug`
2. Backend returns wedding data including template config
3. Frontend dynamically imports the correct template:

```typescript
// Pseudo-code for dynamic rendering
const templateComponents = {
  'modern-elegance': ModernEleganceTemplate,
  'classic-romance': ClassicRomanceTemplate,
  'rustic-garden': RusticGardenTemplate,
  'bohemian-dream': BohemianDreamTemplate,
};

const TemplateComponent = templateComponents[wedding.templateId];

return (
  <TemplateComponent
    partner1Name={wedding.partner1Name}
    partner2Name={wedding.partner2Name}
    date={wedding.date}
    location={wedding.location}
    heroImage={wedding.heroImageUrl}
    primaryColor={wedding.primaryColor}
    secondaryColor={wedding.secondaryColor}
  />
);
```

### Adding New Templates (Future)

To add a new template:

1. **Frontend**: Create new component in `src/shared/ui/templates/`
2. **Frontend**: Add to `TEMPLATE_CONFIG` in `index.ts`
3. **Frontend**: Add to template selection grid
4. **Backend**: Add new template ID to validation whitelist
5. No database schema changes needed (templateId is just a string)

---

## Custom Sections System (Block Editor)

### Overview

The custom sections system allows couples to add personalized content blocks to their wedding site, similar to a simplified WordPress block editor. Users can add, edit, reorder, and toggle visibility of custom sections.

### Available Section Types

| Type | Description | Fields |
|------|-------------|--------|
| `text` | Text block with title and content | title, content |
| `image` | Image with optional caption | title, imageUrl, content (caption) |
| `quote` | Highlighted quote/phrase | title (author), content (quote text) |
| `video` | Embedded YouTube/Vimeo video | title, videoUrl |
| `map` | Location map embed | title, content (address) |
| `timeline` | Event timeline | title, content (timeline items) |

### Custom Section Data Model

```typescript
interface CustomSection {
  id: string;                    // Unique identifier (e.g., "section-1234567890-abc123")
  type: CustomSectionType;       // 'text' | 'image' | 'quote' | 'video' | 'map' | 'timeline'
  title: string;                 // Section title
  content: string;               // Main content (text, quote, address, etc.)
  imageUrl?: string;             // For image sections
  videoUrl?: string;             // For video sections (YouTube/Vimeo URL)
  order: number;                 // Display order (0-indexed)
  isVisible: boolean;            // Toggle visibility without deleting
}
```

### Frontend Components

#### SectionBlockEditor Component

Located at `src/shared/ui/molecules/SectionBlockEditor.tsx`

Features:
- Add new sections via popup menu
- Edit section content inline
- Reorder sections with up/down buttons
- Toggle visibility with eye icon
- Delete sections
- Drag handle for future drag-and-drop support

```typescript
interface SectionBlockEditorProps {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
  primaryColor?: string;  // For styling consistency
}
```

### Backend API Requirements for Custom Sections

| Endpoint | Method | Description |
|----------|--------|-------------|
| `PUT /api/wedding/:id/custom-sections` | PUT | Save all custom sections (replaces existing) |
| `PATCH /api/wedding/:id/custom-sections/:sectionId` | PATCH | Update single section |
| `POST /api/wedding/:id/custom-sections` | POST | Add new section |
| `DELETE /api/wedding/:id/custom-sections/:sectionId` | DELETE | Remove section |
| `PUT /api/wedding/:id/custom-sections/reorder` | PUT | Update section order |

### Request/Response Examples

**Save All Sections**
```typescript
// PUT /api/wedding/:id/custom-sections
{
  sections: [
    {
      id: "section-123",
      type: "text",
      title: "Sobre a Cerimônia",
      content: "A cerimônia será ao ar livre...",
      order: 0,
      isVisible: true
    },
    {
      id: "section-456",
      type: "quote",
      title: "Ruth 1:16",
      content: "Onde você for, eu irei...",
      order: 1,
      isVisible: true
    }
  ]
}
```

**Add New Section**
```typescript
// POST /api/wedding/:id/custom-sections
{
  type: "image",
  title: "Nossa Família",
  content: "Conheça nossos pais e padrinhos",
  imageUrl: "https://...",
  order: 2,
  isVisible: true
}

// Response
{
  id: "section-789",  // Generated by backend
  type: "image",
  title: "Nossa Família",
  content: "Conheça nossos pais e padrinhos",
  imageUrl: "https://...",
  order: 2,
  isVisible: true
}
```

### Image Upload for Custom Sections

For image-type sections, the frontend sends base64-encoded images. Backend should:

1. Decode base64 image
2. Validate file type (jpg, png, webp)
3. Optimize/resize (max 1200px width recommended)
4. Upload to cloud storage
5. Return public URL

Alternative: Accept `multipart/form-data` with separate endpoint:
```
POST /api/wedding/:id/custom-sections/upload-image
```

### Template Rendering of Custom Sections

All templates include a `renderCustomSection` function that renders each section type appropriately with the template's styling:

```typescript
// Example from template
{customSections.map((section) => renderCustomSection(section, primaryColor))}
```

Custom sections are rendered between the Ceremony/Reception section and the RSVP section for optimal placement in the page flow.

---

## Site Content Editing System

### Overview

The site editor (`/dashboard/site`) allows couples to fully customize their wedding website content, including editing all texts, titles, and toggling sections on/off.

### Editable Sections

Each template supports the following customizable sections:

1. **Hero Section** (sempre visível)
   - `heroTitle`: Main title (e.g., "We're Getting Married")
   - `heroSubtitle`: Subtitle text

2. **Countdown Section** (toggle: `showCountdown`)
   - `countdownTitle`: Section title

3. **Our Story Section** (toggle: `showStorySection`)
   - `storyTitle`: Section title
   - `storyContent`: Story text (HTML — uses rich text editor with bold, italic, underline, lists, alignment, font size)
   - `storyImage`: Optional image

4. **Ceremony & Reception** (sempre visível)
   - `ceremonyTitle`, `ceremonyTime`, `ceremonyDescription`
   - `receptionTitle`, `receptionTime`, `receptionDescription`

5. **RSVP Section** (toggle: `showRsvpSection`)
   - `rsvpTitle`: Section title
   - `rsvpDescription`: Description text (HTML — rich text editor)

6. **Gift Section** (toggle: `showGiftSection`)
   - `giftTitle`: Section title
   - `giftDescription`: Description text (HTML — rich text editor)

7. **Accommodations Section** (toggle: `showAccommodationsSection`)
   - `accommodationsTitle`: Section title
   - `accommodationsContent`: Content text (HTML — rich text editor)

8. **Gallery Section** (toggle: `showGallerySection`)
   - `galleryTitle`: Section title
   - `galleryImages`: Array of image URLs

9. **Footer**
   - `footerMessage`: Footer message text

### SiteContent Data Model

```typescript
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
```

### Backend Storage Requirements

The backend needs to store `siteContent` as a JSON object within the Wedding entity:

```typescript
interface Wedding {
  // ... existing fields
  siteContent: SiteContent;
}
```

### API Endpoints for Content

| Endpoint | Method | Description |
|----------|--------|-------------|
| `PUT /api/wedding/:id/content` | PUT | Update all site content |
| `PATCH /api/wedding/:id/content` | PATCH | Partial update of content |
| `POST /api/wedding/:id/content/gallery` | POST | Upload gallery image |
| `DELETE /api/wedding/:id/content/gallery/:index` | DELETE | Remove gallery image |
| `POST /api/wedding/:id/content/story-image` | POST | Upload story section image |

### Site Editor UI

Located at `/dashboard/site`, the editor has 5 tabs:

1. **Template** - Choose from 4 templates
2. **Colors** - Select color palette
3. **Content** - Edit all texts and toggle sections (collapsible sections)
4. **Info** - Basic wedding information
5. **Images** - Hero image upload

---

## Guest Wedding Site Architecture

### Overview

When guests access the wedding site via URL/QR Code, they see the couple's personalized website with the selected template, color customization, and full guest experience including gift list and checkout.

### File Structure

```
src/app/wedding/[slug]/
├── layout.tsx           # Navigation layout with mobile-responsive header
├── page.tsx             # Main wedding page (renders selected template)
├── gifts/
│   └── page.tsx         # Gift list page for guests
└── checkout/
    └── page.tsx         # Payment checkout flow
```

### Guest Wedding Site Flow

1. **Guest accesses `/wedding/[slug]`**
   - Layout wraps all pages with navigation header
   - Navigation shows: Home, Gift List (with icons)
   - Mobile-responsive with hamburger menu

2. **Main Page (`/wedding/[slug]`)**
   - Fetches wedding data from API (or uses store for demo)
   - Dynamically renders the selected template component
   - Passes couple's customized colors (primaryColor, secondaryColor)
   - Displays hero image if uploaded

3. **Gift List Page (`/wedding/[slug]/gifts`)**
   - Displays all gifts from couple's gift list
   - Features: search, category filters (all, honeymoon, kitchen, etc.)
   - Progress bar showing contribution status
   - "Presentear" (Gift) button leads to checkout
   - Fully responsive (cards on mobile, grid on desktop)

4. **Checkout Page (`/wedding/[slug]/checkout?gift={id}`)**
   - Multi-step checkout process:
     - Step 1: Guest info + contribution amount
     - Step 2: Payment method (PIX or Credit Card)
     - Processing state with loading animation
     - Success/Error result pages

### Template Rendering in Guest Site

```typescript
// src/app/wedding/[slug]/page.tsx

function getTemplateComponent(templateId: TemplateId | string | null) {
  switch (templateId) {
    case 'modern-elegance':
      return ModernEleganceTemplate;
    case 'classic-romance':
      return ClassicRomanceTemplate;
    case 'rustic-garden':
      return RusticGardenTemplate;
    case 'bohemian-dream':
      return BohemianDreamTemplate;
    case 'beach-wedding':
      return BeachWeddingTemplate;
    case 'church-wedding':
      return ChurchWeddingTemplate;
    default:
      return ModernEleganceTemplate;
  }
}

// Filter visible custom sections
const customSections = weddingData.customSections.filter(s => s.isVisible);

// Render with couple's customizations
<TemplateComponent
  partner1Name={weddingData.partner1Name}
  partner2Name={weddingData.partner2Name}
  date={weddingData.date}
  location={weddingData.location}
  heroImage={weddingData.heroImageUrl}
  primaryColor={weddingData.primaryColor}
  secondaryColor={weddingData.secondaryColor}
  siteContent={weddingData.siteContent}   // Custom texts and section visibility
  customSections={customSections}          // User-created custom sections
/>
```

### Dynamic Color Application

The guest site applies couple's chosen colors throughout:

```typescript
// Example from gifts page
<button
  style={category === cat.id ? { backgroundColor: primaryColor } : {}}
  className={cn(
    'px-4 py-2 rounded-full text-sm font-medium',
    category === cat.id ? 'text-white' : 'bg-quaternary text-foreground/70'
  )}
>
  {cat.label}
</button>
```

### Backend Endpoints for Guest Site

| Endpoint | Method | Description | Frontend Usage |
|----------|--------|-------------|----------------|
| `GET /api/wedding/by-slug/:slug` | GET | Get full wedding data | Fetch on page load |
| `GET /api/wedding/:id/gifts` | GET | Get couple's gift list | Display on gifts page |
| `POST /api/payments/checkout` | POST | Process gift contribution | Checkout submission |
| `GET /api/payments/:paymentId/status` | GET | Check payment status | Polling during processing |

### Checkout Request Body

```typescript
interface CheckoutRequest {
  weddingId: string;
  giftId: string;
  amount: number;                    // Contribution amount in cents
  paymentMethod: 'pix' | 'credit_card';
  guestInfo: {
    name: string;
    email: string;
    phone?: string;
    message?: string;                // Optional message for couple
  };
  // For credit card payments:
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
    holderName: string;
  };
}
```

### Checkout Response

```typescript
// PIX Payment Response
interface PixResponse {
  paymentId: string;
  qrCode: string;                    // Base64 QR code image
  pixCopyPaste: string;              // PIX copy-paste code
  expiresAt: string;                 // ISO timestamp
}

// Credit Card Response
interface CardResponse {
  paymentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

// Payment Status Response
interface PaymentStatus {
  paymentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paidAt?: string;
  errorMessage?: string;
}
```

---

## Guest Management System

### Overview

Couples can manually add guests with full control over their RSVP status. The guest list supports companion (plus-one) information with name and age.

### Add Guest Features

**Desktop:** Opens a modal dialog in `/dashboard/guests/page.tsx`
**Mobile:** Navigates to dedicated page `/dashboard/guests/add/page.tsx` (same form, full-page layout with back button)

- **Guest Information**
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Dietary restrictions (optional)

- **Status Selection**
  - Pending (default) - yellow badge
  - Confirmed - green badge
  - Declined - red badge
  - Allows couple to manually set status when adding

- **Companion (Plus-One) Support**
  - Toggle to add companion
  - Companion name field (optional)
  - Companion age field (optional)

### Guest Actions (3-dot menu)
- **Edit guest** - Opens edit modal (desktop) or navigates to edit page
- **Delete guest** - Removes guest with confirmation toast

### Guest Data Model

```typescript
interface Guest {
  id: string;
  weddingId: string;
  name: string;
  email: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  plusOneName?: string;      // Companion's name
  plusOneAge?: number;       // Companion's age
  dietaryRestrictions?: string;
  invitedAt: string;
}

// Request body for adding guest
interface AddGuestRequest {
  name: string;
  email: string;
  phone?: string;
  status: 'pending' | 'confirmed' | 'declined';  // Editable by couple
  plusOne: boolean;
  plusOneName?: string;
  plusOneAge?: number;
  dietaryRestrictions?: string;
}
```

### Guest List Features

- **Desktop View**: Table with columns (Name, Email, Status, Companion, Actions)
- **Mobile View**: Card-based layout with expandable info
- **Search**: Filter by guest name, email, or companion name
- **Status Filters**: All, Confirmed, Pending, Declined
- **Companion Display**: Shows companion name and age when available

### Color Palette System

The frontend provides 6 predefined color palettes:

| Palette | Primary | Secondary | Best For |
|---------|---------|-----------|----------|
| Rose | #ea2e5b | #F1557C | Modern, romantic |
| Gold | #c9a959 | #8b6914 | Classic, elegant |
| Sage | #5d7052 | #8fa67a | Rustic, natural |
| Terracotta | #d4a574 | #c4956a | Boho, warm |
| Navy | #2c3e50 | #34495e | Formal, sophisticated |
| Burgundy | #722f37 | #8b3a42 | Rich, traditional |

**Template Default Colors:**

| Template | Primary | Secondary |
|----------|---------|-----------|
| Modern Elegance | #ea2e5b | #F1557C |
| Classic Romance | #c9a959 | #8b6914 |
| Rustic Garden | #5d7052 | #8fa67a |
| Bohemian Dream | #d4a574 | #c4956a |
| Beach Wedding | #0891b2 | #06b6d4 |
| Church Wedding | #722f37 | #8b3a42 |

Users can also input custom hex colors in the dashboard site editor.

---

## Gift System (Updated — Full-Price Only)

### Overview

The gift system uses **full-price gifting only** — no partial contributions or percentage-based payments. Each gift can be purchased **once** by a single guest paying the full price.

### Gift Model Changes

- Removed: `targetAmount`, `currentAmount` (partial gifting fields)
- Added: `price` (full price of the gift), `isGifted` (boolean), `giftedBy` (guest name), `giftedAt` (timestamp)
- Gift status is binary: **Available** or **Already gifted**

### Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Gift List | `/dashboard/gifts` | Lists all gifts with "Available"/"Recebido" status badges |
| Add Gift | `/dashboard/gifts/add` | Create a new gift (name, description, price, category, image) |
| Edit Gift | `/dashboard/gifts/edit/[id]` | Edit existing gift (same form as Add, pre-filled) |
| My Wallet | `/dashboard/gifts/wallet` | Shows received gifts, total value, claim button |

### My Wallet Page

Located at `/dashboard/gifts/wallet/page.tsx`:

- **Summary stats**: Total gifts received, total value, available for claim
- **Claim button**: Triggers payout request to couple's bank account
- **Received gifts list**: Shows each gifted item with gifter name, date, and amount

### Backend Notes

- When a guest purchases a gift via checkout, the backend should:
  1. Set `gift.isGifted = true`
  2. Set `gift.giftedBy = guestName`
  3. Set `gift.giftedAt = now()`
  4. Create a Contribution record with `amount = gift.price`
- The wallet/claim endpoint should aggregate all completed contributions and process payout

---

## Rich Text Editor

### Overview

Long-form text fields in the site editor use a custom `RichTextEditor` component instead of plain textareas.

### Component

Located at `src/shared/ui/molecules/RichTextEditor.tsx`

Features:
- Bold, Italic, Underline
- Unordered list
- Text alignment (left, center, right)
- Font size (small, normal, large, extra large)
- Uses `contentEditable` with `document.execCommand` (no external dependencies)

### Affected Fields

The following `SiteContent` fields now contain **HTML** instead of plain text:
- `storyContent`
- `rsvpDescription`
- `giftDescription`
- `accommodationsContent`

**Backend note:** These fields should be stored as `text` (or `longtext`) columns that accept HTML content. The backend should sanitize HTML on save to prevent XSS (allow only safe tags: `b`, `i`, `u`, `ul`, `ol`, `li`, `div`, `span`, `br`, `font`, `p`).

---

## Toast Messages (Global CRUD Feedback)

### Overview

A reusable toast utility at `src/shared/lib/toast-messages.ts` provides consistent success/error messages for all CRUD operations.

### Usage

```typescript
import { toastMessages } from '@/shared/lib/toast-messages';

// Create
toastMessages.create.success('Convidado');  // "Convidado criado(a) com sucesso!"
toastMessages.create.error('Convidado');    // "Erro ao criar convidado. Tente novamente."

// Update, Delete, Save, Upload, Validation follow same pattern
```

### Backend Note

All API responses should include appropriate HTTP status codes so the frontend can trigger the correct toast:
- `200/201` → success toast
- `400/422` → validation error toast
- `500` → generic error toast

---

## New Frontend Routes

```typescript
export const ROUTES = {
  // ... existing routes
  editGift: (id: string) => `/dashboard/gifts/edit/${id}`,
  wallet: '/dashboard/gifts/wallet',
  addGuest: '/dashboard/guests/add',
};
```

---

## Final deliverables

1. **Documentation of the backend endpoints** required:

   * Complete list of endpoints
   * Responsibility of each endpoint
   * Where and how they will be consumed in the frontend (layer/service/hook)
2. **Brief description of each page's content**
3. **Suggested commit messages** following the pattern:

   * `git commit -m "feat: ..."`

All page images are in the `@template-casamento` directory. Use that design as the basis for all pages.


Use some of this special effects:

2. Animations and Transitions
Animations are crucial for bringing a romantic feel to life. Keyframes (@keyframes) and the animation CSS property are fundamental tools. 
Falling Elements: Creating animations where elements like hearts or flower petals gently fall from the top of the screen using transform: translateY() and variable durations to create a natural, continuous effect.
Pulsing/Beating: Animating heart shapes to scale up and down (using transform: scale()) to simulate a heartbeat effect.
Subtle Movement: Avoiding jarring movements and using smooth cubic-bezier timing functions to ensure animations feel gentle and elegant.
Hover Effects: Using the :hover pseudo-class with transition properties to add subtle interactive feedback, such as slight scaling or shadow changes, when a user interacts with elements like buttons or images. 
3. Special Effects
Glowing Effects: Applying text-shadow or box-shadow with soft, colored glows can add a dreamy, warm feel, especially to text or buttons.
Text Effects: Using wavy or sparkling text animations (often involving JavaScript for more complex effects) can make messages stand out in a charming way.
Shapes: Utilizing CSS to create non-standard shapes, most notably hearts, through clever use of ::before and ::after pseudo-elements and transform properties. 
Resources and Examples
Heart Animation with JavaScript & CSS: You can see how to create a heart confetti effect in this YouTube tutorial.
Romantic Web Page Code Examples: Various code snippets and full projects, including proposal pages and love animations, are shared on platforms like DEV Community and GitHub.
CSS Animation Libraries: Libraries like Animate.css provide pre-built, customizable animations that can add life to elements quickly. 