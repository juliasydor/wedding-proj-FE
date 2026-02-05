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

* Secondary color (e.g., buttons): **#ea2e5b**
* Primary color (e.g., background): **#261516**
* Tertiary color: **#F1557C**
* Quaternary color: **#221015**
* Subtitle text: **#8D968F**
* Primary font color: **#FFFFFF**
* Inputs: **#271C1E**

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
  templateId: 'modern-elegance' | 'classic-romance' | 'rustic-garden' | 'bohemian-dream';
  primaryColor: string;
  secondaryColor: string;
  heroImageUrl: string | null;
  dressCode: DressCode | null;
  createdAt: string;
  updatedAt: string;
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
  targetAmount: number;
  currentAmount: number;
  imageUrl?: string;
  category: 'honeymoon' | 'kitchen' | 'bedroom' | 'dining' | 'other';
  isActive: boolean;
}

// Contribution
interface Contribution {
  id: string;
  giftId: string;
  guestId: string;
  guestName: string;
  amount: number;
  message?: string;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}
```

---

## Wedding Template System Architecture

### Overview

The template system allows couples to choose from 4 pre-designed wedding website themes and customize them with their own colors and hero image. The templates are **rendered entirely on the frontend** using React components, with the backend only storing the configuration data.

### Frontend Template Implementation

#### File Structure
```
src/shared/ui/templates/
├── index.ts                      # Exports all templates + TEMPLATE_CONFIG
├── ModernEleganceTemplate.tsx    # Dark elegant theme (navy/deep blue)
├── ClassicRomanceTemplate.tsx    # Classic cream/gold theme
├── RusticGardenTemplate.tsx      # Natural green garden theme
└── BohemianDreamTemplate.tsx     # Warm boho/terracotta theme
```

#### Template Component Interface
Each template component receives the same props interface:

```typescript
interface TemplateProps {
  partner1Name: string;        // First partner's name
  partner2Name: string;        // Second partner's name
  date: string | null;         // Wedding date (ISO string)
  location: string;            // Wedding location/city
  heroImage?: string | null;   // URL or base64 of hero image
  primaryColor?: string;       // Main accent color (hex)
  secondaryColor?: string;     // Secondary accent color (hex)
  isPreview?: boolean;         // If true, renders in compact preview mode
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
  // ... rustic-garden, bohemian-dream
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
  'bohemian-dream'
];

// Colors must be valid hex codes:
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

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

Users can also input custom hex colors in the dashboard site editor.

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