import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function HospitalsAvailable() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/hospitals")
      .then((res) => {
        setHospitals(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const statusStyle = (status) => {
    if (status === "Open")
      return { bg: "#dcfce7", color: "#166534" };
    if (status === "Limited")
      return { bg: "#ffedd5", color: "#9a3412" };
    return { bg: "#fee2e2", color: "#991b1b" };
  };

  return (
    <Layout title="Hospitals Available">
      {loading ? (
        <p style={center}>Loading hospitals...</p>
      ) : hospitals.length === 0 ? (
        <p style={center}>No hospitals available</p>
      ) : (
        <div style={grid}>
          {hospitals.map((h) => {
            const badge = statusStyle(h.status);

            return (
              <div key={h.id} style={card}>
                <div style={header}>
                  <h3 style={name}>{h.name}</h3>
                  <span
                    style={{
                      ...badgeStyle,
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {h.status}
                  </span>
                </div>

                <p style={address}>{h.address}</p>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}

/* ===================== */
/* 🎨 STYLES */
/* ===================== */

const center = {
  textAlign: "center",
  marginTop: "40px",
  color: "#475569",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
};

const card = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

const name = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700",
  color: "#0f172a",
};

const address = {
  fontSize: "15px",
  color: "#475569",
  lineHeight: "1.6",
};

const badgeStyle = {
  padding: "6px 14px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "700",
};

export default HospitalsAvailable;
