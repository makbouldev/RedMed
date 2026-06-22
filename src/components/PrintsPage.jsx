import React, { useState } from "react";
import { MessageCircle, Phone, Printer, Upload, Palette, Clock, ChevronDown, ChevronUp, Layers, CheckCircle, Star } from "lucide-react";

const steps = [
  { num: "01", title: "Choisis ta pièce", desc: "T-shirt oversized, hoodie, casquette — sélectionnez le vêtement de votre choix dans notre catalogue." },
  { num: "02", title: "Envoie ton design", desc: "Partagez votre logo, artwork ou texte via WhatsApp ou email. Nous acceptons PNG, PDF, AI, PSD." },
  { num: "03", title: "Validation du bon à tirer", desc: "Nous vous préparons un aperçu numérique. Vous validez le rendu final avant impression." },
  { num: "04", title: "Impression & Livraison", desc: "Impression soignée sous 5 à 7 jours ouvrables et livraison à domicile partout au Maroc." },
];

const realizations = [
  {
    id: 1,
    name: "T-Shirt Oversized / Mova Noir",
    category: "T-Shirts",
    tech: "Impression Directe DTG",
    specs: "Coton premium 280g/m², Impression dos grand format HD",
    image: "/products/tshirts/4b5f9d6062ee114476ac8fafb0d9f19e.jpg",
    waMsg: "Bonjour RedMed, je souhaite personnaliser des T-Shirts en coton lourd noir avec une impression numérique DTG similaire au modèle Mova Noir."
  },
  {
    id: 2,
    name: "Casquette Vintage / Gris Carbone",
    category: "Casquettes",
    tech: "Broderie Premium Relief 3D",
    specs: "Attache métallique ajustable, Broderie fil blanc haute densité",
    image: "/products/accesoires/99aa76dcfe44c48c4530a5f6a9bbb142.jpg",
    waMsg: "Bonjour RedMed, je souhaite faire personnaliser des casquettes Gris Carbone avec une broderie relief 3D de mon logo."
  },
  {
    id: 3,
    name: "T-Shirt Oversized / Stitch Noir",
    category: "T-Shirts",
    tech: "Impression Effet Vintage",
    specs: "Coton super lourd 300g/m², Traitement délavé à l'acide",
    image: "/products/tshirts/7867b390d8362cc9e17da155d63b3743.jpg",
    waMsg: "Bonjour RedMed, je suis intéressé(e) par la personnalisation de T-shirts sur coton délavé vintage de 300g."
  },
  {
    id: 4,
    name: "Casquette Retro / Vert Forêt",
    category: "Casquettes",
    tech: "Broderie Flat-Stitch",
    specs: "Coton sergé délavé, Broderie logo compacte de précision",
    image: "/products/accesoires/4a129340e274be2960be95e0682d3630.jpg",
    waMsg: "Bonjour RedMed, je souhaite personnaliser des casquettes vert forêt rétro avec mon logo en broderie classique."
  },
  {
    id: 5,
    name: "T-Shirt / Inspiration Blanc",
    category: "T-Shirts",
    tech: "Impression Numérique HD",
    specs: "Coton peigné 280g/m², Impression poitrine haute fidélité",
    image: "/products/tshirts/54109f437ad424782261735ce21a5508.jpg",
    waMsg: "Bonjour RedMed, je souhaite imprimer mon visuel sur des t-shirts oversized blancs premium."
  },
  {
    id: 6,
    name: "Casquette Vintage / Noir Délavé",
    category: "Casquettes",
    tech: "Broderie Relief",
    specs: "Coton 6 panneaux délavé, Broderie ton-sur-ton ou contrastée",
    image: "/products/accesoires/24c379891bd0e28d042dc1be2666d95e.jpg",
    waMsg: "Bonjour RedMed, je souhaite commander des casquettes vintage noires personnalisées avec broderie."
  }
];

