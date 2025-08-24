import React from 'react';
import heroImg from '../assets/hero2.jpg';
import heroImg2 from '../assets/hero.png';
import './Landing.css';

const features = [
  {
    icon: '💬',
    title: 'Chat Anytime',
    desc: 'Stay connected 24/7 with instant messaging.'
  },
  {
    icon: '🔒',
    title: 'Safe & Private',
    desc: 'Your privacy and safety are our top priority.'
  },
  {
    icon: '💑',
    title: 'Real Matches',
    desc: 'Find someone who truly gets you.'
  }
];

function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Find your Forever <span role="img" aria-label="heart">❤️</span>
          </h1>
          <p className="hero-description">
            U-Love is the beautiful platform to match hearts and start real stories.
          </p>
          <button className="hero-button">
            Start Your Journey
          </button>
        </div>
        <div className="hero-image-container">
          <img src={heroImg} alt="Romantic couple" className="hero-image" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="features-title">Why Choose U-Love?</h2>
        <div className="features-container">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-description">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Couple Showcase Section */}
      <section className="couple-showcase">
        <div className="couple-image-container">
          <img src={heroImg2} alt="Happy Couple" className="couple-image" />
        </div>
        <div className="couple-content">
          <h2 className="couple-title">Start Something Beautiful</h2>
          <p className="couple-description">
            Discover real people, real stories, and real love. <br />
            <span className="couple-quote">&ldquo;We met on U-Love and now we're inseparable!&rdquo;</span>
          </p>
          <div className="couple-attribution">
            — Priya & Aarav, together since 2024
          </div>
        </div>
      </section>

      {/* Tinder Promo Section */}
      <section className="promo" id="promo">
        <div className="promo-content">
          <h2 className="promo-title">Download Our Tinder-Style App</h2>
          <p className="promo-description">
            Swipe, match, and fall in love instantly—anywhere, anytime.
          </p>
          <button className="promo-button">
            Download Now
          </button>
        </div>
        <div className="promo-image-container">
          <img src={heroImg2} alt="App Mockup" className="promo-image" />
        </div>
      </section>
    </div>
  );
}

export default Landing;
