import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

let SITE_URL = 'https://desi-nomad.pages.dev';
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const parts = line.split('=');
    if (parts.length >= 2 && parts[0].trim() === 'VITE_SITE_URL') {
      SITE_URL = parts.slice(1).join('=').trim();
      break;
    }
  }
}
console.log(`Using SITE_URL: ${SITE_URL}`);

const treks = [
  { id: 'hidden-valley', name: 'Hampta Pass crossover', region: 'Himachal', duration: 5, price: 15000, highlights: 'Village stays, pine forests, high pass crossover', altitude: '14,100 ft', description: 'A spectacular crossover trek starting from the lush green valleys of Kullu/Manali and ending in the barren landscape of Spiti.', file: 'hampta_pass.webp', title: 'Hampta Pass Crossover Trek Himachal', caption: 'Hikers traversing the snow ridge at Hampta Pass summit, Himachal Pradesh, India' },
  { id: 'beas-kund', name: 'Beas Kund Lake Trek', region: 'Himachal', duration: 3, price: 7000, highlights: 'Glacial lake, peak views of Hanuman Tibba', altitude: '12,772 ft', description: 'Walk to the source of the Beas River, where an emerald glacial lake sits surrounded by towering peaks.', file: 'beas_kund.webp', title: 'Beas Kund Glacial Lake Trek', caption: 'Pristine emerald glacial lake at the source of Beas River, Manali' },
  { id: 'mystic-meadows', name: 'Mystic Dayara Bugyal Meadows', region: 'Uttarakhand', duration: 3, price: 9500, highlights: 'River crossings, folk heritage, open ridge camps', altitude: '11,800 ft', description: 'An idyllic weekend trek perfect for beginners and families through dense pine woodlands and alpine meadows.', file: 'dayara_bugyal.webp', title: 'Mystic Dayara Bugyal Meadows Trek', caption: 'Vast alpine green meadows of Dayara Bugyal, Uttarakhand' },
  { id: 'valley-flowers', name: 'Valley of Flowers & Hemkund Sahib', region: 'Uttarakhand', duration: 6, price: 14500, highlights: 'UNESCO World Heritage site, alpine blooms, holy lake', altitude: '14,107 ft', description: 'Hike through a high-altitude national park containing hundreds of species of wild alpine flowers.', file: 'valley_of_flowers.webp', title: 'Valley of Flowers National Park Uttarakhand', caption: 'Beautiful mountain valley carpeted with wildflowers, UNESCO site' },
  { id: 'kedarkantha-snow', name: 'Kedarkantha Winter Summit', region: 'Uttarakhand', duration: 6, price: 9500, highlights: 'Pristine winter snow, pine clearing camps, summit ridge', altitude: '12,500 ft', description: 'Famous as the ultimate winter snow trek. Climb through pine forests filled with deep snow.', file: 'kedarkantha.webp', title: 'Kedarkantha Snow Peak Summit', caption: 'Trekkers climbing the snowy summit ridge of Kedarkantha in winter' },
  { id: 'nomads-peak', name: 'Dzongri Ridge Expedition', region: 'Sikkim', duration: 7, price: 24000, highlights: 'Alpine blooms, panoramic Kanchenjunga views', altitude: '13,680 ft', description: 'A demanding but life-changing expedition that takes you into the heart of Sikkims wild mountains.', file: 'dzongri_ridge.webp', title: 'Dzongri Ridge Expedition Sikkim', caption: 'Panoramic views of Mount Kanchenjunga from the Dzongri Ridge top' },
  { id: 'goechala-pass', name: 'Goechala Pass Expedition', region: 'Sikkim', duration: 10, price: 28500, highlights: 'Kanchenjunga face view, rhododendron forests, Samiti lake', altitude: '15,100 ft', description: 'The pinnacle of high-altitude Himalayan trekking in East India.', file: 'goechala.webp', title: 'Goechala Pass Trek Sikkim', caption: 'The massive face of Mt Kanchenjunga from Goechala view point' },
  { id: 'kashmir-lakes', name: 'Kashmir Great Lakes Traverse', region: 'Kashmir', duration: 8, price: 27500, highlights: 'Seven alpine lakes, snow bridges, maple forests', altitude: '13,750 ft', description: 'Traverse through seven pristine alpine lakes, vast meadows, and pass through high mountain cols.', file: 'kashmir_lakes.webp', title: 'Kashmir Great Lakes Alpine Traverse', caption: 'Beautiful clear blue alpine lake surrounded by green valleys in Kashmir' },
  { id: 'tarsar-marsar', name: 'Tarsar Marsar Twin Lakes', region: 'Kashmir', duration: 7, price: 19000, highlights: 'Almond-shaped lakes, flower meadows of Lidderwat', altitude: '13,201 ft', description: 'Explore the twin almond-shaped alpine lakes of Tarsar and Marsar.', file: 'tarsar_marsar.webp', title: 'Tarsar Marsar Twin Lakes Kashmir', caption: 'Campsite pitched on the green banks of Tarsar Lake, Aru Valley' },
  { id: 'markha-valley', name: 'Markha Valley Trek', region: 'Ladakh', duration: 9, price: 26000, highlights: 'Cold desert valley, ancient monasteries, Kongmaru La pass', altitude: '17,100 ft', description: 'Journey through the ancient Buddhist Kingdom of Ladakh.', file: 'markha_valley.webp', title: 'Markha Valley Cold Desert Trek Ladakh', caption: 'Stupas and canyon routes in the barren Markha Valley, Ladakh' },
  { id: 'kudremukh-peak', name: 'Kudremukh Peak Ridge', region: 'Karnataka', duration: 2, price: 5000, highlights: 'Horse-faced peak, shola forest walk, misty grasslands', altitude: '6,207 ft', description: 'Hike up the horse-shaped ridge in Kudremukh National Park.', file: 'kudremukh.webp', title: 'Kudremukh Peak Grasslands Karnataka', caption: 'Lush rolling green hills and shola cloud forests of Kudremukh peak' },
  { id: 'kumara-parvatha', name: 'Kumara Parvatha Challenge', region: 'Karnataka', duration: 2, price: 6000, highlights: 'Shesha Parvatha ridge, cloud forest camp', altitude: '5,617 ft', description: 'Renowned as the toughest trek in South India.', file: 'kumara_parvatha.webp', title: 'Kumara Parvatha Ridge Trail Karnataka', caption: 'Climbing past Shesha Parvatha cliff trails to Kumara Parvatha peak' },
  { id: 'sahyadri-ridge', name: 'Harishchandragad Fort Climb', region: 'Maharashtra', duration: 2, price: 4800, highlights: 'Ancient fort ruins, Kokankada 1,800ft vertical drop', altitude: '4,670 ft', description: 'Experience the magic of the Sahyadri mountains in Maharashtra.', file: 'harishchandragad.webp', title: 'Kokankada Cliff Harishchandragad Maharashtra', caption: 'The massive 1,800 ft vertical drop horseshoe cliff of Kokankada' },
  { id: 'kalsubai-peak', name: 'Kalsubai Peak Summit', region: 'Maharashtra', duration: 1, price: 2500, highlights: 'Highest peak of Maharashtra, steel ladder climbs', altitude: '5,400 ft', description: 'Climb the highest point in Maharashtra.', file: 'kalsubai.webp', title: 'Kalsubai Peak Ladder Climb Maharashtra', caption: 'Climbing the steel ladders leading to the highest point of Maharashtra' },
  { id: 'western-tea-trail', name: 'Meesapulimala Peak Trail', region: 'Kerala', duration: 2, price: 5800, highlights: 'Tea gardens, cloud forests, endemic wildlife', altitude: '8,661 ft', description: 'Walk through high-altitude cloud forests and tea estates.', file: 'meesapulimala.webp', title: 'Meesapulimala Peak Cloud Valley Kerala', caption: 'Misty cloud valleys and tea estates of Meesapulimala, Munnar' }
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
  console.log('Starting Static Site Generation (SSG)...');

  // 1. Pre-render Treks
  treks.forEach((t) => {
    const dir = path.join(DIST_DIR, 'treks', t.id);
    fs.mkdirSync(dir, { recursive: true });
    let html = template
      .replace(/<title>.*?<\/title>/, `<title>${t.name} (Altitude: ${t.altitude}) - Desi Nomad Trails</title>`)
      .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="Join the ${t.name} in ${t.region}. Duration: ${t.duration} Days. Highlights: ${t.highlights}. Book with Desi Nomad Trails." />`)
      .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${SITE_URL}/treks/${t.id}/" />`)
      .replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${t.name} - Desi Nomad Trails" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="Join the ${t.name} in ${t.region} for ${t.duration} Days." />`)
      .replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${SITE_URL}/treks/${t.id}/" />`);

    const schema = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${t.name}",
        "description": "${t.description}",
        "image": "${SITE_URL}/images/${t.file}",
        "brand": { "@type": "Brand", "name": "Desi Nomad Trails" },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "${t.price}",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "url": "${SITE_URL}/treks/${t.id}/"
        }
      }
    </script>
    </head>`;
    html = html.replace('</head>', schema);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`✓ Pre-rendered: /treks/${t.id}/index.html`);
  });

  // 2. Pre-render Blogs
  blogs.forEach((b) => {
    const dir = path.join(DIST_DIR, 'blog', b.id);
    fs.mkdirSync(dir, { recursive: true });
    let html = template
      .replace(/<title>.*?<\/title>/, `<title>${b.title} - Desi Nomad Trails</title>`)
      .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${b.excerpt}" />`)
      .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${SITE_URL}/blog/${b.id}/" />`)
      .replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${b.title} - Desi Nomad Trails" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${b.excerpt}" />`)
      .replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${SITE_URL}/blog/${b.id}/" />`);

    const schema = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${b.title}",
        "description": "${b.excerpt}",
        "author": { "@type": "Person", "name": "${b.author}" },
        "publisher": { "@type": "Organization", "name": "Desi Nomad Trails" },
        "mainEntityOfPage": "${SITE_URL}/blog/${b.id}/"
      }
    </script>
    </head>`;
    html = html.replace('</head>', schema);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`✓ Pre-rendered: /blog/${b.id}/index.html`);
  });

  // 3. Pre-render General Pages
  const general = [
    { id: 'about', title: 'About Us - Desi Nomad Trails', desc: 'Story of Desi Nomad Trails, sustainable high-altitude travel.' },
    { id: 'book', title: 'Book Himalayan Treks - Desi Nomad Trails', desc: 'Secure slots for upcoming expeditions.' },
    { id: 'booking', title: 'Book Himalayan Treks - Desi Nomad Trails', desc: 'Secure slots for upcoming expeditions.' },
    { id: 'faq', title: 'FAQ & Travel Guide - Desi Nomad Trails', desc: 'Packing lists, fitness milestones, AMS advice.' },
    { id: 'contact', title: 'Contact Us - Desi Nomad Trails', desc: 'Get in touch with certified guides.' }
  ];

  general.forEach((g) => {
    const dir = path.join(DIST_DIR, g.id);
    fs.mkdirSync(dir, { recursive: true });
    let html = template
      .replace(/<title>.*?<\/title>/, `<title>${g.title}</title>`)
      .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${g.desc}" />`)
      .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${SITE_URL}/${g.id}/" />`)
      .replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${g.title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${g.desc}" />`)
      .replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${SITE_URL}/${g.id}/" />`);

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`✓ Pre-rendered: /${g.id}/index.html`);
  });

  // 4. Generate dist/robots.txt
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
  console.log('✓ Generated robots.txt');

  // 5. Generate dist/sitemap.xml
  const date = new Date().toISOString().split('T')[0];
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  
  // Home & Static
  sitemap += `  <url><loc>${SITE_URL}/</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n`;
  general.forEach(g => {
    sitemap += `  <url><loc>${SITE_URL}/${g.id}/</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  });
  // Treks
  treks.forEach(t => {
    sitemap += `  <url>\n    <loc>${SITE_URL}/treks/${t.id}/</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n    <image:image>\n      <image:loc>${SITE_URL}/images/${t.file}</image:loc>\n      <image:title>${t.title}</image:title>\n      <image:caption>${t.caption}</image:caption>\n    </image:image>\n  </url>\n`;
  });
  // Blogs
  blogs.forEach(b => {
    sitemap += `  <url><loc>${SITE_URL}/blog/${b.id}/</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
  });

  sitemap += `</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log('✓ Generated sitemap.xml');
}

prerender();
