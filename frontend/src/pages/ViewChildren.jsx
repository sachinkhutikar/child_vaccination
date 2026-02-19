import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function ViewChildren() {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/children")
      .then((res) => setChildren(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout title="My Children">
      {children.length === 0 ? (
        <p style={empty}>No children added yet 👶</p>
      ) : (
        <div style={grid}>
          {children.map((child) => (
            <div key={child.id} style={card}>
              {/* 👶 Child Info */}
              <div style={info}>
                <h3 style={name}>{child.name}</h3>
                <p style={dob}>DOB: {child.dob}</p>
              </div>

              {/* 🔘 Actions */}
              <div style={actions}>
                <button
                  style={primaryBtn}
                  onClick={() =>
                    navigate(`/child-vaccines/${child.id}`)
                  }
                >
                  View Vaccines
                </button>

                <button
                  style={secondaryBtn}
                  onClick={() =>
                    navigate(`/due-vaccines/${child.id}`)
                  }
                >
                  Due Vaccines
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

/* ===================== */
/* 🎨 STYLES */
/* ===================== */

const empty = {
  textAlign: "center",
  marginTop: "40px",
  fontSize: "16px",
  color: "#64748b",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const card = {
  background: "white",
  padding: "22px",
  borderRadius: "18px",
  boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const info = {
  marginBottom: "16px",
};

const name = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
};

const dob = {
  marginTop: "6px",
  color: "#475569",
  fontSize: "14px",
};

const actions = {
  display: "flex",
  gap: "12px",
};

const primaryBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const secondaryBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #2563eb",
  background: "white",
  color: "#2563eb",
  fontWeight: "600",
  cursor: "pointer",
};

export default ViewChildren;
