import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost/redmed-api/api/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("redmed_admin_auth", "true");
        sessionStorage.setItem("redmed_admin_token", data.token);
        sessionStorage.setItem("redmed_admin_email", data.admin.email);
        onLogin();
      } else {
        setError(data.error || "E-mail ou mot de passe incorrect.");
        setPassword("");
      }
    } catch (err) {
      // Fallback: si le serveur PHP n'est pas disponible, utiliser localStorage
      const storedEmail = localStorage.getItem("redmed_admin_email") || "admin@redmed.ma";
      const storedPassword = localStorage.getItem("redmed_admin_password") || "redmed2024";
      if (email === storedEmail && password === storedPassword) {
        sessionStorage.setItem("redmed_admin_auth", "true");
        onLogin();
      } else {
        setError("E-mail ou mot de passe incorrect.");
        setPassword("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0f0f1a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', 'Outfit', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background glow decorations */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 25% 25%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(239,68,68,0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }} />

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "420px",
        margin: "1rem",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        position: "relative",
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img src="/logo.png" alt="RedMed" style={{ height: "44px", marginBottom: "1rem", filter: "brightness(0) invert(1)" }} />
          <h1 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "800", margin: 0, letterSpacing: "0.02em" }}>
            Administration
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: "0.3rem" }}>
            Accès restreint — Identifiez-vous
          </p>
        </div>

        {/* Lock icon */}
        <div style={{
          width: "50px", height: "50px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: "14px",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 2rem auto",
          boxShadow: "0 8px 24px rgba(99,102,241,0.35)"
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block", color: "rgba(255,255,255,0.55)",
              fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase",
              letterSpacing: "0.1em", marginBottom: "0.45rem"
            }}>
              E-mail
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center"
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@redmed.ma"
                autoFocus
                style={{
                  width: "100%",
                  padding: "0.82rem 1rem 0.82rem 2.6rem",
                  background: "rgba(255,255,255,0.07)",
                  border: error ? "1.5px solid #ef4444" : "1.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => { if (!error) e.target.style.borderColor = "rgba(99,102,241,0.6)"; }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block", color: "rgba(255,255,255,0.55)",
              fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase",
              letterSpacing: "0.1em", marginBottom: "0.45rem"
            }}>
              Mot de passe
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center"
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.82rem 2.8rem 0.82rem 2.6rem",
                  background: "rgba(255,255,255,0.07)",
                  border: error ? "1.5px solid #ef4444" : "1.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                  letterSpacing: showPwd ? "0" : "0.12em"
                }}
                onFocus={(e) => { if (!error) e.target.style.borderColor = "rgba(99,102,241,0.6)"; }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(p => !p)}
                style={{
                  position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center"
                }}
              >
                {showPwd ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                marginTop: "0.5rem", color: "#ef4444", fontSize: "0.8rem", fontWeight: "500"
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              width: "100%",
              padding: "0.9rem",
              background: loading || !email || !password
                ? "rgba(99,102,241,0.3)"
                : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "700",
              fontSize: "0.92rem",
              cursor: loading || !email || !password ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              boxShadow: loading || !email || !password ? "none" : "0 4px 16px rgba(99,102,241,0.4)"
            }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 0.8s linear infinite" }}>
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                Vérification...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Se connecter
              </>
            )}
          </button>
        </form>

        {/* Credentials hint */}
        <div style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1rem",
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "10px",
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          lineHeight: 1.6
        }}>
          Identifiants par défaut :<br />
          <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: "600" }}>admin@redmed.ma</span>
          {" / "}
          <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: "600" }}>redmed2024</span>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: "0.7rem", marginTop: "1.25rem", marginBottom: 0 }}>
          RedMed Administration · Accès réservé
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #1a1a2e inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      `}</style>
    </div>
  );
}
