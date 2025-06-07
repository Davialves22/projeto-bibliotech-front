import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Icon,
  Image,
  Loader,
  Menu,
  Message,
} from "semantic-ui-react";

import capaDomCasmurro from "../../assets/livro1.jpeg";
import capaOAlienista from "../../assets/livro2.jpeg";
import MenuSistema from "../../MenuSistema";

// Livros fallback
const livrosDefault = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    nomeAutor: "Machado de Assis",
    genero: "Romance",
    isbn: "978-85-359-0277-7",
    urlImagem: capaDomCasmurro,
    urlPdf: "https://example.com/dowload/dom-casmurro.pdf",
  },
  {
    id: 2,
    titulo: "O Alienista",
    nomeAutor: "Machado de Assis",
    genero: "Romance",
    isbn: "978-85-359-0212-8",
    urlImagem: capaOAlienista,
    urlPdf: "https://example.com/dowload/o-alienista.pdf",
  },
];

// Gêneros padrão (fallback)
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

  // Carrega gêneros da API
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/genero");
        if (response.ok) {
          const data = await response.json();
          setGenerosEnum(data);
        }
      } catch (error) {
        console.error("Erro ao buscar gêneros, usando fallback", error);
      }
    };

    fetchGeneros();
  }, []);

  // Carrega livros da API ou fallback
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/livro");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setLivros(data);
          } else {
            setLivros(livrosDefault);
          }
        } else {
          setLivros(livrosDefault);
        }
      } catch (error) {
        console.error("Erro ao buscar livros, usando fallback", error);
        setLivros(livrosDefault);
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
          (livro) =>
            livro.genero &&
            livro.genero.toUpperCase() === filtro.toUpperCase()
        );

  return (
    <>
      <MenuSistema tela={"home"} />
      <Container style={{ marginTop: "2em" }}>
        <h2 style={{ textAlign: "left" }}>
          <span style={{ color: "black" }}>
            Livros &nbsp;
            <Icon name="angle double right" size="small" />
          </span>
        </h2>

        <Menu pointing secondary>
          <Menu.Item
            name="TODOS"
            active={filtro === "TODOS"}
            onClick={() => setFiltro("TODOS")}
          />
          {generosEnum.map((genero) => (
            <Menu.Item
              key={genero}
              name={genero}
              active={filtro === genero}
              onClick={() => setFiltro(genero)}
              text={genero.charAt(0) + genero.slice(1).toLowerCase()}
            >
              {genero.charAt(0) + genero.slice(1).toLowerCase()}
            </Menu.Item>
          ))}
        </Menu>

        {loading ? (
          <Dimmer active inverted>
            <Loader>Carregando livros...</Loader>
          </Dimmer>
        ) : livrosFiltrados.length === 0 ? (
          <Message info>
            Nenhum livro encontrado para a categoria{" "}
            <strong>
              {filtro.charAt(0) + filtro.slice(1).toLowerCase()}
            </strong>
            .
          </Message>
        ) : (
          <Card.Group itemsPerRow={4} stackable>
            {livrosFiltrados.map((livro) => (
              <Card key={livro.id}>
                <Image
                  src={livro.urlImagem}
                  wrapped
                  ui={false}
                  alt={`Capa do livro ${livro.titulo}`}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Content textAlign="center">
                  <Card.Header style={{ marginTop: "0.5em" }}>
                    {livro.titulo}
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Card.Meta>{livro.nomeAutor}</Card.Meta>
                  <Card.Description>Gênero: {livro.genero}</Card.Description>
                  <Card.Description>ISBN: {livro.isbn}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    as={Link}
                    to={`/livro/${livro.id}`}
                    primary
                    fluid
                    icon="book"
                    content="Ver Detalhes"
                    style={{ marginBottom: "0.5em" }}
                  />
                  {livro.urlPdf && (
                    <Button
                      as="a"
                      href={livro.urlPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="green"
                      fluid
                      icon="download"
                      content="Baixar PDF"
                    />
                  )}
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
      </Container>
    </>
  );
}