const reviews = [
  {
    id: 1,
    name: "Yassine B.",
    city: "Casablanca",
    rating: 5,
    type: "T-Shirts Personnalisés",
    text: "Impression de t-shirts oversized pour ma marque streetwear. Qualité de coton incroyable et impression DTG super fidèle. Je recommande vivement !",
    date: "Il y a 2 semaines"
  },
  {
    id: 2,
    name: "Kenza T.",
    city: "Marrakech",
    rating: 5,
    type: "Casquettes Brodées",
    text: "J'ai commandé des casquettes brodées en petite série. La broderie 3D relief est d'une précision incroyable. Très réactifs sur WhatsApp !",
    date: "Il y a 1 mois"
  },
  {
    id: 3,
    name: "Amine R.",
    city: "Rabat",
    rating: 5,
    type: "Sweats & Sérigraphie",
    text: "Super service d'impression. Le bon à tirer numérique a permis d'ajuster le design avant la sérigraphie. Équipe professionnelle.",
    date: "Il y a 3 semaines"
  }
];

const faqs = [
  { q: "Quels formats de fichiers acceptez-vous ?", a: "Nous acceptons les formats PNG haute résolution (300 dpi minimum), PDF vectoriel, AI (Adobe Illustrator), PSD (Photoshop) et SVG. Notre équipe d'infographie peut vous aider à préparer votre fichier gratuitement." },
  { q: "Quels sont les délais de livraison pour la personnalisation ?", a: "Il faut compter environ 5 à 7 jours ouvrés après la validation du Bon À Tirer (BAT) numérique. En cas d'urgence, contactez-nous pour étudier les possibilités de production prioritaire." },
  { q: "Est-il possible d'imprimer sur mes propres vêtements ?", a: "Oui, tout à fait ! Vous pouvez nous faire parvenir vos propres supports vierges (t-shirts, vestes, sacs...) et nous nous chargeons uniquement de l'impression ou de la broderie." },
  { q: "Comment obtenir un devis personnalisé ?", a: "Le plus simple est de nous envoyer un message sur WhatsApp contenant votre visuel, le support choisi et la quantité souhaitée. Nous vous enverrons un devis gratuit en moins de 24h." },
];

