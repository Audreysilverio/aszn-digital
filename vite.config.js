// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // garante que as rotas funcionem no deploy
  server: { port: 5173, open: true },
  preview: { port: 5173 }
});
