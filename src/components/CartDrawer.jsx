import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, ShoppingBag, CreditCard, Check } from "lucide-react";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
    addToast
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" | "form" | "submitting" | "success"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: ""
  });

  const FREE_SHIPPING_THRESHOLD = 200;
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const grandTotal = cartTotal + shippingCost;
  
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;

  const handleCheckout = () => {
    setCheckoutStep("form");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setCheckoutStep("submitting");
    
    // Simulate API call
    setTimeout(() => {
      // Save order to localStorage
      const savedOrders = localStorage.getItem("redmed_orders");
      let ordersList = [];
      if (savedOrders) {
        try {
          ordersList = JSON.parse(savedOrders);
        } catch (e) {
          console.error(e);
        }
      }
      
      const maxId = ordersList.length > 0 ? Math.max(...ordersList.map(o => parseInt(o.id) || 0)) : 8;
      const orderId = String(maxId + 1);
      
      const newOrderObj = {
        id: orderId,
        customer: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        products: cartItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          size: item.selectedSize || "TU",
          color: "Noir", // default color
          price: item.product.numericPrice
        })),
        price: grandTotal,
        date: new Date().toISOString().split("T")[0],
        payment: "Cash on Delivery",
        status: "pending"
      };
      
      ordersList = [newOrderObj, ...ordersList];
      localStorage.setItem("redmed_orders", JSON.stringify(ordersList));
      
      setCheckoutStep("success");
      setIsCheckingOut(false);
      clearCart();
      addToast("Commande enregistrée avec succès !");
    }, 2000);
  };

  const handleClose = () => {
    closeCart();
    // Reset checkout step on close after transition
    setTimeout(() => {
      setCheckoutStep("cart");
      setFormData({
        name: "",
        phone: "",
        city: "",
        address: ""
      });
    }, 500);
  };

  return (
    <>
      <div 
        className={`cart-drawer-overlay ${isCartOpen ? "open" : ""}`}
        onClick={handleClose}
      />

      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">Votre Panier</h2>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Fermer le panier">
            <X size={20} />
          </button>
        </div>

        {checkoutStep === "cart" && (
          <>
            {/* Free Shipping Progress */}
            {cartItems.length > 0 && (
              <div className="cart-progress-container">
                <p className="cart-progress-text">
                  {remainingForFreeShipping > 0 ? (
                    <>
                      Il vous reste <strong>{remainingForFreeShipping} DH</strong> pour profiter de la <strong>LIVRAISON GRATUITE</strong>.
                    </>
                  ) : (
                    "Félicitations ! Vous bénéficiez de la LIVRAISON GRATUITE."
                  )}
                </p>
                <div className="cart-progress-bar">
                  <div 
                    className="cart-progress-fill" 
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartItems.length === 0 ? (
                <div className="cart-empty-state">
                  <ShoppingBag size={48} strokeWidth={1} style={{ marginBottom: "1rem" }} />
                  <p className="cart-empty-text">Votre panier est actuellement vide.</p>
                  <button 
                    className="btn-pill btn-dark" 
                    onClick={handleClose}
                    style={{ marginTop: "1rem" }}
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <div>
                        <div className="cart-item-header">
                          <h4 className="cart-item-title">{item.product.name}</h4>
                        </div>
                        <p className="cart-item-meta">Taille : {item.selectedSize}</p>
                      </div>

                      <div className="cart-item-quantity-row">
                        <div className="quantity-picker">
                          <button 
                            className="quantity-btn" 
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="quantity-val">{item.quantity}</span>
                          <button 
                            className="quantity-btn" 
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button 
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        >
                          Retirer
                        </button>
                      </div>

                      <div style={{ textAlign: "right", marginTop: "0.25rem" }}>
                        <span className="cart-item-price">{(item.product.numericPrice * item.quantity)} DH</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-line">
                  <span>Sous-total</span>
                  <span>{cartTotal} DH</span>
                </div>
                <div className="cart-summary-line">
                  <span>Livraison</span>
                  <span>{shippingCost === 0 ? "GRATUITE" : `${shippingCost} DH`}</span>
                </div>
                <div className="cart-summary-line total">
                  <span>Total</span>
                  <span>{grandTotal} DH</span>
                </div>

                <button 
                  className="btn-pill btn-dark checkout-btn"
                  onClick={handleCheckout}
                >
                  <CreditCard size={16} style={{ marginRight: "0.5rem" }} /> Passer la commande
                </button>
                
                <p className="cart-disclaimer">
                  Frais de port et réductions calculés lors de la commande.
                </p>
              </div>
            )}
          </>
        )}

        {checkoutStep === "form" && (
          <div className="cart-checkout-form-container animate-fade-in" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", height: "calc(100% - 75px)", overflowY: "auto" }}>
            <h3 style={{ textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem", marginBottom: "0.5rem", fontWeight: "700" }}>
              Informations de Livraison
            </h3>
            
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="form-input-group">
                <label htmlFor="checkout-name" style={{ fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="checkout-name"
                  required
                  placeholder="Votre nom et prénom"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-color)", borderRadius: "3px", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="checkout-phone" style={{ fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                  Téléphone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  id="checkout-phone"
                  required
                  placeholder="Ex: 0612345678"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-color)", borderRadius: "3px", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="checkout-city" style={{ fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                  Ville *
                </label>
                <input
                  type="text"
                  id="checkout-city"
                  required
                  placeholder="Ex: Casablanca, Rabat, Marrakech..."
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-color)", borderRadius: "3px", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="checkout-address" style={{ fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                  Adresse de livraison *
                </label>
                <textarea
                  id="checkout-address"
                  required
                  rows="3"
                  placeholder="Numéro de rue, quartier, appartement..."
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border-color)", borderRadius: "3px", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", resize: "none" }}
                />
              </div>

              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button type="submit" className="btn-pill btn-dark" style={{ width: "100%" }}>
                  Confirmer ma commande
                </button>
                <button type="button" className="btn-pill btn-white" onClick={() => setCheckoutStep("cart")} style={{ width: "100%" }}>
                  Retour au panier
                </button>
              </div>
            </form>
          </div>
        )}

        {checkoutStep === "submitting" && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "2rem",
            textAlign: "center"
          }}>
            <div className="loading-spinner" />
            <h3 style={{ marginTop: "2rem", textTransform: "uppercase", fontSize: "1rem", letterSpacing: "0.1em" }}>
              Validation de votre commande
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Veuillez patienter pendant que nous enregistrons vos détails de livraison.
            </p>
            
            <style dangerouslySetInnerHTML={{__html: `
              .loading-spinner {
                width: 50px;
                height: 50px;
                border: 2px solid #e5e5e5;
                border-top-color: #000;
                border-radius: 50%;
                animation: spin 1s infinite linear;
              }
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}} />
          </div>
        )}

        {checkoutStep === "success" && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "2rem",
            textAlign: "center"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#e8f5e9",
              color: "var(--success-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
              animation: "slideInUp 0.4s ease"
            }}>
              <Check size={36} />
            </div>
            
            <h3 style={{ textTransform: "uppercase", fontSize: "1.1rem", letterSpacing: "0.15em", marginBottom: "1rem", fontWeight: "700" }}>
              Commande Validée !
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Merci <strong>{formData.name}</strong> pour votre confiance !
            </p>

            <div style={{ background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", padding: "1.25rem", marginBottom: "2rem", textAlign: "left", fontSize: "0.8rem", lineHeight: "1.5" }}>
              <p style={{ color: "var(--text-primary)", fontWeight: "700", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>ℹ️ Prochaine étape :</p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Notre service client va vous appeler dans les plus brefs délais sur votre numéro <strong>{formData.phone}</strong> afin de confirmer les détails.
              </p>
              <p style={{ color: "var(--text-secondary)" }}>
                Votre colis sera expédié immédiatement après confirmation chez vous à <strong>{formData.city}</strong>.
              </p>
            </div>

            <button 
              className="btn-pill btn-dark" 
              onClick={handleClose}
              style={{ width: "100%" }}
            >
              Continuer vos achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
