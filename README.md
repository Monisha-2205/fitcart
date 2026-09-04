# FitCart

FitCart is a Next.js 16 healthy-food storefront with Supabase authentication, PostgreSQL-backed products and orders, and a role-protected merchant portal. The original cart, wishlist, responsive storefront, and FitCart visual design are retained.

## Packages

The application uses `@supabase/supabase-js` and `@supabase/ssr` in addition to Next.js, React, and Tailwind CSS. Supabase browser and server clients live in `src/lib/supabase/`; `src/proxy.js` refreshes the auth cookie session using the Next.js 16 Proxy convention.

## Set up Supabase

1. Create a project at [Supabase](https://supabase.com/dashboard).
2. In **Project Settings → API**, copy the project URL and the **publishable** key. Do not use a service-role key in this app.
3. Copy `.env.example` to `.env.local`, then supply:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   ```

4. In the Supabase SQL Editor, run [supabase/schema.sql](supabase/schema.sql), then run [supabase/seed.sql](supabase/seed.sql). The seed retains the original 16 FitCart products and their IDs.
5. In **Authentication → URL Configuration**, add `http://localhost:3000/auth/callback` as a redirect URL for local development (and add your deployed `/auth/callback` URL later). Enable or configure email confirmation to suit your project.

The SQL setup enables RLS, gives customers access only to their profiles/orders, gives public users read access to active products, and restricts merchant operations to the `merchant` profile role. The `place_order` RPC locks product rows, validates stock and server-side price, creates the order and order items, and decrements stock atomically.

## Create the first merchant securely

1. Create a normal account at `/signup` (or invite/create it through Supabase Auth).
2. In Supabase's SQL Editor, locate the account UUID in **Authentication → Users**.
3. Run this command with that UUID:

   ```sql
   update public.profiles
   set role = 'merchant'
   where id = 'YOUR_AUTH_USER_UUID';
   ```

4. Sign in at `/merchant/login`. Merchant credentials are never stored in source code.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Run `npm run lint` and `npm run build` before deployment.

## Deployment on Vercel

1. Push the repository to your Git provider and import it into Vercel.
2. In **Vercel → Project Settings → Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for Production (and Preview if needed).
3. Add `https://your-domain.com/auth/callback` to Supabase Auth redirect URLs.
4. Deploy. Never add `.env.local`, any Supabase service-role key, or user passwords to Git or Vercel client variables.

## Key routes

- Customer: `/login`, `/signup`, `/account`, `/checkout`
- Merchant: `/merchant/login`, `/merchant`, `/merchant/products`, `/merchant/orders`
- Database setup: `supabase/schema.sql`, `supabase/seed.sql`

Cash on Delivery is available. Online card payments remain intentionally unavailable until a payment gateway is integrated.
