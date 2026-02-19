import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Vaccines() {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/vaccines")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        data.sort((a, b) => a.due_month - b.due_month);
        setVaccines(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = vaccines.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Vaccination Schedule">
      {/* 🔍 Search */}
      <div style={searchBox}>
        <input
          placeholder="🔍 Search vaccine by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />
      </div>

      {loading ? (
        <p style={center}>Loading vaccination schedule...</p>
      ) : filtered.length === 0 ? (
        <p style={center}>No vaccines found</p>
      ) : (
        <div style={grid}>
          {filtered.map((v) => (
            <div key={v.id} style={card}>
              {/* Age Badge */}
              <div style={ageBadge}>
                {v.due_month} Months
              </div>

              <h3 style={title}>{v.name}</h3>

              <p style={desc}>
                Recommended when the child reaches
                <strong style={highlight}> {v.due_month} months </strong>
                of age.
              </p>

              <div style={footer}>
                <span style={status}>✔ Scheduled</span>
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

const center = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "16px",
  color: "#475569",
};

const searchBox = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
};

const searchInput = {
  width: "360px",
  padding: "14px 22px",
  borderRadius: "999px",
  border: "1px solid #e5e7eb",
  fontSize: "15px",
  outline: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "30px",
};

const card = {
  background: "linear-gradient(180deg, #ffffff, #f8fafc)",
  padding: "28px",
  borderRadius: "22px",
  boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
  position: "relative",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
};

const ageBadge = {
  position: "absolute",
  top: "-14px",
  right: "22px",
  background: "#2563eb",
  color: "white",
  padding: "6px 16px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "700",
};

const title = {
  marginTop: "18px",
  fontSize: "20px",
  fontWeight: "800",
  color: "#0f172a",
};

const desc = {
  marginTop: "14px",
  color: "#475569",
  lineHeight: "1.7",
};

const highlight = {
  color: "#2563eb",
};

const footer = {
  marginTop: "24px",
  display: "flex",
  justifyContent: "flex-end",
};

const status = {
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 16px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "700",
};

export default Vaccines;
