export interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
}

export interface SafetyFitness {
  amsRisk: 'Low' | 'Moderate' | 'High';
  fitnessLevel: string; // fitness training criteria
  medicalFormRequired: boolean;
  warnings?: string; // high-altitude safety advice
}

export interface Trek {
  id: string;
  name: string;
  region: string;
  difficulty: 'Easy' | 'Moderate' | 'Demanding';
  duration: number; // in days
  price: number; // in INR
  highlights: string;
  altitude: string;
  distance: string;
  bestSeason: string;
  image: string;
  description: string;
  itinerary: ItineraryDay[];
  gallery?: string[]; // 4-5 additional original/matching trek photos
  rating: number; // star rating e.g., 4.8
  reviewCount: number; // number of reviews
  inclusions: string[]; // what is covered in booking
  exclusions: string[]; // what is not covered in booking
  safetyFitness: SafetyFitness;
  batches: string[]; // upcoming departure dates
  bestTimeToVisit: string; // Dynamic SEO Details
  howToReach: string; // Dynamic SEO Details
  nearbyAttractions: string; // Dynamic SEO Details
}

// Dynamically prefix paths with Vite's BASE_URL (e.g. '/' locally, '/Desi-nomad-/' on GitHub Pages)
const baseUrl = import.meta.env.BASE_URL || '/';

