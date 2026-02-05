# Backend API Documentation

Este documento descreve todos os endpoints necessários para o backend do projeto Véu & Gravata.

## Base URL

```
Production: https://api.veugravata.com
Development: http://localhost:3001
```

## Autenticação

Todos os endpoints (exceto os públicos) requerem autenticação via JWT Bearer Token.

```
Authorization: Bearer <token>
```

---

## 1. Autenticação (Auth)

### POST /api/auth/signup
Criar nova conta de usuário (casal).

**Request Body:**
```json
{
  "email": "casal@email.com",
  "password": "senha123",
  "partner1Name": "Maria",
  "partner2Name": "João"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "casal@email.com",
    "partnerNames": "Maria & João",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt-token"
}
```

### POST /api/auth/login
Autenticar usuário existente.

**Request Body:**
```json
{
  "email": "casal@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "user": { ... },
  "token": "jwt-token"
}
```

### POST /api/auth/logout
Invalidar token atual.

**Response (200):**
```json
{
  "success": true
}
```

### GET /api/auth/me
Obter dados do usuário autenticado.

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "casal@email.com",
    "partnerNames": "Maria & João",
    "avatarUrl": "https://...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## 2. Casamento (Wedding)

### POST /api/wedding
Criar novo casamento.

**Request Body:**
```json
{
  "partner1Name": "Maria",
  "partner2Name": "João",
  "date": "2024-12-15",
  "location": "São Paulo, SP",
  "venue": "Espaço Jardins",
  "templateId": "modern-elegance",
  "primaryColor": "#ea2e5b",
  "secondaryColor": "#F1557C",
  "dressCode": {
    "guests": {
      "palette": ["#000000", "#FFFFFF"],
      "length": "long"
    }
  }
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "slug": "maria-e-joao",
  "partner1Name": "Maria",
  "partner2Name": "João",
  ...
}
```

### GET /api/wedding/:id
Obter casamento por ID (requer autenticação).

### GET /api/wedding/slug/:slug
Obter casamento por slug (público).

**Response (200):**
```json
{
  "id": "uuid",
  "slug": "maria-e-joao",
  "partner1Name": "Maria",
  "partner2Name": "João",
  "date": "2024-12-15",
  "location": "São Paulo, SP",
  "venue": "Espaço Jardins",
  "templateId": "modern-elegance",
  "primaryColor": "#ea2e5b",
  "secondaryColor": "#F1557C",
  "heroImageUrl": "https://...",
  "siteContent": {
    "heroTitle": "We're Getting Married",
    "heroSubtitle": "Join us to celebrate our love",
    "storyTitle": "Nossa História",
    "storyContent": "...",
    "showStorySection": true,
    "ceremonyTitle": "Cerimônia",
    "ceremonyTime": "17:00",
    "ceremonyDescription": "...",
    "receptionTitle": "Recepção",
    "receptionTime": "19:00",
    "receptionDescription": "...",
    "showCountdown": true,
    "showRsvpSection": true,
    "showGiftSection": true,
    "showAccommodationsSection": false,
    "showGallerySection": false,
    "galleryImages": [],
    "footerMessage": "..."
  },
  "customSections": [
    {
      "id": "uuid",
      "type": "text",
      "title": "Título",
      "content": "Conteúdo",
      "order": 0,
      "isVisible": true
    }
  ],
  "isPublished": true
}
```

### PUT /api/wedding/:id
Atualizar casamento (requer autenticação).

**Request Body:** (campos parciais)
```json
{
  "templateId": "beach-wedding",
  "primaryColor": "#0891b2",
  "siteContent": { ... },
  "customSections": [ ... ]
}
```

### DELETE /api/wedding/:id
Deletar casamento (requer autenticação).

---

## 3. Presentes (Gifts)

### GET /api/wedding/:weddingId/gifts
Listar presentes do casamento (público).

**Query Parameters:**
- `category` (optional): Filtrar por categoria
- `status` (optional): `available` | `partial` | `complete`

**Response (200):**
```json
{
  "gifts": [
    {
      "id": "uuid",
      "name": "Cafeteira Expresso",
      "description": "Para nossas manhãs juntos",
      "price": 800.00,
      "imageUrl": "https://...",
      "category": "kitchen",
      "contributedAmount": 400.00,
      "isComplete": false,
      "contributors": [
        {
          "id": "uuid",
          "guestName": "Ana Silva",
          "amount": 200.00,
          "message": "Felicidades!",
          "createdAt": "2024-01-01T00:00:00Z"
        }
      ]
    }
  ],
  "stats": {
    "totalGifts": 10,
    "totalValue": 5000.00,
    "totalContributed": 2500.00
  }
}
```

