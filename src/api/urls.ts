import api from "./axios";

export const shortenUrl = (data: { originalUrl: string; customAlias: string|null }) =>
  api.post("/url/shorten",data);

export const getUserUrls = () => api.get("/url/user");

export const deleteUrl = (id: number) => api.delete(`/url/${id}`);

export const getUrlAnalytics = (id: number) =>
  api.get(`/url/${id}/analytics`);
