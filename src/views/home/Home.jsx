import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "semantic-ui-react";

import Footer from "../../components/Footer";
import GeneroMenu from "../../components/GeneroMenu/GeneroMenu";
import LivroList from "../../components/LivroList";
import LoaderFallback from "../../components/LoaderFallback";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

import {
  AnoButton,
  GridLayout,
  MainContent,
  PaginationContainer,
  RightFilter,
  ScrollTopButton,
  Sidebar,
} from "./Home.styles";

import { livrosDefault } from "../../uitls/livrosDefault";
import { verificarPdfRemoto } from "../../uitls/verificarPdfRemoto";

const ITENS_POR_PAGINA = 10;

export default function Home() {
  const [filtro, setFiltro] = useState("TODOS");
  const [filtroAno, setFiltroAno] = useState("TODOS");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [generosEnum, setGenerosEnum] = useState([]);
  const [anosDisponiveis, setAnosDisponiveis] = useState(["TODOS"]);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const footerRef = useRef(null);

  // Buscar gêneros da API ou fallback
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/genero");
        if (response.ok) {
          const data = await response.json();
          setGenerosEnum(data);
        }
      } catch {
        setGenerosEnum([
          "FICCAO",
          "ROMANCE",
          "DRAMA",
          "COMEDIA",
          "FANTASIA",
          "TERROR",
          "DOCUMENTARIO",
          "BIOGRAFIA",
        ]);
      }
    };
    fetchGeneros();
  }, []);

  // Buscar livros e extrair anos disponíveis
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/livro/v1");
        let data;
        if (response.ok) {
          data = await response.json();
        } else {
          data = livrosDefault;
        }

        const livrosComPdf = await verificarPdfRemoto(data);
        setLivros(livrosComPdf);

        const anos = [
          ...new Set(
            livrosComPdf.map((l) => new Date(l.dataPublicacao).getFullYear())
          ),
        ].sort((a, b) => b - a);
        setAnosDisponiveis(["TODOS", ...anos]);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        try {
          const livrosComPdf = await verificarPdfRemoto(livrosDefault);
          setLivros(livrosComPdf);

          const anos = [
            ...new Set(
              livrosDefault.map((l) => new Date(l.dataPublicacao).getFullYear())
            ),
          ].sort((a, b) => b - a);
          setAnosDisponiveis(["TODOS", ...anos]);
        } catch (e) {
          console.error("Erro ao processar livros default:", e);
          setLivros([]);
          setAnosDisponiveis(["TODOS"]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  // Resetar página ao mudar filtro
  useEffect(() => {
    setPaginaAtual(1);
  }, [filtro, filtroAno]);

  // Filtrar livros por gênero e ano
  const livrosFiltrados = livros.filter((livro) => {
    const generoOk =
      filtro === "TODOS" ||
      livro.genero?.toUpperCase() === filtro.toUpperCase();
    const anoLivro = new Date(livro.dataPublicacao).getFullYear();
    const anoOk = filtroAno === "TODOS" || anoLivro === parseInt(filtroAno);
    return generoOk && anoOk;
  });

  // Paginação
  const totalPaginas = Math.ceil(livrosFiltrados.length / ITENS_POR_PAGINA);

  const livrosPaginaAtual = livrosFiltrados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  // IntersectionObserver para mostrar o botão quando o footer estiver visível
  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollTop(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, [footerRef]);

  // Rola para o topo suavemente
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MenuSistema tela="home" />

      <GridLayout>
        <Sidebar>
          <h3 style={{ marginBottom: 16, fontWeight: 700, color: "#0077B6" }}>
            GÊNEROS
          </h3>
          <GeneroMenu filtro={filtro} generos={generosEnum} onChange={setFiltro} />
        </Sidebar>

        <MainContent>
          {loading ? (
            <LoaderFallback mensagem="Carregando livros..." />
          ) : (
            <>
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#023E8A",
                }}
              >
                <Icon name="book" />
                Últimos Livros
              </h2>

              <p
                style={{
                  marginBottom: 20,
                  fontWeight: "500",
                  fontSize: 16,
                }}
              >
                Mostrando {livrosFiltrados.length}{" "}
                {livrosFiltrados.length === 1 ? "livro" : "livros"}
              </p>

              <LivroList livros={livrosPaginaAtual} filtro={filtro} />

              <PaginationContainer>
                <Button
                  onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
                  disabled={paginaAtual === 1}
                  icon="angle left"
                  content="Anterior"
                />
                <div style={{ alignSelf: "center", fontWeight: 600 }}>
                  Página {paginaAtual} de {totalPaginas || 1}
                </div>
                <Button
                  onClick={() =>
                    setPaginaAtual((p) => Math.min(p + 1, totalPaginas))
                  }
                  disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                  icon="angle right"
                  labelPosition="right"
                  content="Próxima"
                />
              </PaginationContainer>
            </>
          )}
        </MainContent>

        <RightFilter>
          <h4 style={{ marginBottom: 10, fontWeight: 700, color: "#0077B6" }}>
            ANO DE LANÇAMENTO
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {anosDisponiveis.map((ano) => (
              <AnoButton
                key={ano}
                onClick={() => setFiltroAno(ano)}
                ativo={ano === filtroAno}
              >
                {ano}
              </AnoButton>
            ))}
          </div>
        </RightFilter>
      </GridLayout>

      <ScrollTopButton
        onClick={scrollToTop}
        show={showScrollTop}
        aria-label="Voltar ao topo"
      >
        ↑
      </ScrollTopButton>

      {/* Coloque a ref para observar o footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
