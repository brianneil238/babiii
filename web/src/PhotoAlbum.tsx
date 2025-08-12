import { useState, useEffect } from 'react';
import './photo-album.css';

interface PhotoAlbumProps {
  onClose?: () => void;
}

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  date?: string;
}

export default function PhotoAlbum({ onClose }: PhotoAlbumProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Sample photos - replace these with your actual photos
  const photos: Photo[] = [
    {
      id: 1,
      src: '/photo1.jpg', // Replace with your photo paths
      alt: 'Beautiful Birthday Girl',
      caption: 'My beautiful birthday girl ❤️',
      date: 'Forever & Always'
    },
    {
      id: 2,
      src: '/photo2.jpg',
      alt: 'Special Moment Together',
      caption: 'Every moment with you is magical ✨',
      date: 'Our Love Story'
    },
    {
      id: 3,
      src: '/photo3.jpg',
      alt: 'Adventure Together',
      caption: 'Exploring the world with my love 🌍',
      date: 'Adventures Together'
    },
    {
      id: 4,
      src: '/photo4.jpg',
      alt: 'Cozy Date Night',
      caption: 'Cozy nights with my favorite person 🕯️',
      date: 'Date Nights'
    },
    {
      id: 5,
      src: '/photo5.jpg',
      alt: 'Sunset Walk',
      caption: 'Walking into forever with you 🌅',
      date: 'Sunset Walks'
    },
    {
      id: 6,
      src: '/photo6.jpg',
      alt: 'Birthday Celebration',
      caption: 'Celebrating the most amazing person 🎉',
      date: 'Birthday Joy'
    },
    {
      id: 7,
      src: '/photo7.jpg',
      alt: 'Sweet Morning',
      caption: 'Waking up next to you is my favorite part of the day 🌅',
      date: 'Morning Love'
    },
    {
      id: 8,
      src: '/photo8.JPG',
      alt: 'Be Silly Together',
      caption: 'Being silly through life with my perfect partner 💃🕺',
      date: 'Silly of Love'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
  };

  const currentPhoto = photos[currentPhotoIndex];

  return (
    <div className={`photo-album ${isVisible ? 'visible' : ''}`}>
      <div className="photo-album">
        <div className="album-header">
          <h1>📸 Our Love Story</h1>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        
        <div className="main-photo-container">
          <button 
            className="nav-btn prev-btn" 
            onClick={prevPhoto}
            style={{
              position: 'absolute',
              left: 'clamp(10px, 3vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 215, 0, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: 'clamp(40px, 10vw, 60px)',
              height: 'clamp(40px, 10vw, 60px)',
              fontSize: 'clamp(16px, 4vw, 24px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            ‹
          </button>
          
          <img
            src={photos[currentPhotoIndex].src}
            alt={photos[currentPhotoIndex].alt}
            onClick={toggleFullscreen}
            style={{
              width: '100%',
              height: 'clamp(200px, 50vh, 400px)',
              objectFit: 'cover',
              borderRadius: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              maxWidth: '90vw'
            }}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Photo+Not+Found';
            }}
          />
          
          <button 
            className="nav-btn next-btn" 
            onClick={nextPhoto}
            style={{
              position: 'absolute',
              right: 'clamp(10px, 3vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 215, 0, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: 'clamp(40px, 10vw, 60px)',
              height: 'clamp(40px, 10vw, 60px)',
              fontSize: 'clamp(16px, 4vw, 24px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            ›
          </button>
        </div>
        
        <div className="photo-info" style={{
          textAlign: 'center',
          margin: 'clamp(15px, 4vw, 25px) 0',
          padding: '0 clamp(10px, 3vw, 20px)'
        }}>
          <h3 style={{
            fontSize: 'clamp(18px, 5vw, 24px)',
            color: '#ff6b6b',
            margin: '0 0 clamp(8px, 2vw, 12px) 0'
          }}>
            {photos[currentPhotoIndex].caption}
          </h3>
          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            color: '#666',
            margin: 0,
            fontStyle: 'italic'
          }}>
            {photos[currentPhotoIndex].date}
          </p>
        </div>
        
        <div className="thumbnails" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 15px)',
          flexWrap: 'wrap',
          padding: '0 clamp(10px, 3vw, 20px)',
          marginBottom: 'clamp(20px, 5vw, 30px)'
        }}>
          {photos.map((photo, index) => (
            <img
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              onClick={() => goToPhoto(index)}
              style={{
                width: 'clamp(50px, 12vw, 80px)',
                height: 'clamp(50px, 12vw, 80px)',
                objectFit: 'cover',
                borderRadius: '8px',
                cursor: 'pointer',
                border: index === currentPhotoIndex ? '3px solid #ff6b6b' : '2px solid #ddd',
                opacity: index === currentPhotoIndex ? 1 : 0.7,
                transition: 'all 0.3s ease'
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/80x80/ff6b6b/ffffff?text=Photo';
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="album-controls">
        <button className="control-btn" onClick={() => window.location.reload()}>
          🔄 Restart
        </button>
        {onClose && (
          <button className="control-btn" onClick={onClose}>
            ✕ Close
          </button>
        )}
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fullscreen-modal" onClick={toggleFullscreen}>
          <div className="fullscreen-content">
            <img 
              src={currentPhoto.src} 
              alt={currentPhoto.alt}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="fullscreen-caption">
              <h3>{currentPhoto.caption}</h3>
              <p>{currentPhoto.date}</p>
            </div>
            <button className="close-fullscreen" onClick={toggleFullscreen}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Hearts */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
