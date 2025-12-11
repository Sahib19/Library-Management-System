import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const data = await api.get("/categories");
      setCategories(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await api.post("/categories", form);
      setForm({ name: "", description: "" });
      await load();
      setMessage("Category added.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Categories</h1>
          <p className="muted">Organize books by category.</p>
        </div>
      </div>

      {message && <div className="alert">{message}</div>}

      <div className="grid cols-2">
        <div className="panel">
          <h2>Add Category</h2>
          <form className="form" onSubmit={submit}>
            <label>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="btn">Save</button>
          </form>
        </div>

        <div className="panel">
          <h2>List</h2>
          <ul className="link-list">
            {categories.map((c) => (
              <li key={c._id}>{c.name}</li>
            ))}
          </ul>
          {!categories.length && <p className="muted">No categories yet.</p>}
        </div>
      </div>
    </div>
  );
}

