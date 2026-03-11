import { useState } from "react";
const API = "/api";
const inputStyle = { width: "100%", padding: "12px 16px", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "3px", color: "#f0f0f0", fontFamily: "Inter, sans-serif", fontSize: "14px", outline: "none" };
const labelStyle = { display: "block", fontFamily: "Oswald, sans-serif", fontSize: "11px", letterSpacing: "2px", color: "#666", marginBottom: "6px" };
export default function Registration({ showNotification, setActivePage }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", plan: "BASIC", emergencyContact: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const plans = [
    { id: "BASIC", label: "Basic", price: "999/mo", features: "Gym floor access" },
    { id: "PREMIUM", label: "Premium", price: "1799/mo", features: "Gym + Classes + Locker" },
    { id: "ANNUAL", label: "Annual", price: "8999/yr", features: "All Premium + Trainer" },
  ];
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "10-digit phone required";
    if (!form.age || form.age < 16 || form.age > 80) e.age = "Age must be 16-80";
    return e;
  };
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/members`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, age: parseInt(form.age), status: "ACTIVE", membershipFee: form.plan === "BASIC" ? 999 : form.plan === "PREMIUM" ? 1799 : 8999 }) });
      if (res.ok) { showNotification(`${form.name} registered!`); setForm({ name: "", email: "", phone: "", age: "", plan: "BASIC", emergencyContact: "", address: "" }); setTimeout(() => setActivePage("members"), 1500); }
      else throw new Error();
    } catch { showNotification("Backend not connected!", "error"); }
    setLoading(false);
  };
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "48px", letterSpacing: "6px" }}>NEW MEMBER</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "32px" }}>
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "4px", padding: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            {[["FULL NAME *","name","text","John Doe"],["AGE *","age","number","25"],["EMAIL *","email","email","john@email.com"],["PHONE *","phone","text","9876543210"]].map(([label, field, type, ph]) => (
              <div key={field} style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={ph} value={form[field]} onChange={e => handleChange(field, e.target.value)} style={{ ...inputStyle, borderColor: errors[field] ? "#ff3a20" : "#2a2a2a" }} />
                {errors[field] && <div style={{ color: "#ff3a20", fontSize: "11px", marginTop: "4px" }}>{errors[field]}</div>}
              </div>
            ))}
            <div style={{ gridColumn: "1/-1", marginBottom: "20px" }}>
              <label style={labelStyle}>ADDRESS</label>
              <input type="text" placeholder="123 Main St" value={form.address} onChange={e => handleChange("address", e.target.value)} style={inputStyle} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>EMERGENCY CONTACT</label>
              <input type="text" placeholder="9876543211" value={form.emergencyContact} onChange={e => handleChange("emergencyContact", e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>PLAN *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
              {plans.map(p => (
                <div key={p.id} onClick={() => handleChange("plan", p.id)} style={{ padding: "16px", border: `1px solid ${form.plan === p.id ? "#ff3a20" : "#2a2a2a"}`, borderRadius: "3px", cursor: "pointer", background: form.plan === p.id ? "#ff3a2010" : "#0a0a0a" }}>
                  <div style={{ fontFamily: "Oswald", color: form.plan === p.id ? "#ff3a20" : "#aaa" }}>{p.label}</div>
                  <div style={{ color: "#f0f0f0", fontWeight: 600 }}>{p.price}</div>
                  <div style={{ color: "#555", fontSize: "10px" }}>{p.features}</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "#333" : "linear-gradient(135deg,#ff3a20,#cc2a10)", border: "none", borderRadius: "3px", cursor: "pointer", color: "#fff", fontFamily: "Oswald", fontSize: "16px", letterSpacing: "4px" }}>
            {loading ? "REGISTERING..." : "REGISTER MEMBER"}
          </button>
        </div>
        <div style={{ background: "#1a0a0a", border: "1px solid #ff3a2033", borderRadius: "8px", padding: "28px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#ff3a20", marginBottom: "20px", fontFamily: "Oswald" }}>MEMBER PREVIEW</div>
          <div style={{ fontSize: "24px", letterSpacing: "2px" }}>{form.name || "MEMBER NAME"}</div>
          <div style={{ fontFamily: "Inter", fontSize: "12px", color: "#555", marginBottom: "20px" }}>{form.email || "email@example.com"}</div>
          {[["PLAN", form.plan], ["PHONE", form.phone || "—"], ["AGE", form.age || "—"], ["STATUS", "ACTIVE"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontFamily: "Inter", fontSize: "12px" }}>
              <span style={{ color: "#444", fontFamily: "Oswald", letterSpacing: "2px" }}>{l}</span>
              <span style={{ color: l === "STATUS" ? "#4caf50" : "#aaa" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
