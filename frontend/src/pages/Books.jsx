import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", category: "", isbn: "", totalCopies: 1, coverUrl: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  const load = async () => {
    try {
      setLoading(true);
      const [b, a, c] = await Promise.all([api.get("/books"), api.get("/authors"), api.get("/categories")]);
      setBooks(b);
      setAuthors(a);
      setCategories(c);
      if (!form.author && a.length) setForm((f) => ({ ...f, author: a[0]._id }));
      if (!form.category && c.length) setForm((f) => ({ ...f, category: c[0]._id }));
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (uploadingCover) {
        setMessage("Please wait for the cover image to finish uploading.");
        return;
      }
      setSaving(true);
      setMessage("");
      await api.post("/books", form);
      setForm({ title: "", author: form.author, category: form.category, isbn: "", totalCopies: 1, coverUrl: "" });
      setFileInputKey((k) => k + 1);
      await load();
      setMessage("Book added.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCoverChange = async (file) => {
    try {
      if (!file) {
        setForm((prev) => ({ ...prev, coverUrl: "" }));
        return;
      }

      setUploadingCover(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/uploads/cover`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to upload image");
      }

      setForm((prev) => ({ ...prev, coverUrl: data.url }));
      setMessage("Image uploaded.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Books</h1>
          <p className="muted">Add books and view the catalog.</p>
        </div>
      </div>

      {message && <div className="alert">{message}</div>}

      <div className="grid cols-2">
        <div className="panel">
          <h2>Add Book</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <label>Author</label>
            <select value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}>
              {authors.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name}
                </option>
              ))}
            </select>

            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>ISBN</label>
            <input value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />

            <label>Cover Image</label>
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              onChange={(e) => handleCoverChange(e.target.files?.[0] || null)}
            />
            {form.coverUrl && (
              <div style={{ marginTop: 8 }}>
                <span className="muted" style={{ display: "block", marginBottom: 4 }}>
                  Preview
                </span>
                <img
                  src={form.coverUrl}
                  alt="Cover preview"
                  style={{ maxWidth: 120, maxHeight: 160, borderRadius: 4 }}
                />
              </div>
            )}

            <label>Total Copies</label>
            <input
              type="number"
              min={1}
              value={form.totalCopies}
              onChange={(e) => setForm({ ...form, totalCopies: Number(e.target.value) })}
            />

            <button className="btn" type="submit" disabled={loading || saving || uploadingCover}>
              {saving || uploadingCover ? "Saving..." : "Add Book"}
            </button>
          </form>
        </div>

        <div className="panel">
          <h2>Catalog</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>{b.title}</td>
                  <td>{b.author?.name}</td>
                  <td>{b.category?.name}</td>
                  <td>
                    <span className="tag">{b.availableCopies ?? 0} / {b.totalCopies ?? 0}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!books.length && !loading && <p className="muted">No books yet.</p>}
        </div>
      </div>
    </div>
  );
}

