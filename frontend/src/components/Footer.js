import React from 'react';

function Footer() {
  return (
    <footer id="subscribe" style={{
      background: '#fff',
      padding: '3rem 1rem 2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderTop: '1px solid #f3d6e0',
      marginTop: '2rem',
    }}>
      <h3 style={{color: '#e94057', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem'}}>Subscribe for Updates</h3>
      <form style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center'}}>
        <input type="email" placeholder="Your Email" style={{padding: '0.9rem 1.2rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', outline: 'none', minWidth: 220}} />
        <button style={{background: 'linear-gradient(90deg, #e94057 0%, #ff6a88 100%)', color: '#fff', border: 'none', borderRadius: '1rem', padding: '0.9rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer'}}>Subscribe</button>
      </form>
      <p style={{color: '#aaa', fontSize: '0.98rem', marginTop: '1.5rem'}}>&copy; 2025 U-Love. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
