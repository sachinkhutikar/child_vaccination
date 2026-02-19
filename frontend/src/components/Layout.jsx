import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

function Layout({ title, children, showBack = true }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #c0e3fa 0%, #df26dc 50%, #ec96df 100%)",
        position: "relative",
      }}
    >
      {/* Soft Glow Background Effect */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #82c5df 0%, transparent 70%)",
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #f9a8f4 0%, transparent 70%)",
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      {/* HEADER */}
      <header
        style={{
          background: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(8px)",
          color: "white",
          padding: "18px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "#1e293b",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "#334155")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "#1e293b")
              }
            >
              ← Back
            </button>
          )}
          <h2 style={{ margin: 0 }}>{title}</h2>
        </div>
        <LogoutButton />
      </header>

      {/* CONTENT */}
      <main
        style={{
          padding: "32px",
          maxWidth: "1200px",
          margin: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
