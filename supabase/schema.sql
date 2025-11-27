-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Tours Table
create table if not exists public.tours (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  region text not null, -- 'Kashmir', 'Ladakh', 'Jammu'
  duration_days integer not null,
  base_price numeric not null,
  short_description text,
  long_description text,
  highlights jsonb, -- Array of strings
  trip_type text, -- 'Family', 'Honeymoon', etc.
  itinerary jsonb, -- Structured itinerary data
  inclusions jsonb,
  exclusions jsonb,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tour Images
create table if not exists public.tour_images (
  id uuid default uuid_generate_v4() primary key,
  tour_id uuid references public.tours(id) on delete cascade,
  storage_path text not null,
  is_featured boolean default false,
  caption text,
  sort_order integer default 0
);

-- Gallery Images (Standalone)
create table if not exists public.gallery_images (
  id uuid default uuid_generate_v4() primary key,
  category text, -- 'Summer', 'Winter', 'Ladakh', etc.
  storage_path text not null,
  caption text,
  created_at timestamptz default now()
);

-- Bookings
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  tour_id uuid references public.tours(id),
  user_id uuid references auth.users(id), -- Nullable (guest checkout)
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  travellers_adults integer default 1,
  travellers_children integer default 0,
  start_date date,
  total_price numeric,
  status text default 'pending', -- 'pending', 'paid', 'cancelled', 'completed'
  payment_order_id text, -- Razorpay Order ID
  payment_gateway text default 'razorpay',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  location text,
  rating integer check (rating >= 1 and rating <= 5),
  text text,
  trip_type text,
  trip_date date,
  show_on_homepage boolean default false,
  created_at timestamptz default now()
);

-- Storage Buckets
insert into storage.buckets (id, name, public) values ('tours', 'tours', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict do nothing;

-- RLS Policies

-- Tours: Public read, Admin write
alter table public.tours enable row level security;
create policy "Public tours are viewable by everyone" on public.tours for select using (true);
create policy "Admins can insert tours" on public.tours for insert with check (auth.role() = 'service_role'); -- Simplified for now, ideally check user role
create policy "Admins can update tours" on public.tours for update using (auth.role() = 'service_role');

-- Tour Images: Public read, Admin write
alter table public.tour_images enable row level security;
create policy "Public tour images are viewable by everyone" on public.tour_images for select using (true);

-- Gallery: Public read, Admin write
alter table public.gallery_images enable row level security;
create policy "Public gallery images are viewable by everyone" on public.gallery_images for select using (true);
create policy "Admins can insert gallery images" on public.gallery_images for insert with check (auth.role() = 'authenticated');
create policy "Admins can update gallery images" on public.gallery_images for update using (auth.role() = 'authenticated');
create policy "Admins can delete gallery images" on public.gallery_images for delete using (auth.role() = 'authenticated');

-- Testimonials: Public read, Admin write
alter table public.testimonials enable row level security;
create policy "Public testimonials are viewable by everyone" on public.testimonials for select using (true);
create policy "Admins can insert testimonials" on public.testimonials for insert with check (auth.role() = 'authenticated');
create policy "Admins can update testimonials" on public.testimonials for update using (auth.role() = 'authenticated');
create policy "Admins can delete testimonials" on public.testimonials for delete using (auth.role() = 'authenticated');

-- Bookings: User can view own, Admin view all, Public create (guest)
alter table public.bookings enable row level security;
create policy "Users can view own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Anyone can create bookings" on public.bookings for insert with check (true);

-- Storage Policies
create policy "Public Access" on storage.objects for select using ( bucket_id in ('tours', 'gallery') );
-- Allow authenticated users to upload to tours and gallery buckets
create policy "Admin Insert" on storage.objects for insert with check ( bucket_id in ('tours', 'gallery') and auth.role() = 'authenticated' );
-- Create Destinations Table
create table if not exists public.destinations (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description text,
  image text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.destinations enable row level security;

-- RLS Policies
create policy "Public destinations are viewable by everyone" 
  on public.destinations for select using (true);

create policy "Admins can insert destinations" 
  on public.destinations for insert with check (auth.role() = 'service_role');

create policy "Admins can update destinations" 
  on public.destinations for update using (auth.role() = 'service_role');

create policy "Admins can delete destinations" 
  on public.destinations for delete using (auth.role() = 'service_role');

-- Indexes
create index if not exists destinations_slug_idx on public.destinations (slug);
