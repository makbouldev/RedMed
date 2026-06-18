import React from "react";
import { ArrowRight } from "lucide-react";

export default function PrintingServiceSection({ onOpenDetail }) {
  return (
    <section className="ps-banner" id="printing-service">
      {/* Background image */}
      <div className="ps-banner-bg" style={{ backgroundImage: "url(/bg_printing.png)" }} />
      {/* Dark overlay */}
      <div className="ps-banner-overlay" />

      {/* Content */}
      <div className="ps-banner-content">
        <span className="ps-banner-eyebrow">Service Exclusif RedMed</span>
        <h2 className="ps-banner-title">
          Impression Personnalisée<br />
          <em>sur vos Pièces</em>
        </h2>
        <p className="ps-banner-desc">
          Logo, artwork ou texte — on imprime tout sur nos t-shirts oversized,
          hoodies et accessoires. Qualité professionnelle, rendu luxe.
        </p>
        <button className="ps-banner-btn" onClick={onOpenDetail} id="printing-cta-btn">
          Découvrir le Service
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
