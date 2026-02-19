import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Notifications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/notifications")
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Vaccine Notifications">
      {loading ? (
        <p style={center}>Loading notifications...</p>
      ) : data.length === 0 ? (
        <div style={emptyCard}>
          <h3>🎉 No Notifications</h3>
          <p>All vaccinations are up to date.</p>
        </div>
      ) : (
        <div style={list}>
          {data.map((n, i) => {
            const isOverdue = n.type === "overdue";

            return (
              <div
                key={i}
                style={{
                  ...card,
                  borderLeft: `6px solid ${
                    isOverdue ? "#dc2626" : "#f97316"
                  }`,
                  background: isOverdue ? "#fef2f2" : "#fff7ed",
                }}
              >
                <div style={row}>
                  <span style={icon}>
                    {isOverdue ? "⚠️" : "⏰"}
                  </span>

                  <div>
                    <h4 style={title}>
                      {n.child} – {n.vaccine}
                    </h4>

                    <p style={text}>
                      Due on: <strong>{n.due_date}</strong>
                    </p>

                    <span
                      style={{
                        ...badge,
                        background: isOverdue ? "#fee2e2" : "#ffedd5",
                        color: isOverdue ? "#991b1b" : "#9a3412",
                      }}
                    >
                      {isOverdue
                        ? "Overdue"
                        : `Due in ${n.days_left} days`}
                    </span>
                  </div>
                </div>
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
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const card = {
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const row = {
  display: "flex",
  gap: "14px",
};

const icon = {
  fontSize: "26px",
  lineHeight: "1",
};

const title = {
  margin: 0,
  fontSize: "17px",
  fontWeight: "700",
  color: "#0f172a",
};

const text = {
  margin: "6px 0",
  color: "#475569",
  fontSize: "14px",
};

const badge = {
  display: "inline-block",
  marginTop: "6px",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "600",
};

const emptyCard = {
  background: "white",
  padding: "40px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

export default Notifications;
