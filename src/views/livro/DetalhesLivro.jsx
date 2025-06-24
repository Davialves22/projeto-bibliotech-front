import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Loader, Message } from "semantic-ui-react";
import MenuSistema from "../../components/MenuSistema/MenuSistema";

import {
  ContainerStyled,
  HeaderStyled,
  ImageStyled,
  InfoWrapper,
  SegmentStyled,
} from "./css/DetalhesLivro";

// Import das imagens mock
import capaDomCasmurro from "../../assets/livro1.jpeg";
import capaOAlienista from "../../assets/livro2.jpeg";

export default function LivroDetalhes() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [imageError, setImageError] = useState(false);

  const livrosDefault = {
    1: {
      id: 1,
      titulo: "Dom Casmurro",
      nomeAutor: "Machado de Assis",
      genero: "Romance",
      isbn: "978-85-359-0277-7",
      dataNascimento: "01/01/1899",
      preco: "0.00",
      nacionalidadeAutor: "Brasileiro",
      urlImagem: capaDomCasmurro,
      urlPdf: "https://www.dominiopublico.gov.br/download/texto/bv000110.pdf",
    },
    2: {
      id: 2,
      titulo: "O Alienista",
      nomeAutor: "Machado de Assis",
      genero: "Conto",
      isbn: "978-85-359-0212-8",
      dataNascimento: "01/01/1882",
      preco: "0.00",
      nacionalidadeAutor: "Brasileiro",
      urlImagem: capaOAlienista,
      urlPdf: "https://www.dominiopublico.gov.br/download/texto/bv000122.pdf",
    },
  };

  // Busca dados do livro
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/livro/v1/${id}`)
      .then((response) => setLivro(response.data))
      .catch(() => {
        const livroDefault = livrosDefault[id];
        if (livroDefault) setLivro(livroDefault);
        else setErro(true);
      })
      .finally(() => setCarregando(false));
  }, [id]);

  // Busca PDF em arraybuffer e cria URL blob para download
  useEffect(() => {
    if (!livro || livro.pdfBlobUrl || !livro.id) return;

    axios
      .get(`http://localhost:8080/api/livro/v1/pdf/${livro.id}`, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        setLivro((prev) => ({
          ...prev,
          pdfBlobUrl: url,
        }));
      })
      .catch(() => {
        console.warn("⚠️ PDF não disponível para este livro.");
      });
  }, [livro]);

  const baixarPdf = () => {
    if (!livro?.pdfBlobUrl) return;

    const link = document.createElement("a");
    link.href = livro.pdfBlobUrl;
    link.download = `${livro.titulo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (carregando)
    return <Loader active inline="centered" content="Carregando livro..." />;
  if (erro || !livro)
    return <Message negative content="Livro não encontrado." />;

  const imageSrc = imageError
    ? livro.urlImagem
    : `http://localhost:8080/api/livro/v1/imagem/${livro.id}`;

  return (
    <>
      <MenuSistema />
      <ContainerStyled>
        <HeaderStyled>{livro.titulo}</HeaderStyled>
        <SegmentStyled>
          <ImageStyled
            src={imageSrc}
            alt={`Capa do livro ${livro.titulo}`}
            onError={() => {
              console.warn(
                "❌ Erro ao carregar imagem da API. Tentando imagem local..."
              );
              setImageError(true);
            }}
          />
          <InfoWrapper>
            <p>
              <strong>Autor:</strong> {livro.nomeAutor}
            </p>
            <p>
              <strong>ISBN:</strong> {livro.isbn}
            </p>
            <p>
              <strong>Gênero:</strong> {livro.genero}
            </p>
            <p>
              <strong>Data de Publicação:</strong> {livro.dataPublicacao}
            </p>
            <p>
              <strong>Nacionalidade do Autor:</strong> {livro.nacionalidadeAutor}
            </p>

            {livro.pdfBlobUrl ? (
              <Button
                color="green"
                icon="download"
                content="Baixar Livro (PDF do banco)"
                onClick={baixarPdf}
                style={{ marginTop: "1em" }}
              />
            ) : livro.urlPdf ? (
              <Button
                color="blue"
                icon="download"
                content="Baixar Livro (PDF online)"
                as="a"
                href={livro.urlPdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "1em" }}
              />
            ) : (
              <Message warning content="Este livro não possui PDF disponível." />
            )}
          </InfoWrapper>
        </SegmentStyled>
      </ContainerStyled>
    </>
  );
}
