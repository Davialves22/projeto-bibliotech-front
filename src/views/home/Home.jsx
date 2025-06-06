import React, { useState } from "react";
import { Container, Menu, Card, Image, Message } from "semantic-ui-react";

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

// Lista completa de gêneros do enum
const generosEnum = [
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

  // livros filtrados segundo o filtro
  const livrosFiltrados =
    filtro === "TODOS"
      ? livrosDefault
      : livrosDefault.filter(
          (livro) => livro.genero.toUpperCase() === filtro.toUpperCase()
        );

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