export const treksData: Trek[] = [
  {
    id: 'hidden-valley',
    name: 'Hampta Pass crossover',
    region: 'Himachal',
    difficulty: 'Moderate',
    duration: 5,
    price: 15000,
    highlights: 'Village stays, pine forests, high pass crossover',
    altitude: '14,100 ft',
    distance: '34 km',
    bestSeason: 'June to October',
    image: `${baseUrl}images/hampta_pass.jpg`,
    description: 'A spectacular crossover trek starting from the lush green valleys of Kullu/Manali and ending in the barren, semi-arid desert landscapes of Lahaul and Spiti. Witness dramatic changes in terrain day by day.',
    itinerary: [
      { day: 1, title: 'Drive from Manali to Jobra & Trek to Chika', desc: 'Drive through 40 hairpin bends. Easy trek through oak forests and river crossings.' },
      { day: 2, title: 'Trek from Chika to Balu ka Ghera', desc: 'Gradual ascent along the river. Cross boulder zones. Spot alpine flowers.' },
      { day: 3, title: 'Trek from Balu ka Ghera to Hampta Pass and Shea Goru', desc: 'Challenging steep climb through snow. Reach Hampta Pass summit (14,100 ft) for panoramic views. Descend to Shea Goru.' },
      { day: 4, title: 'Trek from Shea Goru to Chhatru & Drive to Chandratal Lake', desc: 'Easy descent to Chhatru. Drive to the crescent moon Chandratal Lake.' },
      { day: 5, title: 'Drive from Chhatru to Manali via Atal Tunnel', desc: 'Morning breakfast beside the river. Scenic drive through Atal Tunnel back to Manali.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1491555103944-7c647fd857fe?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1614002232931-e12360e4556e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviewCount: 184,
    inclusions: [
      'All vegetarian meals from Day 1 lunch to Day 5 breakfast.',
      'Accommodation in clean, durable dome tents (double sharing).',
      'Certified, English-speaking Wilderness Trek Leader (HMI/NIM certified).',
      'Local helpers, porters for kitchen gear, and camp cook.',
      'Wilderness Medical Kit, oxygen cylinders, microspikes, and gaiters.',
      'All forest permits, entry fees, and camping charges.'
    ],
    exclusions: [
      'Transportation between Manali and base camp (Jobra/Chhatru).',
      'Personal trekking gear (backpacks, trekking poles, warm clothing).',
      'Backpack offloading charges (₹350/day per bag up to 12kg).',
      'Personal expenses, tips, and insurance cover.'
    ],
    safetyFitness: {
      amsRisk: 'Moderate',
      fitnessLevel: 'Trekkers must be able to jog 5 km in under 35 minutes. Core stability and leg endurance training are highly recommended 3 weeks before the trek.',
      medicalFormRequired: true,
      warnings: 'This trek ascends to 14,100 ft. Trekkers should drink 4 liters of water daily to prevent dehydration and high altitude headaches. Preventive course of Diamox can be discussed with your physician.'
    },
    batches: [
      'Sep 14 - Sep 18 (Slots Available)',
      'Sep 28 - Oct 02 (Slots Available)',
      'Oct 12 - Oct 16 (Filling Fast)',
      'Oct 26 - Oct 30 (Limited Availability)'
    ],
    bestTimeToVisit: 'June to September is best for flower blooms, lush meadows, and high snow pass crossings. October offers clear blue skies and dry cold weather.',
    howToReach: 'Reach Manali via overnight Volvo bus from Delhi or flight to Bhuntar Airport (50 km away). Transport from Manali to Jobra base village is organized by Desi Nomad.',
    nearbyAttractions: 'Explore Solang Valley, Jogini Waterfalls, Hadimba Temple, and the scenic high-altitude Chandratal Lake.'
  },
  {
    id: 'beas-kund',
    name: 'Beas Kund Lake Trek',
    region: 'Himachal',
    difficulty: 'Easy',
    duration: 3,
    price: 7000,
    highlights: 'Glacial lake, peak views of Hanuman Tibba, Solang valley',
    altitude: '12,772 ft',
    distance: '16 km',
    bestSeason: 'May to October',
    image: `${baseUrl}images/beas_kund.jpg`,
    description: 'Walk to the source of the Beas River, where a emerald glacial lake sits surrounded by towering peaks. Extremely scenic, short, and beginner-friendly alpine hike.',
    itinerary: [
      { day: 1, title: 'Manali to Solang Nallah & Trek to Dhundi', desc: 'Drive to Solang Valley and start trekking through pine and birch forest alongside the river.' },
      { day: 2, title: 'Dhundi to Beas Kund Lake & back to Bakarthach', desc: 'Climb past boulder-filled glacial moraines to reach the pristine glacial Beas Kund lake.' },
      { day: 3, title: 'Bakarthach to Dhundi & Drive back to Manali', desc: 'Descend through grassy valleys to Dhundi road head, then drive back to Manali.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.7,
    reviewCount: 96,
    inclusions: [
      'Meals during the trek (Day 1 dinner to Day 3 lunch).',
      'Tents and warm sleeping bags (triple sharing).',
      'Wilderness First Aid certified trek guides.',
      'Forest entry and camping permissions.'
    ],
    exclusions: [
      'Transportation to Solang Nallah starting point.',
      'Backpack offloading and personal porter support.',
      'Rental gear (ponchos, boots, poles).'
    ],
    safetyFitness: {
      amsRisk: 'Low',
      fitnessLevel: 'Basic physical fitness. Trekkers should be comfortable walking 5-6 km per day with a light daypack.',
      medicalFormRequired: false,
      warnings: 'Though this is an easy trek, sudden mountain weather shifts are common. Carry rain jackets and extra layers.'
    },
    batches: [
      'Sep 10 - Sep 12 (Slots Available)',
      'Sep 24 - Sep 26 (Slots Available)',
      'Oct 08 - Oct 10 (Slots Available)',
      'Oct 22 - Oct 24 (Slots Available)'
    ],
    bestTimeToVisit: 'May to October is the peak window. May/June offers snow beds; September/October offers golden meadows and freezing clear blue lakes.',
    howToReach: 'Arrive in Manali. Desi Nomad coordinates shared taxi rides from Manali to Solang Valley base camp trailhead (12 km away).',
    nearbyAttractions: 'Visit Solang Adventure Park, Atal Tunnel, Rohtang Pass, and Nehru Kund.'
  },
  {
    id: 'mystic-meadows',
    name: 'Mystic Dayara Bugyal Meadows',
    region: 'Uttarakhand',
    difficulty: 'Easy',
    duration: 3,
    price: 9500,
    highlights: 'River crossings, folk heritage, open ridge camps',
    altitude: '11,800 ft',
    distance: '18 km',
    bestSeason: 'Year Round',
    image: `${baseUrl}images/dayara_bugyal.jpg`,
    description: 'An idyllic weekend trek perfect for beginners and families. Walk through dense pine woodlands and cross clear streams, culminating in broad green alpine meadows that afford stunning 360-degree views of Himalayan ranges.',
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri Scenic Drive', desc: 'Drive through pine forest roadways alongside the Tons River. Briefing at village homestay.' },
      { day: 2, title: 'Trek from Sankri to Mystic Meadows Camp', desc: 'Forest hike. Experience clean village settings, folk storytelling circle, and campfire.' },
      { day: 3, title: 'Summit Meadows Exploration & Return to Dehradun', desc: 'Early sunrise watch at peak viewpoints. Easy hike back down to base camp. Evening drive to Dehradun.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.9,
    reviewCount: 112,
    inclusions: [
      'Homestay and tent stays on sharing basis.',
      'Vegetarian organic farm meals (Day 1 dinner to Day 3 lunch).',
      'Certified local guide and cultural storyteller.',
      'Camping equipment and forest entry fees.'
    ],
    exclusions: [
      'Transport between Dehradun and Sankri (available on sharing basis at ₹1,200).',
      'Backpack offloading charges.',
      'Alcoholic drinks or personal snacks.'
    ],
    safetyFitness: {
      amsRisk: 'Low',
      fitnessLevel: 'Comfortable with walking up slopes. Daily walks of 3-4 km are good preparation.',
      medicalFormRequired: false,
      warnings: 'Temperatures drop rapidly at night, especially in autumn/winter. Carry high-quality thermals and insulated jackets.'
    },
    batches: [
      'Sep 18 - Sep 20 (Slots Available)',
      'Oct 09 - Oct 11 (Slots Available)',
      'Nov 13 - Nov 15 (Slots Available)',
      'Dec 18 - Dec 20 (Filling Fast)'
    ],
    bestTimeToVisit: 'Spring (April-May) for blooming rhododendrons; Autumn (September-November) for crisp peak views; Winter (December-February) for white snow carpet meadows.',
    howToReach: 'Take a train or flight to Dehradun. Desi Nomad organizes group pickup vehicles from Dehradun Railway Station to Raithal/Barsu base villages (180 km away).',
    nearbyAttractions: 'Explore Gangotri National Park, Harsil Valley, and hot springs at Yamunotri.'
  },
  {
    id: 'valley-flowers',
    name: 'Valley of Flowers & Hemkund Sahib',
    region: 'Uttarakhand',
    difficulty: 'Moderate',
    duration: 6,
    price: 14500,
    highlights: 'UNESCO World Heritage site, alpine blooms, holy lake',
    altitude: '14,107 ft',
    distance: '38 km',
    bestSeason: 'July to September',
    image: `${baseUrl}images/valley_of_flowers.jpg`,
    description: 'Hike through a high-altitude national park containing hundreds of species of wild alpine flowers. Combine this natural wonder with a spiritual climb to the high glacial lake of Hemkund Sahib.',
    itinerary: [
      { day: 1, title: 'Haridwar to Govindghat scenic drive', desc: 'Scenic mountain drive alongside the holy Alaknanda and Bhagirathi rivers confluence.' },
      { day: 2, title: 'Govindghat to Ghangaria hike', desc: 'Trek along the Lakshman Ganga river through dense oak and pine woods to Ghangaria village.' },
      { day: 3, title: 'Explore Valley of Flowers National Park', desc: 'Hike into the flower valley, cross small streams, and spot rare high-altitude orchids and lilies.' },
      { day: 4, title: 'Trek to Hemkund Sahib Holy Lake', desc: 'Steep climb to the sacred high-altitude Sikh shrine and the pristine lake beside it (14,107 ft).' },
      { day: 5, title: 'Ghangaria back to Govindghat', desc: 'Easy descent back along the river trail to Govindghat. Evening rest.' },
      { day: 6, title: 'Govindghat drive back to Haridwar', desc: 'Return scenic drive back to Haridwar railway station.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviewCount: 312,
    inclusions: [
      'Hotel/Guest House stays at Govindghat and Ghangaria.',
      'Vegetarian nutritious meals during trekking days.',
      'Experienced licensed mountain guides.',
      'National Park entry fees, permits, and conservation taxes.'
    ],
    exclusions: [
      'Mule or heli services (available at Ghangaria at extra cost).',
      'Transport between Haridwar and Govindghat.',
      'Personal gear and rain gear (poncho is vital due to rain).'
    ],
    safetyFitness: {
      amsRisk: 'Moderate',
      fitnessLevel: 'Trek involves climbing steep paved paths. Cardio fitness is crucial. Jogging 4km in under 28 mins is recommended.',
      medicalFormRequired: true,
      warnings: 'The climb to Hemkund Sahib is steep and rises above 14,000 ft. Drink plenty of warm water, avoid sleeping during the daytime climb, and acclimatize properly.'
    },
    batches: [
      'Aug 12 - Aug 17 (Slots Available)',
      'Aug 26 - Aug 31 (Filling Fast)',
      'Sep 09 - Sep 14 (Slots Available)',
      'Sep 23 - Sep 28 (Last Few Slots)'
    ],
    bestTimeToVisit: 'July to early September. This monsoon window is the only time when the valley flowers bloom in vibrant pinks, yellows, and purples.',
    howToReach: 'Arrive at Haridwar Railway Station. Group vehicles leave at 6:30 AM for Govindghat (290 km drive along Ganga/Alaknanda valleys).',
    nearbyAttractions: 'Visit Badrinath Temple, Mana Village (last Indian village), Vasudhara Falls, and Auli ski resort.'
  },
  {
    id: 'kedarkantha-snow',
    name: 'Kedarkantha Winter Summit',
    region: 'Uttarakhand',
    difficulty: 'Moderate',
    duration: 6,
    price: 9500,
    highlights: 'Pristine winter snow, pine clearing camps, summit ridge',
    altitude: '12,500 ft',
    distance: '20 km',
    bestSeason: 'December to April',
    image: `${baseUrl}images/kedarkantha.jpg`,
    description: 'Famous as the ultimate winter snow trek. Climb through pine forests filled with deep snow and walk the ridge to reach a peak offering panoramic views of the Swargarohini range.',
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri base camp drive', desc: 'Scenic mountain drive past Mussoorie and along the Tons River to Sankri homestay.' },
      { day: 2, title: 'Sankri to Juda ka Talab camp', desc: 'Forest trek on snowy trails. Reach Juda ka Talab, a frozen pine lake.' },
      { day: 3, title: 'Juda ka Talab to Kedarkantha base camp', desc: 'Walk through open snow clearings. Camp under snowy peaks with clear star skies.' },
      { day: 4, title: 'Summit climb & descent to Hargaon camp', desc: 'Early morning summit push (12,500 ft) for sunrise. Descend down to Hargaon meadows.' },
      { day: 5, title: 'Hargaon to Sankri descent', desc: 'Hike back down through thick oak forests to Sankri village. Celebrate the trek.' },
      { day: 6, title: 'Drive back to Dehradun', desc: 'Morning drive back to Dehradun railway station/airport.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1491555103944-7c647fd857fe?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1614002232931-e12360e4556e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviewCount: 418,
    inclusions: [
      'All meals during the trek (Day 1 dinner to Day 6 breakfast).',
      'Accommodation in Sankri guest houses and mountain dome tents.',
      'Winter spikes, snow gaiters, and safety harnesses.',
      'Experienced qualified guides and camping crew.',
      'Forest permit documents and camp charges.'
    ],
    exclusions: [
      'Travel cost from Dehradun to Sankri (approx. ₹1,200 one way).',
      'Personal luggage offloading (₹350/day).',
      'Trekking boots rental and thermal items.'
    ],
    safetyFitness: {
      amsRisk: 'Moderate',
      fitnessLevel: 'Trekkers must run 5 km in under 32 minutes. Cold temperature tolerance and strong endurance are necessary for winter summits.',
      medicalFormRequired: true,
      warnings: 'Sub-zero temperatures (down to -10°C) are expected in winter. Ensure you have 4-5 layers of warm clothing, including down jackets, thermals, and insulated gloves.'
    },
    batches: [
      'Dec 12 - Dec 17 (Filling Fast)',
      'Dec 24 - Dec 29 (Limited Availability)',
      'Jan 07 - Jan 12 (Slots Available)',
      'Jan 21 - Jan 26 (Slots Available)'
    ],
    bestTimeToVisit: 'Mid-December to late February is prime for deep winter snow cover and frozen forest lakes. April offers pleasant green meadows.',
    howToReach: 'Fly or take a train to Dehradun. Desi Nomad runs early morning pick-ups at 6:30 AM from Dehradun Railway Station to Sankri Base Camp.',
    nearbyAttractions: 'Visit Govind Pashu Vihar National Park, Someshwar Temple, Har Ki Dun valley, and Netwar village.'
  },
  {
    id: 'nomads-peak',
    name: "Dzongri Ridge Expedition",
    region: 'Sikkim',
    difficulty: 'Demanding',
    duration: 7,
    price: 24000,
    highlights: 'Alpine blooms, panoramic Kanchenjunga views, sacred lakes',
    altitude: '13,680 ft',
    distance: '62 km',
    bestSeason: 'April to June, September to November',
    image: `${baseUrl}images/dzongri_ridge.jpg`,
    description: 'A demanding but life-changing expedition that takes you into the heart of Sikkim’s wild mountains. Hike past frozen lakes, rhododendron valleys, and wind-swept ridges to face giant peaks like Mount Pandim and Kanchenjunga.',
    itinerary: [
      { day: 1, title: 'NJP Railway Station to Yuksom Drive', desc: 'Scenic hill roads along the Teesta River. Rest at Yuksom.' },
      { day: 2, title: 'Yuksom to Sachen Trek', desc: 'Trek through the lush Kanchenjunga National Park. Cross iron bridges.' },
      { day: 3, title: 'Sachen to Tsokha Steep Hike', desc: 'Challenging climb through rhododendron and pine forests.' },
      { day: 4, title: 'Tsokha to Dzongri Ridge Top', desc: 'Steep ascent on wooden walkways. Camp above the treeline.' },
      { day: 5, title: 'Dzongri Summit Sunrise & Trek back to Tsokha', desc: 'Early morning hike to Dzongri top (13,680 ft) for golden views of Kanchenjunga.' },
      { day: 6, title: 'Tsokha back to Yuksom', desc: 'Long descent through the forest trails back to Yuksom village.' },
      { day: 7, title: 'Yuksom to NJP Drive', desc: 'Return scenic drive back to Siliguri railway station.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1491555103944-7c647fd857fe?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.9,
    reviewCount: 78,
    inclusions: [
      'Yuksom guest house stay and premium campsite dome tents.',
      'Sikkim style high calorie meals (Day 1 dinner to Day 7 lunch).',
      'Government certified guides and local mountain experts.',
      'State permits, park conservation fees, and porter wages.'
    ],
    exclusions: [
      'Transport from New Jalpaiguri (NJP) to Yuksom.',
      'Personal climbing gear or heavy down suits.',
      'Backpack offloading and personal porter support.'
    ],
    safetyFitness: {
      amsRisk: 'High',
      fitnessLevel: 'High-level cardiorespiratory endurance. Running 5 km in under 28 minutes is required. Heavy uphill leg muscle training.',
      medicalFormRequired: true,
      warnings: 'This trek scales high altitudes quickly. Medical fitness certificates signed by a registered doctor are strictly mandatory before starting from Yuksom.'
    },
    batches: [
      'Oct 05 - Oct 11 (Slots Available)',
      'Oct 19 - Oct 25 (Filling Fast)',
      'Nov 02 - Nov 08 (Slots Available)',
      'Nov 16 - Nov 22 (Slots Available)'
    ],
    bestTimeToVisit: 'April to May for brilliant red rhododendron forest covers; October & November for dry, clear weather offering maximum visibility of Mount Kanchenjunga.',
    howToReach: 'Fly to Bagdogra Airport (IXB) or take a train to New Jalpaiguri (NJP). Group vehicles drive 150 km through winding Sikkim hill roads to reach Yuksom.',
    nearbyAttractions: 'Visit Dubdi Monastery (oldest monastery in Sikkim), Kathok Lake, and Khecheopalri Wish Lake.'
  },
  {
    id: 'goechala-pass',
    name: 'Goechala Pass Expedition',
    region: 'Sikkim',
    difficulty: 'Demanding',
    duration: 10,
    price: 28500,
    highlights: 'Kanchenjunga face view, rhododendron forests, Samiti lake',
    altitude: '15,100 ft',
    distance: '90 km',
    bestSeason: 'April to May, October to November',
    image: `${baseUrl}images/goechala.jpg`,
    description: 'The pinnacle of high-altitude Himalayan trekking in East India. Get face-to-face with the massive southeast face of Mt. Kanchenjunga, passing pristine lakes and ancient Buddhist valleys.',
    itinerary: [
      { day: 1, title: 'NJP to Yuksom scenic hill drive', desc: 'Long mountain drive along Teesta river to the historical Yuksom base.' },
      { day: 2, title: 'Trek from Yuksom to Sachen', desc: 'Hike through lush temperate rainforests and cross iron suspension bridges.' },
      { day: 3, title: 'Sachen to Tsokha forest climb', desc: 'Steep climb through pine and rhododendron woods. Rest at Tsokha village.' },
      { day: 4, title: 'Tsokha to Phedang ridge trail', desc: 'Hike along ridge lines, crossing above the tree boundary lines.' },
      { day: 5, title: 'Phedang to Kokchurang camp', desc: 'Climb past Dzongri meadows and descend to the Prek Chu river valley.' },
      { day: 6, title: 'Kokchurang to Thansing meadows', desc: 'Gradual valley trek along the river with towering views of Mt. Pandim.' },
      { day: 7, title: 'Thansing to Lamuney glacial camp', desc: 'Short high-altitude hike. Spend the afternoon resting before the summit night.' },
      { day: 8, title: 'Lamuney to Goechala View Point & back to Kokchurang', desc: 'Midnight start to reach Goechala View Point (15,100 ft) for sunrise over Kanchenjunga. Descend to Kokchurang.' },
      { day: 9, title: 'Kokchurang to Tsokha bypass hike', desc: 'Forest trek bypassing the peaks back to Tsokha settlement.' },
      { day: 10, title: 'Tsokha to Yuksom & drive to NJP', desc: 'Early descent to Yuksom and drive back to railway station/airport.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1491555103944-7c647fd857fe?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.9,
    reviewCount: 142,
    inclusions: [
      'Yuksom guest house room and twin dome mountain camps.',
      'High calorie vegetarian meals (Day 1 dinner to Day 10 lunch).',
      'Wilderness First Aid certified guide, porters, and kitchen staff.',
      'Sikkim entry permits, local forest permissions, and trek fees.'
    ],
    exclusions: [
      'Transport between NJP and Yuksom starting point.',
      'Heavy personal gear (warm coats, walking poles).',
      'Mule fees or personal porter offloading charges.'
    ],
    safetyFitness: {
      amsRisk: 'High',
      fitnessLevel: 'Excellent cardiovascular shape is critical. Trekkers must run 5 km in under 26-28 minutes. High altitude breathing practices.',
      medicalFormRequired: true,
      warnings: 'Highly demanding long distance trek. Rises to 15,100 ft. Medical certificate, blood pressure test records, and doctor authorization are mandatory.'
    },
    batches: [
      'Oct 02 - Oct 11 (Filling Fast)',
      'Oct 16 - Oct 25 (Slots Available)',
      'Nov 01 - Nov 10 (Slots Available)',
      'Nov 15 - Nov 24 (Limited Availability)'
    ],
    bestTimeToVisit: 'April to May for alpine flowers and misty peaks; October to mid-November for dry trails and bright, cloudless views of Mount Kanchenjunga.',
    howToReach: 'Depart from NJP Railway Station or Bagdogra Airport. Shared taxis are booked for a 7-8 hour drive to Yuksom base.',
    nearbyAttractions: 'Visit Phamrong Waterfall, Kanchenjunga Falls, Tashiding Monastery, and Rabdentse Ruins.'
  },
  {
    id: 'kashmir-lakes',
    name: 'Kashmir Great Lakes Traverse',
    region: 'Kashmir',
    difficulty: 'Demanding',
    duration: 8,
    price: 27500,
    highlights: 'Seven alpine lakes, snow bridges, maple forests',
    altitude: '13,750 ft',
    distance: '72 km',
    bestSeason: 'July to September',
    image: `${baseUrl}images/kashmir_lakes.jpg`,
    description: 'Widely regarded as the most beautiful trek in India. Traverse through seven pristine alpine lakes, vast meadows, and pass through high mountain cols that reveal majestic glacier peaks.',
    itinerary: [
      { day: 1, title: 'Srinagar to Sonamarg Base Camp Drive', desc: 'Drive through alpine valleys along the Sindh River. Briefing at the base campsite.' },
      { day: 2, title: 'Trek from Sonamarg to Table Top', desc: 'Climb through pine and silver birch forests. Scenic camp facing the glaciers.' },
      { day: 3, title: 'Trek from Table Top to Nichnai Pass Camp', desc: 'Gradual hike alongside streams, crossing snow patches. High alpine camping.' },
      { day: 4, title: 'Nichnai Pass to Vishansar Lake', desc: 'Cross the Nichnai pass (13,100 ft). Descent into the valley containing the twin lakes Vishansar & Kishansar.' },
      { day: 5, title: 'Vishansar to Gadsar Lake via Gadsar Pass', desc: 'Climb to Gadsar Pass (13,750 ft) for a dual-lake view. Descend past pristine snowfields to Gadsar Lake.' },
      { day: 6, title: 'Trek from Gadsar to Satsar Lakes', desc: 'Hike across wild flower fields and green meadows. Camp beside the Satsar lakes network.' },
      { day: 7, title: 'Satsar to Gangabal Lake via Zach Pass', desc: 'Challenging ridge climb (Zach Pass). Spectacular views of Mt. Harmukh and the massive Gangabal Lake.' },
      { day: 8, title: 'Gangabal Lake to Naranag & Drive back to Srinagar', desc: 'Long descent through dense pine forests to Naranag temple ruins. Drive back to Srinagar.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1596760405802-1481a5a8f018?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.9,
    reviewCount: 228,
    inclusions: [
      'Tents (double sharing) and high altitude sleeping bags with hot liners.',
      'All meals during the trek (Day 1 dinner to Day 8 lunch).',
      'Specialized mountain guides and local Kashmiri kitchen team.',
      'Wildlife entry fees, camping permissions, and security passes.'
    ],
    exclusions: [
      'Transport from Srinagar to Sonamarg / Naranag to Srinagar.',
      'Personal offloading of backpack (₹400/day).',
      'Travel insurance and medical emergency costs.'
    ],
    safetyFitness: {
      amsRisk: 'High',
      fitnessLevel: 'Trekkers must be capable of walking 10-12 km daily across rocky climbs. Running 5 km in under 30 minutes is required.',
      medicalFormRequired: true,
      warnings: 'This is a long trek with multiple high passes (Nichnai & Gadsar). Regular checking of oxygen levels using pulse oximeter is performed daily by our leaders.'
    },
    batches: [
      'Jul 18 - Jul 25 (Slots Available)',
      'Aug 08 - Aug 15 (Filling Fast)',
      'Aug 22 - Aug 29 (Slots Available)',
      'Sep 05 - Sep 12 (Slots Available)'
    ],
    bestTimeToVisit: 'July to September is the exclusive trekking window. Early July features snow bridges; August/September yields bright green meadows and wildflower borders.',
    howToReach: 'Fly to Srinagar International Airport (SXR). Desi Nomad organizes early morning shared pickup vehicles from tourist centers in Srinagar to Sonamarg base camp.',
    nearbyAttractions: 'Explore Dal Lake houseboats, Shalimar Gardens, Thajiwas Glacier at Sonamarg, and Naranag Temple Ruins.'
  },
  {
    id: 'tarsar-marsar',
    name: 'Tarsar Marsar Twin Lakes',
    region: 'Kashmir',
    difficulty: 'Moderate',
    duration: 7,
    price: 19000,
    highlights: 'Almond-shaped lakes, flower meadows of Lidderwat, ridge camps',
    altitude: '13,201 ft',
    description: 'Explore the twin almond-shaped alpine lakes of Tarsar and Marsar. Pitch camps right on the grassy banks of these deep blue lakes and hike through sheep meadows.',
    distance: '48 km',
    bestSeason: 'July to September',
    image: `${baseUrl}images/tarsar_marsar.jpg`,
    itinerary: [
      { day: 1, title: 'Srinagar to Aru Village drive', desc: 'Scenic drive through pine glades to the pretty mountain village of Aru.' },
      { day: 2, title: 'Aru to Lidderwat meadow hike', desc: 'Hike alongside the Lidder river through pine woods and pastoral clearings.' },
      { day: 3, title: 'Lidderwat to Shekwas camp', desc: 'Forest ascent yielding to beautiful rolling grassy high-altitude meadows.' },
      { day: 4, title: 'Tarsar Lake camp', desc: 'Hike to the shores of the crystal clear blue Tarsar Lake. Camp beside the water.' },
      { day: 5, title: 'Tarsar to Sundarsar Lake crossing', desc: 'Cross the ridge over Tarsar Pass and descend into the hidden valley of Sundarsar.' },
      { day: 6, title: 'Sundarsar to Marsar Lake & back to Homwas', desc: 'Walk to view the misty Marsar Lake, then descend down to Homwas meadows.' },
      { day: 7, title: 'Homwas to Aru & drive to Srinagar', desc: 'Walk back to Aru village and drive back to Srinagar houseboats.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1596760405802-1481a5a8f018?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviewCount: 154,
    inclusions: [
      'Alpine tents, foam pads, and insulated down sleeping bags.',
      'Vegetarian healthy kitchen menu (Day 1 dinner to Day 7 lunch).',
      'WFA certified mountain guide and local porters.',
      'All forest and local authority permissions.'
    ],
    exclusions: [
      'Transport cost from Srinagar to Aru and return.',
      'Offloading charges (₹350/day per backpack).',
      'Personal clothing and trekking gear.'
    ],
    safetyFitness: {
      amsRisk: 'Moderate',
      fitnessLevel: 'Jogging 5 km in under 32 mins. Endurance to hike up steep ridges with a daypack.',
      medicalFormRequired: true,
      warnings: 'Tarsar Pass can have slippery boulder crossings. Good trekking shoes with deep lug patterns are absolutely vital.'
    },
    batches: [
      'Jul 25 - Jul 31 (Slots Available)',
      'Aug 15 - Aug 21 (Filling Fast)',
      'Sep 05 - Sep 11 (Slots Available)',
      'Sep 19 - Sep 25 (Slots Available)'
    ],
    bestTimeToVisit: 'July to September is best. Wildflowers bloom extensively in the Lidderwat and Shekwas valleys during July and August.',
    howToReach: 'Drive 112 km from Srinagar Airport to Aru Village via Pahalgam. Desi Nomad coordinates shared taxi rides from Srinagar tourist centers.',
    nearbyAttractions: 'Explore Pahalgam Valley, Betaab Valley, Aru Biosphere Reserve, and Kolahoi Glacier trails.'
  },
  {
    id: 'markha-valley',
    name: 'Markha Valley Trek',
    region: 'Ladakh',
    difficulty: 'Demanding',
    duration: 9,
    price: 26000,
    highlights: 'Cold desert valley, ancient monasteries, Kongmaru La pass',
    altitude: '17,100 ft',
    distance: '75 km',
    bestSeason: 'July to September',
    image: `${baseUrl}images/markha_valley.jpg`,
    description: 'Journey through the ancient Buddhist Kingdom of Ladakh. Hike past clay castles, barley field settlements, and high-altitude cold desert flats, crossing the towering Kongmaru La pass.',
    itinerary: [
      { day: 1, title: 'Acclimatization day in Leh', desc: 'Spend the day resting in Leh (11,500 ft) to adapt to the high altitude air.' },
      { day: 2, title: 'Leh to Chilling drive & Trek to Skiu', desc: 'Drive along Indus river to Chilling. Cross Zanskar river and trek to Skiu village.' },
      { day: 3, title: 'Trek from Skiu to Markha', desc: 'Hike past stupas and desert canyons along the Markha River to the largest valley village.' },
      { day: 4, title: 'Trek from Markha to Hankar', desc: 'Pass stone houses and high monasteries (Techa Gompa) to reach the scenic Hankar village.' },
      { day: 5, title: 'Hankar to Nimaling pasture flats', desc: 'Climb above tree boundaries to the high meadows of Nimaling under Mt. Kang Yatse.' },
      { day: 6, title: 'Nimaling to Shang Sumdo via Kongmaru La', desc: 'Challenging steep climb to Kongmaru La Pass (17,100 ft). Descent through deep gorges.' },
      { day: 7, title: 'Shang Sumdo to Leh drive via Hemis Monastery', desc: 'Drive back to Leh, stopping to explore the historic Hemis Buddhist monastery.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1590766948561-f30a5147578f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.7,
    reviewCount: 88,
    inclusions: [
      'Leh guesthouse stay (acclimatization days) and homestays/camps.',
      'Vegetarian and local Ladakhi hot meals during trekking days.',
      'Wilderness First Aid certified trek guides and support staff.',
      'Homestay support fees, camping and park taxes.'
    ],
    exclusions: [
      'Transport Leh to Chilling / Shang Sumdo to Leh.',
      'Acclimatization day personal cafe bills or museum entry fees.',
      'Backpack offloading on mules.'
    ],
    safetyFitness: {
      amsRisk: 'High',
      fitnessLevel: 'High physical stamina is needed due to dry air. Ability to jog 5 km in 28 minutes. Core endurance.',
      medicalFormRequired: true,
      warnings: 'This trek crosses the Kongmaru La Pass at 17,100 ft. A strict 48-hour acclimatization in Leh is mandatory prior to trekking. Carry water hydration tablets.'
    },
    batches: [
      'Jul 15 - Jul 23 (Slots Available)',
      'Aug 05 - Aug 13 (Filling Fast)',
      'Aug 26 - Sep 03 (Slots Available)',
      'Sep 10 - Sep 18 (Slots Available)'
    ],
    bestTimeToVisit: 'July to September is best. The passes are clear of snow, and temperatures are warm during the day (15°C to 25°C) though freezing at night.',
    howToReach: 'Fly to Leh Kushok Bakula Rimpoche Airport (IXB). Acclimatize in Leh for 2 days. Desi Nomad organizes drive from Leh to Chilling trailhead.',
    nearbyAttractions: 'Visit Hemis Monastery, Thiksey Gompa, Leh Palace, Shanti Stupa, and Indus-Zanskar confluence.'
  },
  {
    id: 'kudremukh-peak',
    name: 'Kudremukh Peak Ridge',
    region: 'Karnataka',
    difficulty: 'Moderate',
    duration: 2,
    price: 5000,
    highlights: 'Horse-faced peak, shola forest walk, misty grasslands',
    altitude: '6,207 ft',
    distance: '18 km',
    bestSeason: 'June to January',
    image: `${baseUrl}images/kudremukh.jpg`,
    description: 'Hike up the horse-shaped ridge in Kudremukh National Park. Walk under a canopy of tropical cloud forests (sholas) and climb rolling green hills that look like a green carpet in the monsoons.',
    itinerary: [
      { day: 1, title: 'Drive to Mullodi Base homestay', desc: 'Travel from Bangalore to Chikmagalur. Jeep ride to the remote Mullodi valley homestay.' },
      { day: 2, title: 'Kudremukh Peak climb & return', desc: 'Trek through shola forests and grassy ridges to the Kudremukh Peak summit. Descend to base and return.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviewCount: 164,
    inclusions: [
      'Homestay accommodation in base village Mullodi.',
      'Simple South Indian home-cooked meals (Day 1 dinner to Day 2 dinner).',
      'Licensed Forest Guide (mandatory inside the national park).',
      'National Park entry permits and forest fee taxes.'
    ],
    exclusions: [
      'Transportation to and from Mullodi base village.',
      'Personal snacks and bottled mineral water.'
    ],
    safetyFitness: {
      amsRisk: 'Low',
      fitnessLevel: 'Stamina to walk 18km in a single day. Daily cardio training of 3-4 km walking/running is helpful.',
      medicalFormRequired: false,
      warnings: 'Leeches are highly common during the monsoon season. Carry leech socks, salt, and water-repellent sprays.'
    },
    batches: [
      'Sep 12 - Sep 13 (Slots Available)',
      'Sep 26 - Sep 27 (Slots Available)',
      'Oct 10 - Oct 11 (Filling Fast)',
      'Oct 24 - Oct 25 (Slots Available)'
    ],
    bestTimeToVisit: 'June to September offers monsoonal green grasslands; October to January features cool weather and clear skies.',
    howToReach: 'Take a KSRTC bus from Bangalore to Kalasa. From Kalasa, Desi Nomad coordinates local 4x4 jeeps to Mullodi Base Village (6 km).',
    nearbyAttractions: 'Visit Someshwara Wildlife Sanctuary, Kalaseshwara Temple, and Hanuman Gundi Waterfalls.'
  },
  {
    id: 'kumara-parvatha',
    name: 'Kumara Parvatha Challenge',
    region: 'Karnataka',
    difficulty: 'Demanding',
    duration: 2,
    price: 6000,
    highlights: 'Shesha Parvatha ridge, cloud forest camp, volcanic rock slabs',
    altitude: '5,617 ft',
    distance: '26 km',
    bestSeason: 'October to February',
    image: `${baseUrl}images/kumara_parvatha.jpg`,
    description: 'Renowned as the toughest trek in South India. Climb steep muddy tracks, walk dense forests, and scale massive volcanic rock slabs to reach the misty peak of Kumara Parvatha.',
    itinerary: [
      { day: 1, title: 'Kukke Subramanya to Bhattara Mane homestay', desc: 'Start from Kukke temple town. Hike up through humid canopy forests to the forest outpost homestay.' },
      { day: 2, title: 'Bhattara Mane to Kumara Parvatha Peak & Return', desc: 'Climb past Shesha Parvatha cliffs, cross the forest patch, and scale the summit. Long descent back to Kukke.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.9,
    reviewCount: 148,
    inclusions: [
      'Bhattara Mane simple homestay stay (dormitory sharing).',
      'Basic vegetarian South Indian meals (Day 1 dinner to Day 2 lunch).',
      'Forest guide and local coordinator.',
      'Forest department entry charges.'
    ],
    exclusions: [
      'Transport to Kukke Subramanya town.',
      'Heavy luggage offloading (no porters allowed; you must carry your own pack).'
    ],
    safetyFitness: {
      amsRisk: 'Low',
      fitnessLevel: 'High endurance required. Rises through a steep forest cover. Running 5 km in under 30 minutes is recommended.',
      medicalFormRequired: false,
      warnings: 'The trail has zero water sources after the Bhattara Mane outpost. Carrying 3-4 liters of water is mandatory during the peak climb.'
    },
    batches: [
      'Oct 17 - Oct 18 (Slots Available)',
      'Nov 14 - Nov 15 (Slots Available)',
      'Dec 12 - Dec 13 (Filling Fast)',
      'Jan 09 - Jan 10 (Slots Available)'
    ],
    bestTimeToVisit: 'October to February. Avoid trekking in the hot summer months (March-May) due to intense humidity and lack of drinking water.',
    howToReach: 'Board a bus or train from Bangalore to Kukke Subramanya. The trek begins directly behind the Kukke Subramanya Temple complex.',
    nearbyAttractions: 'Visit Kukke Subramanya Temple, Biladwara Caves, and Mallalli Falls in Coorg.'
  },
  {
    id: 'sahyadri-ridge',
    name: 'Harishchandragad Fort Climb',
    region: 'Maharashtra',
    difficulty: 'Moderate',
    duration: 2,
    price: 4800,
    highlights: 'Ancient fort ruins, Kokankada 1,800ft vertical drop, caves',
    altitude: '4,670 ft',
    distance: '14 km',
    bestSeason: 'June to September (Monsoons)',
    image: `${baseUrl}images/harishchandragad.jpg`,
    description: 'Experience the magic of the Sahyadri mountains in Maharashtra. Climb past mist-covered cliffs, explore ancient cave temples, and view the massive semi-circular cliff of Kokankada.',
    itinerary: [
      { day: 1, title: 'Drive to Khireshwar & Hike to Harishchandragad Top', desc: 'Drive from Mumbai/Pune to base camp. Trek through dense forest and steep rock steps to the fort ruins. Rest at homestay.' },
      { day: 2, title: 'Sunrise at Kokankada Cliff & Return Descent', desc: 'Catch the sunrise over the massive 1,800 ft vertical drop of Kokankada. Explore Kedareshwar cave. Descent via Pachnai.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1626596167812-70b892ad21c9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviewCount: 116,
    inclusions: [
      'Local homestay accommodation at the fort peak village.',
      'Authentic Maharashtrian vegetarian meals (Pithla Bhakri/Dal Rice).',
      'Trek leaders and local route guides.',
      'Safety equipment (ropes and harnesses for rock patches).'
    ],
    exclusions: [
      'Transport Mumbai/Pune to base village.',
      'Personal expenses, cave contribution taxes.'
    ],
    safetyFitness: {
      amsRisk: 'Low',
      fitnessLevel: 'Stamina for 5-6 hours of continuous uphill hiking. Basic cardio preparation is recommended.',
      medicalFormRequired: false,
      warnings: 'The cliff edge at Kokankada has strong gusty winds. Stand well back from the edge; there are no safety railings.'
    },
    batches: [
      'Sep 19 - Sep 20 (Slots Available)',
      'Oct 03 - Oct 04 (Slots Available)',
      'Oct 17 - Oct 18 (Slots Available)',
      'Nov 07 - Nov 08 (Slots Available)'
    ],
    bestTimeToVisit: 'June to September for monsoon clouds, waterfalls, and mist; November to February for pleasant winter camping.',
    howToReach: 'Reach base village Khireshwar (via Malshej Ghat) or Pachnai. Buses run from Kalyan/Pune to Junnar.',
    nearbyAttractions: 'Explore Kedareshwar Cave Temple, Harishchandreshwar temple, Taramati Peak, and Malshej Ghat waterfalls.'
  },
  {
    id: 'kalsubai-peak',
    name: 'Kalsubai Peak Summit',
    region: 'Maharashtra',
    difficulty: 'Easy',
    duration: 1,
    price: 2500,
    highlights: 'Highest peak of Maharashtra, steel ladder climbs, temple top',
    altitude: '5,400 ft',
    distance: '10 km',
    bestSeason: 'June to December',
    image: `${baseUrl}images/kalsubai.jpg`,
    description: 'Climb the highest point in Maharashtra. Ascend vertical steel ladders placed on rocky ledges and walk through cloud-capped meadows to reach the temple summit.',
    itinerary: [
      { day: 1, title: 'Bari Village to Kalsubai Summit & Return', desc: 'Drive from Mumbai to Bari village. Climb up the iron ladders, reach the Kalsubai temple peak (5,400 ft), and descend back to Bari for lunch. Return drive.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1626596167812-70b892ad21c9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.7,
    reviewCount: 204,
    inclusions: [
      'Trek coordinators and local rescue support.',
      'Vegetarian breakfast and traditional Maharashtrian lunch at Bari village.',
      'First aid medical kit.',
      'Local village entry permits.'
    ],
    exclusions: [
      'Travel fare from Mumbai to Bari base village.',
      'Personal water bottles and walking gear.'
    ],
    safetyFitness: {
      amsRisk: 'Low',
      fitnessLevel: 'Stamina for 4-5 hours of climbing. Steel ladders require basic upper body strength and no fear of heights.',
      medicalFormRequired: false,
      warnings: 'Ladder sections can become overcrowded on weekends. Hike early in the morning to avoid queues.'
    },
    batches: [
      'Sep 13 - Sep 13 (Slots Available)',
      'Sep 27 - Sep 27 (Slots Available)',
      'Oct 11 - Oct 11 (Filling Fast)',
      'Oct 25 - Oct 25 (Slots Available)'
    ],
    bestTimeToVisit: 'June to September offers monsoonal flowers and waterfalls; October to December offers cold weather and clear views of Sahyadri ranges.',
    howToReach: 'Drive 140 km from Mumbai to Bari Base Village via Igatpuri. Local trains go to Kasara from where local shared cabs are available.',
    nearbyAttractions: 'Visit Bhandardara Dam, Arthur Lake, Wilson Dam, and Sandhan Valley.'
  },
  {
    id: 'western-tea-trail',
    name: 'Meesapulimala Peak Trail',
    region: 'Kerala',
    difficulty: 'Easy',
    duration: 2,
    price: 5800,
    highlights: 'Tea gardens, cloud forests, endemic wildlife spotting',
    altitude: '8,661 ft',
    distance: '16 km',
    bestSeason: 'September to March',
    image: `${baseUrl}images/meesapulimala.jpg`,
    description: 'Walk through high-altitude cloud forests (sholas), roll down endless green tea estates, and climb the second highest peak in the Western Ghats under the tropical sun.',
    itinerary: [
      { day: 1, title: 'Munnar to Base Camp Drive & Forest Hike', desc: 'Scenic drive past tea plantations. Hike through rhododendron shola forests to the campsite.' },
      { day: 2, title: 'Early Sunrise Climb to Meesapulimala & Descent', desc: 'Climb to the summit (6,200 ft) for sea-of-clouds view. Descent through pine forests back to Munnar.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    reviewCount: 92,
    inclusions: [
      'Premium tents / forest cottage stays near the base camp.',
      'Vegetarian and local Kerala style meals during the trek.',
      'Authorized Kerala Forest Department guides.',
      'Forest entry passes and camping permissions.'
    ],
    exclusions: [
      'Jeep transfer from Munnar to Base Camp (approx. ₹1,500/jeep).',
      'Personal water items and trekking boots.'
    ],
    safetyFitness: {
      amsRisk: 'Low',
      fitnessLevel: 'Stamina for 16 km of walking over rolling terrain. Comfort with mist and light drizzle.',
      medicalFormRequired: false,
      warnings: 'This area is home to wild elephants and Nilgiri Tahrs. Keep close to the forest guide at all times; do not stray off the trail.'
    },
    batches: [
      'Oct 10 - Oct 11 (Slots Available)',
      'Nov 07 - Nov 08 (Slots Available)',
      'Dec 05 - Dec 06 (Filling Fast)',
      'Jan 02 - Jan 03 (Slots Available)'
    ],
    bestTimeToVisit: 'September to February. The winter months offer standard cloud blankets and refreshing morning winds over the tea valleys.',
    howToReach: 'Arrive at Munnar. Take a local jeep drive through the Silent Valley tea estates to reach the base camp (24 km drive).',
    nearbyAttractions: 'Explore Eravikulam National Park, Mattupetty Dam, Anamudi Peak (highest in South India), and Munnar Tea Museum.'
  }
];
