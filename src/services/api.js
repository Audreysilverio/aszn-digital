import axios from "axios";

// API hospedada no Render (definitiva)
const baseURL = "https://aszn-api.onrender.com";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error.response?.data?.erro ||
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Erro de conexão com o servidor.";
    return Promise.reject(new Error(msg));
  }
);

export default api;
