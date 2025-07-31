import React from 'react';
import heroImg from '../assets/hero.png';

function CoupleShowcase() {
  return (
    <section className="couple-showcase" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3rem',
      padding: '3.5rem 1rem',
      background: 'linear-gradient(135deg, #fff1f7 0%, #ffe3e3 100%)',
      flexWrap: 'wrap',
    }}>
      <div style={{flex: 1, minWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img src={heroImg} alt="Happy Couple" style={{width: '100%', maxWidth: 380, borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.10)'}} />
      </div>
      <div style={{flex: 1, minWidth: 320, background: '#fff', borderRadius: '1.5rem', boxShadow: '0 4px 16px rgba(233,64,87,0.08)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 style={{color: '#e94057', fontWeight: 800, fontSize: '2rem', marginBottom: '1.2rem', textAlign: 'center'}}>Start Something Beautiful</h2>
        <p style={{color: '#555', fontSize: '1.15rem', marginBottom: '1.5rem', textAlign: 'center'}}>
          Discover real people, real stories, and real love. <br />
          <span style={{color: '#e94057', fontWeight: 600}}>&ldquo;We met on U-Love and now we’re inseparable!&rdquo;</span>
        </p>
        <div style={{fontStyle: 'italic', color: '#888', fontSize: '1rem', textAlign: 'center'}}>
          — Priya & Aarav, together since 2024
        </div>
      </div>
    </section>
  );
}

export default CoupleShowcase;
