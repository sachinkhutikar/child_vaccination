import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AddChild() {
  const [data, setData] = useState({ name: "", dob: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/child", data);
      alert("Child added successfully");
      setData({ name: "", dob: "" });
    } catch (err) {
      alert("Failed to add child");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Add Child">
      <div style={container}>
        <form onSubmit={handleSubmit} style={card}>
          <h2 style={heading}>Add Child Details</h2>
          <p style={subText}>
            Enter your child’s information to track vaccinations
          </p>

          <label style={label}>Child Name</label>
          <input
            name="name"
            placeholder="Enter child's full name"
            value={data.name}
            onChange={handleChange}
            required
            style={input}
          />

         <input
  name="dob"
  type="date"
  value={data.dob}
  onChange={handleChange}
  required
  max={new Date().toISOString().split("T")[0]}   // ✅ ADD THIS
  style={input}
/>


          <button type="submit" style={button} disabled={loading}>
            {loading ? "Adding..." : "Add Child"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

/* ===================== */
/* 🎨 STYLES */
/* ===================== */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "40px",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "white",
  padding: "36px",
  borderRadius: "20px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
};

const heading = {
  marginBottom: "8px",
  fontSize: "24px",
  fontWeight: "800",
  color: "#0f172a",
  textAlign: "center",
};

const subText = {
  textAlign: "center",
  color: "#64748b",
  marginBottom: "24px",
  fontSize: "14px",
};

const label = {
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "6px",
  color: "#334155",
};

const input = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  marginBottom: "18px",
  fontSize: "15px",
};

const button = {
  marginTop: "10px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};

export default AddChild;
