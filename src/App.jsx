import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Inicio from "./pages/inicio/Inicio";
import QuemSomos from "./pages/quemSomos/QuemSomos";
import NossasAtividades from "./pages/nossasAtividades/NossasAtividades";
import Contato from "./pages/contato/Contato";

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
        </Routes>
      </main>
      <Footer />
    </>
  );
}