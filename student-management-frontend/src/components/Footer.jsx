import React from 'react';
import '../Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col left">
        <h3>StudentApp</h3>
        <p>One App. Every Student Needs.</p>
      </div>

      <div className="footer-col center">
        <nav aria-label="Footer navigation">
          <ul>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/help">Help</a></li>
          </ul>
        </nav>
      </div>

      <div className="footer-col right">
        <p>&copy; {new Date().getFullYear()} StudentApp</p>
      </div>
    </footer>
  );
};
