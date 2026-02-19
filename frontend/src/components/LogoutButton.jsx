import { useNavigate } from "react-router-dom";

function LogoutButton({ showBack = false }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          style={backButton}
        >
          ← Back
        </button>
      )}

      <button
        onClick={logout}
        style={logoutButton}
      >
        Logout
      </button>
    </div>
  );
}

/* 🎨 Styles */

const backButton = {
  background: "#334155",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "500",
};

const logoutButton = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default LogoutButton;

