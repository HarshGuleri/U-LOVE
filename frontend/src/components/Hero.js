import React from 'react';
import heroImg from '../assets/hero.png';

function Hero() {
  return (
    <section className="hero" style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ffe3e3 0%, #fff1f7 100%)',
      padding: '3rem 1rem 2rem 1rem',
      position: 'relative',
      overflow: 'hidden',
      gap: '3rem',
      flexWrap: 'wrap',
    }}>
      <div style={{flex: 1, minWidth: 320, zIndex: 2}}>
        <h1 style={{fontSize: '2.8rem', fontWeight: 800, color: '#e94057', marginBottom: '1.2rem', lineHeight: 1.1}}>
          Find your Forever <span role="img" aria-label="heart">❤️</span>
        </h1>
        <p style={{fontSize: '1.25rem', color: '#444', marginBottom: '2.2rem', fontWeight: 500}}>
          U-Love is the beautiful platform to match hearts and start real stories.
        </p>
        <button style={{
          background: 'linear-gradient(90deg, #e94057 0%, #ff6a88 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '1.5rem',
          padding: '1.1rem 2.5rem',
          fontWeight: 700,
          fontSize: '1.2rem',
          boxShadow: '0 2px 16px rgba(233,64,87,0.10)',
          cursor: 'pointer',
          letterSpacing: '1px',
        }}>
          Start Your Journey
        </button>
      </div>
      <div style={{flex: 1, minWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1}}>
        <img src={heroImg} alt="Romantic couple" style={{width: '100%', maxWidth: 400, borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.10)'}} />
      </div>
    </section>
  );
}

export default Hero;
