# Page Descriptions

## Public Pages

### Landing Page (`/`)
The main marketing page showcasing the platform's features. Includes:
- Hero section with headline and CTA
- Statistics (15k+ couples, 100% customizable, 4.9 rating)
- Feature cards (Beautiful Websites, Guest Management, Gift Registry, Easy Sharing)
- Final CTA section
- Animated hearts background effect

### Wedding Site (`/wedding/[slug]`)
The guest-facing wedding website. Includes:
- Full-screen hero with couple photo
- Couple names and wedding date/location
- "Our Story" section
- Wedding details (when, where, dress code)
- Event schedule timeline
- Gift registry CTA
- Romantic design with gradient overlays

---

## Authentication Pages

### Sign Up (`/auth/signup`)
New couple registration page. Includes:
- Animated heart icon
- Partner names input
- Email and password fields
- Social auth options (Google, Apple)
- Link to login page

### Login (`/auth/login`)
Returning user authentication. Includes:
- Email and password fields
- Social auth options
- Link to sign up page

---

## Onboarding Flow (Couple Journey)

### Step 1: Names (`/onboarding/names`)
Collect couple names. Includes:
- Partner 1 name input
- "&" separator
- Partner 2 name input
- Progress indicator (1 of 4)

### Step 2: Date (`/onboarding/date`)
Select wedding date. Includes:
- Interactive calendar component
- Date picker with disabled past dates
- Highlighted selected date

### Step 3: Location (`/onboarding/location`)
Set venue location. Includes:
- Search input for venue/city
- Map preview placeholder
- Selected location display

### Step 4: Dress Code (`/onboarding/dress-code`)
Define wedding style. Includes:
- Tabs for Guests/Bridesmaids/Groomsmen
- Color palette selector
- Dress length options (Short, Midi, Long)
- Style preview card

### Step 5: Banking (`/onboarding/banking`)
Connect payment account (optional). Includes:
- Security badge
- Bank name selector
- Routing and account number inputs
- Skip option

### Step 6: Template (`/onboarding/template`)
Choose site design. Includes:
- Category filter buttons
- Template card grid
- Template preview option
- New/AI badges

### Step 7: Gift List (`/onboarding/gift-list`)
Build gift registry. Includes:
- Search bar
- Create custom gift card
- Category filters
- Gift card grid with selection toggle

### Step 8: Preview (`/onboarding/preview`)
Review wedding site. Includes:
- Full wedding hero preview
- Countdown timer
- View registry button
- Publish CTA

### Step 9: QR Code (`/onboarding/qr-code`)
Site is live! Includes:
- Celebration message with emojis
- QR code for site URL
- Copy link button
- Social share options (WhatsApp, Instagram, Email)

---

## Dashboard (Couple Management)

### Gifts Received (`/dashboard`)
Track gift contributions. Includes:
- Total received amount with progress
- Goal percentage
- Contribution list with:
  - Guest avatar and name
  - Amount and gift name
  - Personal message
  - "Send Thanks" button
- Bottom navigation bar

---

## Guest Pages

### Checkout (`/checkout`)
Gift contribution payment. Includes:
- Selected gift summary with edit option
- Personal note input
- Payment method tabs (Credit Card / PIX)
- Credit card form fields
- Order summary with fees
- Secure payment button

### Success (`/checkout/success`)
Payment confirmation. Includes:
- Animated success checkmark
- Thank you message
- Transaction details
- Return home button
- Send another gift option

---

## Suggested Commit Messages

```bash
# Initial setup
git commit -m "feat: initialize Next.js 15 project with TailwindCSS and Shadcn"

# Architecture
git commit -m "feat: set up Feature-Sliced Design folder structure"
git commit -m "feat: configure design tokens and global CSS with wedding theme"

# Components
git commit -m "feat: create atomic design components (atoms, molecules, organisms)"
git commit -m "feat: add romantic animations (hearts, petals, sparkles)"

# i18n
git commit -m "feat: set up next-intl with PT/EN translations"

# State management
git commit -m "feat: create Zustand stores for auth, wedding, gift, and guest entities"

# Pages
git commit -m "feat: implement landing page with hero and features"
git commit -m "feat: add authentication pages (login, signup)"
git commit -m "feat: create complete onboarding flow (9 steps)"
git commit -m "feat: build couple dashboard with gift tracking"
git commit -m "feat: implement checkout flow with payment form"
git commit -m "feat: add guest-facing wedding site page"

# Documentation
git commit -m "docs: add backend API endpoints documentation"
git commit -m "docs: add page descriptions and commit guidelines"
```
