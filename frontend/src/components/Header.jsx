import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/assets/images/logo.png";
import { useAuth } from "../auth/AuthContext.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/admin", label: "Admin" },
  { to: "/user", label: "User" },
];

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="brand">
        <img src={logo} alt="logo" className="brand-logo" />
        <span>Library Management System</span>
      </Link>
      <div className="nav-actions">
        {!user &&
          navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`btn ghost ${pathname === link.to ? "is-active" : ""}`}>
              {link.label}
            </Link>
          ))}
        {user && (
          <>
            <span className="muted" style={{ marginRight: 12 }}>
              {user.name || user.email}
            </span>
            <button className="btn ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

