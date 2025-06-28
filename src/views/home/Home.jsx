import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { Container, Title } from "./Home.styles";

import GeneroMenu from "../../components/GeneroMenu/GeneroMenu";
import LivroList from "../../components/LivroList";
import LoaderFallback from "../../components/LoaderFallback";
import MenuSistema from "../../components/MenuSistema/MenuSistema";
import { livrosDefault } from "../../uitls/livrosDefault";
import { verificarPdfRemoto } from "../../uitls/verificarPdfRemoto";

import Footer from "../../components/Footer";

const generosDefaultFallback = [
  "FICCAO",
  "ROMANCE",
  "DRAMA",
  "COMEDIA",
  "FANTASIA",
  "TERROR",
  "DOCUMENTARIO",
  "BIOGRAFIA",
];

export default function Home() {
  const [filtro, setFiltro] = useState("TODOS");
  const [generosEnum, setGenerosEnum] = useState(generosDefaultFallback);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/genero");
        if (response.ok) {
          const data = await response.json();
          setGenerosEnum(data);
        }
      } catch {
        console.warn("Usando gêneros padrão (fallback).");
      }
    };

    fetchGeneros();
  }, []);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/livro/v1");
        const data = (await response.ok)
          ? await response.json()
          : livrosDefault;
        const livrosComPdf = await verificarPdfRemoto(
          data.length ? data : livrosDefault
        );
        setLivros(livrosComPdf);
      } catch {
        const livrosComPdf = await verificarPdfRemoto(livrosDefault);
        setLivros(livrosComPdf);
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  const livrosFiltrados =
    filtro === "TODOS"
      ? livros
      : livros.filter(
          (livro) => livro.genero?.toUpperCase() === filtro.toUpperCase()
        );

  return (
    <>
      <MenuSistema tela="home" />
      <Container>
        <Title>
          Livros <Icon name="angle double right" size="small" />
        </Title>
        <GeneroMenu
          filtro={filtro}
          generos={generosEnum}
          onChange={setFiltro}
        />
        {loading ? (
          <LoaderFallback mensagem="Carregando livros..." />
        ) : (
          <LivroList livros={livrosFiltrados} filtro={filtro} />
        )}
      </Container>
      <Footer />
    </>
  );
}
