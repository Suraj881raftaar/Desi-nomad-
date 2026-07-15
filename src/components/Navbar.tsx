import { useState, useEffect } from 'react';
import { Compass, Menu, X, User, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (routeId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { currentUser } = useApp();
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
    onNavigate(id);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
          <Compass className="logo-icon" />
          <span>Desi Nomad Trails</span>
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
          
          {currentUser ? (
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 h-9 px-3.5 bg-slate-100 hover:bg-slate-200 text-[#0a251c] font-bold rounded-xl text-xs transition-all border-none cursor-pointer ${activeSection === 'dashboard' ? 'bg-[#0a251c] text-white' : ''}`}
            >
              <User size={13} />
              {currentUser.name.split(' ')[0]}
            </button>
          ) : (
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
              className="flex items-center gap-1.5 h-9 px-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-all bg-transparent cursor-pointer"
            >
              <LogIn size={13} />
              Login
            </button>
          )}
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
            <span>Desi Nomad Trails</span>
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
          
          {currentUser ? (
            <button 
              onClick={() => { setIsOpen(false); onNavigate('dashboard'); }}
              className="mobile-nav-link text-[#e28743] font-bold flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 bg-transparent text-left w-full cursor-pointer"
            >
              <User size={16} />
              My Profile ({currentUser.name})
            </button>
          ) : (
            <button 
              onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('open-auth-modal')); }}
              className="mobile-nav-link text-slate-600 font-bold flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 bg-transparent text-left w-full cursor-pointer"
            >
              <LogIn size={16} />
              Login / Register
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
