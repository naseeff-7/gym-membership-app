import { useState } from "react";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import MemberList from "./components/MemberList";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif", minHeight: "100vh", background: "#0a0a0a", color: "#f0f0f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <div style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: "220px",
        background: "linear-gradient(180deg, #111 0%, #1a0a0a 100%)",
        borderRight: "1px solid #ff3a2022",
        display: "flex", flexDirection: "column", zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ padding: "32px 24px 24px", borderBottom: "1px solid #ff3a2022" }}>
          <div style={{ fontSize: "28px", letterSpacing: "4px", color: "#ff3a20", lineHeight: 1 }}>IRON</div>
          <div style={{ fontSize: "13px", letterSpacing: "6px", color: "#666", fontFamily: "Inter, sans-serif", fontWeight: 300 }}>GYM SYSTEM</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "24px 0" }}>
          {[
            { id: "dashboard", icon: "⚡", label: "Dashboard" },
            { id: "register", icon: "➕", label: "New Member" },
            { id: "members", icon: "👥", label: "Members" },
          ].map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)} style={{
              display: "flex", alignItems: "center", gap: "12px",
              width: "100%", padding: "14px 24px", border: "none", cursor: "pointer",
              background: activePage === item.id ? "linear-gradient(90deg, #ff3a2015, transparent)" : "transparent",
              color: activePage === item.id ? "#ff3a20" : "#888",
              borderLeft: activePage === item.id ? "3px solid #ff3a20" : "3px solid transparent",
              fontFamily: "Oswald, sans-serif", fontSize: "14px", letterSpacing: "2px",
              transition: "all 0.2s", textAlign: "left"
            }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #ff3a2022" }}>
          <div style={{ fontSize: "10px", color: "#333", fontFamily: "Inter", letterSpacing: "2px" }}>IRON GYM v1.0</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "220px", padding: "40px", minHeight: "100vh" }}>
        {/* Notification */}
        {notification && (
          <div style={{
            position: "fixed", top: "24px", right: "24px", zIndex: 999,
            background: notification.type === "success" ? "#1a3a1a" : "#3a1a1a",
            border: `1px solid ${notification.type === "success" ? "#4caf50" : "#ff3a20"}`,
            color: notification.type === "success" ? "#4caf50" : "#ff3a20",
            padding: "14px 24px", borderRadius: "4px",
            fontFamily: "Inter", fontSize: "14px",
            animation: "slideIn 0.3s ease"
          }}>
            {notification.msg}
          </div>
        )}

        {activePage === "dashboard" && <Dashboard setActivePage={setActivePage} />}
        {activePage === "register" && <Registration showNotification={showNotification} setActivePage={setActivePage} />}
        {activePage === "members" && <MemberList showNotification={showNotification} />}
      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #ff3a20; border-radius: 2px; }
      `}</style>
    </div>
  );
}
