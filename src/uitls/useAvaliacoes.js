import { useState, useEffect } from "react";

const STORAGE_KEY = "avaliacoes_livros";

export const useAvaliacoes = (livroId) => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    setAvaliacoes(stored[livroId] || []);
  }, [livroId]);

  const adicionarAvaliacao = (nota, comentario = "") => {
    const novaAvaliacao = {
      nota,
      comentario,
      data: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const avaliacoesDoLivro = stored[livroId] || [];
    const atualizadas = [...avaliacoesDoLivro, novaAvaliacao];

    stored[livroId] = atualizadas;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setAvaliacoes(atualizadas);
  };

  const media =
    avaliacoes.length > 0
      ? avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length
      : 0;

  return {
    avaliacoes,
    adicionarAvaliacao,
    media,
  };
};
