import React, { useState, useEffect } from "react"; // Adicione useEffect
import { Container, Menu, Card, Image, Message, Loader, Dimmer } from "semantic-ui-react"; // Adicione Loader e Dimmer

import capaDomCasmurro from "../../assets/livro1.jpeg";
import capaOAlienista from "../../assets/livro2.jpeg";
import MenuSistema from "../../MenuSistema";

// Seus livros default (só Romance por enquanto) - Podem ser buscados da API também
const livrosDefault = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    nomeAutor: "Machado de Assis",
    genero: "Romance",
    isbn: "978-85-359-0277-7",
    urlImagem: capaDomCasmurro,
  },
  {
    id: 2,
    titulo: "O Alienista",
    nomeAutor: "Machado de Assis",
    genero: "Romance",
    isbn: "978-85-359-0212-8",
    urlImagem: capaOAlienista,
  },
];

export default function Home() {
  const [filtro, setFiltro] = useState("TODOS");
  const [generosEnum, setGenerosEnum] = useState([]); // Estado para armazenar os gêneros da API
  const [loadingGeneros, setLoadingGeneros] = useState(true); // Estado para controlar o carregamento
  const [errorGeneros, setErrorGeneros] = useState(null); // Estado para erros na requisição

  // livros filtrados segundo o filtro
  const livrosFiltrados =
    filtro === "TODOS"
      ? livrosDefault
      : livrosDefault.filter(
          (livro) => livro.genero.toUpperCase() === filtro.toUpperCase()
        );

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        setLoadingGeneros(true);
        setErrorGeneros(null); // Limpa erros anteriores
        // Substitua 'SUA_URL_DA_API/generos' pelo endpoint real da sua API
        // Exemplo: 'http://localhost:8080/api/livros/generos'
        const response = await fetch('http://localhost:8080/api/genero'); // <-- ATENÇÃO AQUI!
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const data = await response.json();
        setGenerosEnum(data); // Assume que a API retorna um array de strings
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
        setErrorGeneros("Não foi possível carregar os gêneros. Tente novamente mais tarde.");
      } finally {
        setLoadingGeneros(false);
      }
    };

    fetchGeneros();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez, na montagem do componente

  return (
    <>
      <MenuSistema tela={"home"} />
      <Container style={{ marginTop: "2em" }}>
        <Menu pointing secondary>
          <Menu.Item
            name="TODOS"
            active={filtro === "TODOS"}
            onClick={() => setFiltro("TODOS")}
          />
          {loadingGeneros ? (
            <Dimmer active inverted>
              <Loader inverted>Carregando Gêneros...</Loader>
            </Dimmer>
          ) : errorGeneros ? (
            <Message negative>
              <Message.Header>Erro ao carregar</Message.Header>
              <p>{errorGeneros}</p>
            </Message>
          ) : (
            generosEnum.map((genero) => (
              <Menu.Item
                key={genero}
                name={genero}
                active={filtro === genero}
                onClick={() => setFiltro(genero)}
                text={genero.charAt(0) + genero.slice(1).toLowerCase()}
              >
                {genero.charAt(0) + genero.slice(1).toLowerCase()}
              </Menu.Item>
            ))
          )}
        </Menu>

        {livrosFiltrados.length === 0 ? (
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
                <Card.Content>
                  <Card.Header>{livro.titulo}</Card.Header>
                  <Card.Meta>{livro.nomeAutor}</Card.Meta>
                  <Card.Description>Gênero: {livro.genero}</Card.Description>
                  <Card.Description>ISBN: {livro.isbn}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
      </Container>
    </>
  );
}