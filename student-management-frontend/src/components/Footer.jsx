import React from 'react';
import '../Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col left">
        <h3>StudentApp</h3>
        <p>One App. Every Student Need.</p>
      </div>

      <div className="footer-col center">
        <ul>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </div>

      <div className="footer-col right">
        <p>&copy; {new Date().getFullYear()} StudentApp</p>
      </div>
    </footer>
  );
};

