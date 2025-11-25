import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Role Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TOUR_IMAGES: Record<string, string> = {
    'majestic-kashmir-5n6d': 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=2070&auto=format&fit=crop', // Dal Lake
    'ladakh-adventure-6n7d': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2070&auto=format&fit=crop', // Pangong Lake
    'jammu-pilgrimage-3n4d': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop', // Vaishno Devi (Generic Mountain/Temple)
    'winter-wonderland-gulmarg': 'https://images.unsplash.com/photo-1548266652-99cf27701ced?q=80&w=2038&auto=format&fit=crop', // Snow
    'romantic-kashmir-honeymoon': 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop', // Gurez/Green Valley
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2070&auto=format&fit=crop'; // Generic Kashmir

async function addImagesToTours() {
    console.log('Starting image seeding for existing tours...');

    // 1. Fetch all tours
    const { data: tours, error: toursError } = await supabase
        .from('tours')
        .select('id, slug, title');

    if (toursError) {
        console.error('Error fetching tours:', toursError);
        return;
    }

    console.log(`Found ${tours.length} tours.`);

    for (const tour of tours) {
        console.log(`Processing: ${tour.title} (${tour.slug})`);

        // 2. Check if images already exist
        const { count, error: countError } = await supabase
            .from('tour_images')
            .select('*', { count: 'exact', head: true })
            .eq('tour_id', tour.id);

        if (countError) {
            console.error(`  Error checking images for ${tour.slug}:`, countError);
            continue;
        }

        if (count && count > 0) {
            console.log(`  Skipping: Already has ${count} images.`);
            continue;
        }

        // 3. Download and Upload Image
        try {
            const imageUrl = TOUR_IMAGES[tour.slug] || DEFAULT_IMAGE;
            const response = await fetch(imageUrl);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const fileName = `${tour.id}/cover.jpg`;

            // Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('tours')
                .upload(fileName, buffer, {
                    contentType: 'image/jpeg',
                    upsert: true
                });

            if (uploadError) {
                console.error(`  Error uploading image for ${tour.slug}:`, uploadError);
                continue;
            }

            // Link to Tour
            const { error: insertError } = await supabase
                .from('tour_images')
                .insert({
                    tour_id: tour.id,
                    storage_path: fileName,
                    is_featured: true
                });

            if (insertError) {
                console.error(`  Error linking image for ${tour.slug}:`, insertError);
            } else {
                console.log(`  Success: Image added for ${tour.slug}`);
            }

        } catch (err) {
            console.error(`  Failed to process image for ${tour.slug}:`, err);
        }
    }

    console.log('Image seeding complete!');
}

addImagesToTours();
