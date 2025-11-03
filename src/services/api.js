// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000", // sem /api
});

// injeta token (mesmo nome usado no login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aszn_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// deixa mensagens de erro amigáveis vindas do back
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.erro ||
      err?.response?.data?.mensagem ||
      err?.message ||
      "Erro desconhecido";
    return Promise.reject(new Error(msg));
  }
);

export default api;
