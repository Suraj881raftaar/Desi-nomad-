import { ShieldCheck, Heart, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-title">
        <h2>About Desi Nomad Trails</h2>
        <p>A club for mindful travelers exploring the remote ridges of India.</p>
      </div>

      <div className="grid-2 about-hero-row">
        <div className="about-text-content">
          <h3>Our Story</h3>
          <p>
            Desi Nomad Trails began as a personal adventure diary in the high valleys of Himachal. Over years of climbing peaks and living alongside mountain communities, it grew into a thriving travel club for explorers who seek paths less traveled. 
          </p>
          <p>
            We believe that travel should be transformative, slow, and respectful. We don't just guide groups; we build friendships, support local eco-groups, and protect the fragile alpine environments of India.
          </p>
          <div className="about-mission">
            <h3>Our Mission</h3>
            <ul className="mission-list">
              <li><strong>Eco-Centric Travel:</strong> Minimizing trail footprint and running waste-cleanup campaigns.</li>
              <li><strong>Cultural Integrity:</strong> Supporting village communities directly by choosing local homestays and guides.</li>
              <li><strong>Technical Safety:</strong> Delivering high-altitude expeditions led by certified mountaineers.</li>
            </ul>
          </div>
        </div>
        <div className="about-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80" 
            alt="Hikers walking on a mountain ridge" 
            className="about-image card"
          />
        </div>
      </div>

      {/* Core Values grid */}
      <div className="grid-3 values-grid">
        <div className="card value-card">
          <div className="value-icon-wrapper">
            <Award className="value-icon" />
          </div>
          <h4>Certified Guidance</h4>
          <p>All expeditions are led by seasoned guides certified by national mountaineering institutes, carrying oxygen canisters, satellite communication systems, and advanced wilderness medical kits.</p>
        </div>
        <div className="card value-card">
          <div className="value-icon-wrapper">
            <Heart className="value-icon" />
          </div>
          <h4>Community-Focused</h4>
          <p>We work closely with remote villages in Himachal, Uttarakhand, and Sikkim, ensuring our visits directly support their economies by utilizing local homestays, porters, and kitchens.</p>
        </div>
        <div className="card value-card">
          <div className="value-icon-wrapper">
            <ShieldCheck className="value-icon" />
          </div>
          <h4>Zero Waste Pledge</h4>
          <p>We actively combat trail pollution. Every trekker is given an eco-bag to pack out all waste, and our teams routinely conduct mountain clean-up drives to leave trails cleaner than we found them.</p>
        </div>
      </div>
    </section>
  );
}
