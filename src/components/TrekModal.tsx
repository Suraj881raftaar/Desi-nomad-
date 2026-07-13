import { useState } from 'react';
import type { Trek } from '../data/treks';
import { X, Calendar, Clock, ArrowUpCircle, Navigation, CheckSquare, Square } from 'lucide-react';

interface TrekModalProps {
  trek: Trek | null;
  onClose: () => void;
  onBookTrek: (trekId: string) => void;
}

export default function TrekModal({ trek, onClose, onBookTrek }: TrekModalProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'checklist'>('itinerary');
  
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

  return (
    <div className="modal-backdrop show">
      <div className="modal-container animate-slide">
        {/* Modal Header Image Area */}
        <div className="modal-hero-image" style={{ backgroundImage: `url(${trek.image})` }}>
          <div className="modal-hero-overlay" />
          <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
          <div className="modal-hero-content">
            <span className={difficultyBadgeClass(trek.difficulty)}>{trek.difficulty}</span>
            <h2>{trek.name}</h2>
            <p className="modal-summary">{trek.description}</p>
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
            className={`tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            Preparation Checklist
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="modal-scroll-content">
          {activeTab === 'itinerary' ? (
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
          ) : (
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
