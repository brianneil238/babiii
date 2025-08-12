import React, { useEffect, useRef, useState } from 'react';
import './solar-system.css';

interface SolarSystemProps {
  onClose?: () => void;
}

interface Planet {
  id: number;
  image: string;
  name: string;
  size: number;
  distance: number;
  speed: number;
  angle: number;
}

export default function SolarSystem({ onClose }: SolarSystemProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample planets - you can replace these with your own images
  const samplePlanets: Planet[] = [
    {
      id: 1,
      image: '/planet1.jpg', // Replace with your image paths
      name: 'Our First Date',
      size: 80,
      distance: 120,
      speed: 0.5,
      angle: 0
    },
    {
      id: 2,
      image: '/planet2.jpg',
      name: 'Beach Day',
      size: 70,
      distance: 180,
      speed: 0.3,
      angle: 45
    },
    {
      id: 3,
      image: '/planet3.jpg',
      name: 'Mountain Trip',
      size: 90,
      distance: 240,
      speed: 0.4,
      angle: 90
    },
    {
      id: 4,
      image: '/planet4.jpg',
      name: 'City Lights',
      size: 75,
      distance: 300,
      speed: 0.6,
      angle: 135
    },
    {
      id: 5,
      image: '/planet5.jpg',
      name: 'Sunset Walk',
      size: 85,
      distance: 360,
      speed: 0.35,
      angle: 180
    },
    {
      id: 6,
      image: '/planet6.jpg',
      name: 'Coffee Date',
      size: 65,
      distance: 420,
      speed: 0.45,
      angle: 225
    }
  ];

  useEffect(() => {
    // Initialize planets with sample data
    setPlanets(samplePlanets);
    
    // Fade in effect
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      setPlanets(prevPlanets => 
        prevPlanets.map(planet => ({
          ...planet,
          angle: (planet.angle + planet.speed) % 360
        }))
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  const getPlanetPosition = (planet: Planet) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const radian = (planet.angle * Math.PI) / 180;
    const x = centerX + Math.cos(radian) * planet.distance;
    const y = centerY + Math.sin(radian) * planet.distance;
    
    return { x, y };
  };

  return (
    <div className={`solar-system ${isVisible ? 'visible' : ''}`}>
      {/* Central sun */}
      <div className="sun">
        <div className="sun-core">☀️</div>
        <div className="sun-glow"></div>
      </div>

      {/* Orbiting planets */}
      {planets.map(planet => {
        const position = getPlanetPosition(planet);
        return (
          <div
            key={planet.id}
            className="planet"
            style={{
              left: position.x - planet.size / 2,
              top: position.y - planet.size / 2,
              width: planet.size,
              height: planet.size,
            }}
          >
            <div className="planet-image">
              <img 
                src={planet.image} 
                alt={planet.name}
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZFMDAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMUEwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5GAPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
            </div>
            <div className="planet-name">{planet.name}</div>
            <div className="planet-orbit" style={{ width: planet.distance * 2, height: planet.distance * 2 }}></div>
          </div>
        );
      })}

      {/* Stars background */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        ></div>
      ))}

      {/* Navigation controls */}
      <div className="solar-controls">
        <button className="control-btn" onClick={() => window.location.reload()}>
          🔄 Restart
        </button>
        {onClose && (
          <button className="control-btn" onClick={onClose}>
            ✕ Close
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3>🌟 Our Solar System of Memories</h3>
        <p>Each planet represents a special moment we've shared together</p>
      </div>
    </div>
  );
}
