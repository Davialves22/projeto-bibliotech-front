import { Route, Routes } from "react-router-dom";

import ListEntregador from "./views/entregador/ListEntregador";
import Home from "./views/home/Home";
import FormLivro from "./views/livro/FormLivro";
import ListLivro from "./views/livro/ListLivro";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-livro" element={<FormLivro />} />
        <Route path="list-livro" element={<ListLivro />} />
        <Route path="list-entregador" element={<ListEntregador />} />
      </Routes>
    </>
  );
}

export default Rotas;
