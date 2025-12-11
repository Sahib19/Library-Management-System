import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import { StatCard, Grid } from "../components/CardGrid.jsx";

export default function UserDashboard() {
  const [stats, setStats] = useState({ books: 0, issues: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [books, issues] = await Promise.all([api.get("/books"), api.get("/issues")]);
        setStats({ books: books.length, issues: issues.length });
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, []);

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>User Dashboard</h1>
          <p className="muted">Browse books and view issued records.</p>
        </div>
        <div className="nav-actions">
          <Link className="btn ghost" to="/user/books">
            Browse Books
          </Link>
          <Link className="btn ghost" to="/admin/issues">
            Issued Books
          </Link>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <Grid cols={2}>
        <StatCard title="Books Available" value={stats.books || "…"} icon="📚" />
        <StatCard title="Total Issues" value={stats.issues || "…"} icon="📖" />
      </Grid>
    </div>
  );
}

