import { useState, useEffect } from "react";

const API = "/api";

export default function Dashboard({ setActivePage }) {
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0, revenue: 0 });
  const [recentMembers, setRecentMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/members`);
      const members = await res.json();
      const active = members.filter(m => m.status === "ACTIVE").length;
      const expired = members.filter(m => m.status === "EXPIRED").length;
      const revenue = members.reduce((sum, m) => sum + (m.membershipFee || 0), 0);
      setStats({ total: members.length, active, expired, revenue });
      setRecentMembers(members.slice(-5).reverse());
    } catch {
      // Backend not connected - show demo data
      setStats({ total: 24, active: 18, expired: 6, revenue: 12400 });
      setRecentMembers([
        { id: 1, name: "Alex Johnson", plan: "PREMIUM", status: "ACTIVE", email: "alex@email.com" },
        { id: 2, name: "Maria Garcia", plan: "BASIC", status: "ACTIVE", email: "maria@email.com" },
        { id: 3, name: "James Wilson", plan: "ANNUAL", status: "EXPIRED", email: "james@email.com" },
      ]);
    }
    setLoading(false);
  };

  const statCards = [
    { label: "Total Members", value: stats.total, icon: "👥", color: "#ff3a20" },
    { label: "Active Members", value: stats.active, icon: "✅", color: "#4caf50" },
    { label: "Expired", value: stats.expired, icon: "⏰", color: "#ff9800" },
    { label: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: "💰", color: "#2196f3" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "48px", letterSpacing: "6px", lineHeight: 1 }}>DASHBOARD</div>
        <div style={{ color: "#555", fontFamily: "Inter", fontSize: "13px", marginTop: "6px", letterSpacing: "2px" }}>
          IRON GYM MEMBERSHIP SYSTEM
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" }}>
        {statCards.map((card, i) => (
          <div key={i} style={{
            background: "#111", border: "1px solid #1e1e1e",
            borderTop: `3px solid ${card.color}`,
            padding: "24px", borderRadius: "4px",
            transition: "transform 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{card.icon}</div>
            <div style={{ fontSize: "36px", color: card.color, fontWeight: "bold", lineHeight: 1 }}>{loading ? "—" : card.value}</div>
            <div style={{ fontFamily: "Inter", fontSize: "11px", color: "#555", marginTop: "6px", letterSpacing: "2px" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Members */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "4px", padding: "24px" }}>
          <div style={{ fontSize: "18px", letterSpacing: "4px", marginBottom: "20px", color: "#ff3a20" }}>RECENT MEMBERS</div>
          {recentMembers.map((m, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 0", borderBottom: "1px solid #1a1a1a",
              fontFamily: "Inter", fontSize: "13px"
            }}>
              <div>
                <div style={{ color: "#ddd", fontWeight: 500 }}>{m.name}</div>
                <div style={{ color: "#555", fontSize: "11px" }}>{m.email}</div>
              </div>
              <span style={{
                padding: "3px 10px", borderRadius: "2px", fontSize: "10px", letterSpacing: "1px",
                background: m.status === "ACTIVE" ? "#1a3a1a" : "#3a1a1a",
                color: m.status === "ACTIVE" ? "#4caf50" : "#ff9800",
                fontFamily: "Oswald, sans-serif"
              }}>{m.status}</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "4px", padding: "24px" }}>
          <div style={{ fontSize: "18px", letterSpacing: "4px", marginBottom: "20px", color: "#ff3a20" }}>QUICK ACTIONS</div>
          {[
            { label: "Register New Member", desc: "Add a new gym member", page: "register", icon: "➕" },
            { label: "View All Members", desc: "Manage existing members", page: "members", icon: "👥" },
          ].map((action, i) => (
            <button key={i} onClick={() => setActivePage(action.page)} style={{
              width: "100%", padding: "20px", marginBottom: "12px",
              background: "#0a0a0a", border: "1px solid #1e1e1e",
              borderRadius: "4px", cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: "16px",
              transition: "all 0.2s", color: "#f0f0f0"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff3a20"; e.currentTarget.style.background = "#ff3a2008"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.background = "#0a0a0a"; }}
            >
              <span style={{ fontSize: "24px" }}>{action.icon}</span>
              <div>
                <div style={{ fontFamily: "Oswald", letterSpacing: "2px", fontSize: "14px" }}>{action.label}</div>
                <div style={{ fontFamily: "Inter", fontSize: "11px", color: "#555", marginTop: "2px" }}>{action.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
