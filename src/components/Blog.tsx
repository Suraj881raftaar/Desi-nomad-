import { useState } from 'react';
import { blogsData } from '../data/blogs';
import type { BlogArticle } from '../data/blogs';
import { Clock, ArrowRight, X } from 'lucide-react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section id="blog" className="section blog-section">
      <div className="section-title">
        <h2>Trek Diaries & Blog</h2>
        <p>Get preparation tips, safety guides, and inspiring stories from the Himalayan trails.</p>
      </div>

      <div className="grid-3 blog-grid">
        {blogsData.map((post) => (
          <article 
            key={post.id} 
            className="card blog-card animate-fade"
            onClick={() => setSelectedArticle(post)}
            style={{ cursor: 'pointer' }}
          >
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
              <button className="blog-read-more btn-text" onClick={(e) => { e.stopPropagation(); setSelectedArticle(post); }}>
                Read Article
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Blog Article Reader Modal */}
      {selectedArticle && (
        <div className="modal-backdrop show" onClick={() => setSelectedArticle(null)}>
          <div className="modal-container blog-reader-container animate-slide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hero-image" style={{ backgroundImage: `url(${selectedArticle.image})`, height: '220px' }}>
              <div className="modal-hero-overlay" />
              <button className="modal-close-icon" onClick={() => setSelectedArticle(null)} aria-label="Close reader">
                <X size={24} />
              </button>
              <div className="modal-hero-content">
                <span className="badge badge-easy" style={{ backgroundColor: 'var(--accent)', color: 'var(--text-light)' }}>
                  {selectedArticle.category}
                </span>
                <h2>{selectedArticle.title}</h2>
                <div className="blog-meta" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 0 }}>
                  <span className="blog-meta-item">
                    <Clock size={12} />
                    {selectedArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>Published {selectedArticle.date}</span>
                </div>
              </div>
            </div>

            <div className="modal-scroll-content blog-reader-content">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index} className="blog-paragraph">{paragraph}</p>
              ))}
            </div>

            <div className="modal-footer">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Desi Nomad sustainable publishing code</span>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedArticle(null)}>
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
