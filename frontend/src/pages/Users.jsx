import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const data = await api.get("/users");
      setUsers(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <h1>Registered Users</h1>
          <p className="muted">View all users.</p>
        </div>
      </div>
      {message && <div className="alert">{message}</div>}
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="tag">{u.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && <p className="muted">No users yet.</p>}
      </div>
    </div>
  );
}

