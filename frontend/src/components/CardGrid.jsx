import React from "react";

export function StatCard({ title, value, icon }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div>
        <div className="card-title">{title}</div>
        <div className="card-value">{value}</div>
      </div>
    </div>
  );
}

export function ActionCard({ title, description, actionText, onClick, icon }) {
  return (
    <div className="card actionable" onClick={onClick}>
      <div className="card-icon">{icon}</div>
      <div className="card-title">{title}</div>
      <p className="card-desc">{description}</p>
      <button className="btn">{actionText}</button>
    </div>
  );
}

export function Grid({ children, cols = 3 }) {
  return <div className={`grid cols-${cols}`}>{children}</div>;
}

