import React, { useEffect, useState } from 'react';
import './letter-page.css';

interface LetterPageProps {
  onClose?: () => void;
}

export default function LetterPage({ onClose }: LetterPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const letterContent = [
    "My Dearest Babii,",
    "Today is all about celebrating you the incredible person who brings so much joy, love, and light into my life. I feel so lucky to call you mine. You've shown me what true love feels like, and every day with you is a beautiful adventure.",
    "I love everything about you your smile, your laugh, your strength, your kindness. You make me feel safe, supported, and deeply loved.",
    "I'm so proud of the person you are and everything you're becoming. You're not just my partner, you're my best friend, my confidant, and my soulmate. I love you more than words can say, and I'm so grateful for every moment we share.",
    "On your special day, I just want to say thank you. Thank you for being you. Thank you for letting me love you. And thank you for loving me right back. You are my today, my tomorrow, and my forever. My heart beats only for you.",
    "Forever Yours,",
    "With All My Love ❤️"
  ];

  useEffect(() => {
    // Fade in effect
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Typewriter effect for paragraphs
    const paragraphTimer = setInterval(() => {
      setCurrentParagraph(prev => {
        if (prev < letterContent.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(paragraphTimer);
    };
  }, []);

  return (
    <div className={`letter-page ${isVisible ? 'visible' : ''}`}>
      <div className="letter-background">
        <div className="floating-hearts">
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
        
        <div className="letter-container">
          <div className="letter-paper">
            <div className="letter-header">
              <div className="rose-decoration">🌹</div>
              <h1 className="letter-title">A Letter for My Love</h1>
              <div className="rose-decoration">🌹</div>
            </div>
            
            <div className="letter-content">
              {letterContent.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`letter-paragraph ${index <= currentParagraph ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="letter-footer">
              <div className="heart-divider">💕</div>
              <p className="date">Today & Always</p>
            </div>
          </div>
        </div>
        
        {onClose && (
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
