import { useState, useMemo } from 'react';
import { treksData } from '../data/treks';
import type { Trek } from '../data/treks';
import { Search, MapPin, Clock } from 'lucide-react';

interface TrekFinderProps {
  onSelectTrek: (trek: Trek) => void;
  onBookTrek: (trekId: string) => void;
}

export default function TrekFinder({ onSelectTrek, onBookTrek }: TrekFinderProps) {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [duration, setDuration] = useState('All');

  const filteredTreks = useMemo(() => {
    return treksData.filter((trek) => {
      const matchesSearch = trek.name.toLowerCase().includes(search.toLowerCase()) || 
                            trek.highlights.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === 'All' || trek.region === region;
      const matchesDifficulty = difficulty === 'All' || trek.difficulty === difficulty;
      
      let matchesDuration = true;
      if (duration !== 'All') {
        if (duration === 'short') matchesDuration = trek.duration <= 3;
        else if (duration === 'medium') matchesDuration = trek.duration > 3 && trek.duration <= 5;
        else if (duration === 'long') matchesDuration = trek.duration >= 6;
      }

      return matchesSearch && matchesRegion && matchesDifficulty && matchesDuration;
    });
  }, [search, region, difficulty, duration]);

  const difficultyBadgeClass = (level: string) => {
    if (level === 'Easy') return 'badge badge-easy';
    if (level === 'Moderate') return 'badge badge-moderate';
    return 'badge badge-demanding';
  };

  return (
    <section id="treks" className="section treks-section">
      <div className="section-title">
        <h2>Upcoming Treks</h2>
        <p>Find your next great adventure. Filter by region, duration, or difficulty.</p>
      </div>

      {/* Filter Controls Panel */}
      <div className="filter-panel card">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search treks, highlights..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-dropdowns">
          <div className="filter-group">
            <label>Region</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="All">All Regions</option>
              <option value="Himachal">Himachal</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Sikkim">Sikkim</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Demanding">Demanding</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Duration</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="All">All Durations</option>
              <option value="short">Short (1-3 Days)</option>
              <option value="medium">Medium (4-5 Days)</option>
              <option value="long">Long (6+ Days)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Treks Card Grid */}
      {filteredTreks.length > 0 ? (
        <div className="grid-3 trek-grid">
          {filteredTreks.map((trek) => (
            <div key={trek.id} className="card trek-card animate-fade">
              <div className="trek-card-image-wrapper">
                <img src={trek.image} alt={trek.name} className="trek-card-image" />
                <span className={difficultyBadgeClass(trek.difficulty)}>{trek.difficulty}</span>
              </div>
              <div className="trek-card-content">
                <div className="trek-meta">
                  <span className="trek-meta-item">
                    <MapPin size={14} />
                    {trek.region}
                  </span>
                  <span className="trek-meta-item">
                    <Clock size={14} />
                    {trek.duration} Days
                  </span>
                </div>
                <h3 className="trek-card-title">{trek.name}</h3>
                <p className="trek-card-highlights">{trek.highlights}</p>
                <div className="trek-price-row">
                  <div>
                    <span className="price-label">Price from</span>
                    <span className="price-amount">₹{trek.price.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="tax-label">all inclusive</span>
                </div>
                <div className="trek-card-actions">
                  <button onClick={() => onSelectTrek(trek)} className="btn btn-secondary btn-sm">
                    View Details
                  </button>
                  <button onClick={() => onBookTrek(trek.id)} className="btn btn-primary btn-sm">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results card">
          <p>No treks match your search criteria. Try adjusting your filters!</p>
          <button
            onClick={() => {
              setSearch('');
              setRegion('All');
              setDifficulty('All');
              setDuration('All');
            }}
            className="btn btn-secondary"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
