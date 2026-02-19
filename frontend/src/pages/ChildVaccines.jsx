import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function ChildVaccines() {
  const { id } = useParams();
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const loadVaccines = () => {
    API.get(`/child-vaccines/${id}`)
      .then((res) => {
        setVaccines(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  loadVaccines();
}, [id]);


 const markCompleted = async (cvId) => {
  await API.put(`/complete-vaccine/${cvId}`);
  alert("Vaccine marked as completed");

  // reload directly
  const res = await API.get(`/child-vaccines/${id}`);
  setVaccines(Array.isArray(res.data) ? res.data : []);
};


  return (
    <Layout title="Child Vaccines">
      {loading ? (
        <p style={center}>Loading vaccines...</p>
      ) : vaccines.length === 0 ? (
        <p style={center}>No vaccines assigned yet</p>
      ) : (
        <div style={grid}>
          {vaccines.map((v) => (
            <div key={v.id} style={card}>
              <h3 style={title}>{v.vaccine}</h3>

              <span
                style={{
                  ...badge,
                  background:
                    v.status === "Completed" ? "#dcfce7" : "#fff7ed",
                  color:
                    v.status === "Completed" ? "#166534" : "#9a3412",
                }}
              >
                {v.status}
              </span>

              {v.status === "Pending" && (
                <button
                  style={button}
                  onClick={() => markCompleted(v.id)}
                >
                  Mark as Completed
                </button>
              )}
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
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};

const card = {
  background: "white",
  padding: "26px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const title = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
};

const badge = {
  alignSelf: "flex-start",
  padding: "6px 14px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "700",
};

const button = {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  fontWeight: "700",
  cursor: "pointer",
};

export default ChildVaccines;
