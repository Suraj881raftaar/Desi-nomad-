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
    name: 'Hidden Valley Trek',
    region: 'Himachal',
    difficulty: 'Moderate',
    duration: 5,
    price: 15000,
    highlights: 'Village stays, pine forests, high pass views',
    altitude: '14,100 ft (Hampta Pass)',
    distance: '34 km',
    bestSeason: 'June to October',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    description: 'A spectacular crossover trek starting from the lush green valleys of Kullu/Manali and ending in the barren, semi-arid desert landscapes of Lahaul and Spiti. Witness dramatic changes in terrain day by day.',
    itinerary: [
      { day: 1, title: 'Drive from Manali to Jobra & Trek to Chika', desc: 'Drive through 40 hairpin bends with views of Solang Valley. Easy trek through oak forests and river crossings.' },
      { day: 2, title: 'Trek from Chika to Balu ka Ghera', desc: 'Gradual ascent along the river. Cross boulder zones. Spot alpine flowers and snow patches.' },
      { day: 3, title: 'Trek from Balu ka Ghera to Hampta Pass and Shea Goru', desc: 'Challenging steep climb through snow. Reach Hampta Pass summit (14,100 ft) for panoramic views of Spiti valley. Descend to Shea Goru.' },
      { day: 4, title: 'Trek from Shea Goru to Chhatru & Drive to Chandratal Lake', desc: 'Easy descent through glacial streams and gravel trails to Chhatru. Drive to the mesmerizing crescent moon Chandratal Lake.' },
      { day: 5, title: 'Drive from Chhatru to Manali via Atal Tunnel', desc: 'Morning breakfast beside the river. Scenic drive through the engineering marvel of Atal Tunnel back to Manali.' }
    ]
  },
  {
    id: 'mystic-meadows',
    name: 'Mystic Meadows Exploration',
    region: 'Uttarakhand',
    difficulty: 'Easy',
    duration: 3,
    price: 9500,
    highlights: 'River crossings, folk heritage, open ridge camps',
    altitude: '8,200 ft',
    distance: '18 km',
    bestSeason: 'Year Round',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    description: 'An idyllic weekend trek perfect for beginners and families. Walk through dense pine woodlands and cross clear streams, culminating in broad green meadows that afford stunning 360-degree views of Himalayan ranges.',
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri Scenic Drive', desc: 'Drive through pine forest roadways alongside the Tons River. Briefing at village homestay.' },
      { day: 2, title: 'Trek from Sankri to Mystic Meadows Camp', desc: 'Forest hike. Experience clean village settings, folk storytelling circle, and campfire.' },
      { day: 3, title: 'Summit Meadows Exploration & Return to Dehradun', desc: 'Early sunrise watch at peak viewpoints. Easy hike back down to base camp. Evening drive to Dehradun.' }
    ]
  },
  {
    id: 'nomads-peak',
    name: "Nomad's Peak Expedition",
    region: 'Sikkim',
    difficulty: 'Demanding',
    duration: 7,
    price: 24000,
    highlights: 'Alpine blooms, panoramic Himalayan views, sacred lakes',
    altitude: '15,100 ft',
    distance: '62 km',
    bestSeason: 'April to June, September to November',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
    description: 'A demanding but life-changing expedition that takes you into the heart of Sikkim’s wild mountains. Hike past frozen lakes, rhododendron valleys, and wind-swept ridges to face giant peaks like Mount Pandim and Kanchenjunga.',
    itinerary: [
      { day: 1, title: 'NJP Railway Station to Yuksom Drive', desc: 'Scenic hill roads along the Teesta River. Rest at historic capital town of Yuksom.' },
      { day: 2, title: 'Yuksom to Sachen Trek', desc: 'Trek through the lush Kanchenjunga National Park. Cross iron bridges over raging mountain streams.' },
      { day: 3, title: 'Sachen to Tsokha Steep Hike', desc: 'Challenging climb through rhododendron and pine forests. Spectacular views of Mount Pandim.' },
      { day: 4, title: 'Tsokha to Dzongri Ridge Top', desc: 'Steep ascent on wooden walkways. Camp above the treeline with sweeping mountain ranges.' },
      { day: 5, title: 'Dzongri Summit Sunrise & Trek back to Tsokha', desc: 'Early morning hike to Dzongri top (13,680 ft) for golden views of Kanchenjunga. Return hike to Tsokha.' },
      { day: 6, title: 'Tsokha back to Yuksom', desc: 'Long but easy descent through the forest trails back to Yuksom village. Farewell celebration.' },
      { day: 7, title: 'Yuksom to NJP Drive', desc: 'Return scenic drive back to Siliguri railway station/Bagdogra airport.' }
    ]
  },
  {
    id: 'kashmir-lakes',
    name: 'Kashmir Lakes Traverse',
    region: 'Kashmir',
    difficulty: 'Demanding',
    duration: 8,
    price: 27500,
    highlights: 'Alpine lakes, snow bridges, maple forests',
    altitude: '13,750 ft (Nichnai Pass)',
    distance: '72 km',
    bestSeason: 'July to September',
    image: 'https://images.unsplash.com/photo-1596760405802-1481a5a8f018?auto=format&fit=crop&w=800&q=80',
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
    id: 'sahyadri-ridge',
    name: 'Sahyadri Ridge Climb',
    region: 'Maharashtra',
    difficulty: 'Moderate',
    duration: 2,
    price: 4800,
    highlights: 'Ancient fort ruins, vertical cliff views, waterfall showers',
    altitude: '4,670 ft (Harishchandragad)',
    distance: '14 km',
    bestSeason: 'June to September (Monsoons)',
    image: 'https://images.unsplash.com/photo-1626596167812-70b892ad21c9?auto=format&fit=crop&w=800&q=80',
    description: 'Experience the magic of the Sahyadri mountains in Maharashtra. Climb past mist-covered cliffs, explore ancient cave temples, and view the massive semi-circular cliff of Kokankada.',
    itinerary: [
      { day: 1, title: 'Drive to Khireshwar & Hike to Harishchandragad Top', desc: 'Drive from Mumbai/Pune to base camp. Trek through dense forest and steep rock steps to the fort ruins. Rest at homestay.' },
      { day: 2, title: 'Sunrise at Kokankada Cliff & Return Descent', desc: 'Catch the sunrise over the massive 1,800 ft vertical drop of Kokankada. Explore Kedareshwar cave. Descent via Pachnai.' }
    ]
  },
  {
    id: 'western-tea-trail',
    name: 'Western Ghats Tea Trail',
    region: 'Kerala',
    difficulty: 'Easy',
    duration: 2,
    price: 5800,
    highlights: 'Tea gardens, cloud forests, endemic wildlife spotting',
    altitude: '6,200 ft (Meesapulimala)',
    distance: '16 km',
    bestSeason: 'September to March',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    description: 'Walk through high-altitude cloud forests (sholas), roll down endless green tea estates, and climb the second highest peak in the Western Ghats under the tropical sun.',
    itinerary: [
      { day: 1, title: 'Munnar to Base Camp Drive & Forest Hike', desc: 'Scenic drive past tea plantations. Hike through rhododendron shola forests to the campsite.' },
      { day: 2, title: 'Early Sunrise Climb to Meesapulimala & Descent', desc: 'Climb to the summit (6,200 ft) for sea-of-clouds view. Descent through pine forests back to Munnar.' }
    ]
  }
];
