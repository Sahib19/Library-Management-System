import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [bookData, categoryData] = await Promise.all([api.get("/books"), api.get("/categories")]);
        setBooks(bookData);
        setCategories(categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter((b) => b.category && b.category._id === selectedCategory);

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Browse Books</h1>
          <p className="muted">Explore available books by category.</p>
        </div>
        <div className="nav-actions">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      {loading ? (
        <p className="muted">Loading books...</p>
      ) : !filteredBooks.length ? (
        <p className="muted">No books found for this category.</p>
      ) : (
        <div className="grid cols-3">
          {filteredBooks.map((b) => (
            <div key={b._id} className="card book-card">
              <div
                className="book-cover-wrapper"
                style={{
                  width: "100%",
                  height: 160,
                  backgroundColor: "#020617",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              >
                {b.coverUrl ? (
                  <img
                    src={b.coverUrl}
                    alt={b.title}
                    className="book-cover"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span className="muted">No cover</span>
                )}
              </div>

              <div>
                <div className="card-title" style={{ marginBottom: 4 }}>
                  {b.title}
                </div>
                <p className="muted" style={{ marginBottom: 4 }}>
                  {b.author?.name || "Unknown author"}
                </p>
                <p className="muted" style={{ marginBottom: 8 }}>
                  {b.category?.name || "Uncategorized"}
                </p>
                <span className="tag">
                  {b.availableCopies ?? 0} / {b.totalCopies ?? 0} available
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
