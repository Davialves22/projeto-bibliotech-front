import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card as SemanticCard } from "semantic-ui-react";
import {
  Card,
  CardContentCenter,
  CardContentExtra,
  Image,
} from "../views/home/Home.styles";
import PDF1 from "../assets/PDFs/memoriasBras.pdf";

export default function LivroCard({ livro }) {
  const [imageError, setImageError] = useState(false);
  const [pdfExists, setPdfExists] = useState(false);

  const imageSrc = imageError
    ? livro.urlImagem
    : `http://localhost:8080/api/livro/v1/imagem/${livro.id}`;

  const urlPdf = `http://localhost:8080/api/livro/v1/pdf/${livro.id}`;
  const localPdf = PDF1;

  useEffect(() => {
    const checkPdfExists = async () => {
      try {
        const response = await fetch(urlPdf, { method: "HEAD" });
        if (response.ok) {
          setPdfExists(true);
        }
      } catch (error) {
        console.warn("PDF remoto não encontrado:", error);
        setPdfExists(false);
      }
    };

    checkPdfExists();
  }, [urlPdf]);

  // Escolhe o PDF certo (remoto ou local)
  const pdfLink = pdfExists ? urlPdf : localPdf;

  return (
    <Card>
      <Image
        src={imageSrc}
        wrapped
        ui={false}
        alt={`Capa do livro ${livro.titulo}`}
        onError={() => {
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
          icon="eye"
          content="Ver Detalhes"
          style={{ marginBottom: "0.5em", fontSize: "0.75rem" }}
        />

        {/* 📖 Ler Online */}
        <Button
          as="a"
          href={pdfLink}
          target="_blank"
          rel="noopener noreferrer"
          color="green"
          fluid
          icon="book"
          content="Ler Online"
          style={{ marginBottom: "0.5em", fontSize: "0.75rem" }}
        />

        {/* 📥 Download */}
        <Button
          as="a"
          href={pdfLink}
          download
          color="blue"
          fluid
          icon="download"
          content="Baixar PDF"
          style={{ fontSize: "0.75rem" }}
        />
      </CardContentExtra>
    </Card>
  );
}
