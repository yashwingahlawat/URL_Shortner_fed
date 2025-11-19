import axios from "axios";
import { useAuth } from "@/store/auth";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  (response) => {
    const message = response?.data?.message;
    console.log(message);
    if (message === "Token expired" || message === "Invalid token") {
      const auth = useAuth.getState();
      auth.logout();
      window.location.href = "/login";
    }

    return response;
  },
  (error) => {
    const message = error?.response?.data?.message;

    if (message === "Token expired" || message === "Invalid token") {
      const auth = useAuth.getState();
      auth.logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default api;
