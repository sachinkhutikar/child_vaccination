import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "parent",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ============================= */
  /* 🔐 PASSWORD VALIDATION RULES */
  /* ============================= */

  const passwordRules = {
    length: formData.password.length >= 8,
    special: /[@$!%*?&]/.test(formData.password),
  };

  const isStrongPassword = Object.values(passwordRules).every(Boolean);

  const passwordsMatch =
    formData.password &&
    formData.confirm_password &&
    formData.password === formData.confirm_password;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrongPassword) {
      alert("Password is not strong enough");
      return;
    }

    if (!passwordsMatch) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await API.post("/register", formData);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <form onSubmit={handleSubmit} style={card}>
        <h2 style={title}>Create Account</h2>
        <p style={subtitle}>Fill the details below to get started</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={input}
        />

        {/* PASSWORD FIELD */}
        <div style={passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={input}
          />
          <span
            style={eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* PASSWORD RULE CHECKLIST */}
        <div style={ruleBox}>
          <p style={rule(passwordRules.length)}>• At least 8 characters</p>
          <p style={rule(passwordRules.special)}>• One special character (@$!%*?&)</p>
        </div>

        {/* CONFIRM PASSWORD */}
        <input
          type={showPassword ? "text" : "password"}
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
          style={{
            ...input,
            border:
              formData.confirm_password.length === 0
                ? "1px solid #bed0f4"
                : passwordsMatch
                ? "1px solid #16a34a"
                : "1px solid #dc2626",
          }}
        />

        {formData.confirm_password.length > 0 && (
          <p
            style={{
              fontSize: "13px",
              marginTop: "-12px",
              marginBottom: "16px",
              color: passwordsMatch ? "#16a34a" : "#dc2626",
            }}
          >
            {passwordsMatch
              ? "✓ Passwords match"
              : "✗ Passwords do not match"}
          </p>
        )}

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={select}
        >
          <option value="parent">Parent</option>
        </select>

        <button
          type="submit"
          style={{
            ...button,
            opacity: isStrongPassword && passwordsMatch ? 1 : 0.6,
            cursor: isStrongPassword && passwordsMatch ? "pointer" : "not-allowed",
          }}
          disabled={!isStrongPassword || !passwordsMatch || loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p style={footer}>
          Already have an account?
          <span style={link} onClick={() => navigate("/")}>
            {" "}Login
          </span>
        </p>
      </form>
    </div>
  );
}

/* ===================== */
/* 🎨 STYLES */
/* ===================== */

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #a3d4f3, #e9cae9)",
};

const card = {
  width: "420px",
  padding: "40px",
  background: "#b5daf1",
  borderRadius: "24px",
  boxShadow: "0 25px 60px rgba(109, 131, 231, 0.12)",
};

const title = {
  fontSize: "26px",
  fontWeight: "800",
  marginBottom: "8px",
  color: "#0f172a",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #bed0f4",
  marginBottom: "18px",
  fontSize: "15px",
  outline: "none",
};

const passwordWrapper = {
  position: "relative",
};

const eye = {
  position: "absolute",
  right: "15px",
  top: "14px",
  cursor: "pointer",
  fontSize: "16px",
};

const ruleBox = {
  fontSize: "13px",
  marginBottom: "16px",
};

const rule = (valid) => ({
  color: valid ? "#16a34a" : "#dc2626",
  margin: "4px 0",
});

const select = {
  ...input,
  cursor: "pointer",
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
  marginTop: "10px",
};

const footer = {
  textAlign: "center",
  marginTop: "22px",
  fontSize: "14px",
  color: "#64748b",
};

const link = {
  color: "#2563eb",
  fontWeight: "700",
  cursor: "pointer",
};

export default Register;
