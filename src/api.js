// ============================================
// RedMed API Service — connects React to PHP
// ============================================

const BASE_URL = "http://localhost/redmed-api/api";

// Helper fetch function
async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message };
  }
}

// ============================================
// AUTH
// ============================================
export const authAPI = {
  login: (email, password) =>
    apiFetch("/auth/login.php", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  changePassword: (currentPassword, newPassword) =>
    apiFetch("/auth/update.php", {
      method: "POST",
      body: JSON.stringify({
        type: "change_password",
        current_password: currentPassword,
        new_password: newPassword,
      }),
    }),

  changeEmail: (email) =>
    apiFetch("/auth/update.php", {
      method: "POST",
      body: JSON.stringify({ type: "change_email", email }),
    }),
};

// ============================================
// ORDERS
// ============================================
export const ordersAPI = {
  getAll: () => apiFetch("/orders/index.php"),

  create: (orderData) =>
    apiFetch("/orders/index.php", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),

  updateStatus: (id, status) =>
    apiFetch(`/orders/update.php?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  update: (id, data) =>
    apiFetch(`/orders/update.php?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiFetch(`/orders/update.php?id=${id}`, { method: "DELETE" }),
};

// ============================================
// PRODUCTS
// ============================================
export const productsAPI = {
  getAll: () => apiFetch("/products/index.php"),

  create: (productData) =>
    apiFetch("/products/index.php", {
      method: "POST",
      body: JSON.stringify(productData),
    }),

  update: (id, productData) =>
    apiFetch(`/products/index.php?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    }),

  delete: (id) =>
    apiFetch(`/products/index.php?id=${id}`, { method: "DELETE" }),
};

// ============================================
// SETTINGS
// ============================================
export const settingsAPI = {
  getAll: () => apiFetch("/settings/index.php"),

  update: (settingsObj) =>
    apiFetch("/settings/index.php", {
      method: "POST",
      body: JSON.stringify(settingsObj),
    }),
};

export default { authAPI, ordersAPI, productsAPI, settingsAPI };
