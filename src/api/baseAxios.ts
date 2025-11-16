import axios from "axios";

// Create base Axios instance
const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseAxios;
