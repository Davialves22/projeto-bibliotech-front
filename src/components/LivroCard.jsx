import { Link } from "react-router-dom";
import { Button, Card as SemanticCard } from "semantic-ui-react";
import {
  Card,
  CardContentCenter,
  CardContentExtra,
  Image,
} from "../views/home/Home.styles";

export default function LivroCard({ livro }) {
  console.log("📘 Livro recebido no LivroCard:", livro);
  const imageSrc = `http://localhost:8080/api/livro/v1/imagem/${livro.id}`;
  console.log("🖼️ URL da imagem:", imageSrc);

  const urlPdf = `http://localhost:8080/api/livro/v1/pdf/${livro.id}`;
  console.log("📄 URL do PDF:", urlPdf);

  return (
    <Card>
      <Image
        src={imageSrc}
        wrapped
        ui={false}
        alt={`Capa do livro ${livro.titulo}`}
        onError={(e) => {
          console.error("❌ Erro ao carregar imagem:", e);
        }}
      />
      <CardContentCenter>
        <SemanticCard.Header style={{ marginTop: "0.5em" }}>
          {livro.titulo}
        </SemanticCard.Header>
      </CardContentCenter>

      {/* 👇 AQUI ESTAVA O ERRO, agora corrigido */}
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
            target="_blank"
            rel="noopener noreferrer"
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
