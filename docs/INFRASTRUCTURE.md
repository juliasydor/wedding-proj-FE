# Infrastructure Documentation

## Environment Variables

This document describes all environment variables required for the Véu & Gravata wedding platform.

### Required Environment Files

Create a `.env.local` file in the root of the project with the following variables:

```env
# Google Maps API (for location autocomplete)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

---

## Google Maps Integration

The platform uses Google Maps for location search and autocomplete in the onboarding flow.

### Features
- **Autocomplete Search**: Search for venues, cities, and addresses
- **Place Details**: Get full address, coordinates, and place information
- **Static Map Preview**: Display a map preview of the selected location
- **Fallback Mode**: Manual text input when API key is not configured

### Setup Instructions

#### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project (required for Maps APIs)

#### 2. Enable Required APIs
Navigate to **APIs & Services > Library** and enable:
- **Places API** - For location autocomplete and place details
- **Maps JavaScript API** - For map rendering
- **Maps Static API** - For static map images (optional)

#### 3. Create API Credentials
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > API Key**
3. Copy the generated API key

#### 4. Restrict Your API Key (Recommended)
For security, restrict your API key:

**Application Restrictions:**
- Select "HTTP referrers (websites)"
- Add your domains:
  - `localhost:3000` (development)
  - `localhost:3001` (development alternate)
  - `yourdomain.com` (production)
  - `*.yourdomain.com` (production subdomains)

**API Restrictions:**
- Select "Restrict key"
- Choose the APIs you enabled:
  - Places API
  - Maps JavaScript API
  - Maps Static API

#### 5. Configure Environment Variable
Add to your `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...your_key_here
```

### Usage in Code

The `GooglePlacesAutocomplete` component handles all Google Maps functionality:

```tsx
import { GooglePlacesAutocomplete } from '@/shared/ui/molecules/GooglePlacesAutocomplete';

<GooglePlacesAutocomplete
  value={location}
  onSelect={(place) => {
    console.log(place.name);      // "Vineyard Estate"
    console.log(place.address);   // "123 Wine Road, Napa Valley, CA"
    console.log(place.lat);       // 38.2975
    console.log(place.lng);       // -122.2869
  }}
  placeholder="Search venue or city..."
/>
```

### Fallback Behavior

If `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is not set:
- The component displays a simple text input
- Users can manually type their location
- No autocomplete suggestions are shown
- No map preview is displayed

### Pricing

Google Maps APIs have usage-based pricing:
- **Places API**: ~$17 per 1,000 requests (Autocomplete)
- **Places Details**: ~$17 per 1,000 requests
- **Static Maps**: ~$2 per 1,000 requests

Google provides $200 free monthly credit, which covers approximately:
- ~11,700 autocomplete requests
- ~11,700 place details requests
- ~100,000 static map loads

For most wedding platforms, this free tier is sufficient.

---

## External Services

### Image CDN

The platform uses external images from Unsplash for:
- Landing page hero image
- Gift list product images
- Template previews

**Next.js Configuration** (`next.config.ts`):
```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
},
```

### Payment Processing (Future)

Payment integration will require:
- **Stripe** or **Mercado Pago** for credit card processing
- **PIX** integration for Brazilian instant payments

Environment variables needed:
```env
# Stripe
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Mercado Pago (Brazil)
MERCADO_PAGO_PUBLIC_KEY=APP_USR-...
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-...
```

---

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Environment Variables in Vercel

Go to **Project Settings > Environment Variables** and add:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Any other required variables

### Build Command
```bash
npm run build
```

### Output Directory
```
.next
```

---

## Development

### Local Setup

```bash
# Install dependencies
npm install

# Copy environment example
cp .env.example .env.local

# Edit .env.local with your API keys
# Then start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Security Considerations

### API Key Protection

- Never commit `.env.local` to version control
- Use API key restrictions in Google Cloud Console
- Monitor API usage for unexpected spikes
- Rotate keys periodically

### Content Security Policy

Consider adding CSP headers for production:
```
script-src 'self' https://maps.googleapis.com;
img-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://images.unsplash.com;
```

---

## Monitoring

### Recommended Tools

- **Vercel Analytics**: Built-in performance monitoring
- **Google Cloud Console**: API usage and billing
- **Sentry**: Error tracking (optional)

### Google Maps Usage Monitoring

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services > Dashboard**
3. Select your API to view usage metrics
4. Set up billing alerts to avoid unexpected charges
