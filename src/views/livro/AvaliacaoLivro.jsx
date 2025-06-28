import { useState } from "react";
import { Button, Rating, TextArea } from "semantic-ui-react";
import { useAvaliacoes } from "../../uitls/useAvaliacoes";

export default function AvaliacaoLivro({ livroId }) {
  const [notaSelecionada, setNotaSelecionada] = useState(0);
  const [comentario, setComentario] = useState("");

  const { adicionarAvaliacao, media, avaliacoes } = useAvaliacoes(livroId);

  const enviarAvaliacao = () => {
    if (notaSelecionada === 0) return alert("Escolha uma nota.");
    adicionarAvaliacao(notaSelecionada, comentario);
    setNotaSelecionada(0);
    setComentario("");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <strong>Avalie este livro:</strong>
      <div style={{ margin: "0.5rem 0" }}>
        <Rating
          icon="star"
          rating={notaSelecionada}
          maxRating={5}
          onRate={(e, { rating }) => setNotaSelecionada(rating)}
        />
      </div>

      <TextArea
        placeholder="Escreva um comentário (opcional)"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        style={{ width: "100%", minHeight: 80, marginBottom: "0.5rem" }}
      />

      <Button color="blue" size="small" onClick={enviarAvaliacao}>
        Enviar Avaliação
      </Button>

      {avaliacoes.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Média: </strong>
          <Rating
            icon="star"
            rating={Math.round(media)}
            maxRating={5}
            disabled
          />
          <span style={{ marginLeft: "0.5rem" }}>
            ({media.toFixed(1)} de {avaliacoes.length} avaliação{avaliacoes.length > 1 ? "s" : ""})
          </span>
        </div>
      )}
    </div>
  );
}
