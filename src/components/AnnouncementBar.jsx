import React from "react";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container announcement-bar-container">
        {/* Left: Social Media Icons using inline SVGs */}
        <div className="announcement-socials">
          <a href="https://www.instagram.com/red_med004/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>

        {/* Center: Promo Message */}
        <div className="announcement-message">
          LIVRAISON PARTOUT AU MAROC — 35 DH
        </div>

        {/* Right: Phone Number using inline SVG */}
        <div className="announcement-phone">
          <a href="tel:+212709302757">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+212 7 09 30 27 57</span>
          </a>
        </div>
      </div>
    </div>
  );
}
