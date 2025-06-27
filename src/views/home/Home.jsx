import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { Container, Title } from "./Home.styles";

import { verificarPdfRemoto } from "../../uitls/verificarPdfRemoto";
import GeneroMenu from "../../components/GeneroMenu/GeneroMenu";
import LivroList from "../../components/LivroList";
import LoaderFallback from "../../components/LoaderFallback";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

import capaDomCasmurro from "../../assets/livro1.jpeg";
import capaOAlienista from "../../assets/livro2.jpeg";

import PDF1 from "../../assets/PDFs/memoriasBras.pdf"

import Footer from "../../components/Footer";

const livrosDefault = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    nomeAutor: "Machado de Assis",
    genero: "Romance",
    isbn: "978-85-359-0277-7",
    urlImagem: capaDomCasmurro,
    pdfLocal: PDF1,
  },
  {
    id: 2,
    titulo: "Mémorias Póstumas de Brás Cubas",
    nomeAutor: "Machado de Assis",
    genero: "Romance, Ficcao",
    isbn: "978-85-359-0212-8",
    urlImagem: capaOAlienista,
    pdfLocal: PDF1,
  },
];

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
        const data = (await response.ok) ? await response.json() : livrosDefault;
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
