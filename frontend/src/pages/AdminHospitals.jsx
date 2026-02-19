import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AdminHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    opening_time: "",
    closing_time: "",
    status: "Open",
  });
  const [editId, setEditId] = useState(null);

  const fetchHospitals = async () => {
    const res = await API.get("/admin/hospitals");
    setHospitals(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHospital = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/admin/hospital/${editId}`, form);
    } else {
      await API.post("/admin/hospitals", form);
    }

    setForm({
      name: "",
      address: "",
      opening_time: "",
      closing_time: "",
      status: "Open",
    });
    setEditId(null);
    fetchHospitals();
  };

  const editHospital = (h) => {
    setEditId(h.id);
    setForm(h);
  };

  const deleteHospital = async (id) => {
    if (!window.confirm("Delete hospital?")) return;
    await API.delete(`/admin/hospital/${id}`);
    fetchHospitals();
  };

  return (
    <Layout title="Manage Hospitals">
      {/* ➕ ADD / EDIT HOSPITAL */}
      <div style={card}>
        <h3>{editId ? "Edit Hospital" : "Add Hospital"}</h3>

        <form onSubmit={submitHospital} style={formGrid}>
          <input
            name="name"
            placeholder="Hospital Name"
            value={form.name}
            onChange={handleChange}
            required
            style={input}
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            style={input}
          />
          <input
            name="opening_time"
            placeholder="Opening Time"
            value={form.opening_time}
            onChange={handleChange}
            style={input}
          />
          <input
            name="closing_time"
            placeholder="Closing Time"
            value={form.closing_time}
            onChange={handleChange}
            style={input}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={input}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <button style={primaryBtn} type="submit">
            {editId ? "Update Hospital" : "Add Hospital"}
          </button>
        </form>
      </div>

      {/* 🏥 HOSPITAL LIST */}
      <div style={{ ...card, marginTop: "30px" }}>
        <h3>Hospitals List</h3>

        {hospitals.length === 0 ? (
          <p>No hospitals added yet.</p>
        ) : (
          <table style={table}>
            <thead style={thead}>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Address</th>
                <th style={th}>Timings</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h) => (
                <tr key={h.id}>
                  <td style={td}>{h.name}</td>
                  <td style={td}>{h.address}</td>
                  <td style={td}>
                    {h.opening_time} - {h.closing_time}
                  </td>
                  <td style={td}>
                    <span
                      style={{
                        ...statusBadge,
                        background:
                          h.status === "Open" ? "#dcfce7" : "#fee2e2",
                        color:
                          h.status === "Open" ? "#166534" : "#991b1b",
                      }}
                    >
                      {h.status}
                    </span>
                  </td>
                  <td style={td}>
                    <button
                      style={editBtn}
                      onClick={() => editHospital(h)}
                    >
                      Edit
                    </button>
                    <button
                      style={deleteBtn}
                      onClick={() => deleteHospital(h.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

/* ===================== */
/* 🎨 STYLES */
/* ===================== */

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const primaryBtn = {
  gridColumn: "span 2",
  background: "#0f172a",
  color: "white",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thead = {
  background: "#f1f5f9",
};

const th = {
  padding: "14px",
  textAlign: "left",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
};

const statusBadge = {
  padding: "6px 14px",
  borderRadius: "999px",
  fontWeight: "bold",
  fontSize: "14px",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "none",
  marginRight: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

export default AdminHospitals;
