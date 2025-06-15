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

export default function LivroDetalhes() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const livrosDefault = {
    1: {
      titulo: "Dom Casmurro",
      nomeAutor: "Machado de Assis",
      genero: "Romance",
      isbn: "978-85-359-0277-7",
      dataNascimento: "01/01/1899",
      preco: "0.00",
      nacionalidadeAutor: "Brasileiro",
      urlImagem: require("../../assets/livro1.jpeg"),
      urlPdf: "https://www.dominiopublico.gov.br/download/texto/bv000110.pdf",
    },
    2: {
      titulo: "O Alienista",
      nomeAutor: "Machado de Assis",
      genero: "Conto",
      isbn: "978-85-359-0212-8",
      dataNascimento: "01/01/1882",
      preco: "0.00",
      nacionalidadeAutor: "Brasileiro",
      urlImagem: require("../../assets/livro2.jpeg"),
      urlPdf: "https://www.dominiopublico.gov.br/download/texto/bv000122.pdf",
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/livro/${id}`)
      .then((response) => setLivro(response.data))
      .catch(() => {
        const livroDefault = livrosDefault[id];
        if (livroDefault) setLivro(livroDefault);
        else setErro(true);
      })
      .finally(() => setCarregando(false));
  }, [id]);

  const baixarPdfBase64 = () => {
    if (!livro.pdf) return;
    const byteCharacters = atob(livro.pdf);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${livro.titulo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (carregando)
    return <Loader active inline="centered" content="Carregando livro..." />;
  if (erro || !livro)
    return <Message negative content="Livro não encontrado." />;

  return (
    <>
      <MenuSistema />
      <ContainerStyled>
        <HeaderStyled>{livro.titulo}</HeaderStyled>
        <SegmentStyled>
          <ImageStyled
            src={
              livro.urlImagem
                ? livro.urlImagem
                : livro.imagem
                ? `data:image/jpeg;base64,${livro.imagem}`
                : "https://react.semantic-ui.com/images/wireframe/image.png"
            }
            alt={`Capa do livro ${livro.titulo}`}
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
              <strong>Data de Publicação:</strong> {livro.dataNascimento}
            </p>
            <p>
              <strong>Nacionalidade do Autor:</strong> {livro.nacionalidadeAutor}
            </p>
            <p>
              <strong>Preço:</strong> R$ {Number(livro.preco).toFixed(2)}
            </p>

            {/* Botão de download */}
            {livro.pdf ? (
              <Button
                color="green"
                icon="download"
                content="Baixar Livro (PDF do banco)"
                onClick={baixarPdfBase64}
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
