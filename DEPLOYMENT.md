# Deployment Instructions

## 1. Environment Variables

Ensure the following environment variables are set in your Vercel project settings:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 2. Database Setup

1.  Go to your Supabase Dashboard -> SQL Editor.
2.  Run the contents of `supabase/schema.sql`.
3.  (Optional) Run the seed script locally if you haven't already: `npx tsx scripts/seed.ts`.

## 3. Storage Setup

Ensure you have two public buckets created in Supabase Storage:
- `tours`
- `gallery`

The `schema.sql` file attempts to create these, but you can verify in the Storage section of Supabase dashboard.

## 4. Deploy to Vercel

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the environment variables listed above.
4.  Deploy!

## 5. Admin Access

To create your first admin user:
1.  Go to Supabase Dashboard -> Authentication -> Users.
2.  Add a new user (email/password).
3.  (Optional) If you implemented role-based checks strictly, you might need to manually set a `role` claim or add the user to a `users` table with role 'admin'.
    *   *Note: The current implementation checks for authenticated user in `/admin` middleware. For stricter security, ensure you only share admin credentials with trusted staff.*

## 6. Payment Testing

1.  Use Razorpay Test Mode keys.
2.  Use the test card details provided by Razorpay documentation to simulate successful/failed payments.
