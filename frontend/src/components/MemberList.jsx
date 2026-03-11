import { useState, useEffect } from "react";

const API = "/api";

const DEMO_MEMBERS = [
  { id: 1, name: "Alex Johnson", email: "alex@email.com", phone: "9876543210", plan: "PREMIUM", status: "ACTIVE", age: 28, membershipFee: 1799 },
  { id: 2, name: "Maria Garcia", email: "maria@email.com", phone: "9876543211", plan: "BASIC", status: "ACTIVE", age: 24, membershipFee: 999 },
  { id: 3, name: "James Wilson", email: "james@email.com", phone: "9876543212", plan: "ANNUAL", status: "EXPIRED", age: 35, membershipFee: 8999 },
  { id: 4, name: "Priya Sharma", email: "priya@email.com", phone: "9876543213", plan: "PREMIUM", status: "ACTIVE", age: 22, membershipFee: 1799 },
  { id: 5, name: "Rahul Kumar", email: "rahul@email.com", phone: "9876543214", plan: "BASIC", status: "ACTIVE", age: 30, membershipFee: 999 },
];

export default function MemberList({ showNotification }) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API}/members`);
      const data = await res.json();
      setMembers(data);
    } catch {
      setMembers(DEMO_MEMBERS);
    }
    setLoading(false);
  };

  const deleteMember = async (id) => {
    try {
      await fetch(`${API}/members/${id}`, { method: "DELETE" });
      setMembers(members.filter(m => m.id !== id));
      showNotification("Member deleted successfully");
    } catch {
      setMembers(members.filter(m => m.id !== id));
      showNotification("Member removed (demo mode)");
    }
    setSelected(null);
  };

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || m.status === filter || m.plan === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "48px", letterSpacing: "6px", lineHeight: 1 }}>MEMBERS</div>
        <div style={{ color: "#555", fontFamily: "Inter", fontSize: "13px", marginTop: "6px", letterSpacing: "2px" }}>
          {members.length} TOTAL MEMBERS
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center" }}>
        <input
          placeholder="🔍  Search by name or email..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, padding: "12px 16px", background: "#111",
            border: "1px solid #2a2a2a", borderRadius: "3px",
            color: "#f0f0f0", fontFamily: "Inter", fontSize: "13px", outline: "none"
          }}
        />
        {["ALL", "ACTIVE", "EXPIRED", "BASIC", "PREMIUM", "ANNUAL"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "10px 16px", border: `1px solid ${filter === f ? "#ff3a20" : "#2a2a2a"}`,
            background: filter === f ? "#ff3a2015" : "#111",
            color: filter === f ? "#ff3a20" : "#666",
            borderRadius: "3px", cursor: "pointer",
            fontFamily: "Oswald", fontSize: "11px", letterSpacing: "1px"
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "4px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
              {["NAME", "EMAIL", "PHONE", "PLAN", "AGE", "STATUS", "FEE", "ACTIONS"].map(h => (
                <th key={h} style={{
                  padding: "14px 16px", textAlign: "left",
                  fontFamily: "Oswald", fontSize: "11px", letterSpacing: "2px", color: "#444"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "#444", fontFamily: "Inter" }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "#444", fontFamily: "Inter" }}>No members found</td></tr>
            ) : filtered.map((m, i) => (
              <tr key={m.id} style={{
                borderBottom: "1px solid #161616",
                background: i % 2 === 0 ? "transparent" : "#0d0d0d",
                transition: "background 0.15s"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#ff3a2008"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#0d0d0d"}
              >
                <td style={{ padding: "14px 16px", fontFamily: "Inter", fontSize: "13px", fontWeight: 500 }}>{m.name}</td>
                <td style={{ padding: "14px 16px", fontFamily: "Inter", fontSize: "12px", color: "#666" }}>{m.email}</td>
                <td style={{ padding: "14px 16px", fontFamily: "Inter", fontSize: "12px", color: "#666" }}>{m.phone}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: "2px",
                    fontFamily: "Oswald", fontSize: "10px", letterSpacing: "1px",
                    background: m.plan === "PREMIUM" ? "#1a1a3a" : m.plan === "ANNUAL" ? "#1a3a1a" : "#1a1a1a",
                    color: m.plan === "PREMIUM" ? "#6688ff" : m.plan === "ANNUAL" ? "#4caf50" : "#aaa"
                  }}>{m.plan}</span>
                </td>
                <td style={{ padding: "14px 16px", fontFamily: "Inter", fontSize: "12px", color: "#666" }}>{m.age}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: "2px",
                    fontFamily: "Oswald", fontSize: "10px", letterSpacing: "1px",
                    background: m.status === "ACTIVE" ? "#1a3a1a" : "#3a1a1a",
                    color: m.status === "ACTIVE" ? "#4caf50" : "#ff9800"
                  }}>{m.status}</span>
                </td>
                <td style={{ padding: "14px 16px", fontFamily: "Inter", fontSize: "12px", color: "#4caf50" }}>₹{m.membershipFee?.toLocaleString()}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => setSelected(selected === m.id ? null : m.id)} style={{
                    padding: "6px 14px", background: "transparent",
                    border: "1px solid #ff3a2055", color: "#ff3a20",
                    borderRadius: "2px", cursor: "pointer",
                    fontFamily: "Oswald", fontSize: "10px", letterSpacing: "1px"
                  }}>OPTIONS</button>
                  {selected === m.id && (
                    <div style={{
                      position: "absolute", background: "#1a1a1a",
                      border: "1px solid #2a2a2a", borderRadius: "3px",
                      marginTop: "4px", zIndex: 10, minWidth: "120px"
                    }}>
                      <button onClick={() => deleteMember(m.id)} style={{
                        display: "block", width: "100%", padding: "10px 16px",
                        background: "transparent", border: "none",
                        color: "#ff3a20", fontFamily: "Inter", fontSize: "12px",
                        cursor: "pointer", textAlign: "left"
                      }}>🗑 Delete Member</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
