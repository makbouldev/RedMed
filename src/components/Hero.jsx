import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/hero1.png",
    title: "Style Sans Limites",
    subtitle: "REDMED ZR / LA COLLECTION ICONIQUE",
    cta: "Découvrir la Collection",
    link: "#legacy-capsule"
  },
  {
    image: "/hero2.png",
    title: "L'Essence du Streetwear",
    subtitle: "UN CONFORT ABSOLU AU QUOTIDIEN",
    cta: "Explorer l'Édition",
    link: "#nates-edit"
  }
];

export default function Hero({ onHeroCtaClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-container">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="hero-slide"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: idx === currentSlide ? 0.75 : 0,
            zIndex: idx === currentSlide ? 1 : 0
          }}
        >
          <div className="hero-overlay" />
        </div>
      ))}

      <div className="hero-content">
        <p className="hero-subtitle animate-fade-in">
          {slides[currentSlide].subtitle}
        </p>
        <h1 className="hero-title animate-slide-up" key={currentSlide}>
          {slides[currentSlide].title}
        </h1>
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (onHeroCtaClick) {
                const collectionName = slides[currentSlide].link === "#legacy-capsule" ? "all" : "nate";
                onHeroCtaClick(collectionName);
              }
            }} 
            className="btn-pill btn-white"
          >
            {slides[currentSlide].cta} <ChevronRight size={16} style={{ marginLeft: "0.5rem" }} />
          </button>
        </div>
      </div>

      {/* Down arrow scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer"
        }}
        onClick={() => {
          const shopSec = document.getElementById("shop");
          if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span>Défiler vers le bas</span>
        <div
          style={{
            width: "1px",
            height: "40px",
            backgroundColor: "rgba(255,255,255,0.4)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              backgroundColor: "white",
              animation: "scrollDownIndicator 2s infinite ease-in-out"
            }}
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollDownIndicator {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}} />
    </section>
  );
}
