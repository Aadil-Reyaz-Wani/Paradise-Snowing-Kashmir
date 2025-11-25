import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Role Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('Seeding data...');

    // 1. Tours
    const tours = [
        {
            slug: 'majestic-kashmir-5n6d',
            title: 'Majestic Kashmir',
            region: 'Kashmir',
            duration_days: 6,
            base_price: 18500,
            short_description: 'Experience the beauty of Srinagar, Gulmarg, and Pahalgam.',
            long_description: 'A complete 6-day tour covering the best of Kashmir. Visit the Dal Lake, the meadows of Gulmarg, and the valleys of Pahalgam. Enjoy a Shikara ride, stay in a houseboat, and witness the breathtaking landscapes of the valley.',
            highlights: ['Shikara Ride on Dal Lake', 'Gulmarg Gondola Ride', 'Betaab Valley in Pahalgam', 'Mughal Gardens Tour', 'Houseboat Stay'],
            trip_type: 'Family',
            inclusions: ['Accommodation in 3-star hotels/houseboats', 'Breakfast and Dinner', 'All transfers and sightseeing by private cab', 'Shikara Ride for 1 hour', 'Toll taxes and parking charges'],
            exclusions: ['Airfare/Train fare', 'Lunch', 'Gondola tickets', 'Entrance fees to gardens', 'Personal expenses'],
            itinerary: [
                { day: 1, title: 'Arrival in Srinagar', description: 'Pickup from Srinagar airport and transfer to Houseboat. Evening Shikara ride on Dal Lake.' },
                { day: 2, title: 'Srinagar to Gulmarg', description: 'Day trip to Gulmarg (Meadow of Flowers). Enjoy the Gondola ride and snow activities.' },
                { day: 3, title: 'Gulmarg to Pahalgam', description: 'Transfer to Pahalgam (Valley of Shepherds). En route visit Saffron fields and Avantipura ruins.' },
                { day: 4, title: 'Pahalgam Sightseeing', description: 'Visit Aru Valley, Betaab Valley, and Chandanwari. Enjoy the scenic beauty of Lidder River.' },
                { day: 5, title: 'Pahalgam to Srinagar', description: 'Return to Srinagar. Visit Mughal Gardens (Nishat, Shalimar, Cheshma Shahi) and Shankaracharya Temple.' },
                { day: 6, title: 'Departure', description: 'Transfer to Srinagar airport for your onward journey with beautiful memories.' }
            ],
            is_active: true
        },
        {
            slug: 'ladakh-adventure-6n7d',
            title: 'Ladakh Adventure',
            region: 'Ladakh',
            duration_days: 7,
            base_price: 25000,
            short_description: 'Explore Leh, Nubra Valley, and Pangong Lake.',
            long_description: 'An adventurous journey through the high passes of Ladakh. Visit the highest motorable road, the sand dunes of Nubra, and the changing colors of Pangong Tso. Experience the unique culture and monasteries of this high-altitude desert.',
            highlights: ['Khardung La Pass', 'Nubra Valley Sand Dunes', 'Pangong Lake Camping', 'Thiksey Monastery', 'Magnetic Hill'],
            trip_type: 'Adventure',
            inclusions: ['Accommodation in hotels/camps', 'Breakfast and Dinner', 'Inner line permits', 'Oxygen cylinder in vehicle', 'All transfers by Xylo/Innova'],
            exclusions: ['Airfare', 'Lunch', 'Monastery entry fees', 'Camel ride charges', 'Personal expenses'],
            itinerary: [
                { day: 1, title: 'Arrival in Leh', description: 'Arrival at Leh airport. Transfer to hotel. Full day rest for acclimatization.' },
                { day: 2, title: 'Leh Local Sightseeing', description: 'Visit Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib, and Sangam (Confluence of Zanskar & Indus).' },
                { day: 3, title: 'Leh to Nubra Valley', description: 'Drive via Khardung La (Highest Motorable Road). Visit Diskit Monastery and Hunder Sand Dunes.' },
                { day: 4, title: 'Nubra to Pangong Lake', description: 'Drive to Pangong Lake via Shyok River route. Overnight stay at camp near the lake.' },
                { day: 5, title: 'Pangong to Leh', description: 'Witness sunrise at the lake. Return to Leh via Chang La Pass. Visit Thiksey Monastery and Shey Palace en route.' },
                { day: 6, title: 'Leh Leisure Day', description: 'Day at leisure for shopping in Leh market or visiting Shanti Stupa and Leh Palace.' },
                { day: 7, title: 'Departure', description: 'Transfer to Leh airport.' }
            ],
            is_active: true
        },
        {
            slug: 'vaishno-devi-jammu-3n4d',
            title: 'Divine Vaishno Devi',
            region: 'Jammu',
            duration_days: 4,
            base_price: 8500,
            short_description: 'Spiritual journey to Mata Vaishno Devi Shrine.',
            long_description: 'A spiritual pilgrimage to the holy shrine of Mata Vaishno Devi in Katra. Seek blessings and experience the divine atmosphere. Also includes a visit to Patnitop.',
            highlights: ['Vaishno Devi Darshan', 'Patnitop Sightseeing', 'Nathatop'],
            trip_type: 'Family',
            inclusions: ['Accommodation in Katra/Patnitop', 'Breakfast and Dinner', 'Transfers by private cab', 'Yatra slip assistance'],
            exclusions: ['Airfare/Train fare', 'Lunch', 'Pony/Palki charges', 'Helicopter tickets', 'Personal expenses'],
            itinerary: [
                { day: 1, title: 'Arrival in Jammu - Katra', description: 'Pickup from Jammu Railway Station/Airport. Transfer to Katra. Check-in at hotel.' },
                { day: 2, title: 'Vaishno Devi Darshan', description: 'Proceed for trek to Mata Vaishno Devi Shrine. Return to Katra by late evening.' },
                { day: 3, title: 'Katra to Patnitop', description: 'Drive to Patnitop. Visit Nathatop and Sanasar Lake. Enjoy the pleasant weather.' },
                { day: 4, title: 'Departure', description: 'Transfer to Jammu Railway Station/Airport.' }
            ],
            is_active: true
        },
        {
            slug: 'winter-wonderland-gulmarg-4n5d',
            title: 'Winter Wonderland Gulmarg',
            region: 'Kashmir',
            duration_days: 5,
            base_price: 22000,
            short_description: 'Skiing and snow activities in Gulmarg.',
            long_description: 'Experience the magic of winter in Kashmir. Stay in the ski resort of Gulmarg, learn skiing, ride the Gondola, and enjoy the snow-covered landscapes.',
            highlights: ['Skiing in Gulmarg', 'Gondola Phase 1 & 2', 'Snow Bike Ride', 'Igloo Cafe Visit'],
            trip_type: 'Adventure',
            inclusions: ['Accommodation in Gulmarg & Srinagar', 'Breakfast and Dinner', 'Snow chains for vehicle', 'Heating in rooms'],
            exclusions: ['Airfare', 'Lunch', 'Skiing equipment rental', 'Instructor charges', 'Gondola tickets'],
            itinerary: [
                { day: 1, title: 'Arrival in Srinagar', description: 'Pickup and transfer to Srinagar hotel. Evening walk on Boulevard road.' },
                { day: 2, title: 'Srinagar to Gulmarg', description: 'Drive to Gulmarg. Check-in at resort. Enjoy snow activities.' },
                { day: 3, title: 'Gulmarg Skiing', description: 'Full day for skiing or Gondola ride to Apharwat Peak.' },
                { day: 4, title: 'Gulmarg to Srinagar', description: 'Return to Srinagar. Shopping for handicrafts and dry fruits.' },
                { day: 5, title: 'Departure', description: 'Transfer to airport.' }
            ],
            is_active: true
        },
        {
            slug: 'honeymoon-special-kashmir-6n7d',
            title: 'Romantic Kashmir Honeymoon',
            region: 'Kashmir',
            duration_days: 7,
            base_price: 35000,
            short_description: 'Romantic getaway for couples.',
            long_description: 'A specially curated honeymoon package. Candlelight dinner, flower bed decoration, cake, and private Shikara ride included. Visit the most romantic spots in Kashmir.',
            highlights: ['Candlelight Dinner', 'Flower Bed Decoration', 'Private Shikara Ride', 'Couple Photography Session'],
            trip_type: 'Honeymoon',
            inclusions: ['Premium Accommodation', 'Breakfast and Dinner', 'Honeymoon inclusions (Cake, Flower decoration, Milk)', 'Private cab'],
            exclusions: ['Airfare', 'Lunch', 'Personal expenses', 'Tips'],
            itinerary: [
                { day: 1, title: 'Arrival - Romantic Welcome', description: 'Welcome drink on arrival. Houseboat stay with flower decoration.' },
                { day: 2, title: 'Srinagar to Pahalgam', description: 'Romantic drive to Pahalgam. Riverside walk.' },
                { day: 3, title: 'Pahalgam Leisure', description: 'Day at leisure in Pahalgam. Optional pony ride to Baisaran.' },
                { day: 4, title: 'Pahalgam to Gulmarg', description: 'Drive to Gulmarg. Check-in at luxury resort.' },
                { day: 5, title: 'Gulmarg Romance', description: 'Enjoy the snow and views together. Gondola ride.' },
                { day: 6, title: 'Gulmarg to Srinagar', description: 'Return to Srinagar. Candlelight dinner in the evening.' },
                { day: 7, title: 'Departure', description: 'Transfer to airport with sweet memories.' }
            ],
            is_active: true
        }
    ];

    const { error: toursError } = await supabase.from('tours').upsert(tours, { onConflict: 'slug' });
    if (toursError) console.error('Error seeding tours:', toursError);
    else console.log('Tours seeded.');

    // 2. Testimonials
    const testimonials = [
        {
            name: 'Rahul Sharma',
            location: 'Mumbai',
            rating: 5,
            text: 'Amazing experience! The arrangements were top notch. Aadil bhai took great care of us.',
            trip_type: 'Family',
            show_on_homepage: true
        },
        {
            name: 'Sarah Jenkins',
            location: 'UK',
            rating: 5,
            text: 'Kashmir is truly paradise. Thanks for the wonderful hospitality and safe travel arrangements.',
            trip_type: 'Adventure',
            show_on_homepage: true
        },
        {
            name: 'Amit & Priya',
            location: 'Delhi',
            rating: 5,
            text: 'Best honeymoon trip ever! The houseboat stay was magical. Highly recommended.',
            trip_type: 'Honeymoon',
            show_on_homepage: true
        },
        {
            name: 'David Lee',
            location: 'Singapore',
            rating: 4,
            text: 'Great trekking experience in Ladakh. The guides were very professional.',
            trip_type: 'Adventure',
            show_on_homepage: true
        }
    ];

    const { error: testimonialsError } = await supabase.from('testimonials').insert(testimonials);
    if (testimonialsError) console.error('Error seeding testimonials:', testimonialsError);
    else console.log('Testimonials seeded.');

    // 3. Gallery Images (Placeholders)
    // Note: In a real scenario, we would upload files. Here we use placeholder URLs or assume files exist.
    // Since our app handles full URLs in storage_path, we can use external placeholder images.
    const galleryImages = [
        {
            storage_path: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=2070&auto=format&fit=crop',
            caption: 'Dal Lake at Sunset',
            category: 'Kashmir'
        },
        {
            storage_path: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
            caption: 'Gulmarg Ski Resort',
            category: 'Winter'
        },
        {
            storage_path: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2070&auto=format&fit=crop',
            caption: 'Pangong Tso Lake',
            category: 'Ladakh'
        },
        {
            storage_path: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop',
            caption: 'Shikara Ride',
            category: 'Kashmir'
        },
        {
            storage_path: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2070&auto=format&fit=crop',
            caption: 'Nubra Valley Camels',
            category: 'Ladakh'
        },
        {
            storage_path: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=2070&auto=format&fit=crop',
            caption: 'Tulip Garden',
            category: 'Kashmir'
        }
    ];

    const { error: galleryError } = await supabase.from('gallery_images').insert(galleryImages);
    if (galleryError) console.error('Error seeding gallery:', galleryError);
    else console.log('Gallery seeded.');

    console.log('Seeding complete.');
}

seed();
