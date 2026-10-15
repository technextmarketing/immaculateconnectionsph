/* =========================================================
   Immaculate Connections Travel Agency — site data (v2)
   ---------------------------------------------------------
   Packages, inclusions, places, prices, travel dates and
   itineraries are transcribed from the agency's website and
   its itinerary posters (immaculateconnectionsph.com). Photos
   live in assets/img/media (see the LOCAL map below).
   Location guides (placeInfo) are short general descriptions.
   ========================================================= */

window.IC = window.IC || {};

(function (IC) {
  /* Photos are kept in the repo (assets/img/media). Every photo has a full-size
     copy (up to 1600px) and, for JPEGs, an 800px copy used in cards and thumbnails.
     Images are still referred to by their original media id, so package data
     never changes when a photo file does; add new photos to this map. */
  const MEDIA = 'assets/img/media/';
  const LOCAL = {
    '11062b_12e8394318ad4042acc3831d320a0e53~mv2.jpg': '12e8394318ad.jpg',
    '952787_0050a801a0b94a199d0f8d18215c1275~mv2.jpg': '0050a801a0b9.jpg',
    '952787_00f199ad62fa4e719b784a358f9f0b18~mv2.png': '00f199ad62fa.jpg',
    '952787_0db097d807b14f5b882dbfd77aa54bce~mv2.png': '0db097d807b1.jpg',
    '952787_0f90501df956446f93adb797c7e9f787~mv2.png': '0f90501df956.jpg',
    '952787_1bb9e51e18084c429eedba7d528d9d33~mv2.jpg': '1bb9e51e1808.jpg',
    '952787_1c684e10be094ca584af9b4cf5a04abe~mv2.png': '1c684e10be09.jpg',
    '952787_1d076b1fc8f14f5ab72956eff2c0433e~mv2.jpg': '1d076b1fc8f1.jpg',
    '952787_22b054e923d24111a5d007fbe1fd048f~mv2.jpg': '22b054e923d2.jpg',
    '952787_23bb46c7551540d4b6631f9ceaf12911~mv2.jpg': '23bb46c75515.jpg',
    '952787_250d67a9fabf4973bcde54f948a225b3~mv2.jpg': '250d67a9fabf.jpg',
    '952787_26a50047e88545a18d5e6c89816805bc~mv2.jpg': '26a50047e885.jpg',
    '952787_27ef97fc9ab247f9ac0396528bcb722b~mv2.png': '27ef97fc9ab2.png',
    '952787_2886565a745a486fa6336ab8b57c9a15~mv2.png': '2886565a745a.jpg',
    '952787_2c289935d14a4992b20f77b49e988dba~mv2.jpg': '2c289935d14a.jpg',
    '952787_2d330c92a5d342099b7d4258256ffa11~mv2.jpg': '2d330c92a5d3.jpg',
    '952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg': '3029b3642749.jpg',
    '952787_3194edd0c0244a54bafb5f0a2625919a~mv2.png': '3194edd0c024.jpg',
    '952787_3483752836144268b346adf78f3b398f~mv2.jpg': '348375283614.jpg',
    '952787_3d324467583f4cb8a092438d1e6a6872~mv2.png': '3d324467583f.png',
    '952787_3fd41e325bc9449296516cd2e286d93f~mv2.png': '3fd41e325bc9.png',
    '952787_47fb234e9fc643c685154b62a85432c9~mv2.jpg': '47fb234e9fc6.jpg',
    '952787_4ee43fd7e9794e2585f94ff3b0ba89e8~mv2.jpg': '4ee43fd7e979.jpg',
    '952787_515cfff1c9a64aa9b330a027322b9e7a~mv2.jpg': '515cfff1c9a6.jpg',
    '952787_6a8b5ab3b00d41bcb1a8915073aa4861~mv2.jpg': '6a8b5ab3b00d.jpg',
    '952787_6dd07347e2b24fab89e9fdcee6240889~mv2.png': '6dd07347e2b2.png',
    '952787_74c14938b43548f8a3241d08e1b5c4df~mv2.jpg': '74c14938b435.jpg',
    '952787_7c95bd58cf3440f480b04e9672c06802~mv2.jpg': '7c95bd58cf34.jpg',
    '952787_7d63895b8b894bb0b1dbd482101a18d0~mv2.jpg': '7d63895b8b89.jpg',
    '952787_8b207104bf0d43e5aa4c288936e9fec3~mv2.png': '8b207104bf0d.jpg',
    '952787_930a6679ab89472ea4b37d34205490f7~mv2.png': '930a6679ab89.png',
    '952787_9a7ffc3f7a2e47d18e2086d04b3b9341~mv2.jpg': '9a7ffc3f7a2e.jpg',
    '952787_9bc781dfae87479dae7fd84ed8b09c42~mv2.jpg': '9bc781dfae87.jpg',
    '952787_a0ed48c8d5dd4e2f819407b391d6499c~mv2.png': 'a0ed48c8d5dd.png',
    '952787_a667b39095f54b15824f7157c48f4afa~mv2.jpg': 'a667b39095f5.jpg',
    '952787_a67b7dcf552942a294501fc5c8a044f8~mv2.jpg': 'a67b7dcf5529.jpg',
    '952787_aa431e7ae48a45f59960aac33ffd6c8b~mv2.jpg': 'aa431e7ae48a.jpg',
    '952787_ab1a9837b67f48ff85499555bb28ceba~mv2.png': 'ab1a9837b67f.png',
    '952787_bdf86d20b5ef4120a1876cf17c6718f4~mv2.png': 'bdf86d20b5ef.jpg',
    '952787_bf04b5da3fbe466388fd7b0ce1011bd7~mv2.jpg': 'bf04b5da3fbe.jpg',
    '952787_c707827028d143a594404076e61331be~mv2.jpg': 'c707827028d1.jpg',
    '952787_c790bde9bfb74673a9c563990ab577d1~mv2.jpg': 'c790bde9bfb7.jpg',
    '952787_d42f442bb8264e678cbc88bdc2824eff~mv2.jpg': 'd42f442bb826.jpg',
    '952787_e0d14697042d448cb553e113bb99895a~mv2.jpg': 'e0d14697042d.jpg',
    '952787_e3e293ea8aca4eae85457a5a8007e670~mv2.jpg': 'e3e293ea8aca.jpg',
    '952787_e8ab6be92bd54b05859482cb8c9b5bb2~mv2.jpg': 'e8ab6be92bd5.jpg',
    '952787_ef8a0cd30f94496d9491f4d1caa3f202~mv2.jpg': 'ef8a0cd30f94.jpg',
    '952787_f6e5b9acd62049db802bcfd86e7fd352~mv2.jpg': 'f6e5b9acd620.jpg',
    '952787_fe368fa20ed346b78f71f7a717b270fd~mv2.jpg': 'fe368fa20ed3.jpg'
  };
  /** Site image by media id: wix(id, width) picks the 800px copy for small slots */
  const wix = (id, w) => {
    const f = LOCAL[id] || id;
    if (/^gallery\//.test(f)) return MEDIA + (w && w <= 900 ? f.replace(/\.webp$/, '-800.webp') : f);   // trip stills: WebP only, 1600 + 800
    const g = w && w <= 800 && /\.jpe?g$/i.test(f) ? f.replace(/\.jpe?g$/i, '-800.jpg') : f;
    return MEDIA + g.replace(/\.jpe?g$/i, '.webp');   // every photo has a WebP twin; the JPEGs stay as masters and share cards
  };
  /** The JPEG master, for share cards and structured data */
  IC.wixJpg = id => MEDIA + (LOCAL[id] || id);
  IC.wix = wix;

  /* Each package page opens on a high-resolution photo of its destination: assets/img/hero/dest-<key>-2400.webp
     (and -1280 for phones). Credits are in the README. */
  IC.destHero = {
    'danang-6d4n-bana-overnight': 'danang',
    'danang-5d3n-bana-overnight': 'golden-bridge-walk',
    'danang-6d4n-charter': 'hoian-lanterns',
    'danang-5d3n-charter': 'dragon-bridge',
    'rose-danang-6d4n': 'hoian-boats',
    'rose-danang-5d3n': 'danang-beach',
    'danang-4d3n': 'dragon-bridge-day',
    'danang-4d3n-z2': 'marble-mountains',
    'hanoi-sapa-4d3n': 'sapa',
    'hanoi-sapa-halong-5d4n': 'hanoi-flags',
    'hanoi-sapa-halong-5d3n-charter': 'halong-boat',
    'hanoi-sapa-halong-5d3n-charter-classic': 'hanoi-train-street',
    'hanoi-sapa-halong-6d4n-charter': 'fansipan-train',
    'hanoi-sapa-halong-6d4n-charter-classic': 'halong',
    'shanghai-disneyland-4d3n': 'shanghai-disney',
    'shanghai-5d3n': 'shanghai',
    'shanghai-mini-kyoto-5d4n': 'shanghai',
    'shanghai-mini-kyoto-6d4n': 'west-lake',
    'shanghai-5d4n-no-shopping': 'shanghai',
    'avatar-shanghai-5d4n': 'zhangjiajie',
    'shanghai-hangzhou-wuzhen-5d4n': 'wuzhen',
    'shanghai-hangzhou-wuxi-6d5n': 'west-lake',
    'adora-cruise-shanghai-5d4n': 'cruise-ship',
    'beijing-5d4n-no-shopping': 'great-wall',
    'beijing-shanghai-7d6n': 'great-wall',
    'beijing-shanghai-8d7n': 'forbidden-city',
    'avatar-furong-chongqing-8d7n': 'chongqing-night',
    'avatar-furong-no-shopping': 'zhangjiajie',
    'avatar-skiing-chongqing-8d7n': 'chongqing-night',
    'charming-yunnan-8d7n': 'yunnan',
    'harbin-7d6n': 'harbin-ice'
  };

  IC.media = {
    logo: wix('952787_6dd07347e2b24fab89e9fdcee6240889~mv2.png'),
    mark: wix('952787_ab1a9837b67f48ff85499555bb28ceba~mv2.png'),
    heroHome: '952787_7d63895b8b894bb0b1dbd482101a18d0~mv2.jpg',
    heroTours: '952787_1d076b1fc8f14f5ab72956eff2c0433e~mv2.jpg',
    // Service icons: 240px PNG copies shown at 26-58px.
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
    visayas: { label: 'Boracay & Palawan', blurb: 'The Philippines’ most famous beaches and islands.' },
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
    'Heritage of Cebu Monument': 'A sculptural tableau in Parian by Eduardo Castrillo depicting key events in Cebu’s history.',
    'Casa Gorordo & Yap-Sandiego Museum': 'Two of Cebu’s finest ancestral homes: the 19th-century Casa Gorordo and the 17th-century Yap-Sandiego house, among the oldest in the Philippines.',
    'Casa Gorordo Museum': 'A 19th-century bahay na bato that was home to Cebu’s first Filipino bishop, restored as a lifestyle museum.',
    'Taoist Temple': 'A Chinese temple in Beverly Hills, Cebu City, built in 1972 with dragon gates and views over the city.',
    'Alegre Guitar Factory': 'A family-run workshop in Lapu-Lapu City, Mactan, famous for handcrafted guitars and ukuleles.',
    // Visayas & Palawan
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

  /* Vietnam packages from Manila and China packages from Cebu. Itineraries, inclusions, hotels and notes are transcribed from the operator’s
     itinerary PDFs; departure dates and rates come from its live availability list. Departures that are sold out or
     have fewer than 10 seats left are not listed. */
  IC.tours = [
    {
      "id": "danang-6d4n-bana-overnight",
      "name": "Da Nang Charter Flight 6D4N Tour with Ba Na Hills Overnight Stay",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "6 days 4 nights",
      "days": 6,
      "status": "available",
      "featured": true,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 29888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-05-05",
      "image": "vn-danang.jpg",
      "alt": "The Golden Bridge held by giant stone hands at Ba Na Hills, Da Nang",
      "gallery": [
        "vn-danang.jpg"
      ],
      "summary": "Charter flight to Da Nang with a night at the 5★ Mercure Danang French Village Bana Hills, then Hai Van Pass, Canaan Island, Hoi An, Lady Buddha and the Cham Museum.",
      "overview": "Fly from Manila to Da Nang on a VietJet Air charter and go straight to Ba Na Hills for the cable car and the Golden Bridge, with your first night at the Mercure Danang French Village Bana Hills or similar 5★. The next three nights are at the Nagila Boutique Hotel or similar 4★. Along the way you will drive the Hai Van Pass, ride a coconut boat at Canaan Island, explore Hoi An Ancient Town, see Lady Buddha and visit the Cham Museum, with an air-conditioned bus and an English-speaking guide.",
      "travelDates": [
        {
          "d": "Jan 17–21",
          "y": 2027
        },
        {
          "d": "Jan 22–26",
          "y": 2027
        },
        {
          "d": "Jan 24–28",
          "y": 2027
        },
        {
          "d": "Jan 31–Feb 4",
          "y": 2027
        },
        {
          "d": "Feb 5–9",
          "y": 2027,
          "add": 5000
        },
        {
          "d": "Feb 7–11",
          "y": 2027
        },
        {
          "d": "Feb 12–16",
          "y": 2027
        },
        {
          "d": "Feb 14–18",
          "y": 2027
        },
        {
          "d": "Feb 19–23",
          "y": 2027
        },
        {
          "d": "Feb 21–25",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Feb 26–Mar 2",
          "y": 2027
        },
        {
          "d": "Feb 28–Mar 4",
          "y": 2027
        },
        {
          "d": "Mar 5–9",
          "y": 2027
        },
        {
          "d": "Mar 7–11",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Mar 12–16",
          "y": 2027
        },
        {
          "d": "Mar 14–18",
          "y": 2027
        },
        {
          "d": "Mar 19–23",
          "y": 2027
        },
        {
          "d": "Mar 26–30",
          "y": 2027,
          "add": 8000
        },
        {
          "d": "Mar 28–Apr 1",
          "y": 2027
        },
        {
          "d": "Apr 2–6",
          "y": 2027
        },
        {
          "d": "Apr 4–8",
          "y": 2027
        },
        {
          "d": "Apr 9–13",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Apr 16–20",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Apr 18–22",
          "y": 2027
        },
        {
          "d": "Apr 23–27",
          "y": 2027
        },
        {
          "d": "Apr 30–May 4",
          "y": 2027,
          "add": 8000
        }
      ],
      "travelDatesNote": "Departures from Manila, Jan 17–21 2027 to Apr 30–May 4 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Da Nang – Ba Na Hills",
          "items": [
            "Fly Manila to Da Nang; meet your tour guide at the airport",
            "Breakfast on arrival",
            "Transfer to Ba Na Hills and ride the world’s longest single-line cable car up the mountain",
            "Admire the beautiful old French-style architecture (French Village)",
            "Walk on the Buddha Hand Bridge (Golden Bridge)",
            "Go to the hotel and check in",
            "Hotel buffet dinner",
            "Overnight: Mercure Danang French Village Bana Hills or similar 5★ (meals: B/X/D)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Hai Van Pass",
          "items": [
            "Breakfast, then visit a local mini supermarket",
            "Drive through Hai Van Pass and Lang Co to enjoy the coastal road known as the “Bai Li Gallery”",
            "Dinner, then transfer to the hotel and check in",
            "Overnight: Nagila Boutique Hotel or similar 4★ (meals: B/L/D)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Canaan Island – Hoi An",
          "items": [
            "Breakfast, then visit a latex shop",
            "Canaan Island: coconut boat ride",
            "Hoi An Ancient Town",
            "Dinner, then transfer to the hotel and check in",
            "Overnight: Nagila Boutique Hotel or similar 4★ (meals: B/L/D)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Da Nang city tour",
          "items": [
            "Breakfast, then Son Tra Peninsula: admire the 67-metre-high Lady Buddha overlooking the sea",
            "APEC Park",
            "Da Nang Cathedral (Pink Church)",
            "Visit a silk shop",
            "Transfer to the hotel and check in",
            "Overnight: Nagila Boutique Hotel or similar 4★ (meals: B/L/X)"
          ]
        },
        {
          "day": "Day 5–6",
          "title": "Cham Museum and fly home",
          "items": [
            "Breakfast, then visit a jewelry shop",
            "Cham Museum",
            "Dragon Bridge (“Lovers Bridge”)",
            "Transfer to the airport and fly back to Manila",
            "Meals: B/L/X"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila – Da Nang – Manila with VietJet Air",
        "Baggage allowance: 20 kg per person per way, plus 7 kg carry-on",
        "4 nights’ accommodation, twin sharing, at the hotel of choice with daily hotel breakfast",
        "7 meals included",
        "Sightseeing tours as specified in the itinerary, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide service"
      ],
      "exclusions": [
        "Visa (if needed)",
        "Extra baggage allowance",
        "Single supplement: USD 95 per person",
        "Philippine tax: PHP 1,620 per person",
        "Terminal fees: USD 42 per person (Da Nang and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 5 days = USD 25 per person",
        "Personal expenses such as telephone calls and minibar",
        "Fuel surcharge: PHP 2,480 per person for the round trip (subject to change)"
      ],
      "optional": [
        "Han River Cruise (night view + 1 drink) + Vietnamese massage + buffet dinner: USD 99 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: Mercure Danang French Village Bana Hills or similar 5★",
        "Day 2-4: Nagila Boutique Hotel or similar 4★"
      ],
      "notes": [
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included.",
        "Child with bed pays the adult rate; a lower rate applies to a child without bed (aged 2-5).",
        "Rooms are twin sharing. A solo traveller (including a child with bed) will be paired with another guest; if they decline, the single supplement of USD 95 applies.",
        "Mercure Danang French Village Bana Hills is quoted on a twin basis. If a triple room is requested for the whole trip, an extra USD 55 per person applies for the first night.",
        "This tour includes shop visits: Latex Shop, Silk Shop and Jewelry Shop.",
        "If the hotel is not available on your dates, a similar hotel will be used.",
        "The schedule and meal menus may change depending on local conditions.",
        "Some departure dates carry a peak-date surcharge (see the departure list)."
      ],
      "places": [
        "Ba Na Hills",
        "Golden Bridge",
        "French Village",
        "Hai Van Pass",
        "Lang Co",
        "Canaan Island",
        "Hoi An Ancient Town",
        "Son Tra Peninsula",
        "Lady Buddha",
        "APEC Park",
        "Da Nang Cathedral (Pink Church)",
        "Cham Museum",
        "Dragon Bridge"
      ],
      "posters": [
        "vn-poster-danang-6d4n-bana-overnight-0.jpg",
        "vn-poster-danang-6d4n-bana-overnight-1.jpg",
        "vn-poster-danang-6d4n-bana-overnight-2.jpg"
      ],
      "posterSize": [
        507,
        800
      ]
    },
    {
      "id": "danang-5d3n-bana-overnight",
      "name": "Da Nang Charter Flight 5D3N Tour with Ba Na Hills Overnight Stay",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "5 days 3 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 27888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-05-02",
      "image": "vn-golden-bridge-walk.jpg",
      "alt": "Visitors on the Golden Bridge at Ba Na Hills",
      "gallery": [
        "vn-golden-bridge-walk.jpg"
      ],
      "summary": "Charter flight to Da Nang with a night at the 5★ Mercure Danang French Village Bana Hills, then Hai Van Pass, Canaan Island, Hoi An and Da Nang city sights.",
      "overview": "Fly from Manila to Da Nang on a VietJet Air charter and head straight to Ba Na Hills for the cable car and the Golden Bridge, with your first night at the Mercure Danang French Village Bana Hills or similar 5★. The next two nights are at the Nagila Boutique Hotel or similar 4★. You will also drive the Hai Van Pass, take a coconut boat ride at Canaan Island, wander Hoi An Ancient Town and see Lady Buddha, with an air-conditioned bus and an English-speaking guide.",
      "travelDates": [
        {
          "d": "Jan 20–23",
          "y": 2027
        },
        {
          "d": "Jan 27–30",
          "y": 2027
        },
        {
          "d": "Feb 3–6",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Feb 17–20",
          "y": 2027
        },
        {
          "d": "Feb 24–27",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Mar 3–6",
          "y": 2027
        },
        {
          "d": "Mar 10–13",
          "y": 2027,
          "add": 5000
        },
        {
          "d": "Mar 17–20",
          "y": 2027
        },
        {
          "d": "Mar 31–Apr 3",
          "y": 2027
        },
        {
          "d": "Apr 7–10",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Apr 28–May 1",
          "y": 2027,
          "add": 3000
        }
      ],
      "travelDatesNote": "Departures from Manila, Jan 20–23 2027 to Apr 28–May 1 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Da Nang – Ba Na Hills",
          "items": [
            "Fly Manila to Da Nang; meet your tour guide at the airport",
            "Breakfast on arrival",
            "Transfer to Ba Na Hills and ride the world’s longest single-line cable car up the mountain",
            "Admire the beautiful old French-style architecture (French Village)",
            "Walk on the Buddha Hand Bridge (Golden Bridge)",
            "Go to the hotel and check in",
            "Hotel buffet dinner",
            "Overnight: Mercure Danang French Village Bana Hills or similar 5★ (meals: B/X/D)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Hai Van Pass",
          "items": [
            "Breakfast, then visit a local mini supermarket",
            "Drive through Hai Van Pass and Lang Co to enjoy the coastal road known as the “Bai Li Gallery”",
            "Dinner, then transfer to the hotel and check in",
            "Overnight: Nagila Boutique Hotel or similar 4★ (meals: B/L/D)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Canaan Island – Hoi An",
          "items": [
            "Breakfast, then visit a latex shop",
            "Canaan Island: coconut boat ride",
            "Hoi An Ancient Town",
            "Transfer to the hotel and check in",
            "Overnight: Nagila Boutique Hotel or similar 4★ (meals: B/L/X)"
          ]
        },
        {
          "day": "Day 4–5",
          "title": "Da Nang city and fly home",
          "items": [
            "Breakfast, then visit a silk shop",
            "Son Tra Peninsula: admire the 67-metre-high Lady Buddha overlooking the sea",
            "Dragon Bridge (“Lovers Bridge”)",
            "APEC Park",
            "Da Nang Cathedral (Pink Church)",
            "Visit a jewelry shop",
            "Transfer to the airport and fly back to Manila",
            "Meals: B/L/X"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila – Da Nang – Manila with VietJet Air",
        "Baggage allowance: 20 kg per person per way, plus 7 kg carry-on",
        "3 nights’ accommodation, twin sharing, at the hotel of choice with daily hotel breakfast",
        "5 meals included",
        "Sightseeing tours as specified in the itinerary, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide service"
      ],
      "exclusions": [
        "Visa (if needed)",
        "Extra baggage allowance",
        "Single supplement: USD 80 per person",
        "Philippine tax: PHP 1,620 per person",
        "Terminal fees: USD 42 per person (Da Nang and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Personal expenses such as telephone calls and minibar",
        "Fuel surcharge: charged per person for the round trip (subject to change)"
      ],
      "optional": [
        "Han River Cruise (night view + 1 drink) + Vietnamese massage + buffet dinner: USD 99 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: Mercure Danang French Village Bana Hills or similar 5★",
        "Day 2-3: Nagila Boutique Hotel or similar 4★"
      ],
      "notes": [
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included.",
        "Child with bed pays the adult rate; a lower rate applies to a child without bed (aged 2-5).",
        "Rooms are twin sharing. A solo traveller (including a child with bed) will be paired with another guest; if they decline, the single supplement of USD 80 applies.",
        "Mercure Danang French Village Bana Hills is quoted on a twin basis. If a triple room is requested for the whole trip, an extra USD 55 per person applies for the first night.",
        "This tour includes shop visits: Latex Shop, Silk Shop and Jewelry Shop.",
        "If the hotel is not available on your dates, a similar hotel will be used.",
        "The schedule and meal menus may change depending on local conditions.",
        "Some departure dates carry a peak-date surcharge (see the departure list)."
      ],
      "places": [
        "Ba Na Hills",
        "Golden Bridge",
        "French Village",
        "Hai Van Pass",
        "Lang Co",
        "Canaan Island",
        "Hoi An Ancient Town",
        "Son Tra Peninsula",
        "Lady Buddha",
        "Dragon Bridge",
        "APEC Park",
        "Da Nang Cathedral (Pink Church)"
      ],
      "posters": [
        "vn-poster-danang-5d3n-bana-overnight-0.jpg",
        "vn-poster-danang-5d3n-bana-overnight-1.jpg"
      ],
      "posterSize": [
        518,
        800
      ]
    },
    {
      "id": "danang-6d4n-charter",
      "name": "Da Nang Charter Flight 6D4N Tour (Sea Garden Hotel)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "6 days 4 nights",
      "days": 6,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 24888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-05-05",
      "image": "vn-hoian-lanterns.jpg",
      "alt": "Lanterns over a street in Hoi An Ancient Town",
      "gallery": [
        "vn-hoian-lanterns.jpg"
      ],
      "summary": "Six days in Da Nang on a VietJet Air charter: Canaan Island, Hoi An, Ba Na Hills, Golden Bridge, Cham Museum, Dragon Bridge and Hai Van Pass.",
      "overview": "Take the VietJet Air charter from Manila and spend four nights at Sea Garden Hotel or a similar local 4-star in Da Nang. The tour covers the Lady Buddha at Son Tra, a coconut boat ride at Canaan Island, Hoi An Ancient Town, Ba Na Hills and the Golden Bridge, the Cham Museum and Da Nang city sights, and the scenic Hai Van Pass. An English-speaking guide and an air-conditioned bus (one seat per person) are included.",
      "travelDates": [
        {
          "d": "Jan 1–5",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Jan 10–14",
          "y": 2027
        },
        {
          "d": "Jan 17–21",
          "y": 2027
        },
        {
          "d": "Jan 22–26",
          "y": 2027
        },
        {
          "d": "Jan 24–28",
          "y": 2027
        },
        {
          "d": "Jan 29–Feb 2",
          "y": 2027
        },
        {
          "d": "Jan 31–Feb 4",
          "y": 2027
        },
        {
          "d": "Feb 5–9",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Feb 7–11",
          "y": 2027
        },
        {
          "d": "Feb 12–16",
          "y": 2027
        },
        {
          "d": "Feb 14–18",
          "y": 2027
        },
        {
          "d": "Feb 21–25",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Feb 26–Mar 2",
          "y": 2027
        },
        {
          "d": "Feb 28–Mar 4",
          "y": 2027
        },
        {
          "d": "Mar 5–9",
          "y": 2027
        },
        {
          "d": "Mar 7–11",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Mar 12–16",
          "y": 2027
        },
        {
          "d": "Mar 14–18",
          "y": 2027
        },
        {
          "d": "Mar 21–25",
          "y": 2027,
          "add": 5000
        },
        {
          "d": "Mar 26–30",
          "y": 2027,
          "add": 8000
        },
        {
          "d": "Mar 28–Apr 1",
          "y": 2027
        },
        {
          "d": "Apr 2–6",
          "y": 2027
        },
        {
          "d": "Apr 4–8",
          "y": 2027
        },
        {
          "d": "Apr 9–13",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Apr 11–15",
          "y": 2027
        },
        {
          "d": "Apr 18–22",
          "y": 2027
        },
        {
          "d": "Apr 25–29",
          "y": 2027
        },
        {
          "d": "Apr 30–May 4",
          "y": 2027,
          "add": 8000
        }
      ],
      "travelDatesNote": "Departures from Manila, Jan 1–5 2027 to Apr 30–May 4 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Da Nang – Canaan Island – Hoi An",
          "items": [
            "Charter flight Manila to Da Nang (VJ MNL–DAD, 02:05–03:25, reference time)",
            "Meet your tour guide at the airport",
            "Breakfast on arrival",
            "Son Tra Peninsula: admire the 67-metre Lady Buddha overlooking the sea",
            "Canaan Island coconut boat ride",
            "Hoi An Ancient Town",
            "Dinner, then transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 2",
          "title": "Ba Na Hills",
          "items": [
            "After breakfast, transfer to Ba Na Hills and ride the world’s longest single-line cable car up the mountain",
            "Admire the old French-style architecture of the French Village",
            "Walk the Golden Bridge (Buddha hand bridge)",
            "Visit a local mini supermarket",
            "Transfer to hotel and check in",
            "Meals: breakfast"
          ]
        },
        {
          "day": "Day 3",
          "title": "Da Nang city sights",
          "items": [
            "After breakfast",
            "Visit a latex shop",
            "APEC Park",
            "Visit a jewelry shop",
            "Da Nang Cathedral (Pink Church)",
            "Dinner, then transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 4",
          "title": "Cham Museum and Dragon Bridge",
          "items": [
            "After breakfast",
            "Cham Museum",
            "Dragon Bridge (Lovers’ Bridge)",
            "Visit a silk shop",
            "Dinner, then transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 5–6",
          "title": "Hai Van Pass – Manila",
          "items": [
            "After breakfast",
            "Hai Van Pass and Lang Co: enjoy the coastal road known as the “Baili Gallery”",
            "Visit a treasure shop",
            "Transfer to the airport and fly back to Manila (VJ DAD–MNL, 21:30–01:05 next day, reference time)",
            "Meals: breakfast, lunch"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila – Da Nang – Manila on VietJet Air",
        "Baggage: 20 kg per person per way plus 7 kg carry-on",
        "4 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Sightseeing as listed, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide service"
      ],
      "exclusions": [
        "Visa, if needed",
        "Extra baggage allowance",
        "Single supplement: USD 80 per person",
        "Philippine tax: PHP 1,620 per person",
        "Terminal fees: USD 42 per person (Da Nang and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 5 days = USD 25 per person",
        "Personal expenses such as phone calls and minibar",
        "Fuel surcharge: USD 40 per person (subject to change)"
      ],
      "optional": [
        "Han River Cruise (night view + 1 drink) + Vietnamese massage + buffet dinner (USD 99 per person)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–4: Sea Garden Hotel or similar local 4★"
      ],
      "notes": [
        "Meal codes per the itinerary: Day 1 breakfast, lunch, dinner; Day 2 breakfast; Day 3 breakfast, lunch, dinner; Day 4 breakfast, lunch, dinner; Day 5–6 breakfast and lunch",
        "Flight times are for reference only; the charter arrives in the early morning of Day 1 and departs late on the last night",
        "Separate rates apply to adults and children with bed, and to children without bed (aged 2–5)",
        "Single travellers are paired with another guest to share a room; if they decline, the single supplement (USD 80) applies",
        "Shopping stops included in the rate: latex shop, jewelry shop, silk shop and treasure shop",
        "Schedule and meals may change with local conditions",
        "If the listed hotels are unavailable they are replaced with similar ones"
      ],
      "places": [
        "Son Tra Peninsula",
        "Lady Buddha",
        "Canaan Island",
        "Hoi An Ancient Town",
        "Ba Na Hills",
        "French Village",
        "Golden Bridge",
        "APEC Park",
        "Da Nang Cathedral (Pink Church)",
        "Cham Museum",
        "Dragon Bridge",
        "Hai Van Pass",
        "Lang Co"
      ],
      "posters": [
        "vn-poster-danang-6d4n-charter-0.jpg",
        "vn-poster-danang-6d4n-charter-1.jpg",
        "vn-poster-danang-6d4n-charter-2.jpg"
      ],
      "posterSize": [
        533,
        800
      ]
    },
    {
      "id": "danang-5d3n-charter",
      "name": "Da Nang Charter Flight 5D3N Tour (Sea Garden Hotel)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "5 days 3 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 22888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-05-02",
      "image": "vn-dragon-bridge.jpg",
      "alt": "The Dragon Bridge breathing fire over the Han River at night, Da Nang",
      "gallery": [
        "vn-dragon-bridge.jpg"
      ],
      "summary": "Five days in Da Nang on a VietJet Air charter: Son Tra, Canaan Island, Hoi An, Ba Na Hills, Golden Bridge, Dragon Bridge and Hai Van Pass.",
      "overview": "Take the VietJet Air charter from Manila and spend three nights at Sea Garden Hotel or a similar local 4-star in Da Nang. You will see the Lady Buddha at Son Tra, ride a coconut boat at Canaan Island, walk Hoi An Ancient Town, take the cable car to Ba Na Hills and cross the Golden Bridge, then drive the Hai Van Pass before flying home. An English-speaking guide and an air-conditioned bus (one seat per person) are included.",
      "travelDates": [
        {
          "d": "Nov 4–7",
          "add": 2000
        },
        {
          "d": "Nov 25–28",
          "add": 4000
        },
        {
          "d": "Dec 2–5",
          "add": 2000
        },
        {
          "d": "Jan 20–23",
          "y": 2027
        },
        {
          "d": "Jan 27–30",
          "y": 2027
        },
        {
          "d": "Feb 3–6",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Feb 10–13",
          "y": 2027
        },
        {
          "d": "Feb 24–27",
          "y": 2027,
          "add": 2000
        },
        {
          "d": "Mar 3–6",
          "y": 2027
        },
        {
          "d": "Mar 10–13",
          "y": 2027,
          "add": 5000
        },
        {
          "d": "Mar 17–20",
          "y": 2027
        },
        {
          "d": "Mar 24–27",
          "y": 2027,
          "add": 8000
        },
        {
          "d": "Mar 31–Apr 3",
          "y": 2027
        },
        {
          "d": "Apr 7–10",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Apr 28–May 1",
          "y": 2027,
          "add": 3000
        }
      ],
      "travelDatesNote": "Departures from Manila, Nov 4–7 2026 to Apr 28–May 1 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Da Nang – Canaan Island – Hoi An",
          "items": [
            "Charter flight Manila to Da Nang (VJ MNL–DAD 02:05–03:25, reference time)",
            "Meet your tour guide at the airport",
            "Breakfast on arrival",
            "Son Tra Peninsula: admire the 67-metre Lady Buddha overlooking the sea",
            "Canaan Island coconut boat ride",
            "Hoi An Ancient Town",
            "Dinner, then transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 2",
          "title": "Ba Na Hills",
          "items": [
            "After breakfast, transfer to Ba Na Hills and ride the world’s longest single-line cable car up the mountain",
            "Admire the old French-style architecture of the French Village",
            "Walk the Golden Bridge (Buddha hand bridge)",
            "Visit a local mini supermarket",
            "Transfer to hotel and check in",
            "Meals: breakfast"
          ]
        },
        {
          "day": "Day 3",
          "title": "Da Nang city sights",
          "items": [
            "After breakfast",
            "Visit a latex shop",
            "Dragon Bridge (Lovers’ Bridge)",
            "APEC Park",
            "Da Nang Cathedral (Pink Church)",
            "Visit a silk shop",
            "Dinner, then transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 4–5",
          "title": "Hai Van Pass – Manila",
          "items": [
            "After breakfast",
            "Visit a treasure shop",
            "Enjoy Vietnamese coffee and bread",
            "Hai Van Pass and Lang Co: enjoy the coastal road known as the “Baili Gallery”",
            "Visit a jewelry shop",
            "Transfer to the airport and fly back to Manila (VJ DAD–MNL 21:30–01:05 next day, reference time)",
            "Meals: breakfast, lunch"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila – Da Nang – Manila on VietJet Air",
        "Baggage: 20 kg per person per way plus 7 kg carry-on",
        "3 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Sightseeing as listed, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide service"
      ],
      "exclusions": [
        "Visa, if needed",
        "Extra baggage allowance",
        "Single supplement: USD 65 per person",
        "Philippine tax: PHP 1,620 per person",
        "Terminal fees: USD 42 per person (Da Nang and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Personal expenses such as phone calls and minibar",
        "Fuel surcharge: USD 40 per person for the round trip (subject to change)"
      ],
      "optional": [
        "Han River Cruise (night view + 1 drink) + Vietnamese massage + buffet dinner (USD 99 per person)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–3: Sea Garden Hotel or similar local 4★"
      ],
      "notes": [
        "Meal codes per the itinerary: Day 1 breakfast, lunch, dinner; Day 2 breakfast; Day 3 breakfast, lunch, dinner; Day 4–5 breakfast and lunch",
        "Flight times are for reference only; the charter arrives in the early morning of Day 1 and departs late on the last night",
        "Separate rates apply to adults and children with bed, and to children without bed (aged 2–5)",
        "Single travellers are paired with another guest to share a room; if they decline, the single supplement (USD 65) applies",
        "Shopping stops included in the rate: latex shop, silk shop, jewelry shop and treasure shop",
        "Schedule and meals may change with local conditions",
        "If the listed hotels are unavailable they are replaced with similar ones"
      ],
      "places": [
        "Son Tra Peninsula",
        "Lady Buddha",
        "Canaan Island",
        "Hoi An Ancient Town",
        "Ba Na Hills",
        "French Village",
        "Golden Bridge",
        "Dragon Bridge",
        "APEC Park",
        "Da Nang Cathedral (Pink Church)",
        "Hai Van Pass",
        "Lang Co"
      ],
      "posters": [
        "vn-poster-danang-5d3n-charter-0.jpg",
        "vn-poster-danang-5d3n-charter-1.jpg",
        "vn-poster-danang-5d3n-charter-2.jpg"
      ],
      "posterSize": [
        565,
        800
      ]
    },
    {
      "id": "rose-danang-6d4n",
      "name": "Da Nang Charter Flight 6D4N Tour (Nagila Hotel)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "6 days 4 nights",
      "days": 6,
      "status": "available",
      "featured": true,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 23888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-07-01",
      "image": "vn-hoian-boats.jpg",
      "alt": "Lantern boats on the Thu Bon River in Hoi An",
      "gallery": [
        "vn-hoian-boats.jpg"
      ],
      "summary": "Charter flight from Manila to Da Nang with Canaan Island, Hoi An, Ba Na Hills and the Golden Bridge, plus 4 nights at a 4★ hotel and a private bus with an English-speaking guide.",
      "overview": "Fly from Manila to Da Nang on a VietJet Air charter and spend four nights at the Nagila Hotel or similar 4★, on twin-sharing rooms with daily breakfast. You will see Lady Buddha on Son Tra Peninsula, take a coconut boat ride at Canaan Island, stroll through Hoi An Ancient Town and ride the cable car up to Ba Na Hills to cross the Golden Bridge. A private bus and an English-speaking guide look after you throughout, and the tour ends with the scenic Hai Van Pass before your flight home.",
      "travelDates": [
        {
          "d": "Dec 5–9"
        },
        {
          "d": "Dec 7–11",
          "add": 3000
        },
        {
          "d": "Dec 12–16",
          "add": 3000
        },
        {
          "d": "Dec 14–18",
          "add": 3000
        },
        {
          "d": "Dec 21–25",
          "add": 8000
        },
        {
          "d": "Dec 28–Jan 1",
          "add": 8000
        },
        {
          "d": "Jan 2–6",
          "y": 2027,
          "add": 4000
        },
        {
          "d": "Jan 4–8",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jan 9–13",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jan 11–15",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jan 16–20",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jan 18–22",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jan 23–27",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jan 25–29",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jan 30–Feb 3",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Feb 1–5",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Feb 6–10",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Feb 8–12",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Feb 13–17",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Feb 15–19",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Feb 22–26",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Feb 27–Mar 3",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Mar 1–5",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Mar 6–10",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Mar 8–12",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Mar 13–17",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Mar 15–19",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Mar 20–24",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Mar 22–26",
          "y": 2027,
          "add": 6000
        },
        {
          "d": "Mar 27–31",
          "y": 2027,
          "add": 9000
        },
        {
          "d": "Mar 29–Apr 2",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Apr 3–7",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Apr 5–9",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Apr 10–14",
          "y": 2027,
          "add": 4000
        },
        {
          "d": "Apr 12–16",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Apr 19–23",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Apr 26–30",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 1–5",
          "y": 2027,
          "add": 9000
        },
        {
          "d": "May 3–7",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 8–12",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 10–14",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 15–19",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 17–21",
          "y": 2027,
          "add": 4000
        },
        {
          "d": "May 22–26",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 24–28",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 29–Jun 2",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 31–Jun 4",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jun 5–9",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jun 7–11",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jun 12–16",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Jun 14–18",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jun 19–23",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jun 21–25",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Jun 26–30",
          "y": 2027,
          "add": 1000
        }
      ],
      "travelDatesNote": "Departures from Manila, Dec 5–9 2026 to Jun 26–30 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Canaan Island – Hoi An",
          "items": [
            "Fly Manila to Da Nang (VJ8016, arriving 03:55–04:55 depending on the schedule); meet your tour guide at the airport",
            "Breakfast on arrival: enjoy “Pho Vietnam” rice noodle soup",
            "Son Tra Peninsula: admire the 67-metre-high Lady Buddha overlooking the sea",
            "Canaan Island: coconut boat ride",
            "Hoi An Ancient Town",
            "Dinner, then transfer to the hotel and check in",
            "Overnight: Nagila Hotel or similar 4★ (meals: B/L/D)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Da Nang – Ba Na Hills",
          "items": [
            "Breakfast, then transfer to Ba Na Hills",
            "Ride the world’s longest single-line cable car up the mountain",
            "Admire the beautiful old French-style architecture (French Village)",
            "Free shopping at the Pop Mart Castle shop",
            "Walk on the Buddha Hand Bridge (Golden Bridge)",
            "Visit a local mini supermarket",
            "Transfer to the hotel for a rest",
            "Overnight: Nagila Hotel or similar 4★ (meals: B/X/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Da Nang city tour",
          "items": [
            "Breakfast, then visit a latex shop",
            "APEC Park",
            "Enjoy Banh Xeo, the local Vietnamese pancake",
            "Visit a jewelry shop",
            "Da Nang Cathedral (Pink Church)",
            "Dinner, then transfer to the hotel for a rest",
            "Overnight: Nagila Hotel or similar 4★ (meals: B/L/D)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Da Nang culture and bridges",
          "items": [
            "Breakfast, then visit the Cham Museum",
            "Enjoy Vietnamese coffee and a break",
            "Dragon Bridge (“Lovers Bridge”)",
            "Visit a silk shop",
            "Dinner, then transfer to the hotel for a rest",
            "Overnight: Nagila Hotel or similar 4★ (meals: B/L/D)"
          ]
        },
        {
          "day": "Day 5–6",
          "title": "Hai Van Pass and fly home",
          "items": [
            "Breakfast, then drive through Hai Van Pass and Lang Co to enjoy the coastal road known as the “Bai Li Gallery”",
            "Visit a treasure shop",
            "Transfer to the airport and fly back to Manila (VJ8016, departing 23:05, arriving 02:40 the next day)",
            "Meals: B/L/X"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila – Da Nang – Manila with VietJet Air",
        "Baggage allowance: 20 kg per person per way, plus 7 kg carry-on",
        "4 nights’ accommodation, twin sharing, at the hotel of choice with daily hotel breakfast",
        "7 meals included",
        "Sightseeing tours as specified in the itinerary",
        "Private bus with English-speaking tour guide service"
      ],
      "exclusions": [
        "Visa (if needed)",
        "Extra baggage allowance",
        "Single supplement: USD 80 per person",
        "Philippine tax: PHP 1,620 per person",
        "Terminal fees: USD 42 per person (Da Nang and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 5 days = USD 25 per person",
        "Personal expenses such as telephone calls and minibar",
        "Fuel surcharge: USD 40 per person (rate subject to change)"
      ],
      "optional": [
        "Han River Cruise (night view) + Vietnamese massage + buffet dinner: USD 99 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1-4: Nagila Hotel or similar 4★"
      ],
      "notes": [
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included.",
        "Child with bed pays the adult rate; a lower rate applies to a child without bed (aged 2-5).",
        "Rooms are twin sharing. A solo traveller (including a child with bed) will be paired with another guest; if they decline, the single supplement of USD 80 applies.",
        "This tour includes shop visits: Latex Shop, Silk Shop, Jewelry Shop and Treasure Shop.",
        "If the hotel is not available on your dates, a similar hotel will be used.",
        "The schedule and meal menus may change depending on local conditions.",
        "Flights: outbound arrives in Da Nang early morning (03:55–04:55); return departs Da Nang 23:05 and lands in Manila 02:40 the next day.",
        "Some departure dates carry a peak-date surcharge (see the departure list)."
      ],
      "places": [
        "Son Tra Peninsula",
        "Lady Buddha",
        "Canaan Island",
        "Hoi An Ancient Town",
        "Ba Na Hills",
        "Golden Bridge",
        "French Village",
        "APEC Park",
        "Da Nang Cathedral (Pink Church)",
        "Cham Museum",
        "Dragon Bridge",
        "Hai Van Pass",
        "Lang Co"
      ],
      "posters": [
        "vn-poster-rose-danang-6d4n-0.jpg",
        "vn-poster-rose-danang-6d4n-1.jpg"
      ],
      "posterSize": [
        523,
        800
      ]
    },
    {
      "id": "rose-danang-5d3n",
      "name": "Da Nang Charter Flight 5D3N Tour (Nagila Hotel)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "5 days 3 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 22888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-06-28",
      "image": "vn-danang-beach.jpg",
      "alt": "Aerial view of Da Nang’s beach and city",
      "gallery": [
        "vn-danang-beach.jpg"
      ],
      "summary": "Five days in Da Nang on a VietJet Air charter: Pho breakfast, Canaan Island, Hoi An, Ba Na Hills with Pop Mart Castle, Banh Xeo and Hai Van Pass.",
      "overview": "Take the VietJet Air charter from Manila and stay three nights at Nagila Hotel or a similar local 4-star in Da Nang. Along with the Lady Buddha at Son Tra, a coconut boat ride at Canaan Island, Hoi An Ancient Town, Ba Na Hills and the Golden Bridge, this tour adds a Pho Viet Nam breakfast, free shopping at the Pop Mart Castle shop and local Banh Xeo pancakes. An English-speaking guide and a private bus are included.",
      "travelDates": [
        {
          "d": "Dec 10–13",
          "add": 1000
        },
        {
          "d": "Dec 17–20",
          "add": 2000
        },
        {
          "d": "Dec 31–Jan 3",
          "add": 8000
        },
        {
          "d": "Jan 7–10",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Jan 14–17",
          "y": 2027
        },
        {
          "d": "Jan 21–24",
          "y": 2027
        },
        {
          "d": "Jan 28–31",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Feb 4–7",
          "y": 2027
        },
        {
          "d": "Feb 11–14",
          "y": 2027
        },
        {
          "d": "Feb 18–21",
          "y": 2027
        },
        {
          "d": "Feb 25–28",
          "y": 2027
        },
        {
          "d": "Mar 4–7",
          "y": 2027
        },
        {
          "d": "Mar 11–14",
          "y": 2027
        },
        {
          "d": "Mar 18–21",
          "y": 2027
        },
        {
          "d": "Mar 25–28",
          "y": 2027,
          "add": 8000
        },
        {
          "d": "Apr 1–4",
          "y": 2027,
          "add": 8000
        },
        {
          "d": "Apr 8–11",
          "y": 2027
        },
        {
          "d": "Apr 29–May 2",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "May 6–9",
          "y": 2027
        },
        {
          "d": "May 13–16",
          "y": 2027
        },
        {
          "d": "May 20–23",
          "y": 2027
        },
        {
          "d": "May 27–30",
          "y": 2027
        },
        {
          "d": "Jun 3–6",
          "y": 2027
        },
        {
          "d": "Jun 10–13",
          "y": 2027
        },
        {
          "d": "Jun 17–20",
          "y": 2027
        },
        {
          "d": "Jun 24–27",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Manila, Dec 10–13 2026 to Jun 24–27 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Da Nang – Canaan Island – Hoi An",
          "items": [
            "Charter flight Manila to Da Nang (VJ8017 MNL–DAD 03:55–04:55, reference time)",
            "Meet your tour guide at the airport",
            "Breakfast on arrival",
            "Enjoy “Pho Viet Nam” rice noodle",
            "Son Tra Peninsula: admire the 67-metre Lady Buddha overlooking the sea",
            "Canaan Island coconut boat ride",
            "Hoi An Ancient Town",
            "Dinner, then transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 2",
          "title": "Ba Na Hills",
          "items": [
            "After breakfast, transfer to Ba Na Hills and ride the world’s longest single-line cable car up the mountain",
            "Admire the old French-style architecture of the French Village",
            "Free shopping at the Pop Mart Castle shop",
            "Walk the Golden Bridge (Buddha hand bridge)",
            "Visit a local mini supermarket",
            "Transfer to hotel and check in",
            "Meals: breakfast"
          ]
        },
        {
          "day": "Day 3",
          "title": "Da Nang city sights",
          "items": [
            "After breakfast",
            "Visit a latex shop",
            "Dragon Bridge (Lovers’ Bridge)",
            "Enjoy Banh Xeo, the local Vietnamese pancake",
            "APEC Park",
            "Da Nang Cathedral (Pink Church)",
            "Visit a silk shop",
            "Dinner, then transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 4–5",
          "title": "Hai Van Pass – Manila",
          "items": [
            "After breakfast",
            "Visit a treasure shop",
            "Enjoy Vietnamese coffee and bread",
            "Hai Van Pass and Lang Co: enjoy the coastal road known as the “Baili Gallery”",
            "Visit a jewelry shop",
            "Transfer to the airport and fly back to Manila (VJ8016 DAD–MNL 23:05–02:40 next day, reference time)",
            "Meals: breakfast, lunch"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila – Da Nang – Manila on VietJet Air",
        "Baggage: 20 kg per person per way plus 7 kg carry-on",
        "3 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Sightseeing as listed",
        "Private bus",
        "English-speaking tour guide service"
      ],
      "exclusions": [
        "Visa, if needed",
        "Extra baggage allowance",
        "Single supplement: USD 65 per person",
        "Philippine tax: PHP 1,620 per person",
        "Terminal fees: USD 42 per person (Da Nang and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Personal expenses such as phone calls and minibar",
        "Fuel surcharge: USD 40 per person for the round trip (subject to change)"
      ],
      "optional": [
        "Han River Cruise (night view + 1 drink) + Vietnamese massage + buffet dinner (USD 99 per person)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–3: Nagila Hotel or similar local 4★"
      ],
      "notes": [
        "Meal codes per the itinerary: Day 1 breakfast, lunch, dinner; Day 2 breakfast; Day 3 breakfast, lunch, dinner; Day 4–5 breakfast and lunch",
        "Flight times are for reference only; the charter arrives in the early morning of Day 1 and departs late on the last night",
        "Separate rates apply to adults and children with bed, and to children without bed (aged 2–5)",
        "Single travellers are paired with another guest to share a room; if they decline, the single supplement (USD 65) applies",
        "Shopping stops included in the rate: latex shop, silk shop, jewelry shop and treasure shop",
        "Schedule and meals may change with local conditions",
        "If the listed hotels are unavailable they are replaced with similar ones"
      ],
      "places": [
        "Son Tra Peninsula",
        "Lady Buddha",
        "Canaan Island",
        "Hoi An Ancient Town",
        "Ba Na Hills",
        "French Village",
        "Golden Bridge",
        "Dragon Bridge",
        "APEC Park",
        "Da Nang Cathedral (Pink Church)",
        "Hai Van Pass",
        "Lang Co",
        "Pop Mart Castle"
      ],
      "posters": [
        "vn-poster-rose-danang-5d3n-0.jpg",
        "vn-poster-rose-danang-5d3n-1.jpg"
      ],
      "posterSize": [
        531,
        800
      ]
    },
    {
      "id": "danang-4d3n",
      "name": "Da Nang 4D3N Tour",
      "subtitle": "Out Manila · Cebu Pacific",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "4 days 3 nights",
      "days": 4,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 23888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-06-22",
      "image": "vn-dragon-bridge-day.jpg",
      "alt": "The Dragon Bridge across the Han River, Da Nang",
      "gallery": [
        "vn-dragon-bridge-day.jpg"
      ],
      "summary": "Four days in Da Nang on Cebu Pacific: Canaan Island bamboo basket boat, Hoi An Ancient Town, Ba Na Hills and Golden Bridge, and Da Nang city sights.",
      "overview": "Fly Manila to Da Nang with Cebu Pacific and stay three nights in a local 4-star hotel (Han River Hotel or similar). You will ride a bamboo basket boat at Canaan Island, stroll Hoi An Ancient Town and its night market, take the cable car up to Ba Na Hills and see the Golden Bridge, then tour Da Nang city, Son Tra Peninsula and the Lady Buddha before the night flight home. A private coach and an English-speaking guide are included.",
      "travelDates": [
        {
          "d": "Mar 27–30",
          "y": 2027,
          "add": 6000
        },
        {
          "d": "Apr 17–20",
          "y": 2027,
          "add": 4000
        },
        {
          "d": "Jun 19–22",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Manila, Mar 27–30 2027 to Jun 19–22 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Da Nang",
          "items": [
            "Fly Manila to Da Nang (5J 5756, 19:25–21:30)",
            "Meet your tour guide at the airport",
            "Transfer to your Da Nang hotel to rest",
            "Meals: none"
          ]
        },
        {
          "day": "Day 2",
          "title": "Canaan Island – Hoi An Ancient Town",
          "items": [
            "Hotel breakfast",
            "Transfer to Camnam Island Coconut Village, a peaceful village that feels undisturbed by the outside world",
            "Ride a round bamboo basket boat (you can also learn to row it) and follow local fishermen along the Thu Bon River, learning about Vietnamese culture and history",
            "Transfer to Hoi An Ancient Town and admire its 17th-century architecture",
            "Visit the Fujian Guild Hall, Feng Xing Ancient House, the Japanese Covered Bridge and Bei Di Zhenwu temple, dedicated to the god said to suppress water monsters and protect peace",
            "Wander freely in Hoi An Night Market",
            "Transfer to hotel",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 3",
          "title": "Ba Na Hills",
          "items": [
            "Hotel breakfast",
            "Transfer to Ba Na Hills and ride the world’s longest single-line cable car up the mountain",
            "Admire the French Village and its old French-style architecture",
            "Buffet lunch",
            "Take the small mountainside train to another garden with a winery museum, hundreds of flowers and a small maze",
            "See the seat of Sakyamuni Buddha",
            "Walk the Golden Bridge held up by two giant hands, with golden guardrails on both sides",
            "Visit a latex shop and a jewelry shop",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 4",
          "title": "Da Nang city – Manila",
          "items": [
            "Hotel breakfast",
            "Visit the Cham Museum to learn about the cultural relics of Vietnam’s Cham period",
            "Visit Dragon Bridge, Love Bridge and APEC Park",
            "Shanshui Beach, known as the Gold Coast of Vietnam",
            "Drive to Son Tra Peninsula and admire the 67-metre Guanyin (Lady Buddha) overlooking the sea",
            "Visit a silk shop and a treasure shop",
            "Transfer to the airport and fly Da Nang to Manila (5J 5757, 22:30–02:25 next day)",
            "Meals: breakfast, lunch, dinner"
          ]
        }
      ],
      "inclusions": [
        "Economy round-trip airfare and taxes on Cebu Pacific, hand-carry 7 kg",
        "3 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Private coach with an English-speaking tour guide",
        "Sightseeing as listed, including first-way entrance fees",
        "Meals as listed in the itinerary"
      ],
      "exclusions": [
        "Personal expenses such as phone calls and minibar",
        "Check-in luggage and extra baggage allowance",
        "Travel insurance with Covid-19 coverage",
        "Philippine travel tax",
        "Visa, USD 40 per person (5–7 working days)",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Single supplement: USD 45 per person",
        "Taxes, surcharges and fees, which are subject to change"
      ],
      "optional": [
        "Han River Cruise (drink and fruit) + Vietnamese massage + Ao Dai show (USD 99 per person)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–3: Han River Hotel or similar local 4★"
      ],
      "notes": [
        "Meal codes per the itinerary: Day 1 none; Days 2, 3 and 4 breakfast / lunch / dinner",
        "Hand-carry 7 kg only; check-in luggage is not included",
        "Separate rates apply to adults and children with bed, and to children without bed (aged 2–5)",
        "Visa takes 5–7 working days",
        "Shopping stops included in the rate: latex shop, jewelry shop, silk shop and treasure shop",
        "Itinerary is subject to change without prior notice and to weather conditions",
        "If the listed hotels are unavailable they are replaced with similar ones"
      ],
      "places": [
        "Canaan Island",
        "Camnam Island Coconut Village",
        "Thu Bon River",
        "Hoi An Ancient Town",
        "Fujian Guild Hall",
        "Feng Xing Ancient House",
        "Japanese Covered Bridge",
        "Hoi An Night Market",
        "Ba Na Hills",
        "French Village",
        "Golden Bridge",
        "Cham Museum",
        "Dragon Bridge",
        "Love Bridge",
        "APEC Park",
        "Shanshui Beach",
        "Son Tra Peninsula",
        "Lady Buddha"
      ],
      "posters": [
        "vn-poster-danang-4d3n-0.jpg"
      ],
      "posterSize": [
        520,
        800
      ]
    },
    {
      "id": "danang-4d3n-z2",
      "name": "Da Nang 4D3N Tour via AirAsia",
      "subtitle": "Out Manila · AirAsia",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "4 days 3 nights",
      "days": 4,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 26888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-04-21",
      "image": "vn-marble-mountains.jpg",
      "alt": "A shrine inside a cave at the Marble Mountains, Da Nang",
      "gallery": [
        "vn-marble-mountains.jpg"
      ],
      "summary": "Four days in Da Nang on AirAsia with a 20 kg bag: Pink Church, Ba Na Hills and Golden Bridge, Canaan Island boat, Hoi An, Marble Mountains and My Khe Beach.",
      "overview": "Fly Manila to Da Nang on an early AirAsia flight (1 piece of 20 kg checked baggage included) and stay three nights in a local 4-star hotel. Day 1 starts with Da Nang Cathedral and Son Tra Peninsula, then Ba Na Hills and the Golden Bridge. Later days bring a bamboo basket boat and crab fishing at Canaan Island, Hoi An Ancient Town, the Marble Mountains and My Khe Beach. A private coach and an English-speaking guide are included.",
      "travelDates": [
        {
          "d": "Apr 18–21",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Manila, Apr 18–21 2027 to Apr 18–21 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Da Nang – Ba Na Hills",
          "items": [
            "Fly Manila to Da Nang (Z2 822, 06:05–07:35)",
            "Meet your tour guide at the airport",
            "Da Nang Cathedral (Pink Church)",
            "Nguyen Van Thoai Street",
            "Son Tra Peninsula and Linh Ung Pagoda",
            "Transfer to Ba Na Hills and ride the world’s longest single-line cable car, round trip",
            "Walk the Golden Bridge (Buddha hand bridge)",
            "Fantasy Park",
            "French Village",
            "Linh Ung Pagoda",
            "Mini supermarket stop",
            "Transfer to hotel and check in",
            "Meals: lunch"
          ]
        },
        {
          "day": "Day 2",
          "title": "Canaan Island – Hoi An Ancient Town",
          "items": [
            "Hotel breakfast",
            "Latex shop and jewelry shop",
            "Transfer to Camnam Island Coconut Village",
            "Ride a round bamboo basket boat and try fun crab fishing (about 1 hour)",
            "Transfer to Hoi An Ancient Town",
            "Visit the Fujian Guild Hall, Cantonese Assembly Hall, Tan Ky Old House and the Japanese Covered Bridge; make a wish with lotus lanterns",
            "Transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 3",
          "title": "Da Nang city sights",
          "items": [
            "Hotel breakfast",
            "Dragon Bridge, Love Bridge and the Dragon head and fish body statue fountain",
            "APEC Park",
            "Marble Mountains, including the upward lift",
            "Silk shop and treasure shop",
            "My Khe Beach, with 1 cup of Vietnamese drip coffee or a specialty drink included",
            "Transfer to hotel and check in",
            "Meals: breakfast, lunch, dinner"
          ]
        },
        {
          "day": "Day 4",
          "title": "Da Nang – Manila",
          "items": [
            "Hotel breakfast",
            "Transfer to the airport and fly Da Nang to Manila (Z2 823, 08:55–12:25)",
            "Meals: breakfast"
          ]
        }
      ],
      "inclusions": [
        "Economy round-trip airfare and taxes on AirAsia, with 1 piece of 20 kg checked baggage",
        "3 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Private coach with an English-speaking tour guide",
        "Sightseeing as listed, including first-way entrance fees",
        "Meals as listed in the itinerary"
      ],
      "exclusions": [
        "Personal expenses such as phone calls and minibar",
        "Extra baggage allowance",
        "Travel insurance with Covid-19 coverage",
        "Philippine travel tax",
        "Visa, USD 40 per person (5–7 working days)",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Single supplement: USD 99 per person",
        "Taxes, surcharges and fees, which are subject to change"
      ],
      "optional": [
        "Han River Cruise (drink and fruit) + Vietnamese massage + Ao Dai show (USD 99 per person)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–3: local 4★ hotel (hotel name not stated in the itinerary)"
      ],
      "notes": [
        "Meal codes per the itinerary: Day 1 lunch; Day 2 breakfast, lunch, dinner; Day 3 breakfast, lunch, dinner; Day 4 breakfast",
        "Early arrival (07:35) and morning departure on the last day (08:55)",
        "Separate rates apply to adults and children with bed, and to children without bed (aged 2–5)",
        "Visa takes 5–7 working days",
        "Shopping stops included in the rate: latex shop, local supermarket, silk shop, treasure shop and jewelry shop",
        "Itinerary is subject to change without prior notice and to weather conditions",
        "If the listed hotels are unavailable they are replaced with similar ones"
      ],
      "places": [
        "Da Nang Cathedral (Pink Church)",
        "Nguyen Van Thoai Street",
        "Son Tra Peninsula",
        "Linh Ung Pagoda",
        "Ba Na Hills",
        "Golden Bridge",
        "Fantasy Park",
        "French Village",
        "Canaan Island",
        "Camnam Island Coconut Village",
        "Hoi An Ancient Town",
        "Fujian Guild Hall",
        "Cantonese Assembly Hall",
        "Tan Ky Old House",
        "Japanese Covered Bridge",
        "Dragon Bridge",
        "Love Bridge",
        "APEC Park",
        "Marble Mountains",
        "My Khe Beach"
      ],
      "posters": [
        "vn-poster-danang-4d3n-z2-0.jpg"
      ],
      "posterSize": [
        545,
        800
      ]
    },
    {
      "id": "hanoi-sapa-4d3n",
      "name": "Hanoi – Sapa 4D3N Tour",
      "subtitle": "Out Manila · Cebu Pacific",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "4 days 3 nights",
      "days": 4,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 36888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-05-30",
      "image": "vn-sapa.jpg",
      "alt": "Rice terraces in the Sapa valley at sunset",
      "gallery": [
        "vn-sapa.jpg"
      ],
      "summary": "Four days from Manila to Hanoi and Sapa: Fansipan by train and cable car, Cat Cat Village and Hanoi’s Train Street, with 4★ hotels and a private coach.",
      "overview": "Fly Cebu Pacific from Manila to Hanoi and head straight up to Sapa for two nights in a 4★ hotel. Ride the mountain railway and cable car to Fansipan, stroll Cat Cat Village, then return to Hanoi for an egg coffee and your last night before the flight home. A private coach and an English-speaking guide stay with you throughout.",
      "travelDates": [
        {
          "d": "Apr 15–18",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "Apr 22–25",
          "y": 2027,
          "add": 1000
        },
        {
          "d": "May 27–30",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Manila, Apr 15–18 2027 to May 27–30 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Hanoi – Sapa",
          "items": [
            "Fly Manila to Hanoi (5J 744, 05:05–07:40) and meet the tour guide at the airport",
            "Hanoi Train Street",
            "Hoan Kiem Lake",
            "Transfer to Sapa and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Sapa",
          "items": [
            "Hotel breakfast",
            "Fansipan Mountain with one-way train and cable car",
            "Moana Sapa",
            "Cat Cat Village",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Sapa – Hanoi",
          "items": [
            "Hotel breakfast",
            "Lao Cai International Border Gate Administration Center",
            "Egg coffee",
            "Transfer to Hanoi and check in"
          ]
        },
        {
          "day": "Day 4",
          "title": "Hanoi – Manila",
          "items": [
            "Hotel breakfast",
            "Transfer to the airport and fly back to Manila (5J 745, 08:25–13:00)"
          ]
        }
      ],
      "inclusions": [
        "Economy airfare and taxes via Cebu Pacific, Manila–Hanoi–Manila round trip (hand-carry baggage only, 7 kg)",
        "3 nights’ twin-sharing accommodation with daily hotel breakfast",
        "Private coach with English-speaking tour guide",
        "Sightseeing as specified, including main entrance tickets",
        "Meals as listed in the itinerary"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls, minibar, etc.",
        "Checked baggage allowance",
        "Travel insurance with Covid-19 coverage",
        "Philippine travel tax",
        "Visa",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Single supplement: USD 65 per person",
        "Taxes, surcharges and fees are subject to change"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–2: 4★ Sapa hotel",
        "Day 3: 4★ Hanoi hotel"
      ],
      "notes": [
        "Meals: Day 1 L/D, Day 2 B/L/D, Day 3 B/L, Day 4 B (B = breakfast, L = lunch, D = dinner).",
        "This is a No Shopping package: no shopping stops are listed.",
        "Itinerary is subject to change without prior notice and to weather conditions.",
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included.",
        "Flights (reference): 5J 744 Manila–Hanoi 05:05–07:40; 5J 745 Hanoi–Manila 08:25–13:00.",
        "Rate is for adult and child with bed; child without bed (2–5 years) has a slightly lower rate.",
        "If the listed hotels are not available, they will be replaced by similar ones.",
        "Solo travellers (including children who need a bed) are placed to share a twin room with another guest of the group; those who prefer not to share pay the single supplement of USD 65 per person."
      ],
      "places": [
        "Hanoi Train Street",
        "Hoan Kiem Lake",
        "Sapa",
        "Fansipan",
        "Muong Hoa Mountain Railway",
        "Moana Sapa",
        "Cat Cat Village",
        "Lao Cai Border Gate",
        "Egg coffee"
      ],
      "posters": [
        "vn-poster-hanoi-sapa-4d3n-0.jpg"
      ],
      "posterSize": [
        566,
        800
      ]
    },
    {
      "id": "hanoi-sapa-halong-5d4n",
      "name": "Hanoi – Sapa – Ha Long Bay 5D4N Tour (with Shopping Stops)",
      "subtitle": "Out Manila · Cebu Pacific",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "5 days 4 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 33888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-05-15",
      "image": "vn-hanoi-flags.jpg",
      "alt": "Flags on an old shophouse in Hanoi",
      "gallery": [
        "vn-hanoi-flags.jpg"
      ],
      "summary": "Five days from Manila covering Hanoi, Sapa’s Fansipan cable car and a Ha Long Bay cruise, with 4★ hotels, meals as listed and a private coach.",
      "overview": "Fly Cebu Pacific to Hanoi for a city tour, then travel up to Sapa for the Fansipan railway and cable car. Return to Hanoi, cruise Ha Long Bay with lunch and onboard activities, and spend a final night in Hanoi before flying home. All hotels are 4★, with a private coach and an English-speaking guide. This rate includes shopping stops.",
      "travelDates": [
        {
          "d": "Mar 30–Apr 3",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Apr 20–24",
          "y": 2027
        },
        {
          "d": "May 11–15",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Manila, Mar 30–Apr 3 2027 to May 11–15 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Hanoi – Sapa",
          "items": [
            "Fly Manila to Hanoi (5J 744, 05:05–07:40) and meet the tour guide at the airport",
            "Hanoi day tour (outside view): Ba Dinh Square, Ho Chi Minh Mausoleum (photo stop), Presidential Palace (photo stop)",
            "36 Streets and Hoan Kiem Lake",
            "Lunch: set menu at a local restaurant",
            "Transfer to Sapa by bus (about 5.5 hours)",
            "Sa Pa Tourist Street, Sa Pa Church and Love Square",
            "Moana Sapa",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Sapa – Hanoi",
          "items": [
            "Hotel breakfast",
            "Muong Hoa Mountain Railway to the Fansipan Cable Car Station (round trip)",
            "Fansipan cable car to the Fansipan Peak area (round trip) with panoramic mountain and valley views",
            "Visit temples, Buddha statues and scenic viewpoints; explore the summit area at your own pace or walk up to the Fansipan Summit (summit funicular not included)",
            "Lunch: mountain buffet at Van Sam restaurant",
            "Transfer to Hanoi",
            "After dinner, transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Hanoi – Ha Long Bay",
          "items": [
            "Breakfast",
            "Transfer to Ha Long Bay",
            "Silk shop (shopping stop)",
            "Ha Long Bay exclusive cruise",
            "Cruise buffet lunch",
            "Onboard activities: karaoke, Vietnamese afternoon tea, Sung Sot Cave, Titop Island with overlook, Ga Choi Island",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 4",
          "title": "Ha Long Bay – Hanoi",
          "items": [
            "Hotel breakfast",
            "Jewelry shop + Pearl shop (shopping stop)",
            "Bamboo shop or Latex shop (shopping stop)",
            "Grand World Hanoi (gondola ride not included)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Hanoi – Manila",
          "items": [
            "Hotel breakfast",
            "Transfer to the airport and fly back to Manila (5J 745, 08:25–13:00)"
          ]
        }
      ],
      "inclusions": [
        "Economy airfare and taxes via Cebu Pacific, Manila–Hanoi–Manila round trip (hand-carry baggage only, 7 kg)",
        "4 nights’ twin-sharing accommodation with daily hotel breakfast",
        "Private coach with English-speaking tour guide",
        "Sightseeing as specified, including main entrance tickets",
        "Meals as listed in the itinerary"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls, minibar, etc.",
        "Checked baggage allowance",
        "Travel insurance with Covid-19 coverage",
        "Philippine travel tax",
        "Visa",
        "Tips for driver and guide: USD 5 per person per day x 5 days = USD 25 per person",
        "Single supplement: USD 79 per person",
        "Taxes, surcharges and fees are subject to change"
      ],
      "optional": [
        "Spa: USD 30",
        "Show: USD 20",
        "Royal hotpot dinner: USD 25",
        "Combo Vietnamese massage + Royal hotpot dinner + Show: USD 70",
        "Combo high-speed boat + Vietnamese massage + Royal hotpot dinner + Show: USD 99"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: 4★ Sapa hotel",
        "Day 2: 4★ Hanoi hotel",
        "Day 3: 4★ Ha Long Bay hotel",
        "Day 4: 4★ Hanoi hotel"
      ],
      "notes": [
        "Meals: Day 1 L/D, Day 2 B/L/D, Day 3 B/L, Day 4 B/L, Day 5 B (B = breakfast, L = lunch, D = dinner, X = not included).",
        "The rate includes shopping stops: silk shop, jewelry and pearl shop, and bamboo shop or latex shop.",
        "Itinerary is subject to change without prior notice and to weather conditions.",
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included.",
        "Flights (reference): 5J 744 Manila–Hanoi 05:05–07:40; 5J 745 Hanoi–Manila 08:25–13:00.",
        "Rate is for adult and child with bed; child without bed (2–5 years) has a slightly lower rate.",
        "If the listed hotels are not available, they will be replaced by similar ones.",
        "Solo travellers (including children who need a bed) are placed to share a twin room with another guest of the group; those who prefer not to share pay the single supplement of USD 79 per person."
      ],
      "places": [
        "Ba Dinh Square",
        "Ho Chi Minh Mausoleum",
        "Presidential Palace",
        "36 Streets",
        "Hoan Kiem Lake",
        "Sa Pa Church",
        "Love Square",
        "Moana Sapa",
        "Fansipan",
        "Muong Hoa Mountain Railway",
        "Ha Long Bay",
        "Sung Sot Cave",
        "Titop Island",
        "Ga Choi Island",
        "Grand World Hanoi"
      ],
      "posters": [
        "vn-poster-hanoi-sapa-halong-5d4n-0.jpg"
      ],
      "posterSize": [
        524,
        800
      ]
    },
    {
      "id": "hanoi-sapa-halong-5d3n-charter",
      "name": "Ha Long Bay – Hanoi – Sapa Charter Flight 5D3N Tour (No Shopping)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "5 days 3 nights",
      "days": 5,
      "status": "available",
      "featured": true,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 32888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-06-21",
      "image": "vn-halong-boat.jpg",
      "alt": "A cruise boat among the karst islands of Ha Long Bay",
      "gallery": [
        "vn-halong-boat.jpg"
      ],
      "summary": "Five days on a VietJet charter: a Ha Long Bay cruise first, then Hanoi’s Old Quarter and Sapa’s Fansipan, with 4★ hotels and no shopping stops.",
      "overview": "Land in Hanoi in the early hours and go straight to Ha Long Bay for a day cruise with buffet lunch and afternoon tea. Continue to Hanoi’s Old Quarter and on to Sapa for Fansipan by railway and cable car and a visit to Moana Sapa, then fly home from Hanoi in the evening. Three nights in 4★ hotels; this is a No Shopping package.",
      "travelDates": [
        {
          "d": "Nov 19–22"
        },
        {
          "d": "Dec 3–6",
          "add": 2500
        },
        {
          "d": "Dec 17–20",
          "add": 3000
        },
        {
          "d": "Dec 31–Jan 3",
          "add": 8000
        },
        {
          "d": "Jan 14–17",
          "y": 2027
        },
        {
          "d": "Jan 28–31",
          "y": 2027
        },
        {
          "d": "Feb 25–28",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Mar 11–14",
          "y": 2027
        },
        {
          "d": "Mar 25–28",
          "y": 2027,
          "add": 5000
        },
        {
          "d": "Apr 8–11",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Apr 22–25",
          "y": 2027
        },
        {
          "d": "May 6–9",
          "y": 2027
        },
        {
          "d": "May 20–23",
          "y": 2027
        },
        {
          "d": "Jun 3–6",
          "y": 2027
        },
        {
          "d": "Jun 17–20",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Manila, Nov 19–22 2026 to Jun 17–20 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Hanoi – Ha Long Bay",
          "items": [
            "Fly Manila to Hanoi (VJ 01:35–03:50, reference) and meet the tour guide at the airport",
            "Transfer to Ha Long Bay",
            "Ha Long Bay day cruise: buffet lunch onboard, cruise among thousands of limestone islands, relax on the sundeck with panoramic bay views",
            "Visit Sung Sot Cave, Luon Cave and Titop Island",
            "Afternoon tea while cruising back to the port",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Ha Long Bay – Hanoi – Sapa",
          "items": [
            "Hotel breakfast",
            "Transfer to Hanoi",
            "Hanoi city tour (outside view): Ba Dinh Square, Ho Chi Minh Mausoleum (photo stop)",
            "Old Quarter (36 Streets) and Hoan Kiem Lake",
            "Hanoi Train Street (subject to local authority permission)",
            "Transfer to Sapa by bus (about 5.5 hours)",
            "After dinner, transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Sapa",
          "items": [
            "Hotel breakfast",
            "Muong Hoa Mountain Railway to the Fansipan Cable Car Station (round trip)",
            "Fansipan cable car to the Fansipan Peak area (round trip) with panoramic mountain and valley views",
            "Visit temples, Buddha statues and scenic viewpoints; explore the summit area at your own pace or walk up to the Fansipan Summit (summit funicular not included)",
            "Lunch: mountain buffet at Van Sam restaurant",
            "After dinner, transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 4–5",
          "title": "Sapa – Hanoi – Manila",
          "items": [
            "Hotel breakfast",
            "Moana Sapa",
            "Transfer to the airport for the flight back to Manila (VJ 20:10–00:35 +1 day, reference)"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila–Hanoi–Manila via VietJet Air",
        "Baggage allowance: 20 kg per person per way plus 7 kg carry-on",
        "3 nights’ twin-sharing accommodation with daily hotel breakfast",
        "Meals: 7 meals included",
        "Sightseeing as specified, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide"
      ],
      "exclusions": [
        "Visa (if needed)",
        "Extra baggage allowance",
        "Single supplement: USD 68 per person",
        "Philippine travel tax: PHP 1,620 per person",
        "Airport tax: USD 45 per person (Hanoi and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Personal expenses such as telephone calls, minibar, etc.",
        "Fuel surcharge: USD 45 per person (rate subject to change)"
      ],
      "optional": [
        "Cat Cat Village + Rainbow Slide: USD 20",
        "Combo Vietnamese massage + Royal hotpot dinner + Show: USD 70",
        "Combo high-speed boat + Vietnamese massage + Royal hotpot dinner + Show: USD 99"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: Mithrin hotel or similar 4★ (Ha Long Bay)",
        "Day 2–3: Bora hotel or similar 4★ (Sapa)"
      ],
      "notes": [
        "Meals: Day 1 L/D, Day 2 B/L/D, Day 3 B/L/D, Day 4–5 B/L (7 meals in total).",
        "No Shopping package: no shopping stops are listed.",
        "Passport must be valid for 6 months before the departure date.",
        "If the listed hotels are not available, they will be replaced by similar ones.",
        "Schedule and meals may change according to local conditions.",
        "Rate is for adult and child with bed; child without bed (2–5 years) has a slightly lower rate.",
        "Solo travellers (including children with bed) are placed to share a room with another guest; those who prefer not to share pay the single supplement.",
        "Flights (reference): VJ Manila–Hanoi 01:35–03:50; VJ Hanoi–Manila 20:10–00:35 (+1 day).",
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included."
      ],
      "places": [
        "Ha Long Bay",
        "Sung Sot Cave",
        "Luon Cave",
        "Titop Island",
        "Ba Dinh Square",
        "Ho Chi Minh Mausoleum",
        "Old Quarter (36 Streets)",
        "Hoan Kiem Lake",
        "Hanoi Train Street",
        "Sapa",
        "Fansipan",
        "Muong Hoa Mountain Railway",
        "Moana Sapa"
      ],
      "posters": [
        "vn-poster-hanoi-sapa-halong-5d3n-charter-0.jpg",
        "vn-poster-hanoi-sapa-halong-5d3n-charter-1.jpg"
      ],
      "posterSize": [
        564,
        800
      ]
    },
    {
      "id": "hanoi-sapa-halong-5d3n-charter-classic",
      "name": "Sapa – Hanoi – Ha Long Bay Charter Flight 5D3N Tour (with Shopping Stops)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "5 days 3 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 28888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2026-11-09",
      "image": "vn-hanoi-train-street.jpg",
      "alt": "A train passing the cafés of Hanoi Train Street",
      "gallery": [
        "vn-hanoi-train-street.jpg"
      ],
      "summary": "Five days on a VietJet charter through Sapa, Hanoi and Ha Long Bay with Fansipan, a bay cruise and 4★ hotels; the rate includes shopping stops.",
      "overview": "Land in Hanoi and travel to Sapa for Cat Cat Village and Fansipan by mountain railway and cable car. Return to Hanoi, then cruise Ha Long Bay with buffet lunch and afternoon tea before an evening flight home. Three nights in 4★ hotels; this rate includes shopping stops (pearl, pharmacy, jewelry, silk or bamboo charcoal).",
      "travelDates": [
        {
          "d": "Nov 5–8"
        }
      ],
      "travelDatesNote": "Departures from Manila, Nov 5–8 2026 to Nov 5–8 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Hanoi – Sapa",
          "items": [
            "Fly Manila to Hanoi (VJ 01:35–03:50, reference) and meet the tour guide at the airport",
            "Photo stop at Lao Cai Border Gate",
            "Transfer to Sapa",
            "Cat Cat Village",
            "Cau May Walking Street",
            "Sapa Church",
            "Love Square",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Sapa – Hanoi",
          "items": [
            "Hotel breakfast",
            "Muong Hoa Mountain Railway to the Fansipan Cable Car Station (round trip)",
            "Fansipan cable car to the Fansipan Peak area (round trip) with panoramic mountain and valley views",
            "Visit temples, Buddha statues and scenic viewpoints; explore the summit area at your own pace or walk up to the Fansipan Summit (summit funicular not included)",
            "Lunch: mountain buffet at Van Sam restaurant",
            "Transfer to Hanoi",
            "After dinner, transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Hanoi – Ha Long Bay",
          "items": [
            "Hotel breakfast",
            "Pearl Exhibition Hall (shopping stop)",
            "Transfer to Ha Long Bay",
            "Ha Long Bay day cruise: buffet lunch onboard, cruise among thousands of limestone islands, sundeck with panoramic bay views",
            "Visit Sung Sot Cave, Luon Cave and Titop Island",
            "Afternoon tea while cruising back to the port",
            "An Gong Pharmacy (shopping stop)",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 4–5",
          "title": "Ha Long Bay – Hanoi – Manila",
          "items": [
            "Hotel breakfast",
            "Jewelry Exhibition Hall (shopping stop)",
            "Silk or Bamboo Charcoal shop (shopping stop)",
            "Transfer to Hanoi",
            "Old Quarter (36 Streets) and Hoan Kiem Lake",
            "Transfer to the airport for the flight back to Manila (VJ 20:10–00:35 +1 day, reference)"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila–Hanoi–Manila via VietJet Air",
        "Baggage allowance: 20 kg per person per way plus 7 kg carry-on",
        "3 nights’ twin-sharing accommodation with daily hotel breakfast",
        "Meals: 6 meals included",
        "Sightseeing as specified, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide"
      ],
      "exclusions": [
        "Visa (if needed)",
        "Extra baggage allowance",
        "Single supplement: USD 68 per person",
        "Philippine travel tax: PHP 1,620 per person",
        "Airport tax: USD 45 per person (Hanoi and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 4 days = USD 20 per person",
        "Personal expenses such as telephone calls, minibar, etc.",
        "Fuel surcharge: USD 45 per person (rate subject to change)"
      ],
      "optional": [
        "Speedboat + Moon Lake: USD 55 per person",
        "Vietnamese-style massage: USD 30 per person",
        "Hanoi cyclo ride: USD 20 per person",
        "All four together (Speedboat + Moon Lake, massage, cyclo ride): USD 90 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: Passion / Delasol / Muong Thanh Hotel or similar 4★ (Sapa)",
        "Day 2: Muong Thanh Xala / Thang Loi / Western Sky Hotel or similar 4★ (Hanoi)",
        "Day 3: New Century / Mithrin hotel or similar 4★ (Ha Long Bay)"
      ],
      "notes": [
        "Meals: Day 1 L/D, Day 2 B/L/D, Day 3 B/L, Day 4–5 B/L (6 meals in total).",
        "Rate includes shopping stops: Pearl, An Gong Pharmacy, Jewelry, and Silk or Bamboo Charcoal shop.",
        "Passport must be valid for 6 months before the departure date.",
        "If the listed hotels are not available, they will be replaced by similar ones.",
        "Schedule and meals may change according to local conditions.",
        "Rate is for adult and child with bed; child without bed (2–5 years) has a slightly lower rate.",
        "Solo travellers (including children with bed) are placed to share a room with another guest; those who prefer not to share pay the single supplement.",
        "Flights (reference): VJ Manila–Hanoi 01:35–03:50; VJ Hanoi–Manila 20:10–00:35 (+1 day).",
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included."
      ],
      "places": [
        "Lao Cai Border Gate",
        "Cat Cat Village",
        "Cau May Walking Street",
        "Sapa Church",
        "Love Square",
        "Fansipan",
        "Muong Hoa Mountain Railway",
        "Ha Long Bay",
        "Sung Sot Cave",
        "Luon Cave",
        "Titop Island",
        "Old Quarter (36 Streets)",
        "Hoan Kiem Lake"
      ],
      "posters": [
        "vn-poster-hanoi-sapa-halong-5d3n-charter-classic-0.jpg"
      ],
      "posterSize": [
        536,
        800
      ]
    },
    {
      "id": "hanoi-sapa-halong-6d4n-charter",
      "name": "Hanoi – Sapa – Ha Long Bay 6D4N Charter Tour (No Shopping)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "6 days 4 nights",
      "days": 6,
      "status": "available",
      "featured": true,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 35888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-07-01",
      "image": "vn-fansipan-train.jpg",
      "alt": "The Muong Hoa mountain train climbing toward Fansipan, Sapa",
      "gallery": [
        "vn-fansipan-train.jpg"
      ],
      "summary": "Six days on a VietJet charter: Sapa’s Fansipan, Hanoi’s Old Quarter and a Ha Long Bay cruise in 4★ hotels, with no shopping stops.",
      "overview": "Land in Hanoi and drive up to Sapa for Fansipan by mountain railway and cable car, with a visit to Moana Sapa. Return to Hanoi for a city tour and Sen buffet dinner, cruise Ha Long Bay with lunch and afternoon tea, then fly home in the evening. Four nights in 4★ hotels; this is a No Shopping package.",
      "travelDates": [
        {
          "d": "Nov 23–27"
        },
        {
          "d": "Nov 28–Dec 2",
          "add": 3000
        },
        {
          "d": "Dec 7–11",
          "add": 4000
        },
        {
          "d": "Dec 12–16"
        },
        {
          "d": "Dec 21–25",
          "add": 8000
        },
        {
          "d": "Jan 4–8",
          "y": 2027
        },
        {
          "d": "Jan 9–13",
          "y": 2027
        },
        {
          "d": "Jan 18–22",
          "y": 2027
        },
        {
          "d": "Jan 23–27",
          "y": 2027,
          "add": 5000
        },
        {
          "d": "Feb 1–5",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Feb 6–10",
          "y": 2027,
          "add": 8000
        },
        {
          "d": "Feb 15–19",
          "y": 2027
        },
        {
          "d": "Feb 20–24",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Mar 1–5",
          "y": 2027
        },
        {
          "d": "Mar 6–10",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Mar 15–19",
          "y": 2027
        },
        {
          "d": "Mar 20–24",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "Mar 29–Apr 2",
          "y": 2027
        },
        {
          "d": "Apr 3–7",
          "y": 2027
        },
        {
          "d": "Apr 12–16",
          "y": 2027
        },
        {
          "d": "Apr 17–21",
          "y": 2027
        },
        {
          "d": "Apr 26–30",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "May 1–5",
          "y": 2027,
          "add": 8000
        },
        {
          "d": "May 10–14",
          "y": 2027
        },
        {
          "d": "May 15–19",
          "y": 2027,
          "add": 3000
        },
        {
          "d": "May 24–28",
          "y": 2027
        },
        {
          "d": "May 29–Jun 2",
          "y": 2027
        },
        {
          "d": "Jun 7–11",
          "y": 2027
        },
        {
          "d": "Jun 12–16",
          "y": 2027
        },
        {
          "d": "Jun 21–25",
          "y": 2027
        },
        {
          "d": "Jun 26–30",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Manila, Nov 23–27 2026 to Jun 26–30 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Hanoi – Sapa",
          "items": [
            "Fly Manila to Hanoi (VJ 01:35–03:50, reference) and meet the tour guide at the airport",
            "Transfer to Sapa by bus (about 5.5 hours)",
            "Sapa Church, Love Square and Sapa Town",
            "Moana Sapa",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Sapa",
          "items": [
            "Hotel breakfast",
            "Muong Hoa Mountain Railway to the Fansipan Cable Car Station (round trip)",
            "Fansipan cable car to the Fansipan Peak area (round trip) with panoramic mountain and valley views",
            "Visit temples, Buddha statues and scenic viewpoints; explore the summit area at your own pace or walk up to the Fansipan Summit (summit funicular not included)",
            "Lunch: mountain buffet at Van Sam restaurant",
            "After dinner, transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Sapa – Hanoi",
          "items": [
            "Hotel breakfast",
            "Transfer to Hanoi",
            "Hanoi city tour (outside view): Ba Dinh Square, Ho Chi Minh Mausoleum (photo stop)",
            "Old Quarter (36 Streets) and Hoan Kiem Lake",
            "Hanoi Train Street (subject to local authority permission)",
            "Dinner: Sen buffet",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 4",
          "title": "Hanoi – Ha Long Bay",
          "items": [
            "Hotel breakfast",
            "Transfer to Ha Long Bay",
            "Ha Long Bay day cruise: buffet lunch onboard, cruise among thousands of limestone islands, relax on the sundeck with panoramic bay views",
            "Visit Sung Sot Cave, Luon Cave and Titop Island",
            "Afternoon tea while cruising back to the port",
            "Transfer back to the hotel"
          ]
        },
        {
          "day": "Day 5–6",
          "title": "Ha Long Bay – Hanoi – Manila",
          "items": [
            "Breakfast",
            "Transfer to Hanoi World (gondola ride not included)",
            "Transfer to the airport for the flight back to Manila (VJ 20:10–00:35 +1 day, reference)"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila–Hanoi–Manila via VietJet Air",
        "Baggage allowance: 20 kg per person per way plus 7 kg carry-on",
        "4 nights’ twin-sharing accommodation with daily hotel breakfast",
        "Meals: 8 meals included",
        "Sightseeing as specified, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide"
      ],
      "exclusions": [
        "Visa (if needed)",
        "Extra baggage allowance",
        "Single supplement: USD 88 per person",
        "Philippine travel tax: PHP 1,620 per person",
        "Airport tax: USD 45 per person (Hanoi and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 5 days = USD 25 per person",
        "Personal expenses such as telephone calls, minibar, etc.",
        "Fuel surcharge: USD 45 per person (rate subject to change)"
      ],
      "optional": [
        "Cat Cat Village + Rainbow Slide: USD 20",
        "Combo Vietnamese massage + Royal hotpot dinner + Show: USD 70",
        "Combo high-speed boat + Vietnamese massage + Royal hotpot dinner + Show: USD 99"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–2: Bora hotel or similar 4★ (Sapa)",
        "Day 3: Hanoi Riverside hotel or similar 4★",
        "Day 4: Mithrin hotel or similar 4★ (Ha Long Bay)"
      ],
      "notes": [
        "Meals: Day 1 L/D, Day 2 B/L/D, Day 3 B/L/D, Day 4 B/L, Day 5–6 B/L (8 meals in total).",
        "No Shopping package: no shopping stops are listed.",
        "Passport must be valid for 6 months before the departure date.",
        "If the listed hotels are not available, they will be replaced by similar ones.",
        "Schedule and meals may change according to local conditions.",
        "Rate is for adult and child with bed; child without bed (2–5 years) has a slightly lower rate.",
        "Solo travellers (including children with bed) are placed to share a room with another guest; those who prefer not to share pay the single supplement.",
        "Flights (reference): VJ Manila–Hanoi 01:35–03:50; VJ Hanoi–Manila 20:10–00:35 (+1 day).",
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included."
      ],
      "places": [
        "Sapa Church",
        "Love Square",
        "Sapa Town",
        "Moana Sapa",
        "Fansipan",
        "Muong Hoa Mountain Railway",
        "Ba Dinh Square",
        "Ho Chi Minh Mausoleum",
        "Old Quarter (36 Streets)",
        "Hoan Kiem Lake",
        "Hanoi Train Street",
        "Ha Long Bay",
        "Sung Sot Cave",
        "Luon Cave",
        "Titop Island",
        "Hanoi World"
      ],
      "posters": [
        "vn-poster-hanoi-sapa-halong-6d4n-charter-0.jpg",
        "vn-poster-hanoi-sapa-halong-6d4n-charter-1.jpg"
      ],
      "posterSize": [
        533,
        800
      ]
    },
    {
      "id": "hanoi-sapa-halong-6d4n-charter-classic",
      "name": "Sapa – Hanoi – Ha Long Bay 6D4N Charter Tour (with Shopping Stops)",
      "subtitle": "Out Manila · VietJet Air charter",
      "region": "intl",
      "country": "Vietnam",
      "flag": "vn",
      "duration": "6 days 4 nights",
      "days": 6,
      "status": "available",
      "featured": false,
      "departure": "Manila (NAIA)",
      "price": {
        "from": 29888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2026-11-14",
      "image": "vn-halong.jpg",
      "alt": "Boats on the turquoise water of Ha Long Bay",
      "gallery": [
        "vn-halong.jpg"
      ],
      "summary": "Six days on a VietJet charter through Sapa, Hanoi and Ha Long Bay with Cat Cat Village, Fansipan and a bay cruise; the rate includes shopping stops.",
      "overview": "Land in Hanoi and go up to Sapa for Cat Cat Village and Fansipan by mountain railway and cable car. Continue to Hanoi for a city tour and on to Ha Long Bay for a day cruise with buffet lunch and afternoon tea, then fly home in the evening. Four nights in 4★ hotels; this rate includes shopping stops.",
      "travelDates": [
        {
          "d": "Oct 31–Nov 4"
        },
        {
          "d": "Nov 9–13"
        }
      ],
      "travelDatesNote": "Departures from Manila, Oct 31–Nov 4 2026 to Nov 9–13 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Manila – Hanoi – Sapa",
          "items": [
            "Fly Manila to Hanoi (VJ 01:35–03:50, reference) and meet the tour guide at the airport",
            "Photo stop at Lao Cai Border Gate",
            "Cat Cat Village, one of the most beautiful villages in Sa Pa",
            "Cau May Walking Street",
            "Sapa Church and Love Square",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Sapa – Hanoi",
          "items": [
            "Hotel breakfast",
            "Muong Hoa Mountain Railway to the Fansipan Cable Car Station (round trip)",
            "Fansipan cable car to the Fansipan Peak area (round trip) with panoramic mountain and valley views",
            "Lunch: mountain buffet at Van Sam restaurant",
            "Transfer to Hanoi",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Hanoi – Ha Long Bay",
          "items": [
            "Hotel breakfast",
            "Ba Dinh Square",
            "Ho Chi Minh Mausoleum (photo stop)",
            "Governor-General’s Palace (outside view)",
            "Hanoi Train Street (subject to local authority permission)",
            "Transfer to Ha Long Bay",
            "Pearl Exhibition Hall (shopping stop)",
            "Transfer to the hotel and check in"
          ]
        },
        {
          "day": "Day 4",
          "title": "Ha Long Bay",
          "items": [
            "Hotel breakfast",
            "An Gong Pharmacy (shopping stop)",
            "Ha Long Bay day cruise: buffet lunch, cruise among thousands of limestone islands, sundeck with panoramic bay views",
            "Visit Sung Sot Cave, Luon Cave and Titop Island",
            "Afternoon tea while cruising back to the port",
            "Transfer to the hotel"
          ]
        },
        {
          "day": "Day 5–6",
          "title": "Ha Long Bay – Hanoi – Manila",
          "items": [
            "Breakfast",
            "Jewelry store (shopping stop)",
            "Silk and Bamboo Charcoal shop (shopping stop)",
            "Transfer to Hanoi",
            "36 Streets and Hoan Kiem Lake",
            "Transfer to the airport for the flight back to Manila (VJ 20:10–00:35 +1 day, reference)"
          ]
        }
      ],
      "inclusions": [
        "Charter flight Manila–Hanoi–Manila via VietJet Air",
        "Baggage allowance: 20 kg per person per way plus 7 kg carry-on",
        "4 nights’ twin-sharing accommodation with daily hotel breakfast",
        "Meals: 7 meals included",
        "Sightseeing as specified, including part of the required tickets",
        "Air-conditioned tour bus, one seat per person",
        "English-speaking tour guide"
      ],
      "exclusions": [
        "Visa (if needed)",
        "Extra baggage allowance",
        "Single supplement: USD 88 per person",
        "Philippine travel tax: PHP 1,620 per person",
        "Airport tax: USD 45 per person (Hanoi and Manila)",
        "Tips for driver and guide: USD 5 per person per day x 5 days = USD 25 per person",
        "Personal expenses such as telephone calls, minibar, etc.",
        "Fuel surcharge: USD 45 per person (rate subject to change)"
      ],
      "optional": [
        "Speedboat + Moon Lake: USD 55",
        "Vietnamese massage: USD 30",
        "Hanoi cyclo: USD 20",
        "All three together: USD 90 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: Passion hotel or similar 4★ (Sapa)",
        "Day 2: Muong Thanh Xala hotel or similar 4★ (Hanoi)",
        "Day 3–4: New Century hotel or similar 4★ (Ha Long Bay)"
      ],
      "notes": [
        "Meals: Day 1 L/D, Day 2 B/L/D, Day 3 B/D, Day 4 B/L, Day 5–6 B/L (7 meals in total).",
        "Rate includes shopping stops: Pearl, An Gong Pharmacy, Jewelry and Silk shop.",
        "Passport must be valid for 6 months before the departure date.",
        "If the listed hotels are not available, they will be replaced by similar ones.",
        "Schedule and meals may change according to local conditions.",
        "Rate is for adult and child with bed; child without bed (2–5 years) has a slightly lower rate.",
        "Solo travellers (including children with bed) are placed to share a room with another guest; those who prefer not to share pay the single supplement.",
        "Flights (reference): VJ Manila–Hanoi 01:35–03:50; VJ Hanoi–Manila 20:10–00:35 (+1 day).",
        "Meal codes: B = breakfast, L = lunch, D = dinner, X = not included."
      ],
      "places": [
        "Lao Cai Border Gate",
        "Cat Cat Village",
        "Cau May Walking Street",
        "Sapa Church",
        "Love Square",
        "Fansipan",
        "Muong Hoa Mountain Railway",
        "Ba Dinh Square",
        "Ho Chi Minh Mausoleum",
        "Governor-General’s Palace",
        "Hanoi Train Street",
        "Ha Long Bay",
        "Sung Sot Cave",
        "Luon Cave",
        "Titop Island",
        "36 Streets",
        "Hoan Kiem Lake"
      ],
      "posters": [
        "vn-poster-hanoi-sapa-halong-6d4n-charter-classic-0.jpg"
      ],
      "posterSize": [
        533,
        800
      ]
    },
    {
      "id": "shanghai-disneyland-4d3n",
      "name": "Shanghai Disneyland 4D3N Tour",
      "subtitle": "Out Cebu · China Eastern Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "4 days 3 nights",
      "days": 4,
      "status": "available",
      "featured": true,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 519,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2026-12-12",
      "image": "cn-shanghai-disney.jpg",
      "alt": "The castle at Shanghai Disneyland",
      "gallery": [
        "cn-shanghai-disney.jpg"
      ],
      "summary": "Four days in Shanghai with a full day at Shanghai Disneyland (1-day pass included), Xinshi Ancient Town, the Bund, Nanjing Road and city shopping stops, on a China Eastern flight from Cebu.",
      "overview": "Fly from Cebu to Shanghai on China Eastern Airlines and stay three nights in a 4★ hotel. Spend a whole day at Shanghai Disneyland, with the 1-day pass, round-trip transfers and a guide to help you into the park included, and enjoy the fireworks before heading back. The rest of the trip covers Xinshi Ancient Town with a Hanfu experience, the Bund, Nanjing Road and a few shopping stops.",
      "travelDates": [
        {
          "d": "Nov 11–14"
        },
        {
          "d": "Nov 18–21"
        },
        {
          "d": "Nov 25–28"
        },
        {
          "d": "Dec 2–5"
        },
        {
          "d": "Dec 9–12"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Nov 11–14 2026 to Dec 9–12 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Shanghai – Xinshi Ancient Town",
          "items": [
            "Flight MU 5024 Cebu to Shanghai (Pudong), departing 02:40 and arriving 06:50",
            "Meet the tour guide at the airport",
            "Proceed to Xinshi Ancient Town",
            "Hanfu experience and DIY lacquer fans",
            "See the famous internet-celebrity giant screen",
            "Transfer to the hotel and check in",
            "Meals: lunch only (X/L/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Shanghai Disneyland",
          "items": [
            "Hotel breakfast",
            "Whole day at Shanghai Disneyland, including a 1-day pass ticket, round-trip transfers and a tour guide to help you into the park",
            "Pick-up after the fireworks show",
            "Meals: breakfast only (B/X/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Shanghai city tour",
          "items": [
            "Hotel breakfast",
            "Nanjing Road walking street",
            "The Bund and Shanghai Oriental Pearl Tower (outside view)",
            "Compulsory shopping stop at a Chinese medicine shop",
            "The world’s largest Starbucks flagship store",
            "LV Mega Ship",
            "Compulsory shopping stop at a latex shop",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Shanghai – Cebu",
          "items": [
            "Hotel breakfast and check out",
            "Compulsory shopping stop at the Intangible Cultural Heritage Jade Craft Exhibition Center",
            "Chenghuang Temple Market",
            "Transfer to the airport",
            "Flight MU 5023 Shanghai to Cebu, departing 20:55 and arriving 01:35 the next day",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        }
      ],
      "inclusions": [
        "Round-trip economy airfare and taxes via China Eastern Airlines",
        "23 kg check-in baggage and 7 kg hand-carry",
        "3 nights’ twin-sharing accommodation in a 4★ hotel with daily hotel breakfast",
        "Private coach with an English-speaking tour guide",
        "Sightseeing as listed, including the first-way entrance fees needed",
        "Shanghai Disneyland 1-day pass with round-trip transfers",
        "Meals as listed"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls and minibar",
        "Extra baggage allowance",
        "Travel insurance",
        "Fuel surcharge of USD 30 per person, subject to change (collected with the tour fee)",
        "Philippines travel tax of PHP 1,620 (collected with the tour fee)",
        "China group visa, USD 40 per person (collected with the tour fee)",
        "Tips for driver and guide, USD 5 per person per day, USD 20 in total (collected with the tour fee)",
        "Single supplement, USD 75 per person"
      ],
      "optional": [
        "Huangpu River cruise (Day 3): USD 30 per person, includes ticket, transfers and guide; runs with a minimum of 10 guests"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–3 (3 nights): 4★ hotel in Shanghai, or similar"
      ],
      "notes": [
        "Meals: B = breakfast, L = lunch, X = not included. Day 1 X/L/X, Day 2 B/X/X, Day 3 B/L/X, Day 4 B/L/X.",
        "Child with bed 11–17 yrs, child without bed 2–10 yrs, infant 2–24 months.",
        "A China group visa is arranged for Philippine passport holders and collected with the tour fee (USD 40 per person); it is not included in the tour price.",
        "This rate is not suitable for Muslims. It is also not suitable for student groups.",
        "Shopping stops are part of this tour; a penalty applies if guests skip them. Stops: Chinese medicine shop, latex shop, jade craft center.",
        "Solo travellers may be paired to share a twin room; if they decline, the single supplement applies.",
        "If a listed hotel is unavailable, a similar hotel is used.",
        "All services are on a private basis.",
        "In case of crowds or special circumstances, the order of attractions may be adjusted."
      ],
      "places": [
        "Xinshi Ancient Town",
        "Shanghai Disneyland",
        "Nanjing Road",
        "The Bund",
        "Oriental Pearl Tower",
        "World’s largest Starbucks Flagship Store",
        "LV Mega Ship",
        "Chenghuang Temple Market",
        "Huangpu River (optional cruise)"
      ],
      "posters": [
        "cn-poster-shanghai-disneyland-4d3n-0.jpg"
      ],
      "posterSize": [
        566,
        800
      ]
    },
    {
      "id": "shanghai-5d3n",
      "name": "Shanghai 5D3N Tour",
      "subtitle": "Out Cebu · Cebu Pacific",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "5 days 3 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 399,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-03-31",
      "image": "cn-shanghai.jpg",
      "alt": "The Lujiazui skyline from the Bund, Shanghai",
      "gallery": [
        "cn-shanghai.jpg"
      ],
      "summary": "A relaxed Shanghai city break on Cebu Pacific: the Bund, Nanjing Road, Chenghuang Temple, Wukang Road and Florentia Town, with a free day for optional Disneyland.",
      "overview": "Fly Cebu Pacific from Cebu to Shanghai and stay three nights in a 4★ hotel with daily breakfast. Day 2 covers the Bund, Oriental Pearl Tower (outside view), Nanjing Road and Chenghuang Temple, Day 3 is a free day (optional Shanghai Disneyland), and the last day brings Wukang Road, Florentia Town and a few shopping stops before the early-morning flight home.",
      "travelDates": [
        {
          "d": "Dec 12–16"
        },
        {
          "d": "Mar 27–31",
          "y": 2027,
          "add": 50,
          "cur": "USD"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Dec 12–16 2026 to Mar 27–31 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Shanghai",
          "items": [
            "Flight 5J-5322 Cebu to Shanghai, departing 19:45 and arriving 00:05 the next day",
            "Meet the tour guide at the airport, then transfer to the hotel and check in",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Shanghai highlights",
          "items": [
            "Hotel breakfast",
            "The Bund and Shanghai Oriental Pearl Tower (outside view)",
            "Free shopping at Nanjing Road walking street",
            "Compulsory shopping stop at a Chinese medicine shop",
            "Chenghuang Temple of Shanghai",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Free day",
          "items": [
            "Hotel breakfast, free day at leisure",
            "Optional: Shanghai Disneyland (see optional tours)",
            "Meals: breakfast only (B/X/X)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Shanghai sightseeing and shopping",
          "items": [
            "Hotel breakfast and check out",
            "The world’s largest Starbucks flagship store",
            "LV Mega Ship",
            "Compulsory shopping stop at the Intangible Cultural Heritage Jade Craft Exhibition Center",
            "Wukang Road",
            "Compulsory shopping stop at a latex shop",
            "Shanghai Florentia Town",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Shanghai – Cebu",
          "items": [
            "Transfer to the airport",
            "Flight 5J-5323 Shanghai to Cebu, departing 01:05 and arriving 05:40",
            "Meals: breakfast and lunch (B/L/X) as listed for Day 4/5"
          ]
        }
      ],
      "inclusions": [
        "Round-trip economy airfare and taxes via Cebu Pacific",
        "7 kg hand-carry baggage only",
        "3 nights’ twin-sharing accommodation in a 4★ hotel with daily hotel breakfast",
        "Private coach with an English-speaking tour guide",
        "Sightseeing as listed, including the first-way entrance fees needed",
        "Meals as listed"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls and minibar",
        "Check-in baggage allowance",
        "Travel insurance",
        "Philippines travel tax (pay directly at the airport)",
        "China group visa, USD 40 per person (collected with the tour fee)",
        "Tips for driver and guide, USD 5 per person per day, USD 15 in total (collected with the tour fee)",
        "Single supplement, USD 75 per person"
      ],
      "optional": [
        "Huangpu River cruise (Day 2): USD 30 per person, includes ticket, transfers and guide",
        "Shanghai Disneyland (Day 3): USD 120 per person, includes ticket, transfers and guide; runs with a minimum of 10 guests"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–4 (3 nights): 4★ hotel in Shanghai, or similar"
      ],
      "notes": [
        "Meals: B = breakfast, L = lunch, X = not included. Day 1 X/X/X, Day 2 B/L/X, Day 3 B/X/X, Day 4–5 B/L/X.",
        "Child with bed (higher rate), child without bed 2–5 yrs, infant 2–24 months.",
        "A China group visa is arranged for Philippine passport holders and collected with the tour fee (USD 40 per person); it is not included in the tour price.",
        "Guests using the group visa may not book other operators’ tours on the free day.",
        "This rate is not suitable for Muslims.",
        "Shopping stops are part of this tour; a penalty applies if guests skip them. Stops: Chinese medicine shop, jade craft center, latex shop.",
        "Solo travellers may be paired to share a twin room; if they decline, the single supplement applies.",
        "If a listed hotel is unavailable, a similar hotel is used.",
        "All services are on a private basis.",
        "In case of crowds or special circumstances, the order of attractions may be adjusted."
      ],
      "places": [
        "The Bund",
        "Oriental Pearl Tower",
        "Nanjing Road",
        "Chenghuang Temple",
        "World’s largest Starbucks Flagship Store",
        "LV Mega Ship",
        "Wukang Road",
        "Shanghai Florentia Town",
        "Shanghai Disneyland (optional)",
        "Huangpu River (optional cruise)"
      ],
      "posters": [
        "cn-poster-shanghai-5d3n-0.jpg",
        "cn-poster-shanghai-5d3n-1.jpg"
      ],
      "posterSize": [
        544,
        800
      ]
    },
    {
      "id": "shanghai-mini-kyoto-5d4n",
      "name": "Shanghai – Wuxi Mini Kyoto – Wuzhen 5D4N Tour",
      "subtitle": "Out Cebu · Cathay Pacific",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "5 days 4 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 499,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2026-11-24",
      "image": "cn-shanghai.jpg",
      "alt": "The Lujiazui skyline from the Bund, Shanghai",
      "gallery": [
        "cn-shanghai.jpg"
      ],
      "summary": "Shanghai, Wuxi’s Mini Kyoto night view and Wuzhen water town over five days, with 4★ hotels and flights via Hong Kong on Cathay Pacific.",
      "overview": "Fly Cebu to Shanghai via Hong Kong on Cathay Pacific and stay four nights in 4★ hotels in Shanghai and Wuxi. See the Bund, Chenghuang Temple and Nanjing Road, the Nianhua Bay night view (the “Mini Kyoto of China”), Wuzhen’s East Gate and Xintiandi, with a few shopping stops along the way.",
      "travelDates": [
        {
          "d": "Nov 13–17"
        },
        {
          "d": "Nov 20–24",
          "add": 30,
          "cur": "USD"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Nov 13–17 2026 to Nov 20–24 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Hong Kong – Shanghai",
          "items": [
            "Flight CX922 Cebu to Hong Kong, 12:30–15:25",
            "Connecting flight CX364 Hong Kong to Shanghai, 17:30–20:15 (or CX362, 19:15–22:00, depending on the departure)",
            "Arrive in Shanghai and meet the guide at the airport",
            "Transfer to the hotel and check in",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Shanghai – Wuxi",
          "items": [
            "Hotel breakfast",
            "The Bund and Oriental Pearl Tower (photo stop)",
            "Chenghuang Temple",
            "Nanjing Road walking street",
            "Transfer to Wuxi",
            "Night view of Nianhua Bay Scenic Spot, the Mini Kyoto of China",
            "Check in at the hotel",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Wuxi – Wuzhen – Shanghai",
          "items": [
            "Hotel breakfast",
            "Visit a pearl shop (shopping stop)",
            "Transfer to Wuzhen",
            "Wuzhen East Gate",
            "Visit a jade shop (shopping stop)",
            "Transfer to Shanghai and check in at the hotel",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Shanghai",
          "items": [
            "Hotel breakfast",
            "The world’s largest Starbucks flagship store",
            "LV Mega Ship",
            "Visit a Chinese medicine shop (shopping stop)",
            "Xintiandi and Shikumen",
            "Free shopping at Huaihai Road",
            "Transfer to the hotel",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Shanghai – Hong Kong – Cebu",
          "items": [
            "Packed breakfast",
            "Transfer to the airport",
            "Flight CX361 Shanghai to Hong Kong, 08:30–11:35",
            "Take the connecting flight CX915 Hong Kong to Cebu yourself, 15:40–18:25",
            "Meals: packed breakfast (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "Round-trip economy airfare and taxes via Cathay Pacific",
        "23 kg check-in baggage and 7 kg hand-carry",
        "4 nights’ twin-sharing accommodation with daily hotel breakfast",
        "Sightseeing as listed, including all entrance fees needed",
        "Private coach with an English-speaking tour guide",
        "Meals as listed"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls and minibar",
        "Tips for driver and guide, USD 5 per person per day, USD 25 in total (collected with the tour fee)",
        "Philippines travel tax, USD 31 per person (collected with the tour fee)",
        "China group visa, USD 40 per person (collected with the tour fee)",
        "Fuel surcharge, USD 98 per person, subject to change (collected with the tour fee)",
        "Single supplement, USD 99 per person",
        "Travel insurance"
      ],
      "optional": [
        "Shanghai Huangpu River Cruise (Day 4): USD 30 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: 4★ hotel in Shanghai",
        "Day 2: 4★ hotel in Wuxi",
        "Day 3–4: 4★ hotel in Shanghai"
      ],
      "notes": [
        "Meals: B = breakfast, L = lunch, X = not included. Day 1 X/X/X, Day 2–4 B/L/X, Day 5 B/X/X.",
        "Flights per departure: 13–17 Nov uses CX922 + CX362 outbound (HKG–PVG 19:15–22:00); 20–24 Nov uses CX922 + CX364 outbound (HKG–PVG 17:30–20:15). Return both departures: CX361 + CX915.",
        "Child with bed 8–18 yrs, child without bed 2–7 yrs.",
        "A China group visa is arranged for Philippine passport holders and collected with the tour fee (USD 40 per person); it is not included in the tour price.",
        "This rate is not suitable for Muslims.",
        "Rate excludes VAT; an official receipt is available with a 12% surcharge on the total amount.",
        "Shopping stops are part of this tour; a penalty applies if guests skip them. Stops: pearl shop, jade shop, Chinese medicine shop.",
        "Rooms are twin sharing; triple rooms are not guaranteed. If no triple room is available, guests share with others or pay the single supplement.",
        "If a listed hotel is unavailable, a similar hotel is used.",
        "All services are on a private basis.",
        "In case of crowds or special circumstances, the order of attractions may be adjusted."
      ],
      "places": [
        "The Bund",
        "Oriental Pearl Tower",
        "Chenghuang Temple",
        "Nanjing Road",
        "Nianhua Bay Scenic Spot (Mini Kyoto)",
        "Wuzhen East Gate",
        "World’s largest Starbucks Flagship Store",
        "LV Mega Ship",
        "Xintiandi",
        "Shikumen",
        "Huaihai Road",
        "Huangpu River (optional cruise)"
      ],
      "posters": [
        "cn-poster-shanghai-mini-kyoto-5d4n-0.jpg"
      ],
      "posterSize": [
        523,
        800
      ]
    },
    {
      "id": "shanghai-mini-kyoto-6d4n",
      "name": "Shanghai – Wuxi Mini Kyoto – Hangzhou 6D4N Tour",
      "subtitle": "Out Cebu · Cebu Pacific",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "6 days 4 nights",
      "days": 6,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 419,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2026-12-13",
      "image": "cn-west-lake.jpg",
      "alt": "A pavilion on West Lake, Hangzhou",
      "gallery": [
        "cn-west-lake.jpg"
      ],
      "summary": "Shanghai, Wuxi’s Mini Kyoto night view, Nanxun Ancient Town and Hangzhou’s West Lake over six days, with 4★ hotels and direct Cebu Pacific flights.",
      "overview": "Fly Cebu Pacific direct to Shanghai and stay four nights in 4★ hotels in Shanghai, Wuxi and Hangzhou. Day 2 is a free day (optional Disneyland or Jinmao Tower tour), then the tour visits the Bund, Wuxi’s Nianhua Bay Mini Kyoto night view, Nanxun Ancient Town with a boat ride, a stroll along West Lake, Meijiawu Tea Garden with a Hanfu experience and Zhang Garden, plus several shopping stops.",
      "travelDates": [
        {
          "d": "Dec 8–13"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Dec 8–13 2026 to Dec 8–13 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Shanghai",
          "items": [
            "Flight 5J5322 Cebu to Shanghai, departing 19:45 and arriving 00:05",
            "Meet the tour guide at the airport, then transfer to the hotel and check in",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Shanghai free day",
          "items": [
            "Hotel breakfast, free day at leisure",
            "Optional tour 1: Shanghai Disneyland",
            "Optional tour 2: Jinmao Tower 88th floor sightseeing hall, Xintiandi and Shikumen, and Taobao underground market",
            "Meals: breakfast only (B/X/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Shanghai – Wuxi",
          "items": [
            "Hotel breakfast and check out",
            "Chenghuang Temple of Shanghai",
            "Compulsory shopping stop at a latex shop",
            "Nanjing Road walking street",
            "The Bund and Shanghai Oriental Pearl Tower (outside view)",
            "Proceed to Wuxi",
            "Night view of Nianhua Bay scenic spot, the Mini Kyoto of China",
            "Check in at the hotel",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Wuxi – Nanxun – Hangzhou",
          "items": [
            "Hotel breakfast and check out",
            "Compulsory shopping stop at the Pearl Exhibition Center",
            "Nanxun Ancient Town (boat ride included)",
            "Compulsory shopping stop at a Chinese medicine shop",
            "Proceed to Hangzhou and stroll along West Lake",
            "Check in at the hotel",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Hangzhou – Shanghai",
          "items": [
            "Hotel breakfast and check out",
            "Meijiawu Tea Garden, Hanfu experience",
            "Compulsory shopping stop at a jade shop",
            "The Asia’s largest Starbucks flagship store",
            "LV Mega Ship",
            "Zhang Garden",
            "Meals: breakfast and lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 6",
          "title": "Shanghai – Cebu",
          "items": [
            "Transfer to the airport",
            "Flight 5J5323 Shanghai to Cebu, departing 01:05 and arriving 05:40",
            "Meals: as listed for Day 5/6 (B/L/X)"
          ]
        }
      ],
      "inclusions": [
        "Round-trip economy airfare and taxes via Cebu Pacific",
        "Baggage: 7 kg carry-on only",
        "4 nights’ twin-sharing accommodation in 4★ hotels with daily hotel breakfast; triple rooms not guaranteed",
        "Private coach with an English-speaking tour guide",
        "Sightseeing as listed, including the first-way entrance fees needed",
        "Meals as listed"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls and minibar",
        "Check-in baggage allowance",
        "Travel insurance",
        "Philippines travel tax (pay directly at the airport)",
        "China group visa, USD 40 per person (collected with the tour fee)",
        "Tips for driver and guide, USD 5 per person per day, USD 20 in total (collected with the tour fee)",
        "Single supplement, USD 90 per person"
      ],
      "optional": [
        "Shanghai Disneyland (Day 2): USD 120 per person, includes ticket, transfers and guide; minimum of 10 guests",
        "Jinmao Tower 88th floor sightseeing hall + Xintiandi and Shikumen + Taobao underground market (Day 2): USD 60 per person, includes ticket, transfers and guide; minimum of 10 guests"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–2: 4★ hotel in Shanghai",
        "Day 3: 4★ hotel in Wuxi",
        "Day 4: 4★ hotel in Hangzhou"
      ],
      "notes": [
        "Meals: B = breakfast, L = lunch, X = not included. Day 1 X/X/X, Day 2 B/X/X, Day 3–5 B/L/X (Day 5/6 combined).",
        "Child with bed 11–18 yrs, child without bed 2–10 yrs, infant 2–24 months (infant fee covers airfare only).",
        "A China group visa is arranged for Philippine passport holders and collected with the tour fee (USD 40 per person); it is not included in the tour price.",
        "Guests using the group visa may not book other operators’ tours on the free day.",
        "This rate is not suitable for Muslims.",
        "Shopping stops are part of this tour; a penalty applies if guests skip them. Stops: latex shop, pearl exhibition center, Chinese medicine shop, jade shop, tea shop.",
        "Solo travellers may be paired to share a twin room; if they decline, the single supplement applies.",
        "If a listed hotel is unavailable, a similar hotel is used.",
        "All services are on a private basis.",
        "In case of crowds or special circumstances, the order of attractions may be adjusted."
      ],
      "places": [
        "Chenghuang Temple",
        "Nanjing Road",
        "The Bund",
        "Oriental Pearl Tower",
        "Nianhua Bay Scenic Spot (Mini Kyoto)",
        "Nanxun Ancient Town",
        "West Lake",
        "Meijiawu Tea Garden",
        "Zhang Garden",
        "World’s largest Starbucks Flagship Store",
        "LV Mega Ship",
        "Shanghai Disneyland (optional)",
        "Jinmao Tower (optional)",
        "Xintiandi (optional)",
        "Taobao underground market (optional)"
      ],
      "posters": [
        "cn-poster-shanghai-mini-kyoto-6d4n-0.jpg"
      ],
      "posterSize": [
        517,
        800
      ]
    },
    {
      "id": "shanghai-5d4n-no-shopping",
      "name": "Shanghai – Suzhou 5D4N Tour (No Shopping)",
      "subtitle": "Out Cebu · Vietnam Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "5 days 4 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 49888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-06-15",
      "image": "cn-shanghai.jpg",
      "alt": "The Lujiazui skyline from the Bund, Shanghai",
      "gallery": [
        "cn-shanghai.jpg"
      ],
      "summary": "Shanghai, a Suzhou day trip to Tongli Ancient Town and Tuisi Garden, and a full day at Shanghai Disneyland, with 4★ hotels and no shopping stops listed.",
      "overview": "Fly Vietnam Airlines from Cebu to Shanghai via Hanoi and stay four nights in a 4★ hotel. Explore Suzhou’s Tongli Ancient Town, Three Bridges, Chongben Hall and Tuisi Garden, see the Bund, Nanjing Road, Xintiandi and Chenghuang Temple, and spend a day at Shanghai Disneyland with the entrance ticket included. No shopping stops appear in the itinerary.",
      "travelDates": [
        {
          "d": "Jan 15–19",
          "y": 2027
        },
        {
          "d": "Feb 19–23",
          "y": 2027
        },
        {
          "d": "Apr 9–13",
          "y": 2027
        },
        {
          "d": "May 21–25",
          "y": 2027
        },
        {
          "d": "Jun 11–15",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Cebu, Jan 15–19 2027 to Jun 11–15 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Hanoi – Shanghai",
          "items": [
            "Flight VN642 Cebu to Hanoi, 04:45–07:35",
            "Flight VN532 Hanoi to Shanghai, 10:10–14:15",
            "Arrive at Shanghai international airport and meet the English-speaking guide",
            "Transfer to the hotel and check in",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Suzhou",
          "items": [
            "Hotel breakfast",
            "Transfer to Suzhou by coach",
            "Tongli Ancient Town",
            "Three Bridges",
            "Chongben Hall",
            "Tuisi Garden",
            "Transfer back to the hotel",
            "Meals: breakfast, lunch and dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Shanghai city tour",
          "items": [
            "Hotel breakfast",
            "The Bund and Oriental Pearl Tower (outside view)",
            "Nanjing Pedestrian Road",
            "The world’s largest Starbucks flagship store",
            "Xintiandi and Shikumen",
            "Chenghuang Temple",
            "Transfer back to the hotel",
            "Meals: breakfast, lunch and dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Shanghai Disneyland",
          "items": [
            "Hotel breakfast",
            "Shanghai Disneyland, entrance ticket included",
            "Transfer back to the hotel after the fireworks",
            "Meals: breakfast only (B/X/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Shanghai – Hanoi – Cebu",
          "items": [
            "Hotel breakfast and check out",
            "Free time until departure",
            "Meet the driver and guide at the hotel lobby",
            "Transfer to the airport",
            "Flight VN533 Shanghai to Hanoi, 15:45–18:05",
            "Flight VN643 Hanoi to Cebu, 22:50–03:30 the next day",
            "Meals: breakfast only (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "4 nights’ twin-sharing accommodation with daily hotel breakfast, at the chosen hotel",
        "Private coach with an English-speaking tour guide as per itinerary",
        "Sightseeing as listed, including all entrance fees needed",
        "Meals as listed",
        "Round-trip airfare via Vietnam Airlines with 7 kg hand-carry and 23 kg check-in baggage"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls and minibar",
        "Check-in baggage beyond the allowance",
        "Philippines travel tax, PHP 1,620 per person",
        "China group visa, USD 40 per person (collected with the tour fee)",
        "Tips for driver and guide, USD 5 per person per day, USD 25 in total",
        "Single supplement",
        "Travel insurance, including a Covid-19 test if needed"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–4 (4 nights): 4★ hotel in Shanghai, or similar"
      ],
      "notes": [
        "Meals: B = breakfast, L = lunch, D = dinner, X = not included. Day 1 X/X/X, Day 2–3 B/L/D, Day 4–5 B/X/X.",
        "Rate is quoted as all-in, based on 20 guests; child without bed 2–8 yrs.",
        "Single supplement: PHP 8,500 per person.",
        "A China group visa is arranged for Philippine passport holders and collected with the tour fee (USD 40 per person); it is not included in the tour price.",
        "The itinerary may change without prior notice, depending on actual conditions and weather.",
        "Rooms are twin sharing; triple rooms are not guaranteed.",
        "If a listed hotel is unavailable, a similar hotel is used."
      ],
      "places": [
        "Tongli Ancient Town",
        "Three Bridges",
        "Chongben Hall",
        "Tuisi Garden",
        "The Bund",
        "Oriental Pearl Tower",
        "Nanjing Road",
        "World’s largest Starbucks Flagship Store",
        "Xintiandi",
        "Shikumen",
        "Chenghuang Temple",
        "Shanghai Disneyland"
      ],
      "posters": [
        "cn-poster-shanghai-5d4n-no-shopping-0.jpg"
      ],
      "posterSize": [
        566,
        800
      ]
    },
    {
      "id": "avatar-shanghai-5d4n",
      "name": "Zhangjiajie (Avatar) – Shanghai 5D4N Tour",
      "subtitle": "Out Cebu · China Eastern Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "5 days 4 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 599,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2026-12-15",
      "image": "cn-zhangjiajie.jpg",
      "alt": "Sandstone pillars in Zhangjiajie National Forest Park",
      "gallery": [
        "cn-zhangjiajie.jpg"
      ],
      "summary": "Zhangjiajie’s Avatar Hallelujah Mountain, Glass Bridge and Grand Canyon, plus Shanghai’s Bund, on a China Eastern flight from Cebu with 5★ hotels in Zhangjiajie.",
      "overview": "Fly Cebu to Shanghai on China Eastern Airlines, see Nanjing Road and the Bund, then fly on to Zhangjiajie. Explore the Avatar scenic area (Zhangjiajie National Forest Park) with Avatar Hallelujah Mountain, the Grand Canyon Glass Bridge and Golden Whip Stream, staying in 5★ hotels. Return to Shanghai for Chenghuang Temple, Yuyuan Tourist Mart and Florentia Village outlets before flying home.",
      "travelDates": [
        {
          "d": "Nov 27–Dec 1",
          "add": 30,
          "cur": "USD"
        },
        {
          "d": "Dec 4–8"
        },
        {
          "d": "Dec 11–15"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Nov 27–Dec 1 2026 to Dec 11–15 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Shanghai – Zhangjiajie",
          "items": [
            "Flight MU5024 Cebu to Shanghai Pudong, 02:40–06:40",
            "Meet the tour guide at the airport",
            "Visit Nanjing Road and the Bund",
            "Transfer back to the airport and fly FM9343 Shanghai to Zhangjiajie, 19:15–21:35",
            "Meet the tour guide at Zhangjiajie airport",
            "Transfer to the hotel and check in",
            "Meals: lunch only (X/L/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Avatar scenic area",
          "items": [
            "Breakfast at the hotel",
            "Avatar scenic area (up and down by Bailong Lift or Tianzishan cable car)",
            "No. 1 Bridge",
            "Avatar Hallelujah Mountain",
            "Breath-taking Platform",
            "West Sea Clouds",
            "Seventy-two Odd Buildings (hot spot)",
            "Compulsory shopping stop at a latex exhibition hall",
            "After dinner, transfer back to the hotel",
            "Meals: breakfast, lunch and dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Grand Canyon and Xibu Street",
          "items": [
            "Breakfast at the hotel",
            "Grand Canyon C Line and the Glass Bridge",
            "Golden Whip Stream and Water Around Four Gates",
            "Xibu, the largest folk culture walking street",
            "Optional: Tianmen Fox-Lady Show",
            "Compulsory shopping stop at a Chinese medicine shop",
            "After dinner, transfer to the hotel",
            "Meals: breakfast, lunch and dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Zhangjiajie – Shanghai",
          "items": [
            "Breakfast at the hotel",
            "Compulsory shopping stop at a jewelry shop",
            "Junsheng Sandstone Painting Museum",
            "Tea tasting at a tea shop, or a visit to a silk shop",
            "Optional: Tianmen Mountain or Baofeng Lake (see optional tours)",
            "After dinner, transfer to the airport",
            "Flight FM9342 Zhangjiajie to Shanghai, 23:20, arriving 01:30 the next day",
            "Meals: breakfast, lunch and dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Shanghai – Cebu",
          "items": [
            "Breakfast at the hotel",
            "Chenghuang Temple and Yuyuan Tourist Mart",
            "Free shopping at Florentia Village Shanghai (outlets)",
            "Transfer to the airport",
            "Flight MU5023 Shanghai to Cebu, 20:55, arriving 01:40 the next day",
            "Meals: breakfast only (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "Round-trip economy airfare and taxes via China Eastern Airlines",
        "Baggage allowance: 1 piece up to 23 kg per passenger plus 7 kg carry-on",
        "4 nights’ twin-sharing accommodation with daily hotel breakfast; triple rooms not guaranteed, subject to hotel room availability",
        "Private coach with an English-speaking tour guide",
        "Sightseeing as listed, including the first-way entrance fees needed",
        "Meals as listed"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls and minibar",
        "Extra baggage allowance",
        "Travel insurance",
        "Fuel surcharge, USD 75 per person, subject to change (collected with the tour fee)",
        "China group visa (guaranteed), USD 40 per person",
        "Tips for driver and guide, USD 5 per person per day, USD 25 in total (collected with the tour fee)",
        "Philippines travel tax, PHP 1,620 per person (collected with the tour fee)",
        "Single supplement, USD 100 per person"
      ],
      "optional": [
        "Tianmen Fox-Lady Show (Day 3): USD 70 per person",
        "Tianmen Mountain, including cable car, glass skywalk and Tianmen Cave (Day 4): USD 85 per person",
        "Baofeng Lake, including cruise (Day 4): USD 60 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–2: Qingxinyuan Hotel Zhangjiajie, or similar 5★",
        "Day 3: Western Garden Hotel, or similar 5★",
        "Day 4: Vienna Hotel, or similar 4★ (Shanghai, after the late flight)"
      ],
      "notes": [
        "Meals: B = breakfast, L = lunch, D = dinner, X = not included. Day 1 X/L/X, Day 2–4 B/L/D, Day 5 B/X/X.",
        "Child with bed 11–18 yrs, child without bed 2–10 yrs, infant 2–24 months.",
        "Rate excludes VAT; an official receipt is available with a 12% surcharge on the total amount.",
        "A China group visa is arranged for Philippine passport holders and collected with the tour fee (USD 40 per person); it is not included in the tour price.",
        "Peak departures (30 Oct–3 Nov, 25–29 Dec) and 27 Nov–1 Dec carry higher rates than normal dates, per the price list.",
        "Shopping stops are part of this tour; a penalty applies if guests skip them. Stops: latex exhibition hall, Chinese medicine shop, jewelry shop, silk shop.",
        "Solo travellers may be paired to share a twin room; if they decline, the single supplement applies.",
        "If a listed hotel is unavailable, a similar hotel is used.",
        "All services are on a private basis.",
        "In case of crowds or special circumstances, the order of attractions may be adjusted."
      ],
      "places": [
        "Nanjing Road",
        "The Bund",
        "Zhangjiajie National Forest Park (Avatar)",
        "Bailong Lift",
        "Tianzishan Cable Car",
        "No. 1 Bridge",
        "Avatar Hallelujah Mountain",
        "Breath-taking Platform",
        "West Sea Clouds",
        "Seventy-two Odd Buildings",
        "Grand Canyon Glass Bridge",
        "Golden Whip Stream",
        "Xibu Folk Culture Street",
        "Junsheng Sandstone Painting Museum",
        "Chenghuang Temple",
        "Yuyuan Tourist Mart",
        "Florentia Village Shanghai",
        "Tianmen Mountain (optional)",
        "Baofeng Lake (optional)"
      ],
      "posters": [
        "cn-poster-avatar-shanghai-5d4n-0.jpg"
      ],
      "posterSize": [
        566,
        800
      ]
    },
    {
      "id": "shanghai-hangzhou-wuzhen-5d4n",
      "name": "Shanghai – Hangzhou – Wuzhen 5D4N Tour",
      "subtitle": "Out Cebu · Cathay Pacific",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "5 days 4 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 569,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-05-17",
      "image": "cn-wuzhen.jpg",
      "alt": "Wuzhen water town lit up at night",
      "gallery": [
        "cn-wuzhen.jpg"
      ],
      "summary": "Five days from Cebu via Hong Kong on Cathay Pacific: Shanghai, West Lake in Hangzhou and the water town of Wuzhen, staying in 4-star hotels.",
      "overview": "Fly from Cebu to Shanghai via Hong Kong on Cathay Pacific and travel by private coach with an English-speaking guide. You will cruise West Lake in Hangzhou, taste tea at Meijiawu Tea Culture Village, walk through Wuzhen’s East Gate, then see the Bund, Nanjing Road and Xintiandi in Shanghai. Four nights in 4-star hotels. This is a shopping-visit tour (jade, tea and Chinese medicine shops).",
      "travelDates": [
        {
          "d": "Feb 19–23",
          "y": 2027
        },
        {
          "d": "Apr 16–20",
          "y": 2027
        },
        {
          "d": "May 13–17",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Cebu, Feb 19–23 2027 to May 13–17 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Hong Kong – Shanghai",
          "items": [
            "Fly Cebu to Hong Kong, then Hong Kong to Shanghai (CX948 or CX922, then CX364 or CX362; exact flights per departure)",
            "Arrive in Shanghai and meet the guide at the airport",
            "Transfer to the hotel and check in",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Hangzhou and Wuzhen",
          "items": [
            "Hotel breakfast",
            "Transfer to Hangzhou",
            "Boat cruise on West Lake",
            "Leifeng Tower (outside view)",
            "Meijiawu Tea Culture Village, with tea tasting",
            "Transfer to Wuzhen",
            "Wuzhen East Gate",
            "Transfer to the hotel and check in",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Wuzhen to Shanghai",
          "items": [
            "Hotel breakfast",
            "Transfer to Shanghai",
            "Jade shop visit",
            "The Bund and Oriental Pearl Tower (photo stop)",
            "Chenghuang Temple (City God Temple)",
            "Nanjing Road walking street",
            "Transfer to the hotel and check in",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Shanghai",
          "items": [
            "Hotel breakfast",
            "The world’s largest Starbucks flagship store",
            "LV Mega Ship",
            "Chinese medicine shop visit",
            "Xintiandi and Shikumen",
            "Free shopping at Huaihai Road",
            "Transfer to the hotel",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Shanghai – Hong Kong – Cebu",
          "items": [
            "Packed breakfast",
            "Transfer to the airport and fly to Hong Kong, then take the connecting flight to Cebu (CX361 or CX365, then CX925 or CX915; exact flights per departure)",
            "Meals: breakfast (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "4 nights’ accommodation on twin sharing with daily hotel breakfast",
        "Sightseeing as listed, with all entrance fees needed",
        "Private coach with English-speaking tour guide",
        "Meals as listed",
        "Economy round-trip airfare and taxes via Cathay Pacific",
        "23 kg check-in baggage and 7 kg hand carry"
      ],
      "exclusions": [
        "Personal expenses such as phone calls and minibar",
        "Tips for driver and guide: USD 25 per person (5 USD x 5 days), collected with the tour fee",
        "Philippine travel tax: USD 31 per person, collected with the tour fee",
        "China group visa: USD 40 per person, collected with the tour fee",
        "Fuel surcharge: USD 60 per person, collected with the tour fee",
        "Single supplement: USD 99 per person",
        "Travel insurance"
      ],
      "optional": [
        "Shanghai Huangpu River Cruise: USD 30 per person"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: 4★ hotel in Shanghai",
        "Day 2: 4★ hotel in Wuzhen",
        "Day 3-4: 4★ hotel in Shanghai"
      ],
      "notes": [
        "Philippine passport holders need a China visa; the China group visa (USD 40 per person) is collected with the tour fee",
        "Meal codes shown as Breakfast/Lunch/Dinner per day; X means no meal",
        "Rates differ for adults, minors with bed (8-18 yrs) and children without bed (2-7 yrs)",
        "Shop visits are part of this rate (jade, tea and Chinese medicine shops); a penalty applies if guests skip the shops",
        "Rate does not include VAT; an official receipt adds a 12% surcharge on the total",
        "Rate is not suitable for Muslim guests",
        "Triple rooms are not guaranteed; otherwise guests share with others or pay the single supplement",
        "Order of attractions may change without prior notice; hotels may be replaced by similar ones",
        "Flights vary per departure; flight details are given for each travel date"
      ],
      "places": [
        "West Lake",
        "Leifeng Tower",
        "Meijiawu Tea Culture Village",
        "Wuzhen East Gate",
        "The Bund",
        "Oriental Pearl Tower",
        "Chenghuang Temple",
        "Nanjing Road",
        "Starbucks Flagship Store Shanghai",
        "Xintiandi",
        "Shikumen",
        "Huaihai Road"
      ],
      "posters": [
        "cn-poster-shanghai-hangzhou-wuzhen-5d4n-0.jpg"
      ],
      "posterSize": [
        524,
        800
      ]
    },
    {
      "id": "shanghai-hangzhou-wuxi-6d5n",
      "name": "Shanghai – Hangzhou – Wuxi 6D5N Tour",
      "subtitle": "Out Cebu · Cathay Pacific",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "6 days 5 nights",
      "days": 6,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 799,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-03-18",
      "image": "cn-west-lake.jpg",
      "alt": "A pavilion on West Lake, Hangzhou",
      "gallery": [
        "cn-west-lake.jpg"
      ],
      "summary": "Six days from Cebu via Hong Kong on Cathay Pacific: Hangzhou’s West Lake, Nanxun ancient town, Taihu Lake, Wuxi and Shanghai in 5-star hotels.",
      "overview": "Fly Cebu to Hangzhou via Hong Kong on Cathay Pacific and travel by private bus with an English-speaking guide. Explore West Lake, Nanxun Ancient Town with a rowing boat ride, the Taihu Lake scenery and Wuxi’s Nianhua Bay night laser show before ending in Shanghai. Five nights in 5-star hotels including a Hilton and a Sheraton. Shop visits are part of this tour.",
      "travelDates": [
        {
          "d": "Dec 5–10"
        },
        {
          "d": "Jan 12–17",
          "y": 2027
        },
        {
          "d": "Feb 16–21",
          "y": 2027
        },
        {
          "d": "Mar 13–18",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Cebu, Dec 5–10 2026 to Mar 13–18 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Hong Kong – Hangzhou",
          "items": [
            "Fly Cebu to Hong Kong (CX922 12:25-15:20), then Hong Kong to Hangzhou (CX964 20:05-22:30)",
            "Arrive at Hangzhou airport and meet the tour guide",
            "Check in at the Hangzhou hotel",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Hangzhou to Nanxun",
          "items": [
            "Hotel breakfast and check out",
            "Stroll around West Lake",
            "Jingci Temple",
            "Leifeng Tower, the Legend of the White Snake (outside view)",
            "Meijiawu: Hanfu experience and tea picking shop",
            "Complimentary: Lanyingxuan Black Pearl Afternoon Tea with all-you-can-eat ice cream fondue and bird’s nest",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Nanxun to Huzhou",
          "items": [
            "Hotel breakfast and check out",
            "Nanxun Ancient Town with a rowing boat ride",
            "Latex shop",
            "Taihu Lake Eighteen Bends",
            "South Taihu Lake scenery and Fool’s Wharf",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Huzhou to Wuxi",
          "items": [
            "Hotel breakfast and check out",
            "Jade shop",
            "Drive to Wuxi",
            "Changguangxi Wetland Park",
            "Taihu Lake pearl store",
            "Nianhua Bay Zen Town night view and laser show",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Wuxi to Shanghai",
          "items": [
            "Hotel breakfast and check out",
            "Drive to Shanghai",
            "Tongrentang health care store",
            "Nanjing Road pedestrian street",
            "The world’s largest Starbucks Roastery",
            "Louis Vuitton Cruise pop-up store",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 6",
          "title": "Shanghai – Hong Kong – Cebu",
          "items": [
            "Packed breakfast and check out",
            "Transfer to the airport and fly home: CX361 PVG-HKG 08:30-11:30 (on Mar 18 the flight is CX365 09:30-12:40), then CX915 HKG-CEB 15:35-18:20",
            "Meals: breakfast (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "Economy round-trip airfare and taxes with Cathay Pacific",
        "Baggage: 1 piece 23 kg check-in and 1 piece 7 kg carry-on",
        "5 nights’ accommodation on twin sharing in 5-star hotels",
        "Private bus with English-speaking tour guide",
        "Sightseeing as listed, including the first-way entrance fee",
        "Meals: hotel or packed breakfast and 4 other meals"
      ],
      "exclusions": [
        "Personal expenses such as phone calls and minibar",
        "Travel insurance",
        "Philippine travel tax: USD 30 per person, collected with the tour fee",
        "China group visa: USD 40 per person, collected with the tour fee",
        "Tips for driver and guide: USD 60 per person (10 USD x 6 days), collected with the tour fee",
        "Single supplement: USD 300 per person",
        "Triple room or family room: USD 55 per person",
        "Fuel surcharge (subject to change)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: 5★ hotel in Hangzhou",
        "Day 2: Golden Sun Hilton Hotel 5★",
        "Day 3: Sheraton Moon Bay Hotel 5★",
        "Day 4: 5★ hotel in Wuxi",
        "Day 5: 5★ hotel in Shanghai"
      ],
      "notes": [
        "Philippine passport holders need a China visa; the China group visa (USD 40 per person) is collected with the tour fee",
        "Meal codes shown as Breakfast/Lunch/Dinner; X means no meal",
        "Rates differ for adults, under-18 without bed and under-18 with bed",
        "Shop visits are part of this rate: tea shop, pearl store, latex store, jade shop and health care store",
        "Attraction order may change due to weather, traffic or visitor volume; itinerary, flights and hotels are subject to final confirmation",
        "No refunds if guests cancel part of the itinerary or accommodation during the trip; tips must be paid for the full number of days",
        "Some hotels do not provide disposable toiletries; bring your own",
        "Hotels may be replaced by similar ones if unavailable"
      ],
      "places": [
        "West Lake",
        "Jingci Temple",
        "Leifeng Tower",
        "Meijiawu Tea Village",
        "Nanxun Ancient Town",
        "Taihu Lake Eighteen Bends",
        "Fool’s Wharf",
        "Changguangxi Wetland Park",
        "Nianhua Bay Zen Town",
        "Nanjing Road",
        "Starbucks Reserve Roastery Shanghai"
      ],
      "posters": [
        "cn-poster-shanghai-hangzhou-wuxi-6d5n-0.jpg"
      ],
      "posterSize": [
        534,
        800
      ]
    },
    {
      "id": "adora-cruise-shanghai-5d4n",
      "name": "Adora Magic City Fly + Cruise 5D4N Tour",
      "subtitle": "Out Cebu · Fly + cruise",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "5 days 4 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 1188,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2026-12-21",
      "image": "cn-cruise-ship.jpg",
      "alt": "A cruise ship at sea",
      "gallery": [
        "cn-cruise-ship.jpg"
      ],
      "summary": "Fly Cebu to Shanghai via Hong Kong, then enjoy a two-night Cruise-to-Nowhere aboard the Adora Magic City with two hotel nights in Shanghai.",
      "overview": "Fly from Cebu to Shanghai via Hong Kong on Cathay Pacific flights, spend a night in Shanghai, then board the Adora Magic City for a cruise to nowhere with onboard dining and entertainment. Back in Shanghai you visit Zhang Yuan and the Starbucks Reserve Roastery before flying home. The ship has 15 decks and the world’s first cruise-ship industrial aesthetic exhibition hall.",
      "travelDates": [
        {
          "d": "Dec 10–14"
        },
        {
          "d": "Dec 17–21",
          "add": 100,
          "cur": "USD"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Dec 10–14 2026 to Dec 17–21 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Hong Kong – Shanghai",
          "items": [
            "Fly CX922 CEB-HKG 12:30-15:25, then CX364 HKG-PVG 17:30-20:15",
            "Meet the local guide on arrival, transfer and check in at the Shanghai hotel",
            "Meals: breakfast, dinner (B/X/D)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Shanghai and boarding",
          "items": [
            "Hotel breakfast",
            "Xintiandi, City God Temple commercial mall, Huaihai Road, Wukang Road and Tianan Qianshu",
            "Proceed to Shanghai Wusongkou International Cruise Terminal for embarkation (bring original passport and ferry ticket)",
            "Vessel departs 20:00 or 23:00",
            "Overnight on the cruise ship",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Sea cruise",
          "items": [
            "Full day at sea with onboard activities",
            "Global and Chinese dining, live performances, leisure zones, art exhibitions and family entertainment",
            "Overnight on the cruise ship",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Shanghai",
          "items": [
            "Ship berths at 09:00; disembark in the cruise line’s group order",
            "Group transfer bus from the terminal",
            "Zhang Yuan",
            "Starbucks Reserve Roastery",
            "LV Cruise pop-up building (exterior view)",
            "Return to the hotel to rest",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Shanghai – Hong Kong – Cebu",
          "items": [
            "Hotel breakfast and free time",
            "Private transfer to the airport",
            "Fly CX365 PVG-HKG 09:30-12:40, then CX915 HKG-CEB 15:40-18:25",
            "Meals: breakfast (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "International airfare, airport taxes and terminal fees",
        "Baggage: 23-25 kg check-in and 7 kg hand carry",
        "2 nights’ hotel accommodation in Shanghai with daily breakfast",
        "2 land meals in Shanghai",
        "2 nights on the cruise ship on twin sharing with daily breakfast",
        "Meals at designated complimentary restaurants onboard",
        "Onboard entertainment: interactive parties, theatre performances and designated complimentary facilities"
      ],
      "exclusions": [
        "Port taxes and fees (collected in Manila): USD 80 per person",
        "Gratuities (paid onboard): approx. HKD 140 per person per night",
        "Single room supplement",
        "Two China group visas: USD 80 per person (entry to China on Day 1 and Day 5; if using an individual visa it must be multiple entry)",
        "Philippine travel tax",
        "Travel insurance",
        "Personal onboard expenses: Wi-Fi, phone calls, laundry, shopping, bar and café, spa",
        "Shore excursions"
      ],
      "hotelsLabel": "Accommodation",
      "hotels": [
        "Day 1: Shanghai hotel",
        "Day 2-3: Adora Magic City cruise ship (interior or balcony twin cabin)",
        "Day 4: Shanghai hotel"
      ],
      "notes": [
        "Vessel: Adora Magic City, 136,000 tons, 2,125 cabins, up to 5,246 passengers, 15 decks, 324 m long",
        "Cabin choice: interior twin or balcony twin; rate depends on cabin type and travel date",
        "Philippine passport holders need a China visa; two group visas needed (entry Day 1 and Day 5)",
        "Passport must be valid at least 6 months from the return date; bring a photocopy of the passport’s first page and a valid visa for re-entry into China",
        "Bring original passport and ferry ticket for boarding",
        "Port call and departure times are for reference and may change with weather, tides or safety decisions; the cruise line may change the route"
      ],
      "places": [
        "Xintiandi",
        "City God Temple",
        "Huaihai Road",
        "Wukang Road",
        "Wusongkou Cruise Terminal",
        "Adora Magic City",
        "Zhang Yuan",
        "Starbucks Reserve Roastery Shanghai"
      ],
      "posters": [
        "cn-poster-adora-cruise-shanghai-5d4n-0.jpg"
      ],
      "posterSize": [
        571,
        800
      ]
    },
    {
      "id": "beijing-5d4n-no-shopping",
      "name": "Beijing with Universal Studios 5D4N All-In Tour (No Shopping)",
      "subtitle": "Out Cebu · Vietnam Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "5 days 4 nights",
      "days": 5,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 49888,
        "label": "From",
        "unit": "per pax"
      },
      "year": 2026,
      "ends": "2027-06-27",
      "image": "cn-great-wall.jpg",
      "alt": "The Great Wall of China",
      "gallery": [
        "cn-great-wall.jpg"
      ],
      "summary": "Five days from Cebu via Hanoi on Vietnam Airlines: Great Wall, Forbidden City, Summer Palace, an acrobat show and a day at Universal Studios Beijing.",
      "overview": "A no-shopping Beijing tour flying Cebu to Beijing via Hanoi on Vietnam Airlines, staying four nights in 4-star hotels. See the Summer Palace, Juyongguan Great Wall, Tiananmen Square and the Forbidden City, enjoy an acrobat show and an upgraded Peking duck dinner, then spend a full day at Universal Studios Beijing.",
      "travelDates": [
        {
          "d": "Jan 20–24",
          "y": 2027
        },
        {
          "d": "Feb 24–28",
          "y": 2027
        },
        {
          "d": "Mar 17–21",
          "y": 2027
        },
        {
          "d": "Apr 14–18",
          "y": 2027
        },
        {
          "d": "May 12–16",
          "y": 2027
        },
        {
          "d": "Jun 23–27",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Cebu, Jan 20–24 2027 to Jun 23–27 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Hanoi – Beijing",
          "items": [
            "Fly VN642 CEB-HAN 05:50-07:50, then VN512 HAN-PEK 10:05-14:45",
            "Arrive at Beijing international airport and meet the English-speaking guide",
            "Transfer to the hotel and check in",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Summer Palace and Great Wall",
          "items": [
            "Hotel breakfast",
            "Summer Palace (cruise boat not included)",
            "Juyongguan Great Wall",
            "Water Cube and Bird’s Nest (photo stop)",
            "Transfer back to the hotel",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Forbidden City and acrobats",
          "items": [
            "Hotel breakfast",
            "Tiananmen Square",
            "Forbidden City",
            "Wangfujing walking street",
            "Acrobat show (ticket included)",
            "Upgraded Peking duck dinner",
            "Transfer back to the hotel",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Universal Studios Beijing",
          "items": [
            "Hotel breakfast",
            "Universal Studios Beijing day tour (round-trip transfer and one-day ticket included)",
            "Transfer back to the hotel",
            "Meals: breakfast (B/X/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Beijing – Hanoi – Cebu",
          "items": [
            "Hotel breakfast and check out",
            "Free time until departure",
            "Transfer to the airport",
            "Fly VN513 PEK-HAN 15:45-18:40, then VN643 HAN-CEB 23:10-04:00 (arrives next day)",
            "Meals: breakfast (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "4 nights’ accommodation on twin sharing at choice hotel with daily hotel breakfast",
        "Private coach with English-speaking guide",
        "Sightseeing as listed, including all entrance fees needed",
        "Meals as listed",
        "Round-trip airfare via Vietnam Airlines with 7 kg hand carry and 23 kg check-in"
      ],
      "exclusions": [
        "Personal expenses such as phone calls and minibar",
        "Check-in baggage allowance",
        "Philippine travel tax: PHP 1,620 per person",
        "China group visa: USD 40 per person, collected with the tour fee",
        "Tips for driver and guide: USD 25 per person (5 USD x 5 days)",
        "Single supplement: PHP 8,500 per person",
        "Travel insurance, with Covid-19 test if needed"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1-4: Beijing 4★ hotel or similar"
      ],
      "notes": [
        "No shopping stops on this tour",
        "Philippine passport holders need a China visa; the China group visa (USD 40 per person) is collected with the tour fee",
        "Meal codes shown as Breakfast/Lunch/Dinner; X means no meal",
        "Rates are based on 20 paying guests; child without bed (2-8 yrs) has a lower rate",
        "Itinerary may change without notice and is subject to weather",
        "The Forbidden City may be replaced by Jingshan Hill Park and Prince Gong Mansion if it is closed",
        "Triple rooms are not guaranteed; hotels may be replaced by similar ones"
      ],
      "places": [
        "Summer Palace",
        "Juyongguan Great Wall",
        "Water Cube",
        "Bird’s Nest",
        "Tiananmen Square",
        "Forbidden City",
        "Wangfujing Walking Street",
        "Universal Studios Beijing"
      ],
      "posters": [
        "cn-poster-beijing-5d4n-no-shopping-0.jpg"
      ],
      "posterSize": [
        566,
        800
      ]
    },
    {
      "id": "beijing-shanghai-7d6n",
      "name": "Beijing – Shanghai 7D6N Tour",
      "subtitle": "Out Cebu · China Eastern Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "7 days 6 nights",
      "days": 7,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 888,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2026-12-10",
      "image": "cn-great-wall.jpg",
      "alt": "The Great Wall of China",
      "gallery": [
        "cn-great-wall.jpg"
      ],
      "summary": "Seven days from Cebu on China Eastern: Beijing’s Great Wall and Forbidden City, a bullet train to Shanghai, the Bund and an optional Disneyland day.",
      "overview": "Fly Cebu to Beijing via Shanghai on China Eastern, tour Tiananmen Square, the Forbidden City, the Great Wall, Temple of Heaven and Qianmen Old Street, then take a 2nd-class bullet train to Shanghai for the Bund and Nanjing Road. Stay in a local 5-star resort in Beijing and a 4-star hotel in Shanghai. Shop visits are part of this tour.",
      "travelDates": [
        {
          "d": "Nov 25–Dec 1"
        },
        {
          "d": "Dec 4–10"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Nov 25–Dec 1 2026 to Dec 4–10 2026. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu to Beijing",
          "items": [
            "Fly MU5024 CEB-PVG 02:40-06:45, then MU5129 PVG-PKX 09:15-11:20",
            "Meet the English-speaking guide at the airport",
            "Water Cube (outside view)",
            "Bird’s Nest (outside view)",
            "Wangfujing Pedestrian Street",
            "Transfer to the hotel and check in",
            "Meals: dinner (X/X/D)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Beijing",
          "items": [
            "Hotel breakfast",
            "Tiananmen Square",
            "Forbidden City (ticket included)",
            "Tea shop visit",
            "Optional: Panda House at Beijing Zoo, Peking duck dinner",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Great Wall",
          "items": [
            "Hotel breakfast",
            "Jade shop visit",
            "Juyongguan Great Wall",
            "Hanfu experience",
            "Foot massage",
            "Optional: Summer Palace (excluding boat)",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Temple of Heaven",
          "items": [
            "Hotel breakfast",
            "Jewelry shop visit",
            "Temple of Heaven",
            "Qianmen Old Street",
            "Optional: acrobatic show",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Beijing to Shanghai by bullet train",
          "items": [
            "Hotel breakfast and check out",
            "Bullet train to Shanghai (2nd class)",
            "Meet the guide in Shanghai",
            "The Bund",
            "Oriental Pearl Tower (outside view)",
            "Chenghuangmiao Temple",
            "Transfer to the hotel and check in",
            "Lunch upgraded to BBQ buffet",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 6",
          "title": "Shanghai free day",
          "items": [
            "Hotel breakfast",
            "Free day (no transfer, no meal)",
            "Optional Disneyland tour: pick-up, whole day at Shanghai Disney Resort with weekday pass ticket, return to the hotel",
            "Meals: breakfast (B/X/X)"
          ]
        },
        {
          "day": "Day 7",
          "title": "Shanghai – Cebu",
          "items": [
            "Hotel breakfast and check out",
            "World’s largest Starbucks Flagship Store",
            "LV mega ship",
            "Nanjing Road Pedestrian Street",
            "Latex shop visit",
            "Transfer to the airport and fly MU5023 PVG-CEB 21:00-01:40 (arrives next day)",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        }
      ],
      "inclusions": [
        "6 nights’ accommodation on twin sharing at choice hotel with daily hotel breakfast",
        "Private coach with English-speaking tour guide",
        "Sightseeing as listed, including first-way entrance fee",
        "Meals as listed",
        "1 bottle of water per day",
        "Round-trip airfare via China Eastern Airlines (1 piece 23 kg plus 7 kg hand carry)",
        "Beijing to Shanghai one-way bullet train (2nd class)"
      ],
      "exclusions": [
        "Personal expenses such as phone calls and minibar",
        "Philippine travel tax",
        "Optional tours",
        "Tips for driver and guide: USD 35 per person (5 USD x 7 days)",
        "Single supplement: USD 199 per person",
        "Visa"
      ],
      "optional": [
        "Panda House at Beijing Zoo + Peking duck dinner + Summer Palace (excluding boat) + acrobatic show: USD 100 per person, minimum 10 guests",
        "Shanghai Disneyland tour (weekday): USD 120 per person, minimum 10 guests"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1-4: Local 5★ Ryllnwon Resort & Spa Hotel (as written in the source) or similar, Beijing",
        "Day 5-6: 4★ Shanghai Hongqiao NECC Glory Hotel or similar"
      ],
      "notes": [
        "Visa is not included; Philippine passport holders need a China visa",
        "Meal codes shown as Breakfast/Lunch/Dinner; X means no meal",
        "Shop visits are part of this rate (tea, jade, jewelry and latex shops)",
        "Triple rooms are not guaranteed; if none are available, roommates will be arranged",
        "Itinerary may change without notice and is subject to weather; hotels may be replaced by similar ones",
        "Optional tours need a minimum of 10 guests"
      ],
      "places": [
        "Water Cube",
        "Bird’s Nest",
        "Wangfujing Pedestrian Street",
        "Tiananmen Square",
        "Forbidden City",
        "Juyongguan Great Wall",
        "Temple of Heaven",
        "Qianmen Old Street",
        "The Bund",
        "Oriental Pearl Tower",
        "Chenghuangmiao Temple",
        "Nanjing Road",
        "Starbucks Flagship Store Shanghai"
      ],
      "posters": [
        "cn-poster-beijing-shanghai-7d6n-0.jpg"
      ],
      "posterSize": [
        521,
        800
      ]
    },
    {
      "id": "beijing-shanghai-8d7n",
      "name": "Beijing – Shanghai 8D7N Tour",
      "subtitle": "Out Cebu · Xiamen Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "8 days 7 nights",
      "days": 8,
      "status": "available",
      "featured": true,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 699,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-03-23",
      "image": "cn-forbidden-city.jpg",
      "alt": "A guardian lion in the Forbidden City, Beijing",
      "gallery": [
        "cn-forbidden-city.jpg"
      ],
      "summary": "Eight days from Cebu on Xiamen Airlines via Quanzhou: Beijing’s Great Wall and Forbidden City, a bullet train to Shanghai and the Bund.",
      "overview": "Fly Cebu to Quanzhou on Xiamen Airlines, then on to Beijing for Tiananmen Square, the Great Wall and the Forbidden City. A 2nd-class bullet train takes you to Shanghai for the Bund and Chenghuangmiao Temple. Seven nights in 4-star hotels. Shop visits are part of this tour.",
      "travelDates": [
        {
          "d": "Jan 23–30",
          "y": 2027,
          "add": 100,
          "cur": "USD"
        },
        {
          "d": "Feb 23–Mar 2",
          "y": 2027,
          "add": 100,
          "cur": "USD"
        },
        {
          "d": "Mar 2–9",
          "y": 2027
        },
        {
          "d": "Mar 16–23",
          "y": 2027,
          "add": 100,
          "cur": "USD"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Jan 23–30 2027 to Mar 16–23 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu to Quanzhou",
          "items": [
            "Fly MF8696 CEB-JJN 18:50-21:50",
            "Meet the English-speaking guide at Quanzhou airport",
            "Transfer to the hotel and check in",
            "Meals: none (X/X/X)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Quanzhou to Beijing",
          "items": [
            "Fly MF8113 JJN-PKX 08:30-11:10",
            "Meet the guide in Beijing",
            "Tiananmen Square",
            "Wangfujing Pedestrian Street",
            "Transfer to the hotel and check in",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 3",
          "title": "Great Wall",
          "items": [
            "Hotel breakfast",
            "Jade shop visit",
            "Juyongguan Great Wall",
            "Tea shop visit",
            "Water Cube (outside view)",
            "Bird’s Nest (outside view)",
            "Transfer to the hotel",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 4",
          "title": "Forbidden City",
          "items": [
            "Hotel breakfast",
            "Chinese medicine shop visit",
            "Forbidden City (ticket included)",
            "Qianmen Old Street",
            "Transfer to the hotel",
            "Meals: breakfast, lunch (B/L/X)"
          ]
        },
        {
          "day": "Day 5",
          "title": "Beijing",
          "items": [
            "Hotel breakfast",
            "Jewelry shop visit",
            "Optional: Summer Palace (excluding boat) + Panda House at Beijing Zoo + acrobatic show + Peking duck dinner",
            "Transfer to the hotel",
            "Meals: breakfast (B/X/X)"
          ]
        },
        {
          "day": "Day 6",
          "title": "Beijing to Shanghai by bullet train",
          "items": [
            "Hotel breakfast and check out",
            "Bullet train to Shanghai (2nd class)",
            "Meet the guide in Shanghai",
            "The Bund",
            "Oriental Pearl Tower (outside view)",
            "Chenghuangmiao Temple",
            "Transfer to the hotel and check in",
            "Meals: breakfast, lunch, dinner (B/L/D)"
          ]
        },
        {
          "day": "Day 7",
          "title": "Shanghai free day",
          "items": [
            "Hotel breakfast",
            "Free day (no transfer, no meal)",
            "Optional Disneyland tour: pick-up, whole day at Shanghai Disney Resort with weekday pass ticket, return to the hotel",
            "Meals: breakfast (B/X/X)"
          ]
        },
        {
          "day": "Day 8",
          "title": "Shanghai – Quanzhou – Cebu",
          "items": [
            "Hotel breakfast and check out",
            "Transfer to the airport",
            "Fly MF8534 SHA-JJN 09:30-11:20, then MF8695 JJN-CEB 14:45-17:50",
            "Meals: breakfast (B/X/X)"
          ]
        }
      ],
      "inclusions": [
        "7 nights’ accommodation on twin sharing at choice hotel with daily hotel breakfast",
        "Private coach with English-speaking tour guide",
        "Sightseeing as listed, including first-way entrance fee",
        "Meals as listed",
        "1 bottle of water per day",
        "Round-trip airfare via Xiamen Airlines (1 piece 23 kg plus 7 kg hand carry)",
        "Beijing to Shanghai bullet train (2nd class)"
      ],
      "exclusions": [
        "Personal expenses such as phone calls and minibar",
        "Philippine travel tax",
        "Optional tours",
        "Tips for driver and guide: USD 70 per person (10 USD x 7 days)",
        "Single supplement: USD 189 per person",
        "Visa"
      ],
      "optional": [
        "Panda House at Beijing Zoo + Peking duck dinner + Summer Palace (excluding boat) + acrobatic show: USD 100 per person, minimum 10 guests",
        "Shanghai Disneyland tour: USD 120 per person on weekdays, USD 150 per person on holidays, minimum 10 guests"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: 4★ Jinjiang Xiamenair Hotel or similar, Quanzhou",
        "Day 2-5: 4★ Kaiyuan International Hotel or similar, Beijing",
        "Day 6-7: 4★ Holiday Inn Express Shanghai New Jinqiao (IHG) or similar"
      ],
      "notes": [
        "Visa is not included; Philippine passport holders need a China visa",
        "Meal codes shown as Breakfast/Lunch/Dinner; X means no meal",
        "Shop visits are part of this rate: jade, tea, jewelry and Chinese medicine shops",
        "Triple rooms are not guaranteed; if none are available, roommates will be arranged",
        "Itinerary may change without notice and is subject to weather; hotels may be replaced by similar ones",
        "Optional tours need a minimum of 10 guests",
        "Rate varies by departure date (regular, peak and holiday season)"
      ],
      "places": [
        "Tiananmen Square",
        "Wangfujing Pedestrian Street",
        "Juyongguan Great Wall",
        "Water Cube",
        "Bird’s Nest",
        "Forbidden City",
        "Qianmen Old Street",
        "The Bund",
        "Oriental Pearl Tower",
        "Chenghuangmiao Temple"
      ],
      "posters": [
        "cn-poster-beijing-shanghai-8d7n-0.jpg"
      ],
      "posterSize": [
        540,
        800
      ]
    },
    {
      "id": "avatar-furong-chongqing-8d7n",
      "name": "Zhangjiajie (Avatar) – Furong – Chongqing 8D7N Tour",
      "subtitle": "Out Cebu · Xiamen Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "8 days 7 nights",
      "days": 8,
      "status": "available",
      "featured": true,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 659,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-03-23",
      "image": "cn-chongqing-night.jpg",
      "alt": "Chongqing’s skyline and bridge at night",
      "gallery": [
        "cn-chongqing-night.jpg"
      ],
      "summary": "Eight days from Cebu through Changsha, Zhangjiajie’s Avatar mountains, Furong Town and Chongqing, with 5-star hotels, a private coach and an English-speaking guide.",
      "overview": "Fly with Xiamen Airlines from Cebu via Quanzhou, then travel by private coach with an English-speaking guide. You will see Zhangjiajie National Forest Park, the Avatar “Hallelujah Mountain” scenery, the Grand Canyon glass bridge and Furong Town, the ancient town hanging on a waterfall. The tour ends in Chongqing with its light rail through buildings and the night view of Hongya Cave. Stays are in local 5-star hotels, except a 4-star hotel in Quanzhou on the first night.",
      "travelDates": [
        {
          "d": "Nov 17–24"
        },
        {
          "d": "Feb 23–Mar 2",
          "y": 2027,
          "add": 50,
          "cur": "USD"
        },
        {
          "d": "Mar 6–13",
          "y": 2027
        },
        {
          "d": "Mar 9–16",
          "y": 2027,
          "add": 50,
          "cur": "USD"
        },
        {
          "d": "Mar 13–20",
          "y": 2027,
          "add": 50,
          "cur": "USD"
        },
        {
          "d": "Mar 16–23",
          "y": 2027,
          "add": 50,
          "cur": "USD"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Nov 17–24 2026 to Mar 16–23 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Quanzhou",
          "items": [
            "Flight MF8696 Cebu to Jinjiang (Quanzhou) 18:50–21:50",
            "Arrive in Quanzhou and meet the tour guide at the airport",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Quanzhou – Changsha – Changde",
          "items": [
            "Hotel breakfast and check out",
            "Transfer to airport and fly to Changsha (MF8167 12:15–14:05 or MF8787 13:20–15:00)",
            "Visit Changsha IFS and Huangxing Pedestrian Street",
            "Visit Pozijie Food Street",
            "Transfer to Changde (2.5 hrs), then to hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Changde – Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Transfer to Zhangjiajie (2.5 hrs)",
            "Visit Zhangjiajie National Forest Park (Avatar scenic area): up and down by Bailong Lift, No.1 Bridge, Breath-taking Platform, Avatar Hallelujah Mountain, Tianzi Mountain",
            "Visit Golden Whip Stream and Water Around Four Gates",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 4",
          "title": "Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Visit Chinese Medicine Shop (shopping stop)",
            "Visit Junsheng Sandstone Painting Museum",
            "Visit 72 Wonder Tower (outside view)",
            "Back to hotel",
            "Optional: Tianmen Mountain (cable cart, glass skywalk, Tianmen Cave) USD85/pax",
            "Optional: Tianmen Fox-Lady Show USD70/pax"
          ]
        },
        {
          "day": "Day 5",
          "title": "Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Visit Latex Store (shopping stop)",
            "Tea tasting at a Tea Shop or visit a Silk Shop (shopping stop)",
            "Visit Grand Canyon C Line Glass Bridge (incl. VR experience)",
            "Back to hotel",
            "Optional: Huanglong Cave (incl. sightseeing boat) USD70/pax"
          ]
        },
        {
          "day": "Day 6",
          "title": "Zhangjiajie – Furong – Qianjiang",
          "items": [
            "Hotel breakfast",
            "Visit Jewelry Store (shopping stop)",
            "Transfer to Furong (2 hrs)",
            "Visit Furong Town, the ancient town hanging on the waterfall (incl. battery bus and sightseeing boat)",
            "Transfer to Qianjiang (3.5 hrs), then to hotel and check in"
          ]
        },
        {
          "day": "Day 7",
          "title": "Qianjiang – Chongqing",
          "items": [
            "Hotel breakfast",
            "Transfer to Chongqing (4 hrs)",
            "Visit Liziba Station, where the light rail runs through residential buildings",
            "Visit Kuixing Tower, where the 22nd floor feels like the 1st floor",
            "Visit Jiefangbei Pedestrian Street",
            "Night view of Hongya Cave",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 8",
          "title": "Chongqing – Quanzhou – Cebu",
          "items": [
            "Breakfast box",
            "Transfer to airport and fly Chongqing to Jinjiang (MF8612 08:15–10:30)",
            "Connect to Cebu (MF8695 14:45–17:50)"
          ]
        }
      ],
      "inclusions": [
        "7 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Private coach with English-speaking tour guide",
        "Sightseeing tours as specified, including first-way entrance fees",
        "Meals as listed",
        "Round-trip airfare via Xiamen Airlines with 20 kg checked baggage"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls, mini bar, etc.",
        "Extra baggage allowance",
        "Fuel surcharge: USD50/pax (subject to change)",
        "Philippine travel tax: pay directly at the airport",
        "Group visa: USD40/pax",
        "Tips for driver and guide: USD80/pax (USD10 per pax per day for 8 days)",
        "Single supplement: from USD169/pax",
        "Optional tours"
      ],
      "optional": [
        "Tianmen Mountain (cable cart, glass skywalk, Tianmen Cave): USD85/pax",
        "Tianmen Fox-Lady Show: USD70/pax",
        "Huanglong Cave (incl. sightseeing boat): USD70/pax"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: Local 4★ hotel in Quanzhou",
        "Day 2: Hilton Garden Inn Changde or similar 5★",
        "Day 3–5: Best Western Plus Qingxinyuan Hotel (Zhangjiajie) or similar 5★",
        "Day 6: Blossomy Picturesque Hotel (Qianjiang) or similar 5★",
        "Day 7: Chongqing Gangsen International Grand Hotel or similar 5★"
      ],
      "notes": [
        "Meals: Day 1 none; Day 2 B/D; Days 3–6 B/L/D; Day 7 B/L; Day 8 breakfast box (B = breakfast, L = lunch, D = dinner)",
        "This rate includes 4 shopping stops: Latex Store, Chinese Medicine Shop, Jewelry Store, and a Silk Store or Tea Shop",
        "Philippine passport holders need a China visa; the group visa is USD40/pax (excluded)",
        "Rooms are twin sharing; triple rooms are not guaranteed",
        "Price does not include VAT; an official receipt costs an extra 12% of the total",
        "Itinerary may change without prior notice and depends on weather; hotels may be replaced by similar ones",
        "Child with bed is under 18 yrs, child without bed under 10 yrs, infant under 2 yrs"
      ],
      "places": [
        "Quanzhou",
        "Changsha IFS",
        "Huangxing Pedestrian Street",
        "Pozijie Food Street",
        "Zhangjiajie National Forest Park (Avatar)",
        "Bailong Lift",
        "No.1 Bridge",
        "Breath-taking Platform",
        "Avatar Hallelujah Mountain",
        "Tianzi Mountain",
        "Golden Whip Stream",
        "Water Around Four Gates",
        "Junsheng Sandstone Painting Museum",
        "72 Wonder Tower",
        "Grand Canyon C Line Glass Bridge",
        "Furong Town",
        "Liziba Station",
        "Kuixing Tower",
        "Jiefangbei Pedestrian Street",
        "Hongya Cave"
      ],
      "posters": [
        "cn-poster-avatar-furong-chongqing-8d7n-0.jpg",
        "cn-poster-avatar-furong-chongqing-8d7n-1.jpg",
        "cn-poster-avatar-furong-chongqing-8d7n-2.jpg"
      ],
      "posterSize": [
        521,
        800
      ]
    },
    {
      "id": "avatar-furong-no-shopping",
      "name": "Zhangjiajie (Avatar) – Furong 6D5N Tour (No Shopping)",
      "subtitle": "Out Cebu · Cathay Pacific",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "6 days 5 nights",
      "days": 6,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 1288,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-03-17",
      "image": "cn-zhangjiajie.jpg",
      "alt": "Sandstone pillars in Zhangjiajie National Forest Park",
      "gallery": [
        "cn-zhangjiajie.jpg"
      ],
      "summary": "Six days from Cebu via Hong Kong to Changsha and Zhangjiajie: Avatar scenic area, Tianmen Mountain, Furong Town and a Hong Kong overnight.",
      "overview": "Fly Cathay Pacific from Cebu via Hong Kong to Changsha, then travel by private coach with an English-speaking guide. Highlights are the Grand Canyon glass bridge, Furong Town, Tianmen Mountain with its cable car and Tianmen Cave, the Fox Lady show, and the Avatar scenic area (Zhangjiajie National Forest Park) with Bafeng Lake. You spend the last night in Hong Kong before flying home. Hotels are 4-star or similar.",
      "travelDates": [
        {
          "d": "Jan 22–27",
          "y": 2027
        },
        {
          "d": "Feb 19–24",
          "y": 2027
        },
        {
          "d": "Mar 12–17",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Cebu, Jan 22–27 2027 to Mar 12–17 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Hong Kong – Changsha",
          "items": [
            "Flight CX922 Cebu to Hong Kong 12:25–15:20",
            "Connecting flight CX920 Hong Kong to Changsha 18:20–20:05",
            "Meet the English-speaking guide",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Changsha – Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Transfer to Zhangjiajie",
            "Visit Grand Canyon C Line Glass Bridge (incl. VR experience)",
            "Proceed to Furong Town",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 3",
          "title": "Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Visit 72 Floor Stilts Tower (outside view)",
            "Visit Tianmen Mountain (incl. cable car, glass walk, Tianmen Cave)",
            "Watch the Tianmen Fox Lady show",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 4",
          "title": "Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Visit Avatar Scenic Area (up and down by Bailong Lift)",
            "Visit No.1 Bridge, Avatar Hallelujah Mountain and Golden Whip Stream (Water Around Four Gates)",
            "Visit Bafeng Lake (incl. cruise)",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 5",
          "title": "Changsha – Hong Kong",
          "items": [
            "Hotel breakfast and check out",
            "Transfer to Changsha Airport; flight CX967 Changsha to Hong Kong (departure time printed as 13:99 in the source, arrival 15:00)",
            "Hong Kong overnight",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 6",
          "title": "Hong Kong – Cebu",
          "items": [
            "Hotel check out",
            "Transfer to airport; flight CX921 Hong Kong to Cebu 08:20–11:10"
          ]
        }
      ],
      "inclusions": [
        "5 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Sightseeing tours as specified, including all entrance fees",
        "Private coach with English-speaking tour guide",
        "Meals as listed",
        "Round-trip airfare via Cathay Pacific Airlines (7 kg hand carry and 23 kg checked baggage)"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls, mini bar, etc.",
        "Tips for driver and guide: USD30/pax (USD5 per pax per day for 6 days, collected with the tour fee)",
        "Philippine travel tax: USD25/pax",
        "Single supplement: USD300/pax",
        "Travel insurance",
        "Extra baggage allowance",
        "China visa"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–4: 4★ hotel in Changsha/Zhangjiajie area or similar",
        "Day 5: 4★ hotel in Hong Kong or similar"
      ],
      "notes": [
        "Meals: Day 1 none; Days 2–4 B/L/D; Day 5 breakfast only; Day 6 breakfast only (B = breakfast, L = lunch, D = dinner)",
        "No shopping stops are listed in this itinerary",
        "China visa is not included; Philippine passport holders need a China visa",
        "Child without bed is for ages 2–5",
        "All services are private; the order of attractions may be adjusted without prior notice in case of crowds or special circumstances",
        "Rooms are twin sharing; no triple room guaranteed, otherwise share with other guests or pay the single supplement",
        "Hotels may be replaced by similar ones"
      ],
      "places": [
        "Hong Kong",
        "Changsha",
        "Grand Canyon C Line Glass Bridge",
        "Furong Town",
        "72 Floor Stilts Tower",
        "Tianmen Mountain",
        "Tianmen Cave",
        "Tianmen Fox Lady Show",
        "Avatar Scenic Area (Zhangjiajie National Forest Park)",
        "Bailong Lift",
        "No.1 Bridge",
        "Avatar Hallelujah Mountain",
        "Golden Whip Stream",
        "Bafeng Lake"
      ],
      "posters": [
        "cn-poster-avatar-furong-no-shopping-0.jpg"
      ],
      "posterSize": [
        565,
        800
      ]
    },
    {
      "id": "avatar-skiing-chongqing-8d7n",
      "name": "Zhangjiajie (Avatar) Skiing – Chongqing 8D7N Tour",
      "subtitle": "Out Cebu · Xiamen Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "8 days 7 nights",
      "days": 8,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 699,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-02-27",
      "image": "cn-chongqing-night.jpg",
      "alt": "Chongqing’s skyline and bridge at night",
      "gallery": [
        "cn-chongqing-night.jpg"
      ],
      "summary": "Eight days from Cebu with a 2-hour ski session at Qixing Mountain, Zhangjiajie’s Avatar scenery, the Grand Canyon glass bridge and Chongqing, in 5-star hotels.",
      "overview": "Fly with Xiamen Airlines from Cebu via Quanzhou and Changsha to Changde, then on to Zhangjiajie. The winter highlight is a 2-hour skiing experience at Qixing Mountain Scenic Area (equipment included, snow suit not). You also visit Zhangjiajie National Forest Park (Avatar Hallelujah Mountain), the Grand Canyon glass bridge, and Chongqing’s Liziba Station and Hongya Cave night view. Hotels are local 5-star, with a 4-star on the first night in Quanzhou.",
      "travelDates": [
        {
          "d": "Jan 12–19",
          "y": 2027
        },
        {
          "d": "Jan 19–26",
          "y": 2027
        },
        {
          "d": "Feb 20–27",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Cebu, Jan 12–19 2027 to Feb 20–27 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Quanzhou",
          "items": [
            "Flight MF8696 Cebu to Jinjiang (Quanzhou) 18:50–21:50",
            "Arrive in Quanzhou and meet the tour guide at the airport",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Quanzhou – Changsha – Changde",
          "items": [
            "Hotel breakfast and check out",
            "Transfer to airport and fly to Changsha (MF8787 13:20–15:00)",
            "Visit Changsha IFS and Huangxing Pedestrian Street",
            "Visit Pozijie Food Street",
            "Transfer to Changde (2.5 hrs), then to hotel and check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Changde – Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Transfer to Zhangjiajie (2.5 hrs)",
            "Transfer to Qixing Mountain Scenic Area (incl. battery car, 1520 Platform and glass skywalk)",
            "2-hour skiing experience (incl. skiing equipment, excl. snow suit); if the ski resort is closed due to weather, it changes to the indoor Snow and Ice World",
            "Visit 72 Wonder Tower (outside view)",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 4",
          "title": "Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Visit Junsheng Sandstone Painting Museum",
            "Visit Latex Store (shopping stop)",
            "Transfer to hotel and check in",
            "Optional: Tianmen Mountain (cable cart, glass skywalk, Tianmen Cave) USD85/pax"
          ]
        },
        {
          "day": "Day 5",
          "title": "Zhangjiajie",
          "items": [
            "Hotel breakfast",
            "Visit Chinese Medicine Shop (shopping stop)",
            "Visit Zhangjiajie National Forest Park: up and down by Bailong Lift, No.1 Bridge, Breath-taking Platform, Avatar Hallelujah Mountain, Tianzi Mountain",
            "Visit Golden Whip Stream and Water Around Four Gates",
            "Back to hotel",
            "Optional: Charming Xiangxi Show USD70/pax"
          ]
        },
        {
          "day": "Day 6",
          "title": "Zhangjiajie – Qianjiang",
          "items": [
            "Hotel breakfast",
            "Visit Jewelry Store (shopping stop)",
            "Visit Grand Canyon C Line Glass Bridge (incl. VR experience)",
            "Transfer to Qianjiang (4 hrs), then to hotel and check in",
            "Optional: Huanglong Cave (incl. sightseeing boat) USD70/pax"
          ]
        },
        {
          "day": "Day 7",
          "title": "Qianjiang – Chongqing",
          "items": [
            "Hotel breakfast",
            "Transfer to Chongqing (4 hrs)",
            "Visit Liziba Station, where the light rail runs through residential buildings",
            "Visit Kuixing Tower, where the 22nd floor feels like the 1st floor",
            "Visit Jiefangbei Pedestrian Street",
            "Visit Bayi Food Street (enjoy local food on your own)",
            "Night view of Hongya Cave",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 8",
          "title": "Chongqing – Quanzhou – Cebu",
          "items": [
            "Breakfast box",
            "Transfer to airport and fly Chongqing to Jinjiang (MF8612 08:15–10:30)",
            "Connect to Cebu (MF8695 14:45–17:50)"
          ]
        }
      ],
      "inclusions": [
        "7 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Private coach with English-speaking tour guide",
        "Sightseeing tours as specified, including first-way entrance fees",
        "Meals as listed",
        "Round-trip airfare via Xiamen Airlines with 20 kg checked baggage",
        "2-hour skiing experience with ski equipment (snow suit not included)"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls, mini bar, etc.",
        "Extra baggage allowance",
        "Fuel surcharge: USD50/pax (subject to change)",
        "Philippine travel tax: pay directly at the airport",
        "Group visa: USD40/pax",
        "Tips for driver and guide: USD80/pax (USD10 per pax per day for 8 days)",
        "Single supplement: from USD169/pax",
        "Snow suit for skiing",
        "Optional tours"
      ],
      "optional": [
        "Tianmen Mountain (cable cart, glass skywalk, Tianmen Cave): USD85/pax",
        "Charming Xiangxi Show: USD70/pax",
        "Huanglong Cave (incl. sightseeing boat): USD70/pax"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: Local 4★ hotel in Quanzhou",
        "Day 2: Hilton Garden Inn Changde or similar 5★",
        "Day 3: Days Hotel by Wyndham Zhangjiajie or similar 5★",
        "Day 4–5: Best Western Plus Qingxinyuan Hotel (Zhangjiajie) or similar 5★",
        "Day 6: Blossomy Picturesque Hotel (Qianjiang) or similar 5★",
        "Day 7: Chongqing Gangsen International Grand Hotel or similar 5★"
      ],
      "notes": [
        "Meals: Day 1 none; Day 2 B/D; Days 3–6 B/L/D; Day 7 B/L; Day 8 breakfast box (B = breakfast, L = lunch, D = dinner)",
        "This rate includes 3 shopping stops: Latex Store, Chinese Medicine Shop, Jewelry Store",
        "Philippine passport holders need a China visa; the group visa is USD40/pax (excluded)",
        "Rooms are twin sharing; triple rooms are not guaranteed",
        "Price does not include VAT; an official receipt costs an extra 12% of the total",
        "Itinerary may change without prior notice and depends on weather; hotels may be replaced by similar ones",
        "Child with bed is under 18 yrs, child without bed under 10 yrs, infant under 2 yrs"
      ],
      "places": [
        "Quanzhou",
        "Changsha IFS",
        "Huangxing Pedestrian Street",
        "Pozijie Food Street",
        "Qixing Mountain Scenic Area",
        "1520 Platform",
        "Qixing Mountain Skiing",
        "72 Wonder Tower",
        "Junsheng Sandstone Painting Museum",
        "Zhangjiajie National Forest Park (Avatar)",
        "Bailong Lift",
        "No.1 Bridge",
        "Breath-taking Platform",
        "Avatar Hallelujah Mountain",
        "Tianzi Mountain",
        "Golden Whip Stream",
        "Water Around Four Gates",
        "Grand Canyon C Line Glass Bridge",
        "Liziba Station",
        "Kuixing Tower",
        "Jiefangbei Pedestrian Street",
        "Bayi Food Street",
        "Hongya Cave"
      ],
      "posters": [
        "cn-poster-avatar-skiing-chongqing-8d7n-0.jpg"
      ],
      "posterSize": [
        520,
        800
      ]
    },
    {
      "id": "charming-yunnan-8d7n",
      "name": "Charming Yunnan: Kunming – Dali – Lijiang 8D7N Tour",
      "subtitle": "Out Cebu · Xiamen Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "8 days 7 nights",
      "days": 8,
      "status": "available",
      "featured": true,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 999,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-03-20",
      "image": "cn-yunnan.jpg",
      "alt": "Mountains reflected in a lake, Yunnan",
      "gallery": [
        "cn-yunnan.jpg"
      ],
      "summary": "Eight days in Yunnan from Cebu: Dali Old Town and Ideal City, Lijiang Ancient City, Jade Dragon Snow Mountain, Blue Moon Valley and Kunming’s Stone Forest.",
      "overview": "Fly Xiamen Airlines from Cebu via Jinjiang to Kunming, then travel by private bus with an English-speaking guide through Dali, Lijiang and back to Kunming. You will see Dali Old Town, Xizhou Ancient Town, Lijiang Ancient City, Jade Dragon Snow Mountain by cable car, Blue Moon Valley and the Naigu Black Stone Forest. All hotels are 4-star, and the tour ends with a night and a sightseeing stop in Quanzhou.",
      "travelDates": [
        {
          "d": "Nov 24–Dec 1",
          "add": 100,
          "cur": "USD"
        },
        {
          "d": "Dec 12–19",
          "add": 200,
          "cur": "USD"
        },
        {
          "d": "Jan 9–16",
          "y": 2027
        },
        {
          "d": "Jan 16–23",
          "y": 2027,
          "add": 100,
          "cur": "USD"
        },
        {
          "d": "Feb 27–Mar 6",
          "y": 2027,
          "add": 200,
          "cur": "USD"
        },
        {
          "d": "Mar 6–13",
          "y": 2027,
          "add": 200,
          "cur": "USD"
        },
        {
          "d": "Mar 13–20",
          "y": 2027,
          "add": 200,
          "cur": "USD"
        }
      ],
      "travelDatesNote": "Departures from Cebu, Nov 24–Dec 1 2026 to Mar 13–20 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Jinjiang (Quanzhou)",
          "items": [
            "Flight MF8696 Cebu to Jinjiang 18:50–21:50",
            "Arrive at Jinjiang Airport and meet the tour guide",
            "Hotel check in (hotel arranged by Xiamen Airlines)"
          ]
        },
        {
          "day": "Day 2",
          "title": "Jinjiang – Kunming – Dali",
          "items": [
            "Packed breakfast and check out",
            "Transfer to Jinjiang Airport and fly to Kunming (MF8409 07:45–10:40)",
            "Arrive in Kunming and meet the tour guide",
            "After lunch, drive to Dali and visit Santorini (Dali Ideal City) with afternoon tea (incl. uphill electric vehicle)",
            "Visit Dali Old Town",
            "Dinner, then hotel check in"
          ]
        },
        {
          "day": "Day 3",
          "title": "Dali – Lijiang",
          "items": [
            "Hotel breakfast and check out",
            "Visit Xizhou Ancient Town, a Bai ethnic minority town",
            "Drive to Lijiang",
            "Visit Medicinal Herbs Exhibition Center (Medicine Store, shopping stop)",
            "Visit Lijiang Ancient City",
            "Dinner, then hotel check in",
            "Optional: Dali Xizhou Music Caravan with singer performance, 1 drink, photo session (3 free digital photos), drone video (about 30 seconds free) and Bai ethnic “Golden Flower” dance: USD45/pax",
            "Optional: Lijiang Eternal Love Show: USD60/pax"
          ]
        },
        {
          "day": "Day 4",
          "title": "Lijiang",
          "items": [
            "Hotel breakfast",
            "Visit Latex/Silk Store (shopping stop)",
            "Jade Dragon Snow Mountain by Spruce Meadow cable car, and the large-scale live performance “Impression Lijiang”",
            "Visit Blue Moon Valley (electric cart not included, USD9/pax)",
            "Optional: dinner upgrade to Lijiang Imperial Banquet, price difference USD25/pax (regular seat) or USD40/pax (VIP seat); standard dinner is a group meal"
          ]
        },
        {
          "day": "Day 5",
          "title": "Lijiang – Kunming",
          "items": [
            "Hotel breakfast and check out",
            "Drive back to Kunming",
            "Visit Chuxiong Yi Ancient Town",
            "Visit Jewelry Shop (shopping stop)",
            "Visit Kunming Old Street",
            "Visit Nanping Street",
            "Visit Jinma–Biji Archways"
          ]
        },
        {
          "day": "Day 6",
          "title": "Kunming",
          "items": [
            "Hotel breakfast",
            "Visit Astaxanthin Shop (shopping stop)",
            "Visit Naigu Stone Forest, the “Black Stone Forest”",
            "Visit Haigeng Dam",
            "Visit Park 1903, stroll the French-style district and try Kunming’s local food"
          ]
        },
        {
          "day": "Day 7",
          "title": "Kunming – Jinjiang (Quanzhou)",
          "items": [
            "Hotel or packed breakfast and check out",
            "Transfer to airport and fly to Jinjiang (MF8410 11:45–14:15)",
            "Arrive at Jinjiang Airport and meet the tour guide",
            "Visit Kaiyuan Temple",
            "Visit West Street",
            "Visit Bell Tower",
            "Hotel check in"
          ]
        },
        {
          "day": "Day 8",
          "title": "Jinjiang – Cebu",
          "items": [
            "Hotel breakfast and check out",
            "Free time",
            "Transfer to airport and fly home (MF817 14:20–16:55)"
          ]
        }
      ],
      "inclusions": [
        "Economy airfare and taxes with Xiamen Airlines (round trip)",
        "Baggage allowance: 1 pc 23 kg checked and 1 pc 7 kg carry-on",
        "7 nights’ accommodation, twin sharing, in 4★ hotels (Day 1 hotel arranged by Xiamen Airlines)",
        "Private bus with English-speaking tour guide",
        "Sightseeing tours as specified, including first-way entrance fees",
        "Meals: breakfast and 8 meals"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls, mini bar, etc.",
        "Travel insurance",
        "Philippine travel tax: USD30/pax (collected with the tour fee)",
        "China group visa: USD40/pax (collected with the tour fee)",
        "Tips for driver and guide: USD48/pax (USD6 per pax per day for 8 days, collected with the tour fee)",
        "Single supplement: USD160/pax",
        "Fuel surcharge (subject to change)",
        "Optional tours"
      ],
      "optional": [
        "Dali Xizhou Music Caravan + singer performance + 1 drink + photo session (3 free digital photos) + drone video + Bai “Golden Flower” dance: USD45/pax",
        "Lijiang Eternal Love Show: USD60/pax",
        "Lijiang Imperial Banquet upgrade: USD25/pax (regular seat) or USD40/pax (VIP seat)",
        "Blue Moon Valley electric cart: USD9/pax (not included)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1: 4★ hotel in Jinjiang (arranged by Xiamen Airlines)",
        "Day 2: 4★ hotel in Dali",
        "Day 3–4: 4★ hotel in Lijiang",
        "Day 5–6: 4★ hotel in Kunming",
        "Day 7: 4★ hotel in Quanzhou"
      ],
      "notes": [
        "Meals: Day 1 none; Days 2–4 B/L/D; Days 5–6 B/L; Day 7 breakfast; Day 8 breakfast (B = breakfast, L = lunch, D = dinner)",
        "This rate includes shop visits: Medicine Store, Jewelry Shop, Latex/Silk Store, Astaxanthin Shop",
        "Philippine passport holders need a China visa; the group visa is USD40/pax (excluded)",
        "Adult fare is for age 11 and above; children aged 2–10 without bed have a lower fare",
        "The order of attractions may change due to weather, traffic or visitor volume; the agency is not liable for losses from force majeure; no refunds for services cancelled during the trip, and tips must be paid for the full number of days",
        "Itinerary, flight times and hotels are subject to final confirmation; hotels may be replaced by similar ones",
        "Yunnan has big day–night temperature differences and strong UV: bring sun protection, hat, sunglasses, a wind-proof jacket and a warm coat for high altitude, and non-slip shoes",
        "At high altitude, slow down, drink warm water, rest well and avoid alcohol and strenuous exercise; tell the guide at once if you feel severe dizziness or chest tightness",
        "Bring your own medication in original packaging; do not pick or eat wild mushrooms or fruit; do not trust low-price roadside vendors"
      ],
      "places": [
        "Jinjiang",
        "Dali Ideal City (Santorini)",
        "Dali Old Town",
        "Xizhou Ancient Town",
        "Lijiang Ancient City",
        "Jade Dragon Snow Mountain",
        "Spruce Meadow",
        "Impression Lijiang",
        "Blue Moon Valley",
        "Chuxiong Yi Ancient Town",
        "Kunming Old Street",
        "Nanping Street",
        "Jinma–Biji Archways",
        "Naigu Stone Forest (Black Stone Forest)",
        "Haigeng Dam",
        "Park 1903",
        "Kaiyuan Temple",
        "West Street",
        "Bell Tower"
      ],
      "posters": [
        "cn-poster-charming-yunnan-8d7n-0.jpg"
      ],
      "posterSize": [
        529,
        800
      ]
    },
    {
      "id": "harbin-7d6n",
      "name": "Harbin Winter 7D6N Tour",
      "subtitle": "Out Cebu · China Eastern Airlines",
      "region": "intl",
      "country": "China",
      "flag": "cn",
      "duration": "7 days 6 nights",
      "days": 7,
      "status": "available",
      "featured": false,
      "departure": "Cebu (Mactan-Cebu International)",
      "price": {
        "from": 1888,
        "label": "From",
        "unit": "per pax",
        "currency": "USD"
      },
      "year": 2026,
      "ends": "2027-01-14",
      "image": "cn-harbin-ice.jpg",
      "alt": "Ice sculptures at the Harbin Ice and Snow World",
      "gallery": [
        "cn-harbin-ice.jpg"
      ],
      "summary": "Seven days in Harbin from Cebu: Ice and Snow World, Siberian Tiger Park, Volga Manor, Polar Aquarium and the city’s Russian-style landmarks.",
      "overview": "Fly China Eastern Airlines from Cebu via Shanghai to Harbin and stay six nights in 4-star hotels, travelling by private coach with an English-speaking guide. The days cover Harbin Ice and Snow World, the Siberian Tiger Park, Polar Aquarium, Volga Manor, St. Sophia Church Square and the Songhua River, with an afternoon tea and a glass of ice wine and vodka along the way.",
      "travelDates": [
        {
          "d": "Jan 8–14",
          "y": 2027
        }
      ],
      "travelDatesNote": "Departures from Cebu, Jan 8–14 2027 to Jan 8–14 2027. The rate changes by date: an amount on a date is added to the base rate per pax. Seats are limited and confirmed at booking.",
      "itinerary": [
        {
          "day": "Day 1",
          "title": "Cebu – Shanghai – Harbin",
          "items": [
            "Flight MU5024 Cebu to Shanghai 02:40–06:50, then MU9063 Shanghai to Harbin 13:55–17:00 (8 Jan)",
            "Arrive at Harbin International Airport and meet the English-speaking guide",
            "Visit Northeast Cotton Padded Store (shopping stop)",
            "Transfer to hotel and check in"
          ]
        },
        {
          "day": "Day 2",
          "title": "Harbin",
          "items": [
            "Hotel breakfast",
            "Visit the Songhua River to watch winter swimmers, with cable way (one way)",
            "Photo stop at the viral Giant Snowman",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 3",
          "title": "Harbin",
          "items": [
            "Hotel breakfast",
            "Visit Volga Manor",
            "Taste a glass of ice wine and vodka",
            "Visit Pavlov Castle",
            "Visit Pushkin Salon",
            "Visit St. Nicholas Church and other famous Russian folk sites",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 4",
          "title": "Harbin",
          "items": [
            "Hotel breakfast",
            "Visit Siberian Tiger Park (incl. thrilling safari bus)",
            "Visit Harbin Grand Theatre (outside view)",
            "Visit Chinese Baroque Historical District",
            "Afternoon tea",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 5",
          "title": "Harbin",
          "items": [
            "Hotel breakfast",
            "Visit Polar Aquarium (incl. beluga whale show)",
            "Visit Harbin Ice and Snow World",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 6",
          "title": "Harbin",
          "items": [
            "Hotel breakfast",
            "Visit Russian Handicraft Mall (shopping stop)",
            "Visit Chocolate Workshop (shopping stop)",
            "Visit Middle East Railway Bridge",
            "Visit Songhua Riverside",
            "Visit Stalin Park",
            "Visit Flood Control Monument",
            "Free shopping on Central Street",
            "Photo stop at St. Sophia Church Square",
            "Transfer back to hotel"
          ]
        },
        {
          "day": "Day 7",
          "title": "Harbin – Shanghai – Cebu",
          "items": [
            "Hotel breakfast",
            "Free time until departure",
            "Transfer to airport",
            "Flight MU5632 Harbin to Shanghai 13:10–16:35, then MU5023 Shanghai to Cebu 21:15–01:40 (+1 day) (14 Jan)"
          ]
        }
      ],
      "inclusions": [
        "6 nights’ accommodation, twin sharing, with daily hotel breakfast",
        "Sightseeing tours as specified, including all entrance fees",
        "Private coach with English-speaking tour guide",
        "Meals as listed",
        "Round-trip airfare via China Eastern Airlines (7 kg hand carry and 23 kg checked baggage)"
      ],
      "exclusions": [
        "Personal expenses such as telephone calls, mini bar, etc.",
        "Tips for driver and guide: USD35/pax (USD5 per pax per day for 7 days, collected with the tour fee)",
        "Philippine travel tax: USD30/pax",
        "Single supplement: USD300/pax",
        "Travel insurance",
        "Extra baggage allowance",
        "China visa",
        "Fuel surcharge: USD50/pax (subject to change)"
      ],
      "hotelsLabel": "Hotels",
      "hotels": [
        "Day 1–6: 4★ hotel in Harbin or similar"
      ],
      "notes": [
        "Meals: Day 1 none; Days 2–6 B/L/D; Day 7 breakfast only (B = breakfast, L = lunch, D = dinner)",
        "Shopping stops listed: Northeast Cotton Padded Store, Russian Handicraft Mall, Chocolate Workshop",
        "China visa is not included; Philippine passport holders need a China visa",
        "Child without bed is for ages 2–5",
        "All services are private; the order of attractions may be adjusted without prior notice in case of crowds or special circumstances",
        "Rooms are twin sharing; no triple room guaranteed, otherwise share with other guests or pay the single supplement",
        "Hotels may be replaced by similar ones"
      ],
      "places": [
        "Harbin",
        "Songhua River",
        "Giant Snowman",
        "Volga Manor",
        "Pavlov Castle",
        "Pushkin Salon",
        "St. Nicholas Church",
        "Siberian Tiger Park",
        "Harbin Grand Theatre",
        "Chinese Baroque Historical District",
        "Polar Aquarium",
        "Harbin Ice and Snow World",
        "Middle East Railway Bridge",
        "Stalin Park",
        "Flood Control Monument",
        "Central Street",
        "St. Sophia Church Square"
      ],
      "posters": [
        "cn-poster-harbin-7d6n-0.jpg"
      ],
      "posterSize": [
        566,
        800
      ]
    }
  ];

  /* ---------- Photos from the agency's galleries ---------- */
  IC.gallery = [
    /* Group tours, events and transfers: stills from the agency's own trip videos (assets/img/media/gallery/, each with an -800 copy) */
    { id: 'gallery/tokyo-shibuya-group.webp', shape: 'tall', title: 'Shibuya, Tokyo', sub: 'Japan group tour', cat: 'intl' },
    { id: 'gallery/hongkong-disneyland-gate.webp', shape: 'tall', title: 'Hong Kong Disneyland', sub: 'Hong Kong group tour', cat: 'intl' },
    { id: 'gallery/group-resort-pool.webp', shape: 'wide', title: 'Resort day out', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/event-concert-stage.webp', shape: 'tall', title: 'Live band night', sub: 'Events', cat: 'events' },
    { id: 'gallery/tokyo-shibuya-crossing.webp', shape: 'tall', title: 'Shibuya Crossing', sub: 'Japan group tour', cat: 'intl' },
    { id: 'gallery/group-hilltop.webp', shape: 'wide', title: 'Hilltop stop', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/event-seminar-talk.webp', shape: 'tall', title: 'Seminar session', sub: 'Seminars & events', cat: 'events' },
    { id: 'gallery/hongkong-disneyland-castle.webp', shape: 'tall', title: 'Castle of Magical Dreams', sub: 'Hong Kong Disneyland', cat: 'intl' },
    { id: 'gallery/group-heritage-house.webp', shape: 'wide', title: 'Heritage house visit', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/airport-check-in.webp', shape: 'tall', title: 'Airport check-in', sub: 'Assisted by our team', cat: 'transport' },
    { id: 'gallery/hongkong-skyline-group.webp', shape: 'tall', title: 'Harbour view', sub: 'Hong Kong group tour', cat: 'intl' },
    { id: 'gallery/group-orchid-farm.webp', shape: 'tall', title: 'Orchid farm visit', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/event-awarding.webp', shape: 'tall', title: 'On stage', sub: 'Seminars & events', cat: 'events' },
    { id: 'gallery/group-hall-banner.webp', shape: 'wide', title: 'All set to go', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/hongkong-museum-group.webp', shape: 'tall', title: 'Museum stop', sub: 'Hong Kong group tour', cat: 'intl' },
    { id: 'gallery/group-hotel-departure.webp', shape: 'wide', title: 'Hotel departure', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/transport-coach-bus.webp', shape: 'tall', title: 'Tour coach', sub: 'Transfers', cat: 'transport' },
    { id: 'gallery/group-site-visit.webp', shape: 'tall', title: 'Site visit', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/group-airport-arrival.webp', shape: 'wide', title: 'Wheels down', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/group-farm-stop.webp', shape: 'wide', title: 'Farm stop', sub: 'Group tour', cat: 'groups' },
    { id: 'gallery/group-gala-hall.webp', shape: 'wide', title: 'Gala night', sub: 'Events', cat: 'events' },
    /* Earlier photos from the agency's Wix galleries */
    { id: '952787_6a8b5ab3b00d41bcb1a8915073aa4861~mv2.jpg', shape: 'wide',   title: 'Loboc River Lunch', sub: 'Bohol', cat: 'local' },
    { id: '952787_a67b7dcf552942a294501fc5c8a044f8~mv2.jpg', shape: 'tall',   title: 'Underground River', sub: 'Puerto Princesa, Palawan', cat: 'local' },
    { id: '952787_9bc781dfae87479dae7fd84ed8b09c42~mv2.jpg', shape: 'wide',   title: 'Orientation course for local legislators', sub: 'MICE & seminars', cat: 'events' },
    { id: '952787_9a7ffc3f7a2e47d18e2086d04b3b9341~mv2.jpg', shape: 'square', title: 'Snorkelling with our guests', sub: 'Cebu', cat: 'local' },
    { id: '952787_250d67a9fabf4973bcde54f948a225b3~mv2.jpg', shape: 'tall',   title: 'Camotes', sub: 'Island getaway', cat: 'local' },
    { id: '952787_2d330c92a5d342099b7d4258256ffa11~mv2.jpg', shape: 'square', title: 'Bohol', sub: 'Countryside tour', cat: 'local' },
    { id: '952787_d42f442bb8264e678cbc88bdc2824eff~mv2.jpg', shape: 'tall',   title: 'Seminar logistics', sub: 'Meetings & events', cat: 'events' },
    { id: '952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg', shape: 'wide',   title: 'Mangodlong Beach', sub: 'Partner resort, Camotes', cat: 'local' },
    { id: '952787_f6e5b9acd62049db802bcfd86e7fd352~mv2.jpg', shape: 'wide',   title: 'Participants’ orientation', sub: 'MICE & seminars', cat: 'events' },
    { id: '952787_515cfff1c9a64aa9b330a027322b9e7a~mv2.jpg', shape: 'square', title: 'Air-conditioned transport', sub: 'Vans, coasters & buses', cat: 'transport' },
    { id: '952787_0050a801a0b94a199d0f8d18215c1275~mv2.jpg', shape: 'wide',   title: 'Merlion & Marina Bay Sands', sub: 'Singapore group tour', cat: 'intl' },
    { id: '952787_a667b39095f54b15824f7157c48f4afa~mv2.jpg', shape: 'wide',   title: 'Universal Studios Singapore', sub: 'Singapore group tour', cat: 'intl' },
    { id: '952787_4ee43fd7e9794e2585f94ff3b0ba89e8~mv2.jpg', shape: 'square', title: 'Underground River', sub: 'Puerto Princesa, Palawan', cat: 'local' },
    { id: '952787_47fb234e9fc643c685154b62a85432c9~mv2.jpg', shape: 'tall',   title: 'Jewel Changi', sub: 'Singapore group tour', cat: 'intl' },
    { id: '952787_e0d14697042d448cb553e113bb99895a~mv2.jpg', shape: 'wide',   title: 'Island hopping', sub: 'Boat tour with our guests', cat: 'local' },
    { id: '952787_e3e293ea8aca4eae85457a5a8007e670~mv2.jpg', shape: 'square', title: 'Mangrove walk', sub: 'Camotes Islands', cat: 'local' },
    { id: '952787_3483752836144268b346adf78f3b398f~mv2.jpg', shape: 'wide',   title: 'Malay Heritage Centre', sub: 'Singapore group tour', cat: 'intl' },
    { id: '952787_e8ab6be92bd54b05859482cb8c9b5bb2~mv2.jpg', shape: 'square', title: 'Snorkelling', sub: 'Island getaway', cat: 'local' }
  ];

  IC.hotelPhotos = ['952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg', '952787_26a50047e88545a18d5e6c89816805bc~mv2.jpg', '952787_2c289935d14a4992b20f77b49e988dba~mv2.jpg', '952787_bf04b5da3fbe466388fd7b0ce1011bd7~mv2.jpg'];
  IC.micePhotos = ['952787_9bc781dfae87479dae7fd84ed8b09c42~mv2.jpg', '952787_d42f442bb8264e678cbc88bdc2824eff~mv2.jpg', '952787_f6e5b9acd62049db802bcfd86e7fd352~mv2.jpg'];

  /* ---------- Team ----------
     Each card is a desk in the agency. To turn one into a personal profile,
     fill in `name` (and `photo`, a media id listed in the LOCAL map above):
       { name: 'Juan dela Cruz', photo: '952787_xxxxxxxx~mv2.jpg', role: 'Reservations & Ticketing', ... }
     Leave `name` empty and the card shows the desk instead of a person, so the
     section stays accurate until the agency supplies names and photographs.
     `email` is optional and falls back to the main inquiries address.        */
  IC.team = [
    /* ---------- Team members ----------
       PLACEHOLDER PROFILES. The names, taglines and bios below are samples so
       the cards and profile pages (team?member=<slug>) can be seen and
       styled; the About page and each profile carry a visible "sample" note.
       Replace each entry with a real staff member: set `name`, drop in a
       `photo` (a media id listed in the LOCAL map above) and update
       `role`, `dept`, `tagline`, `bio`, `handles` and `focus`. Leave `email`
       empty and it falls back to the main inquiries address; set it to route a
       person's mail directly. `placeholder: true` shows the sample note; set
       it to false (or remove it) once the details are real.               */
    {
      slug: 'reservations-ticketing', name: 'Maria Santos', role: 'Reservations & Ticketing Lead',
      dept: 'Reservations & Ticketing', icon: 'ticketing', photo: '', email: '', placeholder: true,
      tagline: 'Finds the right fare and keeps every booking on track.',
      bio: 'Maria looks after flights and ferry tickets from first quote to final itinerary. She compares fares across carriers, watches for the best release dates and steps in quickly when plans change so your seats and schedule stay secure.',
      handles: ['Flight & ferry ticketing', 'Fare quotations & re-issues', 'Rebooking & schedule changes'],
      focus: ['Domestic & international air', 'Group bookings', 'Charter flights'],
      experience: 'Reservations & fares', languages: 'English, Filipino, Cebuano'
    },
    {
      slug: 'tours-operations', name: 'Jose Reyes', role: 'Tours & Operations Manager',
      dept: 'Tours & Operations', icon: 'tours', photo: '', email: '', placeholder: true,
      tagline: 'Plans the days and keeps the trip running on the ground.',
      bio: 'Jose builds the itinerary, assigns your licensed guide and vehicle and coordinates every stop so the day flows without a hitch. From island-hopping in the Visayas to charter tours abroad, he keeps timings realistic and the pace comfortable.',
      handles: ['Local & international packages', 'Licensed tour guides', 'Custom itineraries'],
      focus: ['Bohol & Camotes', 'Da Nang & Vietnam', 'Tailor-made trips'],
      experience: 'Tour operations', languages: 'English, Filipino, Cebuano'
    },
    {
      slug: 'accommodation-transport', name: 'Ana Cruz', role: 'Accommodation & Transport Officer',
      dept: 'Accommodation & Transport', icon: 'hotel', photo: '', email: '', placeholder: true,
      tagline: 'Secures the right rooms and the right ride for your group.',
      bio: 'Ana books your stay with our resort and hotel partners and reserves the van, coaster or bus that fits the group and the route. She matches accommodation to your budget and makes sure airport transfers line up with your flights.',
      handles: ['Hotel & resort bookings', 'Van, coaster & bus reservations', 'Airport transfers'],
      focus: ['Partner resorts', 'Group transport', 'Seat-in-coach & private'],
      experience: 'Accommodation & fleet', languages: 'English, Filipino, Cebuano'
    },
    {
      slug: 'mice-events', name: 'Paolo Garcia', role: 'MICE & Events Coordinator',
      dept: 'Meetings, Incentives & Events', icon: 'mice', photo: '', email: '', placeholder: true,
      tagline: 'Runs conventions, seminars and team building end to end.',
      bio: 'Paolo handles meetings, incentives, conventions and trainings from the venue and room block to delegate meals and the closing programme. He has organised orientation courses and seminars for local government units and corporate teams.',
      handles: ['Seminars & conventions', 'Delegate transport & meals', 'Team-building programmes'],
      focus: ['LGU seminars', 'Corporate events', 'Incentive travel'],
      experience: 'Events & logistics', languages: 'English, Filipino, Cebuano'
    },
    {
      slug: 'guest-care', name: 'Liza Mendoza', role: 'Guest Care Specialist',
      dept: 'Guest Care', icon: 'ticketing', photo: '', email: '', placeholder: true,
      tagline: 'Your first point of contact, before, during and after the trip.',
      bio: 'Liza answers your first inquiry, walks you through your quotation and stays reachable while you travel. She keeps you updated on confirmations and requirements so nothing catches you by surprise.',
      handles: ['Inquiries & quotations', 'Booking follow-through', '24/7 traveller support'],
      focus: ['Quotation help', 'Travel requirements', 'After-trip care'],
      experience: 'Customer care', languages: 'English, Filipino, Cebuano'
    },
    {
      slug: 'sales-partnerships', name: 'Marco Villanueva', role: 'Sales & Partnerships',
      dept: 'Sales & Partnerships', icon: 'tours', photo: '', email: '', placeholder: true,
      tagline: 'Builds the packages and the partner network behind them.',
      bio: 'Marco develops tour packages and the relationships with airlines, resorts and ground operators that make them possible. He also looks after corporate accounts and agency partners who book with Immaculate Connections.',
      handles: ['Package development', 'Corporate & agency accounts', 'Supplier partnerships'],
      focus: ['New destinations', 'B2B partners', 'Seasonal offers'],
      experience: 'Sales & product', languages: 'English, Filipino, Cebuano'
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

  /* ---------- Know-before-you-go guides, keyed by country ----------
     Practical pre-trip tips shown on each package page (initPackagePage).
     Written for a Philippine-passport traveller, since the international
     packages depart Manila/Cebu. Entry rules and budgets change, so the page
     carries a "confirm the latest" note and points to the agency for help.
     `ic` maps to an icon in main.js; keep the nine topics in this order.     */
  IC.countryGuide = {
    Vietnam: [
      { ic: 'entry', t: 'Entry requirements', lead: 'Visa-free up to 21 days', body: 'Philippine passport holders enter Vietnam visa-free for stays up to 21 days. Your passport must be valid at least 6 months beyond your return date and have blank pages. No vaccinations are required; just keep routine shots up to date.' },
      { ic: 'money', t: 'Money', lead: 'Vietnamese dong (₫)', body: 'Cash rules for markets, taxis and street food; cards work in hotels, malls and larger restaurants. Tipping is not expected, but rounding up or ₫20–50k for guides and drivers is appreciated. Budget roughly ₱1,500–2,500 a day beyond your package for meals and extras.' },
      { ic: 'weather', t: 'Weather & what to pack', lead: 'Warm and humid', body: 'Central Vietnam (Da Nang, Hoi An) is hot most of the year; the north (Hanoi, Sapa) is cooler and can be chilly from December to February. Pack light breathable clothes, a light jacket for the north, a rain layer, sunblock and comfy walking shoes.' },
      { ic: 'transport', t: 'Getting around', lead: 'Grab is your friend', body: 'Use the Grab app for cars and motorbike taxis at fair, up-front prices. Cities are walkable, and your package includes airport transfers and a private coach on tour days. Avoid unmetered street taxis.' },
      { ic: 'language', t: 'Language', lead: 'Vietnamese; some English', body: 'English is understood in hotels and tourist spots but limited elsewhere. A few words go far: Xin chào (hello), Cảm ơn (thank you), Bao nhiêu? (how much?). Your English-speaking guide handles the rest.' },
      { ic: 'culture', t: 'Culture & etiquette', lead: 'Dress modestly at temples', body: 'Cover shoulders and knees at pagodas and remove your shoes when asked. Ask before photographing people, keep your voice down inside temples, and use both hands when giving or receiving. Friendly bargaining at markets is normal.' },
      { ic: 'safety', t: 'Safety & health', lead: 'Safe; mind the traffic', body: 'Vietnam is safe for tourists; the main hazard is crossing busy roads, so walk slowly and steadily. Watch for bag-snatching in crowds and stick to Grab or hotel taxis. Drink bottled water. Emergencies: police 113, ambulance 115.' },
      { ic: 'connectivity', t: 'Connectivity', lead: 'Cheap local SIM or eSIM', body: 'Grab a Viettel or Mobifone tourist SIM/eSIM at the airport for fast, affordable data. Wi-Fi is widespread in hotels and cafés. Handy apps: Grab, Google Maps and Google Translate with Vietnamese saved offline.' },
      { ic: 'food', t: 'Must-see sights & food', lead: 'Golden Bridge & mì Quảng', body: 'Do not miss Ba Na Hills’ Golden Bridge, Hoi An’s lantern-lit old town and the Marble Mountains. Eat your way through phở, bánh mì, mì Quảng, fresh spring rolls and Vietnamese egg coffee.' }
    ],
    China: [
      { ic: 'entry', t: 'Entry requirements', lead: 'Tourist visa required', body: 'Philippine passport holders need a Chinese tourist (L) visa arranged before travel — our ticketing desk can walk you through the requirements. Passport valid 6+ months with blank pages. No vaccinations are required.' },
      { ic: 'money', t: 'Money', lead: 'Renminbi (¥); go cashless', body: 'China runs on mobile pay — set up Alipay or WeChat Pay and link a Visa/Mastercard before you fly; they now work for tourists almost everywhere. Carry some cash as backup. Tipping is not customary. Budget roughly ₱2,000–3,500 a day for meals and extras.' },
      { ic: 'weather', t: 'Weather & what to pack', lead: 'Four seasons; check your month', body: 'Shanghai has hot, humid summers and cold winters; Yunnan (Kunming, Lijiang) is mild by day but cool at night and sits at altitude. Layers, a warm jacket, comfortable shoes, sunblock and a rain layer cover most dates.' },
      { ic: 'transport', t: 'Getting around', lead: 'Metro plus Didi', body: 'City metros are fast, cheap and signed in English; use the Didi app (with in-app English) for taxis. Your package covers airport transfers and a private coach on tour days, and high-speed trains link the cities.' },
      { ic: 'language', t: 'Language', lead: 'Mandarin; little English', body: 'English is limited outside hotels, so keep translations handy. Useful words: Nǐ hǎo (hello), Xièxie (thank you), Duōshǎo qián? (how much?). Your guide translates throughout the tour.' },
      { ic: 'culture', t: 'Culture & etiquette', lead: 'Mind the customs', body: 'Give and receive items with both hands, never stand chopsticks upright in rice, and queue patiently. Photography can be restricted at temples and official sites — follow the signs and your guide.' },
      { ic: 'safety', t: 'Safety & health', lead: 'Very safe; carry your passport', body: 'China is very safe with low street crime; carry your passport as ID. Drink bottled or boiled water. Emergencies: police 110, ambulance 120. Keep your hotel’s name in Chinese to show taxi drivers.' },
      { ic: 'connectivity', t: 'Connectivity', lead: 'VPN + roaming, not a local SIM', body: 'Google, Facebook, WhatsApp and Instagram are blocked in China — install a trusted VPN before you arrive. The easiest data is an international roaming SIM/eSIM that routes outside the firewall. WeChat keeps you in touch and pays.' },
      { ic: 'food', t: 'Must-see sights & food', lead: 'The Bund & Lijiang old town', body: 'See Shanghai’s Bund skyline and Yu Garden, or Yunnan’s Stone Forest, Lijiang old town and Jade Dragon Snow Mountain. Try xiaolongbao soup dumplings, hotpot, roast duck and Yunnan rice noodles.' }
    ],
    Japan: [
      { ic: 'entry', t: 'Entry requirements', lead: 'Tourist visa required', body: 'Philippine passport holders need a Japan short-stay tourist visa before travel — our ticketing desk can guide you through the documents. Passport valid for the whole stay. No vaccinations are required.' },
      { ic: 'money', t: 'Money', lead: 'Yen (¥); carry cash', body: 'Cards are widely accepted, but Japan still loves cash — keep some for small shops, shrines and buses. Get a Suica or Pasmo IC card for trains and convenience stores. Do NOT tip; it can cause confusion. Budget roughly ₱3,000–5,000 a day for meals and extras.' },
      { ic: 'weather', t: 'Weather & what to pack', lead: 'Cool at Mt. Fuji; check your month', body: 'Tokyo is mild in spring and autumn, hot and humid in summer, and cold in winter; Mt. Fuji’s fifth station is always chilly and windy. Bring layers, a warm jacket for Fuji, comfy walking shoes and a compact umbrella.' },
      { ic: 'transport', t: 'Getting around', lead: 'Trains run on time', body: 'Japan’s trains and subways are punctual and reach everything; tap in with a Suica or Pasmo card. Google Maps gives exact platforms and times. Your package includes airport transfers and coach transport on tour days.' },
      { ic: 'language', t: 'Language', lead: 'Japanese; some English', body: 'City signs are bilingual and staff are helpful, though spoken English is limited. Useful words: Konnichiwa (hello), Arigatō (thank you), Sumimasen (excuse me). Google Translate’s camera reads menus for you.' },
      { ic: 'culture', t: 'Culture & etiquette', lead: 'Quiet and orderly', body: 'Keep phone calls off the trains, avoid eating while walking, queue neatly and take your rubbish with you. Remove shoes where indicated, bow slightly in greeting, and never tip — a little politeness is deeply appreciated.' },
      { ic: 'safety', t: 'Safety & health', lead: 'Among the world’s safest', body: 'Crime is extremely low and lost items are often handed in. Tap water is safe to drink. Emergencies: police 110, ambulance and fire 119. Carry your passport, as it is your official ID while in Japan.' },
      { ic: 'connectivity', t: 'Connectivity', lead: 'Pocket Wi-Fi or eSIM', body: 'Rent a pocket Wi-Fi or buy a Japan eSIM for reliable data; free Wi-Fi exists but is patchy. Handy apps: Google Maps, Google Translate, Japan Travel by Navitime, and your Suica in Apple or Google Wallet.' },
      { ic: 'food', t: 'Must-see sights & food', lead: 'Mt. Fuji, Shibuya, sushi', body: 'See Mt. Fuji and Lake Kawaguchi, Tokyo’s Sensō-ji temple, the Shibuya crossing and Yokohama’s bay. Eat sushi, ramen, tempura and okonomiyaki — and grab snacks from any convenience store.' }
    ],
    Philippines: [
      { ic: 'entry', t: 'Entry requirements', lead: 'Domestic: a valid ID', body: 'For local flights and ferries you need a valid government-issued ID and your booking. Foreign visitors from most countries enter visa-free for 30 days with a passport valid 6+ months and an onward ticket.' },
      { ic: 'money', t: 'Money', lead: 'Philippine peso (₱)', body: 'Carry cash for island towns, tricycles, market stalls and entrance fees — ATMs can be scarce on smaller islands. Cards and GCash work in resorts and cities. Tipping around 10% or loose change for guides, drivers and boatmen is customary.' },
      { ic: 'weather', t: 'Weather & what to pack', lead: 'Tropical; check the season', body: 'Expect hot, sunny days most of the year, with the drier months roughly November to May. Pack swimwear, reef-safe sunblock, a hat, light quick-dry clothes, sandals and a rain layer for afternoon showers.' },
      { ic: 'transport', t: 'Getting around', lead: 'Boats, vans and Grab', body: 'Islands are reached by ferry or banca boat, and your package includes transfers plus a private van and boat where needed. In Cebu, use the Grab app for city rides. Keep small bills for tricycles and habal-habal.' },
      { ic: 'language', t: 'Language', lead: 'English widely spoken', body: 'English is an official language and understood almost everywhere, so you will have no trouble. Locals speak Cebuano here — Maayong buntag (good morning) and Salamat (thank you) always earn a smile.' },
      { ic: 'culture', t: 'Culture & etiquette', lead: 'Warm and easygoing', body: 'Filipinos are famously friendly and a smile goes far. Dress modestly in churches, cover up away from the beach, and ask before photographing people. A polite “thank you” is always welcome.' },
      { ic: 'safety', t: 'Safety & health', lead: 'Friendly; usual care', body: 'The tourist areas here are welcoming and safe; take normal care with valuables and board only registered boats with life vests. Drink bottled water on the islands and bring any personal medicine. Emergency hotline: 911.' },
      { ic: 'connectivity', t: 'Connectivity', lead: 'Globe/Smart SIM + GCash', body: 'Buy a Globe or Smart tourist SIM at the airport for data; signal can drop on remote islands, so download your maps offline. GCash is handy for payments, and resorts and cafés usually have Wi-Fi.' },
      { ic: 'food', t: 'Must-see sights & food', lead: 'Beaches, lechon & more', body: 'Chase white-sand beaches, island-hopping and snorkelling, Bohol’s Chocolate Hills and tarsiers, and Palawan’s lagoons. Feast on Cebu lechon, fresh seafood, kinilaw, sweet mangoes and halo-halo to cool down.' }
    ]
  };

  /* Ticker prices are read from the packages above (lowest published rate), so they never drift from the package pages. */
  const fromRate = ids => {
    const ps = IC.tours.filter(t => ids.indexOf(t.id) >= 0 && t.price).map(t => t.price);
    if (!ps.length) return 'Ask for a quote';
    const p = ps.reduce((a, b) => (b.from < a.from ? b : a));
    return 'From ' + (p.currency === 'USD' ? '$' : '₱') + Number(p.from).toLocaleString('en-US');
  };
  const byName = re => IC.tours.filter(t => re.test(t.name)).map(t => t.id);
  IC.destinationsTicker = [
    ['Da Nang', fromRate(byName(/Da Nang/)) + ' · out Manila'], ['Ba Na Hills overnight', fromRate(byName(/Ba Na Hills/)) + ' · out Manila'],
    ['Hanoi · Sapa · Ha Long Bay', fromRate(byName(/Ha Long/)) + ' · out Manila'], ['Hanoi · Sapa', fromRate(byName(/^Hanoi – Sapa 4D3N/)) + ' · out Manila'],
    ['Hoi An Ancient Town', 'In every Da Nang tour'], ['Fansipan cable car', 'Sapa tours'], ['Ha Long Bay cruise', 'From Hanoi'],
    ['Shanghai', fromRate(byName(/Shanghai/)) + ' · out Cebu'], ['Beijing & the Great Wall', fromRate(byName(/Beijing/)) + ' · out Cebu'],
    ['Zhangjiajie (Avatar)', fromRate(byName(/Zhangjiajie|Avatar/)) + ' · out Cebu'], ['Yunnan', fromRate(byName(/Yunnan/)) + ' · out Cebu'],
    ['Cebu, Bohol & Camotes', 'Custom trips on request']
  ];
})(window.IC);
