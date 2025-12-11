import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ name: "", bio: "" });
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const data = await api.get("/authors");
      setAuthors(data);
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
      await api.post("/authors", form);
      setForm({ name: "", bio: "" });
      await load();
      setMessage("Author added.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Authors</h1>
          <p className="muted">Manage authors.</p>
        </div>
      </div>

      {message && <div className="alert">{message}</div>}

      <div className="grid cols-2">
        <div className="panel">
          <h2>Add Author</h2>
          <form className="form" onSubmit={submit}>
            <label>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Bio</label>
            <input value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            <button className="btn">Save</button>
          </form>
        </div>
        <div className="panel">
          <h2>List</h2>
          <ul className="link-list">
            {authors.map((a) => (
              <li key={a._id}>{a.name}</li>
            ))}
          </ul>
          {!authors.length && <p className="muted">No authors yet.</p>}
        </div>
      </div>
    </div>
  );
}

