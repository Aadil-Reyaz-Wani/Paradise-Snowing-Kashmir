import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Role Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestTour() {
    console.log('Creating test tour with image...');

    // 1. Define Tour Data
    const tourData = {
        slug: 'test-tour-with-image-' + Date.now(),
        title: 'Beautiful Gurez Valley',
        region: 'Kashmir',
        duration_days: 4,
        base_price: 12000,
        short_description: 'Discover the hidden gem of Kashmir, Gurez Valley.',
        long_description: 'Gurez Valley is one of the most beautiful and least explored regions of Kashmir. Located near the Line of Control, it offers pristine beauty, the Kishanganga river, and the majestic Habba Khatoon peak.',
        highlights: ['Habba Khatoon Peak', 'Kishanganga River', 'Tulail Valley'],
        trip_type: 'Adventure',
        is_active: true,
        itinerary: [
            { day: 1, title: 'Srinagar to Gurez', description: 'Scenic drive through Razdan Pass.' },
            { day: 2, title: 'Explore Dawar', description: 'Visit local villages and the dam.' },
            { day: 3, title: 'Tulail Valley', description: 'Day trip to the remote Tulail valley.' },
            { day: 4, title: 'Return to Srinagar', description: 'Drive back with memories.' }
        ]
    };

    // 2. Insert Tour
    const { data: tour, error: tourError } = await supabase
        .from('tours')
        .insert(tourData)
        .select()
        .single();

    if (tourError) {
        console.error('Error creating tour:', tourError);
        return;
    }
    console.log(`Tour created: ${tour.title} (${tour.id})`);

    // 3. Download and Upload Image
    try {
        const imageUrl = 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop';
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileName = `${tour.id}/gurez-valley.jpg`;

        const { error: uploadError } = await supabase.storage
            .from('tours')
            .upload(fileName, buffer, {
                contentType: 'image/jpeg'
            });

        if (uploadError) {
            console.error('Error uploading image:', uploadError);
            return;
        }
        console.log('Image uploaded to storage.');

        // 4. Link Image to Tour
        const { error: imageError } = await supabase
            .from('tour_images')
            .insert({
                tour_id: tour.id,
                storage_path: fileName,
                is_featured: true
            });

        if (imageError) {
            console.error('Error linking image:', imageError);
            return;
        }
        console.log('Image linked to tour.');

    } catch (error) {
        console.error('Error processing image:', error);
    }

    console.log('Test tour creation complete!');
}

createTestTour();
