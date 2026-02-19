import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    children: 0,
    upcoming: 0,
    overdue: 0,
    child_summary: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/parent/dashboard")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout title="Parent Dashboard">
        <div style={loadingStyle}>Loading dashboard...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Parent Dashboard">

      {/* ALERTS */}
      {stats.overdue > 0 && (
        <div style={alertStyle("#fdecea", "#b71c1c")}>
          ⚠️ You have {stats.overdue} overdue vaccines!
        </div>
      )}

      {stats.upcoming > 0 && (
        <div style={alertStyle("#fff8e1", "#f57f17")}>
          ⏳ {stats.upcoming} vaccines are due soon.
        </div>
      )}

      {/* STAT CARDS */}
      <div style={gridStyle}>
        <div style={cardStyle} onClick={() => navigate("/children")}>
          <h3 style={cardTitle}>Total Children</h3>
          <p style={countStyle}>{stats.children}</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/vaccines")}>
          <h3 style={cardTitle}>Upcoming Vaccines</h3>
          <p style={{ ...countStyle, color: "#f59e0b" }}>
            {stats.upcoming}
          </p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/vaccines")}>
          <h3 style={cardTitle}>Overdue Vaccines</h3>
          <p style={{ ...countStyle, color: "#dc2626" }}>
            {stats.overdue}
          </p>
        </div>
      </div>

      {/* 👶 CHILD SUMMARY SECTION */}
      {stats.child_summary && stats.child_summary.length > 0 && (
        <div style={{ marginTop: "80px" }}>
          <h2 style={summaryHeading}>
            Children Vaccination Summary
          </h2>

          <div style={summaryGrid}>
            {stats.child_summary.map((child) => (
              <div key={child.child_id} style={summaryCard}>
                
                <div style={childTitle}>
                  {child.child_name}
                </div>

                <div style={summaryStats}>
                  <div style={completedBox}>
                    <span style={statNumber}>{child.completed}</span>
                    <span style={statLabel}>Completed</span>
                  </div>

                  <div style={pendingBox}>
                    <span style={statNumber}>{child.pending}</span>
                    <span style={statLabel}>Pending</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div style={buttonContainer}>
        <button style={buttonStyle} onClick={() => navigate("/add-child")}>
          ➕ Add Child
        </button>

        <button style={buttonStyle} onClick={() => navigate("/vaccines")}>
          💉 Vaccination Schedule
        </button>

        <button style={buttonStyle} onClick={() => navigate("/notifications")}>
          🔔 Notifications
        </button>

        <button style={buttonStyle} onClick={() => navigate("/parent/hospitals")}>
          🏥 Hospitals
        </button>

        <button style={buttonStyle} onClick={() => navigate("/children")}>
          👶 View Children
        </button>
      </div>

    </Layout>
  );
}

/* 🎨 STYLES */

const loadingStyle = {
  textAlign: "center",
  padding: "40px",
  fontSize: "18px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "25px",
  marginTop: "25px",
};

const cardStyle = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "18px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  transition: "all 0.3s ease",
};

const cardTitle = {
  marginBottom: "10px",
  fontWeight: "500",
  color: "#555",
};

const countStyle = {
  fontSize: "38px",
  fontWeight: "700",
  marginTop: "5px",
  color: "#2563eb",
};

const alertStyle = (bg, color) => ({
  background: bg,
  color,
  padding: "14px 18px",
  borderRadius: "12px",
  marginBottom: "18px",
  fontWeight: "500",
});

/* 👶 SUMMARY STYLES */

const summaryHeading = {
  marginBottom: "30px",
  fontSize: "22px",
  fontWeight: "600",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "25px",
};

const summaryCard = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const childTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#1f2937",
};

const summaryStats = {
  display: "flex",
  justifyContent: "space-between",
};

const completedBox = {
  background: "#ecfdf5",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
  flex: 1,
  marginRight: "10px",
};

const pendingBox = {
  background: "#fff7ed",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
  flex: 1,
};

const statNumber = {
  display: "block",
  fontSize: "24px",
  fontWeight: "700",
};

const statLabel = {
  fontSize: "14px",
  color: "#6b7280",
};

const buttonContainer = {
  marginTop: "60px",
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
};

export default Dashboard;
