import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ user: "", book: "", dueAt: "" });
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const [i, u, b] = await Promise.all([api.get("/issues"), api.get("/users"), api.get("/books")]);
      setIssues(i);
      setUsers(u);
      setBooks(b);
      if (!form.user && u.length) setForm((f) => ({ ...f, user: u[0]._id }));
      if (!form.book && b.length) setForm((f) => ({ ...f, book: b[0]._id }));
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await api.post("/issues", form);
      setMessage("Book issued.");
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const markReturn = async (id) => {
    try {
      await api.patch(`/issues/${id}/return`, {});
      await load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Issued Books</h1>
          <p className="muted">Issue and return books.</p>
        </div>
      </div>

      {message && <div className="alert">{message}</div>}

      <div className="grid cols-2">
        <div className="panel">
          <h2>Issue Book</h2>
          <form className="form" onSubmit={submit}>
            <label>User</label>
            <select value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })}>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name || u.email}
                </option>
              ))}
            </select>
            <label>Book</label>
            <select value={form.book} onChange={(e) => setForm({ ...form, book: e.target.value })}>
              {books.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.title}
                </option>
              ))}
            </select>
            <label>Due At</label>
            <input type="date" value={form.dueAt} onChange={(e) => setForm({ ...form, dueAt: e.target.value })} />
            <button className="btn">Issue</button>
          </form>
        </div>

        <div className="panel">
          <h2>Records</h2>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((i) => (
                <tr key={i._id}>
                  <td>{i.user?.name || i.user?.email}</td>
                  <td>{i.book?.title}</td>
                  <td>
                    <span className="tag">{i.status}</span>
                  </td>
                  <td>
                    {i.status === "issued" ? (
                      <button className="btn ghost" onClick={() => markReturn(i._id)}>
                        Return
                      </button>
                    ) : (
                      <span className="muted">Returned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!issues.length && <p className="muted">No issues yet.</p>}
        </div>
      </div>
    </div>
  );
}

