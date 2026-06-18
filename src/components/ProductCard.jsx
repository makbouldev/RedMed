import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ChevronLeft, ChevronRight, ShoppingBag, X } from "lucide-react";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [added, setAdded] = useState(false);

  const images = [product.image, product.hoverImage].filter(Boolean);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddWithSize = (e, sizeObj) => {
    e.stopPropagation();
    if (sizeObj.stock <= 0) return;
    addToCart(product, sizeObj.size);
    setShowSizePicker(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBtnClick = (e) => {
    e.stopPropagation();
    // If only one size (e.g. OS), add directly
    if (product.sizes.length === 1) {
      handleAddWithSize(e, product.sizes[0]);
    } else {
      setShowSizePicker((prev) => !prev);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-img-wrapper">
        {/* Product Tag */}
        {product.tag && <span className="product-tag">{product.tag}</span>}

        {/* Product Images Slider */}
        <img
          src={images[currentImgIdx]}
          alt={`${product.name} - view ${currentImgIdx + 1}`}
          className="product-card-img"
          onClick={() => onQuickView(product)}
          style={{ cursor: "pointer" }}
        />

        {/* Slide Controls */}
        {images.length > 1 && (
          <>
            <button className="slide-arrow arrow-left" onClick={prevImage} aria-label="Previous image">
              <ChevronLeft size={16} />
            </button>
            <button className="slide-arrow arrow-right" onClick={nextImage} aria-label="Next image">
              <ChevronRight size={16} />
            </button>

            {/* Pagination Dots */}
            <div className="product-card-dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`product-dot ${idx === currentImgIdx ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIdx(idx);
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Hover Size Overlay Selector */}
        <div className="product-size-overlay">
          <span className="product-size-overlay-title">Quick Add to Bag</span>
          <div className="size-selector-row">
            {product.sizes.map((sizeObj, idx) => {
              const isOutOfStock = sizeObj.stock <= 0;
              return (
                <button
                  key={idx}
                  className={`size-btn ${isOutOfStock ? "out-of-stock" : ""}`}
                  disabled={isOutOfStock}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isOutOfStock) addToCart(product, sizeObj.size);
                  }}
                  title={isOutOfStock ? `${sizeObj.size} Out of stock` : `Add size ${sizeObj.size}`}
                >
                  {sizeObj.size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="product-info" onClick={() => onQuickView(product)} style={{ cursor: "pointer" }}>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{product.price}</p>
      </div>

      {/* Add to Cart Button Area */}
      <div className="product-add-area">
        {showSizePicker && (
          <div className="product-inline-sizes">
            <span className="product-inline-sizes-label">Choisir une taille</span>
            <div className="product-inline-sizes-row">
              {product.sizes.map((sizeObj, idx) => {
                const isOutOfStock = sizeObj.stock <= 0;
                return (
                  <button
                    key={idx}
                    className={`inline-size-btn ${isOutOfStock ? "out-of-stock" : ""}`}
                    disabled={isOutOfStock}
                    onClick={(e) => handleAddWithSize(e, sizeObj)}
                    title={isOutOfStock ? `${sizeObj.size} épuisé` : `Taille ${sizeObj.size}`}
                  >
                    {sizeObj.size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          className={`product-add-btn ${added ? "added" : ""}`}
          onClick={handleBtnClick}
          aria-label="Ajouter au panier"
        >
          {added ? (
            <>✓ Ajouté au panier</>
          ) : (
            <>
              <ShoppingBag size={14} />
              Ajouter au panier
            </>
          )}
        </button>
      </div>
    </div>
  );
}
