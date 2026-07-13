import { Compass, Calendar } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content animate-slide">
        <div className="hero-badge">
          <Compass size={16} />
          <span>India's Premium Adventure Club</span>
        </div>
        <h1 className="hero-title">
          Explore the Trails Less Trekking
        </h1>
        <p className="hero-subtitle">
          Discover India's hidden landscapes, challenge your limits, and join a mindful community of explorers dedicated to sustainable travel.
        </p>
        <div className="hero-actions">
          <button onClick={onExploreClick} className="btn btn-primary btn-lg">
            Start Exploring
          </button>
          <a href="#book" className="btn btn-secondary btn-lg">
            <Calendar size={18} />
            Book a Trek
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Wild Trails</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Happy Nomads</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Eco Friendly</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="mouse">
          <div className="wheel" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
