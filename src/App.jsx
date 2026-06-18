import React, { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import PromoBanner from "./components/PromoBanner";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import Footer from "./components/Footer";
import FloatingContacts from "./components/FloatingContacts";
import PrintingServiceSection from "./components/PrintingServiceSection";
import PrintingDetailPage from "./components/PrintingDetailPage";
import { products } from "./data/products";
import { X } from "lucide-react";
const categoryMetadata = {
  "T-Shirts": {
    tagline: "HEAVY COTTON / BOX SILHOUETTE",
    image: "/prod_tee_black.png",
    subtext: "Crafted for the ultimate street drape. 280gsm pre-shrunk cotton featuring boxy cuts and drop-shoulders.",
    bgColor: "rgba(10, 10, 10, 0.25)"
  },
  "Pants": {
    tagline: "TACTICAL UTILITY / RELAXED DRAPE",
    image: "/prod_pants_cargo.png",
    subtext: "Heavy utility cargo trousers with multi-bellow pocket styling, tactical straps, and adjustable cuffs.",
    bgColor: "rgba(10, 10, 10, 0.25)"
  },
  "Sneakers": {
    tagline: "CHUNKY PLATFORMS / PREMIUM LEATHER",
    image: "/prod_sneaker_white.png",
    subtext: "Luxury platform trainers featuring genuine paneled leather construction and shock-absorbing soles.",
    bgColor: "rgba(10, 10, 10, 0.2)"
  },
  "Accessories": {
    tagline: "WASHED TWILL / CLASP FITTED CAPS",
    image: "/prod_acc_cap.png",
    subtext: "Classic 6-panel twill caps with vintage wash effects, earth-toned bases, and metallic adjuster clasps.",
    bgColor: "rgba(10, 10, 10, 0.2)"
  }
};

function AppContent() {
  const { toasts, removeToast } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("home"); // "home" or "catalog"
  const [showPrintingDetail, setShowPrintingDetail] = useState(false);

  // Filter products by category (across all collections)
  const filteredProducts = products.filter((p) => {
    return activeFilter === "All" || p.category === activeFilter;
  });

  const getCategoryFeaturedProducts = (categoryName) => {
    return products.filter((p) => p.category === categoryName).slice(0, 4);
  };

  const categories = ["All", "T-Shirts", "Pants", "Sneakers", "Accessories"];

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <span>{toast.message}</span>
            <button className="toast-close" onClick={() => removeToast(toast.id)} aria-label="Dismiss message">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <Navbar 
        onProductSelect={(prod) => setSelectedProduct(prod)} 
        viewMode={viewMode}
        setViewMode={setViewMode}
        setActiveFilter={setActiveFilter}
      />

      {/* Hero Header */}
      <Hero />

      {/* Main Catalog Shop Section */}
      <main id="shop" style={{ paddingTop: "2rem" }}>
        {viewMode === "home" ? (
          <div className="home-sections animate-fade-in">
            {/* Intro Header */}
            <div className="container" style={{ textAlign: "center", marginBottom: "4rem", marginTop: "2rem" }}>
              <h2 className="section-title" style={{ marginTop: "0", marginBottom: "0.5rem" }}>Our Collections</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", letterSpacing: "0.05em", maxWidth: "600px", margin: "0 auto 1.5rem auto" }}>
                Explore premium tactical street apparel, oversized cuts, chunky sneakers, and minimalist washed accessories.
              </p>
              <button 
                className="btn-pill btn-dark" 
                onClick={() => {
                  setActiveFilter("All");
                  setViewMode("catalog");
                  const shopSec = document.getElementById("shop");
                  if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Full Catalog
              </button>
            </div>

            {/* Featured Sections (4 Categories with Full-Width Banners) */}
            {["T-Shirts", "Pants", "Sneakers", "Accessories"].map((cat) => {
              const meta = categoryMetadata[cat];
              return (
                <div key={cat} className="category-featured-section" style={{ position: "relative", marginBottom: "6rem" }}>
                  {/* Creative 100% Width Category Banner */}
                  <div 
                    className="category-banner-100" 
                    style={{ backgroundImage: `url(${meta.image})` }}
                  >
                    <div className="category-banner-overlay" style={{ backgroundColor: meta.bgColor }}></div>
                    <div className="category-banner-content container">
                      <span className="category-banner-tagline">{meta.tagline}</span>
                      <h2 className="category-banner-title">{cat}</h2>
                      <p className="category-banner-desc">{meta.subtext}</p>
                      <button
                        className="btn-pill btn-white"
                        onClick={() => {
                          setActiveFilter(cat);
                          setViewMode("catalog");
                          const shopSec = document.getElementById("shop");
                          if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Explore Collection &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Highlighted Products */}
                  <ProductGrid
                    id={cat.toLowerCase()}
                    title={null}
                    products={getCategoryFeaturedProducts(cat)}
                    onQuickView={(prod) => setSelectedProduct(prod)}
                  />
                </div>
              );
            })}

            {/* Printing Service Section */}
            <PrintingServiceSection onOpenDetail={() => setShowPrintingDetail(true)} />

            {/* Nate Robinson Middle Banner */}
            <PromoBanner
              id="nates-edit"
              title="Nate Robinson"
              subtitle="ZANEROBE & FRIENDS"
              designer="@brazycapone"
              image="https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=1600&auto=format&fit=crop"
              ctaLink="#shop"
            />

          </div>
        ) : (
          <div className="catalog-view animate-fade-in">
            {/* Breadcrumb / Back button */}
            <div className="container" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              <button 
                className="flex align-center" 
                style={{ gap: "0.5rem", fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-primary)" }}
                onClick={() => setViewMode("home")}
              >
                &larr; Back to Collections
              </button>
            </div>

            {/* Category Filters Bar */}
            <div className="container">
              <div className="filter-bar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Unified Product Grid */}
            <ProductGrid
              id="catalog-grid"
              title={`${activeFilter} Collection`}
              products={filteredProducts}
              onQuickView={(prod) => setSelectedProduct(prod)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Side Cart Drawer */}
      <CartDrawer />

      {/* Printing Service Detail Page */}
      {showPrintingDetail && (
        <PrintingDetailPage onClose={() => setShowPrintingDetail(false)} />
      )}

      {/* Floating Action Buttons (Insta, Whatsapp, Call) */}
      <FloatingContacts />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
