import { Route, Routes } from "react-router-dom";

import Home from "./views/home/Home";
import FormLivro from "./views/livro/FormLivro";
import ListLivro from "./views/livro/ListLivro";
import Sobre from "./views/sobre/Sobre";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-livro" element={<FormLivro />} />
        <Route path="list-livro" element={<ListLivro />} />
        <Route path="sobre" element={<Sobre />} />
      </Routes>
    </>
  );
}

export default Rotas;
