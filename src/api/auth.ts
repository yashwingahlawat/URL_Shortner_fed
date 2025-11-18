import api from "./axios";

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);
