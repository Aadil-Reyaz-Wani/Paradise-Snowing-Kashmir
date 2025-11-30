-- Create newsletter_subscribers table
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  status text default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table newsletter_subscribers enable row level security;

-- Policies
-- Allow anyone to insert (subscribe)
create policy "Anyone can subscribe"
  on newsletter_subscribers for insert
  with check (true);

-- Allow admins to view all subscribers
create policy "Admins can view subscribers"
  on newsletter_subscribers for select
  using (auth.role() = 'authenticated');

-- Allow admins to update status
create policy "Admins can update subscribers"
  on newsletter_subscribers for update
  using (auth.role() = 'authenticated');

-- Allow admins to delete subscribers
create policy "Admins can delete subscribers"
  on newsletter_subscribers for delete
  using (auth.role() = 'authenticated');
