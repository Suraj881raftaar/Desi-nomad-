export interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
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
}

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
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Hampta_Pass_Himachal_Pradesh_India.jpg',
    description: 'A spectacular crossover trek starting from the lush green valleys of Kullu/Manali and ending in the barren, semi-arid desert landscapes of Lahaul and Spiti. Witness dramatic changes in terrain day by day.',
    itinerary: [
      { day: 1, title: 'Drive from Manali to Jobra & Trek to Chika', desc: 'Drive through 40 hairpin bends. Easy trek through oak forests and river crossings.' },
      { day: 2, title: 'Trek from Chika to Balu ka Ghera', desc: 'Gradual ascent along the river. Cross boulder zones. Spot alpine flowers.' },
      { day: 3, title: 'Trek from Balu ka Ghera to Hampta Pass and Shea Goru', desc: 'Challenging steep climb through snow. Reach Hampta Pass summit (14,100 ft) for panoramic views. Descend to Shea Goru.' },
      { day: 4, title: 'Trek from Shea Goru to Chhatru & Drive to Chandratal Lake', desc: 'Easy descent to Chhatru. Drive to the crescent moon Chandratal Lake.' },
      { day: 5, title: 'Drive from Chhatru to Manali via Atal Tunnel', desc: 'Morning breakfast beside the river. Scenic drive through Atal Tunnel back to Manali.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Beas_Kund_%2801%29.jpg',
    description: 'Walk to the source of the Beas River, where a emerald glacial lake sits surrounded by towering peaks. Extremely scenic, short, and beginner-friendly alpine hike.',
    itinerary: [
      { day: 1, title: 'Manali to Solang Nallah & Trek to Dhundi', desc: 'Drive to Solang Valley and start trekking through pine and birch forest alongside the river.' },
      { day: 2, title: 'Dhundi to Beas Kund Lake & back to Bakarthach', desc: 'Climb past boulder-filled glacial moraines to reach the pristine glacial Beas Kund lake.' },
      { day: 3, title: 'Bakarthach to Dhundi & Drive back to Manali', desc: 'Descend through grassy valleys to Dhundi road head, then drive back to Manali.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Dayara_Bugyal_Trek_%2849011862392%29.jpg',
    description: 'An idyllic weekend trek perfect for beginners and families. Walk through dense pine woodlands and cross clear streams, culminating in broad green alpine meadows that afford stunning 360-degree views of Himalayan ranges.',
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri Scenic Drive', desc: 'Drive through pine forest roadways alongside the Tons River. Briefing at village homestay.' },
      { day: 2, title: 'Trek from Sankri to Mystic Meadows Camp', desc: 'Forest hike. Experience clean village settings, folk storytelling circle, and campfire.' },
      { day: 3, title: 'Summit Meadows Exploration & Return to Dehradun', desc: 'Early sunrise watch at peak viewpoints. Easy hike back down to base camp. Evening drive to Dehradun.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Valley_of_Flowers_National_Park_India.jpg',
    description: 'Hike through a high-altitude national park containing hundreds of species of wild alpine flowers. Combine this natural wonder with a spiritual climb to the high glacial lake of Hemkund Sahib.',
    itinerary: [
      { day: 1, title: 'Haridwar to Govindghat scenic drive', desc: 'Scenic mountain drive alongside the holy Alaknanda and Bhagirathi rivers confluence.' },
      { day: 2, title: 'Govindghat to Ghangaria hike', desc: 'Trek along the Lakshman Ganga river through dense oak and pine woods to Ghangaria village.' },
      { day: 3, title: 'Explore Valley of Flowers National Park', desc: 'Hike into the flower valley, cross small streams, and spot rare high-altitude orchids and lilies.' },
      { day: 4, title: 'Trek to Hemkund Sahib Holy Lake', desc: 'Steep climb to the sacred high-altitude Sikh shrine and the pristine lake beside it (14,107 ft).' },
      { day: 5, title: 'Ghangaria back to Govindghat', desc: 'Easy descent back along the river trail to Govindghat. Evening rest.' },
      { day: 6, title: 'Govindghat drive back to Haridwar', desc: 'Return scenic drive back to Haridwar railway station.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Kedarkantha_Peak.jpg',
    description: 'Famous as the ultimate winter snow trek. Climb through pine forests filled with deep snow and walk the ridge to reach a peak offering panoramic views of the Swargarohini range.',
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri base camp drive', desc: 'Scenic mountain drive past Mussoorie and along the Tons River to Sankri homestay.' },
      { day: 2, title: 'Sankri to Juda ka Talab camp', desc: 'Forest trek on snowy trails. Reach Juda ka Talab, a frozen pine lake.' },
      { day: 3, title: 'Juda ka Talab to Kedarkantha base camp', desc: 'Walk through open snow clearings. Camp under snowy peaks with clear star skies.' },
      { day: 4, title: 'Summit climb & descent to Hargaon camp', desc: 'Early morning summit push (12,500 ft) for sunrise. Descend down to Hargaon meadows.' },
      { day: 5, title: 'Hargaon to Sankri descent', desc: 'Hike back down through thick oak forests to Sankri village. Celebrate the trek.' },
      { day: 6, title: 'Drive back to Dehradun', desc: 'Morning drive back to Dehradun railway station/airport.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Kangch-Goechala.jpg',
    description: 'A demanding but life-changing expedition that takes you into the heart of Sikkim’s wild mountains. Hike past frozen lakes, rhododendron valleys, and wind-swept ridges to face giant peaks like Mount Pandim and Kanchenjunga.',
    itinerary: [
      { day: 1, title: 'NJP Railway Station to Yuksom Drive', desc: 'Scenic hill roads along the Teesta River. Rest at Yuksom.' },
      { day: 2, title: 'Yuksom to Sachen Trek', desc: 'Trek through the lush Kanchenjunga National Park. Cross iron bridges.' },
      { day: 3, title: 'Sachen to Tsokha Steep Hike', desc: 'Challenging climb through rhododendron and pine forests.' },
      { day: 4, title: 'Tsokha to Dzongri Ridge Top', desc: 'Steep ascent on wooden walkways. Camp above the treeline.' },
      { day: 5, title: 'Dzongri Summit Sunrise & Trek back to Tsokha', desc: 'Early morning hike to Dzongri top (13,680 ft) for golden views of Kanchenjunga.' },
      { day: 6, title: 'Tsokha back to Yuksom', desc: 'Long descent through the forest trails back to Yuksom village.' },
      { day: 7, title: 'Yuksom to NJP Drive', desc: 'Return scenic drive back to Siliguri railway station.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Kangch-Goechala.jpg',
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
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Kashmir_Great_Lakes.jpg',
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
    ]
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
    distance: '48 km',
    bestSeason: 'July to September',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Tarsar_lake.jpg',
    description: 'Explore the twin almond-shaped alpine lakes of Tarsar and Marsar. Pitch camps right on the grassy banks of these deep blue lakes and hike through sheep meadows.',
    itinerary: [
      { day: 1, title: 'Srinagar to Aru Village drive', desc: 'Scenic drive through pine glades to the pretty mountain village of Aru.' },
      { day: 2, title: 'Aru to Lidderwat meadow hike', desc: 'Hike alongside the Lidder river through pine woods and pastoral clearings.' },
      { day: 3, title: 'Lidderwat to Shekwas camp', desc: 'Forest ascent yielding to beautiful rolling grassy high-altitude meadows.' },
      { day: 4, title: 'Shekwas to Tarsar Lake camp', desc: 'Hike to the shores of the crystal clear blue Tarsar Lake. Camp beside the water.' },
      { day: 5, title: 'Tarsar to Sundarsar Lake crossing', desc: 'Cross the ridge over Tarsar Pass and descend into the hidden valley of Sundarsar.' },
      { day: 6, title: 'Sundarsar to Marsar Lake & back to Homwas', desc: 'Walk to view the misty Marsar Lake, then descend down to Homwas meadows.' },
      { day: 7, title: 'Homwas to Aru & drive to Srinagar', desc: 'Walk back to Aru village and drive back to Srinagar houseboats.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Markha_Valley.jpg',
    description: 'Journey through the ancient Buddhist Kingdom of Ladakh. Hike past clay castles, barley fields, and high-altitude cold desert flats, crossing the towering Kongmaru La pass.',
    itinerary: [
      { day: 1, title: 'Acclimatization day in Leh', desc: 'Spend the day resting in Leh (11,500 ft) to adapt to the high altitude air.' },
      { day: 2, title: 'Leh to Chilling drive & Trek to Skiu', desc: 'Drive along Indus river to Chilling. Cross Zanskar river and trek to Skiu village.' },
      { day: 3, title: 'Trek from Skiu to Markha', desc: 'Hike past stupas and desert canyons along the Markha River to the largest valley village.' },
      { day: 4, title: 'Trek from Markha to Hankar', desc: 'Pass stone houses and high monasteries (Techa Gompa) to reach the scenic Hankar village.' },
      { day: 5, title: 'Hankar to Nimaling pasture flats', desc: 'Climb above tree boundaries to the high meadows of Nimaling under Mt. Kang Yatse.' },
      { day: 6, title: 'Nimaling to Shang Sumdo via Kongmaru La', desc: 'Challenging steep climb to Kongmaru La Pass (17,100 ft). Descent through deep gorges.' },
      { day: 7, title: 'Shang Sumdo to Leh drive via Hemis Monastery', desc: 'Drive back to Leh, stopping to explore the historic Hemis Buddhist monastery.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Kudremukh_National_Park.jpg',
    description: 'Hike up the horse-shaped ridge in Kudremukh National Park. Walk under a canopy of tropical cloud forests (sholas) and climb rolling green hills that look like a green carpet in the monsoons.',
    itinerary: [
      { day: 1, title: 'Drive to Mullodi Base homestay', desc: 'Travel from Bangalore to Chikmagalur. Jeep ride to the remote Mullodi valley homestay.' },
      { day: 2, title: 'Kudremukh Peak climb & return', desc: 'Trek through shola forests and grassy ridges to the Kudremukh Peak summit. Descend to base and return.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/This_is_the_beautiful_view_of_Kumara_parvatha.jpg',
    description: 'Renowned as the toughest trek in South India. Climb steep muddy tracks, walk dense forests, and scale massive volcanic rock slabs to reach the misty peak of Kumara Parvatha.',
    itinerary: [
      { day: 1, title: 'Kukke Subramanya to Bhattara Mane homestay', desc: 'Start from Kukke temple town. Hike up through humid canopy forests to the forest outpost homestay.' },
      { day: 2, title: 'Bhattara Mane to Kumara Parvatha Peak & Return', desc: 'Climb past Shesha Parvatha cliffs, cross the forest patch, and scale the summit. Long descent back to Kukke.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Kokankada.jpg',
    description: 'Experience the magic of the Sahyadri mountains in Maharashtra. Climb past mist-covered cliffs, explore ancient cave temples, and view the massive semi-circular cliff of Kokankada.',
    itinerary: [
      { day: 1, title: 'Drive to Khireshwar & Hike to Harishchandragad Top', desc: 'Drive from Mumbai/Pune to base camp. Trek through dense forest and steep rock steps to the fort ruins. Rest at homestay.' },
      { day: 2, title: 'Sunrise at Kokankada Cliff & Return Descent', desc: 'Catch the sunrise over the massive 1,800 ft vertical drop of Kokankada. Explore Kedareshwar cave. Descent via Pachnai.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Kalsubai%2C_Western_Ghats.jpg',
    description: 'Climb the highest point in Maharashtra. Ascend vertical steel ladders placed on rocky ledges and walk through cloud-capped meadows to reach the temple summit.',
    itinerary: [
      { day: 1, title: 'Bari Village to Kalsubai Summit & Return', desc: 'Drive from Mumbai to Bari village. Climb up the iron ladders, reach the Kalsubai temple peak (5,400 ft), and descend back to Bari for lunch. Return drive.' }
    ]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Meesapulimala_View.jpg',
    description: 'Walk through high-altitude cloud forests (sholas), roll down endless green tea estates, and climb the second highest peak in the Western Ghats under the tropical sun.',
    itinerary: [
      { day: 1, title: 'Munnar to Base Camp Drive & Forest Hike', desc: 'Scenic drive past tea plantations. Hike through rhododendron shola forests to the campsite.' },
      { day: 2, title: 'Early Sunrise Climb to Meesapulimala & Descent', desc: 'Climb to the summit (6,200 ft) for sea-of-clouds view. Descent through pine forests back to Munnar.' }
    ]
  }
];
