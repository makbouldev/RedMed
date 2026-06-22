import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage({ isSection = false }) {
  const { addToast } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      addToast("Votre message a été envoyé avec succès ! Notre équipe vous répondra sous 24 heures.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  if (isSection) {
    return (
      <div className="contact-section-container container animate-fade-in">
        <div className="contact-section-card" style={{ maxWidth: "680px", margin: "0 auto" }}>
          <h3 className="contact-section-title-small" style={{ textAlign: "center", marginBottom: "2rem" }}>Envoyer un Message</h3>
          <form onSubmit={handleSubmit} className="contact-section-form-inputs">
            <div className="form-row-two">
              <div className="form-input-group">
                <label htmlFor="sec-contact-name">Nom complet *</label>
                <input
                  type="text"
                  id="sec-contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div className="form-input-group">
                <label htmlFor="sec-contact-email">Adresse e-mail *</label>
                <input
                  type="email"
                  id="sec-contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                />
              </div>
            </div>

            <div className="form-input-group">
              <label htmlFor="sec-contact-subject">Sujet *</label>
              <input
                type="text"
                id="sec-contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Sujet de votre message"
                required
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="sec-contact-message">Message *</label>
              <textarea
                id="sec-contact-message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Écrivez votre message ici..."
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-pill btn-dark form-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Envoi en cours...</>
              ) : (
                <>
                  <Send size={16} style={{ marginRight: "0.5rem" }} /> Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`contact-page animate-fade-in ${isSection ? "contact-page--section" : ""}`} style={isSection ? { paddingTop: 0, paddingBottom: 0 } : {}}>
      <div className="container">
        {/* Header */}
        {!isSection && (
          <div className="contact-hero">
            <span className="contact-eyebrow">Service Relation Client</span>
            <h1 className="contact-main-title">Contactez-nous</h1>
            <p className="contact-subtitle">
              Une question sur un article, une commande ou un projet de personnalisation ? Notre service client est disponible 24/7 pour vous assister.
            </p>
          </div>
        )}

        <div className="contact-grid">
          {/* Information cards */}
          <div className="contact-info-column">
            <h2 className="contact-info-title">Nos Coordonnées</h2>
            
            <div className="contact-cards-stack">
              <div className="contact-info-card">
                <MapPin className="contact-card-icon" size={24} />
                <div className="contact-card-text">
                  <h4>Siège Social</h4>
                  <p>56, Avenue Mers Sultan - Casablanca, Maroc</p>
                </div>
              </div>

              <div className="contact-info-card">
                <Phone className="contact-card-icon" size={24} />
                <div className="contact-card-text">
                  <h4>Téléphone &amp; Urgences</h4>
                  <p>+212 7 09 30 27 57</p>
                </div>
              </div>

              <div className="contact-info-card">
                <Mail className="contact-card-icon" size={24} />
                <div className="contact-card-text">
                  <h4>E-mail</h4>
                  <p>contact@redmedapparel.ma</p>
                  <p>support@redmedapparel.ma</p>
                </div>
              </div>

              <div className="contact-info-card">
                <Clock className="contact-card-icon" size={24} />
                <div className="contact-card-text">
                  <h4>Horaires</h4>
                  <p>Notre site internet est accessible 24h/24 et 7j/7.</p>
                  <p>Atelier d'impression : Lun - Ven (09:00 - 18:00)</p>
                </div>
              </div>
            </div>

            <div className="contact-quick-cta">
              <h4>Besoin d'une réponse immédiate ?</h4>
              <p>Envoyez-nous un message instantané directement via WhatsApp.</p>
              <a 
                href="https://wa.me/212709302757" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-whatsapp-btn"
              >
                <MessageCircle size={18} /> Chat WhatsApp direct
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-column">
            <h2 className="contact-info-title">Envoyer un Message</h2>
            
            <form onSubmit={handleSubmit} className="contact-premium-form">
              <div className="form-row-two">
                <div className="form-input-group">
                  <label htmlFor="contact-name">Nom complet *</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                
                <div className="form-input-group">
                  <label htmlFor="contact-email">Adresse e-mail *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email"
                    required
                  />
                </div>
              </div>

              <div className="form-input-group">
                <label htmlFor="contact-subject">Sujet *</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Écrivez votre message ici..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-pill btn-dark form-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Envoi en cours...</>
                ) : (
                  <>
                    <Send size={16} style={{ marginRight: "0.5rem" }} /> Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
