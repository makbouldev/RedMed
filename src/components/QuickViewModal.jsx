import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(() => {
    if (product.sizes && product.sizes.length === 1) {
      return product.sizes[0].size;
    }
    return "";
  });
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Accordion state
  const [expandedSection, setExpandedSection] = useState("details"); // "details" | "shipping" | null

  const handleAddToCart = () => {
    if (!selectedSize) {
      // CartContext will handle displaying a toast for no size selected
      addToCart(product, "");
      return;
    }
    const success = addToCart(product, selectedSize);
    if (success) {
      onClose();
    }
  };

  const toggleSection = (sectionName) => {
    setExpandedSection(prev => prev === sectionName ? null : sectionName);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer le dialogue">
          <X size={18} />
        </button>

        <div className="modal-grid">
          {/* Gallery Column */}
          <div className="modal-images">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="modal-main-img"
            />
            {(() => {
              const allImages = product.images || [product.image, product.hoverImage].filter(Boolean);
              if (allImages.length <= 1) return null;
              return (
                <div className="modal-gallery-thumbs">
                  {allImages.map((imgUrl, imgIdx) => (
                    <img 
                      key={imgIdx}
                      src={imgUrl} 
                      alt={`${product.name} thumbnail ${imgIdx}`} 
                      className={`modal-thumb ${activeImage === imgUrl ? "active" : ""}`}
                      onClick={() => setActiveImage(imgUrl)}
                    />
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Details Column */}
          <div className="modal-details">
            <span className="modal-brand">RedMed ZR</span>
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-price">{product.price}</div>
            
            <p className="modal-desc">{product.description}</p>

            {/* Sizing grid */}
            {!(product.sizes && product.sizes.length === 1 && product.sizes[0].size === "TU") && (
              <div className="modal-sizes">
                <h4 className="modal-section-title">Sélectionner la Taille</h4>
                <div className="modal-size-grid">
                  {product.sizes.map((sizeObj, idx) => {
                    const isOutOfStock = sizeObj.stock <= 0;
                    const isSelected = selectedSize === sizeObj.size;

                    return (
                      <button
                        key={idx}
                        className={`modal-size-btn ${isSelected ? "selected" : ""} ${isOutOfStock ? "disabled" : ""}`}
                        onClick={() => !isOutOfStock && setSelectedSize(sizeObj.size)}
                        disabled={isOutOfStock}
                      >
                        {sizeObj.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add button */}
            <button 
              className="btn-pill btn-dark modal-add-btn"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} style={{ marginRight: "0.5rem" }} /> Ajouter au Panier
            </button>

            {/* Accordion detail list */}
            <div className="modal-accordion">
              <div className="modal-accordion-item">
                <button 
                  className="modal-accordion-header" 
                  onClick={() => toggleSection("details")}
                >
                  <span>Détails &amp; Entretien</span>
                  {expandedSection === "details" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === "details" && (
                  <div className="modal-accordion-body">
                    <ul style={{ paddingLeft: "1.2rem", listStyleType: "disc" }}>
                      {product.details.map((detail, idx) => (
                        <li key={idx} style={{ marginBottom: "0.35rem" }}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="modal-accordion-item">
                <button 
                  className="modal-accordion-header" 
                  onClick={() => toggleSection("shipping")}
                >
                  <span>Livraison &amp; Retours</span>
                  {expandedSection === "shipping" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === "shipping" && (
                  <div className="modal-accordion-body">
                    <p style={{ marginBottom: "0.5rem" }}>
                      <strong>Livraison standard gratuite</strong> pour toute commande supérieure à 200 DH.
                    </p>
                    <p>
                      Les retours sont acceptés dans un délai de 30 jours pour échange ou avoir. Les articles doivent être dans leur état d'origine avec les étiquettes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
