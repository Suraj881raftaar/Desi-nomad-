import { Clock, ArrowRight, X, User } from 'lucide-react';
import { SITE_URL } from '../config';
import { blogsData } from '../data/blogs';
import type { BlogArticle } from '../data/blogs';

interface BlogProps {
  selectedArticle: BlogArticle | null;
  onSelectArticle: (article: BlogArticle | null) => void;
}

export default function Blog({ selectedArticle, onSelectArticle }: BlogProps) {
  // Find related posts objects if selectedArticle exists
  const relatedPosts = selectedArticle
    ? blogsData.filter((post) => selectedArticle.relatedPostIds.includes(post.id))
    : [];

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
            onClick={() => onSelectArticle(post)}
            style={{ cursor: 'pointer' }}
          >
            <div className="blog-card-image-wrapper">
              <img 
                src={post.image} 
                alt={`${post.title} blog cover`} 
                title={post.title} 
                className="blog-card-image" 
                loading="lazy" 
                decoding="async" 
              />
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
              <button 
                className="blog-read-more btn-text" 
                onClick={(e) => { e.stopPropagation(); onSelectArticle(post); }}
                aria-label={`Read entire article: ${post.title}`}
              >
                Read Article
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Blog Article Reader Modal */}
      {selectedArticle && (
        <div className="modal-backdrop show" onClick={() => onSelectArticle(null)} role="dialog" aria-modal="true" aria-labelledby="blog-modal-title">
          
          {/* Dynamic JSON-LD Article Schema for Google Discover and Google Rich Snippets */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${SITE_URL}/blog/${selectedArticle.id}`
              },
              "headline": selectedArticle.title,
              "description": selectedArticle.excerpt,
              "image": selectedArticle.image,
              "datePublished": "2026-07-10T08:00:00+05:30",
              "dateModified": "2026-07-14T12:00:00+05:30",
              "author": {
                "@type": "Person",
                "name": selectedArticle.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "Desi Nomad Trails",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${SITE_URL}/favicon.svg`
                }
              }
            })}
          </script>

          <div className="modal-container blog-reader-container animate-slide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hero-image" style={{ backgroundImage: `url(${selectedArticle.image})`, height: '260px' }}>
              <div className="modal-hero-overlay" />
              
              {/* Hidden image tag for search indexation */}
              <img src={selectedArticle.image} alt={selectedArticle.title} style={{ display: 'none' }} decoding="async" />
              
              <button className="modal-close-icon" onClick={() => onSelectArticle(null)} aria-label="Close reader">
                <X size={24} />
              </button>
              <div className="modal-hero-content">
                <span className="badge badge-easy" style={{ backgroundColor: 'var(--accent)', color: 'var(--text-light)', marginBottom: '8px' }}>
                  {selectedArticle.category}
                </span>
                <h2 id="blog-modal-title" style={{ fontSize: '1.4rem', lineHeight: '1.3' }}>{selectedArticle.title}</h2>
                <div className="blog-meta" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 0, marginTop: '8px', fontSize: '0.85rem' }}>
                  <span className="blog-meta-item">
                    <User size={12} />
                    By {selectedArticle.author}
                  </span>
                  <span>•</span>
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
              {/* Paragraphs */}
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index} className="blog-paragraph" style={{ marginBottom: '16px', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {paragraph}
                </p>
              ))}

              {/* Tags */}
              <div className="blog-tags-container" style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>Tags: </strong>
                {selectedArticle.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    style={{ 
                      display: 'inline-block', 
                      backgroundColor: 'rgba(34, 197, 94, 0.08)', 
                      color: 'var(--primary-medium)', 
                      fontSize: '0.75rem', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      marginRight: '8px',
                      fontWeight: 500,
                      border: '1px solid rgba(34, 197, 94, 0.15)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Related Articles Section */}
              {relatedPosts.length > 0 && (
                <div className="related-articles-section" style={{ marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-dark)' }}>Related Trekking Guides</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                    {relatedPosts.map((post) => (
                      <div 
                        key={post.id} 
                        onClick={() => onSelectArticle(post)}
                        style={{ 
                          display: 'flex', 
                          gap: '12px', 
                          cursor: 'pointer', 
                          backgroundColor: 'var(--bg-card)', 
                          padding: '12px', 
                          borderRadius: '8px', 
                          border: '1px solid var(--border-color)',
                          alignItems: 'center'
                        }}
                      >
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} 
                        />
                        <div>
                          <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>{post.title}</h5>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Desi Nomad Trails sustainable publishing code</span>
              <button className="btn btn-primary btn-sm" onClick={() => onSelectArticle(null)}>
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
