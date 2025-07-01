import styled, { css, keyframes } from "styled-components";

const highlight = keyframes`
  0% { background-color: var(--color-500); }
  50% { background-color: var(--color-400); }
  100% { background-color: var(--color-500); }
`;

// Container da lista vertical de radios
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1em;
  background-color: var(--color-100);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.1);
  font-family: "Segoe UI", sans-serif;

  /* Largura adaptativa: no desktop larga, no tablet e menor mais estreito */
  width: 220px;
  max-width: 100%;

  @media (max-width: 1024px) {
    width: 180px;
  }

  @media (max-width: 768px) {
    /* Esconde o menu vertical em telas <= 768px, aparece SelectMobile */
    display: none;
  }
`;

export const RadioItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 12px;
  font-weight: 600;
  color: ${(props) => (props.active ? "white" : "#333")};
  background-color: ${(props) => (props.active ? "var(--color-500)" : "transparent")};
  border-radius: 8px;
  user-select: none;
  transition: all 0.3s ease;

  input[type="radio"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: var(--color-400);
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      animation: ${highlight} 2s ease-in-out infinite;
      box-shadow: 0 0 12px var(--color-500);
    `}

  @media (max-width: 1024px) {
    font-size: 0.95rem;
    padding: 8px 10px;

    input[type="radio"] {
      width: 16px;
      height: 16px;
    }
  }
`;

// Select para mobile/tablet, aparece só em telas <= 768px
export const SelectMobile = styled.select`
  width: 100%;
  max-width: 90%;
  margin: 1em auto;
  padding: 0.75em 1em;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-500);
  background-color: var(--color-100);
  color: #333;
  display: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: var(--color-500);
    box-shadow: 0 0 4px var(--color-500);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
