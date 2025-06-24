import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card as SemanticCard } from "semantic-ui-react";
import {
  Card,
  CardContentCenter,
  CardContentExtra,
  Image,
} from "../views/home/Home.styles";

export default function LivroCard({ livro }) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = imageError
    ? livro.urlImagem
    : `http://localhost:8080/api/livro/v1/imagem/${livro.id}`;

  const urlPdf = `http://localhost:8080/api/livro/v1/pdf/${livro.id}`;

  return (
    <Card>
      <Image
        src={imageSrc}
        wrapped
        ui={false}
        alt={`Capa do livro ${livro.titulo}`}
        onError={(e) => {
          console.warn("❌ Erro ao carregar imagem da API. Tentando imagem local...");
          setImageError(true);
        }}
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
          style={{ marginBottom: "0.5em", fontSize: "0.75rem" }}
        />
        {urlPdf && (
          <Button
            as="a"
            href={urlPdf}
            download
            color="green"
            fluid
            icon="download"
            content="Baixar PDF"
            style={{ fontSize: "0.75rem" }}
          />
        )}
      </CardContentExtra>
    </Card>
  );
}
