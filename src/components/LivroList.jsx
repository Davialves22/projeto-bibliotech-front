import { Message } from "semantic-ui-react";
import { CardGroup } from "../views/home/Home.styles";
import LivroCard from "./LivroCard";

export default function LivroList({ livros, filtro }) {
  if (livros.length === 0) {
    return (
      <Message info>
        Nenhum livro encontrado para a categoria{" "}
        <strong>{filtro.charAt(0) + filtro.slice(1).toLowerCase()}</strong>.
      </Message>
    );
  }

  return (
    <CardGroup>
      {livros.map((livro) => (
        <LivroCard key={livro.id} livro={livro} />
      ))}
    </CardGroup>
  );
}
