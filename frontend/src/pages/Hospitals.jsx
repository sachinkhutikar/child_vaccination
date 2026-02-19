import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Hospitals() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/hospitals")
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const statusStyle = (s) => {
    if (s === "Open")
      return { bg: "#dcfce7", color: "#166534" };
    if (s === "Limited")
      return { bg: "#ffedd5", color: "#9a3412" };
    return { bg: "#fee2e2", color: "#991b1b" };
  };

  return (
    <Layout title="Nearby Hospitals">
      {loading ? (
        <p style={center}>Loading hospitals...</p>
      ) : data.length === 0 ? (
        <p style={center}>No hospitals available</p>
      ) : (
        <div style={grid}>
          {data.map((h, i) => {
            const badge = statusStyle(h.status);

            return (
              <div key={i} style={card}>
                <div style={header}>
                  <h3 style={name}>{h.name}</h3>
                  <span
                    style={{
                      ...statusBadge,
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
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  transition: "transform 0.2s, box-shadow 0.2s",
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
  color: "#475569",
  fontSize: "15px",
  lineHeight: "1.6",
};

const statusBadge = {
  padding: "6px 14px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "700",
  whiteSpace: "nowrap",
};

export default Hospitals;
