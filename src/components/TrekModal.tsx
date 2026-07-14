import { useState } from 'react';
import type { Trek } from '../data/treks';
import { X, Calendar, Clock, ArrowUpCircle, Navigation, CheckSquare, Square, CheckCircle2, XCircle, ShieldAlert, Heart } from 'lucide-react';

interface TrekModalProps {
  trek: Trek | null;
  onClose: () => void;
  onBookTrek: (trekId: string) => void;
}

export default function TrekModal({ trek, onClose, onBookTrek }: TrekModalProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'safety' | 'checklist'>('itinerary');
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Local checklist items
  const [checklist, setChecklist] = useState([
    { id: 1, item: 'High-ankle trekking shoes (broken in)', checked: false, category: 'Gear' },
    { id: 2, item: 'Backpack (50L - 60L) with rain cover', checked: false, category: 'Gear' },
    { id: 3, item: 'Waterproof jacket or poncho', checked: false, category: 'Clothing' },
    { id: 4, item: 'Warm fleece & down jacket (suitable for sub-zero temperatures)', checked: false, category: 'Clothing' },
    { id: 5, item: 'Thermal innerwear (top & bottom)', checked: false, category: 'Clothing' },
    { id: 6, item: 'Two insulated water bottles (1 Liter each)', checked: false, category: 'Essentials' },
    { id: 7, item: 'Headlamp or flashlight with extra batteries', checked: false, category: 'Essentials' },
    { id: 8, item: 'Personal first-aid kit & specific medications', checked: false, category: 'Essentials' },
  ]);

  if (!trek) return null;

  const displayImage = activeImage || trek.image;

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

  // Combine cover image and gallery images for the thumbnails list
  const allImages = [trek.image, ...(trek.gallery || [])];

  return (
    <div className="modal-backdrop show" onClick={onClose}>
      <div className="modal-container animate-slide" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header Image Area */}
        <div className="modal-hero-image" style={{ backgroundImage: `url(${displayImage})` }}>
          <div className="modal-hero-overlay" />
          <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
          <div className="modal-hero-content">
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <span className={difficultyBadgeClass(trek.difficulty)}>{trek.difficulty}</span>
              <span className="rating-badge">★ {trek.rating} <span style={{ opacity: 0.8, fontWeight: 'normal', fontSize: '0.8rem', marginLeft: '2px' }}>({trek.reviewCount} reviews)</span></span>
            </div>
            <h2>{trek.name}</h2>
            <p className="modal-summary">{trek.description}</p>

            {/* Trek Image Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="modal-gallery-thumbnails">
                {allImages.map((imgUrl, idx) => (
                  <button 
                    key={idx}
                    className={`thumbnail-btn ${displayImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`View trek photo ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`Trek view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Specs Strip */}
        <div className="modal-specs-strip">
          <div className="spec-tile">
            <ArrowUpCircle size={20} className="spec-icon" />
            <div>
              <span className="spec-title">Max Altitude</span>
              <span className="spec-val">{trek.altitude}</span>
            </div>
          </div>
          <div className="spec-tile">
            <Navigation size={20} className="spec-icon" />
            <div>
              <span className="spec-title">Distance</span>
              <span className="spec-val">{trek.distance}</span>
            </div>
          </div>
          <div className="spec-tile">
            <Clock size={20} className="spec-icon" />
            <div>
              <span className="spec-title">Duration</span>
              <span className="spec-val">{trek.duration} Days</span>
            </div>
          </div>
          <div className="spec-tile">
            <Calendar size={20} className="spec-icon" />
            <div>
              <span className="spec-title">Best Season</span>
              <span className="spec-val">{trek.bestSeason}</span>
            </div>
          </div>
        </div>

        {/* Modal Body Tabs */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
          >
            Detailed Itinerary
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inclusions' ? 'active' : ''}`}
            onClick={() => setActiveTab('inclusions')}
          >
            Inclusions & Exclusions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'safety' ? 'active' : ''}`}
            onClick={() => setActiveTab('safety')}
          >
            Safety & Fitness
          </button>
          <button 
            className={`tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            Preparation Checklist
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="modal-scroll-content">
          {/* Timeline Tab */}
          {activeTab === 'itinerary' && (
            <div className="itinerary-timeline">
              {trek.itinerary.map((day) => (
                <div key={day.day} className="timeline-item">
                  <div className="timeline-number">
                    <span>Day</span>
                    <strong>{day.day}</strong>
                  </div>
                  <div className="timeline-info card">
                    <h4>{day.title}</h4>
                    <p>{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inclusions & Exclusions Tab */}
          {activeTab === 'inclusions' && (
            <div className="inclusions-exclusions-container">
              <div className="inc-exc-grid">
                <div className="inc-exc-column inclusions">
                  <h3><CheckCircle2 size={20} /> What's Included</h3>
                  <div className="inc-exc-list">
                    {trek.inclusions.map((item, idx) => (
                      <div key={idx} className="inc-exc-item">
                        <CheckCircle2 size={16} className="inc-exc-icon" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="inc-exc-column exclusions">
                  <h3><XCircle size={20} /> What's Excluded</h3>
                  <div className="inc-exc-list">
                    {trek.exclusions.map((item, idx) => (
                      <div key={idx} className="inc-exc-item">
                        <XCircle size={16} className="inc-exc-icon" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Safety & Fitness Tab */}
          {activeTab === 'safety' && (
            <div className="safety-fitness-container">
              <div className="safety-card-spec">
                <div className="info-box-premium">
                  <h3><ShieldAlert size={20} /> High Altitude Safety</h3>
                  <p style={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Altitude Sickness (AMS) Risk:</strong>
                    <span className={`badge-ams badge-ams-${trek.safetyFitness.amsRisk.toLowerCase()}`}>
                      {trek.safetyFitness.amsRisk} Risk
                    </span>
                  </p>
                  <p style={{ marginTop: '12px' }}>
                    AMS is a real concern on high altitude climbs. Our team carries medical oxygen cylinders, finger oximeters, and a mountain rescue stretcher. We monitor heart rates and oxygen saturation twice daily.
                  </p>
                </div>
                <div className="info-box-premium">
                  <h3><Heart size={20} /> Fitness Requirements</h3>
                  <p><strong>Required Target:</strong> {trek.safetyFitness.fitnessLevel}</p>
                  {trek.safetyFitness.medicalFormRequired && (
                    <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#1e3a8a', backgroundColor: 'rgba(37,99,235,0.06)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(37,99,235,0.15)' }}>
                      📝 <strong>Medical fitness certificate is mandatory</strong> for this trek. You must send a signed certificate from a registered medical practitioner before commencing.
                    </p>
                  )}
                </div>
              </div>

              {trek.safetyFitness.warnings && (
                <div className="warning-alert-premium">
                  <strong>⚠️ Altitude Safety & Medication Advisor</strong>
                  <p>{trek.safetyFitness.warnings}</p>
                </div>
              )}
            </div>
          )}

          {/* Preparation Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="checklist-container">
              <div className="checklist-intro">
                <p>Prepare properly for high altitudes. Mark items off as you pack them:</p>
              </div>
              <div className="checklist-grid">
                {checklist.map((item) => (
                  <div 
                    key={item.id} 
                    className={`checklist-item card ${item.checked ? 'item-packed' : ''}`}
                    onClick={() => toggleChecklistItem(item.id)}
                  >
                    <div className="checkbox-icon">
                      {item.checked ? (
                        <CheckSquare className="checkbox-checked" size={20} />
                      ) : (
                        <Square className="checkbox-empty" size={20} />
                      )}
                    </div>
                    <div className="checklist-text">
                      <span className="checklist-category-badge">{item.category}</span>
                      <p>{item.item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <span className="modal-price">₹{trek.price.toLocaleString('en-IN')} <small>/ person</small></span>
          <div className="modal-footer-btns">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={() => onBookTrek(trek.id)}>Book This Trek</button>
          </div>
        </div>
      </div>
    </div>
  );
}
