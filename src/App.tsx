import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TrekFinder from './components/TrekFinder';
import TrekModal from './components/TrekModal';
import Blog from './components/Blog';
import EcoPledge from './components/EcoPledge';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import type { Trek } from './data/treks';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);
  const [bookingTrekId, setBookingTrekId] = useState('');

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
        <Blog />
        <EcoPledge />
        <Gallery />
        <BookingForm preselectedTrekId={bookingTrekId} />
        <FAQ />
      </main>

      <Footer />

      {/* Detailed Itinerary Modal */}
      {selectedTrek && (
        <TrekModal
          trek={selectedTrek}
          onClose={() => setSelectedTrek(null)}
          onBookTrek={handleBookTrek}
        />
      )}
    </div>
  );
}
