# Backend Documentation - Véu & Gravata

Este documento detalha todos os requisitos do backend, incluindo endpoints de API, estruturas de banco de dados, integrações e fluxos de dados.

---

## Índice

1. [Arquitetura Geral](#arquitetura-geral)
2. [Banco de Dados](#banco-de-dados)
3. [API Endpoints](#api-endpoints)
4. [Integrações Externas](#integrações-externas)
5. [Fluxos de Dados](#fluxos-de-dados)
6. [Segurança](#segurança)

---

## Arquitetura Geral

### Stack Sugerida
- **Runtime**: Node.js 18+ ou Bun
- **Framework**: Fastify, Express ou Hono
- **ORM**: Prisma ou Drizzle
- **Banco de Dados**: PostgreSQL
- **Cache**: Redis
- **Email Service**: Resend, SendGrid ou Amazon SES
- **Storage**: AWS S3 ou Cloudflare R2
- **Pagamentos**: Stripe ou PagSeguro (para PIX)

---

## Banco de Dados

### Schemas

#### 1. Users (Usuários/Casais)

```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  passwordHash    String
  name            String
  phone           String?
  emailVerified   Boolean   @default(false)
  emailVerifiedAt DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  wedding         Wedding?
  sessions        Session[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### 2. Wedding (Casamento)

```prisma
model Wedding {
  id              String    @id @default(cuid())
  userId          String    @unique
  slug            String    @unique  // URL amigável: /wedding/maria-joao

  // Informações do casal
  partner1Name    String
  partner2Name    String

  // Data e local
  date            DateTime?
  time            String?
  location        String?
  venue           String?
  address         String?
  coordinates     Json?     // { lat: number, lng: number }

  // Template e estilo
  templateId      String    @default("modern-elegance")
  primaryColor    String    @default("#ea2e5b")
  secondaryColor  String    @default("#F1557C")
  heroImage       String?   // URL da imagem

  // Dress Code
  dressCode       Json?     // { guests: {...}, bridesmaids: {...}, groomsmen: {...} }

  // Conteúdo do site
  siteContent     Json?     // Objeto com todos os textos customizáveis
  customSections  Json?     // Seções customizadas adicionadas pelo casal

  // Dados bancários (para receber presentes)
  bankName        String?
  bankAccount     String?
  bankAgency      String?
  pixKey          String?
  pixKeyType      String?   // cpf, email, phone, random

  // Status
  isPublished     Boolean   @default(false)
  publishedAt     DateTime?

  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  guests          Guest[]
  gifts           Gift[]
  rsvps           RSVP[]
  invitations     Invitation[]
  payments        Payment[]
}
```

#### 3. Guest (Convidado)

```prisma
model Guest {
  id                  String    @id @default(cuid())
  weddingId           String

  // Informações do convidado
  name                String
  email               String
  phone               String?

  // Acompanhante
  hasPlusOne          Boolean   @default(false)
  plusOneName         String?
  plusOneAge          Int?

  // Restrições
  dietaryRestrictions String?
  specialNeeds        String?

  // Grupo/Mesa (opcional para organização)
  groupName           String?
  tableNumber         Int?

  // Status
  rsvpStatus          RsvpStatus @default(PENDING)
  rsvpRespondedAt     DateTime?

  // Metadata
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  // Relations
  wedding             Wedding   @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  invitation          Invitation?
  rsvp                RSVP?

  @@unique([weddingId, email])
}

enum RsvpStatus {
  PENDING
  CONFIRMED
  DECLINED
}
```

#### 4. Invitation (Convite por Email)

```prisma
model Invitation {
  id              String           @id @default(cuid())
  guestId         String           @unique
  weddingId       String

  // Status do email
  status          InvitationStatus @default(NOT_SENT)

  // Tracking de eventos
  sentAt          DateTime?
  deliveredAt     DateTime?
  openedAt        DateTime?
  clickedAt       DateTime?
  bouncedAt       DateTime?
  failedAt        DateTime?

  // Informações de erro (se houver)
  errorMessage    String?
  errorCode       String?

  // Email provider tracking
  providerMessageId String?       // ID do email no provedor (Resend, SendGrid, etc.)

  // Contagem de reenvios
  resendCount     Int              @default(0)
  lastResendAt    DateTime?

  // Metadata
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  // Relations
  guest           Guest            @relation(fields: [guestId], references: [id], onDelete: Cascade)
  wedding         Wedding          @relation(fields: [weddingId], references: [id], onDelete: Cascade)
}

enum InvitationStatus {
  NOT_SENT      // Nunca enviado
  PENDING       // Enviando
  SENT          // Enviado (aceito pelo servidor de email)
  DELIVERED     // Entregue na caixa de entrada
  OPENED        // Email aberto
  CLICKED       // Link clicado
  BOUNCED       // Rejeitado (email inválido)
  FAILED        // Falhou no envio
}
```

#### 5. RSVP (Confirmação de Presença)

```prisma
model RSVP {
  id              String      @id @default(cuid())
  guestId         String      @unique
  weddingId       String

  // Resposta
  willAttend      Boolean
  guestCount      Int         @default(1)  // Inclui acompanhante se houver

  // Acompanhante (confirmado)
  plusOneName     String?
  plusOneAge      Int?

  // Informações adicionais
  dietaryRestrictions String?
  message         String?     // Mensagem opcional do convidado

  // Metadata
  respondedAt     DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  ipAddress       String?
  userAgent       String?

  // Relations
  guest           Guest       @relation(fields: [guestId], references: [id], onDelete: Cascade)
  wedding         Wedding     @relation(fields: [weddingId], references: [id], onDelete: Cascade)
}
```

#### 6. Gift (Presente)

```prisma
model Gift {
  id              String    @id @default(cuid())
  weddingId       String

  // Informações do presente
  name            String
  description     String?
  price           Decimal   @db.Decimal(10, 2)
  imageUrl        String?

  // Categorização
  category        String?
  priority        Int       @default(0)

  // Status
  isActive        Boolean   @default(true)
  isPurchased     Boolean   @default(false)
  purchasedAt     DateTime?
  purchasedBy     String?   // Nome do comprador

  // Link externo (opcional)
  externalUrl     String?

  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  wedding         Wedding   @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  payments        Payment[]
}
```

#### 7. Payment (Pagamento)

```prisma
model Payment {
  id              String        @id @default(cuid())
  weddingId       String
  giftId          String?

  // Comprador
  buyerName       String
  buyerEmail      String
  buyerPhone      String?
  buyerMessage    String?       // Mensagem para o casal

  // Valores
  amount          Decimal       @db.Decimal(10, 2)
  currency        String        @default("BRL")

  // Método de pagamento
  paymentMethod   PaymentMethod

  // Status
  status          PaymentStatus @default(PENDING)

  // Provider data
  providerPaymentId String?     // ID no Stripe/PagSeguro
  providerData    Json?         // Dados adicionais do provider

  // PIX específico
  pixCode         String?       // Código copia e cola
  pixQrCode       String?       // URL do QR Code
  pixExpiresAt    DateTime?

  // Timestamps
  paidAt          DateTime?
  failedAt        DateTime?
  refundedAt      DateTime?

  // Metadata
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  // Relations
  wedding         Wedding       @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  gift            Gift?         @relation(fields: [giftId], references: [id], onDelete: SetNull)
}

enum PaymentMethod {
  PIX
  CREDIT_CARD
  DEBIT_CARD
}

enum PaymentStatus {
  PENDING
  PROCESSING
  PAID
  FAILED
  REFUNDED
  CANCELLED
}
```

---

## API Endpoints

### Autenticação

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/api/auth/signup` | Criar conta | `{ email, password, name }` | `{ user, token }` |
| POST | `/api/auth/login` | Login | `{ email, password }` | `{ user, token }` |
| POST | `/api/auth/logout` | Logout | - | `{ success: true }` |
| GET | `/api/auth/me` | Usuário atual | - | `{ user }` |
| POST | `/api/auth/forgot-password` | Esqueci senha | `{ email }` | `{ success: true }` |
| POST | `/api/auth/reset-password` | Resetar senha | `{ token, password }` | `{ success: true }` |
| POST | `/api/auth/verify-email` | Verificar email | `{ token }` | `{ success: true }` |

### Wedding (Casamento)

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/api/wedding` | Criar casamento | `{ partner1Name, partner2Name, ... }` | `{ wedding }` |
| GET | `/api/wedding/:id` | Obter por ID | - | `{ wedding }` |
| GET | `/api/wedding/slug/:slug` | Obter por slug (público) | - | `{ wedding }` |
| PUT | `/api/wedding/:id` | Atualizar | `{ ...campos }` | `{ wedding }` |
| PUT | `/api/wedding/:id/publish` | Publicar site | - | `{ wedding }` |
| PUT | `/api/wedding/:id/unpublish` | Despublicar site | - | `{ wedding }` |
| DELETE | `/api/wedding/:id` | Deletar | - | `{ success: true }` |

### Guests (Convidados)

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| GET | `/api/guests` | Listar convidados | Query: `?status=&search=` | `{ guests, total }` |
| POST | `/api/guests` | Adicionar convidado | `{ name, email, phone, ... }` | `{ guest }` |
| POST | `/api/guests/import` | Importar CSV/Excel | FormData com arquivo | `{ imported: number, errors: [] }` |
| GET | `/api/guests/:id` | Obter convidado | - | `{ guest }` |
| PUT | `/api/guests/:id` | Atualizar convidado | `{ ...campos }` | `{ guest }` |
| DELETE | `/api/guests/:id` | Remover convidado | - | `{ success: true }` |

### Invitations (Convites por Email)

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/api/invitations/send` | Enviar para um convidado | `{ guestId }` | `{ invitation }` |
| POST | `/api/invitations/send-bulk` | Enviar para vários | `{ guestIds: string[] }` | `{ sent: number, failed: number }` |
| POST | `/api/invitations/resend/:guestId` | Reenviar convite | - | `{ invitation }` |
| GET | `/api/invitations/status/:guestId` | Status do convite | - | `{ invitation }` |
| GET | `/api/invitations/stats` | Estatísticas | - | `{ total, sent, opened, ... }` |
| POST | `/api/invitations/webhook` | Webhook do email provider | Provider-specific | `{ received: true }` |

#### Webhook de Email (Resend/SendGrid)

O endpoint `/api/invitations/webhook` recebe eventos do provedor de email:

```typescript
// Eventos suportados:
type EmailEvent =
  | 'email.sent'        // Email aceito pelo servidor
  | 'email.delivered'   // Entregue na caixa de entrada
  | 'email.opened'      // Email aberto (tracking pixel)
  | 'email.clicked'     // Link clicado
  | 'email.bounced'     // Email rejeitado
  | 'email.complained'  // Marcado como spam

// Payload do webhook (Resend):
{
  type: EmailEvent,
  created_at: string,
  data: {
    email_id: string,
    to: string,
    subject: string,
    // ... outros campos
  }
}
```

### RSVP (Confirmação de Presença)

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/api/rsvp` | Confirmar presença | `{ guestEmail, weddingSlug, willAttend, ... }` | `{ rsvp }` |
| GET | `/api/rsvp/:weddingSlug/:email` | Verificar RSVP | - | `{ rsvp }` |
| PUT | `/api/rsvp/:id` | Atualizar RSVP | `{ ...campos }` | `{ rsvp }` |

### Gifts (Presentes)

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| GET | `/api/gifts` | Listar presentes | Query: `?category=&available=` | `{ gifts }` |
| GET | `/api/gifts/popular` | Presentes populares | - | `{ gifts }` |
| POST | `/api/gifts` | Adicionar presente | `{ name, price, ... }` | `{ gift }` |
| GET | `/api/gifts/:id` | Obter presente | - | `{ gift }` |
| PUT | `/api/gifts/:id` | Atualizar presente | `{ ...campos }` | `{ gift }` |
| DELETE | `/api/gifts/:id` | Remover presente | - | `{ success: true }` |

### Payments (Pagamentos)

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/api/payments/checkout` | Iniciar pagamento | `{ giftId, buyerName, ... }` | `{ payment, checkoutUrl }` |
| POST | `/api/payments/pix` | Gerar PIX | `{ giftId, amount, ... }` | `{ payment, pixCode, qrCode }` |
| GET | `/api/payments/:id/status` | Status do pagamento | - | `{ payment }` |
| POST | `/api/payments/webhook` | Webhook do provider | Provider-specific | `{ received: true }` |

### Upload de Imagens

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/api/upload/image` | Upload de imagem | FormData | `{ url, key }` |
| DELETE | `/api/upload/image/:key` | Deletar imagem | - | `{ success: true }` |

---

## Integrações Externas

### 1. Serviço de Email (Resend - Recomendado)

**Configuração:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=convites@veugravata.com
RESEND_WEBHOOK_SECRET=whsec_xxxxxx
```

**Funcionalidades:**
- Envio de convites com template HTML personalizado
- Tracking de abertura e cliques
- Webhooks para atualização de status
- Suporte a domínio customizado

**Template do Email de Convite:**
- Deve incluir: nomes do casal, data, local, botão de RSVP
- Pixel de tracking para detectar abertura
- Links com tracking para detectar cliques

### 2. Processador de Pagamentos

#### Opção A: Stripe

```env
STRIPE_SECRET_KEY=sk_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
STRIPE_PUBLIC_KEY=pk_xxxx
```

**Fluxos:**
- Checkout Session para cartões
- Payment Intents para PIX

#### Opção B: PagSeguro (para PIX nativo)

```env
PAGSEGURO_TOKEN=xxxxx
PAGSEGURO_EMAIL=email@example.com
PAGSEGURO_WEBHOOK_URL=https://api.veugravata.com/api/payments/webhook
```

### 3. Storage de Imagens (AWS S3/Cloudflare R2)

```env
S3_BUCKET=veugravata-uploads
S3_REGION=sa-east-1
S3_ACCESS_KEY=xxxxx
S3_SECRET_KEY=xxxxx
S3_CDN_URL=https://cdn.veugravata.com
```

**Políticas:**
- Imagens públicas para hero e galeria
- Limite de 5MB por imagem
- Formatos: JPG, PNG, WebP
- Redimensionamento automático (thumbnail, medium, large)

---

## Fluxos de Dados

### 1. Fluxo de Onboarding do Casal

```
1. Signup → Criar User
2. Onboarding Step 1 → Criar Wedding (parcialmente preenchido)
3. Onboarding Steps 2-8 → Atualizar Wedding
4. Preview → Wedding com isPublished=false
5. Publicar → isPublished=true, gerar slug final
```

### 2. Fluxo de Envio de Convites

```
1. Casal seleciona convidados
2. POST /api/invitations/send-bulk
3. Para cada convidado:
   a. Criar/atualizar Invitation com status=PENDING
   b. Chamar Resend API para enviar email
   c. Atualizar Invitation com status=SENT e providerMessageId
4. Webhook recebe eventos de delivery/open/click
5. Atualizar Invitation com novos status
```

### 3. Fluxo de RSVP

```
1. Convidado clica no link do email
2. Redireciona para /wedding/{slug}/rsvp?email={email}
3. Preenche formulário de confirmação
4. POST /api/rsvp
5. Atualizar Guest.rsvpStatus
6. Criar/atualizar RSVP
7. Enviar email de confirmação (opcional)
```

### 4. Fluxo de Pagamento (Presente)

```
1. Visitante escolhe presente
2. POST /api/payments/checkout ou /api/payments/pix
3. Se PIX:
   a. Gerar código PIX
   b. Retornar QR Code e código copia-cola
   c. Polling para verificar status
4. Se Cartão:
   a. Criar Checkout Session no Stripe
   b. Redirecionar para página do Stripe
   c. Webhook recebe confirmação
5. Atualizar Payment.status e Gift.isPurchased
6. Notificar casal (email/push)
```

---

## Segurança

### Autenticação

- JWT com expiração de 7 dias
- Refresh tokens com expiração de 30 dias
- Hash de senhas com bcrypt (cost factor 12)
- Rate limiting: 5 tentativas de login por IP/minuto

### Autorização

- Middleware de autenticação em rotas protegidas
- Verificação de ownership (usuário só acessa seus dados)
- CORS configurado para domínios permitidos

### Validação de Dados

- Validação com Zod em todas as entradas
- Sanitização de HTML em campos de texto
- Limite de tamanho de uploads

### Proteções

- HTTPS obrigatório em produção
- Helmet.js para headers de segurança
- Rate limiting global: 100 req/min por IP
- CSRF tokens para ações sensíveis
- Webhooks verificados com assinatura HMAC

### Dados Sensíveis

- Dados bancários encriptados em repouso
- PII (email, telefone) com acesso auditado
- Logs sem dados sensíveis

---

## Variáveis de Ambiente

```env
# App
NODE_ENV=production
APP_URL=https://veugravata.com
API_URL=https://api.veugravata.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/veugravata

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# Email (Resend)
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=convites@veugravata.com
RESEND_FROM_NAME=Véu & Gravata
RESEND_WEBHOOK_SECRET=whsec_xxxxx

# Storage (S3/R2)
S3_BUCKET=veugravata-uploads
S3_REGION=sa-east-1
S3_ACCESS_KEY=xxxxx
S3_SECRET_KEY=xxxxx
S3_CDN_URL=https://cdn.veugravata.com

# Payments (Stripe)
STRIPE_SECRET_KEY=sk_xxxxx
STRIPE_PUBLIC_KEY=pk_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Payments (PagSeguro - alternativa)
PAGSEGURO_TOKEN=xxxxx
PAGSEGURO_EMAIL=xxxxx
```

---

## Commits Sugeridos para o Backend

```bash
git commit -m "feat: setup initial project structure with Fastify and Prisma"
git commit -m "feat: add user authentication with JWT"
git commit -m "feat: add wedding CRUD endpoints"
git commit -m "feat: add guest management endpoints"
git commit -m "feat: add invitation email system with Resend"
git commit -m "feat: add email tracking webhooks"
git commit -m "feat: add RSVP public endpoints"
git commit -m "feat: add gift registry endpoints"
git commit -m "feat: add payment processing with Stripe"
git commit -m "feat: add PIX payment support"
git commit -m "feat: add image upload to S3"
git commit -m "feat: add rate limiting and security middleware"
git commit -m "docs: add API documentation with Swagger"
```

---

## Notas de Implementação

1. **Email Tracking**: Use pixel de tracking (1x1 transparent GIF) para detectar abertura de emails.

2. **Slugs**: Gerar slugs únicos baseados nos nomes do casal + número aleatório se necessário.

3. **Webhooks**: Implementar retry com backoff exponencial para webhooks que falham.

4. **Cache**: Usar Redis para cache de:
   - Dados do wedding público (TTL: 5 min)
   - Estatísticas de convites (TTL: 1 min)
   - Rate limiting

5. **Jobs Assíncronos**: Usar filas (BullMQ) para:
   - Envio de emails em lote
   - Processamento de uploads
   - Notificações

6. **Monitoring**:
   - Logs estruturados (JSON)
   - Métricas de taxa de entrega de emails
   - Alertas para falhas de pagamento
