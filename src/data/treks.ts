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
  }
];
