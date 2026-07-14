import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES Modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

// Simple data extract mock to match source types without loading dynamic TS compiler in Node process
const treks = [
  { id: 'hidden-valley', name: 'Hampta Pass crossover', region: 'Himachal', duration: 5, price: 15000, highlights: 'Village stays, pine forests, high pass crossover', altitude: '14,100 ft', description: 'A spectacular crossover trek starting from the lush green valleys of Kullu/Manali and ending in the barren landscape of Spiti.' },
  { id: 'beas-kund', name: 'Beas Kund Lake Trek', region: 'Himachal', duration: 3, price: 7000, highlights: 'Glacial lake, peak views of Hanuman Tibba', altitude: '12,772 ft', description: 'Walk to the source of the Beas River, where an emerald glacial lake sits surrounded by towering peaks.' },
  { id: 'mystic-meadows', name: 'Mystic Dayara Bugyal Meadows', region: 'Uttarakhand', duration: 3, price: 9500, highlights: 'River crossings, folk heritage, open ridge camps', altitude: '11,800 ft', description: 'An idyllic weekend trek perfect for beginners and families through dense pine woodlands and alpine meadows.' },
  { id: 'valley-flowers', name: 'Valley of Flowers & Hemkund Sahib', region: 'Uttarakhand', duration: 6, price: 14500, highlights: 'UNESCO World Heritage site, alpine blooms, holy lake', altitude: '14,107 ft', description: 'Hike through a high-altitude national park containing hundreds of species of wild alpine flowers.' },
  { id: 'kedarkantha-snow', name: 'Kedarkantha Winter Summit', region: 'Uttarakhand', duration: 6, price: 9500, highlights: 'Pristine winter snow, pine clearing camps, summit ridge', altitude: '12,500 ft', description: 'Famous as the ultimate winter snow trek. Climb through pine forests filled with deep snow.' },
  { id: 'nomads-peak', name: 'Dzongri Ridge Expedition', region: 'Sikkim', duration: 7, price: 24000, highlights: 'Alpine blooms, panoramic Kanchenjunga views', altitude: '13,680 ft', description: 'A demanding but life-changing expedition that takes you into the heart of Sikkims wild mountains.' },
  { id: 'goechala-pass', name: 'Goechala Pass Expedition', region: 'Sikkim', duration: 10, price: 28500, highlights: 'Kanchenjunga face view, rhododendron forests, Samiti lake', altitude: '15,100 ft', description: 'The pinnacle of high-altitude Himalayan trekking in East India.' },
  { id: 'kashmir-lakes', name: 'Kashmir Great Lakes Traverse', region: 'Kashmir', duration: 8, price: 27500, highlights: 'Seven alpine lakes, snow bridges, maple forests', altitude: '13,750 ft', description: 'Traverse through seven pristine alpine lakes, vast meadows, and pass through high mountain cols.' },
  { id: 'tarsar-marsar', name: 'Tarsar Marsar Twin Lakes', region: 'Kashmir', duration: 7, price: 19000, highlights: 'Almond-shaped lakes, flower meadows of Lidderwat', altitude: '13,201 ft', description: 'Explore the twin almond-shaped alpine lakes of Tarsar and Marsar.' },
  { id: 'markha-valley', name: 'Markha Valley Trek', region: 'Ladakh', duration: 9, price: 26000, highlights: 'Cold desert valley, ancient monasteries, Kongmaru La pass', altitude: '17,100 ft', description: 'Journey through the ancient Buddhist Kingdom of Ladakh.' },
  { id: 'kudremukh-peak', name: 'Kudremukh Peak Ridge', region: 'Karnataka', duration: 2, price: 5000, highlights: 'Horse-faced peak, shola forest walk, misty grasslands', altitude: '6,207 ft', description: 'Hike up the horse-shaped ridge in Kudremukh National Park.' },
  { id: 'kumara-parvatha', name: 'Kumara Parvatha Challenge', region: 'Karnataka', duration: 2, price: 6000, highlights: 'Shesha Parvatha ridge, cloud forest camp', altitude: '5,617 ft', description: 'Renowned as the toughest trek in South India.' },
  { id: 'sahyadri-ridge', name: 'Harishchandragad Fort Climb', region: 'Maharashtra', duration: 2, price: 4800, highlights: 'Ancient fort ruins, Kokankada 1,800ft vertical drop', altitude: '4,670 ft', description: 'Experience the magic of the Sahyadri mountains in Maharashtra.' },
  { id: 'kalsubai-peak', name: 'Kalsubai Peak Summit', region: 'Maharashtra', duration: 1, price: 2500, highlights: 'Highest peak of Maharashtra, steel ladder climbs', altitude: '5,400 ft', description: 'Climb the highest point in Maharashtra.' },
  { id: 'western-tea-trail', name: 'Meesapulimala Peak Trail', region: 'Kerala', duration: 2, price: 5800, highlights: 'Tea gardens, cloud forests, endemic wildlife', altitude: '8,661 ft', description: 'Walk through high-altitude cloud forests and tea estates.' }
];

