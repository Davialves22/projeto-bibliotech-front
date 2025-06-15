import { Link } from "react-router-dom";
import { Button, Card as SemanticCard } from "semantic-ui-react";
import {
  Card,
  CardContentCenter,
  CardContentExtra,
  Image,
} from "../views/home/Home.styles";

export default function LivroCard({ livro }) {
  return (
    <Card>
      <Image
        src={livro.urlImagem}
        wrapped
        ui={false}
        alt={`Capa do livro ${livro.titulo}`}
      />
      <CardContentCenter>
        <SemanticCard.Header style={{ marginTop: "0.5em" }}>
          {livro.titulo}
        </SemanticCard.Header>
      </CardContentCenter>
      <SemanticCard.Content>
        <SemanticCard.Meta>{livro.nomeAutor}</SemanticCard.Meta>
        <SemanticCard.Description>
          Gênero: {livro.genero}
        </SemanticCard.Description>
      </SemanticCard.Content>
      <CardContentExtra>
        <Button
          as={Link}
          to={`/livro/${livro.id}`}
          primary
          fluid
          icon="book"
          content="Ver Detalhes"
          style={{ marginBottom: "0.5em", fontSize: "0.75rem" }} // Exemplo: 0.75rem, você pode ajustar
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
            style={{ fontSize: "0.75rem" }} // Mesma redução aqui
          />
        )}
      </CardContentExtra>
    </Card>
  );
}
