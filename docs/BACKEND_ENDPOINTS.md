# Backend API Endpoints Documentation

## Overview

This document describes all backend endpoints required for the Véu & Gravata wedding website platform.

---

## Authentication Endpoints

### `POST /api/auth/signup`
**Responsibility:** Create a new user account (couple registration)

**Request Body:**
```json
{
  "partnerNames": "Sarah & Tom",
  "email": "sarah@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "sarah@example.com",
    "partnerNames": "Sarah & Tom",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt_token"
}
```

**Frontend Usage:** `features/auth` → `useSignup` hook → `AuthForm` component

---

### `POST /api/auth/login`
**Responsibility:** Authenticate existing user

**Request Body:**
```json
{
  "email": "sarah@example.com",
  "password": "securePassword123"
}
```

**Frontend Usage:** `features/auth` → `useLogin` hook → `AuthForm` component

---

### `POST /api/auth/logout`
**Responsibility:** Invalidate user session

**Frontend Usage:** `features/auth` → `useLogout` hook → `Navbar` component

---

### `GET /api/auth/me`
**Responsibility:** Get current authenticated user

**Frontend Usage:** `entities/user` → `useAuthStore` → Layout components

---

## Wedding Endpoints

### `POST /api/wedding`
**Responsibility:** Create a new wedding site

**Request Body:**
```json
{
  "partner1Name": "Sarah",
  "partner2Name": "Tom",
  "date": "2024-10-24",
  "location": "Napa Valley, CA",
  "venue": "Vineyard Estate",
  "dressCode": {
    "guests": {
      "palette": ["#1e3a5f"],
      "length": "midi"
    }
  },
  "templateId": "timeless-classic"
}
```

**Frontend Usage:** `features/onboarding` → `useCreateWedding` hook → Onboarding flow

---

### `GET /api/wedding/:id`
**Responsibility:** Get wedding by ID (for couple dashboard)

**Frontend Usage:** `entities/wedding` → `useWeddingStore` → Dashboard pages

---

### `PUT /api/wedding/:id`
**Responsibility:** Update wedding details

**Frontend Usage:** `features/wedding-site` → `useUpdateWedding` hook → Edit pages

---

### `GET /api/wedding/slug/:slug`
**Responsibility:** Get public wedding site by URL slug (for guests)

**Frontend Usage:** `app/wedding/[slug]` → Server Component → Wedding site page

---

## Gift Registry Endpoints

### `GET /api/gifts`
**Responsibility:** List all gifts for a wedding

**Query Parameters:**
- `weddingId` (required)
- `category` (optional): Filter by category
- `search` (optional): Search by name

**Frontend Usage:** `entities/gift` → `useGiftStore` → Gift list components

---

### `GET /api/gifts/popular`
**Responsibility:** Get popular gift suggestions

**Frontend Usage:** `features/gift-list` → Onboarding gift selection

---

### `POST /api/gifts`
**Responsibility:** Add custom gift to registry

**Request Body:**
```json
{
  "weddingId": "uuid",
  "name": "Honeymoon Fund",
  "description": "Help us travel to Bali!",
  "price": 500,
  "category": "honeymoon",
  "imageUrl": "https://..."
}
```

**Frontend Usage:** `features/gift-list` → `useCreateGift` hook

---

### `PUT /api/gifts/:id`
**Responsibility:** Update gift details

**Frontend Usage:** `features/gift-list` → `useUpdateGift` hook

---

### `DELETE /api/gifts/:id`
**Responsibility:** Remove gift from registry

**Frontend Usage:** `features/gift-list` → `useDeleteGift` hook

---

## Guest Endpoints

### `GET /api/guests`
**Responsibility:** List all guests for a wedding

**Query Parameters:**
- `weddingId` (required)
- `rsvpStatus` (optional): Filter by status

**Frontend Usage:** `entities/guest` → `useGuestStore` → Guest management

---

### `POST /api/guests/invite`
**Responsibility:** Send invitation to guest

**Request Body:**
```json
{
  "weddingId": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "plusOne": true
}
```

**Frontend Usage:** `features/guests` → `useInviteGuest` hook

---

### `POST /api/guests/rsvp`
**Responsibility:** Guest RSVP response

**Request Body:**
```json
{
  "weddingId": "uuid",
  "guestId": "uuid",
  "status": "confirmed",
  "dietaryRestrictions": "vegetarian",
  "plusOneName": "Jane Doe"
}
```

**Frontend Usage:** `app/wedding/[slug]` → RSVP form

---

## Payment Endpoints

### `POST /api/payments/checkout`
**Responsibility:** Create payment intent for gift contribution

**Request Body:**
```json
{
  "giftId": "uuid",
  "amount": 150,
  "guestName": "Aunt Marie",
  "guestEmail": "marie@example.com",
  "message": "Congratulations!",
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "paymentIntentId": "pi_xxx",
  "clientSecret": "pi_xxx_secret_xxx",
  "status": "pending"
}
```

**Frontend Usage:** `features/checkout` → `useCheckout` hook → Checkout page

---

### `POST /api/payments/webhook`
**Responsibility:** Handle payment provider webhooks (Stripe/PIX)

**Frontend Usage:** N/A (Server-side only)

---

## Banking Endpoints

### `POST /api/banking/connect`
**Responsibility:** Connect bank account for payouts

**Request Body:**
```json
{
  "bankName": "Bank of America",
  "routingNumber": "123456789",
  "accountNumber": "987654321"
}
```

**Frontend Usage:** `features/onboarding` → Banking setup page

---

## File Upload Endpoints

### `POST /api/upload/image`
**Responsibility:** Upload images (wedding banner, gift images)

**Request:** `multipart/form-data`

**Frontend Usage:** `shared/api` → `useUploadImage` hook

---

## Summary Table

| Endpoint | Method | Layer | Hook/Store |
|----------|--------|-------|------------|
| `/api/auth/signup` | POST | features/auth | useSignup |
| `/api/auth/login` | POST | features/auth | useLogin |
| `/api/auth/logout` | POST | features/auth | useLogout |
| `/api/auth/me` | GET | entities/user | useAuthStore |
| `/api/wedding` | POST | features/onboarding | useCreateWedding |
| `/api/wedding/:id` | GET/PUT | entities/wedding | useWeddingStore |
| `/api/wedding/slug/:slug` | GET | app/wedding | Server Component |
| `/api/gifts` | GET/POST | entities/gift | useGiftStore |
| `/api/gifts/:id` | PUT/DELETE | features/gift-list | useUpdateGift |
| `/api/guests` | GET | entities/guest | useGuestStore |
| `/api/guests/invite` | POST | features/guests | useInviteGuest |
| `/api/guests/rsvp` | POST | app/wedding | RSVP form |
| `/api/payments/checkout` | POST | features/checkout | useCheckout |
| `/api/banking/connect` | POST | features/onboarding | useBankingSetup |
