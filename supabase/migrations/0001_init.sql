-- ─── Urban Uniform — Initial Supabase schema ──────────────────────────────
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- Mirrors the Strapi content-type logic:
--   products  (draftAndPublish: true  → published_at nullable)
--   categories (draftAndPublish: false)
--   product_images (mirrors Strapi's media relation, flattened)
--   contact_submissions (draftAndPublish: false)
-- ─── categories ────────────────────────────────────────────────────────────
create table if not exists public.categories (
  id bigserial primary key,
  name text not null,
  slug text not null unique,
  parent_id bigint references public.categories(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_categories_parent_id on public.categories(parent_id);

-- ─── products ──────────────────────────────────────────────────────────────
-- published_at is null  → draft  (hidden from the public site)
-- published_at is set   → live
create table if not exists public.products (
  id bigserial primary key,
  title text not null,
  description text not null,
  price numeric(12, 2) not null,
  tag text,
  tag_variant text not null default 'default' check (
    tag_variant in (
      'default',
      'primary',
      'secondary',
      'destructive',
      'outline'
    )
  ),
  slug text not null unique,
  category_id bigint references public.categories(id) on delete set null,
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_category_id   on public.products(category_id);
create index if not exists idx_products_slug          on public.products(slug);
create index if not exists idx_products_published_at  on public.products(published_at);

-- ─── product_images ────────────────────────────────────────────────────────
-- Flattened view of Strapi's media relation: one row per image,
-- ordered by `position`, with Supabase Storage URL in `url`.
create table if not exists public.product_images (
  id bigserial primary key,
  product_id bigint not null references public.products(id) on delete cascade,
  url text not null,
  path text,
  alt text,
  width integer,
  height integer,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_product_images_product_id on public.product_images(product_id);

-- ─── contact_submissions ───────────────────────────────────────────────────
-- Matches Strapi schema exactly: phone_number, mail, note.
create table if not exists public.contact_submissions (
  id bigserial primary key,
  phone_number text not null,
  mail text not null,
  note text not null,
  created_at timestamptz not null default now()
);

-- ─── updated_at trigger ────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated   on public.products;
drop trigger if exists trg_categories_updated on public.categories;

create trigger trg_products_updated
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger trg_categories_updated
  before update on public.categories
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ────────────────────────────────────────────────────
alter table public.categories          enable row level security;
alter table public.products            enable row level security;
alter table public.product_images      enable row level security;
alter table public.contact_submissions enable row level security;

-- Public read: categories are always public
drop policy if exists "public read categories" on public.categories;
create policy "public read categories"
  on public.categories for select
  using (true);

-- Public read: only products that are "published" (published_at set)
drop policy if exists "public read published products" on public.products;
create policy "public read published products"
  on public.products for select
  using (published_at is not null);

-- Public read: images of published products
drop policy if exists "public read product images" on public.product_images;
create policy "public read product images"
  on public.product_images for select
  using (
    exists (
      select 1
      from public.products p
      where p.id = product_images.product_id
        and p.published_at is not null
    )
  );

-- Public insert: anyone can submit a contact form
drop policy if exists "public insert contact submissions" on public.contact_submissions;
create policy "public insert contact submissions"
  on public.contact_submissions for insert
  with check (true);

-- ─── Storage bucket for product images ─────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public read product-images bucket" on storage.objects;
create policy "public read product-images bucket"
  on storage.objects for select
  using (bucket_id = 'product-images');
