import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TrekFinder from './components/TrekFinder';
import TrekModal from './components/TrekModal';
import Footer from './components/Footer';
import type { Trek } from './data/treks';

// Lazy loading heavy components for Core Web Vitals performance optimization (LCP, FID, CLS reduction)
const Blog = lazy(() => import('./components/Blog'));
const EcoPledge = lazy(() => import('./components/EcoPledge'));
const Gallery = lazy(() => import('./components/Gallery'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const FAQ = lazy(() => import('./components/FAQ'));

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);
  const [bookingTrekId, setBookingTrekId] = useState('');

  // Dynamic page title & description tag update based on selected trek for runtime SEO indexation
  useEffect(() => {
    if (selectedTrek) {
      document.title = `${selectedTrek.name} Package (Altitude: ${selectedTrek.altitude}) - Desi Nomad`;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', `Join the ${selectedTrek.name} in ${selectedTrek.region}. Duration: ${selectedTrek.duration} Days. Highlights: ${selectedTrek.highlights}. Book with Desi Nomad.`);
      }
    } else {
      document.title = 'Desi Nomad – High Altitude Trekking in India & Guided Mountain Expeditions';
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', 'Embark on the best Himalayan & Western Ghats treks with Desi Nomad. Fully guided budget trekking packages with NIM/HMI certified trek leaders, safety first approach, and eco-friendly camping.');
      }
    }
  }, [selectedTrek]);

  // Scrollspy: track active section based on viewport scroll position
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for nav header

      sections.forEach((section) => {
        const el = section as HTMLElement;
        const sectionTop = el.offsetTop;
        const sectionHeight = el.offsetHeight;
        const sectionId = el.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = () => {
    const element = document.getElementById('treks');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleBookTrek = (trekId: string) => {
    setSelectedTrek(null); // close modal if open
    setBookingTrekId(trekId); // set active preselected trek
    
    // Smooth scroll to booking section
    setTimeout(() => {
      const element = document.getElementById('book');
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <div className="app-container">
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero onExploreClick={handleExploreClick} />
        <About />
        <TrekFinder onSelectTrek={setSelectedTrek} onBookTrek={handleBookTrek} />
        
        {/* Suspense Wrapper with lightweight layout loaders to reduce initial chunk size */}
        <Suspense fallback={
          <div className="loading-spinner-placeholder" style={{ padding: '80px 20px', textAlign: 'center', color: '#22c55e', fontSize: '1.1rem', fontWeight: 500 }}>
            <span>Gathering Camp Supplies...</span>
          </div>
        }>
          <Blog />
          <EcoPledge />
          <Gallery />
          <BookingForm preselectedTrekId={bookingTrekId} />
          <FAQ />
        </Suspense>
      </main>

      <Footer />

      {/* Detailed Itinerary Modal */}
      {selectedTrek && (
        <TrekModal
          key={selectedTrek.id}
          trek={selectedTrek}
          onClose={() => setSelectedTrek(null)}
          onBookTrek={handleBookTrek}
        />
      )}

      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/919450551538"
        className="whatsapp-float animate-bounce-subtle"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.908 1.482 5.35 0 9.703-4.326 9.707-9.642.002-2.574-1.002-4.995-2.83-6.824-1.828-1.83-4.26-2.835-6.837-2.836-5.352 0-9.704 4.327-9.709 9.643-.001 1.728.469 3.414 1.36 4.934l-.974 3.555 3.655-.959zm11.758-5.321c-.3-.15-1.77-.874-2.045-.974-.275-.1-.475-.15-.675.15-.2.3-.775.974-.95 1.174-.175.2-.35.225-.65.075-1.025-.5-1.925-.925-2.675-1.575-.575-.5-1.025-1.1-1.15-1.3-.125-.2-.013-.3.088-.4.09-.09.2-.225.3-.325.1-.1.125-.175.188-.3.063-.125.031-.24-.013-.34-.044-.1-.4-.964-.55-1.325-.144-.35-.29-.3-.4-.3-.1-.005-.225-.005-.35-.005-.125 0-.325.045-.495.225-.17.18-1.15 1.124-1.15 2.735s1.17 3.167 1.33 3.393c.16.225 2.3 3.512 5.57 4.92.78.336 1.39.537 1.86.686.78.248 1.49.213 2.05.13.62-.093 1.77-.723 2.02-1.417.25-.694.25-1.288.175-1.416-.075-.128-.275-.203-.575-.353z" />
        </svg>
      </a>
    </div>
  );
}