const blogs = [
  { id: 'layering-guide', title: 'The Himalayan Layering Guide: How to Dress for Sub-Zero', excerpt: 'Dressing for high altitudes is a science. Learn the 3-layer system—base, insulation, and outer shell.', category: 'Gear Reviews', author: 'Suraj Singh' },
  { id: 'acclimatization-science', title: 'High-Altitude Acclimatization: Science and Safety', excerpt: 'Understand how your body adapts to thin air, what causes Acute Mountain Sickness (AMS), and the rules to prevent it.', category: 'Travel Tips', author: 'Dr. Rahul Sharma' },
  { id: 'leave-no-trace', title: 'Leave No Trace: The Code of Sustainable Trekking', excerpt: 'The Himalayas face a massive garbage crisis. Practice the 7 Leave No Trace principles.', category: 'Camping', author: 'Suraj Singh' },
  { id: 'himalayan-culture', title: 'Pastoral Communities: Life in High Altitude Villages', excerpt: 'Meet the Gaddi, Gujjar, and Bhotia shepherds. Discover how homestay tourism supports local families.', category: 'Adventure Stories', author: 'Priya Mukherjee' },
  { id: 'footwear-guide', title: 'How to Choose the Right Trekking Shoes', excerpt: 'Your shoes can make or break your trek. Learn how to select the right fit, sole grip, ankle support.', category: 'Gear Reviews', author: 'Suraj Singh' }
];

function prerender() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('Template index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  console.log('Starting Static Site Generation (SSG) pre-renderer...');

  // 1. Pre-render Trek Pages
  treks.forEach((trek) => {
    const dir = path.join(DIST_DIR, 'treks', trek.id);
    fs.mkdirSync(dir, { recursive: true });

    let html = template;
    // Replace Meta Tags for unique trek page indexation
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${trek.name} Guided Tour Package (Altitude: ${trek.altitude}) - Desi Nomad</title>`
    );
    html = html.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="Join the ${trek.name} in ${trek.region}. Duration: ${trek.duration} Days. Highlights: ${trek.highlights}. Book with Desi Nomad." />`
    );
    html = html.replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="https://Suraj881raftaar.github.io/Desi-nomad-/treks/${trek.id}/" />`
    );

    // Replace Facebook Open Graph
    html = html.replace(
      /<meta property="og:title" content=".*?" \/>/g,
      `<meta property="og:title" content="${trek.name} Guided Tour Package - Desi Nomad" />`
    );
    html = html.replace(
      /<meta property="og:description" content=".*?" \/>/g,
      `<meta property="og:description" content="Join the ${trek.name} in ${trek.region}. Duration: ${trek.duration} Days. Book with Desi Nomad." />`
    );
    html = html.replace(
      /<meta property="og:url" content=".*?" \/>/g,
      `<meta property="og:url" content="https://Suraj881raftaar.github.io/Desi-nomad-/treks/${trek.id}/" />`
    );

    // Inject Product Schema JSON-LD for Search Console rich snippets
    const productSchema = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${trek.name}",
        "description": "${trek.description}",
        "image": "https://Suraj881raftaar.github.io/Desi-nomad-/images/${trek.id}.webp",
        "brand": {
          "@type": "Brand",
          "name": "Desi Nomad"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "${trek.price}",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "url": "https://Suraj881raftaar.github.io/Desi-nomad-/treks/${trek.id}/"
        }
      }
    </script>
    </head>`;
    
    html = html.replace('</head>', productSchema);

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`✓ Pre-rendered SSG Page: /treks/${trek.id}/index.html`);
  });

  // 2. Pre-render Blog Pages
  blogs.forEach((post) => {
    const dir = path.join(DIST_DIR, 'blog', post.id);
    fs.mkdirSync(dir, { recursive: true });

    let html = template;
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${post.title} - Desi Nomad Diaries</title>`
    );
    html = html.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${post.excerpt}" />`
    );
    html = html.replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="https://Suraj881raftaar.github.io/Desi-nomad-/blog/${post.id}/" />`
    );

    // Open Graph
    html = html.replace(
      /<meta property="og:title" content=".*?" \/>/g,
      `<meta property="og:title" content="${post.title} - Desi Nomad Diaries" />`
    );
    html = html.replace(
      /<meta property="og:description" content=".*?" \/>/g,
      `<meta property="og:description" content="${post.excerpt}" />`
    );
    html = html.replace(
      /<meta property="og:url" content=".*?" \/>/g,
      `<meta property="og:url" content="https://Suraj881raftaar.github.io/Desi-nomad-/blog/${post.id}/" />`
    );

    // Inject BlogPosting Schema JSON-LD for Google Discover
    const articleSchema = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${post.title}",
        "description": "${post.excerpt}",
        "author": {
          "@type": "Person",
          "name": "${post.author}"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Desi Nomad"
        },
        "mainEntityOfPage": "https://Suraj881raftaar.github.io/Desi-nomad-/blog/${post.id}/"
      }
    </script>
    </head>`;
    
    html = html.replace('</head>', articleSchema);

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`✓ Pre-rendered SSG Page: /blog/${post.id}/index.html`);
  });

  console.log('Static Site Generation (SSG) process finished successfully!');
}

prerender();
