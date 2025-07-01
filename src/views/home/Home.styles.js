import { Card as SemanticCard, Image as SemanticImage, Menu as SemanticMenu } from "semantic-ui-react";
import styled from "styled-components";

// Container centralizado
export const Container = styled.div`
  max-width: 1000px;
  margin: 1.5em auto;
  padding: 0 0.5em;

  @media (max-width: 768px) {
    padding: 0 1em;
  }
`;

// Título da página
export const Title = styled.h2`
  text-align: left;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: 2.5em;

  @media (max-width: 768px) {
    font-size: 1.1em;
    justify-content: center;
    text-align: center;
  }
`;

// Menu de categorias (scroll horizontal em mobile)
export const Menu = styled(SemanticMenu)`
  overflow-x: auto !important;
  white-space: nowrap;
  border: none !important;
  margin: 1em 0 !important;
  background: transparent !important;

  .item {
    flex: 0 0 auto !important;
    text-transform: capitalize;
    font-size: 0.9em;
    padding: 0.5em 1em !important;
    color: var(--color-900);
  }

  @media (max-width: 768px) {
    .item {
      font-size: 0.8em;
      padding: 0.4em 0.8em !important;
    }
  }
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr 180px;
  gap: 20px;
  padding: 30px;
  background-color: #fff;
  min-height: 80vh;

  @media (max-width: 1024px) {
    grid-template-columns: 180px 1fr 140px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    padding: 15px;
  }
`;

export const Sidebar = styled.div`
  background: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 20px;
  }
`;

export const MainContent = styled.div`
  font-family: "Segoe UI", sans-serif;

  @media (max-width: 768px) {
    margin: 0 10px;
  }
`;

export const RightFilter = styled.div`
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 16px;
  font-family: "Segoe UI", sans-serif;
  user-select: none;

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 20px;
  }
`;

export const AnoButton = styled.button`
  background-color: ${(props) => (props.ativo ? "#0077B6" : "#fff")};
  color: ${(props) => (props.ativo ? "#fff" : "#333")};
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 5px 5px 5px 0;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0096c7;
    color: #fff;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;

    button {
      width: 100%;
    }
  }
`;

export const CardGroup = styled(SemanticCard.Group)`
  &&& {
    margin-top: 1.5em;
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
    gap: 1em !important;
    justify-items: center;

    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)) !important;
    }

    @media (max-width: 380px) {
      grid-template-columns: 1fr !important;
    }
  }
`;
// Card individual
export const Card = styled(SemanticCard)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8em;
    font-size: 0.9em;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background: #fff;
    width: 100%;
    max-width: 160px;
    min-height: 260px;

    @media (max-width: 480px) {
      max-width: 140px;
      font-size: 0.8em;
    }
  }
`;



export const ScrollTopButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;

  right: 20px;
  bottom: 40px; /* Espaçamento mais próximo do rodapé */
  background-color: #0077B6;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 14px 18px;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 119, 182, 0.4);
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: #0096c7;
  }
`;

// Imagem do livro
export const Image = styled(SemanticImage)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover !important;
  border-radius: 4px;
`;

// Conteúdo centralizado
export const CardContentCenter = styled(SemanticCard.Content)`
  &&& {
    text-align: center;
    padding: 0.5em 0 !important;
  }
`;

// Rodapé do card com botões
export const CardContentExtra = styled(SemanticCard.Content)`
  &&& {
    padding-top: 0.4em !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.4em;

    button.ui.button {
      font-size: 0.75em !important;
    }

    @media (max-width: 480px) {
      button.ui.button {
        font-size: 0.65em !important;
      }
    }
  }
`;