### POST /api/wedding/:weddingId/gifts
Adicionar presente (requer autenticação).

**Request Body:**
```json
{
  "name": "Cafeteira Expresso",
  "description": "Para nossas manhãs juntos",
  "price": 800.00,
  "imageUrl": "https://...",
  "category": "kitchen"
}
```

### PUT /api/wedding/:weddingId/gifts/:giftId
Atualizar presente (requer autenticação).

### DELETE /api/wedding/:weddingId/gifts/:giftId
Remover presente (requer autenticação).

### GET /api/gifts/popular
Obter presentes populares sugeridos.

**Response (200):**
```json
{
  "gifts": [
    {
      "name": "Fundo Lua de Mel",
      "description": "...",
      "suggestedPrice": 500.00,
      "category": "honeymoon",
      "defaultImageUrl": "https://..."
    }
  ]
}
```

---

## 4. Convidados (Guests)

### GET /api/wedding/:weddingId/guests
Listar convidados (requer autenticação).

**Query Parameters:**
- `status` (optional): `pending` | `confirmed` | `declined`
- `source` (optional): `manual` | `rsvp-form`
- `search` (optional): Buscar por nome/email

**Response (200):**
```json
{
  "guests": [
    {
      "id": "uuid",
      "name": "Ana Silva",
      "email": "ana@email.com",
      "phone": "+55 11 99999-9999",
      "rsvpStatus": "confirmed",
      "numberOfGuests": 2,
      "plusOne": true,
      "dietaryRestrictions": "Vegetariana",
      "message": "Mal posso esperar!",
      "source": "rsvp-form",
      "confirmedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "stats": {
    "total": 50,
    "confirmed": 35,
    "totalAttendees": 60,
    "pending": 10,
    "declined": 5
  }
}
```

### POST /api/wedding/:weddingId/guests
Adicionar convidado manualmente (requer autenticação).

**Request Body:**
```json
{
  "name": "Ana Silva",
  "email": "ana@email.com",
  "phone": "+55 11 99999-9999",
  "rsvpStatus": "pending",
  "plusOne": true,
  "notes": "Amiga da noiva"
}
```

### PUT /api/wedding/:weddingId/guests/:guestId
Atualizar convidado (requer autenticação).

### DELETE /api/wedding/:weddingId/guests/:guestId
Remover convidado (requer autenticação).

### POST /api/wedding/:weddingId/guests/invite
Enviar convite por email (requer autenticação).

**Request Body:**
```json
{
  "guestIds": ["uuid1", "uuid2"],
  "message": "Mensagem personalizada opcional"
}
```

---

## 5. RSVP (Confirmação de Presença) - Público

### POST /api/wedding/:slug/rsvp
Confirmar presença (público - visitante do site).

**Request Body:**
```json
{
  "name": "Ana Silva",
  "email": "ana@email.com",
  "phone": "+55 11 99999-9999",
  "attending": true,
  "numberOfGuests": 2,
  "dietaryRestrictions": "Vegetariana",
  "message": "Mal posso esperar!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Presença confirmada com sucesso!",
  "guest": {
    "id": "uuid",
    "name": "Ana Silva",
    "rsvpStatus": "confirmed",
    "numberOfGuests": 2,
    "confirmedAt": "2024-01-01T00:00:00Z"
  }
}
```

### GET /api/wedding/:slug/rsvp/check
Verificar se email já confirmou presença.

**Query Parameters:**
- `email`: Email do convidado

**Response (200):**
```json
{
  "hasRsvp": true,
  "rsvpStatus": "confirmed",
  "confirmedAt": "2024-01-01T00:00:00Z"
}
```

---

## 6. Pagamentos (Payments)

### POST /api/payments/checkout
Criar sessão de pagamento para presente.

**Request Body:**
```json
{
  "giftId": "uuid",
  "weddingId": "uuid",
  "amount": 200.00,
  "guestName": "Ana Silva",
  "guestEmail": "ana@email.com",
  "message": "Felicidades ao casal!"
}
```

