import React, { useState } from "react";
import { X, Printer, Upload, Palette, Clock, Phone, MessageCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const steps = [
  { num: "01", title: "Choisis ta pièce", desc: "T-shirt oversized, hoodie, cap — sélectionne le vêtement de ton choix dans notre catalogue." },
  { num: "02", title: "Envoie ton design", desc: "Partage ton logo, artwork ou texte via WhatsApp ou email. On accepte PNG, PDF, AI, PSD." },
  { num: "03", title: "Validation du bon à tirer", desc: "On te prépare un aperçu avant impression. Tu valides avant qu'on lance la prod." },
  { num: "04", title: "Impression & Livraison", desc: "Impression en 5–7 jours ouvrables. Livraison partout au Maroc." },
];

const techniques = [
  {
    name: "DTG (Direct to Garment)",
    desc: "Impression jet d'encre directe sur tissu. Idéale pour designs multicolores complexes et petites séries.",
    best: "Designs photo-réalistes, dégradés, illustrations détaillées",
    minQty: "1 pièce minimum",
    price: "À partir de 80 DH / pièce",
  },
  {
    name: "Sérigraphie",
    desc: "Impression par pochoir avec encres spéciales. Rendu ultra-net, durable, idéale pour logos simples.",
    best: "Logos, textes, designs 1–4 couleurs",
    minQty: "10 pièces minimum",
    price: "À partir de 50 DH / pièce",
  },
  {
    name: "Broderie",
    desc: "Ton logo brodé directement sur la pièce. Effet premium, durable, haut de gamme.",
    best: "Logos, initiales, patches",
    minQty: "5 pièces minimum",
    price: "À partir de 120 DH / pièce",
  },
];

const faqs = [
  { q: "Quels formats de fichiers acceptez-vous ?", a: "On accepte PNG (300 dpi min), PDF, AI, PSD, SVG. Si t'as pas le bon format, notre équipe peut t'aider à le préparer." },
  { q: "C'est quoi le délai de livraison ?", a: "5 à 7 jours ouvrables après validation du bon à tirer. Pour les commandes urgentes, contacte-nous pour un traitement prioritaire." },
  { q: "Peut-on imprimer sur nos propres vêtements ?", a: "Oui ! Tu peux nous amener tes propres pièces (t-shirts, hoodies...) et on les imprime pour toi." },
  { q: "Comment obtenir un devis ?", a: "Envoie-nous un message sur WhatsApp avec ton design, la quantité et le type de vêtement. Devis gratuit en moins de 24h." },
];

export default function PrintingDetailPage({ onClose }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div className="printing-detail-overlay" onClick={onClose}>
      <div
        className="printing-detail-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="printing-detail-close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {/* Hero */}
        <div className="printing-detail-hero">
          <div className="printing-detail-hero-bg" style={{ backgroundImage: "url(/bg_printing.png)" }} />
          <div className="printing-detail-hero-overlay" />
          <div className="printing-detail-hero-content">
            <span className="printing-detail-label">RedMed Custom Studio</span>
            <h1 className="printing-detail-title">Service Impression<br /><em>Personnalisée</em></h1>
            <p className="printing-detail-subtitle">
              Transforme n'importe quelle pièce RedMed en une création unique.<br />
              Ton logo, ton design, ton identité — imprimé avec précision.
            </p>
            <div className="printing-detail-hero-btns">
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="printing-detail-whatsapp-btn"
              >
                <MessageCircle size={16} />
                Demander un devis WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="printing-detail-body">

          {/* Steps */}
          <div className="printing-detail-section">
            <h2 className="printing-detail-section-title">Comment ça marche ?</h2>
            <div className="printing-steps-grid">
              {steps.map((step) => (
                <div key={step.num} className="printing-step-card">
                  <div className="printing-step-num">{step.num}</div>
                  <h3 className="printing-step-title">{step.title}</h3>
                  <p className="printing-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Techniques */}
          <div className="printing-detail-section printing-detail-section--dark">
            <h2 className="printing-detail-section-title printing-detail-section-title--light">
              Nos Techniques d'Impression
            </h2>
            <div className="printing-techniques-grid">
              {techniques.map((tech) => (
                <div key={tech.name} className="printing-tech-card">
                  <h3 className="printing-tech-name">{tech.name}</h3>
                  <p className="printing-tech-desc">{tech.desc}</p>
                  <div className="printing-tech-meta">
                    <div><span className="printing-tech-meta-label">Idéal pour :</span> {tech.best}</div>
                    <div><span className="printing-tech-meta-label">Quantité min :</span> {tech.minQty}</div>
                    <div className="printing-tech-price">{tech.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload file CTA */}
          <div className="printing-detail-section printing-upload-cta">
            <div className="printing-upload-icon-wrap">
              <Upload size={32} />
            </div>
            <h2 className="printing-detail-section-title" style={{ marginBottom: "0.5rem" }}>
              Prêt à créer ta pièce unique ?
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem auto" }}>
              Envoie-nous ton design via WhatsApp ou contacte notre équipe. On s'occupe du reste.
            </p>
            <div className="printing-upload-btns">
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="printing-upload-btn-primary"
              >
                <MessageCircle size={16} />
                WhatsApp — Envoyer mon design
              </a>
              <a
                href="tel:+212600000000"
                className="printing-upload-btn-secondary"
              >
                <Phone size={16} />
                Appeler l'équipe
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="printing-detail-section">
            <h2 className="printing-detail-section-title">Questions Fréquentes</h2>
            <div className="printing-faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="printing-faq-item">
                  <button
                    className="printing-faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    {expandedFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedFaq === idx && (
                    <div className="printing-faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
