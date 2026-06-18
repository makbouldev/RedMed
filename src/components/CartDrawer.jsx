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
  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" | "submitting" | "success"

  const FREE_SHIPPING_THRESHOLD = 200;
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const grandTotal = cartTotal + shippingCost;
  
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutStep("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setCheckoutStep("success");
      setIsCheckingOut(false);
      clearCart();
      addToast("Order placed successfully!");
    }, 2500);
  };

  const handleClose = () => {
    closeCart();
    // Reset checkout step on close after transition
    setTimeout(() => {
      setCheckoutStep("cart");
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
          <h2 className="cart-title">Your Bag</h2>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Close cart">
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
                      You are <strong>${remainingForFreeShipping.toFixed(2)} AUD</strong> away from <strong>FREE SHIPPING</strong>.
                    </>
                  ) : (
                    "Congratulations! You qualify for FREE SHIPPING."
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
                  <p className="cart-empty-text">Your bag is currently empty.</p>
                  <button 
                    className="btn-pill btn-dark" 
                    onClick={handleClose}
                    style={{ marginTop: "1rem" }}
                  >
                    Continue Shopping
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
                        <p className="cart-item-meta">Size: {item.selectedSize}</p>
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
                          Remove
                        </button>
                      </div>

                      <div style={{ textAlign: "right", marginTop: "0.25rem" }}>
                        <span className="cart-item-price">${(item.product.numericPrice * item.quantity).toFixed(2)} AUD</span>
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
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)} AUD</span>
                </div>
                <div className="cart-summary-line">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)} AUD`}</span>
                </div>
                <div className="cart-summary-line total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)} AUD</span>
                </div>

                <button 
                  className="btn-pill btn-dark checkout-btn"
                  onClick={handleCheckout}
                >
                  <CreditCard size={16} style={{ marginRight: "0.5rem" }} /> Proceed to Checkout
                </button>
                
                <p className="cart-disclaimer">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
              </div>
            )}
          </>
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
              Securing Your Order
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Please do not close this window or refresh the page.
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
            
            <h3 style={{ textTransform: "uppercase", fontSize: "1.2rem", letterSpacing: "0.15em", marginBottom: "1rem" }}>
              Thank You!
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.6", maxHeight: "100px" }}>
              Your order has been received. A confirmation email with details has been sent.
            </p>
            
            <button 
              className="btn-pill btn-dark" 
              onClick={handleClose}
              style={{ marginTop: "2.5rem" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
