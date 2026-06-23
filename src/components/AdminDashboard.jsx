import React, { useState, useEffect } from "react";
import { 
  BarChart3, ClipboardList, Package, Users, Settings, LogOut,
  Search, Bell, Calendar, ChevronDown, Plus, Download, MoreHorizontal,
  Check, Clock, ArrowUpRight, CheckSquare, UserCheck, X, Trash2, Edit3, Save, Globe, Shield, Eye, EyeOff
} from "lucide-react";
import { products as initialProducts } from "../data/products";
import AdminLogin from "./AdminLogin";
import "./AdminDashboard.css";

// Dynamic preset orders
const initialOrders = [
  { 
    id: "8", 
    customer: "Amine Benjelloun", 
    phone: "0661234567", 
    city: "Casablanca",
    address: "25 Boulevard d'Anfa, Appt 4",
    products: [
      { name: "T-shirt Oversized / Mova Noir", quantity: 2, size: "M", color: "Noir", price: 220 }
    ],
    price: 440, 
    date: "2026-06-22", 
    payment: "Cash on Delivery", 
    status: "delivered" 
  },
  { 
    id: "7", 
    customer: "Sarah Belkhayat", 
    phone: "0665987654", 
    city: "Rabat",
    address: "12 Rue de France, Agdal",
    products: [
      { name: "Baskets Plateformes / Cuir Premium", quantity: 1, size: "42", color: "Blanc", price: 960 }
    ],
    price: 960, 
    date: "2026-06-22", 
    payment: "Credit Card", 
    status: "confirmed" 
  },
  { 
    id: "6", 
    customer: "Yassine Taghi", 
    phone: "0670112233", 
    city: "Marrakech",
    address: "Gueliz, Résidence Majorelle, Imm B, N° 12",
    products: [
      { name: "T-shirt Oversized / Stitch Noir", quantity: 3, size: "L", color: "Noir", price: 250 },
      { name: "Cargo Utility / Sable Kaki", quantity: 1, size: "32", color: "Kaki", price: 380 }
    ],
    price: 1130, 
    date: "2026-06-21", 
    payment: "Cash on Delivery", 
    status: "pending" 
  },
  { 
    id: "5", 
    customer: "Kenza Lahlou", 
    phone: "0661998877", 
    city: "Fès",
    address: "Route d'Imouzzer, Résidence Yasmina, Villa 5",
    products: [
      { name: "Cargo Utility / Sable Kaki", quantity: 2, size: "34", color: "Kaki", price: 380 }
    ],
    price: 760, 
    date: "2026-06-20", 
    payment: "Bank Transfer", 
    status: "delivered" 
  },
  { 
    id: "4", 
    customer: "Mehdi Alaoui", 
    phone: "0652443322", 
    city: "Tanger",
    address: "Val Fleuri, Rue des Amandiers, N° 18",
    products: [
      { name: "Casquette Sergé Lavé / Kaki", quantity: 1, size: "TU", color: "Kaki", price: 150 }
    ],
    price: 150, 
    date: "2026-06-19", 
    payment: "Cash on Delivery", 
    status: "cancelled" 
  },
  { 
    id: "3", 
    customer: "Sofia Bennani", 
    phone: "0662887766", 
    city: "Casablanca",
    address: "Oasis, Rue des Fleurs, Villa N° 9",
    products: [
      { name: "T-shirt Oversized / Mova Noir", quantity: 1, size: "S", color: "Noir", price: 220 }
    ],
    price: 220, 
    date: "2026-06-18", 
    payment: "Credit Card", 
    status: "delivered" 
  },
  { 
    id: "2", 
    customer: "Othmane Chraibi", 
    phone: "0663114477", 
    city: "Rabat",
    address: "Hay Riad, Secteur 14, Rue d'Arganier, N° 3",
    products: [
      { name: "T-shirt Oversized / Mova Noir", quantity: 2, size: "L", color: "Noir", price: 220 },
      { name: "Casquette Sergé Lavé / Kaki", quantity: 1, size: "TU", color: "Kaki", price: 150 }
    ],
    price: 590, 
    date: "2026-06-17", 
    payment: "Credit Card", 
    status: "confirmed" 
  },
  { 
    id: "1", 
    customer: "Imane Kadiri", 
    phone: "0671445566", 
    city: "Casablanca",
    address: "Bouskoura, Ville Verte, Résidence Al Boustane",
    products: [
      { name: "T-shirt Oversized / Inspiration Blanc", quantity: 2, size: "M", color: "Blanc", price: 220 },
      { name: "Cargo Utility / Sable Kaki", quantity: 1, size: "30", color: "Kaki", price: 380 }
    ],
    price: 820, 
    date: "2026-06-16", 
    payment: "Bank Transfer", 
    status: "delivered" 
  }
];

const mockCustomers = [
  { name: "Amine Benjelloun", email: "amine@gmail.com", phone: "0661234567", orders: 3, spent: "1,250 DH" },
  { name: "Sarah Belkhayat", email: "sarah.b@yahoo.com", phone: "0665987654", orders: 2, spent: "1,440 DH" },
  { name: "Yassine Taghi", email: "y.taghi@gmail.com", phone: "0670112233", orders: 5, spent: "4,300 DH" },
  { name: "Kenza Lahlou", email: "lahlou.kenza@gmail.com", phone: "0661998877", orders: 1, spent: "760 DH" },
  { name: "Mehdi Alaoui", email: "mehdi.alaoui@gmail.com", phone: "0652443322", orders: 1, spent: "150 DH" },
  { name: "Sofia Bennani", email: "sofia.b@gmail.com", phone: "0662887766", orders: 4, spent: "1,120 DH" }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("redmed_admin_auth") === "true";
  });

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboardContent onLogout={() => { sessionStorage.removeItem("redmed_admin_auth"); setIsAuthenticated(false); }} />;
}

