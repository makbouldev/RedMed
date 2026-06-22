import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Search, ShoppingBag, User, X, Menu, Sun, Moon } from "lucide-react";
import { products } from "../data/products";

export default function Navbar({ onProductSelect, viewMode, setViewMode, setActiveFilter, theme, setTheme }) {
  const { cartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setViewMode("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={`header-glass flex align-center justify-between ${isScrolled ? "scrolled" : ""}`}>
        <div className="container flex align-center justify-between" style={{ height: "100%" }}>
          {/* Logo */}
          <a href="#" className="navbar-logo-link" onClick={handleHomeClick}>
            <img src="/logo.png" alt="REDMED" className="navbar-logo-img" />
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="nav-links flex" style={{ gap: "2rem" }}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "#/";
              }}
              className={viewMode === "home" ? "active" : ""}
            >
              Accueil
            </button>
            <button 
              onClick={() => {
                setActiveFilter("All");
                window.location.hash = "#/catalog";
              }}
              className={viewMode === "catalog" ? "active" : ""}
            >
              Catalogue
            </button>
            <button 
              onClick={() => {
                window.location.hash = "#/categories";
              }}
              className={viewMode === "categories" ? "active" : ""}
            >
              Catégories
            </button>
            <button 
              onClick={() => {
                window.location.hash = "#/prints";
              }}
              className={viewMode === "prints" ? "active" : ""}
            >
              Prints
            </button>
            <button 
              onClick={() => {
                window.location.hash = "#/contact";
              }}
              className={viewMode === "contact" ? "active" : ""}
            >
              Contact
            </button>
          </nav>

          {/* Nav Icons */}
          <div className="nav-icons flex align-center" style={{ gap: "1rem" }}>
            <button 
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Changer de thème"
              style={{ color: "inherit", display: "flex", alignItems: "center" }}
            >
              {theme === "light" ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
            </button>

            <button 
              onClick={() => setIsSearchOpen(true)} 
              aria-label="Search products"
              style={{ color: "inherit" }}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={openCart} 
              aria-label="Open shopping bag"
              style={{ color: "inherit" }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              style={{ color: "inherit" }}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button 
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Changer de thème"
                style={{ color: "inherit", marginLeft: "auto", marginRight: "1.5rem", display: "flex", alignItems: "center" }}
              >
                {theme === "light" ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
              </button>
              <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav className="mobile-menu-links">
              <button 
                onClick={() => {
                  window.location.hash = "#/";
                  setIsMobileMenuOpen(false);
                }}
                className={viewMode === "home" ? "active" : ""}
              >
                Accueil
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("All");
                  window.location.hash = "#/catalog";
                  setIsMobileMenuOpen(false);
                }}
                className={viewMode === "catalog" ? "active" : ""}
              >
                Catalogue
              </button>
              <button 
                onClick={() => {
                  window.location.hash = "#/categories";
                  setIsMobileMenuOpen(false);
                }}
                className={viewMode === "categories" ? "active" : ""}
              >
                Catégories
              </button>
              <button 
                onClick={() => {
                  window.location.hash = "#/prints";
                  setIsMobileMenuOpen(false);
                }}
                className={viewMode === "prints" ? "active" : ""}
              >
                Prints
              </button>
              <button 
                onClick={() => {
                  window.location.hash = "#/contact";
                  setIsMobileMenuOpen(false);
                }}
                className={viewMode === "contact" ? "active" : ""}
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Quick Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-container">
            <button className="search-close-btn" onClick={handleSearchClose}>
              <X size={18} style={{ marginRight: "0.5rem" }} /> Fermer
            </button>
            <div className="search-input-wrapper">
              <Search size={28} strokeWidth={1.5} />
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher un vêtement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 && (
              <div className="search-results-grid">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    style={{ minWidth: "100%", cursor: "pointer" }}
                    onClick={() => {
                      onProductSelect(product);
                      handleSearchClose();
                    }}
                  >
                    <div className="product-card-img-wrapper" style={{ aspectRatio: "4/5" }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-card-img"
                      />
                    </div>
                    <div className="product-info">
                      <div className="product-title" style={{ fontSize: "0.7rem" }}>
                        {product.name}
                      </div>
                      <div className="product-price" style={{ fontSize: "0.75rem" }}>
                        {product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {searchQuery.trim() !== "" && searchResults.length === 0 && (
              <div style={{ textAlign: "center", marginTop: "4rem", color: "var(--text-secondary)" }}>
                Aucun résultat trouvé pour "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
