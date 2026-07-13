import { Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'What I Packed for My First Himalayan Trek',
    excerpt: 'Packing for the mountains can be overwhelming. Here is our essential gear list, including layering secrets, footwear advice, and must-have toiletries.',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
    category: 'Gear Guide',
    readTime: '6 min read',
    date: 'July 10, 2026'
  },
  {
    id: 2,
    title: 'How to Respect Local Cultures on the Trail',
    excerpt: 'Trekking is as much about people as it is about peaks. Learn how to interact ethically with mountain villages, respect local traditions, and share experiences mindfully.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    category: 'Ethical Travel',
    readTime: '4 min read',
    date: 'June 28, 2026'
  },
  {
    id: 3,
    title: "Eco-Trekker's Pledge: Leave No Trace",
    excerpt: 'The Himalayas face a critical waste crisis. Find out how we practice zero-waste trekking, from packing reusable containers to properly disposing of organic waste.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    category: 'Eco Trails',
    readTime: '5 min read',
    date: 'May 15, 2026'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="section blog-section">
      <div className="section-title">
        <h2>Trek Diaries & Blog</h2>
        <p>Get preparation tips, safety guides, and inspiring stories from the Himalayan trails.</p>
      </div>

      <div className="grid-3 blog-grid">
        {blogPosts.map((post) => (
          <article key={post.id} className="card blog-card animate-fade">
            <div className="blog-card-image-wrapper">
              <img src={post.image} alt={post.title} className="blog-card-image" />
              <span className="blog-card-category">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-meta">
                <span className="blog-meta-item">
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <a href="#blog" className="blog-read-more" onClick={(e) => e.preventDefault()}>
                Read Article
                <ArrowRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
