import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/report")
      .then((res) => {
        setReports(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Layout title="Vaccine Report">Loading...</Layout>;
  }

  if (reports.length === 0) {
    return (
      <Layout title="Vaccine Report">
        <div style={emptyBox}>
          <h3>No report data available</h3>
          <p>Please assign vaccines to see reports.</p>
        </div>
      </Layout>
    );
  }

  // 📊 SUMMARY
  const completed = reports.filter(r => r.status.toLowerCase() === "completed").length;
  const pending = reports.filter(r => r.status.toLowerCase() === "pending").length;

  const chartData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#22c55e", "#f97316"];

  return (
    <Layout title="Vaccine Report">

      {/* 🔢 SUMMARY CARDS */}
      <div style={summaryGrid}>
        <SummaryCard title="Total Vaccines" value={reports.length} color="#2563eb" />
        <SummaryCard title="Completed" value={completed} color="#16a34a" />
        <SummaryCard title="Pending" value={pending} color="#ea580c" />
      </div>

      {/* 📈 PIE CHART */}
      <div style={card}>
        <h3 style={sectionTitle}>Vaccine Status Distribution</h3>

        <div style={{ height: "300px" }}>
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
      </div>

      {/* 📋 TABLE */}
      <div style={card}>
        <h3 style={sectionTitle}>Vaccine Details</h3>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Child</th>
              <th style={th}>Vaccine</th>
              <th style={th}>Status</th>
              <th style={th}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td style={td}>{r.child_name}</td>
                <td style={td}>{r.vaccine_name}</td>
                <td style={td}>
                  <span
                    style={{
                      ...statusBadge,
                      background:
                        r.status.toLowerCase() === "completed"
                          ? "#dcfce7"
                          : "#ffedd5",
                      color:
                        r.status.toLowerCase() === "completed"
                          ? "#166534"
                          : "#9a3412",
                    }}
                  >
                    {r.status}
                  </span>
                </td>
                <td style={td}>{r.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  marginBottom: "40px",
};

const sectionTitle = {
  marginBottom: "20px",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

function SummaryCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "22px",
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        borderTop: `6px solid ${color}`,
        textAlign: "center",
      }}
    >
      <h4>{title}</h4>
      <p style={{ fontSize: "32px", fontWeight: "bold", color }}>{value}</p>
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "14px",
  textAlign: "left",
  background: "#f1f5f9",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
};

const statusBadge = {
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

export default AdminReport;
