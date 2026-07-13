import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  location: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 0,
    url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    title: 'Alpine Starry Night',
    location: 'Sikkim Basecamp'
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    title: 'Glacial Valley Stream',
    location: 'Uttarakhand Meadows'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=800&q=80',
    title: 'Sunrise Pine Forests',
    location: 'Himachal Ridge'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    title: 'Hampta Pass Ridges',
    location: 'Himachal'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
    title: 'Ascending the Ridge',
    location: 'Uttarakhand'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
    title: 'Majestic Peaks',
    location: 'Sikkim'
  }
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-title">
        <h2>Photo Gallery & Trail Art</h2>
        <p>Explore the stunning landscapes captured by our guides and community nomads.</p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div 
            key={image.id} 
            className="gallery-item card animate-fade"
            onClick={() => openLightbox(index)}
          >
            <img src={image.url} alt={image.title} className="gallery-image" />
            <div className="gallery-hover-overlay">
              <Maximize2 size={24} className="gallery-zoom-icon" />
              <div className="gallery-caption">
                <h4>{image.title}</h4>
                <p>{image.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close viewer">
            <X size={32} />
          </button>
          
          <button className="lightbox-nav lightbox-left" onClick={showPrev} aria-label="Previous image">
            <ChevronLeft size={36} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[lightboxIndex].url} 
              alt={galleryImages[lightboxIndex].title} 
              className="lightbox-image animate-fade"
            />
            <div className="lightbox-meta">
              <h3>{galleryImages[lightboxIndex].title}</h3>
              <p>{galleryImages[lightboxIndex].location}</p>
            </div>
          </div>
          
          <button className="lightbox-nav lightbox-right" onClick={showNext} aria-label="Next image">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}
