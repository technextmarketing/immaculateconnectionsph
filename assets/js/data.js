/* =========================================================
   Immaculate Connections Travel Agency — site data
   ---------------------------------------------------------
   Every package, inclusion, place and photo below is taken
   from the agency's existing website (immaculateconnectionsph.com).
   Photos are served from the agency's own Wix media library.
   Edit here and every page (home, tours, contact dropdown) updates.
   ========================================================= */

window.IC = window.IC || {};

(function (IC) {
  const MEDIA = 'https://static.wixstatic.com/media/';
  /** Wix image, optionally resized/cropped: wix(id, width, height). */
  const wix = (id, w, h) => (w ? `${MEDIA}${id}/v1/fill/w_${w},h_${h},al_c,q_85/${id}` : `${MEDIA}${id}`);
  IC.wix = wix;

  IC.media = {
    logo: `${MEDIA}952787_6dd07347e2b24fab89e9fdcee6240889~mv2.png`,
    heroHome: '952787_7d63895b8b894bb0b1dbd482101a18d0~mv2.jpg',
    heroTours: '952787_1d076b1fc8f14f5ab72956eff2c0433e~mv2.jpg',
    heroAbout: '05e3dc_e099f1ceb25b41908ca3d6ba88d7bcb8.jpg',
    heroInquiries: '05e3dc_43e817747d44442dbf761e2ae66dd8e4.jpg',
    icons: {
      ticketing: `${MEDIA}952787_27ef97fc9ab247f9ac0396528bcb722b~mv2.png`,
      hotel: `${MEDIA}952787_a0ed48c8d5dd4e2f819407b391d6499c~mv2.png`,
      transport: `${MEDIA}952787_3fd41e325bc9449296516cd2e286d93f~mv2.png`,
      tours: `${MEDIA}952787_3d324467583f4cb8a092438d1e6a6872~mv2.png`,
      mice: `${MEDIA}952787_930a6679ab89472ea4b37d34205490f7~mv2.png`
    }
  };

  IC.regions = {
    cebu:    { label: 'Cebu' },
    bohol:   { label: 'Bohol & Camotes' },
    visayas: { label: 'Boracay, Palawan & Siargao' },
    intl:    { label: 'International' }
  };

  IC.statusLabel = { available: 'Available now', soon: 'Coming soon', request: 'Details on request' };

  // Standard inclusion sets used on the existing site
  const INC_CEBU = ['Air-conditioned van', 'Licensed tour guide', 'Entrance fees', 'Mineral water', 'Mini pasalubong pack'];
  const INC_CAMOTES = ['Two-way boat ticket', 'Katunggan nature trip (entrance fees included)', 'Hotel accommodation', 'Air-conditioned transportation', 'Tour guide', 'Meals'];

  IC.tours = [
    {
      id: 'bohol-breezes',
      name: 'Bohol Breezes: Embrace Island Serenity!',
      region: 'bohol', duration: 'Day tour', days: 1, status: 'available', badge: 'Featured', featured: true,
      image: '952787_c790bde9bfb74673a9c563990ab577d1~mv2.jpg',
      alt: 'Bohol countryside tour',
      intro: 'A full day across Bohol’s icons: the Blood Compact Shrine, Baclayon Church, the Bilar man-made forest and the Chocolate Hills, capped with lunch on a Loboc River cruise.',
      inclusions: ['Two-way boat ticket', 'Terminal & entrance fees', 'Licensed tour guide', 'Air-conditioned transportation', 'Lunch at Loboc River'],
      places: ['Blood Compact Shrine', 'Baclayon Church', 'Bilar Man-Made Forest', 'Chocolate Hills', 'Loboc River', 'Aproniana Souvenir Shop']
    },
    {
      id: 'camotes-discover',
      name: 'Discover Enchanting Camotes',
      region: 'bohol', duration: '2 days 1 night', days: 2, status: 'available', badge: '', featured: true,
      image: '952787_74c14938b43548f8a3241d08e1b5c4df~mv2.jpg',
      alt: 'Camotes Island beach',
      intro: 'Beaches, caves and a lake on the quiet islands of Camotes. Overnight hotel stay, meals and boat tickets are all arranged for you.',
      inclusions: INC_CAMOTES,
      places: ['Mangodlong Beach', 'Santiago Beach', 'Amazing Cave', 'Paraiso Cave', 'Heaven Cave', 'Lake Danao', 'Timubo Cave', 'Tulang Diot', 'Buho Rock']
    },
    {
      id: 'camotes-tudela',
      name: 'Camotes Charms: Lakwatsa sa Tudela',
      region: 'bohol', duration: '2 days 1 night', days: 2, status: 'available', badge: '', featured: false,
      image: '952787_22b054e923d24111a5d007fbe1fd048f~mv2.jpg',
      alt: 'Tudela, Camotes Islands',
      intro: 'The lesser-known side of Camotes: Bukilat Cave, the Villahermosa mangroves, the centuries-old Kaompang tree and Busay Falls, with an overnight stay.',
      inclusions: INC_CAMOTES,
      places: ['Bukilat Cave', 'Villahermosa Mangroves', 'Kaompang Tree', 'Busay Falls']
    },
    {
      id: 'cebu-highlands',
      name: 'Cebu Highlands Vista Tour',
      region: 'cebu', duration: 'Day tour', days: 1, status: 'available', badge: '', featured: true,
      image: '952787_ef8a0cd30f94496d9491f4d1caa3f202~mv2.jpg',
      alt: 'Cebu highlands viewpoint',
      intro: 'Head uphill for Cebu’s most photographed spots: the Temple of Leah, Little Kyoto, Seoul Sierra and the flower fields of Sirao Garden.',
      inclusions: INC_CEBU,
      places: ['Temple of Leah', 'Little Kyoto', 'Seoul Sierra', 'Sirao Garden']
    },
    {
      id: 'queen-city',
      name: 'Queen City Tour: Cebu',
      region: 'cebu', duration: 'Day tour', days: 1, status: 'available', badge: 'Heritage', featured: true,
      image: '952787_23bb46c7551540d4b6631f9ceaf12911~mv2.jpg',
      alt: 'Fort San Pedro, Cebu City',
      intro: 'Cebu City’s heritage trail in one day, from Magellan’s Cross and the Basilica Minore del Sto. Niño to Fort San Pedro, the ancestral houses and the Taoist Temple.',
      inclusions: INC_CEBU,
      places: ['Magellan’s Cross', 'Basilica Minore del Sto. Niño', 'Fort San Pedro', 'Cebu Heritage Monument', 'Casa Gorordo & Yap-Sandiego Museum', 'Taoist Temple']
    },
    {
      id: 'twin-city',
      name: 'Twin City Tour: Cebu',
      region: 'cebu', duration: 'Day tour', days: 1, status: 'available', badge: '', featured: false,
      image: '952787_fe368fa20ed346b78f71f7a717b270fd~mv2.jpg',
      alt: 'Marcelo Fernan Bridge between Cebu and Mactan',
      intro: 'Cebu City’s landmarks plus a crossing to Mactan for the Alegre Guitar Factory. Ideal for first-time visitors with a single day to spare.',
      inclusions: INC_CEBU,
      places: ['Magellan’s Cross', 'Basilica Minore del Sto. Niño', 'Fort San Pedro', 'Cebu Heritage Monument', 'Casa Gorordo Museum', 'Alegre Guitar Factory']
    },
    {
      id: 'siargao',
      name: 'Siargao Island Getaway',
      region: 'visayas', duration: '3 days 2 nights', days: 3, status: 'request', badge: '', featured: false,
      image: '952787_1d076b1fc8f14f5ab72956eff2c0433e~mv2.jpg',
      alt: 'Island getaway',
      intro: 'Three days and two nights on the surfing capital of the Philippines. Send an inquiry and we will share the full itinerary and inclusions for your dates.',
      inclusions: ['Itinerary and inclusions provided on request'],
      places: ['Siargao Island']
    },
    {
      id: 'boracay-bliss',
      name: 'Boracay Bliss',
      region: 'visayas', duration: '', days: 0, status: 'soon', badge: 'Coming soon', featured: false,
      image: '952787_7c95bd58cf3440f480b04e9672c06802~mv2.jpg',
      alt: 'Puka Beach, Boracay',
      intro: 'Our Boracay package is being finalised. Ask us to notify you when it launches, or request a custom Boracay itinerary now.',
      inclusions: ['Package details coming soon'],
      places: ['Boracay Island']
    },
    {
      id: 'el-nido',
      name: 'El Nido Escapade: Memory Keepers',
      region: 'visayas', duration: '', days: 0, status: 'soon', badge: 'Coming soon', featured: false,
      image: '952787_1bb9e51e18084c429eedba7d528d9d33~mv2.jpg',
      alt: 'El Nido, Palawan',
      intro: 'Lagoons and limestone cliffs in Palawan. The package is being finalised; custom El Nido itineraries can be arranged on request.',
      inclusions: ['Package details coming soon'],
      places: ['El Nido, Palawan']
    },
    {
      id: 'coron',
      name: 'Coron Captures',
      region: 'visayas', duration: '', days: 0, status: 'soon', badge: 'Coming soon', featured: false,
      image: '952787_c707827028d143a594404076e61331be~mv2.jpg',
      alt: 'Coron, Palawan',
      intro: 'Coron’s lakes, lagoons and shipwrecks. The package is being finalised; custom Coron itineraries can be arranged on request.',
      inclusions: ['Package details coming soon'],
      places: ['Coron, Palawan']
    },
    {
      id: 'hongkong-4d3n',
      name: 'Hong Kong 4 Days 3 Nights',
      region: 'intl', duration: '4 days 3 nights', days: 4, status: 'request', badge: '', featured: true,
      image: '952787_53bbdb7f81aa402798a6417db52d1fd3~mv2.jpg',
      alt: 'Hong Kong harbour ferry',
      intro: 'Four days in Hong Kong with our partner operators. Tell us your travel dates and group size and we will send the full itinerary, hotel options and quotation.',
      inclusions: ['Itinerary, hotel and inclusions provided on request'],
      places: ['Hong Kong']
    },
    {
      id: 'hongkong-3d2n',
      name: 'Hong Kong 3 Days 2 Nights',
      region: 'intl', duration: '3 days 2 nights', days: 3, status: 'request', badge: '', featured: false,
      image: '952787_53bbdb7f81aa402798a6417db52d1fd3~mv2.jpg',
      alt: 'Hong Kong harbour ferry',
      intro: 'A shorter Hong Kong escape over a long weekend. Itinerary and quotation are prepared for your dates on request.',
      inclusions: ['Itinerary, hotel and inclusions provided on request'],
      places: ['Hong Kong']
    },
    {
      id: 'vietnam',
      name: 'Vietnam Tours',
      region: 'intl', duration: 'Multiple itineraries', days: 4, status: 'request', badge: 'Posters inside', featured: true,
      image: '11062b_12e8394318ad4042acc3831d320a0e53~mv2.jpg',
      alt: 'Rice terraces in Sapa, Vietnam',
      intro: 'Stretching gracefully along the eastern coast of Southeast Asia, Vietnam is a land of remarkable contrasts, where ancient traditions thrive alongside modern cities. From mist-covered mountains in the north and emerald rice terraces to pristine beaches and the fertile Mekong Delta in the south, every region offers its own unique character.',
      inclusions: ['See the itinerary posters below', 'Quotation prepared for your dates on request'],
      places: ['Hanoi', 'Ha Long Bay', 'Sapa', 'Da Nang & Hoi An', 'Ho Chi Minh City', 'Mekong Delta'],
      posters: ['952787_0db097d807b14f5b882dbfd77aa54bce~mv2.png', '952787_8b207104bf0d43e5aa4c288936e9fec3~mv2.png', '952787_3194edd0c0244a54bafb5f0a2625919a~mv2.png', '952787_0f90501df956446f93adb797c7e9f787~mv2.png', '952787_2886565a745a486fa6336ab8b57c9a15~mv2.png']
    },
    {
      id: 'japan',
      name: 'Japan Tours',
      region: 'intl', duration: 'Multiple itineraries', days: 5, status: 'request', badge: '', featured: false,
      image: '11062b_c9580f5a049648adbbf253ef4e9b7acd~mv2.jpg',
      alt: 'Group travel',
      intro: 'Japan itineraries are arranged with our partner operators. Send us your preferred dates, cities and group size and we will prepare options and a quotation.',
      inclusions: ['Itinerary, hotel and inclusions provided on request'],
      places: ['Japan']
    },
    {
      id: 'china',
      name: 'China Tours',
      region: 'intl', duration: 'Multiple itineraries', days: 5, status: 'request', badge: '', featured: false,
      image: '952787_59a43ffc36424aeb98a78f9b34cf3390~mv2.jpg',
      alt: 'International tour',
      intro: 'China itineraries are arranged with our partner operators. Send us your preferred dates, cities and group size and we will prepare options and a quotation.',
      inclusions: ['Itinerary, hotel and inclusions provided on request'],
      places: ['China']
    }
  ];

  // Photos from the agency's "Previous Tours", MICE and partner galleries
  IC.gallery = [
    { id: '952787_6a8b5ab3b00d41bcb1a8915073aa4861~mv2.jpg', shape: 'wide',   title: 'Loboc River Lunch', sub: 'Bohol' },
    { id: '952787_250d67a9fabf4973bcde54f948a225b3~mv2.jpg', shape: 'tall',   title: 'Camotes', sub: 'Island getaway' },
    { id: '952787_9bc781dfae87479dae7fd84ed8b09c42~mv2.jpg', shape: 'wide',   title: 'Orientation course for local legislators', sub: 'MICE & seminars' },
    { id: '952787_2d330c92a5d342099b7d4258256ffa11~mv2.jpg', shape: 'square', title: 'Bohol', sub: 'Countryside tour' },
    { id: '952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg', shape: 'wide',   title: 'Mangodlong Beach', sub: 'Partner resort, Camotes' },
    { id: '952787_d42f442bb8264e678cbc88bdc2824eff~mv2.jpg', shape: 'tall',   title: 'Seminar logistics', sub: 'Meetings & events' },
    { id: '952787_9a7ffc3f7a2e47d18e2086d04b3b9341~mv2.jpg', shape: 'square', title: 'Tour highlights', sub: 'Group tour' },
    { id: '952787_f6e5b9acd62049db802bcfd86e7fd352~mv2.jpg', shape: 'wide',   title: 'Participants’ orientation', sub: 'MICE & seminars' },
    { id: '952787_515cfff1c9a64aa9b330a027322b9e7a~mv2.jpg', shape: 'square', title: 'Air-conditioned transport', sub: 'Vans, coasters & buses' },
    { id: '952787_a67b7dcf552942a294501fc5c8a044f8~mv2.jpg', shape: 'tall',   title: 'Tour highlights', sub: 'Local packages' }
  ];

  // Promo posters shown in the "Tour Highlights" section of the existing home page
  IC.posters = [
    { id: '952787_a94d4c78561f4540bbc5df8f15eecf7c~mv2.png', title: 'Tour package poster' },
    { id: '952787_ce040934e394461c95bffca6aec37ea2~mv2.png', title: 'Tour package poster' },
    { id: '952787_a67b7dcf552942a294501fc5c8a044f8~mv2.jpg', title: 'Tour highlights' },
    { id: '952787_9a7ffc3f7a2e47d18e2086d04b3b9341~mv2.jpg', title: 'Tour highlights' }
  ];

  IC.hotelPhotos = ['952787_3029b36427494266a8e954d4d7b8542c~mv2.jpg', '952787_26a50047e88545a18d5e6c89816805bc~mv2.jpg', '952787_2c289935d14a4992b20f77b49e988dba~mv2.jpg', '952787_bf04b5da3fbe466388fd7b0ce1011bd7~mv2.jpg'];
  IC.micePhotos = ['952787_9bc781dfae87479dae7fd84ed8b09c42~mv2.jpg', '952787_d42f442bb8264e678cbc88bdc2824eff~mv2.jpg', '952787_f6e5b9acd62049db802bcfd86e7fd352~mv2.jpg'];

  IC.destinationsTicker = [
    ['Bohol', 'Loboc River lunch'], ['Camotes Islands', '2 days 1 night'], ['Cebu City', 'Heritage tours'], ['Cebu Highlands', 'Temple of Leah & Sirao'],
    ['Mactan', 'Twin City Tour'], ['Siargao', '3 days 2 nights'], ['Boracay', 'Coming soon'], ['El Nido', 'Coming soon'], ['Coron', 'Coming soon'],
    ['Hong Kong', '3D2N & 4D3N'], ['Vietnam', 'Multiple itineraries'], ['Japan', 'On request'], ['China', 'On request']
  ];
})(window.IC);
