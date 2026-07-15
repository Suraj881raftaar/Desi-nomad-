import type { MouseEvent, FormEvent } from 'react';
import { Compass, Mail, MessageSquare, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (routeId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing! Stay tuned for trek announcements.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="footer" id="contact-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-column brand-col">
          <a href="#home" className="footer-logo" onClick={(e) => handleLinkClick(e, 'home')}>
            <Compass className="logo-icon" />
            <span>Desi Nomad Trails</span>
          </a>
          <p>
            Inspiring mindful, sustainable journeys through the rugged trails and hidden communities of India.
          </p>
          <div className="social-links">
            <a href="https://instagram.com/yourdesinomad" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide-instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="mailto:suraj8881raftaar@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://wa.me/919450551538" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageSquare size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column links-col">
          <h4>Explore</h4>
          <nav className="footer-nav">
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a>
            <a href="#treks" onClick={(e) => handleLinkClick(e, 'treks')}>Upcoming Treks</a>
            <a href="#blog" onClick={(e) => handleLinkClick(e, 'blog')}>Trek Diaries</a>
            <a href="#eco" onClick={(e) => handleLinkClick(e, 'eco')}>Eco Policies</a>
            <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>Photo Gallery</a>
            <a href="#faqs" onClick={(e) => handleLinkClick(e, 'faqs')}>FAQs</a>
          </nav>
        </div>

        {/* Newsletter Column */}
        <div className="footer-column newsletter-col">
          <h4>Stay Updated</h4>
          <p>Subscribe to receive batch announcements, expert packing guides, and seasonal discounts.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              required 
              aria-label="Email for newsletter"
            />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {new Date().getFullYear()} Desi Nomad Trails. All rights reserved.</p>
          <div className="footer-policy-links">
            <a href="#eco" onClick={(e) => handleLinkClick(e, 'eco')}>Responsible Travel Policy</a>
            <span>|</span>
            <a href="#faqs" onClick={(e) => handleLinkClick(e, 'faqs')}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
