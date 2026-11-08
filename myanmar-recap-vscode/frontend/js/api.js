// API helper. The current UI uses localStorage; this file is ready for a future backend connection.
const API_BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

// Example for when the backend is running:
// const projects = await apiRequest("/projects");
