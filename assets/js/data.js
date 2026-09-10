/* =========================================================
   Immaculate Connections Travel Agency — site data (v2)
   ---------------------------------------------------------
   Packages, inclusions, places, prices, travel dates and
   itineraries are transcribed from the agency's website and
   its itinerary posters (immaculateconnectionsph.com). Photos
   are served from the agency's own Wix media library.
   Location guides (placeInfo) are short general descriptions.
   ========================================================= */

window.IC = window.IC || {};

(function (IC) {
  const MEDIA = 'https://static.wixstatic.com/media/';
  /** Wix image, optionally resized/cropped: wix(id, width, height, align) */
  const wix = (id, w, h, al) => (w ? `${MEDIA}${id}/v1/fill/w_${w},h_${h},al_${al || 'c'},q_80,enc_auto/${id}` : `${MEDIA}${id}`);
  IC.wix = wix;

  IC.media = {
    logo: `${MEDIA}952787_6dd07347e2b24fab89e9fdcee6240889~mv2.png`,
    mark: `${MEDIA}952787_ab1a9837b67f48ff85499555bb28ceba~mv2.png`,
    heroHome: '952787_7d63895b8b894bb0b1dbd482101a18d0~mv2.jpg',
    heroTours: '952787_1d076b1fc8f14f5ab72956eff2c0433e~mv2.jpg',
    heroAbout: '05e3dc_e099f1ceb25b41908ca3d6ba88d7bcb8.jpg',
    heroInquiries: '05e3dc_43e817747d44442dbf761e2ae66dd8e4.jpg',
    // These are 512x512 PNGs shown at 26-58px, so serve a 120px WebP.
    icons: {
      ticketing: wix('952787_27ef97fc9ab247f9ac0396528bcb722b~mv2.png', 120, 120),
      hotel: wix('952787_a0ed48c8d5dd4e2f819407b391d6499c~mv2.png', 120, 120),
      transport: wix('952787_3fd41e325bc9449296516cd2e286d93f~mv2.png', 120, 120),
      tours: wix('952787_3d324467583f4cb8a092438d1e6a6872~mv2.png', 120, 120),
      mice: wix('952787_930a6679ab89472ea4b37d34205490f7~mv2.png', 120, 120)
    }
  };

  IC.regions = {
    cebu:    { label: 'Cebu', blurb: 'Day tours around the Queen City of the South and its highlands.' },
    bohol:   { label: 'Bohol & Camotes', blurb: 'Island escapes a short boat ride from Cebu.' },
    visayas: { label: 'Boracay, Palawan & Siargao', blurb: 'The Philippines’ most famous beaches and islands.' },
    intl:    { label: 'International', blurb: 'Vietnam, China and Japan with our partner airlines and operators.' }
  };

  IC.statusLabel = { available: 'Available now', offer: 'Special offer', soon: 'Coming soon', request: 'Details on request', past: 'Departed' };

  /* ---------- Location guides (general information) ---------- */
  IC.placeInfo = {
    // Bohol
    'Blood Compact Shrine': 'Monument in Tagbilaran marking the 1565 Sandugo, the blood compact between Datu Sikatuna and Spanish explorer Miguel López de Legazpi, one of the first treaties of friendship between Filipinos and Spaniards.',
    'Baclayon Church': 'One of the oldest coral-stone churches in the Philippines, completed in 1727 by Jesuit missionaries, with a museum of religious relics beside it.',
    'Bilar Man-Made Forest': 'A two-kilometre stretch of densely planted mahogany trees along the Loay–Carmen road, a favourite photo stop for its cool, shaded canopy.',
    'Chocolate Hills': 'More than 1,200 grass-covered limestone mounds spread across central Bohol; they turn chocolate brown in the dry season and are viewed from the Carmen complex.',
    'Loboc River': 'A jade-green river where floating restaurants cruise upstream to Busay Falls while guests enjoy a buffet lunch and live serenades.',
    'Aproniana Souvenir Shop': 'Bohol’s well-known pasalubong stop for peanut kisses, calamay, ube and other local delicacies and handicrafts.',
    // Camotes
    'Mangodlong Beach': 'A rock-framed beach on San Francisco, Camotes, known for its resort, natural pools and sunset views.',
    'Santiago Beach': 'A long stretch of powdery white sand in San Francisco that widens dramatically at low tide.',
    'Amazing Cave': 'A cave in Poro with a cool natural pool where visitors can swim beneath rock formations.',
    'Paraiso Cave': 'A cave in Tudela with crystal-clear spring water pooled inside a sunlit cavern.',
    'Heaven Cave': 'A small limestone cave in Poro with a natural pool and stalactite ceiling.',
    'Lake Danao': 'The largest lake in Cebu province, a figure-eight shaped freshwater lake in San Francisco with an eco-park, kayaks and island views.',
    'Timubo Cave': 'An underground cave in Sonog, San Francisco, with a refreshing swimming pool inside lit by a shaft of daylight.',
    'Tulang Diot': 'A small islet off San Francisco with white sand and clear waters, reached by a short pump-boat ride.',
    'Buho Rock': 'A coastal rock formation in Poro with stairs, viewing decks and a popular cliff-jumping spot.',
    'Bukilat Cave': 'A sea cave in Tudela with a saltwater pool and openings that let sunlight stream through the ceiling.',
    'Villahermosa Mangroves': 'A mangrove conservation area in Tudela with a boardwalk through the forest to the sea.',
    'Kaompang Tree': 'A centuries-old heritage tree in Tudela, a local landmark and shaded picnic spot.',
    'Busay Falls': 'A multi-tiered waterfall in Tudela surrounded by greenery, ideal for a cooling dip.',
    'Katunggan Nature Trip': 'A guided walk through Camotes’ protected mangrove forest, included with entrance fees.',
    // Cebu
    'Temple of Leah': 'A Roman-inspired hilltop temple in Busay built in 2012 as a tribute to Leah Albino-Adarna, with sweeping views of Cebu City.',
    'Little Kyoto': 'A Japanese-themed garden in Cebu’s highlands with torii gates, lanterns and kimono photo spots.',
    'Seoul Sierra': 'A Korean-themed attraction in Busay with hanbok rentals and Seoul-inspired backdrops.',
    'Sirao Garden': 'Cebu’s “Little Amsterdam”, a flower farm famous for its bright celosia blooms and photo installations.',
    'Magellan’s Cross': 'A chapel housing the cross planted by Ferdinand Magellan’s expedition in 1521 when the first Filipinos were baptised.',
    'Basilica Minore del Sto. Niño': 'The oldest Roman Catholic church in the Philippines, founded in 1565, home to the revered image of the Santo Niño de Cebu.',
    'Fort San Pedro': 'A triangular Spanish bastion fort begun in 1565, the smallest and oldest in the country, now a museum and park by the pier.',
    'Cebu Heritage Monument': 'A sculptural tableau in Parian by Eduardo Castrillo depicting key events in Cebu’s history.',
    'Casa Gorordo & Yap-Sandiego Museum': 'Two of Cebu’s finest ancestral homes: the 19th-century Casa Gorordo and the 17th-century Yap-Sandiego house, among the oldest in the Philippines.',
    'Casa Gorordo Museum': 'A 19th-century bahay na bato that was home to Cebu’s first Filipino bishop, restored as a lifestyle museum.',
    'Taoist Temple': 'A Chinese temple in Beverly Hills, Cebu City, built in 1972 with dragon gates and views over the city.',
    'Alegre Guitar Factory': 'A family-run workshop in Lapu-Lapu City, Mactan, famous for handcrafted guitars and ukuleles.',
    // Visayas & Palawan
    'Siargao Island': 'The surfing capital of the Philippines in Surigao del Norte, known for Cloud 9, island hopping and lagoons.',
    'Boracay Island': 'A small island in Aklan famous for White Beach, sunsets and water sports.',
    'El Nido, Palawan': 'A municipality of limestone cliffs, hidden lagoons and island-hopping tours at the northern tip of Palawan.',
    'Coron, Palawan': 'A town on Busuanga Island known for Kayangan Lake, Twin Lagoon and Japanese shipwreck dives.',
    // Hong Kong
    'Hong Kong': 'A Special Administrative Region of China with Victoria Harbour, the Peak, Disneyland, Ocean Park and world-class shopping and dining.',
    // Vietnam — Da Nang
    'Da Nang': 'Central Vietnam’s coastal city, gateway to Ba Na Hills, Hoi An and the Hai Van Pass, with long beaches and the famous Dragon Bridge.',
    'Son Tra Peninsula': 'A forested peninsula north of Da Nang with mountain roads, sea views and the Linh Ung Pagoda.',
    'Lady Buddha (Linh Ung Pagoda)': 'The 67-metre Lady Buddha statue at Linh Ung Pagoda, the tallest Buddha statue in Vietnam, overlooking the sea.',
    'Coconut Boat Ride': 'A ride in a round bamboo basket boat through the water-coconut palms of Cam Thanh village near Hoi An.',
    'Hoi An Ancient Town': 'A UNESCO World Heritage trading port with lantern-lit streets, the Japanese Covered Bridge and riverside cafés.',
    'Ba Na Hills': 'A mountaintop resort reached by a record-setting cable car, with the French Village, Fantasy Park and cool alpine air.',
    'Golden Bridge': 'The 150-metre pedestrian bridge at Ba Na Hills held aloft by two giant stone hands.',
    'French Village & Fantasy Park': 'Ba Na Hills’ replica French town and its indoor amusement park.',
    'Da Nang Cathedral (Pink Church)': 'A pink Gothic-style cathedral built in 1923, one of Da Nang’s most photographed landmarks.',
    'APEC Park': 'A riverside sculpture park created for the 2017 APEC summit, with artworks from member economies.',
    'Cham Museum': 'The Museum of Cham Sculpture, holding the world’s largest collection of Cham artefacts.',
    'Dragon Bridge': 'Da Nang’s 666-metre dragon-shaped bridge over the Han River that breathes fire and water on weekend nights.',
    'Lovers Bridge': 'The Love Lock Bridge on the Han River, lit with red heart-shaped lanterns.',
    'Hai Van Pass': 'A 21-kilometre mountain pass between Da Nang and Hue with sweeping coastal views.',
    'Lang Co Beach': 'A crescent-shaped bay of white sand and turquoise water at the foot of the Hai Van Pass.',
    // Vietnam — Hanoi, Sapa, Ha Long
    'Hanoi': 'Vietnam’s thousand-year-old capital, with the Old Quarter’s 36 Streets, Hoan Kiem Lake and French colonial boulevards.',
    'Hoan Kiem Lake & 36 Streets': 'The heart of Hanoi: a lake with the Turtle Tower beside the Old Quarter’s craft streets.',
    'Ba Dinh Square': 'Hanoi’s historic square where independence was declared in 1945, beside the Ho Chi Minh Mausoleum.',
    'Hanoi Train Street': 'A narrow residential lane where trains pass within an arm’s length of cafés.',
    'Sapa': 'A hill town in the Hoang Lien Son mountains famous for terraced rice fields and ethnic minority markets.',
    'Sa Pa Tourist Street, Church & Love Square': 'Sapa’s town centre: the stone church built in 1895, the pedestrian street and the lively square.',
    'Muong Hoa Mountain Train': 'The longest mountain railway in Vietnam, linking Sapa town to the Fansipan cable car station.',
    'Fansipan Legend Cable Car': 'A record-holding cable car climbing to the roof of Indochina.',
    'Fansipan Peak': 'At 3,143 metres, the highest peak in Indochina, with pagodas and a giant Buddha near the summit.',
    'MOANA Coffee Shop': 'Sapa’s famous café with a Bali-inspired photo terrace facing the mountains.',
    'Ha Long Bay': 'A UNESCO World Heritage seascape of nearly 2,000 limestone islands and islets in emerald water.',
    'Ambrose Cruise': 'A day cruise through Ha Long Bay with buffet lunch, karaoke and afternoon tea on board.',
    'Stalactite Cave': 'One of Ha Long Bay’s dramatic limestone caves, hung with stalactites.',
    'Tip Top Island': 'A small island in Ha Long Bay with a beach and a lookout over the karsts.',
    'Fighting Cock Island': 'Ha Long Bay’s emblematic pair of rocks shaped like two roosters facing each other.',
    'Hanoi World': 'A themed entertainment complex in Hanoi with European-style canals and streets (gondola ride not included).',
    // China
    'Shanghai': 'China’s largest city, where the 1920s banks of the Bund face the futuristic Lujiazui skyline across the Huangpu River.',
    'The Bund & Lujiazui Skyline': 'Shanghai’s riverside promenade opposite the Oriental Pearl Tower and the 632-metre Shanghai Tower, best seen lit up at night.',
    'Mini Kyoto Street': 'A Japanese-style, lantern-lit shopping street in Shanghai that has become a popular photo spot, nicknamed “Mini Kyoto”.',
    'Kunming': 'Yunnan’s capital, the “Spring City”, known for its mild climate, Green Lake, Yuantong Temple and the Stone Forest nearby.',
    'Chuxiong': 'A Yi-minority prefecture between Kunming and Dali with ancient towns, torch-festival culture and mountain scenery.',
    'Dali': 'A walled old town on the shore of Erhai Lake beneath the Cangshan mountains, home of the Bai people and the Three Pagodas.',
    'Lijiang': 'A UNESCO World Heritage old town of canals and cobbled lanes below the Jade Dragon Snow Mountain.',
    'Shangri-La': 'A Tibetan plateau town at about 3,300 metres with the Songzanlin Monastery, alpine meadows and snow-capped peaks.',
    // Japan
    'Tokyo': 'Japan’s capital: Shibuya Crossing, Shinjuku, Asakusa’s Senso-ji temple, Tsukiji food stalls and world-class shopping.',
    'Yokohama': 'Japan’s second city on Tokyo Bay, with the Minato Mirai waterfront, Cosmo World, Chinatown and the Red Brick Warehouse.',
    'Mt. Fuji': 'Japan’s highest peak at 3,776 metres, viewed from the Fuji Five Lakes, Arakurayama Sengen Park and the 5th Station (weather permitting).'
  };

  const INC_CEBU = ['Air-conditioned van', 'Licensed tour guide', 'Entrance fees', 'Mineral water', 'Mini pasalubong pack'];
  const INC_CAMOTES = ['Two-way boat ticket', 'Katunggan nature trip (entrance fees included)', 'Hotel accommodation', 'Air-conditioned transportation', 'Tour guide', 'Meals'];
  const EXC_DANANG = ['Visa (if applicable)', 'Terminal fees', 'Personal expenses', 'Driver & guide tips', 'Single supplement', 'Other optional activities'];

  IC.tours = [
    /* ---------------- International: from the itinerary posters ---------------- */
    {
      id: 'danang-6d4n',
      name: 'Da Nang Charter Flight 6D4N Tour',
      subtitle: 'Out Manila · Special offer',
      region: 'intl', country: 'Vietnam', flag: 'vn', duration: '6 days 4 nights', days: 6, status: 'offer', badge: 'Special offer', featured: true,
      departure: 'Manila (NAIA)', price: { from: 23888, label: 'Starts at', unit: 'per pax' }, year: 2026, ends: '2026-12-31',
      image: '952787_0db097d807b14f5b882dbfd77aa54bce~mv2.png', imageAlign: 't',
      alt: 'Da Nang charter flight 6D4N tour poster: Ba Na Hills and the Golden Bridge',
      gallery: ['952787_0db097d807b14f5b882dbfd77aa54bce~mv2.png', '952787_8b207104bf0d43e5aa4c288936e9fec3~mv2.png'],
      summary: 'Roundtrip charter flight from Manila, four nights in Da Nang, Ba Na Hills, Hoi An, the Dragon Bridge and the Hai Van Pass, all guided in English.',
      overview: 'Da Nang is central Vietnam’s beach city and the gateway to three UNESCO-listed neighbours. This six-day charter programme covers the Son Tra Peninsula and Lady Buddha, the lantern-lit streets of Hoi An, a full day at Ba Na Hills with its record-setting cable car and Golden Bridge, the Pink Church, APEC Park, the Cham Museum and the fire-breathing Dragon Bridge, then a scenic drive over the Hai Van Pass to Lang Co Beach before the flight home.',
      travelDates: [
        { d: 'Aug 2–6' }, { d: 'Aug 7–11' }, { d: 'Aug 9–13' }, { d: 'Aug 14–18' }, { d: 'Aug 16–20' }, { d: 'Aug 21–25', add: 3000 }, { d: 'Aug 23–27' }, { d: 'Aug 28–Sep 1', add: 3000 },
        { d: 'Aug 30–Sep 3' }, { d: 'Sep 4–8' }, { d: 'Sep 6–10' }, { d: 'Sep 11–15' }, { d: 'Sep 13–17' }, { d: 'Sep 18–22' }, { d: 'Sep 20–24' }, { d: 'Sep 25–29' }, { d: 'Sep 27–Oct 1' },
        { d: 'Oct 2–6' }, { d: 'Oct 4–8' }, { d: 'Oct 9–13' }, { d: 'Oct 11–15' }, { d: 'Oct 16–20' }, { d: 'Oct 18–22' }, { d: 'Oct 23–27' }, { d: 'Oct 25–29' }, { d: 'Oct 30–Nov 3', add: 8000 },
        { d: 'Nov 1–5', add: 5000 }, { d: 'Nov 6–10' }, { d: 'Nov 8–12' }, { d: 'Nov 13–17' }, { d: 'Nov 15–19' }, { d: 'Nov 20–24' }, { d: 'Nov 22–26' }, { d: 'Nov 27–Dec 1', add: 3000 }, { d: 'Nov 29–Dec 3', add: 3000 },
        { d: 'Dec 4–8', add: 5000 }, { d: 'Dec 6–10' }, { d: 'Dec 11–15' }, { d: 'Dec 13–17' }, { d: 'Dec 18–22' }, { d: 'Dec 20–24', add: 5000 }, { d: 'Dec 25–29', add: 8000 }, { d: 'Dec 27–31', add: 8000 }
      ],
      travelDatesNote: 'Travel dates 2026. Surcharges shown apply per pax on peak dates.',
      itinerary: [
        { day: 'Day 1', title: 'Arrival in Da Nang', items: ['Airport pick-up and transfer to hotel', 'Visit Son Tra Peninsula', 'Visit Lady Buddha, the tallest Buddha statue in Vietnam', 'Experience the coconut boat ride', 'Explore Hoi An Ancient Town, a UNESCO World Heritage Site', 'Check in at the hotel and rest'] },
        { day: 'Day 2', title: 'Ba Na Hills', items: ['Breakfast at hotel', 'Transfer to Ba Na Hills', 'Enjoy the world-record cable car ride', 'Walk on the stunning Golden Bridge', 'Explore French Village & Fantasy Park', 'Visit mini market', 'Return to hotel and rest'] },
        { day: 'Day 3', title: 'City tour', items: ['Breakfast at hotel', 'Visit Da Nang Cathedral (Pink Church)', 'Visit APEC Park', 'Visit jewelry shop', 'Visit latex shop', 'Return to hotel and rest'] },
        { day: 'Day 4', title: 'Da Nang highlights', items: ['Breakfast at hotel', 'Visit Cham Museum', 'See the iconic Dragon Bridge', 'Visit Lovers Bridge', 'Visit silk shop', 'Return to hotel and rest'] },
        { day: 'Day 5', title: 'Hai Van Pass', items: ['Breakfast at hotel', 'Scenic drive through Hai Van Pass', 'Visit Lang Co Beach', 'Enjoy coastal scenic stops', 'Free time for relaxation or exploration', 'Return to hotel and rest'] },
        { day: 'Day 6', title: 'Return flight to Manila', items: ['Breakfast at hotel', 'Check-out and transfer to airport', 'Flight back to Manila', 'End of tour. Thank you and see you again!'] }
      ],
      inclusions: ['Roundtrip charter flight Manila – Da Nang – Manila', '20 kg checked baggage per pax', '7 kg hand carry per pax', '4 nights hotel accommodation', 'Daily breakfast', 'Meals as specified in itinerary', 'Sightseeing tours as specified', 'Entrance fees as per itinerary', 'English-speaking tour guide', 'Airport transfers', 'Travel insurance'],
      exclusions: EXC_DANANG,
      places: ['Da Nang', 'Son Tra Peninsula', 'Lady Buddha (Linh Ung Pagoda)', 'Coconut Boat Ride', 'Hoi An Ancient Town', 'Ba Na Hills', 'Golden Bridge', 'French Village & Fantasy Park', 'Da Nang Cathedral (Pink Church)', 'APEC Park', 'Cham Museum', 'Dragon Bridge', 'Lovers Bridge', 'Hai Van Pass', 'Lang Co Beach'],
      posters: ['952787_0db097d807b14f5b882dbfd77aa54bce~mv2.png', '952787_8b207104bf0d43e5aa4c288936e9fec3~mv2.png']
    },
    {
      id: 'danang-5d3n',
      name: 'Da Nang Charter Flight 5D3N Tour',
      subtitle: 'Out Manila · Special offer',
      region: 'intl', country: 'Vietnam', flag: 'vn', duration: '5 days 3 nights', days: 5, status: 'offer', badge: 'Special offer', featured: true,
      departure: 'Manila (NAIA)', price: { from: 21888, label: 'Starts at', unit: 'per pax' }, year: 2026, ends: '2026-12-26',
      image: '952787_3194edd0c0244a54bafb5f0a2625919a~mv2.png', imageAlign: 't',
      alt: 'Da Nang charter flight 5D3N tour poster',
      gallery: ['952787_3194edd0c0244a54bafb5f0a2625919a~mv2.png', '952787_8b207104bf0d43e5aa4c288936e9fec3~mv2.png'],
      summary: 'The shorter Da Nang charter: roundtrip flight from Manila, three nights at Sea Garden Hotel or a similar local 4-star, Ba Na Hills and the city highlights.',
      overview: 'A long-weekend version of our Da Nang programme. Fly direct from Manila on the charter flight, stay three nights at Sea Garden Hotel or a similar local 4-star property, and cover the essentials: Ba Na Hills and the Golden Bridge, the Pink Church and APEC Park, the Dragon Bridge and Hoi An Ancient Town. All flights include an in-flight meal, and each flight offers six business-class seats.',
      travelDates: [
        { d: 'Aug 5–8' }, { d: 'Aug 12–15' }, { d: 'Aug 19–22', add: 3000 }, { d: 'Aug 26–29', add: 3000 },
        { d: 'Sep 2–5' }, { d: 'Sep 9–12' }, { d: 'Sep 16–19' }, { d: 'Sep 23–26' }, { d: 'Sep 30–Oct 3' },
        { d: 'Oct 7–10' }, { d: 'Oct 14–17' }, { d: 'Oct 21–24' }, { d: 'Oct 28–31', add: 5000 },
        { d: 'Nov 4–7', add: 3000 }, { d: 'Nov 11–14' }, { d: 'Nov 18–21' }, { d: 'Nov 25–28', add: 5000 },
        { d: 'Dec 2–5', add: 3000 }, { d: 'Dec 9–12' }, { d: 'Dec 16–19' }, { d: 'Dec 23–26', add: 8000 }
      ],
      travelDatesNote: 'Travel dates 2026. Surcharges shown apply per pax on peak dates.',
      itinerary: [
        { day: 'Day 1', title: 'Manila to Da Nang', items: ['Charter flight Manila – Da Nang with in-flight meal', 'Airport pick-up and transfer to Sea Garden Hotel or similar', 'Check in and rest'] },
        { day: 'Days 2–4', title: 'Da Nang tour days', items: ['Daily hotel breakfast', 'Ba Na Hills, the world-record cable car and the Golden Bridge', 'Da Nang city highlights: Pink Church, APEC Park, Dragon Bridge and Lovers Bridge', 'Hoi An Ancient Town', 'Meals as specified (B/L/D · B/X/X · B/L/D · B/L/X)', 'Exact day-by-day sequence is confirmed on your booking voucher'] },
        { day: 'Day 5', title: 'Return flight to Manila', items: ['Breakfast at hotel', 'Check-out and transfer to airport', 'Charter flight back to Manila'] }
      ],
      inclusions: ['Roundtrip charter flight Manila – Da Nang – Manila', 'All seats with meal on the plane (each flight has 6 business-class seats)', '20 kg checked baggage per pax', '7 kg hand carry per pax', '3 nights room accommodation at Sea Garden Hotel or similar local 4★', 'Daily hotel breakfast', 'Meals as specified in itinerary', 'Sightseeing tours as specified', 'Entrance fees as per itinerary', 'English-speaking tour guide', 'Airport transfers', 'Travel insurance'],
      exclusions: EXC_DANANG,
      hotels: ['Sea Garden Hotel or similar local 4★'],
      places: ['Da Nang', 'Ba Na Hills', 'Golden Bridge', 'Da Nang Cathedral (Pink Church)', 'APEC Park', 'Dragon Bridge', 'Lovers Bridge', 'Hoi An Ancient Town'],
      posters: ['952787_3194edd0c0244a54bafb5f0a2625919a~mv2.png', '952787_8b207104bf0d43e5aa4c288936e9fec3~mv2.png']
    },
    {
      id: 'hanoi-sapa-halong-4d3n',
      name: 'Hanoi – Sapa – Ha Long Bay 4D3N Tour',
      subtitle: 'Out Cebu · Special offer',
      region: 'intl', country: 'Vietnam', flag: 'vn', duration: '4 days 3 nights', days: 4, status: 'offer', badge: 'Special offer', featured: true,
      departure: 'Cebu (Mactan-Cebu International)', price: { from: 32888, label: 'From', unit: 'all-in per person' }, year: 2026, ends: '2026-12-31',
      image: '952787_0f90501df956446f93adb797c7e9f787~mv2.png', imageAlign: 't', hero: '11062b_12e8394318ad4042acc3831d320a0e53~mv2.jpg',
      alt: 'Hanoi, Sapa and Ha Long Bay 4D3N tour poster',
      gallery: ['952787_0f90501df956446f93adb797c7e9f787~mv2.png', '952787_2886565a745a486fa6336ab8b57c9a15~mv2.png', '11062b_12e8394318ad4042acc3831d320a0e53~mv2.jpg'],
      summary: 'Fly Vietnam Airlines from Cebu for Hanoi’s Old Quarter, the Fansipan cable car in Sapa and an exclusive Ha Long Bay cruise, with two lunch buffets upgraded.',
      overview: 'Northern Vietnam in four days, departing from Cebu. Begin in Hanoi at Hoan Kiem Lake and the 36 Streets, travel up to Sapa for the longest mountain train in Vietnam and the Fansipan Legend cable car to the roof of Indochina, cruise Ha Long Bay on the Ambrose with a buffet lunch and cave visit, and finish with a Hanoi city tour. Economy airfare on Vietnam Airlines, three nights in 4-star hotels and a private coach with an English-speaking guide are included.',
      travelDates: [
        { d: 'Sep 7–10', add: 1000 }, { d: 'Sep 14–17', add: 3000 }, { d: 'Sep 21–24', add: 1000 }, { d: 'Sep 28–Oct 1', add: 1000 },
        { d: 'Oct 5–8', add: 3000 }, { d: 'Oct 12–15', add: 3000 }, { d: 'Oct 19–22', add: 1000 }, { d: 'Oct 26–29', add: 1000 },
        { d: 'Nov 23–26', add: 7000 }, { d: 'Dec 28–31', add: 7000 }
      ],
      travelDatesNote: 'Travel dates 2026. Surcharges are per pax on top of the base rate.',
      itinerary: [
        { day: 'Day 1', title: 'Hanoi arrival', items: ['Upon arrival, meet the tour guide at the airport', 'Explore Hoan Kiem Lake and the 36 Streets', 'Visit Ba Dinh Square and Hanoi Train Street', 'Transfer to Sapa', 'Visit Sa Pa Tourist Street, Sa Pa Church and Love Square', 'After dinner, transfer to hotel and check in'] },
        { day: 'Day 2', title: 'Sapa exploration', items: ['Hotel breakfast', 'Take the longest mountain train in Sapa (Muong Hoa Mountain Train + Fansipan Legend Cable Car)', 'The Fansipan Peak (lunch: mountain buffet at Van Sam restaurant)', 'Visit Sapa’s most beautiful MOANA internet-celebrity coffee shop', 'Transfer to Hanoi', 'After dinner, transfer to hotel and check in'] },
        { day: 'Day 3', title: 'Ha Long Bay cruise', items: ['Hotel breakfast', 'Visit latex shop', 'Ha Long Bay exclusive cruise tour by Ambrose cruise (lunch: cruise buffet)', 'Activities throughout the cruise: karaoke, lunch buffet, Vietnamese afternoon tea, Stalactite Cave, Tip Top Island and overlook, Fighting Cock Island', 'After dinner, transfer to hotel and check in'] },
        { day: 'Day 4', title: 'Hanoi city tour', items: ['Hotel breakfast', 'Visit ruby shop', 'Visit silk shop and bamboo shop', 'Transfer to Hanoi World (not including gondola ride)', 'Transfer to airport and fly back to Cebu'] }
      ],
      inclusions: ['Economy airfare and tax via Vietnam Airlines (round trip + 1 pc 23 kg baggage allowance)', 'All seats with meal on the plane (each flight has 6 business-class seats)', '3 nights room accommodation based on twin sharing at choice hotel, with daily hotel breakfast', 'Private coach with English-speaking tour guide', 'Sightseeing tours as specified, including main entrance tickets', 'Meals as listed', 'Upgrade to 2 lunch buffets (as specified in the itinerary)'],
      exclusions: ['Expenses of a personal nature such as telephone calls and mini bar', 'Extra baggage allowance', 'Travel insurance with Covid-19 coverage', 'Philippine travel tax', 'Visa', 'Tips for driver and guide: USD 5 per pax per day × 4 days = USD 20 per pax', 'Single supplement: USD 68 per pax', 'Taxes, surcharges and fees, subject to change'],
      optional: ['Optional tour USD 99 per pax: Han River cruise (night view + 1 drink), Vietnamese massage and 1 buffet dinner'],
      hotels: ['4★ Sapa hotel (X/L/D)', '4★ Hanoi hotel (B/L/D)', '4★ Ha Long Bay hotel (B/L/D)', 'Sweet Home (B/L/X)'],
      notes: ['Meal codes: B = breakfast, L = lunch, D = dinner, X = on your own.', 'Hotels are as listed or similar.'],
      places: ['Hanoi', 'Hoan Kiem Lake & 36 Streets', 'Ba Dinh Square', 'Hanoi Train Street', 'Sapa', 'Sa Pa Tourist Street, Church & Love Square', 'Muong Hoa Mountain Train', 'Fansipan Legend Cable Car', 'Fansipan Peak', 'MOANA Coffee Shop', 'Ha Long Bay', 'Ambrose Cruise', 'Stalactite Cave', 'Tip Top Island', 'Fighting Cock Island', 'Hanoi World'],
      posters: ['952787_0f90501df956446f93adb797c7e9f787~mv2.png', '952787_2886565a745a486fa6336ab8b57c9a15~mv2.png']
    },

    /* ---------------- Bohol & Camotes ---------------- */
    {
      id: 'bohol-breezes',
      name: 'Bohol Breezes: Embrace Island Serenity!',
      region: 'bohol', country: 'Philippines', flag: 'ph', duration: 'Day tour', days: 1, status: 'available', badge: 'Featured', featured: true,
      departure: 'Cebu City pier', price: null,
      image: '952787_c790bde9bfb74673a9c563990ab577d1~mv2.jpg', alt: 'Bohol countryside tour',
      gallery: ['952787_c790bde9bfb74673a9c563990ab577d1~mv2.jpg', '952787_6a8b5ab3b00d41bcb1a8915073aa4861~mv2.jpg', '952787_2d330c92a5d342099b7d4258256ffa11~mv2.jpg'],
      summary: 'A full day across Bohol’s icons, from the Blood Compact Shrine and Baclayon Church to the Chocolate Hills, with lunch on a Loboc River cruise.',
      overview: 'Bohol sits a fast-craft ride east of Cebu and packs the Philippines’ most recognisable countryside into one loop: the historic Sandugo shrine and 18th-century Baclayon Church on the coast, the shaded Bilar mahogany forest, the 1,200-plus Chocolate Hills of Carmen and a floating lunch on the Loboc River. Boat tickets, terminal and entrance fees, a licensed guide and air-conditioned transport are all arranged.',
      itinerary: [
        { day: 'Morning', title: 'Cebu to Tagbilaran', items: ['Fast craft from Cebu to Tagbilaran (two-way tickets included)', 'Meet your licensed tour guide and air-conditioned vehicle', 'Blood Compact Shrine and Baclayon Church'] },
        { day: 'Midday', title: 'Countryside loop', items: ['Bilar Man-Made Forest', 'Chocolate Hills viewing complex', 'Lunch on the Loboc River cruise'] },
        { day: 'Afternoon', title: 'Pasalubong and return', items: ['Aproniana Souvenir Shop', 'Transfer to the pier for the fast craft back to Cebu'] }
      ],
      inclusions: ['Two-way boat ticket', 'Terminal & entrance fees', 'Licensed tour guide', 'Air-conditioned transportation', 'Lunch at Loboc River'],
      exclusions: ['Personal expenses', 'Optional activities not in the itinerary'],
      places: ['Blood Compact Shrine', 'Baclayon Church', 'Bilar Man-Made Forest', 'Chocolate Hills', 'Loboc River', 'Aproniana Souvenir Shop']
    },
    {
      id: 'camotes-discover',
      name: 'Discover Enchanting Camotes',
      region: 'bohol', country: 'Philippines', flag: 'ph', duration: '2 days 1 night', days: 2, status: 'available', badge: '', featured: true,
      departure: 'Cebu (Danao port)', price: null,
      image: '952787_74c14938b43548f8a3241d08e1b5c4df~mv2.jpg', alt: 'Camotes Island beach',
      gallery: ['952787_74c14938b43548f8a3241d08e1b5c4df~mv2.jpg', '952787_250d67a9fabf4973bcde54f948a225b3~mv2.jpg', '952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg'],
      summary: 'Beaches, caves and Cebu’s largest lake over two days on the Camotes Islands, with hotel, meals, boat tickets and guide arranged.',
      overview: 'The Camotes Islands lie between Cebu and Leyte and stay refreshingly quiet. This overnight package combines the white sand of Santiago and Mangodlong beaches, a chain of swimmable caves (Amazing, Paraiso, Heaven and Timubo), the figure-eight Lake Danao, the islet of Tulang Diot and the cliffs of Buho Rock, plus a guided walk through the Katunggan mangroves.',
      itinerary: [
        { day: 'Day 1', title: 'Beaches and caves', items: ['Boat from Cebu to Camotes (two-way tickets included)', 'Katunggan nature trip', 'Santiago Beach and Mangodlong Beach', 'Amazing Cave, Paraiso Cave and Heaven Cave', 'Hotel check-in, dinner'] },
        { day: 'Day 2', title: 'Lake, islet and rock', items: ['Breakfast', 'Lake Danao', 'Timubo Cave', 'Tulang Diot islet', 'Buho Rock', 'Boat back to Cebu'] }
      ],
      inclusions: INC_CAMOTES,
      exclusions: ['Personal expenses', 'Optional activities not in the itinerary'],
      places: ['Katunggan Nature Trip', 'Mangodlong Beach', 'Santiago Beach', 'Amazing Cave', 'Paraiso Cave', 'Heaven Cave', 'Lake Danao', 'Timubo Cave', 'Tulang Diot', 'Buho Rock']
    },
    {
      id: 'camotes-tudela',
      name: 'Camotes Charms: Lakwatsa sa Tudela',
      region: 'bohol', country: 'Philippines', flag: 'ph', duration: '2 days 1 night', days: 2, status: 'available', badge: '', featured: false,
      departure: 'Cebu (Danao port)', price: null,
      image: '952787_22b054e923d24111a5d007fbe1fd048f~mv2.jpg', alt: 'Tudela, Camotes Islands',
      gallery: ['952787_22b054e923d24111a5d007fbe1fd048f~mv2.jpg', '952787_250d67a9fabf4973bcde54f948a225b3~mv2.jpg'],
      summary: 'The quieter Tudela side of Camotes: Bukilat sea cave, the Villahermosa mangroves, the heritage Kaompang tree and Busay Falls, with an overnight stay.',
      overview: 'Tudela is the least-visited of the Camotes towns and rewards the detour. Swim in the sunlit saltwater pool of Bukilat Cave, walk the boardwalk through the Villahermosa mangroves, picnic under the centuries-old Kaompang tree and cool off at Busay Falls. Boat tickets, hotel, meals, transport and guide are included.',
      itinerary: [
        { day: 'Day 1', title: 'Arrival and Bukilat', items: ['Boat from Cebu to Camotes', 'Katunggan nature trip', 'Bukilat Cave', 'Hotel check-in, dinner'] },
        { day: 'Day 2', title: 'Mangroves, tree and falls', items: ['Breakfast', 'Villahermosa Mangroves', 'Kaompang Tree', 'Busay Falls', 'Boat back to Cebu'] }
      ],
      inclusions: INC_CAMOTES,
      exclusions: ['Personal expenses', 'Optional activities not in the itinerary'],
      places: ['Katunggan Nature Trip', 'Bukilat Cave', 'Villahermosa Mangroves', 'Kaompang Tree', 'Busay Falls']
    },

    /* ---------------- Cebu ---------------- */
    {
      id: 'cebu-highlands',
      name: 'Cebu Highlands Vista Tour',
      region: 'cebu', country: 'Philippines', flag: 'ph', duration: 'Day tour', days: 1, status: 'available', badge: '', featured: true,
      departure: 'Cebu City hotels', price: null,
      image: '952787_ef8a0cd30f94496d9491f4d1caa3f202~mv2.jpg', alt: 'Cebu highlands viewpoint',
      gallery: ['952787_ef8a0cd30f94496d9491f4d1caa3f202~mv2.jpg'],
      summary: 'Cebu’s most photographed hilltop spots in one day: the Temple of Leah, Little Kyoto, Seoul Sierra and the flower fields of Sirao Garden.',
      overview: 'Above Cebu City the air cools and the views open up. The highlands loop takes in the Roman-inspired Temple of Leah, the Japanese and Korean-themed gardens of Little Kyoto and Seoul Sierra, and Sirao Garden, the celosia farm known as Little Amsterdam. Travel is by air-conditioned van with a licensed guide, entrance fees, water and a mini pasalubong pack included.',
      itinerary: [
        { day: 'Morning', title: 'Up to Busay', items: ['Hotel pick-up in an air-conditioned van', 'Temple of Leah', 'Little Kyoto'] },
        { day: 'Afternoon', title: 'Gardens and views', items: ['Seoul Sierra', 'Sirao Garden', 'Return to Cebu City'] }
      ],
      inclusions: INC_CEBU,
      exclusions: ['Meals', 'Personal expenses'],
      places: ['Temple of Leah', 'Little Kyoto', 'Seoul Sierra', 'Sirao Garden']
    },
    {
      id: 'queen-city',
      name: 'Queen City Tour: Cebu',
      region: 'cebu', country: 'Philippines', flag: 'ph', duration: 'Day tour', days: 1, status: 'available', badge: 'Heritage', featured: true,
      departure: 'Cebu City hotels', price: null,
      image: '952787_23bb46c7551540d4b6631f9ceaf12911~mv2.jpg', alt: 'Fort San Pedro, Cebu City',
      gallery: ['952787_23bb46c7551540d4b6631f9ceaf12911~mv2.jpg'],
      summary: 'Cebu City’s heritage trail: Magellan’s Cross, the Basilica del Sto. Niño, Fort San Pedro, the ancestral houses of Parian and the Taoist Temple.',
      overview: 'Cebu is the oldest city in the Philippines, and the Queen City Tour follows its story from the 1521 planting of Magellan’s Cross and the founding of the Basilica Minore del Sto. Niño in 1565 to the triangular Fort San Pedro, the Heritage of Cebu Monument, the Casa Gorordo and Yap-Sandiego ancestral houses and the hillside Taoist Temple.',
      itinerary: [
        { day: 'Morning', title: 'Downtown heritage', items: ['Hotel pick-up in an air-conditioned van', 'Magellan’s Cross and Basilica Minore del Sto. Niño', 'Fort San Pedro', 'Cebu Heritage Monument'] },
        { day: 'Afternoon', title: 'Ancestral houses and temple', items: ['Casa Gorordo and Yap-Sandiego Museum', 'Taoist Temple', 'Return to hotel'] }
      ],
      inclusions: INC_CEBU,
      exclusions: ['Meals', 'Personal expenses'],
      places: ['Magellan’s Cross', 'Basilica Minore del Sto. Niño', 'Fort San Pedro', 'Cebu Heritage Monument', 'Casa Gorordo & Yap-Sandiego Museum', 'Taoist Temple']
    },
    {
      id: 'twin-city',
      name: 'Twin City Tour: Cebu',
      region: 'cebu', country: 'Philippines', flag: 'ph', duration: 'Day tour', days: 1, status: 'available', badge: '', featured: false,
      departure: 'Cebu City or Mactan hotels', price: null,
      image: '952787_fe368fa20ed346b78f71f7a717b270fd~mv2.jpg', alt: 'Marcelo Fernan Bridge between Cebu and Mactan',
      gallery: ['952787_fe368fa20ed346b78f71f7a717b270fd~mv2.jpg'],
      summary: 'Cebu City’s landmarks plus a crossing to Mactan for the Alegre Guitar Factory. Ideal for first-time visitors with one day to spare.',
      overview: 'The Twin City Tour pairs Cebu City’s historic core with neighbouring Lapu-Lapu City on Mactan Island. After Magellan’s Cross, the Basilica, Fort San Pedro, the Heritage Monument and Casa Gorordo, the van crosses the bridge to Mactan for the family-run Alegre Guitar Factory, famous for handmade guitars.',
      itinerary: [
        { day: 'Morning', title: 'Cebu City', items: ['Hotel pick-up in an air-conditioned van', 'Magellan’s Cross and Basilica Minore del Sto. Niño', 'Fort San Pedro', 'Cebu Heritage Monument', 'Casa Gorordo Museum'] },
        { day: 'Afternoon', title: 'Mactan', items: ['Cross to Mactan Island', 'Alegre Guitar Factory', 'Return to hotel'] }
      ],
      inclusions: INC_CEBU,
      exclusions: ['Meals', 'Personal expenses'],
      places: ['Magellan’s Cross', 'Basilica Minore del Sto. Niño', 'Fort San Pedro', 'Cebu Heritage Monument', 'Casa Gorordo Museum', 'Alegre Guitar Factory']
    },

    /* ---------------- Boracay, Palawan & Siargao ---------------- */
    {
      id: 'boracay-bliss',
      name: 'Boracay Bliss',
      region: 'visayas', country: 'Philippines', flag: 'ph', duration: '', days: 0, status: 'soon', badge: 'Coming soon', featured: false,
      departure: 'Cebu', price: null,
      image: '952787_7c95bd58cf3440f480b04e9672c06802~mv2.jpg', alt: 'Puka Beach, Boracay',
      gallery: ['952787_7c95bd58cf3440f480b04e9672c06802~mv2.jpg', '952787_aa431e7ae48a45f59960aac33ffd6c8b~mv2.jpg'],
      summary: 'Our Boracay package is being finalised. Ask to be notified when it launches, or request a custom Boracay itinerary now.',
      overview: 'Boracay in Aklan is the Philippines’ best-known beach island: four kilometres of White Beach, the shell-strewn Puka Beach, sunset paraw sailing and island hopping. The packaged version is coming soon; custom itineraries can be arranged in the meantime.',
      inclusions: ['Package details coming soon'], exclusions: [],
      places: ['Boracay Island']
    },
    {
      id: 'el-nido',
      name: 'El Nido Escapade: Memory Keepers',
      region: 'visayas', country: 'Philippines', flag: 'ph', duration: '', days: 0, status: 'soon', badge: 'Coming soon', featured: false,
      departure: 'Cebu', price: null,
      image: '952787_1bb9e51e18084c429eedba7d528d9d33~mv2.jpg', alt: 'El Nido, Palawan',
      gallery: ['952787_1bb9e51e18084c429eedba7d528d9d33~mv2.jpg', '952787_a67b7dcf552942a294501fc5c8a044f8~mv2.jpg'],
      summary: 'Lagoons and limestone cliffs at the northern tip of Palawan. The package is being finalised; custom El Nido itineraries can be arranged now.',
      overview: 'El Nido’s Bacuit Bay is a maze of limestone islands, hidden lagoons and white beaches explored on the classic island-hopping tours, often combined with the Puerto Princesa Underground River. The packaged version is coming soon; custom itineraries are available on request.',
      inclusions: ['Package details coming soon'], exclusions: [],
      places: ['El Nido, Palawan']
    },
    {
      id: 'coron',
      name: 'Coron Captures',
      region: 'visayas', country: 'Philippines', flag: 'ph', duration: '', days: 0, status: 'soon', badge: 'Coming soon', featured: false,
      departure: 'Cebu', price: null,
      image: '952787_c707827028d143a594404076e61331be~mv2.jpg', alt: 'Coron, Palawan',
      gallery: ['952787_c707827028d143a594404076e61331be~mv2.jpg'],
      summary: 'Coron’s lakes, lagoons and shipwrecks. The package is being finalised; custom Coron itineraries can be arranged now.',
      overview: 'Coron on Busuanga Island offers Kayangan Lake, Twin Lagoon, the Maquinit hot springs and some of the world’s best wreck snorkelling over Japanese ships sunk in 1944. The packaged version is coming soon; custom itineraries are available on request.',
      inclusions: ['Package details coming soon'], exclusions: [],
      places: ['Coron, Palawan']
    },

    /* ---------------- Other international ---------------- */
    {
      id: 'shanghai-mini-kyoto-5d4n',
      name: 'Shanghai Mini Kyoto 5D4N Tour',
      subtitle: 'Out Manila · Juneyao Air',
      region: 'intl', country: 'China', flag: 'cn', duration: '5 days 4 nights', days: 5, status: 'offer', badge: 'Special offer', featured: false,
      departure: 'Manila (NAIA)', price: { from: 369, currency: 'USD', label: 'From', unit: 'all-in per person' }, year: 2026, ends: '2026-07-29',
      image: '952787_00f199ad62fa4e719b784a358f9f0b18~mv2.png', imageAlign: 't',
      alt: 'Shanghai Mini Kyoto 5D4N tour poster',
      gallery: ['952787_00f199ad62fa4e719b784a358f9f0b18~mv2.png'],
      summary: 'Five days in Shanghai on Juneyao Air from Manila: the Bund and Lujiazui skyline, the lantern-lit “Mini Kyoto” street, four nights with breakfast and an English-speaking guide.',
      overview: 'A single fixed departure (25–29 July 2026) to China’s largest city. Economy airfare with Juneyao Airlines from Manila, four nights in a choice hotel on twin sharing with daily breakfast, a private coach with an English-speaking guide, sightseeing with first-way entrance fees and meals as listed. Ask us about the next Shanghai schedule.',
      travelDates: [{ d: 'Jul 25–29' }],
      travelDatesNote: 'Single departure, 25–29 July 2026 (5D4N).',
      inclusions: ['Economy airfare and tax via Juneyao Airlines (round trip)', 'Baggage allowance: 1 pc (23 kg) check-in + 1 pc (5 kg) carry-on', '4 nights room accommodation based on twin sharing at choice hotel with daily hotel breakfast (triple room not guaranteed)', 'Private coach with English-speaking tour guide', 'Sightseeing tours as specified, including the first-way entrance fee needed', 'Meals as listed'],
      exclusions: ['Expenses of a personal nature such as telephone calls and mini bar', 'Travel insurance', 'Fuel surcharge USD 30 per pax, subject to change', 'Philippine travel tax PHP 1,620 per pax, paid directly at the airport', 'China group visa USD 40 per pax', 'Tips for driver and guide USD 20 per pax', 'Single supplement USD 90 per pax'],
      notes: ['Minor with bed (11–17 yrs): USD 489 per pax. Child without bed (2–10 yrs): USD 419 per pax.'],
      places: ['Shanghai', 'The Bund & Lujiazui Skyline', 'Mini Kyoto Street'],
      posters: ['952787_00f199ad62fa4e719b784a358f9f0b18~mv2.png']
    },
    {
      id: 'charming-yunnan-8d7n',
      name: 'Charming Yunnan 8D7N Tour',
      subtitle: 'Out Manila · China Southern Airlines',
      region: 'intl', country: 'China', flag: 'cn', duration: '8 days 7 nights', days: 8, status: 'offer', badge: 'Special offer', featured: true,
      departure: 'Manila (NAIA)', price: { from: 1488, currency: 'USD', label: 'From', unit: 'all-in per person' }, year: 2026, ends: '2026-12-25',
      image: '952787_1c684e10be094ca584af9b4cf5a04abe~mv2.png', imageAlign: 't',
      alt: 'Charming Yunnan 8D7N tour poster: Kunming, Dali, Lijiang and Shangri-La',
      gallery: ['952787_1c684e10be094ca584af9b4cf5a04abe~mv2.png'],
      summary: 'Kunming, Dali, Lijiang and Shangri-La in eight days: China Southern flights from Manila, 5-star hotels, a high-speed train ride and two upgraded lunch buffets.',
      overview: 'Yunnan is China’s most varied province, from the spring-like capital Kunming to the Bai old town of Dali on Erhai Lake, UNESCO-listed Lijiang beneath the Jade Dragon Snow Mountain and the Tibetan plateau town of Shangri-La. This eight-day programme flies China Southern from Manila, stays in 5-star hotels throughout, includes the Dali–Kunming high-speed train in 2nd class, first entrance tickets and in-park transport at every scenic spot, and upgrades two lunches to buffets, one of them seafood.',
      travelDates: [{ d: 'Sep 15–22' }, { d: 'Oct 29–Nov 5', add: 200, cur: 'USD' }, { d: 'Nov 6–13' }, { d: 'Nov 20–27', add: 100, cur: 'USD' }, { d: 'Dec 9–16', add: 100, cur: 'USD' }, { d: 'Dec 18–25', add: 400, cur: 'USD' }],
      travelDatesNote: 'Travel dates 2026. Surcharges shown are in US dollars per pax.',
      inclusions: ['Economy airfare and tax with China Southern Airlines (round trip)', 'Baggage allowance: 1 pc 23 kg check-in and 7 kg hand carry', 'High-speed train Dali to Kunming, 2nd-class seats', '7 nights room accommodation based on twin sharing at choice 5★ hotels with daily hotel breakfast', 'Private bus with English-speaking tour guide', 'Sightseeing items as specified, including first entrance tickets for all scenic spots and listed in-park transportation fees', 'Meals: breakfast and one main meal per day, with one meal upgraded to a seafood buffet', 'Upgrade to 2 lunch buffets', 'All seats with meal on the plane (each flight has 6 business-class seats)'],
      exclusions: ['Personal expenses such as telephone calls and mini bar', 'Travel insurance', 'Philippine travel tax USD 30 per pax (collected with tour fee)', 'China group visa USD 40 per pax (collected with tour fee)', 'Tips for driver and guide USD 48 per pax (collected with tour fee)', 'Single supplement USD 250 per pax', 'Fuel surcharge (subject to change), estimated USD 75 per pax'],
      hotels: ['5★ hotel in Kunming (X/X/X)', '5★ hotel in Chuxiong (B/L/D)', '5★ hotel in Lijiang (B/L/X)', '5★ hotel in Dali (B/L/D)', '5★ hotel in Shangri-La (B/L/D)'],
      notes: ['Child with bed (11–17 yrs): same rate as adults. Child without bed (2–10 yrs): USD 1,368 per pax.', 'Meal codes: B = breakfast, L = lunch, D = dinner, X = on your own. Hotels are as listed or similar.'],
      places: ['Kunming', 'Chuxiong', 'Dali', 'Lijiang', 'Shangri-La'],
      posters: ['952787_1c684e10be094ca584af9b4cf5a04abe~mv2.png']
    },
    {
      id: 'japan-tokyo-fuji-5d4n',
      name: 'Japan: Tokyo · Yokohama · Mt. Fuji 5D4N Tour',
      subtitle: 'Out Cebu · Cebu Pacific',
      region: 'intl', country: 'Japan', flag: 'jp', duration: '5 days 4 nights', days: 5, status: 'offer', badge: 'Special offer', featured: true,
      departure: 'Cebu (Mactan-Cebu International)', price: { from: 1049, currency: 'USD', label: 'From', unit: 'all-in per person' }, year: 2026, ends: '2027-02-23',
      image: '952787_bdf86d20b5ef4120a1876cf17c6718f4~mv2.png', imageAlign: 't',
      alt: 'Japan Tokyo, Yokohama and Mt. Fuji 5D4N tour poster',
      gallery: ['952787_bdf86d20b5ef4120a1876cf17c6718f4~mv2.png'],
      summary: 'Winter in Japan direct from Cebu on Cebu Pacific: Tokyo, Yokohama and Mt. Fuji with hotel breakfasts, an English-speaking guide and two upgraded lunch buffets.',
      overview: 'Fly Cebu Pacific from Mactan for Japan’s winter season: Tokyo’s Asakusa, Shibuya and Shinjuku, the Minato Mirai waterfront and Chinatown of Yokohama, and a Mt. Fuji day with views from the Fuji Five Lakes area. Departures run from December 2026 to February 2027 with hotel breakfasts, a private coach with an English-speaking guide, main entrance tickets and two lunch buffets included.',
      travelDates: [{ d: 'Dec 19–23', add: 1000 }, { d: 'Dec 25–29', add: 1000 }, { d: 'Jan 8–12', add: 100, y: 2027 }, { d: 'Jan 15–19', add: 200, y: 2027 }, { d: 'Jan 22–26', add: 200, y: 2027 }, { d: 'Feb 5–9', add: 100, y: 2027 }, { d: 'Feb 12–16', add: 100, y: 2027 }, { d: 'Feb 19–23', add: 100, y: 2027 }],
      travelDatesNote: 'Departures December 2026 to February 2027. Surcharges shown are in pesos per pax.',
      inclusions: ['Economy airfare and tax via Cebu Pacific (round trip + 1 pc 7 kg hand carry only)', 'Room accommodation based on twin sharing at choice hotel with daily hotel breakfast (poster states 3 nights; please confirm the 4th night with our team)', 'Private coach with English-speaking tour guide', 'Sightseeing tours as specified, including main entrance tickets', 'Meals as listed', 'Upgrade to 2 lunch buffets (as specified in the itinerary)', 'All seats with meal on the plane (each flight has 6 business-class seats)'],
      exclusions: ['Expenses of a personal nature such as telephone calls and mini bar', 'Extra baggage allowance', 'Travel insurance with Covid-19 coverage', 'Philippine travel tax', 'Visa', 'Tips for driver and guide: USD 5 per pax per day × 4 days = USD 20 per pax', 'Single supplement USD 68 per pax', 'Taxes, surcharges and fees, subject to change'],
      notes: ['Accommodation is at a choice hotel or similar, twin sharing.'],
      places: ['Tokyo', 'Yokohama', 'Mt. Fuji'],
      posters: ['952787_bdf86d20b5ef4120a1876cf17c6718f4~mv2.png']
    }
  ];

  /* ---------- Photos from the agency's galleries ---------- */
  IC.gallery = [
    { id: '952787_6a8b5ab3b00d41bcb1a8915073aa4861~mv2.jpg', shape: 'wide',   title: 'Loboc River Lunch', sub: 'Bohol' },
    { id: '952787_a67b7dcf552942a294501fc5c8a044f8~mv2.jpg', shape: 'tall',   title: 'Underground River', sub: 'Puerto Princesa, Palawan' },
    { id: '952787_9bc781dfae87479dae7fd84ed8b09c42~mv2.jpg', shape: 'wide',   title: 'Orientation course for local legislators', sub: 'MICE & seminars' },
    { id: '952787_9a7ffc3f7a2e47d18e2086d04b3b9341~mv2.jpg', shape: 'square', title: 'Snorkelling with our guests', sub: 'Cebu' },
    { id: '952787_250d67a9fabf4973bcde54f948a225b3~mv2.jpg', shape: 'tall',   title: 'Camotes', sub: 'Island getaway' },
    { id: '952787_2d330c92a5d342099b7d4258256ffa11~mv2.jpg', shape: 'square', title: 'Bohol', sub: 'Countryside tour' },
    { id: '952787_d42f442bb8264e678cbc88bdc2824eff~mv2.jpg', shape: 'tall',   title: 'Seminar logistics', sub: 'Meetings & events' },
    { id: '952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg', shape: 'wide',   title: 'Mangodlong Beach', sub: 'Partner resort, Camotes' },
    { id: '952787_f6e5b9acd62049db802bcfd86e7fd352~mv2.jpg', shape: 'wide',   title: 'Participants’ orientation', sub: 'MICE & seminars' },
    { id: '952787_515cfff1c9a64aa9b330a027322b9e7a~mv2.jpg', shape: 'square', title: 'Air-conditioned transport', sub: 'Vans, coasters & buses' },
    { id: '952787_0050a801a0b94a199d0f8d18215c1275~mv2.jpg', shape: 'wide',   title: 'Merlion & Marina Bay Sands', sub: 'Singapore group tour' },
    { id: '952787_a667b39095f54b15824f7157c48f4afa~mv2.jpg', shape: 'wide',   title: 'Universal Studios Singapore', sub: 'Singapore group tour' },
    { id: '952787_4ee43fd7e9794e2585f94ff3b0ba89e8~mv2.jpg', shape: 'square', title: 'Underground River', sub: 'Puerto Princesa, Palawan' },
    { id: '952787_47fb234e9fc643c685154b62a85432c9~mv2.jpg', shape: 'tall',   title: 'Jewel Changi', sub: 'Singapore group tour' },
    { id: '952787_e0d14697042d448cb553e113bb99895a~mv2.jpg', shape: 'wide',   title: 'Island hopping', sub: 'Boat tour with our guests' },
    { id: '952787_e3e293ea8aca4eae85457a5a8007e670~mv2.jpg', shape: 'square', title: 'Mangrove walk', sub: 'Camotes Islands' },
    { id: '952787_3483752836144268b346adf78f3b398f~mv2.jpg', shape: 'wide',   title: 'Malay Heritage Centre', sub: 'Singapore group tour' },
    { id: '952787_e8ab6be92bd54b05859482cb8c9b5bb2~mv2.jpg', shape: 'square', title: 'Snorkelling', sub: 'Island getaway' }
  ];

  IC.hotelPhotos = ['952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg', '952787_26a50047e88545a18d5e6c89816805bc~mv2.jpg', '952787_2c289935d14a4992b20f77b49e988dba~mv2.jpg', '952787_bf04b5da3fbe466388fd7b0ce1011bd7~mv2.jpg'];
  IC.micePhotos = ['952787_9bc781dfae87479dae7fd84ed8b09c42~mv2.jpg', '952787_d42f442bb8264e678cbc88bdc2824eff~mv2.jpg', '952787_f6e5b9acd62049db802bcfd86e7fd352~mv2.jpg'];

  /* ---------- Team ----------
     Each card is a desk in the agency. To turn one into a personal profile,
     fill in `name` (and `photo`, a Wix media id from the agency's own library):
       { name: 'Juan dela Cruz', photo: '952787_xxxxxxxx~mv2.jpg', role: 'Reservations & Ticketing', ... }
     Leave `name` empty and the card shows the desk instead of a person, so the
     section stays accurate until the agency supplies names and photographs.
     `email` is optional and falls back to the main inquiries address.        */
  IC.team = [
    {
      name: '', photo: '', email: '',
      role: 'Reservations & Ticketing', icon: 'ticketing',
      desc: 'Books your flights and ferry tickets, compares fares across carriers and handles changes when your plans move.',
      handles: ['Flight & ferry tickets', 'Fare quotations', 'Rebooking & changes']
    },
    {
      name: '', photo: '', email: '',
      role: 'Tours & Operations', icon: 'tours',
      desc: 'Plans your itinerary, assigns your licensed guide and vehicle, and keeps the day running to schedule on the ground.',
      handles: ['Local & international packages', 'Licensed tour guides', 'Custom itineraries']
    },
    {
      name: '', photo: '', email: '',
      role: 'Accommodation & Transport', icon: 'hotel',
      desc: 'Secures your rooms with our resort and hotel partners and reserves the van, coaster or bus that fits your group.',
      handles: ['Hotel & resort bookings', 'Van, coaster & bus reservations', 'Airport transfers']
    },
    {
      name: '', photo: '', email: '',
      role: 'Meetings, Incentives & Events', icon: 'mice',
      desc: 'Handles conventions, seminars, trainings and corporate gatherings from the venue and room block to the closing programme.',
      handles: ['Seminars & conventions', 'Delegate transport & meals', 'Team building programmes']
    }
  ];

  /* Quick destination picks under the hero quote card. `q` is what lands in
     the destination field when a chip is tapped; `flag` is the country code
     for the little flag. Keep the list to the markets we actually sell.   */
  IC.heroPicks = [
    { q: 'Bohol', flag: 'ph' },
    { q: 'Camotes Islands', flag: 'ph' },
    { q: 'Cebu & Mactan', flag: 'ph' },
    { q: 'Da Nang', flag: 'vn' },
    { q: 'Hanoi & Ha Long Bay', flag: 'vn' },
    { q: 'Tokyo & Mt. Fuji', flag: 'jp' }
  ];

  IC.destinationsTicker = [
    ['Da Nang', 'From ₱23,888 · out Manila'], ['Hanoi · Sapa · Ha Long Bay', 'From ₱32,888 · out Cebu'], ['Bohol', 'Loboc River lunch'], ['Camotes Islands', '2 days 1 night'],
    ['Cebu City', 'Heritage tours'], ['Cebu Highlands', 'Temple of Leah & Sirao'], ['Mactan', 'Twin City Tour'],
    ['Charming Yunnan', 'From $1,488 · out Manila'], ['Japan · Tokyo & Mt. Fuji', 'From $1,049 · out Cebu'], ['Boracay', 'Coming soon'], ['El Nido', 'Coming soon'], ['Coron', 'Coming soon']
  ];
})(window.IC);
