import { useState, useEffect } from 'react';
import type { Trek } from '../data/treks';
import { treksData } from '../data/treks';
import { Calendar, Clock, ArrowUpCircle, Navigation, CheckSquare, Square, CheckCircle2, XCircle, MessageSquare, Star, Thermometer, ChevronRight, Map } from 'lucide-react';

interface TrekDetailPageProps {
  trek: Trek;
  onBack: () => void;
  onBookTrek: (trekId: string) => void;
}

export default function TrekDetailPage({ trek, onBack, onBookTrek }: TrekDetailPageProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'safety' | 'checklist'>('itinerary');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Scroll to top on mount or when trek changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(null);
    setOpenFaqIndex(null);
  }, [trek]);

  // Checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, item: 'High-ankle trekking shoes (broken in)', checked: false, category: 'Gear' },
    { id: 2, item: 'Backpack (50L - 60L) with rain cover', checked: false, category: 'Gear' },
    { id: 3, item: 'Waterproof jacket or poncho', checked: false, category: 'Clothing' },
    { id: 4, item: 'Warm fleece & down jacket', checked: false, category: 'Clothing' },
    { id: 5, item: 'Thermal innerwear (top & bottom)', checked: false, category: 'Clothing' },
    { id: 6, item: 'Two insulated water bottles (1L each)', checked: false, category: 'Essentials' },
    { id: 7, item: 'Headlamp or flashlight with extra batteries', checked: false, category: 'Essentials' },
    { id: 8, item: 'Personal first-aid kit & medications', checked: false, category: 'Essentials' },
  ]);

  const toggleChecklistItem = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const difficultyBadgeClass = (level: string) => {
    if (level === 'Easy') return 'badge badge-easy';
    if (level === 'Moderate') return 'badge badge-moderate';
    return 'badge badge-demanding';
  };

  const displayImage = activeImage || trek.image;
  const allImages = [trek.image, ...(trek.gallery || [])];

  // Find related treks (same region, or difficulty, excluding current)
  const relatedTreks = treksData
    .filter((t) => t.id !== trek.id && (t.region === trek.region || t.difficulty === trek.difficulty))
    .slice(0, 2);

  // Navigate to another trek page inside details
  const handleSelectRelatedTrek = (relatedTrek: Trek) => {
    window.history.pushState(null, '', `${import.meta.env.BASE_URL || '/'}treks/${relatedTrek.id}`);
    // Dispatch popstate event to trigger route update in App.tsx
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Dynamic FAQs
  const faqs = [
    {
      q: `How difficult is the ${trek.name} and what fitness is required?`,
      a: `The trek is graded as ${trek.difficulty}. It requires a solid level of physical conditioning. Trekkers are expected to meet this standard: ${trek.safetyFitness.fitnessLevel}`
    },
    {
      q: `What are the altitude sickness (AMS) risks on the ${trek.name}?`,
      a: `This trek reaches a maximum altitude of ${trek.altitude}, which carries a ${trek.safetyFitness.amsRisk} risk of Acute Mountain Sickness (AMS). Desi Nomad guides carry oxygen cylinders, pulse oximeters, and first-aid kits. Trekkers must stay hydrated and climb at a slow, steady pace.`
    },
    {
      q: `What is the best season to plan the ${trek.name}?`,
      a: `The optimal time for this adventure is during ${trek.bestSeason}. During this season, temperatures typically hover around ${trek.temperature}. Make sure to bring appropriate clothing layers.`
    }
  ];

  return (
    <article className="trek-detail-page-wrapper">
      {/* Breadcrumbs Navigation */}
      <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
        <div className="breadcrumbs-container">
          <button onClick={onBack} className="breadcrumb-link-btn">Home</button>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-link-btn">Treks</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current" aria-current="page">{trek.name}</span>
        </div>
      </nav>

      {/* Hero Banner Header */}
      <header className="trek-page-hero" style={{ backgroundImage: `url(${displayImage})` }}>
        <div className="trek-page-hero-overlay" />
        <div className="trek-page-hero-container">
          <div className="trek-hero-meta-row">
            <span className={difficultyBadgeClass(trek.difficulty)}>{trek.difficulty}</span>
            <div className="rating-badge">
              <Star size={14} fill="currentColor" />
              <span>{trek.rating}</span>
              <span className="reviews-count-label">({trek.reviewCount} reviews)</span>
            </div>
          </div>
          <h1>{trek.name}</h1>
          <p className="trek-hero-summary">{trek.description}</p>
        </div>
      </header>

      {/* Specifications Ribbon */}
      <section className="trek-specs-ribbon-wrapper" aria-label="Trek specifications">
        <div className="specs-ribbon-container">
          <div className="spec-item-box">
            <ArrowUpCircle size={20} className="spec-icon" />
            <div>
              <span className="spec-item-title">Max Altitude</span>
              <span className="spec-item-val">{trek.altitude}</span>
            </div>
          </div>
          <div className="spec-item-box">
            <Navigation size={20} className="spec-icon" />
            <div>
              <span className="spec-item-title">Distance</span>
              <span className="spec-item-val">{trek.distance}</span>
            </div>
          </div>
          <div className="spec-item-box">
            <Clock size={20} className="spec-icon" />
            <div>
              <span className="spec-item-title">Duration</span>
              <span className="spec-item-val">{trek.duration} Days</span>
            </div>
          </div>
          <div className="spec-item-box">
            <Calendar size={20} className="spec-icon" />
            <div>
              <span className="spec-item-title">Best Season</span>
              <span className="spec-item-val">{trek.bestSeason}</span>
            </div>
          </div>
          <div className="spec-item-box">
            <Thermometer size={20} className="spec-icon" />
            <div>
              <span className="spec-item-title">Temperature</span>
              <span className="spec-item-val">{trek.temperature}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Selector */}
      <section className="trek-gallery-strip-wrapper" aria-label="Photo Gallery">
        <div className="gallery-strip-container">
          <h2 className="gallery-strip-title">Interactive Photo Gallery</h2>
          <div className="gallery-thumbnails-grid">
            {allImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`gallery-thumb-btn ${displayImage === imgUrl ? 'active' : ''}`}
                aria-label={`View trek photo ${idx + 1}`}
              >
                <img 
                  src={imgUrl} 
                  alt={`${trek.name} panorama view ${idx + 1}`} 
                  loading="lazy" 
                  decoding="async" 
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="trek-page-columns-layout">
        {/* Left Column - Detailed Content Guides */}
        <main className="trek-page-main-column">
          {/* Section 1: Overview */}
          <section className="trek-section-card card" id="overview-section">
            <h2>About the Trek</h2>
            <p className="trek-long-description">{trek.description}</p>
            
            {/* Route Map Guide Box */}
            <div className="route-map-box">
              <div className="route-map-header">
                <Map size={18} />
                <h3>Planned Trekking Route Path</h3>
              </div>
              <p className="route-map-details">
                <strong>Base camp to summit checkpoints:</strong> {trek.itinerary.map(d => d.title.split(' to ').pop()).join(' → ')}
              </p>
            </div>
          </section>

          {/* Section 2: Detailed Tabs (Itinerary, Inclusions, Safety, Checklist) */}
          <section className="trek-tabs-navigation-card card">
            <div className="trek-page-tabs-bar" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'itinerary'}
                className={`trek-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Day Itinerary
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'inclusions'}
                className={`trek-tab-btn ${activeTab === 'inclusions' ? 'active' : ''}`}
                onClick={() => setActiveTab('inclusions')}
              >
                Inclusions
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'safety'}
                className={`trek-tab-btn ${activeTab === 'safety' ? 'active' : ''}`}
                onClick={() => setActiveTab('safety')}
              >
                Safety & Fitness
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'checklist'}
                className={`trek-tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
                onClick={() => setActiveTab('checklist')}
              >
                Packing List
              </button>
            </div>

            <div className="trek-tab-panels-content">
              {/* Day Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="itinerary-timeline-vertical">
                  {trek.itinerary.map((day) => (
                    <div key={day.day} className="timeline-day-item">
                      <div className="timeline-day-header">
                        <span className="day-label-tag">Day {day.day}</span>
                        <h4>{day.title}</h4>
                      </div>
                      <p className="day-desc-text">{day.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Inclusions & Exclusions */}
              {activeTab === 'inclusions' && (
                <div className="inclusions-exclusions-grid">
                  <div className="inc-column">
                    <h4>What is Covered</h4>
                    <ul className="covered-list">
                      {trek.inclusions.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} className="checked-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="exc-column">
                    <h4>What is Excluded</h4>
                    <ul className="excluded-list">
                      {trek.exclusions.map((item, idx) => (
                        <li key={idx}>
                          <XCircle size={16} className="crossed-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Safety & Fitness */}
              {activeTab === 'safety' && (
                <div className="safety-fitness-panel">
                  <div className="safety-specs-grid">
                    <div className="spec-card">
                      <h5>Altitude Sickness (AMS) Risk</h5>
                      <span className={`badge-ams badge-ams-${trek.safetyFitness.amsRisk.toLowerCase()}`}>
                        {trek.safetyFitness.amsRisk} Risk
                      </span>
                      <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-medium)' }}>
                        AMS can occur at high altitudes. Desi Nomad carries first-aid medicines, medical oxygen, and finger oximeters to ensure daily checkups.
                      </p>
                    </div>
                    <div className="spec-card">
                      <h5>Physical Training Milestone</h5>
                      <p style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                        {trek.safetyFitness.fitnessLevel}
                      </p>
                      {trek.safetyFitness.medicalFormRequired && (
                        <p className="medical-certificate-notice">
                          📝 <strong>Medical Certificate Required:</strong> A physician-signed certificate of physical fitness is mandatory for this trek.
                        </p>
                      )}
                    </div>
                  </div>

                  {trek.safetyFitness.warnings && (
                    <div className="safety-warning-callout">
                      <strong>⚠️ Altitude Precaution</strong>
                      <p>{trek.safetyFitness.warnings}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Packing List Checklist */}
              {activeTab === 'checklist' && (
                <div className="checklist-interactive-wrapper">
                  <p className="checklist-intro-text">Tick off essential gear items as you pack them for your trek:</p>
                  <div className="checklist-items-grid">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`checklist-item-card ${item.checked ? 'packed' : ''}`}
                      >
                        {item.checked ? <CheckSquare className="checkbox-active" size={18} /> : <Square className="checkbox-inactive" size={18} />}
                        <div className="checklist-item-details">
                          <span className="checklist-item-badge">{item.category}</span>
                          <span className="checklist-item-name">{item.item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 3: Extra SEO Content Guides */}
          <section className="trek-section-card card">
            <h2>Trek Travel & Logistics Guide</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
              <div>
                <h4 style={{ color: 'var(--primary-medium)', fontWeight: 600, fontSize: '1rem', marginBottom: '6px' }}>📅 Best Time to Plan a Visit</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>{trek.bestTimeToVisit}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--primary-medium)', fontWeight: 600, fontSize: '1rem', marginBottom: '6px' }}>🚗 Transport & How to Reach the Base</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>{trek.howToReach}</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--primary-medium)', fontWeight: 600, fontSize: '1rem', marginBottom: '6px' }}>🏞️ Local & Nearby Attractions</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>{trek.nearbyAttractions}</p>
              </div>
            </div>
          </section>

          {/* Section 4: Dynamic FAQs Accordion */}
          <section className="trek-section-card card" id="faqs-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faqs-accordion-list" style={{ marginTop: '16px' }}>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-accordion-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-dark)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <span>{faq.q}</span>
                    <span>{openFaqIndex === index ? '−' : '+'}</span>
                  </button>
                  {openFaqIndex === index && (
                    <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Reviews */}
          <section className="trek-section-card card" id="reviews-section">
            <h2>Traveler Reviews</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-dark)' }}>{trek.rating}</div>
              <div>
                <div style={{ display: 'flex', color: '#ffc107' }}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Based on {trek.reviewCount} customer reviews</div>
              </div>
            </div>
            <div className="reviews-list" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="review-card" style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <strong>Aniket Verma</strong>
                  <span>September 2026</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', margin: 0, lineHeight: 1.4 }}>
                  "Had a mindblowing experience on the {trek.name}. The guides from Desi Nomad were extremely caring, professional, and kept our safety as the highest priority during the high-altitude crossover. Highly recommended!"
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Related Treks (Internal Links) */}
          <section className="trek-section-card card" id="related-section">
            <h2>Related Trekking Routes</h2>
            <div className="related-treks-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginTop: '16px' }}>
              {relatedTreks.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => handleSelectRelatedTrek(t)}
                  style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    cursor: 'pointer', 
                    backgroundColor: 'var(--bg-card)', 
                    padding: '16px', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border-color)',
                    alignItems: 'center'
                  }}
                  className="related-trek-item card"
                >
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', margin: '0 0 4px 0' }}>{t.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.region} • {t.duration} Days</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Right Column - Sidebar Booking Widget */}
        <aside className="trek-page-sidebar-column">
          <div className="sticky-booking-widget card">
            <div className="booking-widget-header">
              <span className="price-label">Price from</span>
              <h3 className="price-amount-large">₹{trek.price.toLocaleString('en-IN')}</h3>
              <span className="price-inclusive-label">all inclusive</span>
            </div>
            
            <p className="widget-highlights">Includes expert guides, medical setup, meals, homestays, and campsite equipment.</p>
            
            <div className="widget-actions">
              <button onClick={() => onBookTrek(trek.id)} className="btn btn-primary w-full">
                Book This Trek
              </button>
              <a
                href={`https://wa.me/919450551538?text=Hi%20Desi%20Nomad,%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(trek.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <MessageSquare size={16} />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Sticky Mobile Actions Bar */}
      <footer className="mobile-sticky-action-bar">
        <div className="sticky-bar-left">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 500 }}>Price per head</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 700 }}>₹{trek.price.toLocaleString('en-IN')}</strong>
          </div>
        </div>
        <div className="sticky-bar-right">
          <a
            href={`https://wa.me/919450551538?text=Hi%20Desi%20Nomad,%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(trek.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="sticky-whatsapp-btn"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare size={20} />
          </a>
          <button onClick={() => onBookTrek(trek.id)} className="sticky-book-btn">
            Book Now
          </button>
        </div>
      </footer>
    </article>
  );
}
