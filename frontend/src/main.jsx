import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";

import AppLayout from "./components/AppLayout.jsx";
import Landing from "./pages/Landing.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Books from "./pages/Books.jsx";
import BrowseBooks from "./pages/BrowseBooks.jsx";
import Authors from "./pages/Authors.jsx";
import Categories from "./pages/Categories.jsx";
import Issues from "./pages/Issues.jsx";
import Users from "./pages/Users.jsx";
import { AuthProvider, RequireAdmin, RequireUser } from "./auth/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route
              path="/user"
              element={
                <RequireUser>
                  <UserDashboard />
                </RequireUser>
              }
            />
            <Route
              path="/user/books"
              element={
                <RequireUser>
                  <BrowseBooks />
                </RequireUser>
              }
            />
            <Route
              path="/admin/books"
              element={
                <RequireAdmin>
                  <Books />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/authors"
              element={
                <RequireAdmin>
                  <Authors />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <RequireAdmin>
                  <Categories />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/issues"
              element={
                <RequireAdmin>
                  <Issues />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RequireAdmin>
                  <Users />
                </RequireAdmin>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

