import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function DueVaccines() {
  const { id } = useParams();
  const [due, setDue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/due-vaccines/${id}`)
      .then((res) => {
        setDue(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <Layout title="Due Vaccines">
      {loading ? (
        <p style={center}>Loading due vaccines...</p>
      ) : due.length === 0 ? (
        <p style={center}>🎉 No due vaccines</p>
      ) : (
        <div style={grid}>
          {due.map((v, i) => (
            <div key={i} style={card}>
              {/* 💉 Vaccine Info */}
              <div>
                <h3 style={name}>{v.vaccine}</h3>
                <p style={desc}>
                  Due at <strong>{v.due_month} months</strong>
                </p>
              </div>

              {/* ⚠️ Status */}
              <span style={badge}>Due</span>
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
  marginTop: "40px",
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
  justifyContent: "space-between",
  alignItems: "center",
};

const name = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
};

const desc = {
  marginTop: "6px",
  color: "#475569",
};

const badge = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "6px 14px",
  borderRadius: "999px",
  fontWeight: "700",
  fontSize: "13px",
};

export default DueVaccines;
