import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import VistaGatos from "./pages/vistaGatos.jsx";
import Layout from "./components/layout.jsx";
import Detail from "./pages/details.jsx";
import Home from "./pages/home.jsx";
import PrincipalPage from "./pages/principalPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz para PrincipalPage */}
        <Route path="/" element={<PrincipalPage />} />

        {/* Ruta para el layout con sus rutas hijas */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
