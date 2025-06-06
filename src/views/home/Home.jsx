import React, { useEffect, useState } from "react";
import { Container, Menu, Card, Image, Button, Loader, Message } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function Home() {
  const [generos, setGeneros] = useState([]);
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/genero").then((res) => res.json()),
      fetch("http://localhost:8080/api/livro").then((res) => res.json()),
    ])
      .then(([generosData, livrosData]) => {
        setGeneros(["TODOS", ...generosData]);
        setLivros(livrosData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar dados");
        setLoading(false);
      });
  }, []);

  const livrosFiltrados =
    filtro === "TODOS" ? livros : livros.filter((livro) => livro.genero === filtro);

  if (loading) return <Loader active inline="centered" content="Carregando livros..." />;

  if (error) return <Message negative content={error} />;

  return (
    <>
      <MenuSistema tela={"home"} />
    <Container style={{ marginTop: "2em" }}>
      <Menu pointing secondary>
        {generos.map((genero) => (
          <Menu.Item
            key={genero}
            name={genero}
            active={filtro === genero}
            onClick={() => setFiltro(genero)}
          />
        ))}
      </Menu>

      {livrosFiltrados.length === 0 ? (
        <Message info content="Nenhum livro encontrado para este gênero." />
      ) : (
        <Card.Group itemsPerRow={4} stackable>
          {livrosFiltrados.map((livro) => (
            <Card key={livro.id}>
              <Image
                src={livro.imagemUrl || "https://via.placeholder.com/150x220?text=Sem+Capa"}
                wrapped
                ui={false}
                alt={`Capa do livro ${livro.titulo}`}
              />
              <Card.Content>
                <Card.Header>{livro.titulo}</Card.Header>
                <Card.Meta>{livro.autor}</Card.Meta>
                <Card.Description>{livro.descricao}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button basic color="orange" size="small">
                  Detalhes
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Container>
    </>
  );
}
