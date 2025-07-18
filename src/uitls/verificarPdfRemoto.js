export const verificarPdfRemoto = async (livros) => {
  const batchSize = 10;
  let livrosComPdf = [];

  for (let i = 0; i < livros.length; i += batchSize) {
    const batch = livros.slice(i, i + batchSize);
    const resultados = await Promise.all(
      batch.map(async (livro) => {
        const urlPdf = `http://localhost:8080/api/livro/v1/pdf-existe/${livro.id}`;
        try {
          const response = await fetch(urlPdf);
          return {
            ...livro,
            pdfDisponivel: response.ok,
            urlPdfRemoto: urlPdf,
          };
        } catch {
          return {
            ...livro,
            pdfDisponivel: false,
            urlPdfRemoto: null,
          };
        }
      })
    );
    livrosComPdf = livrosComPdf.concat(resultados);
  }

  return livrosComPdf;
};
