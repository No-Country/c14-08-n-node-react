import axios from "axios";

import { useAuthStore } from "@/store/auth";

const authApi = axios.create({
  baseURL: "https://abogado-back.onrender.com/api/v1",
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  // config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Authorization"] = `${token}`;

  return config;
});

export default authApi;
