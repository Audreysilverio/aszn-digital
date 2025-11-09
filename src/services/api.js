import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000",
});

// 👇 LOG de depuração: mostra a base usada pelo front
console.log("[ASZN] API baseURL =", api.defaults.baseURL);

// injeta token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aszn_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// erros amigáveis
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
