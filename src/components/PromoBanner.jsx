import React from "react";
import { ChevronRight } from "lucide-react";

export default function PromoBanner({ id, title, subtitle, designer, image, ctaLink }) {
  return (
    <section className="banner-promo" id={id}>
      <div 
        className="banner-promo-bg" 
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="hero-overlay" style={{ opacity: 0.5 }} />
      
      <div className="banner-promo-content">
        <p className="banner-promo-subtitle">
          {subtitle}
        </p>
        <h2 className="banner-promo-title">
          {title}
        </h2>
        {designer && (
          <p style={{ fontSize: "0.75rem", color: "#cccccc", letterSpacing: "0.1em", marginBottom: "2rem" }}>
            Capturé par {designer}
          </p>
        )}
        <div>
          <a href={ctaLink} className="btn-pill btn-white">
            Découvrir la Sélection <ChevronRight size={14} style={{ marginLeft: "0.5rem" }} />
          </a>
        </div>
      </div>
    </section>
  );
}
