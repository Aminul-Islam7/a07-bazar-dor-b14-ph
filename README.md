<p align="center">
  <img src="src/app/icon.svg" alt="Bazar Dor Logo" width="72" height="72" />
</p>

# Bazar Dor

Track daily commodity prices. Compare markets with confidence.

Bazar Dor is an everyday commodity price tracking platform tailored for consumers looking to monitor daily market rates across essentials like rice, pulses, edible oil, vegetables, fish, meat, and spices. It aggregates price movements, highlights day-over-day changes, and delivers multi-market comparisons across key bazaars.

*A portfolio exploration and full-stack practice project demonstrating modern Next.js architecture, authentication flows, and data aggregation.*

---

## Live Links

- **Web App**: [a07-bazar-dor-b14-ph.vercel.app](https://a07-bazar-dor-b14-ph.vercel.app/) *(or active deployment URL)*
- **Repository**: [github.com/Aminul-Islam7/a07-bazar-dor-b14-ph](https://github.com/Aminul-Islam7/a07-bazar-dor-b14-ph)

---

## Features

- **Live Ticker & Market Pulse**: Smooth marquee bar tracking real-time daily prices and day-over-day price direction indicators (up/down percentage shifts).
- **Multi-Market Comparison**: Detailed commodity breakdowns comparing rates across different city bazaars alongside computed min, max, and average benchmarks.
- **Category Browsing & Instant Sorting**: Fast category exploration with client-side sorting by price points (low-to-high, high-to-low) and price trend grouping.
- **Full Bengali Localization & Theming**: Integrated Bengali typography (Hind Siliguri), native numeral formatting, Bangla calendar dates, and seamless light/dark mode support.
- **Secured Authentication & User Profiles**: Full auth workflows with Better Auth & MongoDB, including email/password credentials, Google & GitHub OAuth, protected routes via Next.js Proxy, and account profile controls.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, SSG / ISR)
- **Library**: React 19 (React Compiler enabled)
- **Authentication**: Better Auth (Email/Password, Google & GitHub OAuth)
- **Database**: MongoDB
- **Styling**: Tailwind CSS v4, Base UI & Radix Primitives
- **Icons & Animation**: Lucide React, React Icons, TW Animate
- **Typography**: Hind Siliguri (Google Fonts)
- **Validation & Forms**: React Hook Form, Zod, Sonner

---

## Local Setup

### Prerequisites

Node.js 18.18+ and npm (or pnpm / yarn).

```bash
# Clone
git clone https://github.com/Aminul-Islam7/a07-bazar-dor-b14-ph.git
cd a07-bazar-dor-b14-ph

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables (.env)

Create a `.env` file in the root directory:

```env
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB=your_mongodb_connection_string

BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret

BETTER_AUTH_GITHUB_CLIENT_ID=your_github_client_id
BETTER_AUTH_GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Build for Production

```bash
npm run build
npm run start
```
