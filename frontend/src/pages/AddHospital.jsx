import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function AddHospital() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Open");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/hospital", {
        name,
        address,
        status,
      });

      alert("Hospital added successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to add hospital");
    }
  };

  return (
    <Layout title="Add Hospital">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Add New Hospital</h3>

        <input
          type="text"
          placeholder="Hospital Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={inputStyle}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

        <button style={btnStyle}>Add Hospital</button>
      </form>
    </Layout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btnStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  background: "#0f172a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

export default AddHospital;
