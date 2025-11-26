-- Indexes for Tours
CREATE INDEX IF NOT EXISTS idx_tours_is_active ON public.tours(is_active);
CREATE INDEX IF NOT EXISTS idx_tours_base_price ON public.tours(base_price);
CREATE INDEX IF NOT EXISTS idx_tours_slug ON public.tours(slug);

-- Indexes for Tour Images
CREATE INDEX IF NOT EXISTS idx_tour_images_tour_id ON public.tour_images(tour_id);

-- Indexes for Testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_homepage ON public.testimonials(show_on_homepage);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at);

-- Indexes for Gallery
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON public.gallery_images(created_at);

-- Indexes for Bookings
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at);
