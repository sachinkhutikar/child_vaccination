import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  if (!stats) {
    return <Layout title="Admin Dashboard">Loading...</Layout>;
  }

  const chartData = [
    { name: "Completed", value: stats.completed || 0 },
    { name: "Pending", value: stats.pending || 0 },
  ];

  const COLORS = ["#22c55e", "#f97316"];

  const total = (stats.completed || 0) + (stats.pending || 0);

  return (
    <Layout title="Admin Dashboard" showBack={false}>
      {/* 🔘 ACTION CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <ActionCard title="Add Vaccine" onClick={() => navigate("/add-vaccine")} />
        <ActionCard title="Assign Vaccine" onClick={() => navigate("/assign-vaccine")} />
        <ActionCard title="View Reports" onClick={() => navigate("/admin-report")} />
        <ActionCard title="Manage Hospitals" onClick={() => navigate("/admin/hospitals")} />
      </div>

      {/* 📊 STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <StatCard title="Parents" value={stats.parents} color="#2563eb" />
        <StatCard title="Children" value={stats.children} color="#7c3aed" />
        <StatCard title="Completed Vaccines" value={stats.completed} color="#16a34a" />
        <StatCard title="Pending Vaccines" value={stats.pending} color="#ea580c" />
      </div>

      {/* 📈 PIE CHART WITH SIDE SUMMARY */}
      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "25px" }}>
          Vaccine Status Distribution
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {/* 🥧 PIE CHART */}
          <div style={{ width: "350px", height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 SIDE SUMMARY */}
          <div
            style={{
              minWidth: "250px",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "#f0fdf4",
                padding: "18px",
                borderRadius: "14px",
                marginBottom: "15px",
                borderLeft: "6px solid #16a34a",
              }}
            >
              <h4 style={{ margin: 0, color: "#16a34a" }}>
                ✅ Completed
              </h4>
              <p style={{ fontSize: "28px", fontWeight: "bold", margin: "5px 0" }}>
                {stats.completed}
              </p>
              <small>
                {total > 0
                  ? `${Math.round((stats.completed / total) * 100)}% of total`
                  : "0%"}
              </small>
            </div>

            <div
              style={{
                background: "#fff7ed",
                padding: "18px",
                borderRadius: "14px",
                borderLeft: "6px solid #ea580c",
              }}
            >
              <h4 style={{ margin: 0, color: "#ea580c" }}>
                🟠 Pending
              </h4>
              <p style={{ fontSize: "28px", fontWeight: "bold", margin: "5px 0" }}>
                {stats.pending}
              </p>
              <small>
                {total > 0
                  ? `${Math.round((stats.pending / total) * 100)}% of total`
                  : "0%"}
              </small>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* 🔘 ACTION CARD */
function ActionCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#0f172a",
        color: "white",
        padding: "22px",
        borderRadius: "16px",
        cursor: "pointer",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        transition: "0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {title}
    </div>
  );
}

/* 📊 STAT CARD */
function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        textAlign: "center",
        borderTop: `6px solid ${color}`,
      }}
    >
      <h4>{title}</h4>
      <p style={{ fontSize: "32px", fontWeight: "bold", color }}>
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;
