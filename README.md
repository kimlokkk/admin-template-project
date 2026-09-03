# Business Admin Platform

A reusable, general-purpose administration platform built with Next.js,
TypeScript, Tailwind CSS, and Supabase. The initial product focuses on CRM and
day-to-day business operations while keeping client branding and business rules
configurable.

## Current status

Version: `0.1.0`

The current foundation includes:

- Supabase password authentication
- Server-side session refresh
- Protected application routes
- Responsive admin shell and persistent collapsible sidebar
- Light, dark, and system themes
- Dashboard empty states
- Module route placeholders for the next development phases

Business tables, profiles, roles, and permissions are not yet included.

## Technology

- Next.js 16 with App Router
- React 19 and TypeScript
- Tailwind CSS and shadcn/ui primitives
- Supabase Auth, PostgreSQL, Storage, and Realtime

## Local setup

1. Clone the repository.

   ```bash
   git clone https://github.com/kimlokkk/admin-template-project.git
   cd admin-template-project
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and add your Supabase project values.

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
   NEXT_PUBLIC_APP_NAME=Business Admin
   NEXT_PUBLIC_COMPANY_NAME=Your Company
   NEXT_PUBLIC_SIGN_UP_ENABLED=true
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Never commit `.env.local` or a Supabase service-role key.

## Commands

```bash
npm run dev     # Start local development
npm run lint    # Run ESLint
npm run build   # Create a production build
npm start       # Run the production build
```

## Application configuration

Public display settings currently live in environment variables so a client can
be rebranded without editing components:

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Business Admin` |
| `NEXT_PUBLIC_COMPANY_NAME` | Company shown in the shell | `Your Company` |
| `NEXT_PUBLIC_SIGN_UP_ENABLED` | Enable public registration | `true` |

The central fallback configuration is in `lib/config/app.ts`.

## Route structure

```text
app/
├── auth/                 Public authentication flow
├── (dashboard)/          Protected administration routes
│   ├── dashboard/        Dashboard
│   └── [module]/         Temporary module placeholders
└── page.tsx              Session-aware entry redirect

components/
├── layout/               Admin shell and navigation
└── ui/                   Reusable UI primitives

lib/
├── config/               Application configuration
└── supabase/             Browser, server, and proxy clients
```

Route groups such as `(dashboard)` organise the code without changing the URL.
This is similar to grouping Laravel routes while keeping the public path clean.

## Authentication flow

1. The root route checks the current session.
2. Signed-out users are redirected to `/auth/login`.
3. Signed-in users are redirected to `/dashboard`.
4. `proxy.ts` refreshes Supabase cookies and prevents signed-out access to admin
   routes.
5. The protected dashboard layout performs a second server-side authentication
   check before rendering the admin shell.

## Next development milestone

Create the `profiles` table and RLS policies, then connect the signed-in user to
a profile before implementing the Customers module.
