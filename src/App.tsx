import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import { SITE_URL } from './config';
import Hero from './components/Hero';
import About from './components/About';
import TrekFinder from './components/TrekFinder';
import TrekDetailPage from './components/TrekDetailPage';
import Footer from './components/Footer';
import type { Trek } from './data/treks';
import { treksData } from './data/treks';
import { blogsData } from './data/blogs';
import type { BlogArticle } from './data/blogs';
import { AppContextProvider } from './context/AppContext';
import AuthModal from './components/AuthModal';

// Lazy loading heavy components for Core Web Vitals performance optimization
const Blog = lazy(() => import('./components/Blog'));
const EcoPledge = lazy(() => import('./components/EcoPledge'));
const Gallery = lazy(() => import('./components/Gallery'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const FAQ = lazy(() => import('./components/FAQ'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const AdminPortal = lazy(() => import('./components/AdminPortal'));

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [bookingTrekId, setBookingTrekId] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentSearch, setCurrentSearch] = useState(window.location.search);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Parse path coordinates cleanly
  const getCleanRoute = (pathStr: string) => {
    const base = import.meta.env.BASE_URL || '/';
    let route = pathStr;
    if (route.startsWith(base)) {
      route = route.slice(base.length);
    }
    if (route.endsWith('/')) {
      route = route.slice(0, -1);
    }
    return route;
  };

  const currentRoute = getCleanRoute(currentPath);
  const isBookPage = currentRoute === 'book' || currentRoute === 'booking';
  const isDashboardPage = currentRoute === 'dashboard';
  const isAdminPage = currentRoute === 'admin';

  // Coordinate popstate routing rules as a single source of truth
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      setCurrentPath(path);
      setCurrentSearch(search);
      const route = getCleanRoute(path);

      const isSub = route.startsWith('treks/') || route.startsWith('blog/') || route === 'book' || route === 'booking' || route === 'dashboard' || route === 'admin';
      if (isSub) {
        window.scrollTo(0, 0);
      }

      if (route.startsWith('treks/')) {
        const trekId = route.split('/')[1];
        const match = treksData.find((t) => t.id === trekId);
        if (match) {
          setSelectedTrek(match);
          setSelectedArticle(null);
          return;
        }
      } else if (route.startsWith('blog/')) {
        const blogId = route.split('/')[1];
        const match = blogsData.find((b) => b.id === blogId);
        if (match) {
          setSelectedArticle(match);
          setSelectedTrek(null);
          return;
        }
      } else if (route === 'book' || route === 'booking') {
        setSelectedTrek(null);
        setSelectedArticle(null);
        const searchParams = new URLSearchParams(search);
        const queryTrekId = searchParams.get('trek') || '';
        setBookingTrekId(queryTrekId);
        return;
      } else if (route === 'dashboard' || route === 'admin') {
        setSelectedTrek(null);
        setSelectedArticle(null);
        return;
      } else if (route === 'about' || route === 'faq' || route === 'contact' || route === 'treks' || route === 'eco' || route === 'gallery') {
        setSelectedTrek(null);
        setSelectedArticle(null);
        
        setTimeout(() => {
          const targetId = route === 'faq' ? 'faq' : (route === 'contact' ? 'contact-footer' : (route === 'eco' ? 'eco' : route));
          const element = document.getElementById(targetId);
          if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 150);
        return;
      }

      // Home route resets overlays
      setSelectedTrek(null);
      setSelectedArticle(null);
    };

    window.addEventListener('popstate', handleUrlRouting);
    handleUrlRouting(); // initial trigger

    // Connect custom event listeners for opening auth modal overlay
    const openAuth = () => setIsAuthModalOpen(true);
    const closeAuth = () => setIsAuthModalOpen(false);
    window.addEventListener('open-auth-modal', openAuth);
    window.addEventListener('close-auth-modal', closeAuth);

    return () => {
      window.removeEventListener('popstate', handleUrlRouting);
      window.removeEventListener('open-auth-modal', openAuth);
      window.removeEventListener('close-auth-modal', closeAuth);
    };
  }, []);

  // Sync index title tags & meta descriptions when routes change
  useEffect(() => {
    if (selectedTrek) {
      document.title = `${selectedTrek.name} Guided Tour Package (Altitude: ${selectedTrek.altitude}) - Desi Nomad Trails`;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', `Join the ${selectedTrek.name} in ${selectedTrek.region}. Duration: ${selectedTrek.duration} Days. Highlights: ${selectedTrek.highlights}. Book with Desi Nomad Trails.`);
      }
      
      let canonLink = document.querySelector('link[rel="canonical"]');
      if (canonLink) {
        canonLink.setAttribute('href', `${SITE_URL}/treks/${selectedTrek.id}`);
      }
    } else if (selectedArticle) {
      document.title = `${selectedArticle.title} - Desi Nomad Trails Diaries`;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', selectedArticle.excerpt);
      }
      
      let canonLink = document.querySelector('link[rel="canonical"]');
      if (canonLink) {
        canonLink.setAttribute('href', `${SITE_URL}/blog/${selectedArticle.id}`);
      }
    } else if (isBookPage) {
      document.title = 'Book Your Trek | Desi Nomad Trails';
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', 'Reserve your Himalayan trek with certified trek leaders. Secure your adventure with Desi Nomad Trails.');
      }
      
      let canonLink = document.querySelector('link[rel="canonical"]');
      if (canonLink) {
        canonLink.setAttribute('href', `${SITE_URL}/book`);
      }
    } else if (isDashboardPage) {
      document.title = 'My Account Dashboard - Desi Nomad Trails';
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', 'Access your booking history, wishlisted treks, emergency details, and medical logs on Desi Nomad Trails.');
      }
      
      let canonLink = document.querySelector('link[rel="canonical"]');
      if (canonLink) {
        canonLink.setAttribute('href', `${SITE_URL}/dashboard`);
      }
    } else if (isAdminPage) {
      document.title = 'Operations Console - Desi Nomad Trails';
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', 'Administrative dashboard for managing bookings, batches, and operations on Desi Nomad Trails.');
      }
      
      let canonLink = document.querySelector('link[rel="canonical"]');
      if (canonLink) {
        canonLink.setAttribute('href', `${SITE_URL}/admin`);
      }
    } else {
      document.title = 'Desi Nomad Trails – High Altitude Trekking in India & Guided Mountain Expeditions';
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', 'Embark on the best Himalayan & Western Ghats treks with Desi Nomad Trails. Fully guided budget trekking packages with NIM/HMI certified trek leaders, safety first approach, and eco-friendly camping.');
      }
      
      let canonLink = document.querySelector('link[rel="canonical"]');
      if (canonLink) {
        canonLink.setAttribute('href', `${SITE_URL}/`);
      }
    }
  }, [selectedTrek, selectedArticle, currentPath, isBookPage, isDashboardPage, isAdminPage, currentSearch]);

  // Scrollspy to update header anchors (only active on home page)
  useEffect(() => {
    if (selectedTrek || isBookPage || isDashboardPage || isAdminPage) return;

    const sections = ['home', 'about', 'treks', 'blog', 'eco', 'gallery', 'faq'];
    const handleScrollspy = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollspy);
    return () => window.removeEventListener('scroll', handleScrollspy);
  }, [selectedTrek, isBookPage, isDashboardPage, isAdminPage]);

  const handleExploreClick = () => {
    const element = document.getElementById('treks');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleBookTrek = (trekId: string) => {
    const base = import.meta.env.BASE_URL || '/';
    window.history.pushState(null, '', `${base}book?trek=${trekId}`);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleSelectTrek = (trek: Trek) => {
    window.history.pushState(null, '', `${import.meta.env.BASE_URL || '/'}treks/${trek.id}`);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleCloseTrekModal = () => {
    window.history.pushState(null, '', import.meta.env.BASE_URL || '/');
    window.dispatchEvent(new Event('popstate'));
    
    // Scroll back to treks section after navigation
    setTimeout(() => {
      const element = document.getElementById('treks');
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition });
      }
    }, 100);
  };

  const handleSelectArticle = (article: BlogArticle | null) => {
    if (article) {
      window.history.pushState(null, '', `${import.meta.env.BASE_URL || '/'}blog/${article.id}`);
    } else {
      window.history.pushState(null, '', import.meta.env.BASE_URL || '/');
    }
    window.dispatchEvent(new Event('popstate'));
  };

  // Shared router handler for Navbar & Footer click actions
  const handleNavigate = (routeId: string) => {
    const base = import.meta.env.BASE_URL || '/';
    if (routeId === 'book' || routeId === 'dashboard' || routeId === 'admin') {
      window.history.pushState(null, '', `${base}${routeId}`);
      window.dispatchEvent(new Event('popstate'));
      return;
    }

    if (isBookPage || isDashboardPage || isAdminPage || selectedTrek) {
      window.history.pushState(null, '', base);
      window.dispatchEvent(new Event('popstate'));

      setTimeout(() => {
        const element = document.getElementById(routeId === 'home' ? 'home' : (routeId === 'eco' ? 'eco' : routeId));
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(routeId === 'home' ? 'home' : (routeId === 'eco' ? 'eco' : routeId));
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <AppContextProvider>
      <div className="app-container">
        <Navbar activeSection={selectedTrek ? "" : isBookPage ? "book" : isDashboardPage ? "dashboard" : isAdminPage ? "admin" : activeSection} onNavigate={handleNavigate} />
        
        <main style={{ paddingBottom: selectedTrek ? '72px' : '0' }}>
          {selectedTrek ? (
            <TrekDetailPage
              trek={selectedTrek}
              onBack={handleCloseTrekModal}
              onBookTrek={handleBookTrek}
            />
          ) : isBookPage ? (
            <Suspense fallback={
              <div className="loading-spinner-placeholder" style={{ padding: '80px 20px', textAlign: 'center', color: '#e28743', fontSize: '1.1rem', fontWeight: 500 }}>
                <span>Preparing Booking Register...</span>
              </div>
            }>
              <BookingForm preselectedTrekId={bookingTrekId} />
            </Suspense>
          ) : isDashboardPage ? (
            <Suspense fallback={
              <div className="loading-spinner-placeholder" style={{ padding: '80px 20px', textAlign: 'center', color: '#e28743', fontSize: '1.1rem', fontWeight: 500 }}>
                <span>Opening Profile Console...</span>
              </div>
            }>
              <Dashboard />
            </Suspense>
          ) : isAdminPage ? (
            <Suspense fallback={
              <div className="loading-spinner-placeholder" style={{ padding: '80px 20px', textAlign: 'center', color: '#e28743', fontSize: '1.1rem', fontWeight: 500 }}>
                <span>Opening Security Portal...</span>
              </div>
            }>
              <AdminPortal />
            </Suspense>
          ) : (
            <>
              <Hero onExploreClick={handleExploreClick} onBookClick={() => handleNavigate('book')} />
              <About />
              <TrekFinder onSelectTrek={handleSelectTrek} onBookTrek={handleBookTrek} />
              
              <Suspense fallback={
                <div className="loading-spinner-placeholder" style={{ padding: '80px 20px', textAlign: 'center', color: '#e28743', fontSize: '1.1rem', fontWeight: 500 }}>
                  <span>Gathering Camp Supplies...</span>
                </div>
              }>
                <Blog selectedArticle={selectedArticle} onSelectArticle={handleSelectArticle} />
                <EcoPledge />
                <Gallery />
                <FAQ />
              </Suspense>

              {/* Added home CTA footer marketing panel linking directly to booking page */}
              <section className="py-16 bg-[#0a251c] text-white text-center">
                <div className="max-w-2xl mx-auto px-5">
                  <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">Ready for the Trails?</h2>
                  <p className="text-slate-200 text-sm md:text-base mb-6 leading-relaxed">
                    Join Desi Nomad Trails for a high-altitude expedition. Custom dates, expert crew, and safety-focused logistics.
                  </p>
                  <button onClick={() => handleNavigate('book')} className="h-12 px-8 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200">
                    Book Your Adventure
                  </button>
                </div>
              </section>
            </>
          )}
        </main>

        <Footer onNavigate={handleNavigate} />

        {!selectedTrek && (
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
        )}

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </AppContextProvider>
  );
}
