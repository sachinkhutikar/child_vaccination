import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AssignVaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [children, setChildren] = useState([]);

  const [vaccineId, setVaccineId] = useState("");
  const [assignTo, setAssignTo] = useState("ALL");
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    API.get("/vaccines").then((res) => setVaccines(res.data));
    API.get("/admin/children").then((res) => setChildren(res.data));
  }, []);

  const handleAssign = async () => {
    if (!vaccineId || !dueDate) {
      alert("Please select vaccine and due date");
      return;
    }

    const payload =
      assignTo === "ALL"
        ? {
            vaccine_id: Number(vaccineId),
            assign_to: "ALL",
            due_date: dueDate,
          }
        : {
            vaccine_id: Number(vaccineId),
            child_ids: selectedChildren,
            due_date: dueDate,
          };

    try {
      await API.post("/assign-vaccine", payload);
      alert("Vaccine assigned successfully");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Assign failed – check console");
    }
  };

  return (
    <Layout title="Assign Vaccine">
      <div style={container}>
        <h2 style={heading}>Assign Vaccine</h2>

        {/* 🧪 Vaccine */}
        <div style={field}>
          <label style={label}>Select Vaccine</label>
          <select
            value={vaccineId}
            onChange={(e) => setVaccineId(e.target.value)}
            style={input}
          >
            <option value="">Choose vaccine</option>
            {vaccines.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* 📅 Due Date */}
        <div style={field}>
          <label style={label}>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={input}
          />
        </div>

        {/* 👶 Assign Type */}
        <div style={field}>
          <label style={label}>Assign To</label>
          <select
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            style={input}
          >
            <option value="ALL">All Children</option>
            <option value="SPECIFIC">Specific Children</option>
          </select>
        </div>

        {/* 👧👦 Children Selection */}
        {assignTo === "SPECIFIC" && (
          <div style={childrenBox}>
            <h4 style={{ marginBottom: "12px" }}>Select Children</h4>

            <div style={childrenGrid}>
              {children.map((c) => (
                <label key={c.id} style={childCard}>
                  <input
                    type="checkbox"
                    checked={selectedChildren.includes(c.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedChildren([...selectedChildren, c.id]);
                      } else {
                        setSelectedChildren(
                          selectedChildren.filter((id) => id !== c.id)
                        );
                      }
                    }}
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Action */}
        <button style={button} onClick={handleAssign}>
          Assign Vaccine
        </button>
      </div>
    </Layout>
  );
}

/* ===================== */
/* 🎨 STYLES */
/* ===================== */

const container = {
  maxWidth: "720px",
  margin: "0 auto",
  background: "white",
  padding: "32px",
  borderRadius: "20px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const heading = {
  marginBottom: "24px",
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center",
};

const field = {
  marginBottom: "20px",
};

const label = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#334155",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: "15px",
};

const childrenBox = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "14px",
  background: "#f8fafc",
};

const childrenGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
};

const childCard = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "white",
  padding: "10px 14px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  cursor: "pointer",
};

const button = {
  marginTop: "30px",
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};

export default AssignVaccine;
