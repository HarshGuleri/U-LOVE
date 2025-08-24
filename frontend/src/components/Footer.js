import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="subscribe" className="footer">
      <h3 className="footer-title">Subscribe for Updates</h3>
      <form className="footer-form">
        <input type="email" placeholder="Your Email" className="footer-input" />
        <button className="footer-button">Subscribe</button>
      </form>
      <span className="footer-copyright text-red-800 text-[4vw]">&copy; 2025 U-Love. All rights reserved.</span>
    </footer>
  );
}

export default Footer;
