// utils/verificarPdfRemoto.js
export const verificarPdfRemoto = async (livros) => {
  const livrosComPdf = await Promise.all(
    livros.map(async (livro) => {
      const urlPdf = `http://localhost:8080/api/livro/v1/pdf/${livro.id}`;
      try {
        const response = await fetch(urlPdf, { method: "HEAD" });
        return {
          ...livro,
          pdfDisponivel: response.ok,
          urlPdfRemoto: urlPdf,
        };
      } catch (error) {
        return {
          ...livro,
          pdfDisponivel: false,
          urlPdfRemoto: null,
        };
      }
    })
  );

  return livrosComPdf;
};
