import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import { StatCard, Grid } from "../components/CardGrid.jsx";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ books: 0, authors: 0, categories: 0, issues: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [books, authors, categories, issues, users] = await Promise.all([
          api.get("/books"),
          api.get("/authors"),
          api.get("/categories"),
          api.get("/issues"),
          api.get("/users"),
        ]);
        setStats({
          books: books.length,
          authors: authors.length,
          categories: categories.length,
          issues: issues.filter((i) => i.status === "issued").length,
          users: users.length,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="muted">Manage catalog, users, and issued books.</p>
        </div>
        <div className="nav-actions">
          <Link className="btn ghost" to="/admin/books">
            Books
          </Link>
          <Link className="btn ghost" to="/admin/authors">
            Authors
          </Link>
          <Link className="btn ghost" to="/admin/categories">
            Categories
          </Link>
          <Link className="btn ghost" to="/admin/issues">
            Issues
          </Link>
          <Link className="btn ghost" to="/admin/users">
            Users
          </Link>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <Grid cols={3}>
        <StatCard title="Books" value={loading ? "…" : stats.books} icon="📚" />
        <StatCard title="Authors" value={loading ? "…" : stats.authors} icon="✍️" />
        <StatCard title="Categories" value={loading ? "…" : stats.categories} icon="🏷️" />
        <StatCard title="Issued" value={loading ? "…" : stats.issues} icon="📖" />
        <StatCard title="Users" value={loading ? "…" : stats.users} icon="👥" />
      </Grid>
    </div>
  );
}

