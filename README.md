This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase Setup

1. Environment variables (in `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. SQL (run in Supabase SQL editor):

```sql
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  company text not null,
  address text,
  product_type text not null,
  quantity int not null,
  volume text,
  weight text,
  photo_url text,
  hs_code text not null,
  origin text not null,
  incoterm text,
  port text,
  frequency text,
  destinations text,
  storage_required boolean default false,
  conditions text[] default '{}',
  timing text,
  options text[],
  comments text
);

-- Enable Row Level Security
alter table public.quotes enable row level security;

-- Allow authenticated users to insert their own quotes
create policy "insert_own_quotes" on public.quotes
  for insert to authenticated with check (true);

-- Allow users to read their own quotes by email (customize later with user_id)
create policy "read_own_quotes" on public.quotes
  for select to authenticated using (email = auth.jwt() ->> 'email');
```

3. Turn on email auth in Supabase Auth settings.
