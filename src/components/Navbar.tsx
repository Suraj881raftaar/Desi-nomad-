import { useState, useEffect } from 'react';
import { Compass, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'treks', label: 'Treks' },
    { id: 'blog', label: 'Diaries' },
    { id: 'eco', label: 'Eco Trails' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'book', label: 'Book Now' },
    { id: 'faqs', label: 'FAQs' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
          <Compass className="logo-icon" />
          <span>Desi Nomad</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'active' : ''} ${link.id === 'book' ? 'nav-link-cta' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`mobile-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)} />

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${isOpen ? 'show' : ''}`}>
        <div className="drawer-header">
          <div className="logo">
            <Compass className="logo-icon" />
            <span>Desi Nomad</span>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''} ${link.id === 'book' ? 'mobile-nav-link-cta' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
