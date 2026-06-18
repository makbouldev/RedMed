import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ title, products, onQuickView, id }) {
  return (
    <div className="container products-grid-container" id={id}>
      {title && <h2 className="section-title">{title}</h2>}
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  );
}
