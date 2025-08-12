import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { QRCodeCanvas } from 'qrcode.react'
import FlowerAnimation from './FlowerAnimation';
import PhotoAlbum from './PhotoAlbum';

const images = [
  // Replace these URLs with your own images or add more
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
]

const messages = [
  'Happy Birthday! Wishing you a day filled with love and joy!',
  'May your birthday be as wonderful as you are!',
  'Cheers to another year of amazing adventures!'
]

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
`

const Gallery = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  margin: 1.5rem 0;
  scroll-snap-type: x mandatory;
`

const Image = styled.img`
  width: 220px;
  height: 320px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  scroll-snap-align: start;
`

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0 1rem 0;
`

const Message = styled.li`
  background: #fffbe7;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  font-size: 1.1rem;
`

const QRSection = styled.div`
  margin: 2rem 0 1rem 0;
`

function App() {
  const [showQR, setShowQR] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [wordIndex, setWordIndex] = useState<number | null>(null)
  const [showGiftButton, setShowGiftButton] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showPhotoAlbum, setShowPhotoAlbum] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const url = window.location.origin
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const words = ['HAPPY', 'BIRTHDAY', 'BABIII', 'ILOVEYOUUU']
  const glowStyle = {
    textShadow: '0 0 40px #ffe066, 0 0 80px #ffe066, 0 0 120px #ffe066',
  };

  // Handle user interaction to enable audio
  const handleUserInteraction = () => {
    if (!userInteracted) {
      console.log('User interaction detected, enabling audio...');
      setUserInteracted(true);
      
      // Preload and prepare audio
      if (audioRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.loop = true;
        audioRef.current.load();
      }
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 1;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Start countdown immediately
  useEffect(() => {
    setCountdown(3)
  }, [])

  // Check audio file accessibility
  useEffect(() => {
    if (audioRef.current) {
      console.log('Audio element created, checking file accessibility...');
      
      audioRef.current.addEventListener('loadstart', () => {
        console.log('Audio loading started');
      });
      
      audioRef.current.addEventListener('canplay', () => {
        console.log('Audio can play');
      });
      
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio can play through completely');
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error occurred:', e);
        const audio = e.target as HTMLAudioElement;
        if (audio.error) {
          console.error('Audio error details:', {
            code: audio.error.code,
            message: audio.error.message
          });
        }
      });
      
      audioRef.current.addEventListener('abort', () => {
        console.log('Audio loading aborted');
      });
    }
  }, []);

  // Countdown logic
  useEffect(() => {
    if (countdown === null) return
    if (countdown > 1) {
      const t = setTimeout(() => setCountdown(countdown - 1), 900)
      return () => clearTimeout(t)
    } else if (countdown === 1) {
      const t = setTimeout(() => {
        setCountdown(null)
        // Start audio automatically when "HAPPY" is about to appear
        console.log('Countdown finished, attempting to start audio...');
        if (audioRef.current && userInteracted && !audioStarted) {
          console.log('User has interacted, starting audio automatically...');
          audioRef.current.play().then(() => {
            console.log('Audio started successfully!');
            setAudioStarted(true);
            // Small delay to ensure audio starts before text appears
            setTimeout(() => setWordIndex(0), 500);
          }).catch(error => {
            console.error('Audio autoplay failed:', error);
            // If autoplay fails, still show the text
            setWordIndex(0);
          });
        } else {
          console.log('Audio not ready or user not interacted, showing text without audio');
          setWordIndex(0);
        }
      }, 900)
      return () => clearTimeout(t)
    }
  }, [countdown, audioStarted, userInteracted])

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
    if (showGiftButton) {
      // Wait 15 seconds on gift button, then show flowers
      const flowerTimer = setTimeout(() => {
        setShowGiftButton(false);
        setShowFlowers(true);
      }, 15000);

      return () => clearTimeout(flowerTimer);
    }
  }, [showGiftButton]);

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
    if (loading) return;
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
  }, [loading]);

  return (
    <>
      {/* Audio element for background music */}
      <audio 
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/birthday-song.mp3" type="audio/mpeg" />
        <source src="/birthday-song.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Audio control button */}
      {audioStarted && (
        <button
          onClick={toggleMute}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(255, 224, 102, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = 'rgba(255, 224, 102, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(255, 224, 102, 0.9)';
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      )}

      {/* User interaction prompt - shows before countdown starts */}
      {!userInteracted && countdown !== null && (
        <div
          style={{
            position: 'fixed',
            top: '85%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'rgba(26, 26, 26, 0.95)',
            padding: '30px',
            borderRadius: '20px',
            border: '2px solid #ffe066',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 0 40px rgba(255, 224, 102, 0.3)',
          }}
        >
          <h2 style={{ color: '#ffe066', marginBottom: '20px' }}>🎵 Ready for Your Song?</h2>
          <p style={{ color: '#ffffff', marginBottom: '25px', lineHeight: '1.5' }}>
            Click anywhere to enable the birthday music that will play when "HAPPY" appears!
          </p>
          <button
            onClick={handleUserInteraction}
            style={{
              background: '#ffe066',
              color: '#1a1a1a',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(255, 224, 102, 0.5)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 224, 102, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 224, 102, 0.5)';
            }}
          >
            🎵 Enable Music
          </button>
        </div>
      )}
      
      {/* Main container with click handler for audio enablement */}
      <div onClick={handleUserInteraction} style={{ width: '100vw', height: '100vh' }}>
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
        ) : (loading || countdown !== null || wordIndex !== null || showGiftButton) && (
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
            {/* Loading spinner */}
            {loading && (
              <div style={{
                fontSize: 'clamp(24px, 8vw, 48px)',
                color: '#ffe066',
                textAlign: 'center',
                animation: 'spin 1s linear infinite'
              }}>
                ⭐
              </div>
            )}

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
                  onClick={() => setShowFlowers(true)}
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

        {/* Audio element */}
        <audio
          ref={audioRef}
          src="/birthday-song.mp3"
          preload="auto"
          onCanPlayThrough={() => {
            console.log('Audio can play through');
            if (userInteracted && !audioStarted) {
              audioRef.current?.play().then(() => {
                setAudioStarted(true);
                console.log('Audio started playing');
              }).catch(err => {
                console.error('Failed to play audio:', err);
              });
            }
          }}
          onError={(e) => {
            console.error('Audio error:', e);
          }}
        />

        {/* Floating mute/unmute button */}
        {userInteracted && (
          <button
            onClick={toggleMute}
            style={{
              position: 'fixed',
              bottom: 'clamp(20px, 5vw, 30px)',
              right: 'clamp(20px, 5vw, 30px)',
              background: 'rgba(255, 215, 0, 0.9)',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '50%',
              width: 'clamp(50px, 12vw, 70px)',
              height: 'clamp(50px, 12vw, 70px)',
              fontSize: 'clamp(20px, 5vw, 28px)',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        )}

        {/* User interaction prompt */}
        {!userInteracted && (
          <div style={{
            position: 'fixed',
            top: '85%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#ffe066',
            padding: 'clamp(15px, 4vw, 25px)',
            borderRadius: 'clamp(15px, 4vw, 25px)',
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            maxWidth: '90vw',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{ margin: '0 0 clamp(10px, 2.5vw, 15px) 0' }}>
              Ready for Your Song? 🎵
            </p>
            <button
              onClick={handleUserInteraction}
              style={{
                background: 'rgba(255, 215, 0, 0.9)',
                color: '#1a1a1a',
                border: 'none',
                padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
                borderRadius: 'clamp(15px, 4vw, 20px)',
                fontSize: 'clamp(12px, 3vw, 16px)',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                transition: 'all 0.3s ease',
                minWidth: 'clamp(100px, 25vw, 150px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Click Here! ✨
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
