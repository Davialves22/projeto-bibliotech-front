import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react"; // Importa Button para os botões
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

const ITENS_POR_PAGINA = 10; // quantos livros por página

export default function Home() {
  const [filtro, setFiltro] = useState("TODOS");
  const [generosEnum, setGenerosEnum] = useState(generosDefaultFallback);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para paginação
  const [paginaAtual, setPaginaAtual] = useState(1);

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

  // Quando mudar o filtro, volta para a página 1
  useEffect(() => {
    setPaginaAtual(1);
  }, [filtro]);

  // Livros filtrados pelo gênero
  const livrosFiltrados =
    filtro === "TODOS"
      ? livros
      : livros.filter(
          (livro) => livro.genero?.toUpperCase() === filtro.toUpperCase()
        );

  // Calcular total de páginas
  const totalPaginas = Math.ceil(livrosFiltrados.length / ITENS_POR_PAGINA);

  // Livros para mostrar na página atual (slice do array)
  const livrosPaginaAtual = livrosFiltrados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  // Funções para navegação
  const irParaPaginaAnterior = () => {
    setPaginaAtual((p) => Math.max(p - 1, 1));
  };

  const irParaPaginaProxima = () => {
    setPaginaAtual((p) => Math.min(p + 1, totalPaginas));
  };

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
          <>
            <p
              style={{
                marginTop: 20,
                fontSize: "20px",
                fontWeight: "600",
                color: "#444",
                marginBottom: "15px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon name="book" />
              Mostrando {livrosFiltrados.length}{" "}
              {livrosFiltrados.length === 1 ? "livro" : "livros"}
            </p>
            <LivroList livros={livrosPaginaAtual} filtro={filtro} />

            {/* Controles de paginação */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 90,
                gap: 10,
              }}
            >
              <Button
                onClick={irParaPaginaAnterior}
                disabled={paginaAtual === 1}
                icon="angle left"
                content="Anterior"
              />
              <div style={{ alignSelf: "center" }}>
                Página {paginaAtual} de {totalPaginas}
              </div>
              <Button
                onClick={irParaPaginaProxima}
                disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                icon="angle right"
                labelPosition="right"
                content="Próxima"
              />
            </div>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
