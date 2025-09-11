import axios from "axios";

// const token = JSON.parse(localStorage.getItem("user") as string).accessToken;
export const backendInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  headers: {
    role: "Admin",
    "x-platform": "Admin",
  },
});

export const aiCoreInstance = axios.create({
  baseURL: import.meta.env.VITE_AI_CORE_URL,
});
