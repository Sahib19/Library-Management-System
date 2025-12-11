import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import { useAuth } from "../auth/AuthContext.jsx";

const tabs = [
  { key: "admin-login", label: "Admin Login" },
  { key: "user-login", label: "User Login" },
  { key: "user-register", label: "User Register" },
];

export default function Landing() {
  const [active, setActive] = useState("user-login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [forms, setForms] = useState({
    admin: { email: "", password: "" },
    user: { email: "", password: "" },
    register: { name: "", email: "", password: "", cnic: "", phone: "", gender: "Male" },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (group, field, value) => {
    setForms((prev) => ({ ...prev, [group]: { ...prev[group], [field]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);
    try {
      if (active === "admin-login") {
        const user = await api.post("/auth/login", forms.admin);
        login(user);
        setMessage({ type: "success", text: "Welcome admin! Redirecting..." });
        setTimeout(() => navigate("/admin"), 500);
      } else if (active === "user-login") {
        const user = await api.post("/auth/login", forms.user);
        login(user);
        setMessage({ type: "success", text: "Welcome! Redirecting..." });
        setTimeout(() => navigate("/user"), 500);
      } else {
        const user = await api.post("/users/register", {
          name: forms.register.name,
          email: forms.register.email,
          password: forms.register.password,
          cnic: forms.register.cnic,
          phone: forms.register.phone,
          gender: forms.register.gender,
        });
        login({ ...user, name: forms.register.name });
        setMessage({ type: "success", text: "Registered! Redirecting to user dashboard..." });
        setTimeout(() => navigate("/user"), 500);
      }
    } catch (err) {
      let text = err.message || "Something went wrong. Please try again.";

      if ((active === "admin-login" || active === "user-login") && err.status === 401) {
        text = "Invalid email or password.";
      }

      if (active === "user-register" && err.status === 409) {
        text = "An account with this email already exists. Try logging in instead.";
      }

      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Welcome to the Library</h1>
          <p className="muted">Manage books, categories, authors, and issued books.</p>
        </div>
      </div>

      <div className="panel">
        <div className="nav-actions" style={{ marginBottom: 12 }}>
          {tabs.map((t) => (
            <button key={t.key} className={`btn ghost ${active === t.key ? "is-active" : ""}`} onClick={() => setActive(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {message.text && <div className={`alert ${message.type === "error" ? "error" : "success"}`}>{message.text}</div>}

        <form className="form" onSubmit={handleSubmit}>
          {active === "admin-login" && (
            <>
              <label>Email</label>
              <input required type="email" value={forms.admin.email} onChange={(e) => handleChange("admin", "email", e.target.value)} />
              <label>Password</label>
              <div className="password-field">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={forms.admin.password}
                  onChange={(e) => handleChange("admin", "password", e.target.value)}
                />
                <button
                  type="button"
                  className="btn ghost password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </>
          )}

          {active === "user-login" && (
            <>
              <label>Email</label>
              <input required type="email" value={forms.user.email} onChange={(e) => handleChange("user", "email", e.target.value)} />
              <label>Password</label>
              <div className="password-field">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={forms.user.password}
                  onChange={(e) => handleChange("user", "password", e.target.value)}
                />
                <button
                  type="button"
                  className="btn ghost password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </>
          )}

          {active === "user-register" && (
            <>
              <label>Name</label>
              <input required value={forms.register.name} onChange={(e) => handleChange("register", "name", e.target.value)} />
              <label>Email</label>
              <input required type="email" value={forms.register.email} onChange={(e) => handleChange("register", "email", e.target.value)} />
              <label>Password</label>
              <div className="password-field">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={forms.register.password}
                  onChange={(e) => handleChange("register", "password", e.target.value)}
                />
                <button
                  type="button"
                  className="btn ghost password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <label>CNIC</label>
              <input value={forms.register.cnic} onChange={(e) => handleChange("register", "cnic", e.target.value)} />
              <label>Phone</label>
              <input value={forms.register.phone} onChange={(e) => handleChange("register", "phone", e.target.value)} />
              <label>Gender</label>
              <select value={forms.register.gender} onChange={(e) => handleChange("register", "gender", e.target.value)}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </>
          )}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Working..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

