import { Route, Routes } from "react-router-dom";

import Home from "./views/home/Home";
import LivroDetalhes from "./views/livro/DetalhesLivro";
import FormLivro from "./views/livro/FormLivro";
import ListLivro from "./views/livro/ListLivro";
import Sobre from "./views/sobre/Sobre";
import FormUsuario from "./views/usuario/FormUsuario";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-livro" element={<FormLivro />} />
        <Route path="list-livro" element={<ListLivro />} />
        <Route path="form-usuario" element={<FormUsuario />} />

        <Route path="sobre" element={<Sobre />} />
        <Route path="livro/:id" element={<LivroDetalhes />} />
      </Routes>
    </>
  );
}

export default Rotas;
