const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      let message = data.message || "Something went wrong. Please try again.";

      if (res.status === 401) {
        message = "Invalid email or password.";
      } else if (res.status === 409 && !data.message) {
        // Fallback only when backend did not provide a specific 409 message
        message = "Email already exists. Try logging in instead.";
      }

      const error = new Error(message);
      error.status = res.status;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError" && !err.status) {
      const networkError = new Error("Unable to reach the server. Please check your connection.");
      networkError.status = 0;
      throw networkError;
    }
    throw err;
  }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  del: (path) => request(path, { method: "DELETE" }),
};

