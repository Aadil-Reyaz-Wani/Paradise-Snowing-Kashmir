-- Seed Destinations Table with Dummy Data
-- Uses Unsplash images (handled by the updated frontend code)

INSERT INTO public.destinations (slug, name, description, image, is_active, sort_order)
VALUES
  (
    'srinagar',
    'Srinagar',
    'The summer capital of Jammu and Kashmir, Srinagar is the heart of the Kashmir Valley. Famous for its historic gardens, waterfronts, and houseboats on Dal Lake and Nigeen Lake. Experience the floating markets, the Mughal Gardens (Nishat, Shalimar), and the spiritual Shankaracharya Temple.',
    'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop',
    true,
    1
  ),
  (
    'gulmarg',
    'Gulmarg',
    'Known as the "Meadow of Flowers", Gulmarg is a premier hill station and skiing destination. It boasts the world''s highest golf course and the famous Gulmarg Gondola, one of the highest cable cars in the world. In winter, it transforms into a winter wonderland perfect for snow sports.',
    'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=2070&auto=format&fit=crop',
    true,
    2
  ),
  (
    'pahalgam',
    'Pahalgam',
    'The "Valley of Shepherds", Pahalgam is situated at the confluence of the streams flowing from the river Lidder and Sheshnag Lake. It is the starting point of the annual Amarnath Yatra. Famous for Betaab Valley, Aru Valley, and its lush green meadows and pine forests.',
    'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop',
    true,
    3
  ),
  (
    'sonamarg',
    'Sonamarg',
    'Translating to "Meadow of Gold", Sonamarg is a mesmerizing hill station located on the banks of the Nallah Sindh. It is a gateway to the Silk Road and connects Kashmir to Ladakh. Famous for the Thajiwas Glacier and as a base for trekking to the high-altitude lakes of Vishansar and Krishansar.',
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
    true,
    4
  ),
  (
    'leh-ladakh',
    'Leh Ladakh',
    'A land like no other with a superabundance of attractions to visit and phantasmagoric and fabulous landscapes, amazing people and culture, Ladakh is truly a heaven on Earth. Visit the Pangong Lake, Nubra Valley, and the ancient monasteries.',
    'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2070&auto=format&fit=crop',
    true,
    5
  ),
  (
    'yusmarg',
    'Yusmarg',
    'An offbeat destination known as the "Meadow of Jesus". Yusmarg offers vast green pastures, pine forests, and the Doodh Ganga river. It is a perfect spot for those looking for tranquility and untouched nature away from the crowds.',
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop',
    true,
    6
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;
