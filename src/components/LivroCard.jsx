import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Icon,
  Modal,
  Card as SemanticCard,
} from "semantic-ui-react";
import {
  Card,
  CardContentCenter,
  CardContentExtra,
  Image,
} from "../views/home/Home.styles";

export default function LivroCard({ livro }) {
  const [imageError, setImageError] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const imageSrc = imageError
    ? livro.urlImagem
    : `http://localhost:8080/api/livro/v1/imagem/${livro.id}`;

  const pdfLink = livro.pdfDisponivel ? livro.urlPdfRemoto : livro.pdfLocal;

  return (
    <>
      <Card>
        <Image
          src={imageSrc}
          wrapped
          ui={false}
          alt={`Capa do livro ${livro.titulo}`}
          onError={() => {
            console.warn(
              "❌ Erro ao carregar imagem da API. Tentando imagem local..."
            );
            setImageError(true);
          }}
        />

        <CardContentCenter>
          <SemanticCard.Header
            style={{ marginTop: "0.5em", fontSize: "1.1rem" }}
          >
            {livro.titulo}
          </SemanticCard.Header>
        </CardContentCenter>

        <SemanticCard.Content textAlign="center">
          <SemanticCard.Meta
            style={{ fontSize: "0.9rem", marginBottom: "0.4em" }}
          >
            {livro.nomeAutor}
          </SemanticCard.Meta>
          <SemanticCard.Description>
            <Icon name="tag" color="grey" />
            <span style={{ fontSize: "0.85rem" }}>{livro.genero}</span>
          </SemanticCard.Description>
        </SemanticCard.Content>

        <CardContentExtra>
          <Button
            as={Link}
            to={`/livro/${livro.id}`}
            color="orange"
            fluid
            style={{ fontSize: "0.8rem" }}
          >
            <Icon name="eye" style={{ marginRight: "0.5em" }} />
            Ver Detalhes
          </Button>

          <Button
            fluid
            color="teal"
            style={{ marginTop: "0.5em", fontSize: "0.8rem" }}
            onClick={() => setModalAberto(true)}
          >
            <Icon name="book" style={{ marginRight: "0.5em" }} />
            Ler ou Baixar
          </Button>

          <Divider fitted />
        </CardContentExtra>
      </Card>

      {/* Modal elegante */}
      <Modal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        size="tiny"
        closeIcon
        dimmer="blurring"
      >
        <Modal.Header
          style={{ textAlign: "center", backgroundColor: "#f9f9f9" }}
        >
          <Icon name="book" color="teal" /> Acesso ao Livro
        </Modal.Header>

        <Modal.Content style={{ textAlign: "center", padding: "2em" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1em" }}>
            O que deseja fazer com o livro <strong>{livro.titulo}</strong>?
          </p>
          <Icon name="file pdf outline" size="massive" color="blue" />
        </Modal.Content>

        <Modal.Actions>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1em",
              width: "100%",
              paddingBottom: "1.5em",
            }}
          >
            <Button
              as="a"
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              color="green"
              size="large"
              icon
              labelPosition="left"
            >
              <Icon name="book" />
              Ler Online
            </Button>

            <Button
              as="a"
              href={pdfLink}
              download
              color="blue"
              size="large"
              icon
              labelPosition="left"
            >
              <Icon name="download" />
              Baixar PDF
            </Button>

            <Button
              onClick={() => setModalAberto(false)}
              size="large"
              icon
              labelPosition="left"
            >
              <Icon name="close" />
              Cancelar
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
}
