import { createPublicClient } from '@/lib/supabase/public';
import { Tour, Testimonial, GalleryImage } from '@/lib/types';
import { unstable_cache } from 'next/cache';

export const getFeaturedTours = unstable_cache(
    async (): Promise<Tour[]> => {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('tours')
            .select('*, images:tour_images(*)')
            .eq('is_active', true)
            .limit(6);

        if (error) {
            console.error('Error fetching featured tours:', error);
            return [];
        }

        return data as Tour[];
    },
    ['featured-tours'],
    { revalidate: 3600, tags: ['tours'] }
);

export const getAllTours = unstable_cache(
    async (): Promise<Tour[]> => {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('tours')
            .select('*, images:tour_images(*)')
            .eq('is_active', true)
            .order('base_price', { ascending: true });

        if (error) {
            console.error('Error fetching tours:', error);
            throw new Error(error.message);
        }

        return data as Tour[];
    },
    ['all-tours'],
    { revalidate: 3600, tags: ['tours'] }
);

export const getTourBySlug = unstable_cache(
    async (slug: string): Promise<Tour | null> => {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('tours')
            .select('*, images:tour_images(*)')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error(`Error fetching tour with slug ${slug}:`, error);
            return null;
        }

        return data as Tour;
    },
    ['tour-by-slug'],
    { revalidate: 3600, tags: ['tours'] }
);

export const getTestimonials = unstable_cache(
    async (): Promise<Testimonial[]> => {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('testimonials')
            .select('id, name, location, rating, text, trip_type, created_at')
            .eq('show_on_homepage', true)
            .order('created_at', { ascending: false })
            .limit(6);

        if (error) {
            console.error('Error fetching testimonials:', error);
            return [];
        }

        return data as Testimonial[];
    },
    ['testimonials'],
    { revalidate: 3600, tags: ['testimonials'] }
);

export const getGalleryImages = unstable_cache(
    async (): Promise<GalleryImage[]> => {
        const supabase = createPublicClient();
        const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching gallery images:', error);
            throw new Error(error.message);
        }

        return data as GalleryImage[];
    },
    ['gallery-images'],
    { revalidate: 3600, tags: ['gallery'] }
);
