import React, { useState, useEffect } from "react";
import { Container, Menu, Card, Image, Message, Loader, Dimmer } from "semantic-ui-react";

import capaDomCasmurro from "../../assets/livro1.jpeg";
import capaOAlienista from "../../assets/livro2.jpeg";
import MenuSistema from "../../MenuSistema";

// Seus livros default (só Romance por enquanto)
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

// Lista completa de gêneros default (fallback)
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
  // Inicializa generosEnum com a lista fallback
  const [generosEnum, setGenerosEnum] = useState(generosDefaultFallback);
  const [loadingGeneros, setLoadingGeneros] = useState(true);
  // O estado errorGeneros ainda existe, mas não será exibido na UI para o usuário final
  const [errorGeneros, setErrorGeneros] = useState(null);

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
        setErrorGeneros(null); // Limpa erros anteriores, caso haja algum erro na tentativa anterior

        const response = await fetch('http://localhost:8080/api/genero'); // Seu endpoint da API
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const data = await response.json();
        // Se a API retornar dados, atualize o estado com eles
        setGenerosEnum(data);
      } catch (error) {
        console.error("Erro ao buscar gêneros (usando fallback):", error);
        // Apenas registra o erro no console, mas não define uma mensagem para a UI
        setErrorGeneros(error); // Mantém o erro no estado para depuração interna se necessário
      } finally {
        setLoadingGeneros(false);
      }
    };

    fetchGeneros();
  }, []); // Roda apenas uma vez na montagem

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
          {/* Mostra loader apenas se ainda estiver carregando */}
          {loadingGeneros ? (
            <Dimmer active inverted>
              <Loader inverted>Carregando Gêneros...</Loader>
            </Dimmer>
          ) : (
            // Sempre mapeia generosEnum, que será o da API ou o fallback
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