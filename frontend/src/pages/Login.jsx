import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/login", data);

      if (!res.data.token) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      res.data.role === "admin"
        ? navigate("/admin")
        : navigate("/dashboard");

    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      
      {/* LEFT BRAND PANEL */}
      <div style={left}>
        <h1 style={brand}>Child Vaccination</h1>
        <p style={tagline}>
          Smart Vaccination Management System <br />
          For Parents, Hospitals & Admins
        </p>

        <ul style={features}>
          <li>✔ Track child vaccinations</li>
          <li>✔ Hospital availability</li>
          <li>✔ Admin reports & analytics</li>

          <li
            style={{
              listStyle: "none",
              marginTop: "10px",
              marginLeft: "100px",
              fontSize: "14px",
              fontStyle: "italic",
              color: "#666"
            }}
          >
            — By Saniya khedekar
          </li>
        </ul>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div style={right}>
        <form onSubmit={handleLogin} style={card}>
          <h2 style={title}>Sign in to your account</h2>
          <p style={subtitle}>Welcome back 👋</p>

          <input
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            style={input}
          />

          {/* PASSWORD FIELD WITH TOGGLE */}
          <div style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              required
              style={{ ...input, marginBottom: "0px" }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={eyeIcon}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p style={footerText}>
            Don’t have an account?
            <span style={link} onClick={() => navigate("/register")}>
              {" "}Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ===================== */
/* 🎨 STYLES */
/* ===================== */

const page = {
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr",
  background: "linear-gradient(135deg, #68aeda, #e9cae9)",
};

const left = {
  padding: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const brand = {
  fontSize: "48px",
  fontWeight: "900",
  color: "#0f172a",
};

const tagline = {
  fontSize: "18px",
  marginTop: "14px",
  color: "#334155",
  lineHeight: "1.6",
};

const features = {
  marginTop: "30px",
  listStyle: "none",
  padding: 0,
  fontSize: "16px",
  color: "#475569",
  lineHeight: "2",
};

const right = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "420px",
  padding: "44px",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(12px)",
  borderRadius: "26px",
  boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
};

const title = {
  fontSize: "24px",
  fontWeight: "800",
  marginBottom: "6px",
  color: "#0f172a",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "30px",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  marginBottom: "18px",
  fontSize: "15px",
};

const eyeIcon = {
  position: "absolute",
  right: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "18px",
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  background: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "700",
  border: "none",
  cursor: "pointer",
  marginTop: "18px",
};

const footerText = {
  textAlign: "center",
  marginTop: "20px",
  fontSize: "14px",
  color: "#64748b",
};

const link = {
  color: "#2563eb",
  fontWeight: "700",
  cursor: "pointer",
};

export default Login;
