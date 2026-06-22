import React, { useState, useEffect } from "react";
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
import CategoriesPage from "./components/CategoriesPage";
import PrintsPage from "./components/PrintsPage";
import ContactPage from "./components/ContactPage";
import ProductDetailPage from "./components/ProductDetailPage";
import { products as initialProducts } from "./data/products";
import { X } from "lucide-react";
import AdminDashboard from "./components/AdminDashboard";
const defaultCategoryMetadata = {
  "T-Shirts": {
    tagline: "COTON LOURD / COUPE BOXY",
    image: "/prod_tee_black.png",
    subtext: "Conçu pour un tombé streetwear ultime. Coton prérétréci de 280g/m² avec coupe boxy et épaules tombantes.",
    bgColor: "rgba(10, 10, 10, 0.25)"
  },
  "Pants": {
    tagline: "UTILITAIRE TACTIQUE / COUPE RELÂCHÉE",
    image: "/products/pants/15934233a307f7318bc0d5caf7d54942.jpg",
    subtext: "Pantalons cargo utilitaires lourds avec poches latérales à soufflet, sangles tactiques et ourlets ajustables.",
    bgColor: "rgba(10, 10, 10, 0.25)"
  },
  "Sneakers": {
    tagline: "PLATEFORMES ÉPAISSES / CUIR PREMIUM",
    image: "/products/Shoes/145cd5f983da69b64148aa3999ac9a26.jpg",
    subtext: "Baskets à plateforme de luxe dotées d'une structure en cuir véritable et de semelles amortissantes.",
    bgColor: "rgba(10, 10, 10, 0.2)"
  },
  "Accessories": {
    tagline: "SERGÉ LAVÉ / CASQUETTES AJUSTABLES",
    image: "/products/accesoires/24c379891bd0e28d042dc1be2666d95e.jpg",
    subtext: "Casquettes classiques en sergé à 6 panneaux avec effets délavés vintage, tons terreux et fermoirs métalliques.",
    bgColor: "rgba(10, 10, 10, 0.2)"
  }
};

const getDynamicCategoryMetadata = () => {
  const saved = localStorage.getItem("redmed_categories");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const meta = {};
      parsed.forEach(c => {
        let key = c.name;
        if (c.name === "Pantalons") key = "Pants";
        if (c.name === "Baskets") key = "Sneakers";
        if (c.name === "Accessoires") key = "Accessories";
        
        meta[key] = {
          tagline: c.tagline,
          image: c.image,
          subtext: c.desc,
          bgColor: key === "Sneakers" || key === "Accessories" ? "rgba(10, 10, 10, 0.2)" : "rgba(10, 10, 10, 0.25)"
        };
      });
      return meta;
    } catch (e) {
      console.error(e);
    }
  }
  return defaultCategoryMetadata;
};

