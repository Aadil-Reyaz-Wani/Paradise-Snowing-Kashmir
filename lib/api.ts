import { createClient } from '@/lib/supabase/server';
import { Tour, Testimonial, GalleryImage } from '@/lib/types';

export async function getFeaturedTours(): Promise<Tour[]> {
    const supabase = await createClient();
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
}

export async function getAllTours(): Promise<Tour[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('tours')
        .select('*, images:tour_images(*)')
        .eq('is_active', true)
        .order('base_price', { ascending: true });

    if (error) {
        console.error('Error fetching tours:', error);
        return [];
    }

    return data as Tour[];
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
    const supabase = await createClient();
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
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('show_on_homepage', true)
        .order('created_at', { ascending: false })
        .limit(6);

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }

    return data as Testimonial[];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery images:', error);
        return [];
    }

    return data as GalleryImage[];
}
