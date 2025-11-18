import api from "./axios";

export const shortenUrl = (url: string) =>
  api.post(`/url/shorten?url=${encodeURIComponent(url)}`);

export const getUrls = () => api.get("/url/user");

export const deleteUrl = (id: number) => api.delete(`/url/${id}`);

export const getAnalytics = (id: number) =>
  api.get(`/url/${id}/analytics`);
