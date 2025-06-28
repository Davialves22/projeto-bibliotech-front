import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import MenuSistema from "../../components/MenuSistema/MenuSistema";
import { livrosDefault } from "../../uitls/livrosDefault";
import AvaliacaoLivro from "./AvaliacaoLivro";

import Footer from "../../components/Footer";

export default function LivroDetalhes() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [imageError, setImageError] = useState(false);

  const livrosMock = Object.fromEntries(
    livrosDefault.map((livro) => [livro.id, livro])
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/livro/v1/${id}`)
      .then((res) => setLivro(res.data))
      .catch(() => {
        const mock = livrosMock[id];
        if (mock) setLivro(mock);
        else setErro(true);
      })
      .finally(() => setCarregando(false));
  }, [id]);

  useEffect(() => {
    if (!livro || livro.pdfBlobUrl || !livro.id) return;

    axios
      .get(`http://localhost:8080/api/livro/v1/pdf/${livro.id}`, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setLivro((prev) => ({ ...prev, pdfBlobUrl: url }));
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

  const imageSrc = imageError
    ? livro?.urlImagem
    : `http://localhost:8080/api/livro/v1/imagem/${livro?.id}`;

  if (carregando)
    return <Loader active inline="centered" content="Carregando livro..." />;
  if (erro || !livro)
    return <Message negative content="Livro não encontrado." />;

  return (
    <>
      <MenuSistema />
      <Container style={{ marginTop: "2em", marginBottom: "2em" }}>
        <Header as="h2" icon textAlign="center" style={{ marginBottom: "1em" }}>
          <Icon name="book" circular />
          <Header.Content>{livro.titulo}</Header.Content>
          <Header.Subheader>{livro.nomeAutor}</Header.Subheader>
        </Header>

        <Segment padded>
          <Grid stackable columns={2} verticalAlign="middle" relaxed="very">
            <Grid.Column width={6} textAlign="center">
              <Image
                src={imageSrc}
                size="medium"
                centered
                bordered
                onError={() => setImageError(true)}
                alt={`Capa do livro ${livro.titulo}`}
              />
            </Grid.Column>

            <Grid.Column width={10}>
              <Segment>
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
                  <strong>Nacionalidade do Autor:</strong>{" "}
                  {livro.nacionalidadeAutor}
                </p>
              </Segment>

              {livro.pdfBlobUrl ? (
                <Button
                  color="green"
                  icon="download"
                  content="Baixar PDF (Banco de Dados)"
                  onClick={baixarPdf}
                  style={{ marginTop: "1em" }}
                  fluid
                />
              ) : livro.urlPdf ? (
                <Button
                  color="blue"
                  icon="external alternate"
                  content="Ler PDF Online"
                  as="a"
                  href={livro.urlPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: "1em" }}
                  fluid
                />
              ) : (
                <Message
                  warning
                  icon="warning circle"
                  header="PDF não disponível"
                  content="Este livro ainda não possui PDF para leitura ou download."
                  style={{ marginTop: "1em" }}
                />
              )}
            </Grid.Column>
          </Grid>
          <AvaliacaoLivro livroId={livro.id} />
        </Segment>
        <Link to={"/"}>
          <Button inverted circular icon labelPosition="left" color="orange">
            <Icon name="reply" /> Voltar
          </Button>
        </Link>
      </Container>

      <Footer />
    </>
  );
}
