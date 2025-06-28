// livrosDefault.js
import PDF1 from '../assets/PDFs/memoriasBras.pdf';
import capaDomCasmurro from '../assets/livro1.jpeg';
import capaOAlienista from '../assets/livro2.jpeg';

export const livrosDefault = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    nomeAutor: "Machado de Assis",
    genero: "Romance",
    isbn: "978-85-359-0277-7",
    urlImagem: capaDomCasmurro,
    pdfLocal: PDF1,
  },
  {
    id: 2,
    titulo: "Mémorias Póstumas de Brás Cubas",
    nomeAutor: "Machado de Assis",
    genero: "Romance, Ficcao",
    isbn: "978-85-359-0212-8",
    urlImagem: capaOAlienista,
    pdfLocal: PDF1,
  },
];
