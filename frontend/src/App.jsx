import { BrowserRouter, Routes, Route } from "react-router-dom";
import VistaGatos from "./pages/vistaGatos.jsx";
import Layout from "./components/layout.jsx";
import Detail from "./pages/details.jsx";
import Home from "./pages/home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
