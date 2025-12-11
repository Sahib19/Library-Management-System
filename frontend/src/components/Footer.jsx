import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <h4>About</h4>
          <p>Simple Library Management System to manage books, authors, categories, and issued records.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: info@librarymanagement.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="link-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin/books">Books</Link>
            </li>
            <li>
              <Link to="/admin/authors">Authors</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="muted">© {year} Library Management System</span>
        <span className="muted">Training project – college 5th semester</span>
      </div>
    </footer>
  );
}

