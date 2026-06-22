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
            <img src="/logo.png" alt="REDMED" className="footer-logo-img" />
            <p className="footer-desc">
              Streetwear moderne et premium, créant des basiques de qualité et des capsules exclusives. Des silhouettes axées sur le design, conçues pour un style durable.
            </p>
            <div className="flex" style={{ gap: "1rem", marginTop: "0.5rem" }}>
              <a href="https://www.instagram.com/red_med004/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#aaaaaa" }}>
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Collection Links */}
          <div>
            <h4 className="footer-title">Collections</h4>
            <ul className="footer-links">
              <li><a href="#nates-edit">Edition REDMED</a></li>
              <li><a href="#shop">Nouveautés</a></li>
              <li><a href="#shop">Accessoires</a></li>
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="footer-title">Service Client</h4>
            <ul className="footer-links">
              <li><a href="#">Expédition &amp; Livraison</a></li>
              <li><a href="#">Retours &amp; Échanges</a></li>
              <li><a href="#">Guide des Tailles</a></li>
              <li><a href="#">Contactez-nous</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="footer-title">Rejoindre le Club</h4>
            <p className="footer-newsletter-text">
              Inscrivez-vous pour bénéficier d'un accès anticipé aux collections, aux capsules exclusives et aux événements.
            </p>
            <form onSubmit={handleSubscribe} className="footer-input-group">
              <input
                type="email"
                className="footer-input"
                placeholder="Votre adresse e-mail"
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
            &copy; {new Date().getFullYear()} <span>REDMED</span> Apparel. Tous droits réservés.
          </div>
          <div>
            Créé avec React JS &amp; Vanilla CSS.
          </div>
        </div>
      </div>
    </footer>
  );
}
