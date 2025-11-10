import axios from "axios";

// API hospedada no Render (definitiva)
const baseURL = "https://aszn-api.onrender.com";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// 🚀 CORREÇÃO 1: INTERCEPTOR DE REQUISIÇÃO (Adiciona o Token JWT)
api.interceptors.request.use(async (config) => {
  // Pega o token salvo no login
  const token = localStorage.getItem("aszn_token"); 

  if (token) {
    // Adiciona o cabeçalho Authorization: Bearer <token>
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 🚀 CORREÇÃO 2: INTERCEPTOR DE RESPOSTA (Tratamento de 401 e erros)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o backend retornar 401 (Token Inválido/Expirado), limpamos o token e recarregamos
    if (error.response && error.response.status === 401) {
        localStorage.removeItem("aszn_token");
        // Isso força a volta para a tela de login
        window.location.reload(); 
    }
    
    // Tratamento genérico de erro
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