function AppContent() {
  const { toasts, removeToast } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("home"); // "home", "catalog", "categories", "prints", "contact", "product-detail"
  const [categoryMetadata, setCategoryMetadata] = useState(() => getDynamicCategoryMetadata());

  const [storeProducts, setStoreProducts] = useState(() => {
    const saved = localStorage.getItem("redmed_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    setCategoryMetadata(getDynamicCategoryMetadata());
    const saved = localStorage.getItem("redmed_products");
    if (saved) {
      setStoreProducts(JSON.parse(saved));
    }
  }, [viewMode]);

  const products = storeProducts;

  const [showPrintingDetail, setShowPrintingDetail] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll to top when viewMode changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  // SPA hash-based routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/product/")) {
        const prodId = hash.replace("#/product/", "");
        const found = products.find((p) => String(p.id) === prodId);
        if (found) {
          setSelectedProduct(found);
          setViewMode("product-detail");
          return;
        }
      }
      
      // Clear product selection when navigating away from product-detail
      setSelectedProduct(null);

      if (hash === "#/catalog") {
        setViewMode("catalog");
      } else if (hash === "#/categories") {
        setViewMode("categories");
      } else if (hash === "#/prints") {
        setViewMode("prints");
      } else if (hash === "#/contact") {
        setViewMode("contact");
      } else if (hash === "#/admin") {
        setViewMode("admin");
      } else {
        setViewMode("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Run on initial load to handle deep links
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // New catalog filters states
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [maxPrice, setMaxPrice] = useState(600);
  const [sortBy, setSortBy] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ["All", "T-Shirts", "Pants", "Sneakers", "Accessories"];

  // Hero navigation helper
  const handleHeroNavigation = (collectionName) => {
    setSelectedCollection(collectionName);
    setActiveFilter("All");
    setSelectedSize("all");
    setMaxPrice(600);
    setSortBy("recommended");
    setSearchQuery("");
    window.location.hash = "#/catalog";
  };

  const getAvailableSizes = () => {
    if (activeFilter === "T-Shirts") return ["S", "M", "L", "XL"];
    if (activeFilter === "Pants") return ["30", "32", "34", "36"];
    if (activeFilter === "Sneakers") return ["40", "41", "42", "43", "44"];
    if (activeFilter === "Accessories") return ["TU"];
    return ["S", "M", "L", "XL", "30", "32", "34", "36", "40", "41", "42", "43", "44", "TU"];
  };

  // Filter products by category, collection, size, price, and search query
  let filteredProducts = products.filter((p) => {
    const matchesCategory = activeFilter === "All" || p.category === activeFilter;
    const matchesCollection = selectedCollection === "all" || p.collection === selectedCollection;
    const matchesSearch = searchQuery.trim() === "" || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.numericPrice <= maxPrice;
    const matchesSize = selectedSize === "all" || p.sizes.some(s => s.size === selectedSize && s.stock > 0);
    
    return matchesCategory && matchesCollection && matchesSearch && matchesPrice && matchesSize;
  });

  // Sort logic
  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.numericPrice - a.numericPrice);
  }

  const getCategoryFeaturedProducts = (categoryName) => {
    return products.filter((p) => p.category === categoryName).slice(0, 4);
  };

  if (viewMode === "admin") {
    return <AdminDashboard />;
  }

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
        onProductSelect={(prod) => {
          window.location.hash = "#/product/" + prod.id;
        }} 
        viewMode={viewMode}
        setViewMode={setViewMode}
        setActiveFilter={setActiveFilter}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Hero Header */}
      {viewMode === "home" && <Hero onHeroCtaClick={handleHeroNavigation} />}

      {/* Main Catalog Shop Section */}
      <main id="shop" style={{ paddingTop: viewMode === "home" ? "2rem" : "120px" }}>
        {viewMode === "home" ? (
          <div className="home-sections animate-fade-in">
            {/* Intro Header */}
            <div className="container" style={{ textAlign: "center", marginBottom: "4rem", marginTop: "2rem" }}>
              <h2 className="section-title" style={{ marginTop: "0", marginBottom: "0.5rem" }}>Nos Collections</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", letterSpacing: "0.05em", maxWidth: "600px", margin: "0 auto 1.5rem auto" }}>
                Découvrez des vêtements streetwear tactiques premium, des coupes oversized, des baskets épaisses et des accessoires minimalistes délavés.
              </p>
              <button 
                className="btn-pill btn-dark" 
                onClick={() => {
                  setActiveFilter("All");
                  setSelectedCollection("all");
                  setSelectedSize("all");
                  setMaxPrice(600);
                  setSortBy("recommended");
                  setSearchQuery("");
                  window.location.hash = "#/catalog";
                }}
              >
                Voir le catalogue complet
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
                      <h2 className="category-banner-title">
                        {cat === "Pants" ? "Pantalons" : cat === "Sneakers" ? "Baskets" : cat === "Accessories" ? "Accessoires" : cat}
                      </h2>
                      <p className="category-banner-desc">{meta.subtext}</p>
                      <button
                        className="btn-pill btn-white"
                        onClick={() => {
                          setActiveFilter(cat);
                          setSelectedCollection("all");
                          setSelectedSize("all");
                          setMaxPrice(600);
                          setSortBy("recommended");
                          setSearchQuery("");
                          window.location.hash = "#/catalog";
                        }}
                      >
                        Explorer la Collection &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Highlighted Products */}
                  <ProductGrid
                    id={cat.toLowerCase()}
                    title={null}
                    products={getCategoryFeaturedProducts(cat)}
                    onQuickView={(prod) => {
                      window.location.hash = "#/product/" + prod.id;
                    }}
                  />
                </div>
              );
            })}

            {/* Printing Service Section */}
            <PrintingServiceSection onOpenDetail={() => setShowPrintingDetail(true)} />

            {/* Contact Section instead of Nate Robinson PromoBanner */}
            <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
              <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
                <span className="contact-eyebrow" style={{ display: "block", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Nous Joindre</span>
                <h2 className="section-title" style={{ marginTop: "0", marginBottom: "0.5rem" }}>Contact &amp; Localisation</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", letterSpacing: "0.05em", maxWidth: "600px", margin: "0 auto" }}>
                  Vous pouvez nous envoyer un message directement via notre formulaire ou nous rendre visite à notre atelier à Casablanca.
                </p>
              </div>
              <ContactPage isSection={true} />
            </div>

          </div>
        ) : viewMode === "catalog" ? (
          <div className="catalog-view animate-fade-in">
            {/* Breadcrumb / Back button */}
            <div className="container" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              <button 
                className="flex align-center" 
                style={{ gap: "0.5rem", fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-primary)" }}
                onClick={() => {
                  window.location.hash = "#/";
                }}
              >
                &larr; Retour aux Collections
              </button>
            </div>

            {/* Faceted Filtering Layout */}
            <div className="container catalog-container">
              {/* Sidebar Filters */}
              <aside className={`catalog-sidebar ${showMobileFilters ? "show" : ""}`}>
                <div className="sidebar-header">
                  <h3>Filtres</h3>
                  <button className="close-filters-btn" onClick={() => setShowMobileFilters(false)}>
                    <X size={20} />
                  </button>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Recherche</h4>
                  <input
                    type="text"
                    className="filter-search-input"
                    placeholder="Ex: cargo, t-shirt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Catégories</h4>
                  <div className="filter-list">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`filter-link-btn ${activeFilter === cat ? "active" : ""}`}
                        onClick={() => {
                          setActiveFilter(cat);
                          setSelectedSize("all");
                        }}
                      >
                        {cat === "All" ? "Tout voir" : cat === "Pants" ? "Pantalons" : cat === "Sneakers" ? "Baskets" : cat === "Accessories" ? "Accessoires" : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Collections</h4>
                  <div className="filter-list">
                    <button
                      className={`filter-link-btn ${selectedCollection === "all" ? "active" : ""}`}
                      onClick={() => setSelectedCollection("all")}
                    >
                      Toutes les collections
                    </button>
                    <button
                      className={`filter-link-btn ${selectedCollection === "nate" ? "active" : ""}`}
                      onClick={() => setSelectedCollection("nate")}
                    >
                      Edition REDMED
                    </button>
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Tailles</h4>
                  <div className="sizes-filter-grid">
                    <button
                      className={`size-filter-btn ${selectedSize === "all" ? "selected" : ""}`}
                      onClick={() => setSelectedSize("all")}
                    >
                      Toutes
                    </button>
                    {getAvailableSizes().map((size) => (
                      <button
                        key={size}
                        className={`size-filter-btn ${selectedSize === size ? "selected" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Prix Max ({maxPrice} DH)</h4>
                  <input
                    type="range"
                    min="150"
                    max="600"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="price-filter-slider"
                  />
                  <div className="price-labels">
                    <span>150 DH</span>
                    <span>600 DH</span>
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Trier par</h4>
                  <select 
                    className="filter-sort-select" 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Recommandé</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                  </select>
                </div>

                <button 
                  className="btn-pill btn-white reset-filters-btn"
                  onClick={() => {
                    setActiveFilter("All");
                    setSelectedCollection("all");
                    setSelectedSize("all");
                    setMaxPrice(600);
                    setSortBy("recommended");
                    setSearchQuery("");
                  }}
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  Réinitialiser
                </button>
              </aside>

              {/* Products Area */}
              <div className="catalog-products">
                {/* Mobile Filter Toggle & Summary */}
                <div className="catalog-toolbar">
                  <button className="mobile-filter-toggle-btn" onClick={() => setShowMobileFilters(true)}>
                    Filtrer & Trier
                  </button>
                  <span className="results-count">
                    {filteredProducts.length} {filteredProducts.length > 1 ? "articles trouvés" : "article trouvé"}
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <ProductGrid
                    id="catalog-grid"
                    title={null}
                    products={filteredProducts}
                    onQuickView={(prod) => setSelectedProduct(prod)}
                  />
                ) : (
                  <div className="catalog-empty" style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-secondary)" }}>
                    <p>Aucun vêtement ne correspond à vos filtres.</p>
                    <button 
                      className="btn-pill btn-dark" 
                      onClick={() => {
                        setActiveFilter("All");
                        setSelectedCollection("all");
                        setSelectedSize("all");
                        setMaxPrice(600);
                        setSortBy("recommended");
                        setSearchQuery("");
                      }}
                      style={{ marginTop: "1.5rem" }}
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : viewMode === "categories" ? (
          <CategoriesPage onCategorySelect={(categoryKey) => {
            setActiveFilter(categoryKey);
            setSelectedCollection("all");
            setSelectedSize("all");
            setMaxPrice(600);
            setSortBy("recommended");
            setSearchQuery("");
            window.location.hash = "#/catalog";
          }} />
        ) : viewMode === "prints" ? (
          <PrintsPage />
        ) : viewMode === "contact" ? (
          <ContactPage />
        ) : viewMode === "product-detail" ? (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={() => {
              window.location.hash = "#/catalog";
            }}
          />
        ) : null}
      </main>

      {/* Footer */}
      <Footer />

      {/* Side Cart Drawer */}
      <CartDrawer />

      {/* Printing Service Detail Page */}
      {showPrintingDetail && (
        <PrintingDetailPage onClose={() => setShowPrintingDetail(false)} />
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Floating Action Buttons (Insta, Whatsapp, Call) */}
      <FloatingContacts onOpenPrinting={() => setShowPrintingDetail(true)} />
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
