-- Create Contacts Table
create table if not exists public.contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  status text default 'new', -- 'new', 'read', 'replied'
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.contacts enable row level security;

-- Policies
-- Public can insert (submit form)
create policy "Anyone can submit contact form" on public.contacts for insert with check (true);

-- Admins can view all
create policy "Admins can view contacts" on public.contacts for select using (auth.role() = 'service_role' or auth.role() = 'authenticated');

-- Admins can update status
create policy "Admins can update contacts" on public.contacts for update using (auth.role() = 'service_role' or auth.role() = 'authenticated');