function AdminDashboardContent({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, orders, products, categories, settings
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("redmed_orders");
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        if (parsed.length > 0 && String(parsed[0].id).includes("RM-")) {
          const sorted = [...parsed].sort((a, b) => new Date(a.date) - new Date(b.date));
          parsed = sorted.map((o, idx) => ({ ...o, id: String(idx + 1) })).reverse();
        }
        // Map legacy statuses and migrate category-based orders
        parsed = parsed.map(o => {
          let newStatus = o.status;
          if (o.status === "new" || o.status === "await-accept") newStatus = "pending";
          if (o.status === "on-way") newStatus = "confirmed";

          let migratedProducts = o.products;
          if (!o.products) {
            let prodName = "Article RedMed";
            let size = "M";
            if (o.category === "T-Shirts") { prodName = "T-shirt Oversized / Mova Noir"; size = "M"; }
            else if (o.category === "Pants") { prodName = "Cargo Utility / Sable Kaki"; size = "32"; }
            else if (o.category === "Sneakers") { prodName = "Baskets Plateformes / Cuir Premium"; size = "42"; }
            else if (o.category === "Accessories") { prodName = "Casquette Sergé Lavé / Kaki"; size = "TU"; }
            
            migratedProducts = [
              { name: prodName, quantity: 1, size: size, color: "Noir", price: o.price }
            ];
          }

          return { 
            ...o, 
            status: newStatus, 
            products: migratedProducts,
            city: o.city || "Casablanca",
            address: o.address || "Adresse standard"
          };
        });
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return initialOrders;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("redmed_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editOrderProducts, setEditOrderProducts] = useState([]);
  // Dynamic size/option state for Add Product modal
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "T-Shirts",
    image: "",
    description: "",
    details: ""
  });
  const [newProductSizeType, setNewProductSizeType] = useState("clothing"); // clothing | pants | shoes | unique | custom
  const [newProductSizes, setNewProductSizes] = useState(["S","M","L","XL"]);
  const [newProductCustomSizeInput, setNewProductCustomSizeInput] = useState("");
  const [newProductColors, setNewProductColors] = useState([]);
  const [newProductColorInput, setNewProductColorInput] = useState("");
  const [newProductStocks, setNewProductStocks] = useState({}); // key: `${size}__${color}` or `${size}` -> stock number
  const [hasOptions, setHasOptions] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [newProductImages, setNewProductImages] = useState([]);


  const SIZE_PRESETS = {
    clothing: ["S","M","L","XL","XXL"],
    pants: ["30","32","34","36","38"],
    shoes: ["38","39","40","41","42","43","44","45"],
    unique: ["TU"],
    custom: []
  };

  const handleSizeTypeChange = (type) => {
    setNewProductSizeType(type);
    if (type !== "custom") {
      setNewProductSizes(SIZE_PRESETS[type]);
    } else {
      setNewProductSizes([]);
    }
    setNewProductStocks({});
  };

  const resetAddProductModal = () => {
    setNewProduct({ name: "", price: "", category: "T-Shirts", image: "", description: "", details: "" });
    setNewProductSizeType("unique");
    setNewProductSizes(["TU"]);
    setNewProductCustomSizeInput("");
    setNewProductColors([]);
    setNewProductColorInput("");
    setNewProductStocks({ "TU": 10 });
    setHasOptions(false);
    setShowColors(false);
    setShowSizes(false);
    setNewProductImages([]);
  };

  const [categoriesList, setCategoriesList] = useState(() => {
    const saved = localStorage.getItem("redmed_categories");
    return saved ? JSON.parse(saved) : [
      { name: "T-Shirts", tagline: "COTON LOURD / COUPE BOXY", count: 4, desc: "Conçu pour un tombé streetwear ultime. Coton prérétréci de 280g/m² avec coupe boxy et épaules tombantes.", image: "/prod_tee_black.png" },
      { name: "Pantalons", tagline: "UTILITAIRE TACTIQUE / COUPE RELÂCHÉE", count: 4, desc: "Pantalons cargo utilitaires lourds avec poches latérales à soufflet, sangles tactiques et ourlets ajustables.", image: "/products/pants/15934233a307f7318bc0d5caf7d54942.jpg" },
      { name: "Baskets", tagline: "PLATEFORMES ÉPAISSES / CUIR PREMIUM", count: 4, desc: "Baskets à plateforme de luxe dotées d'une structure en cuir véritable et de semelles amortissantes.", image: "/products/Shoes/145cd5f983da69b64148aa3999ac9a26.jpg" },
      { name: "Accessoires", tagline: "SERGÉ LAVÉ / CASQUETTES AJUSTABLES", count: 4, desc: "Casquettes classiques en sergé à 6 panneaux avec effets délavés vintage, tons terreux et fermoirs métalliques.", image: "/products/accesoires/24c379891bd0e28d042dc1be2666d95e.jpg" }
    ];
  });

  const [editingCategory, setEditingCategory] = useState(null);

  // Filter & Search state
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [orderCategoryFilter, setOrderCategoryFilter] = useState("all");
  const [orderSortBy, setOrderSortBy] = useState("date-desc");

  // Selected order for actions dropdown
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(null);

  // New order form modal
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    phone: "",
    city: "",
    address: "",
    category: "T-Shirts",
    price: "",
    payment: "Cash on Delivery",
    status: "pending"
  });

  const [newOrderProducts, setNewOrderProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [selectedProductColor, setSelectedProductColor] = useState("Noir");
  const [selectedProductQty, setSelectedProductQty] = useState(1);

  // Settings State
  const [settings, setSettings] = useState(() => {
    const savedMsg = localStorage.getItem("redmed_announcement");
    return {
      storeName: "RedMed Casablanca",
      email: "contact@redmed.ma",
      currency: "DH",
      freeShippingLimit: "500",
      orderNotification: true,
      maintenanceMode: false,
      announcementMessage: savedMsg || "LIVRAISON PARTOUT AU MAROC \u2014 35 DH"
    };
  });

  // Security / password change state
  const [securityForm, setSecurityForm] = useState({ currentPwd: "", newPwd: "", confirmPwd: "", newEmail: localStorage.getItem("redmed_admin_email") || "admin@redmed.ma" });
  const [securityMsg, setSecurityMsg] = useState(null); // { type: 'success'|'error', text }
  const [showSecPwds, setShowSecPwds] = useState({ current: false, new: false, confirm: false });

  const handleChangeEmail = () => {
    if (!securityForm.newEmail || !securityForm.newEmail.includes("@")) {
      setSecurityMsg({ type: "error", text: "Veuillez entrer un e-mail valide." });
      return;
    }
    localStorage.setItem("redmed_admin_email", securityForm.newEmail);
    setSecurityMsg({ type: "success", text: "E-mail mis \u00e0 jour avec succ\u00e8s !" });
    setTimeout(() => setSecurityMsg(null), 4000);
  };

  const handleChangePassword = () => {
    const stored = localStorage.getItem("redmed_admin_password") || "redmed2024";
    if (!securityForm.currentPwd || !securityForm.newPwd || !securityForm.confirmPwd) {
      setSecurityMsg({ type: "error", text: "Veuillez remplir tous les champs." });
      return;
    }
    if (securityForm.currentPwd !== stored) {
      setSecurityMsg({ type: "error", text: "Mot de passe actuel incorrect." });
      return;
    }
    if (securityForm.newPwd.length < 6) {
      setSecurityMsg({ type: "error", text: "Le nouveau mot de passe doit contenir au moins 6 caract\u00e8res." });
      return;
    }
    if (securityForm.newPwd !== securityForm.confirmPwd) {
      setSecurityMsg({ type: "error", text: "Les mots de passe ne correspondent pas." });
      return;
    }
    localStorage.setItem("redmed_admin_password", securityForm.newPwd);
    setSecurityForm(prev => ({ ...prev, currentPwd: "", newPwd: "", confirmPwd: "" }));
    setSecurityMsg({ type: "success", text: "Mot de passe mis \u00e0 jour avec succ\u00e8s !" });
    setTimeout(() => setSecurityMsg(null), 4000);
  };

  // ─── Load data from PHP API on mount ───────────────────────────────────────
  const API = "http://localhost/redmed-api/api";
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    // Fetch orders from MySQL
    fetch(`${API}/orders/index.php`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data.length >= 0) {
          setOrders(data.data);
          setApiConnected(true);
        }
      })
      .catch(() => console.log("API non disponible, utilisation localStorage"));

    // Fetch products from MySQL
    fetch(`${API}/products/index.php`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Sync orders to localStorage (backup)
  useEffect(() => {
    localStorage.setItem("redmed_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("redmed_categories", JSON.stringify(categoriesList));
  }, [categoriesList]);

  useEffect(() => {
    localStorage.setItem("redmed_products", JSON.stringify(products));
  }, [products]);


  // Sync editOrderProducts when editingOrder changes
  useEffect(() => {
    if (editingOrder) {
      setEditOrderProducts(editingOrder.products || []);
    } else {
      setEditOrderProducts([]);
    }
  }, [editingOrder]);

  // Auto-populate size option in Order modals
  useEffect(() => {
    if ((showAddOrderModal || editingOrder) && products && products.length > 0) {
      const prod = products[selectedProductIndex];
      if (prod) {
        setSelectedProductSize(prod.sizes && prod.sizes.length > 0 ? prod.sizes[0].size : "TU");
      }
    }
  }, [showAddOrderModal, editingOrder, selectedProductIndex, products]);

  // Handle toast notification
  const [toasts, setToasts] = useState([]);
  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Notifications panel state
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [seenOrderIds, setSeenOrderIds] = useState(() => {
    const saved = localStorage.getItem("redmed_seen_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const markAllSeen = () => {
    const allIds = orders.map(o => o.id);
    setSeenOrderIds(allIds);
    localStorage.setItem("redmed_seen_orders", JSON.stringify(allIds));
  };

  const unseenOrders = orders.filter(o => !seenOrderIds.includes(o.id));

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setSelectedOrderId(null);
      setShowStatusDropdown(null);
      setShowNotifPanel(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Compute metrics based on active orders
  const computeMetrics = () => {
    const totalRevenue = orders
      .filter(o => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.price, 0);
    const totalOrders = orders.length;
    const deliveredCount = orders.filter(o => o.status === "delivered").length;
    const pendingConfirmationCount = orders.filter(o => o.status === "await-accept" || o.status === "new").length;
    
    // Simulating visitors & net profit
    const totalVisitors = 45600 + (orders.length * 12); 
    const netProfit = Math.round(totalRevenue * 0.61); // 61% profit margin simulated

    return {
      revenue: totalRevenue.toLocaleString(),
      orders: totalOrders,
      visitors: totalVisitors.toLocaleString(),
      profit: netProfit.toLocaleString(),
      delivered: deliveredCount,
      pending: pendingConfirmationCount
    };
  };

  const metrics = computeMetrics();

  const getProductImage = (pName) => {
    const found = products.find(cp => cp.name.toLowerCase() === pName.toLowerCase());
    return found ? found.image : "/prod_tee_black.png";
  };

  // Handle Add Order
  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrder.customer.trim() || !newOrder.phone.trim() || !newOrder.city.trim() || !newOrder.address.trim()) {
      addToast("Veuillez remplir le nom, le téléphone, la ville et l'adresse");
      return;
    }
    if (newOrderProducts.length === 0) {
      addToast("Veuillez ajouter au moins un produit à la commande");
      return;
    }

    const maxId = orders.length > 0 ? Math.max(...orders.map(o => parseInt(o.id) || 0)) : 0;
    const orderId = String(maxId + 1);

    const calculatedPrice = newOrderProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

    const created = {
      id: orderId,
      customer: newOrder.customer.trim(),
      phone: newOrder.phone.trim(),
      city: newOrder.city.trim(),
      address: newOrder.address.trim(),
      products: newOrderProducts,
      price: calculatedPrice,
      date: new Date().toISOString().split("T")[0],
      payment: newOrder.payment,
      status: newOrder.status
    };

    setOrders((prev) => [created, ...prev]);
    setShowAddOrderModal(false);
    setNewOrder({
      customer: "",
      phone: "",
      city: "",
      address: "",
      category: "T-Shirts",
      price: "",
      payment: "Cash on Delivery",
      status: "pending"
    });
    setNewOrderProducts([]);
    addToast(`Commande ${orderId} ajoutée avec succès !`);
  };

  // Handle Update Order (Save changes)
  const handleUpdateOrder = (e) => {
    e.preventDefault();
    if (!editingOrder.customer.trim() || !editingOrder.phone.trim() || !editingOrder.city?.trim() || !editingOrder.address?.trim()) {
      addToast("Veuillez remplir le nom, le téléphone, la ville et l'adresse");
      return;
    }
    if (editOrderProducts.length === 0) {
      addToast("Veuillez ajouter au moins un produit à la commande");
      return;
    }

    const calculatedPrice = editOrderProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

    setOrders((prev) => 
      prev.map((o) => o.id === editingOrder.id ? {
        ...o,
        customer: editingOrder.customer.trim(),
        phone: editingOrder.phone.trim(),
        city: editingOrder.city.trim(),
        address: editingOrder.address.trim(),
        payment: editingOrder.payment,
        status: editingOrder.status,
        products: editOrderProducts,
        price: calculatedPrice
      } : o)
    );

    setEditingOrder(null);
    addToast(`Commande ${editingOrder.id} modifiée avec succès !`);
  };

  // Handle Update Status
  const handleUpdateStatus = (id, newStatus) => {
    setOrders((prev) => 
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    addToast(`Statut de la commande mis à jour : ${newStatus}`);
  };

  // Handle Delete Order
  const handleDeleteOrder = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      addToast(`Commande ${id} supprimée`);
    }
  };

  // Handle Export Data
  const handleExportOrders = () => {
    addToast("Exportation des commandes en cours... (CSV simulé)");
  };

  // Filters calculation
  let filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch);
    
    const matchesStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    const matchesCategory = orderCategoryFilter === "all" || (o.products && o.products.some(p => {
      const catalogProd = products.find(cp => cp.name === p.name);
      if (catalogProd) return catalogProd.category === orderCategoryFilter;
      const name = p.name.toLowerCase();
      if (orderCategoryFilter === "T-Shirts" && name.includes("t-shirt")) return true;
      if (orderCategoryFilter === "Pants" && (name.includes("pants") || name.includes("pantalon") || name.includes("cargo"))) return true;
      if (orderCategoryFilter === "Sneakers" && (name.includes("basket") || name.includes("shoes") || name.includes("sneaker"))) return true;
      if (orderCategoryFilter === "Accessories" && (name.includes("casquette") || name.includes("accessoire") || name.includes("hat"))) return true;
      return false;
    }));
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Sort logic
  filteredOrders = [...filteredOrders].sort((a, b) => {
    if (orderSortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (orderSortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (orderSortBy === "price-desc") return b.price - a.price;
    if (orderSortBy === "price-asc") return a.price - b.price;
    if (orderSortBy === "id-desc") return b.id.localeCompare(a.id);
    return 0;
  });

  // Today's Date representation
  const formatTodayDate = () => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    return "Aujourd'hui, " + new Date().toLocaleDateString("fr-FR", options);
  };

  return (
    <div className="admin-layout">
      {/* Toast Panel */}
      <div className="toast-container" style={{ zIndex: 1100 }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="toast" style={{ minWidth: "220px", display: "flex", justifyContent: "space-between", background: "#111827", color: "#fff" }}>
            <span>{toast.message}</span>
            <button onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Left Sidebar Menu */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo" onClick={() => window.location.hash = "#/"}>
          <img src="/logo.png" alt="REDMED LOGO" />
        </div>

        <nav className="admin-nav-links">
          <button 
            className={`admin-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart3 size={20} strokeWidth={1.8} />
            <span className="admin-nav-text">Dashboard</span>
            <span className="nav-tooltip">Dashboard / Analytics</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ClipboardList size={20} strokeWidth={1.8} />
            <span className="admin-nav-text">Commandes</span>
            <span className="nav-tooltip">Commandes</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={20} strokeWidth={1.8} />
            <span className="admin-nav-text">Articles</span>
            <span className="nav-tooltip">Catalogue Articles</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === "categories" ? "active" : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            <Users size={20} strokeWidth={1.8} />
            <span className="admin-nav-text">Catégories</span>
            <span className="nav-tooltip">Catégories</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} strokeWidth={1.8} />
            <span className="admin-nav-text">Paramètres</span>
            <span className="nav-tooltip">Paramètres</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button 
            className="admin-nav-item" 
            onClick={() => {
              if (window.confirm("Se déconnecter du panel administration ?")) {
                onLogout();
              }
            }}
          >
            <LogOut size={20} strokeWidth={1.8} />
            <span className="admin-nav-text">Quitter</span>
            <span className="nav-tooltip">Quitter l'Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-panel">
        
        {/* Top Navbar Area */}
        <header className="admin-header">
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: "700" }}>Administration RedMed</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--admin-text-sub)" }}>Gestion de la boutique en ligne</p>
          </div>
          
          <div className="admin-header-actions">
            <div className="admin-search-wrapper">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                className="admin-search-input" 
                placeholder={activeTab === "orders" ? "Rechercher commande..." : "Rechercher..."} 
                value={activeTab === "orders" ? orderSearch : ""}
                onChange={(e) => {
                  if (activeTab === "orders") {
                    setOrderSearch(e.target.value);
                  }
                }}
              />
            </div>

            <div className="admin-date-badge">
              {formatTodayDate()}
            </div>

            <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
              <button
                className="admin-icon-btn"
                style={{ position: "relative" }}
                onClick={() => setShowNotifPanel(prev => !prev)}
              >
                <Bell size={18} />
                {unseenOrders.length > 0 && (
                  <span style={{
                    position: "absolute", top: "2px", right: "2px",
                    background: "#ef4444", color: "#fff",
                    borderRadius: "50%", width: "16px", height: "16px",
                    fontSize: "10px", fontWeight: "700",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    lineHeight: 1, pointerEvents: "none"
                  }}>
                    {unseenOrders.length > 9 ? "9+" : unseenOrders.length}
                  </span>
                )}
              </button>

              {showNotifPanel && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", right: 0,
                  width: "340px", background: "var(--admin-card-bg)",
                  border: "1px solid var(--admin-border)", borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 999,
                  overflow: "hidden"
                }}>
                  {/* Header */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "1rem 1.25rem", borderBottom: "1px solid var(--admin-border)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Bell size={16} />
                      <span style={{ fontWeight: "700", fontSize: "0.9rem" }}>Notifications</span>
                      {unseenOrders.length > 0 && (
                        <span style={{
                          background: "#ef4444", color: "#fff",
                          borderRadius: "20px", padding: "1px 8px",
                          fontSize: "0.7rem", fontWeight: "700"
                        }}>{unseenOrders.length} nouveau{unseenOrders.length > 1 ? "x" : ""}</span>
                      )}
                    </div>
                    {unseenOrders.length > 0 && (
                      <button
                        style={{ fontSize: "0.75rem", color: "var(--admin-accent)", fontWeight: "600", background: "none", border: "none", cursor: "pointer" }}
                        onClick={markAllSeen}
                      >
                        Tout marquer lu
                      </button>
                    )}
                  </div>

                  {/* List */}
                  <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                    {orders.length === 0 ? (
                      <div style={{ padding: "2rem", textAlign: "center", color: "var(--admin-text-sub)", fontSize: "0.85rem" }}>
                        Aucune commande pour l'instant
                      </div>
                    ) : (
                      orders.slice(0, 10).map(order => {
                        const isUnseen = !seenOrderIds.includes(order.id);
                        const statusColor = order.status === "pending" ? "#f97316" : order.status === "confirmed" ? "#3b82f6" : order.status === "delivered" ? "#10b981" : "#ef4444";
                        const statusLabel = order.status === "pending" ? "En attente" : order.status === "confirmed" ? "Confirm\u00e9e" : order.status === "delivered" ? "Livr\u00e9e" : "Annul\u00e9e";
                        return (
                          <div
                            key={order.id}
                            onClick={() => {
                              setActiveTab("orders");
                              setShowNotifPanel(false);
                              markAllSeen();
                            }}
                            style={{
                              display: "flex", alignItems: "flex-start", gap: "0.75rem",
                              padding: "0.85rem 1.25rem",
                              borderBottom: "1px solid var(--admin-border)",
                              cursor: "pointer",
                              background: isUnseen ? "rgba(99,102,241,0.06)" : "transparent",
                              transition: "background 0.2s"
                            }}
                          >
                            {/* Dot */}
                            <div style={{
                              width: "8px", height: "8px", borderRadius: "50%",
                              background: isUnseen ? "#6366f1" : "transparent",
                              flexShrink: 0, marginTop: "5px"
                            }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                                <span style={{ fontWeight: "700", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {order.customer}
                                </span>
                                <span style={{ fontSize: "0.75rem", fontWeight: "700", color: statusColor, flexShrink: 0 }}>
                                  {statusLabel}
                                </span>
                              </div>
                              <div style={{ fontSize: "0.78rem", color: "var(--admin-text-sub)", marginTop: "2px", display: "flex", gap: "0.5rem", justifyContent: "space-between" }}>
                                <span>Commande #{order.id} • {order.price} DH</span>
                                <span>{order.date}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid var(--admin-border)" }}>
                    <button
                      style={{
                        width: "100%", padding: "0.6rem", borderRadius: "10px",
                        background: "var(--admin-accent)", color: "#fff",
                        border: "none", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer"
                      }}
                      onClick={() => { setActiveTab("orders"); setShowNotifPanel(false); markAllSeen(); }}
                    >
                      Voir toutes les commandes
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="admin-icon-btn" onClick={() => setActiveTab("settings")}>
              <Settings size={18} />
            </button>

            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
              alt="Admin Profile" 
              className="admin-profile-pic"
              onClick={() => setActiveTab("settings")}
            />
          </div>
        </header>

        {/* Dynamic Tab Renderings */}
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Greeting Header */}
            <div className="admin-greeting">
              <div>
                <h1>Bonjour, Barbara! 👋</h1>
                <p>Voici ce qu'il se passe sur votre boutique ce mois-ci.</p>
              </div>

              <div className="admin-timeframe-selector">
                <select className="admin-select" defaultValue="month">
                  <option value="today">Aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois-ci</option>
                  <option value="year">Cette année</option>
                </select>
                <div className="admin-calendar-btn">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="admin-grid-4col">
              
              {/* Total Revenue */}
              <div className="admin-kpi-card accent">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">Revenu total</span>
                  <button className="admin-kpi-arrow" onClick={() => setActiveTab("orders")}>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="admin-kpi-body">
                  <div className="admin-kpi-value">
                    {metrics.revenue} DH
                    <span className="admin-trend-badge up">
                      + 1.4%
                    </span>
                  </div>
                  <div className="admin-kpi-footer">Par rapport au mois dernier</div>
                </div>
              </div>

              {/* Total Orders */}
              <div className="admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">Commandes totales</span>
                  <button className="admin-kpi-arrow" onClick={() => setActiveTab("orders")}>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="admin-kpi-body">
                  <div className="admin-kpi-value">
                    {metrics.orders}
                    <span className="admin-trend-badge down">
                      - 3.6%
                    </span>
                  </div>
                  <div className="admin-kpi-footer">Par rapport au mois dernier</div>
                </div>
              </div>

              {/* Total Visitors */}
              <div className="admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">Visiteurs</span>
                  <button className="admin-kpi-arrow" onClick={() => addToast("Simulé depuis Analytics")}>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="admin-kpi-body">
                  <div className="admin-kpi-value">
                    {metrics.visitors}
                    <span className="admin-trend-badge down">
                      - 2.6%
                    </span>
                  </div>
                  <div className="admin-kpi-footer">Par rapport au mois dernier</div>
                </div>
              </div>

              {/* Net Profit */}
              <div className="admin-kpi-card">
                <div className="admin-kpi-header">
                  <span className="admin-kpi-title">Bénéfice net</span>
                  <button className="admin-kpi-arrow" onClick={() => addToast("Calculé sur 61% de marge")}>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="admin-kpi-body">
                  <div className="admin-kpi-value">
                    {metrics.profit} DH
                    <span className="admin-trend-badge up">
                      + 5.6%
                    </span>
                  </div>
                  <div className="admin-kpi-footer">Par rapport au mois dernier</div>
                </div>
              </div>

            </div>



            {/* Recent Orders Panel */}
            <div className="admin-card" style={{ padding: "1.5rem" }}>
              <div className="admin-card-header" style={{ marginBottom: "1rem" }}>
                <h3 className="admin-card-title">Commandes récentes</h3>
              </div>
              
              <div className="admin-table-container" style={{ borderRadius: "12px", border: "1px solid var(--admin-border)" }}>
                <table className="admin-table" style={{ minWidth: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem" }}>N° Commande</th>
                      <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem" }}>Client</th>
                      <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem" }}>Prix</th>
                      <th style={{ padding: "0.75rem 1rem", fontSize: "0.75rem" }}>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td style={{ padding: "0.75rem 1rem", fontWeight: "700" }}>{order.id}</td>
                        <td style={{ padding: "0.75rem 1rem" }}>{order.customer}</td>
                        <td style={{ padding: "0.75rem 1rem", fontWeight: "700" }}>{order.price} DH</td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <span className={`admin-status-badge ${order.status}`} style={{ cursor: "default", pointerEvents: "none" }}>
                            {order.status === "pending" && "En attente"}
                            {order.status === "confirmed" && "Confirmée"}
                            {order.status === "delivered" && "Livrée"}
                            {order.status === "cancelled" && "Annulée"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button 
                className="admin-btn secondary"
                style={{ width: "100%", marginTop: "1.25rem", justifyContent: "center", borderRadius: "12px" }}
                onClick={() => {
                  setOrderStatusFilter("all");
                  setActiveTab("orders");
                }}
              >
                Voir toutes les commandes &rarr;
              </button>
            </div>

          </div>
        )}

        {activeTab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Header Title Area */}
            <div className="admin-panel-title-area">
              <div>
                <h2>Liste des commandes</h2>
                <p style={{ color: "var(--admin-text-sub)", fontSize: "0.85rem" }}>
                  Gérer et mettre à jour le statut des commandes clients.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="admin-btn secondary" onClick={handleExportOrders}>
                  <Download size={16} />
                  Exporter
                </button>


              </div>
            </div>

            {/* Quick Summary Widgets */}
            <div className="admin-grid-4col" style={{ minHeight: "auto", gap: "1rem" }}>
              <div className="admin-kpi-card" style={{ minHeight: "100px", padding: "1.25rem" }}>
                <span className="admin-kpi-title" style={{ fontSize: "0.75rem" }}>En attente</span>
                <div className="admin-kpi-value" style={{ fontSize: "1.75rem", marginTop: "0.5rem", color: "#f97316" }}>
                  {orders.filter(o => o.status === "pending").length}
                </div>
              </div>

              <div className="admin-kpi-card" style={{ minHeight: "100px", padding: "1.25rem" }}>
                <span className="admin-kpi-title" style={{ fontSize: "0.75rem" }}>Confirmées</span>
                <div className="admin-kpi-value" style={{ fontSize: "1.75rem", marginTop: "0.5rem", color: "#3b82f6" }}>
                  {orders.filter(o => o.status === "confirmed").length}
                </div>
              </div>

              <div className="admin-kpi-card" style={{ minHeight: "100px", padding: "1.25rem" }}>
                <span className="admin-kpi-title" style={{ fontSize: "0.75rem" }}>Livrées</span>
                <div className="admin-kpi-value" style={{ fontSize: "1.75rem", marginTop: "0.5rem", color: "#10b981" }}>
                  {orders.filter(o => o.status === "delivered").length}
                </div>
              </div>

              <div className="admin-kpi-card" style={{ minHeight: "100px", padding: "1.25rem" }}>
                <span className="admin-kpi-title" style={{ fontSize: "0.75rem" }}>Annulées</span>
                <div className="admin-kpi-value" style={{ fontSize: "1.75rem", marginTop: "0.5rem", color: "#ef4444" }}>
                  {orders.filter(o => o.status === "cancelled").length}
                </div>
              </div>
            </div>

            {/* Filters panel */}
            <div className="admin-filters-bar">
              <div className="admin-filters-left">
                {/* Search */}
                <div className="admin-search-wrapper" style={{ flex: 1, minWidth: "200px", width: "auto" }}>
                  <Search size={16} style={{ color: "var(--admin-text-sub)" }} />
                  <input 
                    type="text" 
                    placeholder="Filtrer par nom ou numéro..." 
                    className="admin-search-input"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                </div>

                {/* Filter Status select */}
                <select 
                  className="admin-form-select" 
                  value={orderStatusFilter} 
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "14px" }}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="delivered">Livrée</option>
                  <option value="cancelled">Annulée</option>
                </select>

                {/* Filter Category select */}
                <select 
                  className="admin-form-select" 
                  value={orderCategoryFilter} 
                  onChange={(e) => setOrderCategoryFilter(e.target.value)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "14px" }}
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Pants">Pantalons</option>
                  <option value="Sneakers">Baskets</option>
                  <option value="Accessories">Accessoires</option>
                  <option value="Prints">Impression / Prints</option>
                </select>
              </div>

              <div className="admin-filters-right">
                <span style={{ fontSize: "0.8rem", color: "var(--admin-text-sub)", fontWeight: "500" }}>
                  Trier par :
                </span>
                <select 
                  className="admin-form-select" 
                  value={orderSortBy} 
                  onChange={(e) => setOrderSortBy(e.target.value)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "14px" }}
                >
                  <option value="date-desc">Plus récent</option>
                  <option value="date-asc">Plus ancien</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="id-desc">ID commande</option>
                </select>
              </div>
            </div>

            {/* Filter tags / Chips */}
            {(orderSearch || orderStatusFilter !== "all" || orderCategoryFilter !== "all") && (
              <div className="admin-chips-list">
                {orderSearch && (
                  <span className="admin-chip">
                    Recherche: {orderSearch}
                    <X size={12} className="admin-chip-close" onClick={() => setOrderSearch("")} />
                  </span>
                )}
                {orderStatusFilter !== "all" && (
                  <span className="admin-chip">
                    Statut: {orderStatusFilter}
                    <X size={12} className="admin-chip-close" onClick={() => setOrderStatusFilter("all")} />
                  </span>
                )}
                {orderCategoryFilter !== "all" && (
                  <span className="admin-chip">
                    Catégorie: {orderCategoryFilter}
                    <X size={12} className="admin-chip-close" onClick={() => setOrderCategoryFilter("all")} />
                  </span>
                )}
                <button 
                  onClick={() => {
                    setOrderSearch("");
                    setOrderStatusFilter("all");
                    setOrderCategoryFilter("all");
                  }} 
                  style={{ background: "none", border: "none", fontSize: "0.75rem", color: "var(--admin-accent)", fontWeight: "600", cursor: "pointer", marginLeft: "0.5rem" }}
                >
                  Effacer les filtres
                </button>
              </div>
            )}

            {/* Table Container */}
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>N° Commande</th>
                    <th>Client</th>
                    <th>Produits / Options</th>
                    <th>Prix</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th style={{ width: "80px", textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <span className="admin-order-num">{order.id}</span>
                        </td>
                        <td>
                          <div className="admin-customer-cell" style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                            <span className="admin-customer-name" style={{ fontWeight: "700", color: "var(--admin-text-main)" }}>{order.customer}</span>
                            <span className="admin-customer-phone" style={{ fontSize: "0.78rem", color: "var(--admin-text-sub)" }}>{order.phone}</span>
                            {(order.city || order.address) && (
                              <span className="admin-customer-loc" style={{ fontSize: "0.74rem", color: "var(--admin-accent)", marginTop: "0.15rem", display: "inline-flex", flexWrap: "wrap", gap: "0.25rem", whiteSpace: "normal", wordBreak: "break-word" }}>
                                📍 {order.city} {order.address ? `• ${order.address}` : ""}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="admin-order-products-container">
                            {order.products && order.products.map((p, pIdx) => {
                              const img = getProductImage(p.name);
                              const isClothing = p.size && ["S","M","L","XL","XXL"].includes(p.size);
                              const isShoe = p.size && !isNaN(parseInt(p.size)) && parseInt(p.size) >= 36 && parseInt(p.size) <= 48;
                              const isPants = p.size && !isNaN(parseInt(p.size)) && parseInt(p.size) >= 28 && parseInt(p.size) <= 40;
                              const sizeType = isClothing ? "taille" : isShoe ? "pointure" : isPants ? "taille" : null;
                              return (
                                <div key={pIdx} className="admin-order-product-item">
                                  <div className="admin-order-product-thumb-container">
                                    <img
                                      src={img}
                                      alt={p.name}
                                      className="admin-order-product-thumb"
                                      onError={(e) => { e.target.src = "/prod_tee_black.png"; }}
                                    />
                                    {p.quantity > 1 && (
                                      <span className="admin-order-product-qty-badge">{p.quantity}</span>
                                    )}
                                  </div>
                                  <div className="admin-order-product-info">
                                    <span className="admin-order-product-name" title={p.name}>{p.name}</span>
                                    <div className="admin-order-product-options">
                                      {p.quantity === 1 && (
                                        <span className="admin-order-product-option-tag" style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", borderColor: "rgba(99,102,241,0.2)" }}>
                                          x{p.quantity}
                                        </span>
                                      )}
                                      {p.size && p.size !== "TU" && (
                                        <span className="admin-order-product-option-tag" style={{ background: "rgba(16,185,129,0.07)", color: "#059669", borderColor: "rgba(16,185,129,0.2)" }}>
                                          {sizeType ? `${sizeType} ${p.size}` : p.size}
                                        </span>
                                      )}
                                      {p.size === "TU" && (
                                        <span className="admin-order-product-option-tag">TU</span>
                                      )}
                                      {p.color && (
                                        <span className="admin-order-product-option-tag" style={{ background: "rgba(245,158,11,0.07)", color: "#b45309", borderColor: "rgba(245,158,11,0.2)" }}>
                                          ● {p.color}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td style={{ fontWeight: "700" }}>{order.price} DH</td>
                        <td>{order.date}</td>
                        <td>
                          <select 
                            className={`admin-status-select ${order.status}`}
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="delivered">Livrée</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                        </td>
                        <td>
                          <div className="admin-actions-menu-wrapper" onClick={(e) => e.stopPropagation()}>
                            <button 
                              className="admin-action-trigger"
                              onClick={() => setSelectedOrderId(selectedOrderId === order.id ? null : order.id)}
                            >
                              <MoreHorizontal size={16} />
                            </button>

                            {selectedOrderId === order.id && (
                              <div className="admin-actions-menu">
                                <button 
                                  className="admin-action-menu-item"
                                  onClick={() => {
                                    addToast(`Détails de la commande ${order.id} : ${order.customer} - ${order.price} DH`);
                                    setSelectedOrderId(null);
                                  }}
                                >
                                  Détails
                                </button>
                                <button 
                                  className="admin-action-menu-item"
                                  onClick={() => {
                                    setEditingOrder(order);
                                    setSelectedOrderId(null);
                                  }}
                                >
                                  <Edit3 size={12} />
                                  Modifier
                                </button>
                                <button 
                                  className="admin-action-menu-item delete"
                                  onClick={() => {
                                    handleDeleteOrder(order.id);
                                    setSelectedOrderId(null);
                                  }}
                                >
                                  <Trash2 size={12} />
                                  Supprimer
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", padding: "3rem", color: "var(--admin-text-sub)" }}>
                        Aucune commande ne correspond aux filtres de recherche.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination widget */}
            <div className="admin-pagination">
              <span className="admin-pagination-text">
                Affichage de {filteredOrders.length} sur {orders.length} commandes
              </span>
              <div className="admin-pagination-controls">
                <button className="admin-btn secondary" disabled style={{ opacity: 0.5, padding: "0.4rem 0.8rem", borderRadius: "8px" }}>Précédent</button>
                <button className="admin-btn secondary" disabled style={{ opacity: 0.5, padding: "0.4rem 0.8rem", borderRadius: "8px" }}>Suivant</button>
              </div>
            </div>

          </div>
        )}

        {activeTab === "products" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div className="admin-panel-title-area">
              <div>
                <h2>Catalogue Articles ({products.length} articles)</h2>
                <p style={{ color: "var(--admin-text-sub)", fontSize: "0.85rem" }}>
                  Visualisez les stocks et articles en ligne de la boutique RedMed.
                </p>
              </div>
              <button 
                className="admin-btn primary"
                onClick={() => {
                  resetAddProductModal();
                  setNewProduct({
                    name: "",
                    price: "",
                    category: "T-Shirts",
                    image: "/prod_tee_black.png",
                    description: "Nouvel article streetwear RedMed.",
                    details: "100% Coton premium\nCoupe moderne"
                  });
                  setNewProductSizeType("unique");
                  setNewProductSizes(["TU"]);
                  setNewProductStocks({ "TU": 10 });
                  setNewProductColors([]);
                  setHasOptions(false);
                  setShowColors(false);
                  setShowSizes(false);
                  setNewProductImages(["/prod_tee_black.png"]);
                  setShowAddProductModal(true);
                }}
              >
                <Plus size={16} />
                Ajouter article
              </button>
            </div>

            {/* Grid display */}
            <div className="admin-product-grid">
              {products.map((product) => {
                const totalStock = product.sizes ? product.sizes.reduce((sum, s) => sum + s.stock, 0) : 0;
                return (
                  <div key={product.id} className="admin-product-card">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="admin-product-img" 
                      onError={(e) => {
                        e.target.src = "/prod_tee_black.png";
                      }}
                    />
                    <div className="admin-product-info">
                      <div>
                        <h4 className="admin-product-title">{product.name}</h4>
                        <span className="admin-product-cat">{product.category}</span>
                      </div>
                      
                      <div className="admin-product-price-stock">
                        <span className="admin-product-price">{product.price}</span>
                        <span className={`admin-product-stock ${totalStock <= 5 ? "low" : ""}`}>
                          {totalStock <= 0 ? "En Rupture" : `Stock: ${totalStock}`}
                        </span>
                      </div>

                      <div className="admin-product-actions" style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button 
                          className="admin-btn secondary" 
                          style={{ flex: 1, padding: "0.35rem 0.5rem", fontSize: "0.75rem", borderRadius: "8px", gap: "0.25rem", minHeight: "auto", height: "32px", justifyContent: "center" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(product);
                          }}
                        >
                          <Edit3 size={12} />
                          Modifier
                        </button>
                        <button 
                          className="admin-btn secondary" 
                          style={{ flex: 1, padding: "0.35rem 0.5rem", fontSize: "0.75rem", borderRadius: "8px", gap: "0.25rem", minHeight: "auto", height: "32px", justifyContent: "center", borderColor: "#fee2e2", color: "#dc2626" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Supprimer l'article "${product.name}" ?`)) {
                              setProducts(prev => prev.filter(p => p.id !== product.id));
                              addToast(`Article "${product.name}" supprimé !`);
                            }
                          }}
                        >
                          <Trash2 size={12} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {activeTab === "categories" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div>
              <h2>Gestion des Catégories</h2>
              <p style={{ color: "var(--admin-text-sub)", fontSize: "0.85rem" }}>
                Gérer les slogans, taglines et descriptions de collections affichées sur la page d'accueil.
              </p>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Catégorie</th>
                    <th>Slogan / Tagline</th>
                    <th>Description Collection</th>
                    <th>Articles associés</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesList.map((cat, idx) => (
                    <tr key={idx}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <img src={cat.image} alt={cat.name} style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} onError={(e) => e.target.src = "/prod_tee_black.png"} />
                          <span style={{ fontWeight: "700" }}>{cat.name}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: "0.78rem", fontWeight: "600", color: "var(--admin-accent)" }}>{cat.tagline}</td>
                      <td style={{ fontSize: "0.8rem", color: "var(--admin-text-sub)", maxWidth: "300px", whiteSpace: "normal" }}>{cat.desc}</td>
                      <td style={{ fontWeight: "600" }}>{cat.count} articles</td>
                      <td>
                        <button 
                          className="admin-btn secondary" 
                          style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem", borderRadius: "8px" }}
                          onClick={() => setEditingCategory({ index: idx, ...cat })}
                        >
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div>
              <h2>Paramètres de la boutique</h2>
              <p style={{ color: "var(--admin-text-sub)", fontSize: "0.85rem" }}>
                Gérer les préférences globales du site web et de l'administration.
              </p>
            </div>

            <div className="admin-card admin-settings-card">
              
              <div className="admin-settings-row">
                <div className="admin-settings-info">
                  <h3>Informations Générales</h3>
                  <p>Nom de la boutique et adresses de contact de RedMed.</p>
                </div>
                <div className="admin-settings-inputs">
                  <div className="admin-form-group">
                    <span className="admin-form-label">Nom de la boutique</span>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      value={settings.storeName}
                      onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <span className="admin-form-label">E-mail de contact</span>
                    <input 
                      type="email" 
                      className="admin-form-input" 
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-settings-row">
                <div className="admin-settings-info">
                  <h3>Tarifs et Livraison</h3>
                  <p>Devise utilisée par défaut et conditions de frais de ports gratuits.</p>
                </div>
                <div className="admin-settings-inputs">
                  <div className="admin-form-group">
                    <span className="admin-form-label">Devise</span>
                    <select 
                      className="admin-form-select"
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    >
                      <option value="DH">Dirham Marocain (DH)</option>
                      <option value="USD">Dollar Américain ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <span className="admin-form-label">Livraison gratuite à partir de</span>
                    <input 
                      type="number" 
                      className="admin-form-input" 
                      value={settings.freeShippingLimit}
                      onChange={(e) => setSettings({ ...settings, freeShippingLimit: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-settings-row">
                <div className="admin-settings-info">
                  <h3>Bande d'annonce</h3>
                  <p>Message affiché en haut du site (barre noire au-dessus de la navbar).</p>
                </div>
                <div className="admin-settings-inputs">
                  <div className="admin-form-group">
                    <span className="admin-form-label">Message d'annonce</span>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="Ex: LIVRAISON PARTOUT AU MAROC — 35 DH"
                      value={settings.announcementMessage}
                      onChange={(e) => setSettings({ ...settings, announcementMessage: e.target.value })}
                    />
                  </div>
                </div>
              </div>



              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button 
                  className="admin-btn primary"
                  onClick={() => {
                    localStorage.setItem("redmed_announcement", settings.announcementMessage);
                    addToast("Paramètres sauvegardés avec succès !");
                  }}
                >
                  <Save size={16} />
                  Sauvegarder les paramètres
                </button>
              </div>

              {/* Sécurité — Changer le mot de passe */}
              <div className="admin-settings-row" style={{ borderTop: "2px solid var(--admin-border)", paddingTop: "1.5rem" }}>
                <div className="admin-settings-info">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <Shield size={16} style={{ color: "#6366f1" }} />
                    <h3 style={{ margin: 0 }}>Sécurité</h3>
                  </div>
                  <p>Modifier les identifiants d'accès au panel administration.</p>
                  <p style={{ fontSize: "0.75rem", color: "#f97316", marginTop: "0.25rem", fontWeight: "600" }}>
                    Par défaut : admin@redmed.ma / redmed2024
                  </p>
                </div>
                <div className="admin-settings-inputs">

                  {/* Email section */}
                  <div style={{ padding: "1rem", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "12px", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--admin-text-sub)", display: "block", marginBottom: "0.75rem" }}>
                      📧 Modifier l'e-mail de connexion
                    </span>
                    <div className="admin-form-group" style={{ marginBottom: "0.75rem" }}>
                      <span className="admin-form-label">Nouvel e-mail</span>
                      <input
                        type="email"
                        className="admin-form-input"
                        placeholder="admin@redmed.ma"
                        value={securityForm.newEmail}
                        onChange={(e) => setSecurityForm({ ...securityForm, newEmail: e.target.value })}
                      />
                    </div>
                    <button
                      className="admin-btn secondary"
                      onClick={handleChangeEmail}
                      style={{ width: "100%" }}
                    >
                      <Save size={14} />
                      Mettre à jour l'e-mail
                    </button>
                  </div>

                  {/* Password section */}
                  <div style={{ padding: "1rem", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "12px" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--admin-text-sub)", display: "block", marginBottom: "0.75rem" }}>
                      🔑 Modifier le mot de passe
                    </span>
                  <div className="admin-form-group">
                    <span className="admin-form-label">Mot de passe actuel</span>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showSecPwds.current ? "text" : "password"}
                        className="admin-form-input"
                        placeholder="Entrez le mot de passe actuel"
                        value={securityForm.currentPwd}
                        onChange={(e) => setSecurityForm({ ...securityForm, currentPwd: e.target.value })}
                        style={{ paddingRight: "2.5rem" }}
                      />
                      <button type="button" onClick={() => setShowSecPwds(p => ({ ...p, current: !p.current }))}
                        style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--admin-text-sub)" }}>
                        {showSecPwds.current ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <span className="admin-form-label">Nouveau mot de passe</span>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showSecPwds.new ? "text" : "password"}
                        className="admin-form-input"
                        placeholder="Minimum 6 caractères"
                        value={securityForm.newPwd}
                        onChange={(e) => setSecurityForm({ ...securityForm, newPwd: e.target.value })}
                        style={{ paddingRight: "2.5rem" }}
                      />
                      <button type="button" onClick={() => setShowSecPwds(p => ({ ...p, new: !p.new }))}
                        style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--admin-text-sub)" }}>
                        {showSecPwds.new ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <span className="admin-form-label">Confirmer le nouveau mot de passe</span>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showSecPwds.confirm ? "text" : "password"}
                        className="admin-form-input"
                        placeholder="Répétez le nouveau mot de passe"
                        value={securityForm.confirmPwd}
                        onChange={(e) => setSecurityForm({ ...securityForm, confirmPwd: e.target.value })}
                        style={{ paddingRight: "2.5rem" }}
                      />
                      <button type="button" onClick={() => setShowSecPwds(p => ({ ...p, confirm: !p.confirm }))}
                        style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--admin-text-sub)" }}>
                        {showSecPwds.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {securityMsg && (
                    <div style={{
                      padding: "0.7rem 1rem", borderRadius: "10px", fontSize: "0.82rem", fontWeight: "600",
                      background: securityMsg.type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                      color: securityMsg.type === "success" ? "#10b981" : "#ef4444",
                      border: `1px solid ${securityMsg.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`
                    }}>
                      {securityMsg.text}
                    </div>
                  )}

                  <button
                    className="admin-btn primary"
                    onClick={handleChangePassword}
                    style={{ marginTop: "0.25rem", background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    <Shield size={15} />
                    Mettre à jour le mot de passe
                  </button>
                  </div>{/* end password box */}
                </div>{/* end settings-inputs */}
              </div>{/* end settings-row */}

            </div>

          </div>
        )}

      </main>

      {/* Add Command Dialog Modal (Simulated drawer) */}
      {showAddOrderModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddOrderModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Créer une commande</h3>
              <button className="admin-modal-close" onClick={() => setShowAddOrderModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateOrder}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <span className="admin-form-label">Client (Nom complet) *</span>
                  <input 
                    type="text" 
                    placeholder="Ex: Omar El Fassi" 
                    className="admin-form-input"
                    value={newOrder.customer}
                    onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Téléphone *</span>
                  <input 
                    type="tel" 
                    placeholder="Ex: 0661234567" 
                    className="admin-form-input"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Ville *</span>
                  <input 
                    type="text" 
                    placeholder="Ex: Casablanca" 
                    className="admin-form-input"
                    value={newOrder.city}
                    onChange={(e) => setNewOrder({ ...newOrder, city: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Adresse de livraison *</span>
                  <textarea 
                    placeholder="Ex: Numéro de rue, quartier, appartement..." 
                    className="admin-form-input"
                    style={{ minHeight: "60px", resize: "vertical", fontFamily: "inherit" }}
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                    required
                  />
                </div>

                {/* Multiple Products Builder Row */}
                <div style={{ borderTop: "1px dashed var(--admin-border)", borderBottom: "1px dashed var(--admin-border)", padding: "1rem 0", margin: "1rem 0" }}>
                  <span className="admin-form-label" style={{ display: "block", marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--admin-text-main)" }}>
                    Ajouter des produits à la commande
                  </span>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {/* Catalog Product Dropdown */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Choisir un article :</span>
                      <select
                        className="admin-form-select"
                        value={selectedProductIndex}
                        onChange={(e) => {
                          const idx = parseInt(e.target.value);
                          setSelectedProductIndex(idx);
                          const prod = products[idx];
                          setSelectedProductSize(prod.sizes && prod.sizes.length > 0 ? prod.sizes[0].size : "TU");
                        }}
                      >
                        {products.map((p, idx) => (
                          <option key={p.id} value={idx}>{p.name} ({p.price})</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                      {/* Size Selector */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Taille / Options :</span>
                        <select
                          className="admin-form-select"
                          value={selectedProductSize}
                          onChange={(e) => setSelectedProductSize(e.target.value)}
                        >
                          {products[selectedProductIndex]?.sizes && products[selectedProductIndex].sizes.length > 0 ? (
                            products[selectedProductIndex].sizes.map(s => (
                              <option key={s.size} value={s.size}>{s.size} (Stock: {s.stock})</option>
                            ))
                          ) : (
                            <option value="TU">Taille Unique (TU)</option>
                          )}
                        </select>
                      </div>

                      {/* Color Input */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Couleur :</span>
                        <input
                          type="text"
                          className="admin-form-input"
                          placeholder="Noir/Blanc..."
                          value={selectedProductColor}
                          onChange={(e) => setSelectedProductColor(e.target.value)}
                        />
                      </div>

                      {/* Quantity Input */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Quantité :</span>
                        <input
                          type="number"
                          className="admin-form-input"
                          min="1"
                          value={selectedProductQty}
                          onChange={(e) => setSelectedProductQty(parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="admin-btn secondary"
                      style={{ alignSelf: "flex-end", padding: "0.4rem 1rem", fontSize: "0.75rem", borderRadius: "10px", marginTop: "0.25rem" }}
                      onClick={() => {
                        const prod = products[selectedProductIndex];
                        if (!prod) return;
                        
                        const item = {
                          name: prod.name,
                          size: selectedProductSize || "TU",
                          color: selectedProductColor || "Standard",
                          quantity: selectedProductQty,
                          price: prod.numericPrice || parseFloat(prod.price.replace(" DH", "")) || 0
                        };
                        setNewOrderProducts(prev => [...prev, item]);
                        addToast(`"${prod.name}" ajouté à la commande !`);
                      }}
                    >
                      Ajouter ce produit (+)
                    </button>
                  </div>

                  {/* Added Items Preview */}
                  {newOrderProducts.length > 0 && (
                    <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#f9fafb", borderRadius: "12px", border: "1px solid var(--admin-border)" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                        Produits ajoutés à cette commande :
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {newOrderProducts.map((p, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", justifyPosition: "space-between", fontSize: "0.8rem", padding: "0.25rem 0", borderBottom: idx < newOrderProducts.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                            <div>
                              <span style={{ fontWeight: "700", color: "var(--admin-accent)" }}>{p.quantity}x</span> {p.name} 
                              <span style={{ color: "var(--admin-text-sub)", fontSize: "0.7rem", marginLeft: "0.35rem" }}>
                                ({p.size}, {p.color})
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontWeight: "700" }}>{p.price * p.quantity} DH</span>
                              <button
                                type="button"
                                style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center" }}
                                onClick={() => setNewOrderProducts(prev => prev.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Prix Total (DH) - Calculé automatiquement</span>
                  <input 
                    type="text" 
                    className="admin-form-input" 
                    value={`${newOrderProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)} DH`} 
                    disabled 
                    style={{ fontWeight: "700", background: "#f3f4f6" }} 
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Méthode de Paiement</span>
                  <select 
                    className="admin-form-select"
                    value={newOrder.payment}
                    onChange={(e) => setNewOrder({ ...newOrder, payment: e.target.value })}
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Statut Initial</span>
                  <select 
                    className="admin-form-select"
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="delivered">Livrée</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-btn secondary" 
                  onClick={() => setShowAddOrderModal(false)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="admin-btn primary"
                >
                  Créer la commande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Dialog Modal */}
      {editingCategory && (
        <div className="admin-modal-overlay" onClick={() => setEditingCategory(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Modifier la catégorie : {editingCategory.name}</h3>
              <button className="admin-modal-close" onClick={() => setEditingCategory(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setCategoriesList(prev => prev.map((c, i) => 
                i === editingCategory.index 
                  ? { 
                      ...c, 
                      tagline: editingCategory.tagline, 
                      desc: editingCategory.desc, 
                      image: editingCategory.image 
                    } 
                  : c
              ));
              addToast(`Catégorie "${editingCategory.name}" mise à jour avec succès !`);
              setEditingCategory(null);
            }}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <span className="admin-form-label">Slogan / Tagline</span>
                  <input 
                    type="text" 
                    className="admin-form-input"
                    value={editingCategory.tagline}
                    onChange={(e) => setEditingCategory({ ...editingCategory, tagline: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Description Collection</span>
                  <textarea 
                    className="admin-form-input"
                    style={{ minHeight: "100px", resize: "vertical", fontFamily: "inherit" }}
                    value={editingCategory.desc}
                    onChange={(e) => setEditingCategory({ ...editingCategory, desc: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Image de la Catégorie</span>
                  
                  {/* Visual preview */}
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem", padding: "0.75rem", border: "1px dashed var(--admin-border)", borderRadius: "12px" }}>
                    <img 
                      src={editingCategory.image} 
                      alt="Aperçu" 
                      style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }} 
                      onError={(e) => { e.target.src = "/prod_tee_black.png"; }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Aperçu de la photo</span>
                      <span style={{ fontSize: "0.65rem", color: "var(--admin-text-sub)", wordBreak: "break-all" }}>
                        {editingCategory.image ? (editingCategory.image.substring(0, 45) + (editingCategory.image.length > 45 ? "..." : "")) : "Aucune photo"}
                      </span>
                    </div>
                  </div>

                  <span className="admin-form-label">URL / Chemin de l'image</span>
                  <input 
                    type="text" 
                    className="admin-form-input"
                    placeholder="Ex: /prod_tee_black.png"
                    value={editingCategory.image}
                    onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  />
                  
                  <span className="admin-form-label" style={{ marginTop: "0.75rem" }}>Ou importer un fichier local</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="admin-form-input"
                    style={{ padding: "0.5rem" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditingCategory({ ...editingCategory, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-btn secondary" 
                  onClick={() => setEditingCategory(null)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="admin-btn primary"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Dialog Modal */}
      {editingProduct && (
        <div className="admin-modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Modifier l'article : {editingProduct.name}</h3>
              <button className="admin-modal-close" onClick={() => setEditingProduct(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setProducts(prev => prev.map(p => 
                p.id === editingProduct.id 
                  ? { 
                      ...p, 
                      name: editingProduct.name, 
                      category: editingProduct.category, 
                      price: `${editingProduct.numericPrice} DH`, 
                      numericPrice: parseFloat(editingProduct.numericPrice), 
                      image: editingProduct.image,
                      sizes: editingProduct.sizes
                    } 
                  : p
              ));
              addToast(`Article "${editingProduct.name}" mis à jour avec succès !`);
              setEditingProduct(null);
            }}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <span className="admin-form-label">Nom de l'article</span>
                  <input 
                    type="text" 
                    className="admin-form-input"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Catégorie</span>
                  <select 
                    className="admin-form-select"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Pants">Pantalons</option>
                    <option value="Sneakers">Baskets</option>
                    <option value="Accessories">Accessoires</option>
                    <option value="Prints">Impression / Prints</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Prix (DH)</span>
                  <input 
                    type="number" 
                    className="admin-form-input"
                    value={editingProduct.numericPrice || editingProduct.price.replace(" DH", "")}
                    onChange={(e) => setEditingProduct({ ...editingProduct, numericPrice: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Photo de l'article</span>
                  
                  {/* Visual preview */}
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem", padding: "0.75rem", border: "1px dashed var(--admin-border)", borderRadius: "12px" }}>
                    <img 
                      src={editingProduct.image} 
                      alt="Aperçu" 
                      style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }} 
                      onError={(e) => { e.target.src = "/prod_tee_black.png"; }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Aperçu de l'image</span>
                      <span style={{ fontSize: "0.65rem", color: "var(--admin-text-sub)", wordBreak: "break-all" }}>
                        {editingProduct.image ? (editingProduct.image.substring(0, 45) + (editingProduct.image.length > 45 ? "..." : "")) : "Aucune photo"}
                      </span>
                    </div>
                  </div>

                  <span className="admin-form-label">URL / Chemin de l'image</span>
                  <input 
                    type="text" 
                    className="admin-form-input"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  />
                  
                  <span className="admin-form-label" style={{ marginTop: "0.75rem" }}>Ou importer un fichier local</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="admin-form-input"
                    style={{ padding: "0.5rem" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditingProduct({ ...editingProduct, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Gestion des Stocks par Tailles</span>
                  <div style={{ padding: "1rem", background: "#f9fafb", borderRadius: "12px", border: "1px solid var(--admin-border)" }}>
                    {editingProduct.sizes && editingProduct.sizes.length > 0 ? (
                      editingProduct.sizes.map((s, idx) => (
                        <div key={s.size} style={{ display: "flex", alignItems: "center", justifyPosition: "space-between", marginBottom: "0.5rem" }}>
                          <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--admin-text-main)", minWidth: "100px" }}>Taille {s.size} :</span>
                          <input 
                            type="number" 
                            className="admin-form-input"
                            style={{ width: "90px", padding: "0.35rem 0.5rem" }}
                            value={s.stock}
                            onChange={(e) => {
                              const updated = [...editingProduct.sizes];
                              updated[idx] = { ...s, stock: parseInt(e.target.value) || 0 };
                              setEditingProduct({ ...editingProduct, sizes: updated });
                            }}
                            min="0"
                          />
                        </div>
                      ))
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyPosition: "space-between" }}>
                        <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--admin-text-main)", minWidth: "100px" }}>Stock Unique (TU) :</span>
                        <input 
                          type="number" 
                          className="admin-form-input"
                          style={{ width: "90px", padding: "0.35rem 0.5rem" }}
                          value={editingProduct.stock || 0}
                          onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                          min="0"
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-btn secondary" 
                  onClick={() => setEditingProduct(null)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="admin-btn primary"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Dialog Modal */}
      {showAddProductModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddProductModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Ajouter un nouvel article</h3>
              <button className="admin-modal-close" onClick={() => setShowAddProductModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newProduct.name || !newProduct.price) {
                addToast("Veuillez renseigner le nom et le prix.");
                return;
              }

              const actualSizes = (hasOptions && showSizes) ? newProductSizes : ["TU"];
              const actualColors = (hasOptions && showColors) ? newProductColors : [];

              if (hasOptions && showSizes && actualSizes.length === 0) {
                addToast("Veuillez ajouter au moins une taille/pointure.");
                return;
              }
              if (hasOptions && showColors && actualColors.length === 0) {
                addToast("Veuillez ajouter au moins une couleur.");
                return;
              }

              // Build sizes array from dynamic state
              let sizes = [];
              if (actualColors.length > 0) {
                actualSizes.forEach(sz => {
                  actualColors.forEach(cl => {
                    const key = `${sz}__${cl}`;
                    sizes.push({ size: sz, color: cl, stock: parseInt(newProductStocks[key]) || 0 });
                  });
                });
              } else {
                actualSizes.forEach(sz => {
                  sizes.push({ size: sz, stock: parseInt(newProductStocks[sz]) || 0 });
                });
              }

              const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
              const created = {
                id: newId,
                name: newProduct.name,
                category: newProduct.category,
                price: `${newProduct.price} DH`,
                numericPrice: parseFloat(newProduct.price),
                image: newProductImages[0] || "/prod_tee_black.png",
                hoverImage: newProductImages[1] || undefined,
                images: newProductImages,
                sizes: sizes,
                colors: actualColors.length > 0 ? actualColors : undefined,
                description: newProduct.description,
                details: newProduct.details ? newProduct.details.split("\n").filter(Boolean) : []
              };

              setProducts(prev => [created, ...prev]);
              addToast(`Article "${newProduct.name}" ajouté avec succès !`);
              setShowAddProductModal(false);
              resetAddProductModal();
            }}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <span className="admin-form-label">Nom de l'article *</span>
                  <input 
                    type="text" 
                    placeholder="Ex: T-shirt Oversized / Vintage Lavé"
                    className="admin-form-input"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Catégorie</span>
                  <select 
                    className="admin-form-select"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Pants">Pantalons</option>
                    <option value="Sneakers">Baskets</option>
                    <option value="Accessories">Accessoires</option>
                    <option value="Prints">Impression / Prints</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Prix Total (DH) *</span>
                  <input 
                    type="number" 
                    placeholder="Ex: 220"
                    className="admin-form-input"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label" style={{ fontWeight: "700" }}>Photos de l'article</span>
                  
                  {/* Selected images list */}
                  {newProductImages.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "0.85rem", marginBottom: "1.25rem" }}>
                      {newProductImages.map((imgUrl, imgIdx) => {
                        const isMain = imgIdx === 0;
                        const isHover = imgIdx === 1;
                        return (
                          <div 
                            key={imgIdx} 
                            style={{ 
                              position: "relative", 
                              border: isMain ? "2px solid #111" : "1px solid var(--admin-border)", 
                              borderRadius: "12px", 
                              padding: "0.4rem", 
                              background: "#f9fafb",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.35rem"
                            }}
                          >
                            {/* Badges for roles */}
                            <span 
                              style={{ 
                                fontSize: "0.62rem", 
                                fontWeight: "800", 
                                padding: "0.15rem 0.4rem", 
                                borderRadius: "6px",
                                background: isMain ? "#111" : isHover ? "rgba(99,102,241,0.12)" : "rgba(107,114,128,0.1)",
                                color: isMain ? "#fff" : isHover ? "#6366f1" : "var(--admin-text-sub)",
                                alignSelf: "stretch",
                                textAlign: "center"
                              }}
                            >
                              {isMain ? "★ Principale" : isHover ? "👁️ Hover" : `Image ${imgIdx + 1}`}
                            </span>

                            {/* Thumbnail image */}
                            <img 
                              src={imgUrl} 
                              alt={`Aperçu ${imgIdx}`} 
                              style={{ width: "100%", height: "80px", borderRadius: "8px", objectFit: "cover" }} 
                              onError={(e) => { e.target.src = "/prod_tee_black.png"; }}
                            />

                            {/* Controls row */}
                            <div style={{ display: "flex", gap: "0.25rem", width: "100%", justifyContent: "center" }}>
                              {/* Move Left */}
                              <button 
                                type="button"
                                disabled={imgIdx === 0}
                                onClick={() => {
                                  setNewProductImages(prev => {
                                    const next = [...prev];
                                    const tmp = next[imgIdx];
                                    next[imgIdx] = next[imgIdx - 1];
                                    next[imgIdx - 1] = tmp;
                                    return next;
                                  });
                                }}
                                style={{ 
                                  padding: "0.2rem 0.4rem", 
                                  borderRadius: "6px", 
                                  border: "1px solid var(--admin-border)", 
                                  background: "#fff", 
                                  cursor: imgIdx === 0 ? "not-allowed" : "pointer",
                                  fontSize: "0.7rem",
                                  opacity: imgIdx === 0 ? 0.3 : 1
                                }}
                              >
                                ←
                              </button>

                              {/* Delete */}
                              <button 
                                type="button"
                                onClick={() => {
                                  setNewProductImages(prev => prev.filter((_, idx) => idx !== imgIdx));
                                }}
                                style={{ 
                                  padding: "0.2rem 0.4rem", 
                                  borderRadius: "6px", 
                                  border: "1px solid rgba(239,68,68,0.2)", 
                                  background: "rgba(239,68,68,0.05)", 
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                  fontWeight: "700"
                                }}
                              >
                                ×
                              </button>

                              {/* Move Right */}
                              <button 
                                type="button"
                                disabled={imgIdx === newProductImages.length - 1}
                                onClick={() => {
                                  setNewProductImages(prev => {
                                    const next = [...prev];
                                    const tmp = next[imgIdx];
                                    next[imgIdx] = next[imgIdx + 1];
                                    next[imgIdx + 1] = tmp;
                                    return next;
                                  });
                                }}
                                style={{ 
                                  padding: "0.2rem 0.4rem", 
                                  borderRadius: "6px", 
                                  border: "1px solid var(--admin-border)", 
                                  background: "#fff", 
                                  cursor: imgIdx === newProductImages.length - 1 ? "not-allowed" : "pointer",
                                  fontSize: "0.7rem",
                                  opacity: imgIdx === newProductImages.length - 1 ? 0.3 : 1
                                }}
                              >
                                →
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: "1.25rem", border: "1px dashed var(--admin-border)", borderRadius: "12px", textAlign: "center", color: "var(--admin-text-sub)", fontSize: "0.8rem", marginBottom: "1rem" }}>
                      Aucune photo ajoutée. Le produit utilisera l'image par défaut.
                    </div>
                  )}

                  {/* Add Image Controls */}
                  <div style={{ background: "#f9fafb", borderRadius: "12px", border: "1.5px solid var(--admin-border)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div>
                      <span style={{ fontWeight: "700", fontSize: "0.8rem" }}>Ajouter une image</span>
                      <div style={{ fontSize: "0.68rem", color: "var(--admin-text-sub)", marginTop: "0.15rem" }}>Importez un fichier local ou saisissez un lien URL.</div>
                    </div>
                    
                    {/* URL Input */}
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <input 
                        type="text" 
                        id="new-img-url-input"
                        placeholder="Entrer le lien de la photo (Ex: /products/tee.jpg)..." 
                        className="admin-form-input" 
                        style={{ flex: 1, padding: "0.35rem 0.6rem", fontSize: "0.82rem" }} 
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = e.target.value.trim();
                            if (val) {
                              setNewProductImages(prev => [...prev, val]);
                              e.target.value = "";
                            }
                          }
                        }}
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const el = document.getElementById("new-img-url-input");
                          const val = el ? el.value.trim() : "";
                          if (val) {
                            setNewProductImages(prev => [...prev, val]);
                            el.value = "";
                          }
                        }}
                        style={{ padding: "0.35rem 0.85rem", borderRadius: "8px", background: "#111", color: "#fff", border: "none", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer" }}
                      >
                        Ajouter
                      </button>
                    </div>

                    {/* File Upload Input */}
                    <div style={{ position: "relative" }}>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="admin-form-input"
                        style={{ padding: "0.35rem", fontSize: "0.8rem" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewProductImages(prev => [...prev, reader.result]);
                            };
                            reader.readAsDataURL(file);
                            e.target.value = ""; // Reset
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Description</span>
                  <textarea 
                    className="admin-form-input"
                    placeholder="Entrez une brève description de l'article..."
                    style={{ minHeight: "80px", resize: "vertical", fontFamily: "inherit" }}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>

                {/* ====== SIMPLE OPTIONS BUILDER ====== */}
                <div className="admin-form-group">
                  <span className="admin-form-label">Options du produit</span>
                  
                  {/* Main Toggle Checkbox */}
                  <div style={{ background: "#f9fafb", borderRadius: "12px", border: "1.5px solid var(--admin-border)", padding: "1rem", marginBottom: "0.85rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                      <input 
                        type="checkbox"
                        checked={hasOptions}
                        onChange={e => {
                          setHasOptions(e.target.checked);
                          if (!e.target.checked) {
                            // Single stock product defaults
                            setNewProductSizes(["TU"]);
                            setNewProductColors([]);
                            setNewProductStocks({ "TU": 10 });
                            setShowColors(false);
                            setShowSizes(false);
                          } else {
                            // If checked, start empty and require choices
                            setNewProductSizes([]);
                            setNewProductColors([]);
                            setNewProductStocks({});
                          }
                        }}
                        style={{ width: "18px", height: "18px", accentColor: "#111", cursor: "pointer" }}
                      />
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.88rem" }}>Mon produit a des options (couleur, pointure/numéro, taille...)</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--admin-text-sub)" }}>Cochez pour ajouter des variations de couleurs, tailles ou pointures.</div>
                      </div>
                    </label>
                  </div>

                  {/* If hasOptions is FALSE: Show simple stock quantity input */}
                  {!hasOptions && (
                    <div style={{ padding: "1rem", background: "rgba(16,185,129,0.04)", borderRadius: "12px", border: "1.5px solid rgba(16,185,129,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--admin-text-main)" }}>Stock disponible (Quantité) *</span>
                        <div style={{ fontSize: "0.72rem", color: "var(--admin-text-sub)", marginTop: "0.15rem" }}>Quantité totale en stock pour cet article.</div>
                      </div>
                      <input 
                        type="number" 
                        min="0" 
                        value={newProductStocks["TU"] ?? 10}
                        onChange={e => setNewProductStocks({ "TU": parseInt(e.target.value) || 0 })}
                        className="admin-form-input"
                        style={{ width: "100px", padding: "0.4rem 0.6rem", textAlign: "center", fontWeight: "700", fontSize: "1rem" }}
                        required
                      />
                    </div>
                  )}

                  {/* If hasOptions is TRUE: Show options selectors */}
                  {hasOptions && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      
                      {/* Checkbox: Mon produit a des couleurs */}
                      <div style={{ background: "#f9fafb", borderRadius: "12px", border: "1.5px solid var(--admin-border)", overflow: "hidden" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1rem", cursor: "pointer" }}>
                          <input 
                            type="checkbox"
                            checked={showColors}
                            onChange={e => {
                              setShowColors(e.target.checked);
                              if (!e.target.checked) {
                                setNewProductColors([]);
                                setNewProductColorInput("");
                                setNewProductStocks(prev => {
                                  // Remove any keys containing colors
                                  const next = { ...prev };
                                  Object.keys(next).forEach(k => {
                                    if (k.includes("__")) delete next[k];
                                  });
                                  return next;
                                });
                              }
                            }}
                            style={{ width: "17px", height: "17px", accentColor: "#111", cursor: "pointer" }}
                          />
                          <div>
                            <div style={{ fontWeight: "700", fontSize: "0.85rem" }}>Mon produit a des couleurs</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--admin-text-sub)" }}>Ajouter des variations de couleurs (ex: Noir, Blanc, Kaki...)</div>
                          </div>
                        </label>
                        
                        {showColors && (
                          <div style={{ padding: "0 1rem 1rem 1rem", borderTop: "1px solid var(--admin-border)", background: "#fff" }}>
                            {newProductColors.length > 0 && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem", marginBottom: "0.5rem" }}>
                                {newProductColors.map(cl => (
                                  <span key={cl} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(245,158,11,0.1)", color: "#b45309", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px", padding: "0.22rem 0.6rem", fontSize: "0.78rem", fontWeight: "700" }}>
                                    ● {cl}
                                    <button 
                                      type="button" 
                                      onClick={() => {
                                        setNewProductColors(p => p.filter(c => c !== cl));
                                        setNewProductStocks(prev => {
                                          const next = { ...prev };
                                          Object.keys(next).filter(k => k.endsWith("__" + cl)).forEach(k => delete next[k]);
                                          return next;
                                        });
                                      }}
                                      style={{ background: "none", border: "none", color: "#b45309", cursor: "pointer", padding: 0, fontSize: "0.85rem", fontWeight: "700", marginLeft: "0.15rem", lineHeight: 1 }}
                                    >×</button>
                                  </span>
                                ))}
                              </div>
                            )}
                            <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem" }}>
                              <input 
                                type="text" 
                                value={newProductColorInput}
                                onChange={e => setNewProductColorInput(e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const v = newProductColorInput.trim();
                                    if (v && !newProductColors.includes(v)) setNewProductColors(p => [...p, v]);
                                    setNewProductColorInput("");
                                  }
                                }}
                                placeholder="Ex: Noir, Blanc, Kaki..." 
                                className="admin-form-input" 
                                style={{ flex: 1, padding: "0.35rem 0.6rem", fontSize: "0.85rem" }} 
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const v = newProductColorInput.trim();
                                  if (v && !newProductColors.includes(v)) setNewProductColors(p => [...p, v]);
                                  setNewProductColorInput("");
                                }}
                                style={{ padding: "0 0.85rem", borderRadius: "8px", background: "#111", color: "#fff", border: "none", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer" }}
                              >+ Ajouter</button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Checkbox: Mon produit a des tailles / pointures */}
                      <div style={{ background: "#f9fafb", borderRadius: "12px", border: "1.5px solid var(--admin-border)", overflow: "hidden" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1rem", cursor: "pointer" }}>
                          <input 
                            type="checkbox"
                            checked={showSizes}
                            onChange={e => {
                              setShowSizes(e.target.checked);
                              if (!e.target.checked) {
                                setNewProductSizes([]);
                                setNewProductCustomSizeInput("");
                                setNewProductStocks({});
                              } else {
                                // Default presets S, M, L, XL
                                setNewProductSizes(["S", "M", "L", "XL"]);
                              }
                            }}
                            style={{ width: "17px", height: "17px", accentColor: "#111", cursor: "pointer" }}
                          />
                          <div>
                            <div style={{ fontWeight: "700", fontSize: "0.85rem" }}>Mon produit a des tailles / pointures / numéros</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--admin-text-sub)" }}>Ajouter des variations de tailles (ex: S, M, L...) ou pointures (ex: 39, 40...)</div>
                          </div>
                        </label>
                        
                        {showSizes && (
                          <div style={{ padding: "0 1rem 1rem 1rem", borderTop: "1px solid var(--admin-border)", background: "#fff" }}>
                            {/* Preset Buttons */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
                              {[
                                { label: "👕 Vêtement", sizes: ["S", "M", "L", "XL", "XXL"] },
                                { label: "👖 Pantalon", sizes: ["30", "32", "34", "36", "38"] },
                                { label: "👟 Pointures", sizes: ["38", "39", "40", "41", "42", "43", "44", "45"] },
                                { label: "🏷️ Unique", sizes: ["TU"] }
                              ].map(preset => (
                                <button 
                                  key={preset.label} 
                                  type="button"
                                  onClick={() => { setNewProductSizes(preset.sizes); setNewProductStocks({}); }}
                                  style={{ 
                                    padding: "0.28rem 0.7rem", 
                                    borderRadius: "8px", 
                                    fontSize: "0.75rem", 
                                    fontWeight: "600", 
                                    cursor: "pointer",
                                    border: JSON.stringify(newProductSizes) === JSON.stringify(preset.sizes) ? "1.5px solid #111" : "1.5px solid var(--admin-border)",
                                    background: JSON.stringify(newProductSizes) === JSON.stringify(preset.sizes) ? "#111" : "#fff",
                                    color: JSON.stringify(newProductSizes) === JSON.stringify(preset.sizes) ? "#fff" : "var(--admin-text-main)",
                                    transition: "all 0.15s ease"
                                  }}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>

                            {/* Current Size chips display */}
                            {newProductSizes.length > 0 && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                                {newProductSizes.map(sz => (
                                  <span key={sz} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "#111", color: "#fff", borderRadius: "8px", padding: "0.22rem 0.6rem", fontSize: "0.78rem", fontWeight: "700" }}>
                                    {sz}
                                    <button 
                                      type="button" 
                                      onClick={() => {
                                        setNewProductSizes(p => p.filter(s => s !== sz));
                                        setNewProductStocks(prev => {
                                          const next = { ...prev };
                                          Object.keys(next).filter(k => k === sz || k.startsWith(sz + "__")).forEach(k => delete next[k]);
                                          return next;
                                        });
                                      }}
                                      style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, fontSize: "0.85rem", fontWeight: "700", marginLeft: "0.15rem", lineHeight: 1 }}
                                    >×</button>
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Add Custom size input */}
                            <div style={{ display: "flex", gap: "0.4rem" }}>
                              <input 
                                type="text" 
                                value={newProductCustomSizeInput}
                                onChange={e => setNewProductCustomSizeInput(e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const v = newProductCustomSizeInput.trim().toUpperCase();
                                    if (v && !newProductSizes.includes(v)) setNewProductSizes(p => [...p, v]);
                                    setNewProductCustomSizeInput("");
                                  }
                                }}
                                placeholder="Ajouter une taille (ex: XXL, 46...)" 
                                style={{ flex: 1, padding: "0.35rem 0.6rem", border: "1.5px solid var(--admin-border)", borderRadius: "8px", fontSize: "0.85rem" }} 
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const v = newProductCustomSizeInput.trim().toUpperCase();
                                  if (v && !newProductSizes.includes(v)) setNewProductSizes(p => [...p, v]);
                                  setNewProductCustomSizeInput("");
                                }}
                                style={{ padding: "0.35rem 0.85rem", borderRadius: "8px", background: "#111", color: "#fff", border: "none", fontWeight: "700", cursor: "pointer" }}
                              >+</button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

                {/* ====== STOCK PER OPTION TABLE ====== */}
                {hasOptions && (showSizes ? newProductSizes.length > 0 : true) && (showColors ? newProductColors.length > 0 : true) && (showSizes || showColors) && (
                  <div className="admin-form-group">
                    <span className="admin-form-label">Stock par option</span>
                    <div style={{ background: "#f9fafb", borderRadius: "12px", border: "1px solid var(--admin-border)", overflow: "hidden" }}>
                      {showColors && newProductColors.length > 0 ? (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr style={{ background: "#f3f4f6" }}>
                              <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", fontSize: "0.75rem", fontWeight: "700", color: "var(--admin-text-sub)", borderBottom: "1px solid var(--admin-border)" }}>Taille \ Couleur</th>
                              {newProductColors.map(cl => (
                                <th key={cl} style={{ padding: "0.5rem 0.75rem", textAlign: "center", fontSize: "0.75rem", fontWeight: "700", color: "#b45309", borderBottom: "1px solid var(--admin-border)" }}>● {cl}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(showSizes ? newProductSizes : ["TU"]).map((sz, si) => (
                              <tr key={sz} style={{ background: si % 2 === 0 ? "#fff" : "#f9fafb" }}>
                                <td style={{ padding: "0.5rem 0.75rem", fontWeight: "700", fontSize: "0.82rem", borderBottom: "1px solid #f0f0f0" }}>{sz}</td>
                                {newProductColors.map(cl => {
                                  const key = `${sz}__${cl}`;
                                  return (
                                    <td key={cl} style={{ padding: "0.35rem 0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                                      <input 
                                        type="number" 
                                        min="0" 
                                        value={newProductStocks[key] ?? 0}
                                        onChange={e => setNewProductStocks(prev => ({ ...prev, [key]: parseInt(e.target.value) || 0 }))}
                                        style={{ width: "100%", padding: "0.3rem 0.5rem", border: "1.5px solid var(--admin-border)", borderRadius: "8px", fontSize: "0.85rem", textAlign: "center" }} 
                                      />
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        // Stock per size only
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "0.75rem", padding: "1rem" }}>
                          {newProductSizes.map(sz => (
                            <div key={sz} style={{ display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "center" }}>
                              <span style={{ fontSize: "0.8rem", fontWeight: "700", background: "#111", color: "#fff", borderRadius: "6px", padding: "0.2rem 0.6rem" }}>{sz}</span>
                              <input 
                                type="number" 
                                min="0" 
                                value={newProductStocks[sz] ?? 0}
                                onChange={e => setNewProductStocks(prev => ({ ...prev, [sz]: parseInt(e.target.value) || 0 }))}
                                style={{ width: "100%", padding: "0.35rem 0.5rem", border: "1.5px solid var(--admin-border)", borderRadius: "8px", fontSize: "0.9rem", textAlign: "center" }} 
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-btn secondary" 
                  onClick={() => { setShowAddProductModal(false); resetAddProductModal(); }}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="admin-btn primary"
                >
                  Créer l'article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="admin-modal-overlay" onClick={() => setEditingOrder(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Modifier la commande N° {editingOrder.id}</h3>
              <button className="admin-modal-close" onClick={() => setEditingOrder(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateOrder}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <span className="admin-form-label">Client (Nom complet) *</span>
                  <input 
                    type="text" 
                    className="admin-form-input"
                    value={editingOrder.customer}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Téléphone *</span>
                  <input 
                    type="tel" 
                    className="admin-form-input"
                    value={editingOrder.phone}
                    onChange={(e) => setEditingOrder({ ...editingOrder, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Ville *</span>
                  <input 
                    type="text" 
                    className="admin-form-input"
                    value={editingOrder.city || ""}
                    onChange={(e) => setEditingOrder({ ...editingOrder, city: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Adresse de livraison *</span>
                  <textarea 
                    className="admin-form-input"
                    style={{ minHeight: "60px", resize: "vertical", fontFamily: "inherit" }}
                    value={editingOrder.address || ""}
                    onChange={(e) => setEditingOrder({ ...editingOrder, address: e.target.value })}
                    required
                  />
                </div>

                {/* Multiple Products Builder Row */}
                <div style={{ borderTop: "1px dashed var(--admin-border)", borderBottom: "1px dashed var(--admin-border)", padding: "1rem 0", margin: "1rem 0" }}>
                  <span className="admin-form-label" style={{ display: "block", marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--admin-text-main)" }}>
                    Modifier les produits de la commande
                  </span>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {/* Catalog Product Dropdown */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Choisir un article :</span>
                      <select
                        className="admin-form-select"
                        value={selectedProductIndex}
                        onChange={(e) => {
                          const idx = parseInt(e.target.value);
                          setSelectedProductIndex(idx);
                          const prod = products[idx];
                          setSelectedProductSize(prod.sizes && prod.sizes.length > 0 ? prod.sizes[0].size : "TU");
                        }}
                      >
                        {products.map((p, idx) => (
                          <option key={p.id} value={idx}>{p.name} ({p.price})</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                      {/* Size Selector */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Taille / Options :</span>
                        <select
                          className="admin-form-select"
                          value={selectedProductSize}
                          onChange={(e) => setSelectedProductSize(e.target.value)}
                        >
                          {products[selectedProductIndex]?.sizes && products[selectedProductIndex].sizes.length > 0 ? (
                            products[selectedProductIndex].sizes.map(s => (
                              <option key={s.size} value={s.size}>{s.size} (Stock: {s.stock})</option>
                            ))
                          ) : (
                            <option value="TU">Taille Unique (TU)</option>
                          )}
                        </select>
                      </div>

                      {/* Color Input */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Couleur :</span>
                        <input
                          type="text"
                          className="admin-form-input"
                          placeholder="Noir/Blanc..."
                          value={selectedProductColor}
                          onChange={(e) => setSelectedProductColor(e.target.value)}
                        />
                      </div>

                      {/* Quantity Input */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)" }}>Quantité :</span>
                        <input
                          type="number"
                          className="admin-form-input"
                          min="1"
                          value={selectedProductQty}
                          onChange={(e) => setSelectedProductQty(parseInt(e.target.value) || 1)}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="admin-btn secondary"
                      style={{ alignSelf: "flex-end", padding: "0.4rem 1rem", fontSize: "0.75rem", borderRadius: "10px", marginTop: "0.25rem" }}
                      onClick={() => {
                        const prod = products[selectedProductIndex];
                        if (!prod) return;
                        
                        const item = {
                          name: prod.name,
                          size: selectedProductSize || "TU",
                          color: selectedProductColor || "Standard",
                          quantity: selectedProductQty,
                          price: prod.numericPrice || parseFloat(prod.price.replace(" DH", "")) || 0
                        };
                        setEditOrderProducts(prev => [...prev, item]);
                        addToast(`"${prod.name}" ajouté à la commande !`);
                      }}
                    >
                      Ajouter ce produit (+)
                    </button>
                  </div>

                  {/* Added Items Preview */}
                  {editOrderProducts.length > 0 && (
                    <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#f9fafb", borderRadius: "12px", border: "1px solid var(--admin-border)" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "var(--admin-text-sub)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                        Produits de la commande :
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {editOrderProducts.map((p, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", justifyPosition: "space-between", fontSize: "0.8rem", padding: "0.25rem 0", borderBottom: idx < editOrderProducts.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                            <div>
                              <span style={{ fontWeight: "700", color: "var(--admin-accent)" }}>{p.quantity}x</span> {p.name} 
                              <span style={{ color: "var(--admin-text-sub)", fontSize: "0.7rem", marginLeft: "0.35rem" }}>
                                ({p.size}, {p.color})
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontWeight: "700" }}>{p.price * p.quantity} DH</span>
                              <button
                                type="button"
                                style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center" }}
                                onClick={() => setEditOrderProducts(prev => prev.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Prix Total (DH) - Calculé automatiquement</span>
                  <input 
                    type="text" 
                    className="admin-form-input" 
                    value={`${editOrderProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)} DH`} 
                    disabled 
                    style={{ fontWeight: "700", background: "#f3f4f6" }} 
                  />
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Méthode de Paiement</span>
                  <select 
                    className="admin-form-select"
                    value={editingOrder.payment}
                    onChange={(e) => setEditingOrder({ ...editingOrder, payment: e.target.value })}
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <span className="admin-form-label">Statut</span>
                  <select 
                    className="admin-form-select"
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="delivered">Livrée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-btn secondary" 
                  onClick={() => setEditingOrder(null)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="admin-btn primary"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
