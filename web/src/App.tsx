import { useState, useEffect, useRef } from 'react'
import './App.css'
import FlowerAnimation from './FlowerAnimation'
import PhotoAlbum from './PhotoAlbum'

function App() {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [wordIndex, setWordIndex] = useState<number | null>(null)
  const [showGiftButton, setShowGiftButton] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showPhotoAlbum, setShowPhotoAlbum] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const words = ['HAPPY', 'BIRTHDAY', 'BABIII', 'ILOVEYOUUU']
  const glowStyle = {
    textShadow: '0 0 40px #ffe066, 0 0 80px #ffe066, 0 0 120px #ffe066',
  };

  // Start countdown immediately
  useEffect(() => {
    setCountdown(3)
  }, [])

  // Countdown logic
  useEffect(() => {
    if (countdown === null) return
    if (countdown > 1) {
      const t = setTimeout(() => setCountdown(countdown - 1), 900)
      return () => clearTimeout(t)
    } else if (countdown === 1) {
      const t = setTimeout(() => {
        setCountdown(null)
        setWordIndex(0)
      }, 900)
      return () => clearTimeout(t)
    }
  }, [countdown])

  // Animated words logic
  useEffect(() => {
    if (wordIndex === null) return;
    if (wordIndex < words.length - 1) {
      const t = setTimeout(() => setWordIndex(wordIndex + 1), 900);
      return () => clearTimeout(t);
    } else if (wordIndex === words.length - 1) {
      const t = setTimeout(() => {
        setWordIndex(null);
        setShowGiftButton(true);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [wordIndex]);

  // Auto-progression sequence: Greet → Flowers → Letter → Album
  useEffect(() => {
    if (showFlowers) {
      // Show flowers for 15 seconds, then show letter
      const letterTimer = setTimeout(() => {
        setShowFlowers(false);
        setShowLetter(true);
      }, 15000);

      return () => clearTimeout(letterTimer);
    }
  }, [showFlowers]);

  useEffect(() => {
    if (showLetter) {
      // Show letter for 15 seconds, then show photo album
      const albumTimer = setTimeout(() => {
        setShowLetter(false);
        setShowPhotoAlbum(true);
      }, 15000);

      return () => clearTimeout(albumTimer);
    }
  }, [showLetter]);

  // Falling text effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const fontSize = 28;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const text = 'HAPPY BIRTHDAY ';
    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(26,26,26,0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px Segoe UI, Arial, sans-serif`;
      ctx.fillStyle = '#ffe066';
      for (let i = 0; i < columns; i++) {
        const char = text[Math.floor(Math.random() * text.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {/* Main container with click handler for audio enablement */}
      <div onClick={() => {}} style={{ width: '100vw', height: '100vh' }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        
        {/* Overlay loading/countdown/words on top of matrix effect */}
        {showPhotoAlbum ? (
          <PhotoAlbum onClose={() => setShowPhotoAlbum(false)} />
        ) : showLetter ? (
          <div style={{ position: 'relative', zIndex: 5 }}>
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100vw', 
              height: '100vh',
              zIndex: 1
            }}>
              {/* Letter content */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: 'clamp(20px, 5vw, 40px)',
                margin: 'clamp(10px, 3vw, 20px)',
                borderRadius: 'clamp(15px, 4vw, 20px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                maxHeight: '80vh',
                overflow: 'auto',
                color: '#333',
                fontSize: 'clamp(14px, 4vw, 18px)',
                lineHeight: '1.6',
                maxWidth: '90vw',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                <h1 style={{ 
                  textAlign: 'center', 
                  color: '#ff6b6b', 
                  marginBottom: 'clamp(20px, 5vw, 30px)',
                  fontSize: 'clamp(20px, 6vw, 28px)'
                }}>
                  💌 A Letter for My Love
                </h1>
                <p>My Dearest Babii,</p>
                <p>Today is all about celebrating you - the incredible person who brings so much joy, love, and light into my life. I feel so lucky to call you mine. You've shown me what true love feels like, and every day with you is a beautiful adventure.</p>
                <p>I love everything about you - your smile, your laugh, your strength, your kindness. You make me feel safe, supported, and deeply loved.</p>
                <p>I'm so proud of the person you are and everything you're becoming. You're not just my partner, you're my best friend, my confidant, and my soulmate. I love you more than words can say, and I'm so grateful for every moment we share.</p>
                <p>On your special day, I just want to say thank you. Thank you for being you. Thank you for letting me love you. And thank you for loving me right back. You are my today, my tomorrow, and my forever. My heart beats only for you.</p>
                <p>Forever Yours,<br/>With All My Love ❤️</p>
              </div>
            </div>
          </div>
        ) : showFlowers ? (
          <div style={{ position: 'relative', zIndex: 5 }}>
            <FlowerAnimation />
          </div>
        ) : (countdown !== null || wordIndex !== null || showGiftButton) && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'clamp(10px, 3vw, 20px)'
          }}>
            {/* Countdown */}
            {countdown !== null && (
              <div style={{
                fontSize: 'clamp(48px, 15vw, 120px)',
                color: '#ffe066',
                textAlign: 'center',
                fontWeight: 'bold',
                textShadow: '0 0 40px #ffe066, 0 0 80px #ffe066',
                animation: 'glow 2s ease-in-out infinite alternate'
              }}>
                {countdown}
              </div>
            )}

            {/* Animated words */}
            {wordIndex !== null && (
              <div style={{
                fontSize: 'clamp(32px, 10vw, 80px)',
                color: '#ffe066',
                textAlign: 'center',
                fontWeight: 'bold',
                ...glowStyle,
                animation: 'pop 0.9s ease-out'
              }}>
                {words[wordIndex]}
              </div>
            )}

            {/* Gift button */}
            {showGiftButton && (
              <div style={{ 
                textAlign: 'center',
                marginTop: 'clamp(20px, 5vw, 40px)'
              }}>
                <p style={{
                  fontSize: 'clamp(16px, 4vw, 24px)',
                  color: '#ffe066',
                  marginBottom: 'clamp(15px, 4vw, 25px)',
                  textShadow: '0 0 20px #ffe066'
                }}>
                  I have something for you...
                </p>
                <button
                  onClick={() => {
                    setShowGiftButton(false);
                    setShowFlowers(true);
                  }}
                  style={{
                    background: 'rgba(255, 215, 0, 0.9)',
                    color: '#1a1a1a',
                    border: 'none',
                    padding: 'clamp(12px, 3vw, 20px) clamp(20px, 5vw, 30px)',
                    borderRadius: 'clamp(20px, 5vw, 30px)',
                    fontSize: 'clamp(16px, 4vw, 24px)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: 'clamp(120px, 30vw, 200px)',
                    minHeight: 'clamp(40px, 10vw, 60px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
                  }}
                >
                  Open
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