**Response (200):**
```json
{
  "checkoutUrl": "https://checkout.stripe.com/...",
  "sessionId": "cs_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### POST /api/payments/webhook
Webhook do Stripe para atualizar status de pagamento.

**Headers:**
- `Stripe-Signature`: Assinatura do Stripe

**Response (200):**
```json
{
  "received": true
}
```

### GET /api/payments/:paymentId/status
Verificar status do pagamento.

**Response (200):**
```json
{
  "status": "succeeded",
  "amount": 200.00,
  "giftId": "uuid",
  "guestName": "Ana Silva",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

## 7. Upload de Imagens

### POST /api/upload
Fazer upload de imagem.

**Request:** `multipart/form-data`
- `file`: Arquivo de imagem (max 5MB)
- `type`: `hero` | `gallery` | `gift` | `story`

**Response (200):**
```json
{
  "url": "https://storage.veugravata.com/images/xxx.jpg",
  "width": 1920,
  "height": 1080
}
```

---

## 8. Informações Bancárias

### POST /api/wedding/:weddingId/banking
Configurar informações bancárias (requer autenticação).

**Request Body:**
```json
{
  "bankName": "Banco do Brasil",
  "accountNumber": "12345-6",
  "routingNumber": "0001",
  "accountHolderName": "Maria Silva",
  "pixKey": "email@email.com",
  "pixKeyType": "email"
}
```

### GET /api/wedding/:weddingId/banking
Obter informações bancárias (requer autenticação).

---

## 9. Estatísticas do Dashboard

### GET /api/wedding/:weddingId/stats
Obter estatísticas do casamento (requer autenticação).

**Response (200):**
```json
{
  "guests": {
    "total": 50,
    "confirmed": 35,
    "totalAttendees": 60,
    "pending": 10,
    "declined": 5
  },
  "gifts": {
    "total": 15,
    "totalValue": 8000.00,
    "totalContributed": 4500.00,
    "completedCount": 5
  },
  "site": {
    "views": 1250,
    "uniqueVisitors": 450,
    "lastViewedAt": "2024-01-01T00:00:00Z"
  },
  "recentActivity": [
    {
      "type": "rsvp",
      "guestName": "Ana Silva",
      "action": "confirmed",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "type": "gift",
      "guestName": "Pedro Santos",
      "giftName": "Cafeteira",
      "amount": 200.00,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido ou expirado |
| 403 | Forbidden - Sem permissão para acessar recurso |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Recurso já existe (ex: email duplicado) |
| 422 | Unprocessable Entity - Validação falhou |
| 500 | Internal Server Error - Erro interno |

**Formato de erro:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "O campo email é obrigatório",
    "details": {
      "field": "email",
      "constraint": "required"
    }
  }
}
```

---

## Categorias de Presentes

| ID | Nome (PT) | Nome (EN) |
|----|-----------|-----------|
| `honeymoon` | Lua de Mel | Honeymoon |
| `kitchen` | Cozinha | Kitchen |
| `bedroom` | Quarto | Bedroom |
| `bathroom` | Banheiro | Bathroom |
| `living` | Sala | Living Room |
| `dining` | Jantar | Dining |
| `garden` | Jardim | Garden |
| `outdoor` | Externo | Outdoor |
| `experiences` | Experiências | Experiences |
| `cash` | Dinheiro | Cash |
| `other` | Outro | Other |

---

## Templates Disponíveis

| ID | Nome |
|----|------|
| `modern-elegance` | Modern Elegance |
| `classic-romance` | Classic Romance |
| `rustic-garden` | Rustic Garden |
| `bohemian-dream` | Bohemian Dream |
| `beach-wedding` | Beach Wedding |
| `church-wedding` | Church Wedding |

---

## Tipos de Seções Personalizadas

| Tipo | Descrição |
|------|-----------|
| `text` | Seção de texto com título e conteúdo |
| `image` | Seção de imagem com título opcional |
| `quote` | Citação/frase especial |
| `video` | Embed de vídeo (YouTube/Vimeo) |
| `map` | Mapa do Google Maps |
| `timeline` | Linha do tempo do relacionamento |

---

## Variáveis de Ambiente (Backend)

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/veugravata

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Stripe
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Storage (S3/Cloudflare R2)
STORAGE_ENDPOINT=https://xxx.r2.cloudflarestorage.com
STORAGE_ACCESS_KEY=xxx
STORAGE_SECRET_KEY=xxx
STORAGE_BUCKET=veugravata-uploads

# Email (SendGrid/Resend)
EMAIL_API_KEY=xxx
EMAIL_FROM=noreply@veugravata.com

# App
APP_URL=https://veugravata.com
API_URL=https://api.veugravata.com
```

---

## Próximos Passos

1. [ ] Implementar autenticação JWT
2. [ ] Criar modelos do banco de dados (Prisma/TypeORM)
3. [ ] Implementar endpoints de Wedding
4. [ ] Implementar endpoints de Gifts
5. [ ] Implementar endpoints de Guests/RSVP
6. [ ] Integrar Stripe para pagamentos
7. [ ] Configurar storage de imagens
8. [ ] Implementar envio de emails
9. [ ] Adicionar rate limiting
10. [ ] Implementar cache (Redis)