export default function PrintsPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("Tous");

  const filteredRealizations = activeTab === "Tous" 
    ? realizations 
    : realizations.filter(r => r.category === activeTab);

  return (
    <div className="prints-page animate-fade-in">
      {/* Hero Banner */}
      <div className="prints-hero">
        <div className="prints-hero-bg" style={{ backgroundImage: "url(/bg_printing.png)" }} />
        <div className="prints-hero-overlay" />
        <div className="prints-hero-content container">
          <span className="prints-label">Studio de Personnalisation</span>
          <h1 className="prints-title">Impression &amp; Broderie sur Mesure</h1>
          <p className="prints-subtitle">
            Donnez vie à vos idées. Personnalisez nos vêtements premium avec vos logos, illustrations ou textes. Rendus professionnels haut de gamme.
          </p>
          <a
            href="https://wa.me/212709302757"
            target="_blank"
            rel="noopener noreferrer"
            className="prints-whatsapp-btn"
          >
            <MessageCircle size={18} />
            Demander un devis WhatsApp gratuit
          </a>
        </div>
      </div>

      <div className="container">
        {/* Step by Step Section */}
        <section className="prints-section steps-section">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="steps-eyebrow">Processus Simple</span>
            <h2 className="prints-section-title">Comment ça marche ?</h2>
          </div>
          <div className="prints-timeline-grid">
            {steps.map((step, idx) => (
              <div key={step.num} className="prints-timeline-step">
                <div className="prints-step-number-bubble">
                  <span>{step.num}</span>
                </div>
                {idx < steps.length - 1 && <div className="prints-step-timeline-connector" />}
                <div className="prints-step-details">
                  <h3 className="prints-step-title">{step.title}</h3>
                  <p className="prints-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio / Examples Showcase Section */}
        <section className="prints-section realizations-section">
          <div className="realizations-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="realizations-eyebrow">Studio Portfolio</span>
            <h2 className="prints-section-title" style={{ marginBottom: "1rem" }}>Nos Réalisations</h2>
            <p className="realizations-desc" style={{ color: "var(--text-secondary)", fontSize: "0.88rem", maxWidth: "600px", margin: "0 auto" }}>
              Explorez des exemples de créations imprimées et brodées au sein de notre atelier de Casablanca.
            </p>
            
            {/* Filter Tabs */}
            <div className="portfolio-tabs" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
              {["Tous", "T-Shirts", "Casquettes"].map(tab => (
                <button
                  key={tab}
                  className={`portfolio-tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "30px",
                    fontSize: "0.78rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    border: "1px solid var(--border-color)",
                    backgroundColor: activeTab === tab ? "var(--text-primary)" : "transparent",
                    color: activeTab === tab ? "var(--bg-secondary)" : "var(--text-primary)",
                    transition: "var(--transition-fast)"
                  }}
                >
                  {tab === "Tous" ? "Tous" : tab === "T-Shirts" ? "T-Shirts" : "Casquettes / Caps"}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Realizations */}
          <div className="realizations-grid">
            {filteredRealizations.map(item => (
              <div key={item.id} className="realization-card">
                <div className="realization-img-wrapper">
                  <img src={item.image} alt={item.name} className="realization-img" />
                  <span className="realization-tech-badge">{item.tech}</span>
                </div>
                <div className="realization-info">
                  <h3 className="realization-name">{item.name}</h3>
                  <p className="realization-specs">{item.specs}</p>
                  <a
                    href={`https://wa.me/212709302757?text=${encodeURIComponent(item.waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="realization-wa-btn"
                  >
                    <MessageCircle size={14} /> Personnaliser ce modèle
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="prints-section reviews-section">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="reviews-eyebrow">Avis &amp; Retours</span>
            <h2 className="prints-section-title">Ce que disent nos clients</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", maxWidth: "600px", margin: "0.5rem auto 0 auto" }}>
              La satisfaction de nos clients est notre priorité. Découvrez les avis de créateurs et marques qui nous font confiance.
            </p>
          </div>

          <div className="reviews-grid">
            {reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-header">
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#ffc107" color="#ffc107" />
                    ))}
                  </div>
                  <span className="review-date">{rev.date}</span>
                </div>
                <p className="review-text">"{rev.text}"</p>
                <div className="review-footer">
                  <div className="review-author-info">
                    <span className="review-author-name">{rev.name}</span>
                    <span className="review-author-details">{rev.city} • <span className="review-badge-tech">{rev.type}</span></span>
                  </div>
                  <div className="review-verified">
                    <CheckCircle size={14} style={{ color: "var(--success-color)", marginRight: "0.25rem" }} />
                    <span>Vérifié</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action */}
        <section className="prints-section prints-cta">
          <div className="prints-cta-icon">
            <Upload size={36} />
          </div>
          <h2 className="prints-cta-title">Prêt à lancer votre création ?</h2>
          <p className="prints-cta-desc">
            Envoyez-nous vos fichiers et vos idées directement par WhatsApp ou appelez notre atelier pour en discuter.
          </p>
          <div className="prints-cta-buttons">
            <a
              href="https://wa.me/212709302757"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-dark"
            >
              <MessageCircle size={16} style={{ marginRight: "0.5rem" }} /> Envoyer mon visuel
            </a>
            <a href="tel:+212709302757" className="btn-pill btn-white">
              <Phone size={16} style={{ marginRight: "0.5rem" }} /> Parler à l'équipe
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="prints-section">
          <h2 className="prints-section-title">Questions Fréquentes</h2>
          <div className="prints-faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="prints-faq-item">
                <button
                  className="prints-faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  {expandedFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedFaq === idx && (
                  <div className="prints-faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
