export type Tour = {
    id: string;
    slug: string;
    title: string;
    region: 'Kashmir' | 'Ladakh' | 'Jammu';
    duration_days: number;
    base_price: number;
    short_description: string | null;
    long_description: string | null;
    highlights: string[] | null;
    trip_type: string | null;
    itinerary: any[] | null;
    inclusions: string[] | null;
    exclusions: string[] | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    images?: TourImage[];
};

export type TourImage = {
    id: string;
    tour_id: string;
    storage_path: string;
    is_featured: boolean;
    caption: string | null;
    sort_order: number;
};

export type GalleryImage = {
    id: string;
    category: string | null;
    storage_path: string;
    caption: string | null;
    created_at: string;
};

export type Testimonial = {
    id: string;
    name: string;
    location: string | null;
    rating: number | null;
    text: string | null;
    trip_type: string | null;
    trip_date: string | null;
    show_on_homepage: boolean;
    created_at: string;
};

export type Booking = {
    id: string;
    tour_id: string | null;
    user_id: string | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    travellers_adults: number;
    travellers_children: number;
    start_date: string | null;
    total_price: number | null;
    status: 'pending' | 'paid' | 'cancelled' | 'completed';
    payment_order_id: string | null;
    payment_gateway: string | null;
    created_at: string;
    updated_at: string;
    tour?: Tour;
};
