import React from 'react';
import heroImg from '../assets/hero.png';

function TinderPromo() {
  return (
    <section className="promo" id="promo" style={{
      background: 'linear-gradient(90deg, #e94057 0%, #ff6a88 100%)',
      padding: '3.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3rem',
      flexWrap: 'wrap',
    }}>
      <div style={{flex: 1, minWidth: 320, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
        <h2 style={{fontWeight: 800, fontSize: '2.2rem', marginBottom: '1.2rem'}}>Download Our Tinder-Style App</h2>
        <p style={{fontSize: '1.15rem', marginBottom: '2rem', fontWeight: 500}}>
          Swipe, match, and fall in love instantly—anywhere, anytime.
        </p>
        <button style={{
          background: '#fff',
          color: '#e94057',
          border: 'none',
          borderRadius: '1.5rem',
          padding: '1.1rem 2.5rem',
          fontWeight: 700,
          fontSize: '1.2rem',
          boxShadow: '0 2px 16px rgba(255,255,255,0.10)',
          cursor: 'pointer',
          letterSpacing: '1px',
        }}>
          Download Now
        </button>
      </div>
      <div style={{flex: 1, minWidth: 220, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img src={heroImg} alt="App Mockup" style={{width: '100%', maxWidth: 220, borderRadius: '2rem', boxShadow: '0 8px 32px rgba(0,0,0,0.10)'}} />
      </div>
    </section>
  );
}

export default TinderPromo;
