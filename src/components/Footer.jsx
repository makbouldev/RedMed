import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ArrowRight } from "lucide-react";

// Inline SVG social icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Footer() {
  const { addToast } = useCart();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate signup
    addToast("Subscription successful! Welcome to the Club.");
    setEmail("");
  };

  return (
    <footer className="footer-editorial">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <h3 className="footer-logo">REDMED</h3>
            <p className="footer-desc">
              Premium modern streetwear crafting standard basics and curated capsules. Design-driven silhouettes made for long lasting style.
            </p>
            <div className="flex" style={{ gap: "1rem", marginTop: "0.5rem" }}>
              <a href="#" aria-label="Instagram" style={{ color: "#aaaaaa" }}>
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Twitter" style={{ color: "#aaaaaa" }}>
                <TwitterIcon />
              </a>
              <a href="#" aria-label="Facebook" style={{ color: "#aaaaaa" }}>
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Collection Links */}
          <div>
            <h4 className="footer-title">Collections</h4>
            <ul className="footer-links">
              <li><a href="#legacy-capsule">The Legacy Capsule</a></li>
              <li><a href="#nates-edit">Nate Robinson Edit</a></li>
              <li><a href="#shop">New Arrivals</a></li>
              <li><a href="#shop">Accessories</a></li>
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="footer-title">Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#">Shipping &amp; Delivery</a></li>
              <li><a href="#">Returns &amp; Exchanges</a></li>
              <li><a href="#">Size Guides</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="footer-title">Join the Club</h4>
            <p className="footer-newsletter-text">
              Subscribe to receive early collection access, exclusive capsules, and events.
            </p>
            <form onSubmit={handleSubscribe} className="footer-input-group">
              <input
                type="email"
                className="footer-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-submit-btn" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} <span>REDMED</span> Apparel. All rights reserved.
          </div>
          <div>
            Created with React JS &amp; Vanilla CSS.
          </div>
        </div>
      </div>
    </footer>
  );
}
