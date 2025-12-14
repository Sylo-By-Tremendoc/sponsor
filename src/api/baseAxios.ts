import axios from "axios";

// Create base Axios instance
const buildUrl = (api: string) => {
  const base = import.meta.env.VITE_BASE_API_ENDPOINT;
  return base.replace("{api}", api);
};

export const publicAxios = axios.create({
  baseURL: buildUrl(import.meta.env.VITE_ACCOUNT_BASE),
  headers: { "Content-Type": "application/json" },
});

export const authAxios = axios.create({
  baseURL: buildUrl(import.meta.env.VITE_AUTHENTICATED_BASE),
  headers: { "Content-Type": "application/json" },
});
