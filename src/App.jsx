// App.jsx (corrigido)
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Inicio from "./pages/inicio/Inicio";
import QuemSomos from "./pages/quemSomos/QuemSomos";
import NossasAtividades from "./pages/nossasAtividades/NossasAtividades";
import Contato from "./pages/contato/Contato";
import Voluntariado from "./pages/voluntariado/Voluntariado";
import Doacoes from "./pages/doacoes/Doacoes";
import Admin from "./pages/admin/Admin";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/nossas-atividades" element={<NossasAtividades />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/voluntariado" element={<Voluntariado />} />
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
