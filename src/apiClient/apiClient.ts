import axios from "axios";
import { error } from "console";

const token = localStorage.getItem("authToken");
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// setup interceptors for token updates or error handling

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// interceptors for handling token expiry

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status == 401 &&
      error.response.data.message == "Token expired"
    ) {
      alert("session expired");
      window.location.href = "/login";
    }
  }
);

export default apiClient;
