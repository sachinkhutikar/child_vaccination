import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AddVaccine() {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/vaccine", {
        name,
        due_date: dueDate,
      });

      alert("Vaccine added successfully");
      setName("");
      setDueDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to add vaccine");
    }
  };

  return (
    <Layout title="Add Vaccine">
      <div style={container}>
        <form onSubmit={handleSubmit} style={card}>
          <h2 style={title}>➕ Add New Vaccine</h2>

          <div style={field}>
            <label style={label}>Vaccine Name</label>
            <input
              type="text"
              placeholder="Eg. Polio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={input}
              required
            />
          </div>

          <div style={field}>
            <label style={label}>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={input}
              required
            />
          </div>

          <button type="submit" style={button}>
            Add Vaccine
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
  minHeight: "70vh",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
};

const field = {
  marginBottom: "20px",
};

const label = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  color: "#334155",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: "15px",
};

const button = {
  width: "100%",
  padding: "14px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
};

export default AddVaccine;
