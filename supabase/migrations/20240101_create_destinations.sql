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
