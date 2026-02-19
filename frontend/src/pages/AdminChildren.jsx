import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AdminChildren() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/children")
      .then((res) => {
        setChildren(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout title="All Children">
      {loading ? (
        <div style={centerBox}>Loading...</div>
      ) : children.length === 0 ? (
        <div style={emptyBox}>
          <h3>No children added yet</h3>
          <p>Parents have not registered any children.</p>
        </div>
      ) : (
        <div style={card}>
          <h3 style={sectionTitle}>Registered Children</h3>

          <table style={table}>
            <thead>
              <tr style={theadRow}>
                <th style={th}>Child Name</th>
                <th style={th}>Date of Birth</th>
                <th style={th}>Parent Name</th>
              </tr>
            </thead>
            <tbody>
              {children.map((c) => (
                <tr key={c.id} style={tbodyRow}>
                  <td style={td}>{c.name}</td>
                  <td style={td}>{c.dob}</td>
                  <td style={td}>
                    <span style={parentBadge}>{c.parent}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

const sectionTitle = {
  marginBottom: "20px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const theadRow = {
  background: "#f1f5f9",
};

const th = {
  padding: "14px",
  textAlign: "left",
  fontWeight: "bold",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
};

const tbodyRow = {
  transition: "0.2s",
};

const parentBadge = {
  background: "#e0e7ff",
  color: "#1e40af",
  padding: "6px 14px",
  borderRadius: "999px",
  fontWeight: "bold",
  fontSize: "14px",
};

const emptyBox = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
};

const centerBox = {
  textAlign: "center",
  padding: "40px",
};

export default AdminChildren;
