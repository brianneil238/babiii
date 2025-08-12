import { useState } from 'react';

interface Flower {
  x: string;
  y: string;
  emoji: string;
  duration: number;
  delay: number;
}

interface Heart {
  x: string;
  y: string;
  duration: number;
  delay: number;
}

interface Star {
  x: string;
  y: string;
  duration: number;
  delay: number;
}

export default function FlowerAnimation() {
  const [flowers] = useState<Flower[]>([
    { x: '10%', y: '20%', emoji: '🌸', duration: 3, delay: 0 },
    { x: '85%', y: '30%', emoji: '🌺', duration: 4, delay: 1 },
    { x: '20%', y: '70%', emoji: '🌹', duration: 3.5, delay: 0.5 },
    { x: '75%', y: '80%', emoji: '🌷', duration: 4.5, delay: 1.5 },
    { x: '50%', y: '15%', emoji: '🌻', duration: 3, delay: 0.8 },
    { x: '15%', y: '50%', emoji: '🌼', duration: 4, delay: 0.3 }
  ]);

  const [hearts] = useState<Heart[]>([
    { x: '25%', y: '25%', duration: 5, delay: 0 },
    { x: '80%', y: '40%', duration: 6, delay: 2 },
    { x: '40%', y: '75%', duration: 5.5, delay: 1 },
    { x: '90%', y: '70%', duration: 6.5, delay: 3 },
    { x: '60%', y: '20%', duration: 5, delay: 1.5 }
  ]);

  const [stars] = useState<Star[]>([
    { x: '5%', y: '10%', duration: 4, delay: 0 },
    { x: '95%', y: '15%', duration: 4.5, delay: 1 },
    { x: '10%', y: '90%', duration: 4, delay: 2 },
    { x: '90%', y: '85%', duration: 4.5, delay: 0.5 },
    { x: '30%', y: '5%', duration: 4, delay: 1.5 },
    { x: '70%', y: '95%', duration: 4.5, delay: 2.5 }
  ]);

  return (
    <div className="flower-animation">
      {/* Flowers */}
      {flowers.map((flower, index) => (
        <div
          key={index}
          className="flower"
          style={{
            position: 'fixed',
            left: flower.x,
            top: flower.y,
            fontSize: 'clamp(24px, 8vw, 48px)',
            animation: `float ${flower.duration}s ease-in-out infinite`,
            animationDelay: `${flower.delay}s`,
            zIndex: 5
          }}
        >
          {flower.emoji}
        </div>
      ))}

      {/* Floating hearts */}
      {hearts.map((heart, index) => (
        <div
          key={index}
          className="heart"
          style={{
            position: 'fixed',
            left: heart.x,
            top: heart.y,
            fontSize: 'clamp(16px, 5vw, 24px)',
            color: '#ff6b6b',
            animation: `heartFloat ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
            zIndex: 3
          }}
        >
          ❤️
        </div>
      ))}

      {/* Twinkling stars */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            position: 'fixed',
            left: star.x,
            top: star.y,
            fontSize: 'clamp(12px, 3vw, 18px)',
            color: '#ffe066',
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            zIndex: 2
          }}
        >
          ⭐
        </div>
      ))}

      {/* Main message */}
      <div className="main-message" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#ff6b6b',
        zIndex: 15,
        background: 'rgba(255, 255, 255, 0.9)',
        padding: 'clamp(20px, 5vw, 40px)',
        borderRadius: 'clamp(20px, 5vw, 30px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '90vw',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: 'clamp(24px, 8vw, 48px)',
          margin: '0 0 clamp(15px, 4vw, 25px) 0',
          color: '#ff6b6b',
          textShadow: '0 2px 10px rgba(255, 107, 107, 0.3)'
        }}>
          🌸 Happy Birthday, My Love! 🌸
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 4vw, 20px)',
          margin: '0 0 clamp(20px, 5vw, 30px) 0',
          color: '#666',
          lineHeight: 1.5
        }}>
          May your day be as beautiful and special as you are to me! 💕
        </p>
        <div style={{
          fontSize: 'clamp(32px, 10vw, 64px)',
          animation: 'heartbeat 1.5s ease-in-out infinite'
        }}>
          🎂🎉🎁
        </div>
      </div>
    </div>
  );
} 