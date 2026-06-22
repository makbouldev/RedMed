import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { ArrowLeft, ShoppingBag, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function ProductDetailPage({ product, onBack }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(product.image);
  const [isAdded, setIsAdded] = useState(false);
  const [expandedSection, setExpandedSection] = useState("details"); // "details" | "shipping" | null

  // Keep active image in sync when product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize("");
    setExpandedSection("details");
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToCart(product, ""); // Trigger size selection warning toast
      return;
    }
    const success = addToCart(product, selectedSize);
    if (success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const getWhatsAppLink = () => {
    const phoneNumber = "212709302757"; // WhatsApp phone number
    const message = `Bonjour RedMed, je souhaite commander l'article suivant :
- Produit : ${product.name}
- Prix : ${product.price}
- Taille : ${selectedSize || "Non spécifiée"}
- Lien : ${window.location.href}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // Find related products in the same category (excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const toggleSection = (sectionName) => {
    setExpandedSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const handleCategoryBreadcrumb = (e, cat) => {
    e.preventDefault();
    window.location.hash = "#/catalog";
    // We will set this categories hash in URL or trigger filters.
    // For simplicity, navigating to catalog works.
  };

  return (
    <div className="product-detail-page animate-fade-in">
      <div className="container">
        {/* Breadcrumbs / Back navigation */}
        <div className="breadcrumb-nav flex align-center justify-between">
          <div className="breadcrumb-crumbs">
            <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; }}>Accueil</a>
            <span className="breadcrumb-separator">/</span>
            <a href="#/catalog" onClick={(e) => { e.preventDefault(); window.location.hash = "#/catalog"; }}>Catalogue</a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
          <button className="breadcrumb-back flex align-center" onClick={onBack}>
            <ArrowLeft size={14} style={{ marginRight: "0.5rem" }} /> Retour au Catalogue
          </button>
        </div>

        {/* Product Layout Grid */}
        <div className="product-layout-grid">
          {/* Gallery Column */}
          <div className="product-detail-gallery">
            <div className="product-detail-main-img-wrapper">
              {product.tag && <span className="product-detail-tag">{product.tag}</span>}
              <img 
                src={activeImage} 
                alt={product.name} 
                className="product-detail-main-img"
              />
            </div>
            
            {product.hoverImage && (
              <div className="product-detail-thumbs">
                <img 
                  src={product.image} 
                  alt={`${product.name} vue frontale`} 
                  className={`product-detail-thumb-img ${activeImage === product.image ? "active" : ""}`}
                  onClick={() => setActiveImage(product.image)}
                />
                <img 
                  src={product.hoverImage} 
                  alt={`${product.name} vue détail`} 
                  className={`product-detail-thumb-img ${activeImage === product.hoverImage ? "active" : ""}`}
                  onClick={() => setActiveImage(product.hoverImage)}
                />
              </div>
            )}
          </div>

          {/* Details & Actions Column */}
          <div className="product-detail-info">
            <span className="product-detail-brand">RedMed Streetwear Collective</span>
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-price">{product.price}</div>
            
            <p className="product-detail-desc">{product.description}</p>

            {/* Sizing Grid */}
            <div className="product-detail-sizes-section">
              <div className="flex justify-between align-center" style={{ marginBottom: "0.75rem" }}>
                <span className="product-detail-sizes-label">Choisir une Taille</span>
                {selectedSize && (
                  <span className="product-detail-selected-size">Taille sélectionnée : <strong>{selectedSize}</strong></span>
                )}
              </div>
              <div className="product-detail-size-grid">
                {product.sizes.map((sizeObj, idx) => {
                  const isOutOfStock = sizeObj.stock <= 0;
                  const isSelected = selectedSize === sizeObj.size;

                  return (
                    <button
                      key={idx}
                      className={`product-detail-size-btn ${isSelected ? "selected" : ""} ${isOutOfStock ? "out-of-stock" : ""}`}
                      onClick={() => !isOutOfStock && setSelectedSize(sizeObj.size)}
                      disabled={isOutOfStock}
                    >
                      {sizeObj.size}
                      {isOutOfStock && <span className="out-of-stock-diagonal"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase CTA Actions */}
            <div className="product-detail-actions flex">
              <button 
                className={`btn-pill btn-dark product-detail-add-btn ${isAdded ? "added" : ""}`}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} style={{ marginRight: "0.75rem" }} />
                {isAdded ? "Ajouté ✓" : "Ajouter au Panier"}
              </button>
              
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="product-detail-whatsapp-btn"
              >
                <MessageCircle size={18} />
                Commander via WhatsApp
              </a>
            </div>

            {/* Product Metadata / Tech details Accordion */}
            <div className="product-detail-accordion">
              <div className="product-detail-accordion-item">
                <button 
                  className="product-detail-accordion-header"
                  onClick={() => toggleSection("details")}
                >
                  <span>Composition &amp; Entretien</span>
                  {expandedSection === "details" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === "details" && (
                  <div className="product-detail-accordion-body">
                    <ul className="product-detail-bullet-list">
                      {product.details ? (
                        product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))
                      ) : (
                        <>
                          <li>Coton de qualité supérieure peigné</li>
                          <li>Lavage en machine à froid (30°C)</li>
                          <li>Ne pas utiliser d'agent de blanchiment</li>
                          <li>Séchage en tambour interdit</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="product-detail-accordion-item">
                <button 
                  className="product-detail-accordion-header"
                  onClick={() => toggleSection("shipping")}
                >
                  <span>Livraison &amp; Retours</span>
                  {expandedSection === "shipping" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === "shipping" && (
                  <div className="product-detail-accordion-body">
                    <p style={{ marginBottom: "0.5rem" }}>
                      <strong>Livraison partout au Maroc :</strong> Expédition express sous 24 à 48h sur Casablanca et 3 à 5 jours dans les autres villes.
                    </p>
                    <p>
                      <strong>Retours &amp; Échanges :</strong> Gratuits sous un délai de 7 jours après réception si l'article est non porté et conserve ses étiquettes d'origine.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-products-title">Vous aimerez aussi</h2>
            <div className="related-products-grid">
              {relatedProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="related-product-card"
                  onClick={() => {
                    window.location.hash = `#/product/${prod.id}`;
                  }}
                >
                  <div className="related-product-img-wrapper">
                    <img src={prod.image} alt={prod.name} className="related-product-img" />
                    {prod.tag && <span className="related-product-tag">{prod.tag}</span>}
                  </div>
                  <div className="related-product-info">
                    <h3 className="related-product-name">{prod.name}</h3>
                    <p className="related-product-price">{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
