import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Search, ShoppingBag, User, X, Menu } from "lucide-react";
import { products } from "../data/products";

export default function Navbar({ onProductSelect, viewMode, setViewMode, setActiveFilter }) {
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
          <a href="#" className="footer-logo" onClick={handleHomeClick} style={{ color: "inherit", letterSpacing: "0.25em" }}>
            REDMED
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="nav-links flex" style={{ gap: "2rem" }}>
            <button 
              onClick={() => {
                setViewMode("home");
                const shopSec = document.getElementById("shop");
                if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
              }}
              className={viewMode === "home" ? "active" : ""}
            >
              Collections
            </button>
            <button 
              onClick={() => {
                setActiveFilter("T-Shirts");
                setViewMode("catalog");
                const shopSec = document.getElementById("shop");
                if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
              }}
            >
              T-Shirts
            </button>
            <button 
              onClick={() => {
                setActiveFilter("Pants");
                setViewMode("catalog");
                const shopSec = document.getElementById("shop");
                if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Pants
            </button>
            <button 
              onClick={() => {
                setActiveFilter("Sneakers");
                setViewMode("catalog");
                const shopSec = document.getElementById("shop");
                if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Sneakers
            </button>
            <button 
              onClick={() => {
                setActiveFilter("Accessories");
                setViewMode("catalog");
                const shopSec = document.getElementById("shop");
                if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Accessories
            </button>
          </nav>

          {/* Nav Icons */}
          <div className="nav-icons flex align-center" style={{ gap: "1rem" }}>
            <button 
              onClick={() => setIsSearchOpen(true)} 
              aria-label="Search products"
              style={{ color: "inherit" }}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <button aria-label="User account" style={{ color: "inherit" }}>
              <User size={20} strokeWidth={1.5} />
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
              <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav className="mobile-menu-links">
              <button 
                onClick={() => {
                  setViewMode("home");
                  setIsMobileMenuOpen(false);
                  const shopSec = document.getElementById("shop");
                  if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Collections
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("T-Shirts");
                  setViewMode("catalog");
                  setIsMobileMenuOpen(false);
                  const shopSec = document.getElementById("shop");
                  if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
                }}
              >
                T-Shirts
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("Pants");
                  setViewMode("catalog");
                  setIsMobileMenuOpen(false);
                  const shopSec = document.getElementById("shop");
                  if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Pants
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("Sneakers");
                  setViewMode("catalog");
                  setIsMobileMenuOpen(false);
                  const shopSec = document.getElementById("shop");
                  if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Sneakers
              </button>
              <button 
                onClick={() => {
                  setActiveFilter("Accessories");
                  setViewMode("catalog");
                  setIsMobileMenuOpen(false);
                  const shopSec = document.getElementById("shop");
                  if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Accessories
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
              <X size={18} style={{ marginRight: "0.5rem" }} /> Close
            </button>
            <div className="search-input-wrapper">
              <Search size={28} strokeWidth={1.5} />
              <input
                type="text"
                className="search-input"
                placeholder="Search our apparel..."
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
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
