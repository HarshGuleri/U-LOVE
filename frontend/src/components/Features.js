import React from 'react';

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

function Features() {
  return (
    <section className="features" id="features" style={{
      background: '#fff',
      padding: '3.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h2 style={{color: '#e94057', fontWeight: 800, fontSize: '2.2rem', marginBottom: '2.5rem'}}>Why Choose U-Love?</h2>
      <div style={{display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center'}}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, #fff1f7 0%, #ffe3e3 100%)',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 16px rgba(233,64,87,0.08)',
            padding: '2.2rem 2rem',
            minWidth: 240,
            maxWidth: 260,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{f.icon}</div>
            <h3 style={{color: '#e94057', fontWeight: 700, marginBottom: '0.7rem'}}>{f.title}</h3>
            <p style={{color: '#555', fontSize: '1.05rem'}}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
